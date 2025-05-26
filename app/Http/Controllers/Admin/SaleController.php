<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Formula;
use App\Models\Item;
use App\Models\Sale;
use App\Models\Status;
use Exception;
use Illuminate\Http\Request;
use SoDe\Extend\File;
use SoDe\Extend\JSON;
use SoDe\Extend\Response;

class SaleController extends BasicController
{
    public $model = Sale::class;
    public $reactView = 'Admin/Sales';
    public $prefix4filter = 'sales';
    public $with4get = [
        'formula',
        'formula.hasTreatment',
        'formula.scalpType',
        'formula.hairType',
        'formula.hairThickness',
        'formula.fragrance',
        'status',
        'details',
        'details.userFormula',
        'details.userFormula.hasTreatment',
        'details.userFormula.scalpType',
        'details.userFormula.hairType',
        'details.userFormula.hairThickness',
        'details.userFormula.fragrance',
        'renewal',
        'bundle',
        'coupon'
    ];

    public function get(Request $request, string $id)
    {
        $response = Response::simpleTryCatch(function () use ($id) {
            $jpa  = $this->model::with($this->with4get)->find($id);
            if (!$jpa) throw new Exception('El pedido que buscas no existe');
            $hairGoals = Formula::whereIn('id', $jpa->formula->hair_goals)->get();
            $jpa->formula->hair_goals_list = $hairGoals;
            $details = [];
            foreach ($jpa->details as $key => $detailJpa) {
                $userFormula = $detailJpa->userFormula;
                $detail = $detailJpa->toArray();
                if (isset($detail['user_formula'])) {
                    $detail['user_formula']['hair_goals_list'] = Formula::whereIn('id', $userFormula->hair_goals)->get();
                }
                $details[] = $detail;
            }
            return array_merge(
                $jpa->toArray(),
                ['details' => $details]
            );
        });
        return \response($response->toArray(), $response->status);
    }

    public function setReactViewProperties(Request $request)
    {
        $statusesJpa = Status::select()
            ->where('status', true)
            ->where('visible', true)
            ->get();

        $itemsJpa = Item::with('colors')
            ->where('visible', true)
            ->where('status', true)
            ->get();

        $phone_prefixes = JSON::parse(File::get('../storage/app/utils/phone_prefixes.json'));

        return [
            'statuses' => $statusesJpa,
            'items' => $itemsJpa,
            'phone_prefixes' => $phone_prefixes
        ];
    }

    public function setPaginationInstance(string $model)
    {
        $model::where('created_at', '<=', now()->subDays(1))
            ->where('status_id', 'f13fa605-72dd-4729-beaa-ee14c9bbc47b')
            ->update([
                'status_id' => 'c063efb2-1e9b-4a43-8991-b444c14d30dd'
            ]);

        $model::where('updated_at', '<=', now()->subDays(5))
            ->where('status_id', 'a8903cd5-e91d-47d2-93ee-e0fca3845ecc')
            ->update([
                'status_id' => 'bc012ef5-96e8-4bbb-867b-061c4090d9d2'
            ]);

        return $model::select('sales.*')
            // ->where('status_id', '!=', 'c063efb2-1e9b-4a43-8991-b444c14d30dd')
            ->with(['status', 'renewal'])
            ->join('statuses AS status', 'status.id', 'sales.status_id');
    }

    public function afterSave(Request $request, object $jpa, bool $isNew)
    {
        $newJpa = Sale::with($this->with4get)->find($jpa->id);
        return $newJpa;
    }

    public function delete(Request $request, string $id)
    {
        $response = Response::simpleTryCatch(function () use ($request, $id) {
            $deleted =  $this->model::where('id', $id)
                ->update(['status_id' => 'c063efb2-1e9b-4a43-8991-b444c14d30dd']);

            if (!$deleted) throw new Exception('No se ha eliminado ningun registro');
        });
        return response(
            $response->toArray(),
            $response->status
        );
    }
}
