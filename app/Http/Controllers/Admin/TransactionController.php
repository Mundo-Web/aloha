<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Sale;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use SoDe\Extend\Fetch;
use SoDe\Extend\JSON;
use SoDe\Extend\Response;

class TransactionController extends BasicController
{
    public $model = Transaction::class;
    public $reactView = 'Admin/Transactions';

    public function revenues()
    {
        $response = Response::simpleTryCatch(function () {
            $lastDate = DB::table('transactions')
                ->where('category', 'Ventas')
                ->where('automatically_created', true)
                ->max('date');

            if (!$lastDate) {
                $lastDate = Sale::min(DB::raw('DATE(created_at)'));
            }

            $sales = Sale::selectRaw('DATE(sales.created_at) as date, SUM(sales.total_amount) as daily_total')
                ->join('statuses', 'statuses.id', 'sales.status_id')
                ->where('statuses.is_ok', true)
                ->where(DB::raw('DATE(sales.created_at)'), '>', $lastDate)
                ->where(DB::raw('DATE(sales.created_at)'), '<', now()->toDateString())
                ->groupBy('date')
                ->get();

            foreach ($sales as $sale) {
                // Get sales grouped by origin for this date
                $salesByOrigin = Sale::selectRaw('
                    origin,
                    COUNT(*) as count,
                    SUM(total_amount) as total
                ')
                    ->join('statuses', 'statuses.id', 'sales.status_id')
                    ->where('statuses.is_ok', true)
                    ->where(DB::raw('DATE(sales.created_at)'), $sale->date)
                    ->groupBy('origin')
                    ->get();
                // Initialize counters
                $totalSales = 0;
                $totalAmount = 0;
                $adSales = 0;
                $adAmount = 0;
                $webSales = 0;
                $webAmount = 0;
                $instagramSales = 0;
                $upsellSales = 0;
                $repeatSales = 0;
                $repeatAmount = 0;

                $origins = [];
                foreach ($salesByOrigin as $originSale) {
                    $totalSales += $originSale->count;
                    $totalAmount += $originSale->total;

                    if ($originSale->origin === 'Web') {
                        $adSales += $originSale->count;
                        $adAmount += $originSale->total;
                        $webSales += $originSale->count;
                        $webAmount += $originSale->total;
                    } elseif ($originSale->origin === 'Instagram') {
                        $instagramSales += $originSale->count;
                    } elseif ($originSale->origin === 'Upsell') {
                        $upsellSales += $originSale->count;
                    } elseif ($originSale->origin === 'Recompra') {
                        $repeatSales += $originSale->count;
                        $repeatAmount += $originSale->total;
                    } else {
                        $origins[$originSale->origin] = [
                            'count' => $originSale->count,
                            'total' => $originSale->total,
                        ];
                    }
                }
                $template = '------------------------------
FECHA: ' . date('d/m/Y', strtotime($sale->date)) . '
VENTAS: ' . $totalSales . '
TOTAL: S/ ' . number_format($totalAmount, 2) . '
V.PUBLI: ' . $adSales . ' (S/ ' . number_format($adAmount, 2) . ')
------------------------------
WEB: ' . $webSales . ' (S/ ' . number_format($webAmount, 2) . ')
INSTAGRAM: ' . $instagramSales . '
UPSELL: ' . $upsellSales . '
RECOMPRA: ' . $repeatSales . ' (S/ ' . number_format($repeatAmount, 2) . ')';

                foreach ($origins as $origin => $originData) {
                    $template .= '\n' . $origin . ': ' . $originData['count'] . '(S/ ' . number_format($originData['total'], 2) . ')';
                }
                dump($template . '
------------------------------');

                $url = env('WA_URL') . '/api/send';
                $res = new Fetch($url, [
                    'method' => 'POST',
                    'headers' => [
                        'Accept' => 'application/json',
                        'Content-Type' => 'application/json',
                    ],
                    'body' => [
                        'from' => env('APP_CORRELATIVE'),
                        'to' => ['51999413711'],
                        'content' => $template,
                    ],
                ]);

                dump($url);
                dump($res->text());

                DB::table('transactions')->insert([
                    'category' => 'Ventas',
                    'description' => env('APP_NAME') . ' - ' . $sale->date,
                    'date' => $sale->date,
                    'payment_method' => 'Tarjeta',
                    'amount' => $sale->daily_total,
                    'automatically_created' => true,
                    'note' => $template
                ]);
            }
        });
        return response($response->toArray(), $response->status);
    }
}
