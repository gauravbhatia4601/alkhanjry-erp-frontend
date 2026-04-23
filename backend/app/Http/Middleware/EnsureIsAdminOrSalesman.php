<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Traits\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureIsAdminOrSalesman
{
    use ApiResponse;

    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user || ! ($user->isAdmin() || $user->isSalesman())) {
            return $this->respondError(
                'This action requires login.',
                403,
                'ERR_UNAUTHORIZED'
            );
        }

        return $next($request);
    }
}
