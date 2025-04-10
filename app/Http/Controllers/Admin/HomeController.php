<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Color;
use App\Models\Formula;
use App\Models\Sale;
use App\Models\SaleDetail;
use App\Models\UserFormula;
use Illuminate\Http\Request;
use SoDe\Extend\JSON;
use SoDe\Extend\Response;

class HomeController extends BasicController
{
    public $reactView = 'Admin/Home';
    public $reactRootView = 'admin';

    public function setReactViewProperties(Request $request)
    {
        $newClients = Sale::selectRaw('YEAR(sales.created_at) as year, MONTH(sales.created_at) as month, COUNT(DISTINCT email) as count')
            ->join('statuses', 'statuses.id', '=', 'sales.status_id')
            ->where('statuses.is_ok', true)
            ->where('sales.created_at', '>=', now()->subMonths(2))
            ->groupBy('year', 'month')
            ->limit(2)
            ->get();

        // Calcular tasa de recompra
        $customerPurchases = Sale::join('statuses', 'statuses.id', '=', 'sales.status_id')
            ->where('sales.created_at', '>=', now()->subDays(30))
            ->where('statuses.is_ok', true)
            ->selectRaw('
                email,
                COUNT(*) as purchase_count,
                COUNT(DISTINCT DATE(sales.created_at)) as purchase_days
            ')
            ->groupBy('email')
            ->get();

        $repurchaseRate = (object)[
            'total_customers' => $customerPurchases->count(),
            'returning_customers' => $customerPurchases->where('purchase_count', '>', 1)->count(),
            'repurchase_rate' => $customerPurchases->count() > 0
                ? ($customerPurchases->where('purchase_count', '>', 1)->count() * 100.0 / $customerPurchases->count())
                : 0
        ];

        // Get location statistics
        $topCities = Sale::join('statuses', 'statuses.id', '=', 'sales.status_id')
            ->where('statuses.is_ok', true)
            ->where('sales.created_at', '>=', now()->subDays(30))
            ->where('department', 'Lima Metropolitana')
            ->selectRaw('
                department,
                COALESCE(province, district) as city,
                COUNT(*) as count,
                SUM(total_amount) as amount
            ')
            ->groupBy('department', 'city')
            ->orderBy('amount', 'DESC')
            ->orderBy('count', 'DESC')
            ->limit(10)
            ->get();

        $topOtherCities = Sale::join('statuses', 'statuses.id', '=', 'sales.status_id')
            ->where('statuses.is_ok', true)
            ->where('sales.created_at', '>=', now()->subDays(30))
            ->where('department', '!=', 'Lima Metropolitana')
            ->selectRaw('
                department,
                COALESCE(province, district) as city,
                COUNT(*) as count,
                SUM(total_amount) as amount
            ')
            ->groupBy('department', 'city')
            ->orderBy('amount', 'DESC')
            ->orderBy('count', 'DESC')
            ->limit(5)
            ->get();

        // Get most popular colors
        $topColors = SaleDetail::join('sales', 'sales.id', '=', 'sale_details.sale_id')
            ->join('statuses', 'statuses.id', '=', 'sales.status_id')
            ->where('statuses.is_ok', true)
            ->where('sales.created_at', '>=', now()->subDays(30))
            ->whereRaw("JSON_LENGTH(colors) > 0")
            ->selectRaw("
                sale_details.name as item,
                colors as colors_json,
                COUNT(*) as quantity
            ")
            ->groupBy('item', 'colors_json')
            ->orderBy('quantity', 'DESC')
            ->get()
            ->map(function ($detail) {
                $colors = json_decode($detail->colors_json, true);
                return [
                    'item' => $detail->item,
                    'colors' => collect($colors)->map(function ($color) use ($detail) {
                        $colorModel = Color::where('hex', $color['hex'])->first();
                        return [
                            'name' => $colorModel ? $colorModel->name : 'Unknown',
                            'hex' => $color['hex'],
                            'quantity' => $detail->quantity
                        ];
                    }),
                    'quantity' => $detail->quantity
                ];
            })
            ->groupBy('item')
            ->map(function ($items, $itemName) {
                $totalQuantity = $items->sum('quantity');
                $colorCounts = $items->pluck('colors')
                    ->flatten(1)
                    ->groupBy('hex')
                    ->map(function ($colorGroup) {
                        $first = $colorGroup->first();
                        return [
                            'name' => $first['name'],
                            'hex' => $first['hex'],
                            'quantity' => $colorGroup->sum('quantity')
                        ];
                    })
                    ->values();

                return [
                    'item' => $itemName,
                    'total_quantity' => $totalQuantity,
                    'colors' => $colorCounts
                ];
            })
            ->values();

        $treatmentStats = UserFormula::with(['hasTreatment'])
            ->selectRaw('has_treatment, COUNT(*) as count')
            ->join('sales', 'sales.user_formula_id', 'user_formulas.id')
            ->join('statuses', 'statuses.id', '=', 'sales.status_id')
            ->where('statuses.is_ok', true)
            ->where('sales.created_at', '>=', now()->subDays(30))
            ->groupBy('has_treatment')
            ->orderBy('count', 'DESC')
            ->get();

        $scalpTypeStats = UserFormula::with(['scalpType'])
            ->selectRaw('scalp_type, COUNT(*) as count')
            ->join('sales', 'sales.user_formula_id', 'user_formulas.id')
            ->join('statuses', 'statuses.id', '=', 'sales.status_id')
            ->where('statuses.is_ok', true)
            ->where('sales.created_at', '>=', now()->subDays(30))
            ->groupBy('scalp_type')
            ->orderBy('count', 'DESC')
            ->get();

        $hairTypeStats = UserFormula::with(['hairType'])
            ->selectRaw('hair_type, COUNT(*) as count')
            ->join('sales', 'sales.user_formula_id', 'user_formulas.id')
            ->join('statuses', 'statuses.id', '=', 'sales.status_id')
            ->where('statuses.is_ok', true)
            ->where('sales.created_at', '>=', now()->subDays(30))
            ->groupBy('hair_type')
            ->orderBy('count', 'DESC')
            ->get();

        $fragranceStats = UserFormula::with(['fragrance'])
            ->selectRaw('fragrance_id, COUNT(*) as count')
            ->join('sales', 'sales.user_formula_id', 'user_formulas.id')
            ->join('statuses', 'statuses.id', '=', 'sales.status_id')
            ->where('statuses.is_ok', true)
            ->where('sales.created_at', '>=', now()->subDays(30))
            ->groupBy('fragrance_id')
            ->with('fragrance')
            ->orderBy('count', 'DESC')
            ->get();

        $hairGoalsStats = UserFormula::select('hair_goals')
            ->join('sales', 'sales.user_formula_id', 'user_formulas.id')
            ->join('statuses', 'statuses.id', '=', 'sales.status_id')
            ->where('statuses.is_ok', true)
            ->where('sales.created_at', '>=', now()->subDays(30))
            ->get()
            ->pluck('hair_goals')
            ->flatten()
            ->countBy()
            ->map(function ($count, $goalId) {
                $formula = Formula::find($goalId);
                return [
                    'id' => $goalId,
                    'name' => $formula ? $formula->description : 'Unknown',
                    'count' => $count
                ];
            })
            ->sortByDesc('count')
            ->values();

        return [
            'newClients' => $newClients,
            'repurchaseRate' => $repurchaseRate,
            'topCities' => $topCities,
            'topOtherCities' => $topOtherCities,
            'topColors' => $topColors,
            'treatmentStats' => $treatmentStats,
            'scalpTypeStats' => $scalpTypeStats,
            'hairTypeStats' => $hairTypeStats,
            'fragranceStats' => $fragranceStats,
            'hairGoalsStats' => $hairGoalsStats
        ];
    }

    public function getSales(Request $request, string $param)
    {
        $response = Response::simpleTryCatch(function () use ($param) {
            switch ($param) {
                case 'years':
                    $data = Sale::join('statuses', 'statuses.id', '=', 'sales.status_id')
                        ->where('sales.created_at', '>=', now()->subYears(10))
                        ->selectRaw('
                            YEAR(sales.created_at) as year, 
                            COUNT(*) as total_count,
                            SUM(CASE WHEN statuses.is_ok = true THEN 1 ELSE 0 END) as count
                        ')
                        ->groupBy('year')
                        ->orderBy('year', 'desc')
                        ->get();
                    break;
                case 'months':
                    $data = Sale::join('statuses', 'statuses.id', '=', 'sales.status_id')
                        ->where('sales.created_at', '>=', now()->subMonths(12))
                        ->selectRaw('
                            MONTH(sales.created_at) as month, 
                            YEAR(sales.created_at) as year, 
                            COUNT(*) as total_count,
                            SUM(CASE WHEN statuses.is_ok = true THEN 1 ELSE 0 END) as count
                        ')
                        ->groupBy('month', 'year')
                        ->orderBy('year', 'desc')
                        ->orderBy('month', 'desc')
                        ->get();
                    break;
                default:
                    $data = Sale::join('statuses', 'statuses.id', '=', 'sales.status_id')
                        ->where('sales.created_at', '>=', now()->subDays(30))
                        ->selectRaw('
                            DATE(sales.created_at) as date, 
                            COUNT(*) as total_count,
                            SUM(CASE WHEN statuses.is_ok = true THEN 1 ELSE 0 END) as count
                        ')
                        ->groupBy('date')
                        ->orderBy('date', 'desc')
                        ->get();
                    break;
            }
            return $data;
        });
        return response($response->toArray(), $response->status);
    }
}
