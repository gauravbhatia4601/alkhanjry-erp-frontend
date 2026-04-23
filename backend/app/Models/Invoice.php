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
 * @property string $invoice_number
 * @property int $customer_id
 * @property int $user_id
 * @property \Carbon\Carbon $invoice_date
 * @property ?\Carbon\Carbon $due_date
 * @property float $subtotal
 * @property float $vat_amount
 * @property float $total
 * @property float $paid_amount
 * @property string $status
 * @property string $payment_status
 * @property ?string $payment_method
 * @property ?string $cancel_reason
 * @property ?string $notes
 * @property ?string $deleted_at
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read Customer $customer
 * @property-read User $user
 * @property-read \Illuminate\Database\Eloquent\Collection<int, InvoiceItem> $items
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Payment> $payments
 * @property-read ?Quotation $convertedFromQuotation
 */
class Invoice extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'invoice_number',
        'customer_id',
        'user_id',
        'invoice_date',
        'due_date',
        'subtotal',
        'vat_amount',
        'total',
        'paid_amount',
        'status',
        'payment_status',
        'payment_method',
        'cancel_reason',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'invoice_date' => 'datetime',
            'due_date' => 'datetime',
            'subtotal' => 'decimal:2',
            'vat_amount' => 'decimal:2',
            'total' => 'decimal:2',
            'paid_amount' => 'decimal:2',
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
        return $this->hasMany(InvoiceItem::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function scopeDraft($query): void
    {
        $query->where('status', 'draft');
    }

    public function scopeSent($query): void
    {
        $query->where('status', 'sent');
    }

    public function scopeConfirmed($query): void
    {
        $query->where('status', 'confirmed');
    }

    public function scopeCancelled($query): void
    {
        $query->where('status', 'cancelled');
    }

    public function scopeOverdue($query): void
    {
        $query->where('payment_status', '!=', 'paid')
            ->whereNotNull('due_date')
            ->where('due_date', '<', now());
    }

    public function scopeUnpaid($query): void
    {
        $query->where('payment_status', '!=', 'paid');
    }

    public function isDraft(): bool
    {
        return $this->status === 'draft';
    }

    public function isConfirmed(): bool
    {
        return $this->status === 'confirmed';
    }

    public function isCancelled(): bool
    {
        return $this->status === 'cancelled';
    }

    public function isPaid(): bool
    {
        return $this->payment_status === 'paid';
    }

    public function isPartiallyPaid(): bool
    {
        return $this->payment_status === 'partial';
    }

    public function outstandingAmount(): float
    {
        return (float) ($this->total - $this->paid_amount);
    }
}
