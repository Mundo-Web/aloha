<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\MailingTemplate;
use App\Models\SendingHistory;
use Illuminate\Http\Request;
use SoDe\Extend\JSON;
use SoDe\Extend\Trace;

class SendingHistoryController extends BasicController
{
    public $model = SendingHistory::class;
    public $reactView = 'Admin/SendingHistory';	

    public function beforeSave(Request $request)
    {
        $mapping = JSON::parse($request->input('mapping'));
        $data = JSON::parse(file_get_contents($request->file('data')));

        $templateJpa = MailingTemplate::find($request->input('template_id'));

        return [
            'template_id' => $templateJpa->id,
            'name' => $templateJpa->name . ' - ' . Trace::getDate('mysql'),
            // 'description' => '',
            'type' => $templateJpa->type,
            'mapping' => $mapping,
            'total' => count($data),
        ];
    }
}
