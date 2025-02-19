<?php

namespace App\Http\Controllers;

use App\Models\Bundle;
use App\Models\Color;
use App\Models\Item;
use App\Models\Renewal;
use App\Models\UserFormula;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FormulaController extends BasicController
{
    public $reactView = 'Formula';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $userFormulaJpa = UserFormula::find($request->formula);
        if (!$userFormulaJpa) return redirect()->route('Test.jsx');

        $itemsJpa = Item::with('colors')
            ->where('visible', true)
            ->where('status', true)
            ->get();

        $bundlesJpa = Bundle::with(['items'])
            ->where('status', true)
            ->get();

        // $planesJpa = [];
        // if (Auth::check()) {
        $planesJpa = Renewal::today()
            ->where('status', true)
            ->where('visible', true)
            ->get();
        // }

        return [
            'user_formula' => $userFormulaJpa,
            'items' => $itemsJpa,
            'bundles' => $bundlesJpa,
            'planes' => $planesJpa,
            'publicKey' => env('CULQI_PUBLIC_KEY')
        ];
    }
}
