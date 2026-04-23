<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        apiPrefix: 'api',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->api(prepend: [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Standardize validation errors
        $exceptions->render(function (\Illuminate\Validation\ValidationException $exception, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'data' => null,
                    'error' => [
                        'code' => 'ERR_VALIDATION',
                        'message' => 'The given data was invalid.',
                        'details' => $exception->errors(),
                    ],
                    'meta' => [
                        'timestamp' => now()->toIso8601String(),
                    ],
                ], 422);
            }
        });

        // Standardize model not found
        $exceptions->render(function (\Illuminate\Database\Eloquent\ModelNotFoundException $exception, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'data' => null,
                    'error' => [
                        'code' => 'ERR_NOT_FOUND',
                        'message' => 'Resource not found.',
                        'details' => [],
                    ],
                    'meta' => [
                        'timestamp' => now()->toIso8601String(),
                    ],
                ], 404);
            }
        });

        // Standardize authentication errors
        $exceptions->render(function (\Illuminate\Auth\AuthenticationException $exception, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'data' => null,
                    'error' => [
                        'code' => 'ERR_UNAUTHORIZED',
                        'message' => 'Unauthenticated.',
                        'details' => [],
                    ],
                    'meta' => [
                        'timestamp' => now()->toIso8601String(),
                    ],
                ], 401);
            }
        });

        // Standardize authorization errors
        $exceptions->render(function (\Illuminate\Auth\Access\AuthorizationException $exception, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'data' => null,
                    'error' => [
                        'code' => 'ERR_FORBIDDEN',
                        'message' => 'This action is unauthorized.',
                        'details' => [],
                    ],
                    'meta' => [
                        'timestamp' => now()->toIso8601String(),
                    ],
                ], 403);
            }
        });

        // Catch-all for other exceptions on API
        $exceptions->render(function (\Throwable $exception, $request) {
            if ($request->is('api/*') && ! app()->isProduction()) {
                return response()->json([
                    'success' => false,
                    'data' => null,
                    'error' => [
                        'code' => 'ERR_INTERNAL',
                        'message' => 'An internal error occurred.',
                        'details' => [
                            'exception' => get_class($exception),
                            'message' => $exception->getMessage(),
                            'file' => $exception->getFile(),
                            'line' => $exception->getLine(),
                        ],
                    ],
                    'meta' => [
                        'timestamp' => now()->toIso8601String(),
                    ],
                ], 500);
            }

            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'data' => null,
                    'error' => [
                        'code' => 'ERR_INTERNAL',
                        'message' => 'An internal error occurred.',
                        'details' => [],
                    ],
                    'meta' => [
                        'timestamp' => now()->toIso8601String(),
                    ],
                ], 500);
            }
        });
    })->create();
