<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Traits\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureIsAdmin
{
    use ApiResponse;

    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()?->isAdmin()) {
            return $this->respondError(
                'This action requires administrator privileges.',
                403,
                'ERR_ADMIN_ONLY'
            );
        }

        return $next($request);
    }
}
