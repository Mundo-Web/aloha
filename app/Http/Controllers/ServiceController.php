<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use Illuminate\Http\Request;

class ServiceController extends BasicController
{
   public $model = Service::class;
   public $reactView = 'Hostings';
   public $reactRootView = 'public';

   public function beforeSave(Request $request)
   {
        $body = $request->all();

        if (isset($body['attributes']) && is_array($body['attributes'])) {
            $body['attributes'] = array_filter($body['attributes'], function($value) {
                return !is_null($value) && $value !== '';
            });
        }

        return $body;
   }
}
