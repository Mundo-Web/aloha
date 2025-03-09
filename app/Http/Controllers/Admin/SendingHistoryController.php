<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\SendingHistory;

class SendingHistoryController extends BasicController
{
    public $model = SendingHistory::class;
    public $reactView = 'Admin/SendingHistory';	
}
