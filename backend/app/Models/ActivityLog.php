<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property ?int $user_id
 * @property string $action
 * @property ?string $entity_type
 * @property ?int $entity_id
 * @property ?array<string, mixed> $metadata
 * @property ?string $ip_address
 * @property ?string $user_agent
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read ?User $user
 */
class ActivityLog extends Model
{
    use HasFactory;

    public const UPDATED_AT = null;

    protected $fillable = [
        'user_id',
        'action',
        'entity_type',
        'entity_id',
        'metadata',
        'ip_address',
        'user_agent',
    ];

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
            'entity_id' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeByAction($query, string $action): void
    {
        $query->where('action', $action);
    }

    public function scopeByEntityType($query, string $entityType): void
    {
        $query->where('entity_type', $entityType);
    }

    public function scopeByUser($query, int $userId): void
    {
        $query->where('user_id', $userId);
    }

    public function scopeLatestFirst($query): void
    {
        $query->orderByDesc('created_at');
    }
}
