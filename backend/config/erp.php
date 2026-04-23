<?php

declare(strict_types=1);

return [
    'name' => env('APP_NAME', 'Al Khanjry ERP'),
    'vat_rate' => 0.05,
    'currency' => 'OMR',
    'invoice' => [
        'prefix' => 'INV',
        'next_number' => 1001,
        'default_status' => 'draft',
        'payment_terms_days' => 30,
    ],
    'quotation' => [
        'prefix' => 'QTN',
        'next_number' => 1001,
        'validity_days' => 14,
        'default_status' => 'sent',
    ],
    'stock' => [
        'low_stock_threshold' => 5,
        'out_of_stock_threshold' => 0,
        'alert_email_recipients' => [],
    ],
    'users' => [
        'default_password' => 'changeme123',
        'admin_email' => env('ADMIN_EMAIL', 'admin@alkhanjry.com'),
    ],
    'reports' => [
        'chart_colors' => ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'],
        'default_currency_symbol' => 'OMR',
    ],
    'payments' => [
        'default_method' => 'cash',
        'allowed_methods' => ['cash', 'bank_transfer', 'cheque', 'online'],
    ],
    'notifications' => [
        'channels' => ['database', 'mail'],
        'low_stock_enabled' => true,
        'out_of_stock_enabled' => true,
        'invoice_created_enabled' => true,
    ],
];
