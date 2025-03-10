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
    public $imageFields = ['file'];

    public function afterSave(Request $request, object $jpa, bool $isNew)
    {
        dump($jpa);
        return [
            'url' => $jpa->url,
        ];
    }
}
