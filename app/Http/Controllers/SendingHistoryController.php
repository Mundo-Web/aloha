<?php

namespace App\Http\Controllers;

use App\Models\SendingHistory;
use App\Models\HistoryDetail;
use Illuminate\Http\Request;

class SendingHistoryController extends BasicController
{
    public $model = SendingHistory::class;

    public function afterSave(Request $request, object $jpa, bool $isNew)
    {
        $jpa->completed = HistoryDetail::where('sending_history_id', $jpa->id)->where('status', true)->count();
        $jpa->failed = HistoryDetail::where('sending_history_id', $jpa->id)->where('status', false)->count();
        $jpa->save();
    }
}
