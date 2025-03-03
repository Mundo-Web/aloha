<?php

namespace App\Http\Controllers;

use App\Http\Classes\dxResponse;
use App\Models\Aboutus;
use App\Models\dxDataGrid;
use App\Models\General;
use App\Models\Sale;
use App\Models\Social;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use SoDe\Extend\Crypto;
use SoDe\Extend\Response;
use SoDe\Extend\Text;
use Illuminate\Support\Facades\Schema;
use Intervention\Image\Facades\Image;

class BasicController extends Controller
{
  public $model = Model::class;
  public $softDeletion = true;
  public $reactView = 'Home';
  public $reactRootView = 'admin';
  public $imageFields = [];
  public $prefix4filter = null;
  public $throwMediaError = false;
  public $ignorePrefix = [];
  public $with4get = [];
  public $ignoreStatusFilter = false;

  public function get(Request $request, string $id)
  {
    $response = Response::simpleTryCatch(function () use ($id) {
      $jpa  = $this->model::with($this->with4get)->find($id);
      if (!$jpa) throw new Exception('El pedido que buscas no existe');
      return $jpa;
    });
    return \response($response->toArray(), $response->status);
  }

  public function media(Request $request, string $uuid)
  {
    try {
      $snake_case = Text::camelToSnakeCase(str_replace('App\\Models\\', '', $this->model));
      if (Text::has($uuid, '.')) {
        $route = "images/{$snake_case}/{$uuid}";
      } else {
        $route = "images/{$snake_case}/{$uuid}.img";
      }
      $content = Storage::get($route);
      if (!$content) throw new Exception('Imagen no encontrado');
      return response($content, 200, [
        'Content-Type' => 'application/octet-stream'
      ]);
    } catch (\Throwable $th) {
      $content = Storage::get('utils/cover-404.svg');
      $status = 200;
      if ($this->throwMediaError) return null;
      return response($content, $status, [
        'Content-Type' => 'image/svg+xml'
      ]);
    }
  }

  public function setPaginationInstance(string $model)
  {
    return $model::select();
  }

  public function setPaginationSummary(string $model)
  {
    return [];
  }

  public function setReactViewProperties(Request $request)
  {
    return [];
  }

  public function reactView(Request $request)
  {
    $socials = Social::where('visible', true)->where('status', true)->get();
    $terms = General::select(['description'])->where('correlative', 'terms_conditions')->first();
    if ($this->reactRootView == 'public') {
      $seoTitle = General::select(['description'])->where('correlative', 'seo_title')->first();
      $seoDescription = General::select(['description'])->where('correlative', 'seo_description')->first();
      $seoKeywords = General::select(['description'])->where('correlative', 'seo_keywords')->first();
    }
    $footerLinks = Aboutus::whereIn('correlative', ['phone', 'email', 'whatsapp', 'customer-complaints'])->get();

    $salesCount = null;
    if (Auth::check() && Auth::user()->hasRole('Admin')) {
      $salesCount = Sale::where('status_id', '312f9a91-d3f2-4672-a6bf-678967616cac')->count();
    }
    $numWhatsApp = Aboutus::select(['name', 'description'])->where('correlative', 'whatsapp')->first();
    $waMessage = Aboutus::select(['name', 'description'])->where('correlative', 'wa-message')->first();

    $properties = [
      'session' => Auth::user(),
      'socials' => $socials,
      'terms' => $terms,
      'footerLinks' => $footerLinks,
      'salesCount' => $salesCount,
      'numWhatsApp' => $numWhatsApp,
      'waMessage' => $waMessage,
      'global' => [
        'PUBLIC_RSA_KEY' => Controller::$PUBLIC_RSA_KEY,
        'APP_NAME' => env('APP_NAME', 'Trasciende'),
        'APP_URL' => env('APP_URL'),
        'WA_URL' => env('WA_URL'),
        'APP_CORRELATIVE' => env('APP_CORRELATIVE'),
        'APP_DOMAIN' => env('APP_DOMAIN'),
        'APP_PROTOCOL' => env('APP_PROTOCOL', 'https'),
        'GMAPS_API_KEY' => env('GMAPS_API_KEY')
      ],
    ];
    $reactViewProperties = $this->setReactViewProperties($request);
    if (\is_array($reactViewProperties)) {
      foreach ($this->setReactViewProperties($request) as $key => $value) {
        $properties[$key] = $value;
      }
    } else {
      return $reactViewProperties;
    }
    return Inertia::render($this->reactView, $properties)->rootView($this->reactRootView)->withViewData([
      'seoTitle' => $seoTitle->description ?? '',
      'seoDescription' => $seoDescription->description ?? '',
      'seoKeywords' => $seoKeywords->description ?? '',
    ]);
  }

