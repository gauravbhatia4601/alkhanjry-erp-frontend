<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        $today = now()
            ->startOfDay();
        $startOfMonth = now()
            ->startOfMonth();

        $salesToday = (float) Invoice::query()
            ->where('status', 'confirmed')
            ->whereDate('invoice_date', $today)
            ->sum('total');

        $salesMonth = (float) Invoice::query()
            ->where('status', 'confirmed')
            ->whereBetween('invoice_date', [$startOfMonth, now()])
            ->sum('total');

        $totalInvoices = Invoice::count();
        $invoicesToday = Invoice::query()
            ->whereDate('invoice_date', $today)
            ->count();
        $draftCount = Invoice::query()
            ->where('status', 'draft')
            ->count();
        $confirmedCount = Invoice::query()
            ->where('status', 'confirmed')
            ->count();
        $cancelledCount = Invoice::query()
            ->where('status', 'cancelled')
            ->count();
        $overdueCount = Invoice::query()
            ->where('payment_status', '!=', 'paid')
            ->whereNotNull('due_date')
            ->where('due_date', '<', now())
            ->where('status', '!=', 'cancelled')
            ->count();

        $outstanding = (float) Invoice::query()
            ->where('status', 'confirmed')
            ->where('payment_status', '!=', 'paid')
            ->select(DB::raw('SUM(total - paid_amount) as outstanding'))
            ->value('outstanding') ?? 0.00;

        $todayReceived = (float) Payment::query()
            ->whereDate('paid_at', $today)
            ->sum('amount');

        $totalProducts = Product::query()
            ->where('is_active', true)
            ->count();
        $lowStockCount = Product::lowStock()
            ->count();
        $outOfStockCount = Product::outOfStock()
            ->count();

        $recentInvoices = Invoice::query()
            ->with(['customer:id,name'])
            ->select([
                'id',
                'invoice_number',
                'customer_id',
                'total',
                'status',
                'payment_status',
                'invoice_date',
            ])
            ->latest('invoice_date')
            ->limit(7)
            ->get()
            ->map(fn(Invoice $invoice): array => [
                'id' => $invoice->id,
                'number' => $invoice->invoice_number,
                'customer_name' => $invoice->customer?->name,
                'total' => (float) $invoice->total,
                'status' => $invoice->status,
                'payment_status' => $invoice->payment_status,
                'invoice_date' => $invoice->invoice_date?->toDateTimeString(),
            ]);

        $lowStockProducts = Product::query()
            ->where('is_active', true)
            ->whereColumn('current_stock', '<=', 'min_stock_level')
            ->select([
                'id',
                'sku',
                'name',
                'current_stock',
                'min_stock_level',
            ])
            ->limit(10)
            ->get();

        $topSelling = DB::table('invoice_items')
            ->join('products', 'invoice_items.product_id', '=', 'products.id')
            ->join('invoices', 'invoice_items.invoice_id', '=', 'invoices.id')
            ->where('invoices.status', 'confirmed')
            ->whereBetween('invoices.invoice_date', [$startOfMonth, now()])
            ->select(
                'products.id',
                'products.sku',
                'products.name',
                DB::raw('SUM(invoice_items.quantity) as quantity_sold')
            )
            ->groupBy('products.id', 'products.sku', 'products.name')
            ->orderByDesc('quantity_sold')
            ->limit(5)
            ->get();

        return $this->respondSuccess([
            'sales' => [
                'today' => $salesToday,
                'month' => $salesMonth,
            ],
            'invoices' => [
                'total' => $totalInvoices,
                'today' => $invoicesToday,
                'draft' => $draftCount,
                'confirmed' => $confirmedCount,
                'cancelled' => $cancelledCount,
                'overdue' => $overdueCount,
            ],
            'payments' => [
                'outstanding_amount' => $outstanding,
                'today_received' => $todayReceived,
            ],
            'inventory' => [
                'total_products' => $totalProducts,
                'low_stock' => $lowStockCount,
                'out_of_stock' => $outOfStockCount,
            ],
            'recent_invoices' => $recentInvoices,
            'low_stock_products' => $lowStockProducts,
            'top_selling' => $topSelling,
        ]);
    }
}
