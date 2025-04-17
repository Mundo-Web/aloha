<?php

namespace App\Http\Controllers;

use App\Models\Formula;
use App\Models\Fragrance;
use App\Models\User;
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
        $hair_thickness = Formula::where('name', 'hair_thickness')->get();
        $hair_goals = Formula::where('name', 'hair_goals')->get();
        $fragrances = Fragrance::select()
            ->where('visible', true)
            ->where('status', true)
            ->get();

        $userFormulasCount = 0;

        $userJpa = User::find(Auth::id());

        // if (Auth::check() && Auth::user()->hasRole('Customer')) {
        if ($userJpa?->hasRole('Customer')) {
            $userFormulasCount = UserFormula::where('user_id', Auth::user()->id)
                ->orWhere('email', Auth::user()->email)
                ->count();
        }

        $formulaJpa = UserFormula::find($request->formula);
        $otherFormulasCount = 0;
        if ($formulaJpa) {
            $otherFormulasCount = UserFormula::where('parent_id', $formulaJpa->id)
                ->where('status', true)
                ->where('id', '<>', $formulaJpa->id)
                ->count();
        }

        return [
            'hasTreatment' => $has_treatment,
            'scalpType' => $scalp_type,
            'hairType' => $hair_type,
            'hairThickness' => $hair_thickness,
            'hairGoals' => $hair_goals,
            'fragrances' => $fragrances,
            'userFormulasCount' => $userFormulasCount,
            'formula' => $formulaJpa,
            'otherFormulasCount' => $otherFormulasCount,
        ];
    }
}
