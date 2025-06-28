<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends BasicController
{
    public $model = Service::class;
    public $reactView = 'Services';

    public function beforeSave(Request $request)
    {
        $body = $request->all();

        if (isset($body['attributes']) && is_array($body['attributes'])) {
            $body['attributes'] = array_filter($body['attributes'], function ($value) {
                return !is_null($value) && $value !== '';
            });
        }

        return $body;
    }
}
