<?php

use App\Http\Controllers\Admin\MailingTemplateController;
use App\Http\Controllers\Admin\SendingHistoryController as AdminSendingHistoryController;
use App\Http\Controllers\HistoryDetailController;
use App\Http\Controllers\MailingController;
use App\Http\Controllers\SendingHistoryController;
use Illuminate\Support\Facades\Route;

Route::get('/template/{id}', [MailingTemplateController::class, 'get']);
Route::post('/template', [MailingTemplateController::class, 'save']);

Route::prefix('mailing')->group(function () {
    Route::post('/send', [MailingController::class, 'send']);
    Route::get('/execute', [AdminSendingHistoryController::class, 'execute']);
    Route::post('/history', [SendingHistoryController::class, 'save']);
    Route::post('/history/detail', [HistoryDetailController::class, 'save']);
});
