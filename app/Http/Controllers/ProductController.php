<?php

namespace App\Http\Controllers;

use App\Models\UserFormula;
use Illuminate\Http\Request;

class ProductController extends BasicController
{
    public $reactView = 'Products';
    public $reactRootView = 'public';

    function setReactViewProperties(Request $request)
    {
        $userFormulaJpa = UserFormula::find($request->formula);

        if (!$userFormulaJpa) return redirect()->route('Home.jsx');

        return [
            'user_formula' => $userFormulaJpa
        ];
    }
}
