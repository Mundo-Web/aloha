<?php

namespace App\Http\Controllers\Coach;

use App\Http\Controllers\BasicController;
use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends BasicController
{
    public $model = Schedule::class;
    public $reactView = 'Coach/Schedules';

    public function setReactViewProperties(Request $request)
    {
        return [
            'Hola' => 'Mundo'
        ];
    }
}
