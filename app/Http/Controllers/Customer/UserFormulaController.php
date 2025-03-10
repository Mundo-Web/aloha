<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\UserFormula;
use Illuminate\Http\Request;

class UserFormulaController extends BasicController
{
    public $model = UserFormula::class;

    public function afterSave(Request $request, object $jpa, bool $isNew)
    {
        return $jpa;
    }
}
