<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('invoice_id')->constrained('invoices')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users');
            $table->decimal('amount', 12, 2);
            $table->string('method', 20); // cash, bank_transfer, cheque, online
            $table->string('reference_number', 100)->nullable();
            $table->dateTime('paid_at');
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->index('invoice_id');
            $table->index(['method', 'paid_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
