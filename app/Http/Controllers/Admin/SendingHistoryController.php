<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Jobs\ExecuteMassiveSending;
use App\Jobs\SendMessagesJob;
use App\Models\dxDataGrid;
use App\Models\MailingTemplate;
use App\Models\SendingHistory;
use Illuminate\Http\Request;
use SoDe\Extend\JSON;
use SoDe\Extend\Response;
use SoDe\Extend\Trace;

class SendingHistoryController extends BasicController
{
    public $model = SendingHistory::class;
    public $reactView = 'Admin/SendingHistory';
    public $ignoreStatusFilter = true;

    public function execute(Request $request)
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            $templates = MailingTemplate::select('id')
                ->where('auto_send', true)
                ->where('status', true)
                ->get();
            ExecuteMassiveSending::dispatchAfterResponse($templates);
        });

        return response($response->toArray(), $response->status);
    }

    public function beforeSave(Request $request)
    {
        $templateJpa = MailingTemplate::find($request->input('template_id'));

        if ($templateJpa->auto_send) {
            $model = 'App\\Models\\' . $templateJpa->model;
            $fillable = (new $model)->getFillable();
            $mapping = [];
            foreach ($fillable as $field) {
                $mapping[$field] = $field;
            }
            $instance  = $model::select();
            $instance->where(function ($query) use ($templateJpa) {
                dxDataGrid::filter($query, $templateJpa->filters ?? [], false);
            });
            $data = $instance->get()->toArray();
        } else {
            $mapping = JSON::parse($request->input('mapping'));
            $data = JSON::parse(file_get_contents($request->file('data')));
        }

        $traceId = Trace::getDate('mysql');
        $modelName = $templateJpa->model ?? 'Externo';

        return [
            'mailing_template_id' => $templateJpa->id,
            'name' =>  "[{$modelName}] {$templateJpa->name} > {$traceId}",
            'type' => $templateJpa->type,
            'mapping' => $mapping,
            'total' => count($data),
        ];
    }

    public function afterSave(Request $request, object $jpa, bool $isNew)
    {
        $templateJpa = MailingTemplate::find($jpa->mailing_template_id);
        $model = 'App\\Models\\' . $templateJpa->model;
        $instance  = $model::distinct();
        $instance->where(function ($query) use ($templateJpa) {
            dxDataGrid::filter($query, $templateJpa->filters ?? [], false);
        });
        $data = $instance->get()->toArray();
        SendMessagesJob::dispatchAfterResponse($jpa, $data);
    }
}
