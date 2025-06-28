<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;

class ServiceController extends BasicController
{
   public $model = Service::class;
   public $reactView = 'Hostings';
   public $reactRootView = 'public';
}
