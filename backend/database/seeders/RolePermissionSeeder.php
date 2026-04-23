<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Create roles
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $salesmanRole = Role::firstOrCreate(['name' => 'salesman', 'guard_name' => 'web']);

        // Define all permissions
        $permissions = [
            // Dashboard
            'view_dashboard',

            // Users
            'view_users', 'create_users', 'edit_users', 'delete_users',

            // Customers
            'view_customers', 'create_customers', 'edit_customers', 'delete_customers',

            // Suppliers
            'view_suppliers', 'create_suppliers', 'edit_suppliers', 'delete_suppliers',

            // Categories
            'view_categories', 'create_categories', 'edit_categories', 'delete_categories',

            // Products
            'view_products', 'create_products', 'edit_products', 'delete_products',

            // Invoices
            'view_invoices', 'create_invoices', 'edit_invoices', 'delete_invoices',
            'confirm_invoices', 'cancel_invoices',

            // Quotations
            'view_quotations', 'create_quotations', 'edit_quotations', 'delete_quotations',
            'convert_quotations', 'send_quotations',

            // Payments
            'view_payments', 'create_payments', 'delete_payments',

            // Stock
            'view_stock', 'manage_stock',

            // Expenses
            'view_expenses', 'create_expenses', 'edit_expenses', 'delete_expenses',

            // Reports
            'view_reports',

            // Settings
            'manage_settings',

            // Activity Logs
            'view_activity_logs',
        ];

        foreach ($permissions as $permissionName) {
            Permission::firstOrCreate([
                'name' => $permissionName,
                'guard_name' => 'web',
            ]);
        }

        // Admin gets all permissions
        $adminRole->syncPermissions(Permission::all());

        // Salesman gets limited permissions
        $salesmanRole->syncPermissions([
            'view_dashboard',
            'view_customers', 'create_customers', 'edit_customers',
            'view_products',
            'view_invoices', 'create_invoices', 'edit_invoices',
            'view_quotations', 'create_quotations', 'edit_quotations',
            'view_payments', 'create_payments',
            'view_stock', 'manage_stock',
            'view_expenses', 'create_expenses',
            'view_reports',
        ]);

        // Create default admin user
        $admin = User::firstOrCreate(
            ['email' => config('erp.users.admin_email', 'admin@alkhanjry.com')],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('admin1234'),
                'phone' => '+968 1234 5678',
                'role' => 'admin',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );
        $admin->assignRole($adminRole);

        // Create default salesman user
        $salesman = User::firstOrCreate(
            ['email' => 'salesman@alkhanjry.com'],
            [
                'name' => 'Salesman',
                'password' => Hash::make('sales1234'),
                'phone' => '+968 8765 4321',
                'role' => 'salesman',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );
        $salesman->assignRole($salesmanRole);

        $this->command?->info('Roles, permissions, and default users created successfully.');
        $this->command?->info('Admin: admin@alkhanjry.com / admin1234');
        $this->command?->info('Salesman: salesman@alkhanjry.com / sales1234');
    }
}
