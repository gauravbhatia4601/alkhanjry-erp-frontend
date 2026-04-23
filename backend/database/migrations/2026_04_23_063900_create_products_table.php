<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->onDelete('restrict');
            $table->string('sku', 100)->unique();
            $table->string('name', 255);
            $table->text('description')->nullable();
            $table->decimal('purchase_price', 12, 2);
            $table->decimal('selling_price', 12, 2);
            $table->decimal('vat_rate', 5, 2)->default(5.00);
            $table->integer('current_stock')->default(0);
            $table->integer('min_stock_level')->default(5);
            $table->string('unit', 20)->default('piece');
            $table->string('location', 50)->nullable()->comment('Warehouse location');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->index('sku');
            $table->index('name');
            $table->index(['category_id', 'is_active']);
            $table->index('current_stock');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
