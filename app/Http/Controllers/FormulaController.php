<?php

namespace App\Http\Controllers;

use App\Models\Bundle;
use App\Models\Color;
use App\Models\Item;
use App\Models\Renewal;
use App\Models\SaleDetail;
use App\Models\UserFormula;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use SoDe\Extend\JSON;

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

        $defaultColors = SaleDetail::join('sales', 'sales.id', '=', 'sale_details.sale_id')
            ->join('statuses', 'statuses.id', '=', 'sales.status_id')
            ->where('statuses.is_ok', true)
            ->where('sales.created_at', '>=', now()->subDays(30))
            ->whereRaw("JSON_LENGTH(colors) > 0")
            ->selectRaw("
                sale_details.item_id,
                colors as colors_json,
                COUNT(*) as quantity
            ")
            ->groupBy('item_id', 'colors_json')
            ->orderBy('quantity', 'DESC')
            ->get()
            ->map(function ($detail) {
                $colors = json_decode($detail->colors_json, true);
                return [
                    'item_id' => $detail->item_id,
                    'colors' => collect($colors)->map(function ($color) use ($detail) {
                        $colorModel = Color::query()
                            ->where('item_id', $detail->item_id)
                            ->where('hex', $color['hex'])
                            ->first();
                        return [
                            'id' => $colorModel ? $colorModel->id : null,
                            'quantity' => $detail->quantity
                        ];
                    })->filter(fn($color) => $color['id']),
                    'quantity' => $detail->quantity
                ];
            })
            ->groupBy('item_id')
            ->mapWithKeys(function ($items, $itemId) {
                $mostUsedColor = $items->pluck('colors')
                    ->flatten(1)
                    ->groupBy('id')
                    ->map(fn($group) => $group->sum('quantity'))
                    ->sortDesc()
                    ->keys()
                    ->first();

                return [$itemId => $mostUsedColor];
            });

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

        $other_formulas = UserFormula::where('parent_id', $userFormulaJpa->id)
            ->where('status', true)
            ->where('id', '<>', $userFormulaJpa->id)
            ->get();

        return [
            'user_formula' => $userFormulaJpa,
            'other_formulas' => $other_formulas,
            'items' => $itemsJpa,
            'defaultColors' => $defaultColors,
            'bundles' => $bundlesJpa,
            'planes' => $planesJpa,
            'publicKey' => env('CULQI_PUBLIC_KEY')
        ];
    }
}
