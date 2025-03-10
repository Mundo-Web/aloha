<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\SendingHistory;
use Illuminate\Http\Request;

class SendingHistoryController extends BasicController
{
    public $model = SendingHistory::class;
    public $reactView = 'Admin/SendingHistory';	

    public function beforeSave(Request $request)
    {
        
    }
}
