<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/**
 * Authentication controller using Laravel Sanctum.
 *
 * Provides login, logout, token refresh, and current user endpoints.
 */
class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::query()
            ->where('email', $validated['email'])
            ->where('is_active', true)
            ->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user->update(['last_login_at' => now()]);
        $token = $user->createToken(
            name: 'api-token',
            expiresAt: now()->addHours(24)
        )->plainTextToken;

        return $this->respondSuccess([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'role' => $user->role,
                'is_active' => $user->is_active,
                'permissions' => $user->getAllPermissions()->pluck('name'),
            ],
            'token' => $token,
        ], 'Login successful.');
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return $this->respondSuccess(null, 'Logged out successfully.');
    }

    public function refresh(Request $request): JsonResponse
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        $token = $user->createToken(
            name: 'api-token',
            expiresAt: now()->addHours(24)
        )->plainTextToken;

        return $this->respondSuccess([
            'token' => $token,
        ], 'Token refreshed successfully.');
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return $this->respondSuccess([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'role' => $user->role,
            'is_active' => $user->is_active,
            'last_login_at' => $user->last_login_at?->toIso8601String(),
            'permissions' => $user->getAllPermissions()->pluck('name'),
            'roles' => $user->getRoleNames(),
            'created_at' => $user->created_at?->toIso8601String(),
        ]);
    }
}
