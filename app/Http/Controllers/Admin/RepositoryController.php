<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\ResponseFactory;
use SoDe\Extend\Crypto;
use SoDe\Extend\File;
use SoDe\Extend\Response;

class RepositoryController extends BasicController
{
    public function save(Request $request): HttpResponse|ResponseFactory
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            $full = $request->file('file');
            $uuid = Crypto::randomUUID();
            $ext = $full->getClientOriginalExtension();
            $path = public_path("repository/mailing");

            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }

            $filename = "{$uuid}.{$ext}";

            File::save("{$path}/{$filename}", file_get_contents($full));

            return [
                'url' =>  'mailing/' . $filename
            ];
        });
        return response($response->toArray(), $response->status);
    }
}
