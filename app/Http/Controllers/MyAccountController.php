<?php

namespace App\Http\Controllers;

use App\Models\Formula;
use App\Models\Sale;
use App\Models\UserFormulas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MyAccountController extends BasicController
{
    public $reactView = 'MyAccount';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $user = Auth::user();
        $formulasJpa = UserFormulas::with([
            'hasTreatment',
            'scalpType',
            'hairType',
            'fragrance',
        ])
            ->where('email', $user->email)
            ->get();
        $formulas = [];
        foreach ($formulasJpa as $formulaJpa) {
            $hair_goals = Formula::whereIn('id', $formulaJpa->hair_goals)->get();
            $formulas[] = \array_merge($formulaJpa->toArray(), ['hair_goals' => $hair_goals]);
        }
        $sales = Sale::with(['status', 'details', 'renewal', 'bundle', 'coupon'])
        ->where('email', Auth::user()->email)
        ->get();
        return [
            'formulas' => $formulas,
            'sales' => $sales
        ];
    }
}
