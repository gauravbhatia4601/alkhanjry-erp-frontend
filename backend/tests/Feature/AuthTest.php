<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

/**
 * Authentication API tests — login, logout, refresh, me endpoints.
 *
 * Covers happy path, invalid credentials, missing fields, token expiry,
 * RBAC roles (admin vs salesman), and edge cases.
 */
class AuthTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private User $salesman;
    private string $adminToken;
    private string $salesmanToken;

    protected function setUp(): void
    {
        parent::setUp();

        $this->artisan('db:seed', ['--class' => \Database\Seeders\RolePermissionSeeder::class]);

        $this->admin = User::query()->where('email', 'admin@alkhanjry.com')->first();
        $this->salesman = User::query()->where('email', 'salesman@alkhanjry.com')->first();

        // Generate tokens once for reuse in tests that need auth
        $this->adminToken = $this->admin->createToken('test')->plainTextToken;
        $this->salesmanToken = $this->salesman->createToken('test')->plainTextToken;
    }

    // -----------------------------------------------------------------------
    // Login
    // -----------------------------------------------------------------------

    public function test_admin_can_login_with_valid_credentials(): void
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'admin@alkhanjry.com',
            'password' => 'admin1234',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.user.email', 'admin@alkhanjry.com')
            ->assertJsonPath('data.user.role', 'admin')
            ->assertJsonStructure([
                'success',
                'data' => [
                    'user' => ['id', 'name', 'email', 'phone', 'role', 'is_active', 'last_login_at'],
                    'token',
                ],
                'error',
                'meta',
            ]);

        $this->assertNotNull(
            $this->admin->fresh()->last_login_at,
            'last_login_at should be updated on successful login'
        );
    }

    public function test_salesman_can_login_with_valid_credentials(): void
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'salesman@alkhanjry.com',
            'password' => 'sales1234',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.user.email', 'salesman@alkhanjry.com')
            ->assertJsonPath('data.user.role', 'salesman');
    }

    public function test_login_fails_with_invalid_password(): void
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'admin@alkhanjry.com',
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(422)
            ->assertJsonPath('success', false)
            ->assertJsonPath('error.code', 'ERR_VALIDATION')
            ->assertJsonPath('error.details.email', ['The provided credentials are incorrect.']);
    }

    public function test_login_fails_with_invalid_email(): void
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'nonexistent@example.com',
            'password' => 'admin1234',
        ]);

        $response->assertStatus(422)
            ->assertJsonPath('success', false);
    }

    public function test_login_requires_email_field(): void
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'password' => 'admin1234',
        ]);

        $response->assertStatus(422)
            ->assertJsonPath('error.details.email', ['Email is required.']);
    }

    public function test_login_requires_password_field(): void
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'admin@alkhanjry.com',
        ]);

        $response->assertStatus(422)
            ->assertJsonPath('error.details.password', ['Password is required.']);
    }

    public function test_login_requires_valid_email_format(): void
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'invalid-email',
            'password' => 'admin1234',
        ]);

        $response->assertStatus(422)
            ->assertJsonPath('error.details.email', ['Please provide a valid email address.']);
    }

    public function test_login_fails_for_inactive_user(): void
    {
        $this->admin->update(['is_active' => false]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'admin@alkhanjry.com',
            'password' => 'admin1234',
        ]);

        $response->assertStatus(422)
            ->assertJsonPath('error.details.email', ['The provided credentials are incorrect.']);
    }

    public function test_login_rejects_empty_body(): void
    {
        $response = $this->postJson('/api/v1/auth/login', []);

        $response->assertStatus(422)
            ->assertJsonPath('error.code', 'ERR_VALIDATION');
    }

    // -----------------------------------------------------------------------
    // Logout
    // -----------------------------------------------------------------------

    public function test_authenticated_user_can_logout(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->adminToken)
            ->postJson('/api/v1/auth/logout');

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('meta.message', 'Logged out successfully.');

        $this->assertDatabaseMissing('personal_access_tokens', [
            'tokenable_id' => $this->admin->id,
        ]);
    }

    public function test_logout_without_token_returns_unauthorized(): void
    {
        $response = $this->postJson('/api/v1/auth/logout');

        $response->assertStatus(401)
            ->assertJsonPath('error.code', 'ERR_UNAUTHORIZED');
    }

    // -----------------------------------------------------------------------
    // Refresh Token
    // -----------------------------------------------------------------------

    public function test_authenticated_user_can_refresh_token(): void
    {
        $oldToken = $this->adminToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $oldToken)
            ->postJson('/api/v1/auth/refresh');

        $response
            ->assertStatus(200)
            ->assertJsonPath('success', true);

        $newToken = $response->json('data.token');
        $this->assertNotEmpty($newToken);
        $this->assertNotEquals($oldToken, $newToken, 'Refreshed token must be different');

        // New token should work
        $this->withHeader('Authorization', 'Bearer ' . $newToken)
            ->getJson('/api/v1/auth/me')
            ->assertStatus(200);
    }

    public function test_refresh_without_token_returns_unauthorized(): void
    {
        $this->postJson('/api/v1/auth/refresh')
            ->assertStatus(401)
            ->assertJsonPath('error.code', 'ERR_UNAUTHORIZED');
    }

    // -----------------------------------------------------------------------
    // Me
    // -----------------------------------------------------------------------

    public function test_admin_me_returns_full_profile_and_permissions(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->adminToken)
            ->getJson('/api/v1/auth/me');

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.user.id', $this->admin->id)
            ->assertJsonPath('data.user.role', 'admin')
            ->assertJsonPath('data.roles', ['admin'])
            ->assertJsonStructure([
                'success',
                'data' => [
                    'user',
                    'permissions',
                    'roles',
                ],
                'error',
                'meta',
            ]);

        $permissions = $response->json('data.permissions');
        $this->assertContains('view_dashboard', $permissions);
        $this->assertContains('manage_settings', $permissions);
    }

    public function test_salesman_me_returns_limited_permissions(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->salesmanToken)
            ->getJson('/api/v1/auth/me');

        $response->assertStatus(200)
            ->assertJsonPath('data.user.role', 'salesman')
            ->assertJsonPath('data.roles', ['salesman']);

        $permissions = $response->json('data.permissions');
        $this->assertContains('view_dashboard', $permissions);
        $this->assertContains('create_invoices', $permissions);
        $this->assertNotContains('delete_users', $permissions);
        $this->assertNotContains('manage_settings', $permissions);
    }

    public function test_me_without_token_returns_unauthorized(): void
    {
        $this->getJson('/api/v1/auth/me')
            ->assertStatus(401)
            ->assertJsonPath('error.code', 'ERR_UNAUTHORIZED');
    }

    public function test_me_with_invalid_token_returns_unauthorized(): void
    {
        $this->withHeader('Authorization', 'Bearer invalid-token-123')
            ->getJson('/api/v1/auth/me')
            ->assertStatus(401);
    }

    // -----------------------------------------------------------------------
    // Response structure validation (Hyrum's Law guard)
    // -----------------------------------------------------------------------

    public function test_login_response_uses_standardized_envelope(): void
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'admin@alkhanjry.com',
            'password' => 'admin1234',
        ]);

        $json = $response->json();
        $this->assertArrayHasKey('success', $json);
        $this->assertArrayHasKey('data', $json);
        $this->assertArrayHasKey('error', $json);
        $this->assertArrayHasKey('meta', $json);
        $this->assertIsBool($json['success']);
        $this->assertTrue($json['success']);
    }

    public function test_error_response_uses_standardized_envelope(): void
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'bad',
        ]);

        $json = $response->json();
        $this->assertArrayHasKey('success', $json);
        $this->assertArrayHasKey('data', $json);
        $this->assertArrayHasKey('error', $json);
        $this->assertArrayHasKey('meta', $json);
        $this->assertIsArray($json['error']);
        $this->assertArrayHasKey('code', $json['error']);
        $this->assertArrayHasKey('message', $json['error']);
        $this->assertFalse($json['success']);
    }
}
