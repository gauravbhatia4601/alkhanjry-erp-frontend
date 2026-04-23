<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class HealthController extends Controller
{
    /**
     * Shallow health check - returns 200 if process responds.
     */
    public function health()
    {
        return $this->respondSuccess([
            'status' => 'healthy',
            'timestamp' => now()->toIso8601String(),
            'version' => config('app.version', '1.0.0'),
        ]);
    }

    /**
     * Deep readiness check - verifies database and critical services.
     */
    public function ready()
    {
        $checks = [
            'database' => $this->checkDatabase(),
            'app' => [
                'healthy' => true,
                'version' => config('app.version', '1.0.0'),
            ],
        ];

        $allHealthy = collect($checks)->every(fn(array $check): bool => $check['healthy']);

        $statusCode = $allHealthy ? 200 : 503;

        return response()->json([
            'success' => $allHealthy,
            'data' => $checks,
            'error' => $allHealthy ? null : [
                'code' => 'ERR_NOT_READY',
                'message' => 'One or more critical services are unavailable.',
                'details' => collect($checks)
                    ->filter(fn(array $check): bool => ! $check['healthy'])
                    ->toArray(),
            ],
            'meta' => [
                'timestamp' => now()->toIso8601String(),
            ],
        ], $statusCode);
    }

    private function checkDatabase(): array
    {
        try {
            DB::connection('mysql')->select('SELECT 1');
            $connectionTime = DB::connection('mysql')->select('SELECT ROUND(UNIX_TIMESTAMP(CURTIME(4)) * 1000) as ms')[0]->ms ?? null;

            return [
                'healthy' => true,
                'message' => 'Database connection established.',
                'latency_ms' => $connectionTime,
            ];
        } catch (\Throwable $exception) {
            return [
                'healthy' => false,
                'message' => $exception->getMessage(),
            ];
        }
    }
}
