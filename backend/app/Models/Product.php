<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $category_id
 * @property string $sku
 * @property string $name
 * @property ?string $description
 * @property float $purchase_price
 * @property float $selling_price
 * @property float $vat_rate
 * @property int $current_stock
 * @property int $min_stock_level
 * @property string $unit
 * @property ?string $location
 * @property bool $is_active
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read Category $category
 * @property-read \Illuminate\Database\Eloquent\Collection<int, StockMovement> $stockMovements
 * @property-read \Illuminate\Database\Eloquent\Collection<int, InvoiceItem> $invoiceItems
 * @property-read \Illuminate\Database\Eloquent\Collection<int, QuotationItem> $quotationItems
 */
class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'sku',
        'name',
        'description',
        'purchase_price',
        'selling_price',
        'vat_rate',
        'current_stock',
        'min_stock_level',
        'unit',
        'location',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'purchase_price' => 'decimal:2',
            'selling_price' => 'decimal:2',
            'vat_rate' => 'decimal:2',
            'current_stock' => 'integer',
            'min_stock_level' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function scopeActive($query): void
    {
        $query->where('is_active', true);
    }

    public function scopeLowStock($query): void
    {
        $query->whereColumn('current_stock', '<=', 'min_stock_level');
    }

    public function scopeOutOfStock($query): void
    {
        $query->where('current_stock', '<=', 0);
    }

    public function scopeInStock($query): void
    {
        $query->where('current_stock', '>', 0);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function stockMovements(): HasMany
    {
        return $this->hasMany(StockMovement::class);
    }

    public function invoiceItems(): HasMany
    {
        return $this->hasMany(InvoiceItem::class);
    }

    public function quotationItems(): HasMany
    {
        return $this->hasMany(QuotationItem::class);
    }

    public function isLowStock(): bool
    {
        return $this->current_stock <= $this->min_stock_level;
    }

    public function isOutOfStock(): bool
    {
        return $this->current_stock <= 0;
    }
}
