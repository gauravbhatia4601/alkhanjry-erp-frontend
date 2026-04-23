<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $expense_number
 * @property \Carbon\Carbon $expense_date
 * @property string $category
 * @property string $description
 * @property float $amount
 * @property string $payment_method
 * @property int $user_id
 * @property ?string $notes
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read User $user
 */
class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'expense_number',
        'expense_date',
        'category',
        'description',
        'amount',
        'payment_method',
        'user_id',
        'notes',
    ];

    protected $casts = [
        'expense_date' => 'datetime',
        'amount' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeByCategory($query, string $category): void
    {
        $query->where('category', $category);
    }

    public function scopeByDateRange($query, string $from, string $to): void
    {
        $query->whereBetween('expense_date', [$from, $to]);
    }
}
