<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Feature;
use Illuminate\Http\Request;

class ServiceController extends BasicController
{
    public $model = Service::class;
    public $reactView = 'Hostings';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $servicesJpa = Service::with(['features'])->get();
        $featuresJpa = Feature::where('visible', true)->get();
        return [
            'services' => $servicesJpa,
            'features' => $featuresJpa
        ];
    }
}
