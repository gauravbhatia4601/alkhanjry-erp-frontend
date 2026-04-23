<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quotation_items', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('quotation_id')->constrained('quotations')->cascadeOnDelete();
            $table->foreignId('product_id')->constrained('products');
            $table->string('product_name', 255);
            $table->integer('quantity')->default(1);
            $table->decimal('unit_price', 12, 2);
            $table->decimal('vat_rate', 5, 2)->default(5.00);
            $table->decimal('vat_amount', 12, 2)->default(0.00);
            $table->decimal('total', 12, 2)->default(0.00);
            $table->timestamps();
            $table->index('quotation_id');
            $table->index('product_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quotation_items');
    }
};
