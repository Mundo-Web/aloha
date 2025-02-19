<?php

namespace App\Http\Controllers;

use App\Models\Formula;
use App\Models\FormulaHasSupply;
use App\Models\Supply;
use App\Models\UserFormula;
use Illuminate\Http\Request;

class TestResultController extends BasicController
{
    public $reactView = 'TestResult';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $userFormulaJpa = UserFormula::with(['hasTreatment', 'scalpType', 'hairType'])->find($request->formula);

        $hairGoalsJpa = Formula::whereIn('id', $userFormulaJpa->hair_goals)->get();

        $formulaIds = array_merge(
            $userFormulaJpa->hair_goals,
            [
                $userFormulaJpa->has_treatment,
                $userFormulaJpa->scalp_type,
                $userFormulaJpa->hair_type,
            ]
        );

        $fhsJpa = FormulaHasSupply::select('supply_id')
            ->whereIn('formula_id', $formulaIds)
            ->get();

        $suppliesJpa = Supply::select()
            ->whereIn('id', array_map(fn($item) => $item['supply_id'], $fhsJpa->toArray()))
            ->get();

        return [
            'user_formula' => $userFormulaJpa,
            'hair_goals' => $hairGoalsJpa,
            'supplies' => $suppliesJpa
        ];
    }
}
