<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $quotation_id
 * @property int $product_id
 * @property string $product_name
 * @property int $quantity
 * @property float $unit_price
 * @property float $vat_rate
 * @property float $vat_amount
 * @property float $total
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read Quotation $quotation
 * @property-read Product $product
 */
class QuotationItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'quotation_id',
        'product_id',
        'product_name',
        'quantity',
        'unit_price',
        'vat_rate',
        'vat_amount',
        'total',
    ];

    protected function casts(): array
    {
        return [
            'quantity' => 'integer',
            'unit_price' => 'decimal:2',
            'vat_rate' => 'decimal:2',
            'vat_amount' => 'decimal:2',
            'total' => 'decimal:2',
        ];
    }

    public function quotation(): BelongsTo
    {
        return $this->belongsTo(Quotation::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
