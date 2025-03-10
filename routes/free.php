<?php

use App\Http\Controllers\Admin\SendingHistoryController;
use Illuminate\Support\Facades\Route;

Route::get('/mailing/execute', [SendingHistoryController::class, 'execute']);
