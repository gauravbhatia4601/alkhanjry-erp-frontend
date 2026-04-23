<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $invoice_id
 * @property ?int $supplier_id
 * @property float $amount
 * @property string $status
 * @property ?\Carbon\Carbon $due_date
 * @property ?\Carbon\Carbon $cleared_at
 * @property ?string $notes
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read Invoice $invoice
 * @property-read ?Supplier $supplier
 */
class AccountsPayable extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'supplier_id',
        'amount',
        'status',
        'due_date',
        'cleared_at',
        'notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'due_date' => 'datetime',
        'cleared_at' => 'datetime',
    ];

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function scopeOutstanding($query): void
    {
        $query->where('status', 'outstanding');
    }

    public function scopeOverdue($query): void
    {
        $query->where('status', '!=', 'cleared')
            ->whereNotNull('due_date')
            ->where('due_date', '<', now());
    }

    public function isOverdue(): bool
    {
        return $this->status !== 'cleared'
            && $this->due_date
            && $this->due_date->isPast();
    }
}
