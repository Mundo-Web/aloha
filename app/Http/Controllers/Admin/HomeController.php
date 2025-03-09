<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Color;
use App\Models\Sale;
use App\Models\SaleDetail;
use App\Models\User;
use App\Models\UserFormula;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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



        // Get most popular colors
        $topColors = SaleDetail::join('sales', 'sales.id', '=', 'sale_details.sale_id')
            ->join('statuses', 'statuses.id', '=', 'sales.status_id')
            ->where('statuses.is_ok', true)
            ->where('sales.created_at', '>=', now()->subDays(30))
            ->selectRaw("
                JSON_UNQUOTE(JSON_EXTRACT(colors, '$[*].hex')) as hex,
                COUNT(*) as quantity
            ")
            ->groupBy('hex')
            ->orderBy('quantity', 'DESC')
            ->limit(5)
            ->get();

        $colors = Color::select(['name', 'hex'])
            ->distinct('name')
            ->whereIn(
                'hex',
                array_map(
                    fn($x) => \str_replace(['[', ']', '"', '\\'], '', $x['hex']),
                    $topColors->toArray()
                )
            )
            ->get()
            ->map(function ($color) use ($topColors) {
                $found = $topColors->first(fn($x) => str_contains(strtolower($x['hex']), strtolower($color->hex)));
                return (object)[
                    'name' => $color->name,
                    'hex' => $color->hex,
                    'quantity' => $found ? $found->quantity : 0
                ];
            });

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

        return [
            'newClients' => $newClients,
            'repurchaseRate' => $repurchaseRate,
            'topCities' => $topCities,
            'topColors' => $colors,
            'treatmentStats' => $treatmentStats,
            'scalpTypeStats' => $scalpTypeStats,
            'hairTypeStats' => $hairTypeStats,
            'fragranceStats' => $fragranceStats,
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
