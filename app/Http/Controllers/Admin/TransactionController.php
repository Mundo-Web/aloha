<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends BasicController
{
    public $model = Transaction::class;
    public $reactView = 'Admin/Transactions';
}
