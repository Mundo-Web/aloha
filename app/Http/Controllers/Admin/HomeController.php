<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Sale;
use App\Models\User;
use App\Models\UserFormula;
use Illuminate\Http\Request;

class HomeController extends BasicController
{
    public $reactView = 'Admin/Home';
    public $reactRootView = 'admin';

    public function setReactViewProperties(Request $request)
    {
        $newClients = User::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as count')
            ->where('created_at', '>=', now()->subMonths(2))
            ->groupBy('year', 'month')
            ->limit(2)
            ->get();

        // Consulta a la tabla user_formulas
        $topFormulas = UserFormula::with(['hasTreatment', 'scalpType', 'hairType'])
            ->selectRaw('user_formulas.has_treatment, user_formulas.scalp_type, user_formulas.hair_type, COUNT(*) as count')
            ->join('sales', 'sales.user_formula_id', 'user_formulas.id')
            ->join('statuses', 'statuses.id', '=', 'sales.status_id')
            ->where('statuses.is_ok', true)
            ->whereIn('user_formulas.id', Sale::select('user_formula_id'))
            ->groupBy('user_formulas.has_treatment', 'user_formulas.scalp_type', 'user_formulas.hair_type')
            ->orderBy('count', 'DESC')
            ->limit(5)
            ->get();

        // Obtener el total de ventas con is_ok en true
        $totalSales = Sale::join('statuses', 'statuses.id', '=', 'sales.status_id')
            ->where('statuses.is_ok', true)
            ->count();

        // Obtener el total de ventas con is_ok en true agrupadas por día para los últimos 30 días
        $totalSalesLast30Days = Sale::join('statuses', 'statuses.id', '=', 'sales.status_id')
            ->where('statuses.is_ok', true)
            ->where('sales.created_at', '>=', now()->subDays(30))
            ->selectRaw('DATE(sales.created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->get();

        // Obtener el total de ventas con is_ok en true agrupadas por mes para los últimos 12 meses
        $totalSalesLast12Months = Sale::join('statuses', 'statuses.id', '=', 'sales.status_id')
            ->where('statuses.is_ok', true)
            ->where('sales.created_at', '>=', now()->subMonths(12))
            ->selectRaw('MONTH(sales.created_at) as month, YEAR(sales.created_at) as year, COUNT(*) as count')
            ->groupBy('month', 'year')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();

        // Obtener el total de ventas con is_ok en true agrupadas por año para los últimos 10 años
        $totalSalesLast10Years = Sale::join('statuses', 'statuses.id', '=', 'sales.status_id')
            ->where('statuses.is_ok', true)
            ->where('sales.created_at', '>=', now()->subYears(10))
            ->selectRaw('YEAR(sales.created_at) as year, COUNT(*) as count')
            ->groupBy('year')
            ->orderBy('year', 'desc')
            ->get();

        return [
            'newClients' => $newClients,
            'topFormulas' => $topFormulas,
            'totalSales' => $totalSales,
            'totalSalesLast30Days' => $totalSalesLast30Days,
            'totalSalesLast12Months' => $totalSalesLast12Months,
            'totalSalesLast10Years' => $totalSalesLast10Years,
        ];
    }
}
