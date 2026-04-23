<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $quotation_number
 * @property int $customer_id
 * @property int $user_id
 * @property \Carbon\Carbon $quotation_date
 * @property ?\Carbon\Carbon $expiry_date
 * @property float $subtotal
 * @property float $vat_amount
 * @property float $total
 * @property string $status
 * @property ?int $converted_to_invoice_id
 * @property ?string $notes
 * @property ?string $deleted_at
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read Customer $customer
 * @property-read User $user
 * @property-read \Illuminate\Database\Eloquent\Collection<int, QuotationItem> $items
 * @property-read ?Invoice $convertedInvoice
 */
class Quotation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'quotation_number',
        'customer_id',
        'user_id',
        'quotation_date',
        'expiry_date',
        'subtotal',
        'vat_amount',
        'total',
        'status',
        'converted_to_invoice_id',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'quotation_date' => 'datetime',
            'expiry_date' => 'datetime',
            'subtotal' => 'decimal:2',
            'vat_amount' => 'decimal:2',
            'total' => 'decimal:2',
        ];
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(QuotationItem::class);
    }

    public function convertedInvoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class, 'converted_to_invoice_id');
    }

    public function scopeDraft($query): void
    {
        $query->where('status', 'draft');
    }

    public function scopeSent($query): void
    {
        $query->where('status', 'sent');
    }

    public function scopeAccepted($query): void
    {
        $query->where('status', 'accepted');
    }

    public function scopeRejected($query): void
    {
        $query->where('status', 'rejected');
    }

    public function scopeConverted($query): void
    {
        $query->where('status', 'converted');
    }

    public function scopeExpired($query): void
    {
        $query->where('status', 'expired')
            ->orWhere(function ($query): void {
                $query->where('status', 'sent')
                    ->whereNotNull('expiry_date')
                    ->where('expiry_date', '<', now());
            });
    }

    public function isDraft(): bool
    {
        return $this->status === 'draft';
    }

    public function isConverted(): bool
    {
        return $this->status === 'converted';
    }

    public function isExpired(): bool
    {
        return $this->status === 'expired' ||
            ($this->status === 'sent' && $this->expiry_date && $this->expiry_date->isPast());
    }

    public function canConvert(): bool
    {
        return in_array($this->status, ['draft', 'sent', 'accepted'], true);
    }
}