  public function paginate(Request $request): HttpResponse|ResponseFactory
  {
    $response = new dxResponse();
    try {
      $instance = $this->setPaginationInstance($this->model);

      if ($request->group != null) {
        [$grouping] = $request->group;
        // $selector = str_replace('.', '__', $grouping['selector']);
        $selector = $grouping['selector'];
        if (!str_contains($selector, '.') && $this->prefix4filter && !Text::startsWith($selector, '!') && !in_array($selector, $this->ignorePrefix)) {
          $selector = "{$this->prefix4filter}.{$selector}";
        }
        $instance = $instance->select(DB::raw("{$selector} AS `key`"))
          ->groupBy(str_replace('!', '', $selector));
      }

      if (!$this->ignoreStatusFilter && Auth::check()) {
        $table = $this->prefix4filter ? $this->prefix4filter : (new $this->model)->getTable();
        if (Schema::hasColumn($table, 'status')) {
          $instance->whereNotNull($this->prefix4filter ? $this->prefix4filter . '.status' : 'status');
        }
      }

      if ($request->filter) {
        $instance->where(function ($query) use ($request) {
          dxDataGrid::filter($query, $request->filter ?? [], false, $this->prefix4filter);
        });
      }

      if ($request->group == null) {
        if ($request->sort != null) {
          foreach ($request->sort as $sorting) {
            $selector = $sorting['selector'];
            $instance->orderBy(
              $selector,
              $sorting['desc'] ? 'DESC' : 'ASC'
            );
          }
        } else {
          $instance->orderBy($this->prefix4filter ? $this->prefix4filter . '.id' : 'id', 'DESC');
        }
      }

      $totalCount = 0;
      if ($request->requireTotalCount) {
        $instance4count = clone $instance;
        $instance4count->getQuery()->groups = null;
        if ($request->group != null) {
          // When grouping, count distinct groups
          $totalCount = $instance4count->distinct()->count(DB::raw($selector));
        } else {
          // When not grouping, use the original count logic
          if ($this->prefix4filter) {
            $totalCount = $instance4count->distinct()->count($this->prefix4filter . '.id');
          } else {
            $totalCount = $instance4count->distinct()->count('id');
          }
        }
      }

      $jpas = $request->isLoadingAll
        ? $instance->get()
        : $instance
        ->skip($request->skip ?? 0)
        ->take($request->take ?? 10)
        ->get();

      $response->status = 200;
      $response->message = 'Operación correcta';
      $response->data = $jpas;
      $response->summary = $this->setPaginationSummary($this->model);
      $response->totalCount = $totalCount;
    } catch (\Throwable $th) {
      $response->status = 400;
      $response->message = $th->getMessage() . ' Ln.' . $th->getLine();
    } finally {
      return response(
        $response->toArray(),
        $response->status
      );
    }
  }

  public function beforeSave(Request $request)
  {
    return $request->all();
  }

  public function save(Request $request): HttpResponse|ResponseFactory
  {
    $response = new Response();
    try {

      $body = $this->beforeSave($request);

      $snake_case = Text::camelToSnakeCase(str_replace('App\\Models\\', '', $this->model));
      foreach ($this->imageFields as $field) {
        if (!$request->hasFile($field)) continue;
        $full = $request->file($field);
        $uuid = Crypto::randomUUID();
        $ext = $full->getClientOriginalExtension();
        $path = \storage_path("app/images/{$snake_case}/{$uuid}.{$ext}");

        $image = Image::make($full);
        if ($image->width() > 1000 || $image->height() > 1000) {
          $image->resize(1000, null, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
          });
        }
        $image->save($path); // Guarda la imagen redimensionada

        $body[$field] = "{$uuid}.{$ext}";
      }

      $jpa = $this->model::find(isset($body['id']) ? $body['id'] : null);

      if (!$jpa) {
        $jpa = $this->model::create($body);
        $isNew = true;
      } else {
        $jpa->update($body);
        $isNew = false;
      }

      $data = $this->afterSave($request, $jpa, $isNew);
      if ($data) {
        $response->data = $data;
      }

      $response->status = 200;
      $response->message = 'Operacion correcta';
    } catch (\Throwable $th) {
      $response->status = 400;
      $response->message = $th->getMessage();
    } finally {
      return response(
        $response->toArray(),
        $response->status
      );
    }
  }

  public function afterSave(Request $request, object $jpa, bool $isNew)
  {
    return null;
  }

  public function status(Request $request)
  {
    $response = new Response();
    try {
      $this->model::where('id', $request->id)
        ->update([
          'status' => $request->status ? 0 : 1
        ]);

      $response->status = 200;
      $response->message = 'Operacion correcta';
    } catch (\Throwable $th) {
      $response->status = 400;
      $response->message = $th->getMessage();
    } finally {
      return response(
        $response->toArray(),
        $response->status
      );
    }
  }

  public function boolean(Request $request)
  {
    $response = new Response();
    try {
      $data = [];
      $data[$request->field] = $request->value;

      $this->model::where('id', $request->id)
        ->update($data);

      $response->status = 200;
      $response->message = 'Operacion correcta';
    } catch (\Throwable $th) {
      $response->status = 400;
      $response->message = $th->getMessage();
    } finally {
      return response(
        $response->toArray(),
        $response->status
      );
    }
  }

  public function delete(Request $request, string $id)
  {
    $response = new Response();
    try {
      $deleted = $this->softDeletion
        ? $this->model::where('id', $id)
        ->update(['status' => null])
        : $this->model::where('id', $id)
        ->delete();

      if (!$deleted) throw new Exception('No se ha eliminado ningun registro');

      $response->status = 200;
      $response->message = 'Operacion correcta';
    } catch (\Throwable $th) {
      $response->status = 400;
      $response->message = $th->getMessage();
    } finally {
      return response(
        $response->toArray(),
        $response->status
      );
    }
  }
}
