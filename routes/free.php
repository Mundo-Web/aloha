<?php

use App\Http\Controllers\Admin\MailingTemplateController;
use App\Http\Controllers\Admin\SendingHistoryController as AdminSendingHistoryController;
use App\Http\Controllers\HistoryDetailController;
use App\Http\Controllers\MailingController;
use App\Http\Controllers\SendingHistoryController;
use Illuminate\Support\Facades\Route;

Route::get('/template/{id}', [MailingTemplateController::class, 'get'])->withoutMiddleware('throttle');;
Route::post('/template', [MailingTemplateController::class, 'save'])->withoutMiddleware('throttle');;

Route::prefix('mailing')->group(function () {
    Route::post('/send', [MailingController::class, 'send'])->withoutMiddleware('throttle');;
    Route::get('/execute', [AdminSendingHistoryController::class, 'execute'])->withoutMiddleware('throttle');;
    Route::post('/history', [SendingHistoryController::class, 'save'])->withoutMiddleware('throttle');;
    Route::post('/history/detail', [HistoryDetailController::class, 'save'])->withoutMiddleware('throttle');;
});
