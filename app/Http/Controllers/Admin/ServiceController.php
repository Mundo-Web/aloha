<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Feature;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends BasicController
{
    public $model = Service::class;
    public $reactView = 'Services';

    public function setReactViewProperties(Request $request)
    {
        $featuresJpa = Feature::where('visible', true)->get();
        return [
            'features' => $featuresJpa
        ];
    }

    public function setPaginationInstance(string $model)
    {
        return $model::with('features');
    }
}
