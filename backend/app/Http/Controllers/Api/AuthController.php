<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $validated = $request->validated();

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

        $token = $user->createToken('api-token', expiresAt: now()->addHours(24))->plainTextToken;

        return $this->respondSuccess([
            'user' => new UserResource($user),
            'token' => $token,
        ], 'Login successful.');
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()?->currentAccessToken()?->delete();

        return $this->respondSuccess(null, 'Logged out successfully.');
    }

    public function refresh(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            return $this->respondUnauthorized('Not authenticated.');
        }

        $user->currentAccessToken()?->delete();

        $newToken = $user->createToken('api-token', expiresAt: now()->addHours(24))->plainTextToken;

        return $this->respondSuccess([
            'token' => $newToken,
        ], 'Token refreshed successfully.');
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            return $this->respondUnauthorized('Not authenticated.');
        }

        return $this->respondSuccess([
            'user' => new UserResource($user),
            'permissions' => $user->getAllPermissions()->pluck('name'),
            'roles' => $user->getRoleNames(),
        ]);
    }
}
