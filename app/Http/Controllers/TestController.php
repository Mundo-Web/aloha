<?php

namespace App\Http\Controllers;

use App\Models\Formula;
use App\Models\Fragrance;
use App\Models\UserFormula;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TestController extends BasicController
{
    public $reactView = 'Test';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $has_treatment = Formula::where('name', 'has_treatment')->get();
        $scalp_type = Formula::where('name', 'scalp_type')->get();
        $hair_type = Formula::where('name', 'hair_type')->get();
        $hair_goals = Formula::where('name', 'hair_goals')->get();
        $fragrances = Fragrance::select()
            ->where('visible', true)
            ->where('status', true)
            ->get();

        $userFormulasCount = 0;
        if (Auth::check() && Auth::user()->hasRole('Customer')) {
            $userFormulasCount = UserFormula::where('user_id', Auth::user()->id)
            ->orWhere('email', Auth::user()->email)
            ->count();
        }

        return [
            'hasTreatment' => $has_treatment,
            'scalpType' => $scalp_type,
            'hairType' => $hair_type,
            'hairGoals' => $hair_goals,
            'fragrances' => $fragrances,
            'userFormulasCount' => $userFormulasCount
        ];
    }
}
