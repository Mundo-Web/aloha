<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\ServiceHasFeature;
use Illuminate\Http\Request;

class ServiceHasFeatureController extends BasicController
{
    public $model = ServiceHasFeature::class;
    public $softDeletion = false;

    public function beforeSave(Request $request)
    {
        $body = $request->all();

        $shf = ServiceHasFeature::query()
            ->where('service_id', $request->service_id)
            ->where('feature_id', $request->feature_id)
            ->first();
        if ($shf) $body['id'] = $shf->id;

        return $body;
    }
}
