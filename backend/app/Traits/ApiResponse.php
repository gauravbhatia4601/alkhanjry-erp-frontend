<?php

declare(strict_types=1);

namespace App\Traits;

trait ApiResponse
{
    /**
     * Return a standardized success response.
     *
     * @param mixed $data
     * @param ?string $message
     * @param int $statusCode
     * @param array<string, mixed> $meta
     */
    protected function respondSuccess(mixed $data = null, ?string $message = null, int $statusCode = 200, array $meta = []): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $data,
            'error' => null,
            'meta' => array_merge([
                'message' => $message,
                'timestamp' => now()->toIso8601String(),
            ], $meta),
        ], $statusCode);
    }

    /**
     * Return a standardized error response.
     *
     * @param string $message
     * @param int $statusCode
     * @param ?string $code
     * @param array<string, mixed> $details
     */
    protected function respondError(string $message, int $statusCode = 400, ?string $code = null, array $details = []): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'success' => false,
            'data' => null,
            'error' => [
                'code' => $code ?? 'ERR_' . $statusCode,
                'message' => $message,
                'details' => $details,
            ],
            'meta' => [
                'timestamp' => now()->toIso8601String(),
            ],
        ], $statusCode);
    }

    /**
     * Return a validation error response.
     *
     * @param \Illuminate\Support\MessageBag|\Illuminate\Contracts\Support\MessageBag $errors
     */
    protected function respondValidationError(\Illuminate\Support\MessageBag $errors): \Illuminate\Http\JsonResponse
    {
        return $this->respondError(
            'Validation failed.',
            422,
            'ERR_VALIDATION',
            $errors->toArray()
        );
    }

    /**
     * Return a not found error response.
     */
    protected function respondNotFound(string $resource = 'Resource'): \Illuminate\Http\JsonResponse
    {
        return $this->respondError(
            "{$resource} not found.",
            404,
            'ERR_NOT_FOUND'
        );
    }

    /**
     * Return a forbidden error response.
     */
    protected function respondForbidden(string $message = 'You do not have permission to perform this action.'): \Illuminate\Http\JsonResponse
    {
        return $this->respondError($message, 403, 'ERR_FORBIDDEN');
    }

    /**
     * Return an unauthorized error response.
     */
    protected function respondUnauthorized(string $message = 'Unauthorized.'): \Illuminate\Http\JsonResponse
    {
        return $this->respondError($message, 401, 'ERR_UNAUTHORIZED');
    }

    /**
     * Return a paginated response.
     *
     * @param \Illuminate\Contracts\Pagination\LengthAwarePaginator<mixed> $paginator
     * @param ?string $message
     * @param int $statusCode
     */
    protected function respondPaginated(\Illuminate\Contracts\Pagination\LengthAwarePaginator $paginator, ?string $message = null, int $statusCode = 200): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $paginator->items(),
            'error' => null,
            'meta' => [
                'message' => $message,
                'timestamp' => now()->toIso8601String(),
                'pagination' => [
                    'current_page' => $paginator->currentPage(),
                    'per_page' => $paginator->perPage(),
                    'total' => $paginator->total(),
                    'last_page' => $paginator->lastPage(),
                    'from' => $paginator->firstItem(),
                    'to' => $paginator->lastItem(),
                    'has_more' => $paginator->hasMorePages(),
                ],
            ],
        ], $statusCode);
    }
}
