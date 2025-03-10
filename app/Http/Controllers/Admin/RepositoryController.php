<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\ResponseFactory;
use SoDe\Extend\Crypto;
use SoDe\Extend\Response;
use Intervention\Image\Facades\Image;

class RepositoryController extends BasicController
{
    public $model = 'Repository';
    public function save(Request $request): HttpResponse|ResponseFactory
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            $full = $request->file('file');
            $uuid = Crypto::randomUUID();
            $ext = $full->getClientOriginalExtension();
            $filename = "{$uuid}.{$ext}";
            $path = \storage_path("app/images/repository/{$filename}");

            $image = Image::make($full);
            if ($image->width() > 1000 || $image->height() > 1000) {
                $image->resize(1000, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
            }
            $image->save($path);

            return [
                'url' =>  'repository/' . $filename
            ];
        }, function($response, $th) {
            dump($th);
        });
        return response($response->toArray(), $response->status);
    }
}
