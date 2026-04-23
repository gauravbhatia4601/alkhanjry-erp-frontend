<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $invoice_id
 * @property int $user_id
 * @property float $amount
 * @property string $method
 * @property ?string $reference_number
 * @property \Carbon\Carbon $paid_at
 * @property ?string $notes
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read Invoice $invoice
 * @property-read User $user
 */
class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'user_id',
        'amount',
        'method',
        'reference_number',
        'paid_at',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'paid_at' => 'datetime',
        ];
    }

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeByMethod($query, string $method): void
    {
        $query->where('method', $method);
    }
}
