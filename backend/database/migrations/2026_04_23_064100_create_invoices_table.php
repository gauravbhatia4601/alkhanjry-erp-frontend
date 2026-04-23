<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table): void {
            $table->id();
            $table->string('invoice_number', 50)->unique();
            $table->foreignId('customer_id')->constrained('customers');
            $table->foreignId('user_id')->constrained('users');
            $table->dateTime('invoice_date');
            $table->dateTime('due_date')->nullable();
            $table->decimal('subtotal', 12, 2)->default(0.00);
            $table->decimal('vat_amount', 12, 2)->default(0.00);
            $table->decimal('total', 12, 2)->default(0.00);
            $table->decimal('paid_amount', 12, 2)->default(0.00);
            $table->string('status', 20)->default('draft'); // draft, sent, confirmed, cancelled
            $table->string('payment_status', 20)->default('unpaid'); // unpaid, partial, paid
            $table->string('payment_method', 20)->nullable(); // cash, bank_transfer, cheque, online
            $table->string('cancel_reason', 255)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('invoice_number');
            $table->index(['customer_id', 'status']);
            $table->index(['payment_status', 'status']);
            $table->index('invoice_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
