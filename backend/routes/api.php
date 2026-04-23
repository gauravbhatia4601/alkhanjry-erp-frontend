<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - Al Khanjry ERP
|--------------------------------------------------------------------------
|
| All API routes are stateless and use the JSON response envelope
| { success: bool, data: any, error: null|object, meta: object }
|
*/

Route::prefix('v1')->name('api.v1.')->group(function (): void {

    Route::get('health', [App\Http\Controllers\Api\HealthController::class, 'health'])->name('health');
    Route::get('ready', [App\Http\Controllers\Api\HealthController::class, 'ready'])->name('ready');

    Route::prefix('auth')->name('auth.')->group(function (): void {
        Route::post('login', [App\Http\Controllers\Api\AuthController::class, 'login'])->name('login');
        Route::post('logout', [App\Http\Controllers\Api\AuthController::class, 'logout'])
            ->middleware('auth:sanctum')
            ->name('logout');
        Route::post('refresh', [App\Http\Controllers\Api\AuthController::class, 'refresh'])
            ->middleware('auth:sanctum')
            ->name('refresh');
        Route::get('me', [App\Http\Controllers\Api\AuthController::class, 'me'])
            ->middleware('auth:sanctum')
            ->name('me');
    });

    Route::middleware(['auth:sanctum'])->group(function (): void {

        Route::get('dashboard', [App\Http\Controllers\Api\DashboardController::class, 'index'])->name('dashboard');

        Route::apiResource('users', App\Http\Controllers\Api\UserController::class)->names('users');
        Route::apiResource('customers', App\Http\Controllers\Api\CustomerController::class)->names('customers');
        Route::apiResource('suppliers', App\Http\Controllers\Api\SupplierController::class)->names('suppliers');
        Route::apiResource('categories', App\Http\Controllers\Api\CategoryController::class)->names('categories');
        Route::apiResource('products', App\Http\Controllers\Api\ProductController::class)->except(['show'])->names('products');

        Route::apiResource('invoices', App\Http\Controllers\Api\InvoiceController::class)->names('invoices');
        Route::post('invoices/{invoice}/confirm', [App\Http\Controllers\Api\InvoiceController::class, 'confirm'])->name('invoices.confirm');
        Route::post('invoices/{invoice}/cancel', [App\Http\Controllers\Api\InvoiceController::class, 'cancel'])->name('invoices.cancel');
        Route::get('invoices/{invoice}/print', [App\Http\Controllers\Api\InvoiceController::class, 'print'])->name('invoices.print');

        Route::apiResource('quotations', App\Http\Controllers\Api\QuotationController::class)->names('quotations');
        Route::post('quotations/{quotation}/convert', [App\Http\Controllers\Api\QuotationController::class, 'convert'])->name('quotations.convert');
        Route::post('quotations/{quotation}/send', [App\Http\Controllers\Api\QuotationController::class, 'markSent'])->name('quotations.send');

        Route::apiResource('payments', App\Http\Controllers\Api\PaymentController::class)->only(['store', 'destroy'])->names('payments');

        Route::apiResource('stock-movements', App\Http\Controllers\Api\StockMovementController::class)->only(['index', 'store'])->names('stock-movements');

        Route::apiResource('expenses', App\Http\Controllers\Api\ExpenseController::class)->names('expenses');

        Route::get('reports/sales', [App\Http\Controllers\Api\ReportController::class, 'sales'])->name('reports.sales');
        Route::get('reports/inventory', [App\Http\Controllers\Api\ReportController::class, 'inventory'])->name('reports.inventory');
        Route::get('reports/financial', [App\Http\Controllers\Api\ReportController::class, 'financial'])->name('reports.financial');
        Route::get('reports/accounts-payable', [App\Http\Controllers\Api\ReportController::class, 'accountsPayable'])->name('reports.accounts_payable');

        Route::get('activity-logs', [App\Http\Controllers\Api\ActivityLogController::class, 'index'])->name('activity-logs.index');

    });

});
