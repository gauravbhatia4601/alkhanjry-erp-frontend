# PRD: ERP System — Al Khanjry Spare Parts Shop

## Metadata

```yaml
id: ERP-ALKHANJRY-001
name: ERP System for Spare Parts Shop
client: Al Khanjry Transport
status: approved
priority: p0
version: 1.0
created: 2026-04-20
target_date: 2026-07-20
owner: Development Team
vat_rate: 5%
currency: single (no multi-currency)
deployment: cloud_or_local_tbd
```

### Tech Stack

```yaml
backend:
  framework: Laravel 12 (latest stable)
  language: PHP 8.3+
  database: MySQL 8.0+
  cache: Redis 7.0+
  session: Redis
  queue: Redis (database driver for local, Redis driver for production)
  auth: Laravel Sanctum (SPA authentication)
  pdf: barryvdh/laravel-dompdf
  excel: maatwebsite/laravel-excel
  testing: PHPUnit

frontend:
  framework: React 19 (latest stable)
  language: TypeScript 5.x
  build: Vite 6.x
  ui_library: shadcn/ui
  styling: Tailwind CSS 4.x
  routing: React Router v7
  state: TanStack Query (React Query) v5
  forms: React Hook Form + Zod validation
  http: Axios
  charts: Recharts
  tables: TanStack Table v8
  testing: Vitest + React Testing Library

infrastructure:
  web_server: Nginx
  php: PHP-FPM 8.3+
  process_manager: Supervisor (for queue workers)
  ssl: mandatory HTTPS
```

### Folder Structure

```
alkhanjry-spare-parts/
├── backend/                          # Laravel application
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   └── Api/
│   │   │   │       ├── AuthController.php
│   │   │   │       ├── UserController.php
│   │   │   │       ├── CategoryController.php
│   │   │   │       ├── ProductController.php
│   │   │   │       ├── SupplierController.php
│   │   │   │       ├── StockMovementController.php
│   │   │   │       ├── CustomerController.php
│   │   │   │       ├── InvoiceController.php
│   │   │   │       ├── QuotationController.php
│   │   │   │       ├── PaymentController.php
│   │   │   │       ├── AccountsPayableController.php
│   │   │   │       ├── DashboardController.php
│   │   │   │       ├── ReportController.php
│   │   │   │       ├── ActivityLogController.php
│   │   │   │       └── ExpenseController.php
│   │   │   ├── Middleware/
│   │   │   │   ├── EnsureIsAdmin.php
│   │   │   │   └── EnsureIsAdminOrSalesman.php
│   │   │   ├── Requests/
│   │   │   │   ├── Auth/
│   │   │   │   ├── Product/
│   │   │   │   ├── Invoice/
│   │   │   │   ├── Quotation/
│   │   │   │   └── ...
│   │   │   └── Resources/
│   │   │       ├── ProductResource.php
│   │   │       ├── ProductListResource.php
│   │   │       ├── InvoiceResource.php
│   │   │       ├── QuotationResource.php
│   │   │       ├── DashboardResource.php
│   │   │       └── ...
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   ├── Category.php
│   │   │   ├── Product.php
│   │   │   ├── Supplier.php
│   │   │   ├── StockMovement.php
│   │   │   ├── Customer.php
│   │   │   ├── Invoice.php
│   │   │   ├── InvoiceItem.php
│   │   │   ├── Quotation.php
│   │   │   ├── QuotationItem.php
│   │   │   ├── Payment.php
│   │   │   ├── AccountsPayable.php
│   │   │   ├── ActivityLog.php
│   │   │   └── Expense.php
│   │   ├── Policies/
│   │   │   ├── ProductPolicy.php
│   │   │   ├── InvoicePolicy.php
│   │   │   ├── QuotationPolicy.php
│   │   │   ├── UserPolicy.php
│   │   │   └── ReportPolicy.php
│   │   ├── Services/
│   │   │   ├── InvoiceService.php
│   │   │   ├── QuotationService.php
│   │   │   ├── StockService.php
│   │   │   ├── PaymentService.php
│   │   │   ├── ReportService.php
│   │   │   └── DashboardService.php
│   │   ├── Events/
│   │   │   ├── InvoiceCreated.php
│   │   │   ├── InvoiceCancelled.php
│   │   │   ├── LowStockDetected.php
│   │   │   └── QuotationConverted.php
│   │   ├── Listeners/
│   │   │   ├── DeductStockOnInvoice.php
│   │   │   ├── RestoreStockOnCancel.php
│   │   │   ├── CreateAccountsPayableOnAccount.php
│   │   │   ├── SendLowStockNotification.php
│   │   │   └── LogActivity.php
│   │   ├── Notifications/
│   │   │   ├── LowStockAlert.php
│   │   │   ├── OutOfStockAlert.php
│   │   │   └── InvoiceCreatedNotification.php
│   │   ├── Jobs/
│   │   │   ├── GenerateInvoicePdf.php
│   │   │   ├── GenerateReportPdf.php
│   │   │   ├── GenerateReportExcel.php
│   │   │   └── ProcessDailyBackup.php
│   │   └── Exports/
│   │       ├── SalesReportExport.php
│   │       ├── InventoryReportExport.php
│   │       └── FinancialReportExport.php
│   ├── config/
│   │   └── erp.php                    # ERP-specific config (VAT rate, invoice prefix, etc.)
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   │       ├── UserSeeder.php
│   │       ├── CategorySeeder.php
│   │       ├── SupplierSeeder.php
│   │       └── ProductSeeder.php
│   ├── routes/
│   │   └── api.php
│   ├── resources/
│   │   └── views/
│   │       └── pdf/
│   │           ├── invoice.blade.php
│   │           └── quotation.blade.php
│   ├── composer.json
│   └── .env.example
│
├── frontend/                          # React + shadcn/ui application
│   ├── src/
│   │   ├── app/
│   │   │   ├── App.tsx
│   │   │   ├── router.tsx
│   │   │   └── providers.tsx
│   │   ├── components/
│   │   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── layout/
│   │   │   │   ├── AppLayout.tsx
│   │   │   │   ├── AdminSidebar.tsx
│   │   │   │   ├── SalesmanSidebar.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   └── MobileNav.tsx
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── AdminDashboard.tsx
│   │   │   │   ├── SalesmanDashboard.tsx
│   │   │   │   ├── SalesCard.tsx
│   │   │   │   ├── InvoiceCountCard.tsx
│   │   │   │   ├── LowStockPanel.tsx
│   │   │   │   ├── RecentTransactions.tsx
│   │   │   │   ├── OutstandingPaymentsCard.tsx
│   │   │   │   └── TopSellingItems.tsx
│   │   │   ├── products/
│   │   │   │   ├── ProductList.tsx
│   │   │   │   ├── ProductForm.tsx
│   │   │   │   ├── ProductDetail.tsx
│   │   │   │   └── StockAdjustForm.tsx
│   │   │   ├── invoices/
│   │   │   │   ├── InvoiceList.tsx
│   │   │   │   ├── InvoiceForm.tsx
│   │   │   │   ├── InvoiceDetail.tsx
│   │   │   │   ├── InvoiceItemRow.tsx
│   │   │   │   └── InvoicePdf.tsx
│   │   │   ├── quotations/
│   │   │   │   ├── QuotationList.tsx
│   │   │   │   ├── QuotationForm.tsx
│   │   │   │   ├── QuotationDetail.tsx
│   │   │   │   └── QuotationPdf.tsx
│   │   │   ├── customers/
│   │   │   │   ├── CustomerList.tsx
│   │   │   │   ├── CustomerForm.tsx
│   │   │   │   └── CustomerDetail.tsx
│   │   │   ├── payments/
│   │   │   │   ├── PaymentList.tsx
│   │   │   │   ├── PaymentForm.tsx
│   │   │   │   └── AccountsPayableList.tsx
│   │   │   ├── reports/
│   │   │   │   ├── ReportSelector.tsx
│   │   │   │   ├── SalesReport.tsx
│   │   │   │   ├── InventoryReport.tsx
│   │   │   │   └── FinancialReport.tsx
│   │   │   ├── users/
│   │   │   │   ├── UserList.tsx
│   │   │   │   └── UserForm.tsx
│   │   │   ├── categories/
│   │   │   │   ├── CategoryList.tsx
│   │   │   │   └── CategoryForm.tsx
│   │   │   ├── suppliers/
│   │   │   │   ├── SupplierList.tsx
│   │   │   │   └── SupplierForm.tsx
│   │   │   ├── stock/
│   │   │   │   ├── StockMovementList.tsx
│   │   │   │   └── StockAlertPanel.tsx
│   │   │   └── activity-logs/
│   │   │       └── ActivityLogList.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useProducts.ts
│   │   │   ├── useInvoices.ts
│   │   │   ├── useQuotations.ts
│   │   │   ├── useCustomers.ts
│   │   │   ├── usePayments.ts
│   │   │   ├── useDashboard.ts
│   │   │   ├── useReports.ts
│   │   │   └── useDebounce.ts
│   │   ├── lib/
│   │   │   ├── api.ts               # Axios instance + interceptors
│   │   │   ├── utils.ts
│   │   │   └── queryClient.ts
│   │   ├── types/
│   │   │   ├── auth.ts
│   │   │   ├── product.ts
│   │   │   ├── invoice.ts
│   │   │   ├── quotation.ts
│   │   │   ├── customer.ts
│   │   │   ├── payment.ts
│   │   │   ├── dashboard.ts
│   │   │   └── report.ts
│   │   └── pages/
│   │       ├── LoginPage.tsx
│   │       ├── AdminDashboardPage.tsx
│   │       ├── SalesmanDashboardPage.tsx
│   │       ├── ProductsPage.tsx
│   │       ├── ProductFormPage.tsx
│   │       ├── InvoicesPage.tsx
│   │       ├── InvoiceFormPage.tsx
│   │       ├── InvoiceDetailPage.tsx
│   │       ├── QuotationsPage.tsx
│   │       ├── QuotationFormPage.tsx
│   │       ├── QuotationDetailPage.tsx
│   │       ├── CustomersPage.tsx
│   │       ├── PaymentsPage.tsx
│   │       ├── AccountsPayablePage.tsx
│   │       ├── ReportsPage.tsx
│   │       ├── UsersPage.tsx
│   │       ├── CategoriesPage.tsx
│   │       ├── SuppliersPage.tsx
│   │       ├── StockMovementsPage.tsx
│   │       └── ActivityLogsPage.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── components.json              # shadcn/ui config
│
├── opencode.json                     # MCP config (shadcn)
├── PRD.md
├── ERP_PRD_SPARE_PARTS.docx
└── ERP_PRD_SPARE_PARTS.pdf
```

---

## 1. Overview

### 1.1 Problem Statement

Al Khanjry Transport currently manages its spare parts shop operations manually or with fragmented tools, leading to disconnected inventory records, inconsistent invoicing, no centralized financial tracking, and lack of real-time visibility into stock levels, sales performance, and outstanding payments. There is no system to enforce VAT compliance (5%), track stock movements with full audit trails, or prevent unauthorized access to sensitive financial data (e.g., purchase prices visible to salesmen).

### 1.2 Solution Summary

Build a web-based ERP system with two roles (Admin and Salesman) that centralizes inventory management, sales & invoicing, quotation management, financial tracking, and reporting. The system enforces strict role-based access at the API level, auto-calculates 5% VAT per item, auto-deducts stock on invoice confirmation, generates PDF/Excel reports, and provides real-time dashboards with KPIs and low-stock alerts. Backend in Laravel, frontend in React with shadcn/ui, MySQL database, Redis for caching/sessions/queues.

### 1.3 Success Metrics

- Stock auto-deduction works 100% correctly on invoice confirmation
- VAT calculation accurate to cent on every line item
- Salesman cannot access any Admin API endpoint even with direct URL
- All 9 report types generate correct PDF and Excel output
- Dashboard reflects real-time data within 30 seconds of transaction
- Low-stock alerts trigger within 1 minute of threshold breach
- 'On Account' invoices automatically create Accounts Payable entries
- Quotation conversion preserves 100% of line item data

---

## 2. Architecture

### 2.1 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (Client)                      │
│  React 19 + TypeScript + shadcn/ui + Tailwind CSS        │
│  Vite Dev Server (dev) / Nginx static (prod)            │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTP/HTTPS (Axios)
                        │ SPA cookies (Sanctum)
┌───────────────────────▼─────────────────────────────────┐
│              Laravel 12 (Backend API)                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────┐  │
│  │ Auth     │ │ Products │ │ Invoices │ │ Quotations │  │
│  │ Sanctum  │ │ & Stock  │ │ & Pay   │ │ & Convert  │  │
│  └──────────┘ └──────────┘ └──────────┘ └────────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────┐  │
│  │ Reports  │ │ Dashboard│ │ Accounts │ │ Activity   │  │
│  │ PDF/Excel│ │ KPIs     │ │ Payable  │ │ Logs       │  │
│  └──────────┘ └──────────┘ └──────────┘ └────────────┘  │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  Services Layer (Business Logic)                    │ │
│  │  InvoiceService, StockService, PaymentService, etc  │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  Events & Listeners                                 │ │
│  │  InvoiceCreated → DeductStock, CreateAP, LogActivity │ │
│  │  LowStockDetected → SendNotification                │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  Queue Jobs (Redis Queue Driver)                    │ │
│  │  GenerateInvoicePdf, GenerateReport, DailyBackup    │ │
│  └─────────────────────────────────────────────────────┘ │
└──────────┬──────────────────────────────┬───────────────┘
           │                              │
    ┌──────▼──────┐               ┌───────▼───────┐
    │   MySQL 8   │               │  Redis 7      │
    │  (Primary   │               │  (Cache,      │
    │   Database) │               │   Sessions,   │
    │             │               │   Queues)     │
    └─────────────┘               └───────────────┘
```

### 2.2 Authentication Flow (Laravel Sanctum SPA)

```
1. POST /api/auth/login → Laravel issues Sanctum token + session cookie
2. Frontend stores auth state (user data + role) in React context
3. Axios interceptor attaches cookie credentials to every request
4. Laravel middleware verifies Sanctum token on every API request
5. On session timeout (30 min configurable) → server returns 401
6. Frontend redirects to /login on 401
7. POST /api/auth/logout → revokes token, clears cookie
```

### 2.3 Redis Caching Strategy

```yaml
cache_patterns:
  dashboard_stats:
    key: "dashboard:{role}:{user_id}"
    ttl: 60
    invalidation: on invoice/product/payment change

  product_list:
    key: "products:page:{page}:filter:{hash}"
    ttl: 300
    invalidation: on product create/update/delete

  product_detail:
    key: "product:{id}"
    ttl: 600
    invalidation: on product update/stock change

  low_stock_items:
    key: "low_stock_items"
    ttl: 120
    invalidation: on stock movement

  customer_list:
    key: "customers:page:{page}:search:{hash}"
    ttl: 300
    invalidation: on customer create/update

  monthly_sales:
    key: "monthly_sales:{year}:{month}"
    ttl: 900
    invalidation: on invoice create/cancel

session:
  driver: redis
  lifetime: 30  # minutes (configurable)

queue:
  driver: redis
  default_queue: default
  pdf_queue: pdf_generation
  report_queue: report_generation
```

---

## 3. Database Schema

### 3.1 Complete MySQL Schema

#### users

```sql
CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'salesman') NOT NULL DEFAULT 'salesman',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_login_at TIMESTAMP NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  INDEX idx_users_role (role),
  INDEX idx_users_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### personal_access_tokens (Sanctum)

```sql
CREATE TABLE personal_access_tokens (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tokenable_type VARCHAR(255) NOT NULL,
  tokenable_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  token VARCHAR(64) NOT NULL UNIQUE,
  abilities TEXT NULL,
  last_used_at TIMESTAMP NULL,
  expires_at TIMESTAMP NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  INDEX idx_pat_tokenable (tokenable_type, tokenable_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### categories

```sql
CREATE TABLE categories (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  INDEX idx_categories_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### suppliers

```sql
CREATE TABLE suppliers (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NULL,
  email VARCHAR(255) NULL,
  address TEXT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  INDEX idx_suppliers_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### products

```sql
CREATE TABLE products (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  item_code VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  category_id BIGINT UNSIGNED NOT NULL,
  supplier_id BIGINT UNSIGNED NULL,
  purchase_price DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  selling_price DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  stock_quantity INT UNSIGNED NOT NULL DEFAULT 0,
  minimum_stock_level INT UNSIGNED NOT NULL DEFAULT 0,
  is_vat_applicable BOOLEAN NOT NULL DEFAULT TRUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL,
  INDEX idx_products_category (category_id),
  INDEX idx_products_supplier (supplier_id),
  INDEX idx_products_active (is_active),
  INDEX idx_products_stock (stock_quantity),
  INDEX idx_products_code_name (item_code, name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### stock_movements

```sql
CREATE TABLE stock_movements (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  product_id BIGINT UNSIGNED NOT NULL,
  type ENUM('in', 'out', 'adjustment') NOT NULL,
  quantity INT NOT NULL,
  previous_quantity INT UNSIGNED NOT NULL,
  new_quantity INT UNSIGNED NOT NULL,
  reference_type VARCHAR(100) NULL,  -- 'App\Models\Invoice', 'App\Models\StockAdjustment', etc.
  reference_id BIGINT UNSIGNED NULL,  -- ID of the related model
  reason TEXT NULL,                   -- Required for manual adjustments
  user_id BIGINT UNSIGNED NOT NULL,
  created_at TIMESTAMP NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_stock_product (product_id),
  INDEX idx_stock_type (type),
  INDEX idx_stock_date (created_at),
  INDEX idx_stock_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### customers

```sql
CREATE TABLE customers (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NULL,
  email VARCHAR(255) NULL,
  vehicle_details TEXT NULL,          -- Free text for vehicle info (make/model/year/plate)
  address TEXT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  INDEX idx_customers_phone (phone),
  INDEX idx_customers_name (name),
  INDEX idx_customers_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### invoices

```sql
CREATE TABLE invoices (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  invoice_number VARCHAR(50) NOT NULL UNIQUE,       -- INV-000001, sequential
  invoice_date DATE NOT NULL,
  customer_id BIGINT UNSIGNED NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,                  -- Salesman who created
  vehicle_details TEXT NULL,
  payment_status ENUM('paid', 'pending', 'partial', 'on_account') NOT NULL DEFAULT 'pending',
  sub_total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  vat_total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  grand_total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  amount_paid DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  outstanding_balance DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  status ENUM('draft', 'confirmed', 'cancelled') NOT NULL DEFAULT 'draft',
  cancelled_reason TEXT NULL,
  cancelled_by BIGINT UNSIGNED NULL,
  cancelled_at TIMESTAMP NULL,
  quotation_id BIGINT UNSIGNED NULL,                -- If converted from quotation
  notes TEXT NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (cancelled_by) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE SET NULL,
  INDEX idx_invoices_number (invoice_number),
  INDEX idx_invoices_customer (customer_id),
  INDEX idx_invoices_user (user_id),
  INDEX idx_invoices_date (invoice_date),
  INDEX idx_invoices_status (status),
  INDEX idx_invoices_payment (payment_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### invoice_items

```sql
CREATE TABLE invoice_items (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  invoice_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  item_name VARCHAR(255) NOT NULL,                    -- Snapshot at time of invoice
  item_code VARCHAR(100) NOT NULL,                    -- Snapshot
  quantity INT UNSIGNED NOT NULL,
  unit_price DECIMAL(12,2) NOT NULL,
  is_vat_applicable BOOLEAN NOT NULL DEFAULT TRUE,
  vat_rate DECIMAL(5,2) NOT NULL DEFAULT 5.00,
  vat_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  line_total DECIMAL(12,2) NOT NULL DEFAULT 0.00,    -- quantity * unit_price
  line_grand_total DECIMAL(12,2) NOT NULL DEFAULT 0.00, -- line_total + vat_amount
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
  INDEX idx_invoice_items_invoice (invoice_id),
  INDEX idx_invoice_items_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### quotations

```sql
CREATE TABLE quotations (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  quotation_number VARCHAR(50) NOT NULL UNIQUE,       -- QT-000001, sequential
  quotation_date DATE NOT NULL,
  customer_id BIGINT UNSIGNED NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  vehicle_details TEXT NULL,
  validity_date DATE NULL,                            -- Expiry date
  status ENUM('draft', 'sent', 'converted', 'expired') NOT NULL DEFAULT 'draft',
  sub_total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  vat_total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  grand_total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  notes TEXT NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_quotations_number (quotation_number),
  INDEX idx_quotations_customer (customer_id),
  INDEX idx_quotations_user (user_id),
  INDEX idx_quotations_date (quotation_date),
  INDEX idx_quotations_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### quotation_items

```sql
CREATE TABLE quotation_items (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  quotation_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  item_code VARCHAR(100) NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  unit_price DECIMAL(12,2) NOT NULL,
  is_vat_applicable BOOLEAN NOT NULL DEFAULT TRUE,
  vat_rate DECIMAL(5,2) NOT NULL DEFAULT 5.00,
  vat_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  line_total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  line_grand_total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
  INDEX idx_quotation_items_quotation (quotation_id),
  INDEX idx_quotation_items_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### payments

```sql
CREATE TABLE payments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  invoice_id BIGINT UNSIGNED NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  payment_method ENUM('cash', 'card', 'transfer', 'cheque') NOT NULL DEFAULT 'cash',
  payment_date DATE NOT NULL,
  reference_number VARCHAR(100) NULL,                -- Cheque/transfer ref
  notes TEXT NULL,
  user_id BIGINT UNSIGNED NOT NULL,                   -- Who recorded payment
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_payments_invoice (invoice_id),
  INDEX idx_payments_date (payment_date),
  INDEX idx_payments_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### accounts_payable

```sql
CREATE TABLE accounts_payable (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  invoice_id BIGINT UNSIGNED NOT NULL,
  customer_id BIGINT UNSIGNED NOT NULL,
  total_amount DECIMAL(12,2) NOT NULL,
  amount_paid DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  outstanding_balance DECIMAL(12,2) NOT NULL,
  status ENUM('open', 'partially_paid', 'settled') NOT NULL DEFAULT 'open',
  due_date DATE NULL,
  settled_at TIMESTAMP NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT,
  INDEX idx_ap_customer (customer_id),
  INDEX idx_ap_invoice (invoice_id),
  INDEX idx_ap_status (status),
  INDEX idx_ap_due (due_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### activity_logs

```sql
CREATE TABLE activity_logs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NULL,
  action VARCHAR(100) NOT NULL,           -- 'create', 'update', 'delete', 'cancel', 'adjust', 'login', 'convert'
  model_type VARCHAR(255) NULL,            -- 'App\Models\Invoice', etc.
  model_id BIGINT UNSIGNED NULL,
  description TEXT NOT NULL,
  properties JSON NULL,                    -- Before/after changes
  ip_address VARCHAR(45) NULL,
  user_agent TEXT NULL,
  created_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_activity_user (user_id),
  INDEX idx_activity_action (action),
  INDEX idx_activity_model (model_type, model_id),
  INDEX idx_activity_date (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### expenses (Phase 2)

```sql
CREATE TABLE expenses (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100) NOT NULL,          -- rent, utilities, purchases, misc
  description TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  expense_date DATE NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  receipt_path VARCHAR(500) NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_expenses_category (category),
  INDEX idx_expenses_date (expense_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### settings

```sql
CREATE TABLE settings (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  key VARCHAR(100) NOT NULL UNIQUE,
  value TEXT NOT NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Pre-seeded settings:
-- company_name: 'Al Khanjry Transport'
-- company_address: (TBD by client)
-- company_phone: (TBD by client)
-- company_email: (TBD by client)
-- company_vat_number: (TBD by client)
-- company_logo: (path to logo file)
-- vat_rate: '5.00'
-- invoice_prefix: 'INV'
-- quotation_prefix: 'QT'
-- session_lifetime: '30'
-- low_stock_notification: 'true'
-- invoice_auto_confirm: 'false'
```

### 3.2 Entity Relationships

```
User (1) ──┬── (N) Invoice
            ├── (N) Quotation
            ├── (N) Payment
            ├── (N) StockMovement
            └── (N) ActivityLog

Category (1) ──── (N) Product
Supplier (1) ──── (N) Product
Product (1) ──── (N) StockMovement
Product (1) ──── (N) InvoiceItem
Product (1) ──── (N) QuotationItem

Customer (1) ──┬── (N) Invoice
               ├── (N) Quotation
               └── (N) AccountsPayable

Invoice (1) ──┬── (N) InvoiceItem
              ├── (N) Payment
              └── (1) AccountsPayable (conditional: on_account)

Quotation (1) ───── (N) QuotationItem
Quotation (1) ───── (1) Invoice (if converted)
```

---

## 4. API Endpoints

All endpoints prefixed with `/api`. Authentication uses Laravel Sanctum SPA cookies. Unless noted, all endpoints require authentication.

### 4.1 Authentication

```yaml
POST /api/auth/login:
  auth: guest
  request:
    username: string (required)
    password: string (required)
  response:
    user: { id, name, username, email, role }
    message: "Logged in successfully"

POST /api/auth/logout:
  auth: authenticated
  response:
    message: "Logged out successfully"

GET /api/auth/me:
  auth: authenticated
  response:
    user: { id, name, username, email, role, is_active, last_login_at }

PUT /api/auth/password:
  auth: authenticated
  request:
    current_password: string (required)
    new_password: string (required, min:8, confirmed)
    new_password_confirmation: string (required)
  response:
    message: "Password updated successfully"
```

### 4.2 Users (Admin Only)

```yaml
GET /api/users:
  auth: admin
  query: { page, per_page, search, role, is_active }
  response:
    data: [{ id, name, username, email, role, is_active, last_login_at, created_at }]
    meta: { current_page, last_page, total, per_page }

POST /api/users:
  auth: admin
  request:
    name: string (required, max:255)
    username: string (required, unique, max:255)
    email: string (required, unique, max:255)
    password: string (required, min:8, confirmed)
    role: enum[admin, salesman] (required)
    is_active: boolean (default: true)
  response:
    data: { id, name, username, email, role, is_active }
    message: "User created successfully"

GET /api/users/{id}:
  auth: admin
  response:
    data: { id, name, username, email, role, is_active, last_login_at, created_at, updated_at }

PUT /api/users/{id}:
  auth: admin
  request:
    name: string (sometimes, max:255)
    username: string (sometimes, unique, max:255)
    email: string (sometimes, unique, max:255)
    password: string (sometimes, min:8, confirmed)
    role: enum[admin, salesman] (sometimes)
    is_active: boolean (sometimes)
  response:
    data: { id, name, username, email, role, is_active }
    message: "User updated successfully"

DELETE /api/users/{id}:
  auth: admin
  response:
    message: "User deleted successfully"
  notes: Cannot delete self. Cannot delete last admin.
```

### 4.3 Categories

```yaml
GET /api/categories:
  auth: authenticated
  query: { page, per_page, search, is_active }
  response:
    data: [{ id, name, description, is_active, products_count, created_at }]
    meta: { current_page, last_page, total, per_page }

POST /api/categories:
  auth: admin
  request:
    name: string (required, unique, max:255)
    description: string (nullable, max:1000)
  response:
    data: { id, name, description, is_active }
    message: "Category created successfully"

GET /api/categories/{id}:
  auth: authenticated
  response:
    data: { id, name, description, is_active, products_count, created_at, updated_at }

PUT /api/categories/{id}:
  auth: admin
  request:
    name: string (sometimes, unique, max:255)
    description: string (nullable, max:1000)
    is_active: boolean (sometimes)
  response:
    data: { id, name, description, is_active }
    message: "Category updated successfully"

DELETE /api/categories/{id}:
  auth: admin
  response:
    message: "Category deleted successfully"
  notes: Cannot delete if products exist in category

GET /api/categories/all:
  auth: authenticated
  response:
    data: [{ id, name }]  # No pagination, for dropdowns
```

### 4.4 Suppliers

```yaml
GET /api/suppliers:
  auth: admin
  query: { page, per_page, search, is_active }
  response:
    data: [{ id, name, phone, email, address, is_active, created_at }]
    meta: { current_page, last_page, total, per_page }

POST /api/suppliers:
  auth: admin
  request:
    name: string (required, max:255)
    phone: string (nullable, max:50)
    email: string (nullable, max:255)
    address: string (nullable, max:1000)
  response:
    data: { id, name, phone, email, address }
    message: "Supplier created successfully"

GET /api/suppliers/{id}:
  auth: admin
  response:
    data: { id, name, phone, email, address, is_active, created_at, updated_at }

PUT /api/suppliers/{id}:
  auth: admin
  request:
    name: string (sometimes, max:255)
    phone: string (nullable, max:50)
    email: string (nullable, max:255)
    address: string (nullable, max:1000)
    is_active: boolean (sometimes)
  response:
    data: { id, name, phone, email, address }
    message: "Supplier updated successfully"

DELETE /api/suppliers/{id}:
  auth: admin
  response:
    message: "Supplier deleted successfully"

GET /api/suppliers/all:
  auth: admin
  response:
    data: [{ id, name }]  # For dropdowns
```

### 4.5 Products

```yaml
GET /api/products:
  auth: authenticated
  query: { page, per_page, search, category_id, is_active, low_stock_only, sort_by, sort_dir }
  response_admin:
    data: [{ id, item_code, name, category, supplier, purchase_price, selling_price, stock_quantity, minimum_stock_level, is_vat_applicable, is_active }]
    meta: { current_page, last_page, total, per_page }
  response_salesman:
    data: [{ id, item_code, name, category, selling_price, stock_quantity, is_vat_applicable, is_active }]
    meta: { current_page, last_page, total, per_page }
  notes: Purchase_price and supplier are HIDDEN from salesman response via ProductListResource

POST /api/products:
  auth: admin
  request:
    item_code: string (required, unique, max:100)
    name: string (required, max:255)
    category_id: integer (required, exists:categories,id)
    supplier_id: integer (nullable, exists:suppliers,id)
    purchase_price: decimal (required, min:0)
    selling_price: decimal (required, min:0)
    stock_quantity: integer (required, min:0)
    minimum_stock_level: integer (required, min:0)
    is_vat_applicable: boolean (default: true)
  response:
    data: { id, item_code, name, ...all fields }
    message: "Product created successfully"
  side_effect: Creates 'in' stock_movement entry

GET /api/products/{id}:
  auth: authenticated
  response_admin:
    data: { id, item_code, name, category, supplier, purchase_price, selling_price, stock_quantity, minimum_stock_level, is_vat_applicable, recent_movements }
  response_salesman:
    data: { id, item_code, name, category, selling_price, stock_quantity, is_vat_applicable }

PUT /api/products/{id}:
  auth: admin
  request:
    item_code: string (sometimes, unique, max:100)
    name: string (sometimes, max:255)
    category_id: integer (sometimes, exists:categories,id)
    supplier_id: integer (nullable, exists:suppliers,id)
    purchase_price: decimal (sometimes, min:0)
    selling_price: decimal (sometimes, min:0)
    minimum_stock_level: integer (sometimes, min:0)
    is_vat_applicable: boolean (sometimes)
    is_active: boolean (sometimes)
  response:
    data: { id, item_code, name, ...all fields }
    message: "Product updated successfully"
  notes: stock_quantity NOT editable here; use stock adjustment endpoint

DELETE /api/products/{id}:
  auth: admin
  response:
    message: "Product deleted successfully"
  notes: Soft behavior: sets is_active=false

POST /api/products/{id}/stock-adjust:
  auth: admin
  request:
    type: enum[in, out, adjustment] (required)
    quantity: integer (required, min:1)
    reason: string (required if type=adjustment, max:1000)
    supplier_id: integer (nullable, required if type=in, exists:suppliers,id)
    purchase_price: decimal (nullable, required if type=in, min:0)
  response:
    data: { id, item_code, name, stock_quantity }
    message: "Stock adjusted successfully"
  side_effect: Creates stock_movement entry, checks low stock alert

GET /api/products/low-stock:
  auth: admin
  response:
    data: [{ id, item_code, name, stock_quantity, minimum_stock_level, category }]

GET /api/products/search:
  auth: authenticated
  query: { q (search term), limit (default:10) }
  response_admin:
    data: [{ id, item_code, name, selling_price, purchase_price, stock_quantity, is_vat_applicable }]
  response_salesman:
    data: [{ id, item_code, name, selling_price, stock_quantity, is_vat_applicable }]
  notes: Quick search for invoice/quotation item lookup (by name or SKU)
```

### 4.6 Stock Movements

```yaml
GET /api/stock-movements:
  auth: admin
  query: { page, per_page, product_id, type, date_from, date_to, user_id }
  response:
    data: [{ id, product, type, quantity, previous_quantity, new_quantity, reason, user, reference_type, reference_id, created_at }]
    meta: { current_page, last_page, total, per_page }

GET /api/stock-movements/{id}:
  auth: admin
  response:
    data: { id, product, type, quantity, previous_quantity, new_quantity, reason, user, reference, created_at }
```

### 4.7 Customers

```yaml
GET /api/customers:
  auth: authenticated
  query: { page, per_page, search, is_active }
  response:
    data: [{ id, name, phone, email, vehicle_details, address, total_invoices, total_spent, is_active, created_at }]
    meta: { current_page, last_page, total, per_page }

POST /api/customers:
  auth: authenticated
  request:
    name: string (required, max:255)
    phone: string (nullable, max:50)
    email: string (nullable, max:255)
    vehicle_details: string (nullable, max:500)
    address: string (nullable, max:1000)
  response:
    data: { id, name, phone, email, vehicle_details, address }
    message: "Customer created successfully"

GET /api/customers/{id}:
  auth: authenticated
  response_admin:
    data: { id, name, phone, email, vehicle_details, address, invoices, total_spent, outstanding_balance, is_active, created_at }
  response_salesman:
    data: { id, name, phone, email, vehicle_details, address }

PUT /api/customers/{id}:
  auth: authenticated
  request:
    name: string (sometimes, max:255)
    phone: string (nullable, max:50)
    email: string (nullable, max:255)
    vehicle_details: string (nullable, max:500)
    address: string (nullable, max:1000)
  response:
    data: { id, name, phone, email, vehicle_details, address }
    message: "Customer updated successfully"

GET /api/customers/search:
  auth: authenticated
  query: { q (search by name or phone), limit (default:10) }
  response:
    data: [{ id, name, phone, email }]
  notes: Quick search for invoice/quotation customer lookup
```

### 4.8 Invoices

```yaml
GET /api/invoices:
  auth: authenticated
  query: { page, per_page, search, status, payment_status, customer_id, user_id, date_from, date_to, sort_by, sort_dir }
  response_admin:
    data: [{ id, invoice_number, invoice_date, customer, user, payment_status, sub_total, vat_total, grand_total, amount_paid, outstanding_balance, status, created_at }]
    meta: { current_page, last_page, total, per_page }
  response_salesman:
    data: [{ id, invoice_number, invoice_date, customer, payment_status, sub_total, vat_total, grand_total, status, created_at }]
    meta: { ... }
    notes: FILTERED to salesman's own invoices only (user_id = auth user)

POST /api/invoices:
  auth: authenticated
  request:
    customer_id: integer (required, exists:customers,id)
    invoice_date: date (required, default:today)
    vehicle_details: string (nullable, max:500)
    payment_status: enum[paid, pending, partial, on_account] (required)
    notes: string (nullable, max:1000)
    items: array (required, min:1)
      - product_id: integer (required, exists:products,id)
        quantity: integer (required, min:1)
        unit_price: decimal (sometimes, min:0)  # Pre-filled from product, can override by admin
    amount_paid: decimal (required if payment_status=partial, min:0)
  response:
    data: { id, invoice_number, ...all fields, items }
    message: "Invoice created successfully"
  side_effects:
    - Creates invoice + invoice_items with snapshot data
    - If status=confirmed: dispatches InvoiceCreated event → DeductStock + CreateAP + LogActivity
    - Auto-generates sequential invoice_number (INV-000001)

POST /api/invoices/{id}/confirm:
  auth: authenticated (admin or owning salesman)
  request: {}
  response:
    data: { id, invoice_number, status: 'confirmed', ... }
    message: "Invoice confirmed successfully"
  side_effects:
    - Dispatches InvoiceCreated event
    - Deducts stock for each line item
    - If payment_status=on_account: creates AccountsPayable entry
    - Logs activity

GET /api/invoices/{id}:
  auth: authenticated (admin sees all; salesman sees own only)
  response:
    data: { id, invoice_number, invoice_date, customer, user, vehicle_details, payment_status, sub_total, vat_total, grand_total, amount_paid, outstanding_balance, status, items: [...], payments: [...], quotation, notes, created_at }

PUT /api/invoices/{id}:
  auth: admin only
  request:
    invoice_date: date (sometimes)
    vehicle_details: string (nullable)
    payment_status: enum (sometimes)
    notes: string (nullable)
    items: array (sometimes)
      - product_id, quantity, unit_price
    amount_paid: decimal (sometimes)
  response:
    data: { id, invoice_number, ...all fields, items }
    message: "Invoice updated successfully"
  notes: Cannot edit confirmed/cancelled invoices

POST /api/invoices/{id}/cancel:
  auth: admin only
  request:
    reason: string (required, max:1000)
  response:
    data: { id, invoice_number, status: 'cancelled' }
    message: "Invoice cancelled successfully"
  side_effects:
    - Restores stock for all line items
    - Updates/closes related AccountsPayable if exists
    - Logs activity with reason

GET /api/invoices/{id}/pdf:
  auth: authenticated (own or admin)
  response: Binary PDF file (Content-Type: application/pdf)
  notes: Generates PDF with company branding via barryvdh/laravel-dompdf

POST /api/invoices/{id}/payments:
  auth: authenticated
  request:
    amount: decimal (required, min:0.01)
    payment_method: enum[cash, card, transfer, cheque] (required)
    payment_date: date (required, default:today)
    reference_number: string (nullable, max:100)
    notes: string (nullable)
  response:
    data: { id, invoice_id, amount, payment_method, payment_date, reference_number }
    message: "Payment recorded successfully"
  side_effects:
    - Updates invoice amount_paid and outstanding_balance
    - If outstanding_balance <= 0: updates invoice payment_status to 'paid'
    - If partially paid: updates to 'partial'
    - Updates AccountsPayable if linked

GET /api/invoices/next-number:
  auth: authenticated
  response:
    data: { next_number: "INV-000042" }
  notes: Preview next invoice number for display
```

### 4.9 Quotations

```yaml
GET /api/quotations:
  auth: authenticated
  query: { page, per_page, search, status, customer_id, date_from, date_to, sort_by, sort_dir }
  response_admin:
    data: [{ id, quotation_number, quotation_date, customer, user, validity_date, status, sub_total, vat_total, grand_total, created_at }]
    meta: { current_page, last_page, total, per_page }
  response_salesman:
    data: same but filtered to own quotations

POST /api/quotations:
  auth: authenticated
  request:
    customer_id: integer (required, exists:customers,id)
    quotation_date: date (required, default:today)
    validity_date: date (nullable, after:quotation_date)
    vehicle_details: string (nullable, max:500)
    notes: string (nullable, max:1000)
    items: array (required, min:1)
      - product_id: integer (required, exists:products,id)
        quantity: integer (required, min:1)
        unit_price: decimal (sometimes, min:0)
  response:
    data: { id, quotation_number, ...all fields, items }
    message: "Quotation created successfully"
  side_effects:
    - Auto-generates sequential quotation_number (QT-000001)
    - Does NOT deduct stock

GET /api/quotations/{id}:
  auth: authenticated (admin sees all; salesman sees own only)
  response:
    data: { id, quotation_number, quotation_date, customer, user, vehicle_details, validity_date, status, sub_total, vat_total, grand_total, items: [...], notes, created_at }

PUT /api/quotations/{id}:
  auth: authenticated (owning salesman or admin)
  request:
    validity_date: date (sometimes)
    vehicle_details: string (nullable)
    notes: string (nullable)
    items: array (sometimes)
  response:
    data: { id, quotation_number, ... }
    message: "Quotation updated successfully"
  notes: Cannot edit converted/expired quotations

POST /api/quotations/{id}/convert:
  auth: authenticated (owning salesman or admin)
  request:
    payment_status: enum[paid, pending, partial, on_account] (required)
    amount_paid: decimal (required if partial)
  response:
    data: { id: invoice_id, invoice_number, ...invoice fields }
    message: "Quotation converted to invoice successfully"
  side_effects:
    - Creates Invoice + InvoiceItems with all quotation data
    - Sets quotation status to 'converted'
    - Links invoice.quotation_id
    - Does NOT deduct stock at this step; stock deducted on invoice confirm
    - Dispatches QuotationConverted event

POST /api/quotations/{id}/mark-sent:
  auth: authenticated
  request: {}
  response:
    data: { id, status: 'sent' }

GET /api/quotations/{id}/pdf:
  auth: authenticated (own or admin)
  response: Binary PDF file

GET /api/quotations/next-number:
  auth: authenticated
  response:
    data: { next_number: "QT-000042" }
```

### 4.10 Payments

```yaml
GET /api/payments:
  auth: admin
  query: { page, per_page, invoice_id, payment_method, date_from, date_to, user_id }
  response:
    data: [{ id, invoice_id, invoice_number, customer, amount, payment_method, payment_date, reference_number, user, created_at }]
    meta: { current_page, last_page, total, per_page }
```

### 4.11 Accounts Payable

```yaml
GET /api/accounts-payable:
  auth: admin
  query: { page, per_page, customer_id, status, date_from, date_to }
  response:
    data: [{ id, invoice_id, invoice_number, customer, total_amount, amount_paid, outstanding_balance, status, due_date, created_at }]
    meta: { current_page, last_page, total, per_page }

GET /api/accounts-payable/{id}:
  auth: admin
  response:
    data: { id, invoice, customer, total_amount, amount_paid, outstanding_balance, status, due_date, payments, created_at }

POST /api/accounts-payable/{id}/record-payment:
  auth: admin
  request:
    amount: decimal (required, min:0.01)
    payment_method: enum (required)
    payment_date: date (required)
    reference_number: string (nullable)
  response:
    data: { id, outstanding_balance, status }
    message: "Payment recorded"
  side_effects:
    - Creates Payment entry linked to original invoice
    - Updates AccountsPayable amounts and status
    - Updates Invoice amounts and payment_status
```

### 4.12 Dashboard

```yaml
GET /api/dashboard/admin:
  auth: admin
  response:
    data:
      sales_today: decimal
      sales_this_month: decimal
      total_invoices: integer
      low_stock_items: [{ id, item_code, name, stock_quantity, minimum_stock_level, category }]
      recent_transactions: [{ id, invoice_number, customer_name, grand_total, status, payment_status, created_at }]
      outstanding_payments_total: decimal
      top_selling_items: [{ product_id, item_code, name, total_quantity, total_revenue }]
  notes: Cached in Redis for 60s

GET /api/dashboard/salesman:
  auth: salesman
  response:
    data:
      my_sales_today: decimal
      my_sales_this_month: decimal
      recent_invoices: [{ id, invoice_number, customer_name, grand_total, status, created_at }]
      stock_overview_count: integer  # Total distinct products with stock > 0
  notes: Cached in Redis for 60s
```

### 4.13 Reports

```yaml
GET /api/reports/daily-sales:
  auth: admin
  query: { date (required) }
  response:
    data: [{ invoice_number, customer, items_count, sub_total, vat_total, grand_total, payment_status, salesman }]
  download_query: { format: enum[pdf, excel] }
  notes: Returns JSON by default; PDF/Excel via download endpoint

GET /api/reports/monthly-sales:
  auth: admin
  query: { month (required, 1-12), year (required) }
  response:
    data: { daily_breakdown: [...], totals: { sub_total, vat_total, grand_total, invoices_count } }

GET /api/reports/sales-by-salesman:
  auth: admin
  query: { user_id, date_from, date_to }
  response:
    data: [{ user_id, user_name, invoices_count, sub_total, vat_total, grand_total }]

GET /api/reports/top-selling-items:
  auth: admin
  query: { date_from, date_to, category_id }
  response:
    data: [{ product_id, item_code, name, category, total_quantity, total_revenue }]

GET /api/reports/current-stock:
  auth: admin
  query: { category_id }
  response:
    data: [{ id, item_code, name, category, stock_quantity, minimum_stock_level, selling_price, purchase_price }]

GET /api/reports/low-stock-items:
  auth: admin
  query: {}
  response:
    data: [{ id, item_code, name, category, stock_quantity, minimum_stock_level, deficit }]

GET /api/reports/stock-movement:
  auth: admin
  query: { product_id, date_from, date_to }
  response:
    data: [{ id, product, type, quantity, previous_quantity, new_quantity, user, reference, created_at }]

GET /api/reports/revenue-summary:
  auth: admin
  query: { date_from, date_to }
  response:
    data: { total_revenue, total_vat, total_paid, total_pending, total_on_account, breakdown_by_month: [...] }

GET /api/reports/pending-payments:
  auth: admin
  query: { customer_id, date_from, date_to }
  response:
    data: [{ invoice_id, invoice_number, customer, grand_total, amount_paid, outstanding_balance, payment_status, invoice_date }]

GET /api/reports/{report_type}/download:
  auth: admin
  query: { format: enum[pdf, excel], ...same filter params as report }
  response: Binary file (PDF or Excel)
  notes: Dispatches queued job for generation
```

### 4.14 Activity Logs

```yaml
GET /api/activity-logs:
  auth: admin
  query: { page, per_page, user_id, action, model_type, date_from, date_to }
  response:
    data: [{ id, user, action, model_type, model_id, description, properties, ip_address, created_at }]
    meta: { current_page, last_page, total, per_page }
```

### 4.15 Settings

```yaml
GET /api/settings:
  auth: admin
  response:
    data: [{ key, value }]

PUT /api/settings:
  auth: admin
  request:
    settings: object (key-value pairs)
  response:
    message: "Settings updated successfully"
  notes: Clears relevant Redis cache on update
```

---

## 5. User Stories

### US-001: Admin Login

```yaml
id: US-001
as_a: admin
i_want: to log in with my username and password
so_that: I can access the full admin panel and all system features
priority: must
acceptance_criteria:
  - Login with username + password
  - Invalid credentials show appropriate error
  - Session created via Sanctum with Redis store
  - Admin role verified server-side
  - Session timeout after 30 min inactivity (configurable)
  - Activity logged on successful login
dependencies: []
estimated_effort: s
```

### US-002: Salesman Login

```yaml
id: US-002
as_a: salesman
i_want: to log in securely with my credentials
so_that: I can access salesman features only
priority: must
acceptance_criteria:
  - Login with username + password
  - Invalid credentials show error
  - Redirected to salesman dashboard
  - Cannot access admin endpoints (403 Forbidden)
  - Session timeout after 30 min
dependencies: [US-001]
estimated_effort: s
```

### US-003: Manage Products

```yaml
id: US-003
as_a: admin
i_want: to add, edit, and delete products with all fields
so_that: the inventory catalog is maintained
priority: must
acceptance_criteria:
  - Create product with item_code, name, category, supplier, purchase_price, selling_price, stock_quantity, minimum_stock_level, is_vat_applicable
  - Edit product fields (except stock_quantity — use stock adjustment)
  - Delete (soft: set is_active=false)
  - Item code must be unique
  - Creating product with stock_quantity > 0 creates 'in' stock_movement
  - Purchase price hidden from salesman views
dependencies: [US-001]
estimated_effort: m
```

### US-004: View Stock as Salesman

```yaml
id: US-004
as_a: salesman
i_want: to view available stock with selling prices
so_that: I can create invoices and quotations
priority: must
acceptance_criteria:
  - See product list with item_code, name, category, selling_price, stock_quantity, is_vat_applicable
  - Cannot see purchase_price, supplier, minimum_stock_level
  - Read-only: cannot edit products
  - Can search by name or SKU
  - Can filter by category
dependencies: [US-003]
estimated_effort: s
```

### US-005: Stock Adjustment

```yaml
id: US-005
as_a: admin
i_want: to manually adjust stock levels with a logged reason
so_that: inventory discrepancies can be corrected
priority: must
acceptance_criteria:
  - Admin-only access
  - Stock in: adds quantity, requires supplier_id and purchase_price
  - Stock out: removes quantity, validates against available stock
  - Adjustment: change quantity with mandatory reason text
  - Every adjustment creates a stock_movement record with user, timestamp, previous/new quantities
  - Low stock check triggered after adjustment
dependencies: [US-003]
estimated_effort: m
```

### US-006: Stock Auto-Deduction

```yaml
id: US-006
as_a: system
i_want: to automatically deduct stock when an invoice is confirmed
so_that: inventory stays accurate without manual intervention
priority: must
acceptance_criteria:
  - Stock deducted for each line item when invoice is confirmed
  - Each deduction creates 'out' stock_movement with reference to invoice
  - If stock insufficient for any item, invoice confirmation fails with error
  - Stock NOT deducted on draft invoices
  - Stock NOT deducted on quotation creation
  - Stock restored if invoice cancelled
dependencies: [US-003, US-010]
estimated_effort: m
```

### US-007: Low Stock Alert

```yaml
id: US-007
as_a: admin
i_want: to receive alerts when stock falls below minimum level
so_that: I can reorder in time
priority: must
acceptance_criteria:
  - Alert triggered when stock_quantity < minimum_stock_level
  - Alert shown on Admin Dashboard low-stock panel
  - Optional notification (email/database) sent to admin
  - Alert clears when stock replenished above threshold
  - Real-time check on stock movement events
dependencies: [US-005, US-006]
estimated_effort: m
```

### US-008: Create Invoice

```yaml
id: US-008
as_a: salesman or admin
i_want: to create an invoice with line items from stock
so_that: I can bill the customer
priority: must
acceptance_criteria:
  - Select or create customer
  - Add line items by searching product name or SKU
  - Unit price pre-filled from product selling_price
  - VAT 5% auto-calculated per item if is_vat_applicable=true
  - Sub total, VAT total, grand total auto-calculated
  - Set payment status: paid/pending/partial/on_account
  - If partial: enter amount_paid
  - Invoice created as 'draft' initially
  - Sequential invoice number auto-generated
  - Salesman auto-assigned from logged-in user
  - Customer auto-saved on first invoice
dependencies: [US-003, US-004]
estimated_effort: l
```

### US-009: Confirm Invoice

```yaml
id: US-009
as_a: salesman or admin
i_want: to confirm an invoice to finalize it
so_that: stock is deducted and the transaction is committed
priority: must
acceptance_criteria:
  - Confirm changes status from 'draft' to 'confirmed'
  - Stock deducted for all line items
  - If payment_status=on_account: AccountsPayable record created
  - Activity logged
  - Cannot confirm if stock insufficient
  - After confirm: can print/download PDF
dependencies: [US-008]
estimated_effort: m
```

### US-010: Cancel Invoice

```yaml
id: US-010
as_a: admin
i_want: to cancel an invoice with a documented reason
so_that: erroneous invoices can be voided properly
priority: must
acceptance_criteria:
  - Admin-only action
  - Must provide cancellation reason
  - Stock restored for all line items
  - Invoice status set to 'cancelled'
  - Related AccountsPayable closed/updated
  - Activity logged with reason
  - Cannot cancel already cancelled invoices
dependencies: [US-009]
estimated_effort: m
```

### US-011: Record Payment

```yaml
id: US-011
as_a: salesman or admin
i_want: to record payments against an invoice
so_that: payment tracking is accurate
priority: must
acceptance_criteria:
  - Record amount, payment_method, payment_date
  - Multiple payments allowed per invoice
  - Invoice amount_paid and outstanding_balance updated
  - When fully paid: payment_status auto-updated to 'paid'
  - When partially paid: status updated to 'partial'
  - If linked to AccountsPayable: AP record updated
dependencies: [US-009]
estimated_effort: m
```

### US-012: Create Quotation

```yaml
id: US-012
as_a: salesman or admin
i_want: to create a quotation for a customer
so_that: I can provide pricing before commitment
priority: must
acceptance_criteria:
  - Create with customer, line items, validity_date
  - Sequential quotation number (QT-xxxxxx)
  - VAT calculated per line item
  - Stock NOT deducted at quotation stage
  - Print/download quotation PDF
  - Status: draft
dependencies: [US-003, US-004]
estimated_effort: m
```

### US-013: Convert Quotation to Invoice

```yaml
id: US-013
as_a: salesman or admin
i_want: to convert a quotation to an invoice with one click
so_that: approved quotes become billable invoices
priority: must
acceptance_criteria:
  - One-click conversion from quotation detail page
  - Invoice inherits all quotation data (customer, items, prices)
  - Quotation status set to 'converted'
  - Invoice.quotation_id linked
  - Stock still NOT deducted at conversion; deducted on invoice confirm
  - Payment status set by user during conversion
  - All line item data preserved exactly
dependencies: [US-012, US-008]
estimated_effort: m
```

### US-014: On Account → Accounts Payable

```yaml
id: US-014
as_a: system
i_want: to automatically create an Accounts Payable entry when invoice is on_account
so_that: outstanding customer debts are tracked
priority: must
acceptance_criteria:
  - When invoice payment_status=on_account AND status=confirmed
  - AccountsPayable record auto-created with total_amount = grand_total, outstanding_balance = grand_total
  - Subsequent payments reduce outstanding_balance
  - AP status: open → partially_paid → settled
  - Admin can view all AP records filtered by customer/status
dependencies: [US-009, US-011]
estimated_effort: m
```

### US-015: Admin Dashboard

```yaml
id: US-015
as_a: admin
i_want: to see real-time KPIs and alerts on my dashboard
so_that: I have operational visibility
priority: must
acceptance_criteria:
  - Total sales today and this month
  - Total invoices count
  - Low stock alert panel with items below minimum
  - Last 10 transactions with status indicators
  - Outstanding payments total
  - Top 5 selling items this month
  - Data refreshes within 60 seconds (Redis cache)
dependencies: [US-009, US-006, US-007]
estimated_effort: l
```

### US-016: Salesman Dashboard

```yaml
id: US-016
as_a: salesman
i_want: to see my own sales data and stock overview
so_that: I can track my performance
priority: must
acceptance_criteria:
  - My sales today and this month
  - My last 5 invoices
  - Stock overview: total products with stock > 0
  - No purchase prices visible
  - No other salesmen's data visible
dependencies: [US-009, US-004]
estimated_effort: m
```

### US-017: Reports with PDF/Excel Export

```yaml
id: US-017
as_a: admin
i_want: to generate and download reports in PDF and Excel
so_that: I can analyze business data and share with stakeholders
priority: must
acceptance_criteria:
  - 9 report types all generate correctly (daily sales, monthly sales, sales by salesman, top-selling items, current stock, low stock, stock movement, revenue summary, pending payments)
  - Filter by date range, category, salesman, customer
  - Download as PDF with company branding
  - Download as Excel (.xlsx)
  - Inline print preview supported
  - Report data matches actual transaction data
dependencies: [US-009, US-011]
estimated_effort: xl
```

### US-018: Manage Users

```yaml
id: US-018
as_a: admin
i_want: to create and manage salesman and admin accounts
so_that: user access is controlled
priority: must
acceptance_criteria:
  - Create users with name, username, email, password, role
  - Edit user details and roles
  - Delete/deactivate users
  - Cannot delete self
  - Cannot delete last admin
  - Admin-only access
dependencies: [US-001]
estimated_effort: m
```

### US-019: Activity Logging

```yaml
id: US-019
as_a: admin
i_want: to see a log of all user actions in the system
so_that: I have full audit trail
priority: must
acceptance_criteria:
  - All create/update/delete/cancel/login actions logged
  - Log includes: user, action, model, model_id, description, timestamp, IP
  - Admin can filter logs by user, action, date range
  - Logs cannot be edited or deleted by users
dependencies: [US-001]
estimated_effort: m
```

### US-020: Invoice PDF Generation

```yaml
id: US-020
as_a: salesman or admin
i_want: to generate a professional PDF invoice
so_that: I can print or send it to the customer
priority: must
acceptance_criteria:
  - PDF includes company name, logo, address, VAT number
  - Invoice number, date, customer details
  - Line items with quantities, unit price, VAT, line totals
  - Sub total, VAT total, grand total
  - Payment status display
  - Consistent professional layout
  - Download or open in browser
dependencies: [US-009]
estimated_effort: m
```

### US-021: Manage Categories and Suppliers

```yaml
id: US-021
as_a: admin
i_want: to manage product categories and suppliers
so_that: products are organized and suppliers tracked
priority: must
acceptance_criteria:
  - CRUD for categories (name, description)
  - CRUD for suppliers (name, phone, email, address)
  - Categories visible to all users (dropdown)
  - Suppliers admin-only
  - Cannot delete category with products
dependencies: [US-001]
estimated_effort: m
```

### US-022: Customer Management

```yaml
id: US-022
as_a: salesman or admin
i_want: to manage customer records
so_that: customer data is centralized and auto-fills on invoices
priority: must
acceptance_criteria:
  - Customer auto-saved when entered on first invoice
  - Auto-fill customer details by name/phone lookup
  - Admin can see full customer history and outstanding balance
  - Salesman can create/edit basic customer info
  - Search customers by name or phone
dependencies: [US-008]
estimated_effort: m
```

### US-023: Return / Exchange

```yaml
id: US-023
as_a: admin
i_want: to process returns and exchanges
so_that: customers can return defective or wrong parts
priority: must
acceptance_criteria:
  - Salesman initiates return request linked to original invoice
  - Admin approves/rejects return
  - On approval: stock re-added, invoice updated, credit note generated
  - Financial adjustment recorded (refund or exchange)
  - Activity logged
dependencies: [US-009, US-010]
estimated_effort: l
```

---

## 6. Functional Requirements

### FR-001: Role-Based Access Control (Server-Side)

```yaml
id: FR-001
description: All API endpoints must enforce role-based access at the middleware and policy level
priority: must
acceptance_criteria:
  - Admin middleware applied to admin-only routes
  - Laravel Policies authorize model-level actions
  - Salesman accessing admin endpoint receives 403
  - Salesman filtered queries return only own data
  - No UI-only access control — server is the source of truth
user_stories: [US-001, US-002, US-003, US-010, US-018]
tags: [backend, security, critical]
```

### FR-002: VAT Calculation

```yaml
id: FR-002
description: 5% VAT calculated per item based on is_vat_applicable flag
priority: must
acceptance_criteria:
  - If product.is_vat_applicable = true: vat_amount = line_total * 5%
  - If product.is_vat_applicable = false: vat_amount = 0
  - VAT rate stored in settings table (configurable)
  - Invoice sub_total = sum of line_totals (before VAT)
  - Invoice vat_total = sum of all vat_amounts
  - Invoice grand_total = sub_total + vat_total
  - VAT rate per item snapshot in invoice_items table
user_stories: [US-008, US-012]
tags: [backend, business-logic, critical]
```

### FR-003: Sequential Number Generation

```yaml
id: FR-003
description: Auto-generate sequential invoice and quotation numbers
priority: must
acceptance_criteria:
  - Invoice format: INV-000001 (INV-prefix + 6-digit zero-padded)
  - Quotation format: QT-000001 (QT-prefix + 6-digit zero-padded)
  - Number generated atomically (database-level to prevent race conditions)
  - Non-editable after generation
  - Prefix configurable in settings table
  - Use MySQL atomic counter or dedicated sequence tracking
user_stories: [US-008, US-012]
tags: [backend, business-logic]
```

### FR-004: Stock Deduction on Invoice Confirmation

```yaml
id: FR-004
description: Stock automatically deducted when invoice status changes to 'confirmed'
priority: must
acceptance_criteria:
  - DB transaction wrapping invoice confirmation + stock deduction
  - If any item has insufficient stock: rollback entire transaction, return error
  - Stock movement created with reference to invoice
  - Stock NOT deducted for draft invoices or quotations
  - Stock restored on invoice cancellation
user_stories: [US-006, US-009, US-010]
tags: [backend, business-logic, critical]
```

### FR-005: Purchase Price Isolation

```yaml
id: FR-005
description: Purchase prices must never be exposed to salesman users
priority: must
acceptance_criteria:
  - ProductListResource for salesman omits purchase_price, supplier fields
  - ProductDetailResource for salesman omits purchase_price, supplier fields
  - Dashboard for salesman shows no cost/profit data
  - Reports for salesman not accessible (admin-only reports)
  - API returns different response shapes based on role
user_stories: [US-004, US-016]
tags: [backend, security, critical]
```

### FR-006: Accounts Payable Auto-Creation

```yaml
id: FR-006
description: When invoice payment_status is 'on_account' and invoice is confirmed, automatically create an AccountsPayable record
priority: must
acceptance_criteria:
  - Triggered by InvoiceConfirmed event
  - AP.total_amount = invoice.grand_total
  - AP.outstanding_balance = invoice.grand_total
  - AP.status = 'open'
  - AP linked to invoice_id and customer_id
  - Subsequent payments reduce AP.outstanding_balance
  - AP status transitions: open → partially_paid → settled
user_stories: [US-014]
tags: [backend, business-logic, critical]
```

### FR-007: Activity Audit Trail

```yaml
id: FR-007
description: All significant actions must be logged with full context
priority: must
acceptance_criteria:
  - Logged actions: login, logout, create, update, delete, cancel, adjust, convert, confirm
  - Each log: user_id, action, model_type, model_id, description, properties (JSON before/after), ip_address, timestamp
  - Logs immutable: no update or delete operations
  - Admin can search/filter logs
user_stories: [US-019]
tags: [backend, security]
```

### FR-008: PDF Generation

```yaml
id: FR-008
description: Server-side PDF generation for invoices, quotations, and reports
priority: must
acceptance_criteria:
  - Laravel DomPDF for invoice and quotation PDFs
  - Blade templates for PDF layout
  - Company branding (logo, name, address, VAT number from settings)
  - Reports also available as PDF
  - Content-Disposition: inline for preview, attachment for download
user_stories: [US-020, US-017]
tags: [backend, reporting]
```

### FR-009: Excel Export

```yaml
id: FR-009
description: Server-side Excel export for all report types
priority: must
acceptance_criteria:
  - Maatwebsite Excel package for XLSX generation
  - Export classes per report type
  - Column headers, formatting, auto-width
  - Downloaded as .xlsx file
user_stories: [US-017]
tags: [backend, reporting]
```

### FR-010: Customer Auto-Save

```yaml
id: FR-010
description: New customers entered on invoices are automatically saved to the customer database
priority: must
acceptance_criteria:
  - If customer not found by name/phone search: create new customer record
  - Auto-fill existing customer details on future invoices
  - Customer lookup by name or phone
user_stories: [US-022]
tags: [backend, business-logic]
```

### FR-011: Data Snapshots on Invoices

```yaml
id: FR-011
description: Invoice items store snapshot of product data at time of invoice creation
priority: must
acceptance_criteria:
  - invoice_items.item_name and item_code snapshot from product
  - quotation_items.item_name and item_code snapshot from product
  - Changing product name/price does not affect existing invoices/quotations
  - Line item unit_price can differ from current product selling_price
user_stories: [US-008, US-012]
tags: [backend, data-integrity]
```

---

## 7. Non-Functional Requirements

### NFR-001: Performance

```yaml
id: NFR-001
category: performance
description: API response times must be acceptable for interactive use
targets:
  - CRUD endpoints: < 200ms (p95)
  - Dashboard endpoints: < 300ms (p95) with Redis cache
  - PDF generation: < 5s
  - Excel export: < 10s
  - Report queries: < 1s (with proper indexing)
strategy: Redis caching, eager loading, DB indexes, queue jobs for PDF/Excel
```

### NFR-002: Security

```yaml
id: NFR-002
category: security
description: Application must follow security best practices
targets:
  - Passwords hashed with bcrypt (Laravel default) or Argon2
  - RBAC enforced server-side (middleware + policies)
  - CSRF protection (Sanctum SPA)
  - XSS protection (React auto-escaping + CSP headers)
  - SQL injection protection (Eloquent ORM)
  - Rate limiting on login endpoint (5 attempts then lock 1 min)
  - HTTPS mandatory in production
  - Session timeout: 30 min configurable
  - Input validation on all endpoints (Form Requests)
```

### NFR-003: Reliability

```yaml
id: NFR-003
category: reliability
description: System must be reliable and recoverable
targets:
  - Daily automated database backup
  - DB transactions for critical operations (stock deduction, payment recording)
  - Queue job retry (3 attempts, 60s backoff)
  - Graceful error handling with user-friendly messages
strategy: Supervisor for queue workers, backup cron job, transaction wrapping
```

### NFR-004: Usability

```yaml
id: NFR-004
category: usability
description: System must be usable on desktop and mobile
targets:
  - Responsive design (Tailwind CSS breakpoints)
  - Desktop primary, tablet secondary, mobile functional
  - Browser support: Chrome, Firefox, Edge (latest 2 versions)
  - Navigation adapts to role (admin sidebar vs salesman sidebar)
  - Form validation with clear error messages
  - Loading states for async operations
```

### NFR-005: Data Integrity

```yaml
id: NFR-005
category: data_integrity
description: Financial and inventory data must be accurate and consistent
targets:
  - DB transactions for all multi-table operations
  - Stock quantity never goes negative (validation before deduction)
  - Invoice totals match sum of line items
  - Payment totals track correctly against invoices
  - Snapshot data on line items preserves historical accuracy
strategy: Eloquent transactions, validation rules, periodic reconciliation
```

---

## 8. Implementation Tasks

```yaml
tasks:
  - id: T-001
    title: Initialize Laravel backend project
    type: setup
    description: "Create Laravel project in /backend with Sanctum, DomPDF, Excel, Redis config"
    acceptance_criteria:
      - Laravel 12 installed in /backend
      - Sanctum configured with SPA authentication
      - Redis configured for cache, session, queue
      - CORS configured for frontend origin
      - .env.example with all required variables
      - Database connection to MySQL verified
    estimated_effort: s
    dependencies: []

  - id: T-002
    title: Initialize React frontend project
    type: setup
    description: "Create React + Vite + TypeScript + shadcn/ui project in /frontend"
    acceptance_criteria:
      - Vite + React + TypeScript scaffolded in /frontend
      - shadcn/ui initialized with components.json
      - Tailwind CSS configured
      - React Router, React Query, Axios, React Hook Form + Zod installed
      - Folder structure created per PRD spec
      - Proxy configured for /api to Laravel backend
    estimated_effort: s
    dependencies: []

  - id: T-003
    title: Database migrations - core tables
    type: implementation
    description: "Create all database migrations in order: settings, users, categories, suppliers, products, stock_movements, customers"
    acceptance_criteria:
      - All migrations run successfully
      - Rollback tested
      - Indexes and foreign keys created
      - Settings table seeded with defaults
    estimated_effort: m
    dependencies: [T-001]

  - id: T-004
    title: Database migrations - transaction tables
    type: implementation
    description: "Create migrations for: quotations, quotation_items, invoices, invoice_items, payments, accounts_payable, activity_logs"
    acceptance_criteria:
      - All migrations run successfully
      - Foreign keys reference correct tables
      - Enums match PRD spec
    estimated_effort: m
    dependencies: [T-003]

  - id: T-005
    title: Auth system - backend
    type: implementation
    description: "Implement login, logout, me, password change with Sanctum + middleware"
    acceptance_criteria:
      - POST /api/auth/login works
      - POST /api/logout revokes token
      - GET /api/auth/me returns user
      - EnsureIsAdmin middleware enforced
      - Rate limiting on login
      - Activity logged on login/logout
    estimated_effort: m
    dependencies: [T-003]

  - id: T-006
    title: Auth system - frontend
    type: implementation
    description: "Login page, auth context, protected routes, Axios interceptors"
    acceptance_criteria:
      - LoginPage with form validation
      - useAuth hook manages state
      - ProtectedRoute redirects to login
      - Axios interceptor handles 401
      - Role-based route access (admin vs salesman routes)
    estimated_effort: m
    dependencies: [T-005, T-002]

  - id: T-007
    title: User management - backend + frontend
    type: implementation
    description: "CRUD for users (admin only) with policies"
    acceptance_criteria:
      - User CRUD API with Policy authorization
      - Cannot delete self or last admin
      - Frontend UserList with search, filter, pagination
      - UserForm for create/edit with validation
    estimated_effort: m
    dependencies: [T-005, T-006]

  - id: T-008
    title: Category management - backend + frontend
    type: implementation
    description: "CRUD for categories with admin policy, dropdown endpoint"
    acceptance_criteria:
      - Category CRUD API
      - GET /api/categories/all for dropdowns
      - Frontend CategoryList, CategoryForm
      - Cannot delete category with products
    estimated_effort: m
    dependencies: [T-005, T-006]

  - id: T-009
    title: Supplier management - backend + frontend
    type: implementation
    description: "CRUD for suppliers (admin only) with dropdown endpoint"
    acceptance_criteria:
      - Supplier CRUD API (admin only)
      - GET /api/suppliers/all for dropdowns
      - Frontend SupplierList, SupplierForm
    estimated_effort: m
    dependencies: [T-005, T-006]

  - id: T-010
    title: Product management - backend
    type: implementation
    description: "Product CRUD with StockService, role-based resources, stock adjustment, search, low-stock"
    acceptance_criteria:
      - Product CRUD with ProductListResource (role-based: hide purchase_price for salesman)
      - Stock adjustment endpoint with stock_movement logging
      - Product search endpoint for invoice/quotation lookup
      - Low-stock endpoint
      - StockService handles deduction/restoration logic
    estimated_effort: l
    dependencies: [T-008, T-009]

  - id: T-011
    title: Product management - frontend
    type: implementation
    description: "ProductList, ProductForm, ProductDetail, StockAdjustForm, StockMovementList"
    acceptance_criteria:
      - Product list with search, filter by category, pagination
      - ProductForm with all fields (role-adapted)
      - StockAdjustForm for admin (type, quantity, reason)
      - StockMovementList with filter by product/type/date
      - StockAlertPanel on admin dashboard
    estimated_effort: l
    dependencies: [T-010, T-006]

  - id: T-012
    title: Customer management - backend + frontend
    type: implementation
    description: "Customer CRUD with search, auto-save on invoice, lookup"
    acceptance_criteria:
      - Customer CRUD API
      - Customer search endpoint (name/phone)
      - Frontend CustomerList, CustomerForm, CustomerDetail
      - Customer auto-save logic in InvoiceService
    estimated_effort: m
    dependencies: [T-005, T-006]

  - id: T-013
    title: Invoice system - backend
    type: implementation
    description: "Invoice CRUD with InvoiceService, stock deduction, AP creation, PDF generation, events/listeners"
    acceptance_criteria:
      - Invoice CRUD API with sequential number generation
      - InvoiceItems stored with product snapshots
      - InvoiceService handles create/confirm/cancel logic
      - InvoiceCreated event → DeductStockOnInvoice listener
      - InvoiceCancelled event → RestoreStockOnCancel listener
      - CreateAccountsPayableOnAccount listener
      - PDF generation via DomPDF
      - Payment recording with balance tracking
      - Salesman can only see own invoices
    estimated_effort: xl
    dependencies: [T-010, T-012]

  - id: T-014
    title: Invoice system - frontend
    type: implementation
    description: "InvoiceList, InvoiceForm with item search, InvoiceDetail, payment recording, PDF view/download"
    acceptance_criteria:
      - InvoiceList with search, filter by status/payment/date, pagination
      - InvoiceForm: customer lookup, item search (by name/SKU), auto-calc totals
      - InvoiceDetail: full view with items, payments, actions (confirm/cancel/pay)
      - Payment recording form
      - PDF download button
      - Salesman sees only own invoices
    estimated_effort: xl
    dependencies: [T-013, T-006]

  - id: T-015
    title: Quotation system - backend
    type: implementation
    description: "Quotation CRUD with convert-to-invoice logic, PDF generation"
    acceptance_criteria:
      - Quotation CRUD API with sequential QT-xxxxxx numbering
      - Convert to invoice: creates invoice, links quotation, sets status
      - Stock NOT deducted on quotation or conversion (only on invoice confirm)
      - Quotation PDF generation
      - Mark-as-sent endpoint
    estimated_effort: l
    dependencies: [T-010, T-012]

  - id: T-016
    title: Quotation system - frontend
    type: implementation
    description: "QuotationList, QuotationForm, QuotationDetail, convert action, PDF"
    acceptance_criteria:
      - QuotationList with search, filter, pagination
      - QuotationForm similar to InvoiceForm with validity_date field
      - QuotationDetail with convert-to-invoice button
      - PDF download
    estimated_effort: l
    dependencies: [T-015, T-006]

  - id: T-017
    title: Accounts Payable - backend + frontend
    type: implementation
    description: "AP listing, detail, record payment, auto-creation on on_account invoices"
    acceptance_criteria:
      - AccountsPayable API (admin only)
      - AP records auto-created when on_account invoice confirmed
      - Record payment against AP updates invoice + AP balances
      - Frontend AccountsPayableList with filters
      - Payment recording form
    estimated_effort: m
    dependencies: [T-013]

  - id: T-018
    title: Dashboard - backend
    type: implementation
    description: "Admin and Salesman dashboard API endpoints with Redis caching"
    acceptance_criteria:
      - /api/dashboard/admin returns all KPIs
      - /api/dashboard/salesman returns own data only
      - Redis caching with 60s TTL
      - Cache invalidation on invoice/product changes
    estimated_effort: m
    dependencies: [T-013, T-015]

  - id: T-019
    title: Dashboard - frontend
    type: implementation
    description: "AdminDashboard and SalesmanDashboard components with shadcn cards"
    acceptance_criteria:
      - AdminDashboard with SalesCards, InvoiceCountCard, LowStockPanel, RecentTransactions, OutstandingPaymentsCard, TopSellingItems
      - SalesmanDashboard with own sales cards, recent invoices, stock overview
      - Real-time data via React Query with 60s refetch
      - Responsive grid layout
    estimated_effort: l
    dependencies: [T-018, T-006]

  - id: T-020
    title: Reports - backend
    type: implementation
    description: "All 9 report endpoints with filtering, PDF generation, Excel export"
    acceptance_criteria:
      - 9 report endpoints with query filters
      - PDF generation via DomPDF with Blade templates
      - Excel export via Maatwebsite Excel
      - Report jobs queued for large datasets
    estimated_effort: xl
    dependencies: [T-013]

  - id: T-021
    title: Reports - frontend
    type: implementation
    description: "Report selector page, individual report pages with filters, download buttons"
    acceptance_criteria:
      - ReportSelector with all report types
      - Each report: filter form, data table, download PDF/Excel buttons
      - Loading states for generation
    estimated_effort: l
    dependencies: [T-020, T-006]

  - id: T-022
    title: Activity Logs - backend + frontend
    type: implementation
    description: "Activity log recording, listing, and admin frontend"
    acceptance_criteria:
      - Activity logged on all CRUD + login/logout actions
      - LogActivity listener on model events
      - ActivityLogList frontend with filters
      - Admin-only access
    estimated_effort: m
    dependencies: [T-005, T-006]

  - id: T-023
    title: Settings - backend + frontend
    type: implementation
    description: "Settings CRUD for company info, VAT rate, numbering prefixes"
    acceptance_criteria:
      - GET /api/settings returns all settings
      - PUT /api/settings updates and clears cache
      - Frontend settings page with form
      - Admin-only access
    estimated_effort: s
    dependencies: [T-005, T-006]

  - id: T-024
    title: App layout and navigation
    type: implementation
    description: "AppLayout with AdminSidebar, SalesmanSidebar, Header, MobileNav, Breadcrumbs"
    acceptance_criteria:
      - Sidebar nav based on user role
      - Admin: Dashboard, Products, Invoices, Quotations, Customers, Payments, AP, Reports, Users, Categories, Suppliers, Stock, Activity Logs, Settings
      - Salesman: Dashboard, Products (read), Invoices (own), Quotations (own), Customers
      - Mobile-responsive hamburger menu
      - Header with user name, role badge, logout
    estimated_effort: m
    dependencies: [T-006]

  - id: T-025
    title: Seeders and demo data
    type: implementation
    description: "Create seeders for admin user, sample categories, suppliers, products, customers"
    acceptance_criteria:
      - AdminSeeder: creates default admin user
      - CategorySeeder: 5+ sample categories
      - SupplierSeeder: 3+ sample suppliers
      - ProductSeeder: 20+ sample products across categories
      - CustomerSeeder: 5+ sample customers
    estimated_effort: s
    dependencies: [T-004]

  - id: T-026
    title: End-to-end testing
    type: testing
    description: "Integration tests for critical workflows"
    acceptance_criteria:
      - Auth flow tests (login, logout, 403 for wrong role)
      - Invoice create → confirm → stock deducted test
      - Invoice cancel → stock restored test
      - On Account → AP created test
      - Quotation → convert → confirm → stock deducted test
      - VAT calculation tests
      - Sequential number generation test
    estimated_effort: l
    dependencies: [T-013, T-015, T-017]
```

---

## 9. UI/UX Requirements

### 9.1 Page Routes

```yaml
routes:
  /login: LoginPage
  /admin/dashboard: AdminDashboardPage (admin only)
  /admin/products: ProductsPage (admin)
  /admin/products/new: ProductFormPage
  /admin/products/:id/edit: ProductFormPage
  /admin/products/:id: ProductDetailPage
  /admin/invoices: InvoicesPage (admin sees all)
  /admin/invoices/new: InvoiceFormPage
  /admin/invoices/:id: InvoiceDetailPage
  /admin/quotations: QuotationsPage
  /admin/quotations/new: QuotationFormPage
  /admin/quotations/:id: QuotationDetailPage
  /admin/customers: CustomersPage
  /admin/customers/:id: CustomerDetailPage
  /admin/payments: PaymentsPage
  /admin/accounts-payable: AccountsPayablePage
  /admin/reports: ReportsPage
  /admin/users: UsersPage
  /admin/categories: CategoriesPage
  /admin/suppliers: SuppliersPage
  /admin/stock-movements: StockMovementsPage
  /admin/activity-logs: ActivityLogsPage
  /admin/settings: SettingsPage

  /salesman/dashboard: SalesmanDashboardPage (salesman only)
  /salesman/products: ProductsPage (read-only, no purchase price)
  /salesman/invoices: InvoicesPage (own only)
  /salesman/invoices/new: InvoiceFormPage
  /salesman/invoices/:id: InvoiceDetailPage (own only)
  /salesman/quotations: QuotationsPage (own only)
  /salesman/quotations/new: QuotationFormPage
  /salesman/quotations/:id: QuotationDetailPage (own only)
  /salesman/customers: CustomersPage (basic info only)
```

### 9.2 shadcn/ui Components Needed

```yaml
components:
  navigation:
    - Sidebar (custom with shadcn NavigationMenu)
    - Header
    - MobileNav (Sheet-based drawer)
    - Breadcrumb

  data_display:
    - DataTable (TanStack Table with shadcn styling)
    - Card (dashboard KPIs)
    - Badge (status indicators: paid/pending/cancelled)
    - Alert (low stock, errors)
    - Tooltip

  forms:
    - Input (text, number, search)
    - Select (categories, suppliers, customers)
    - DatePicker (invoice/quotation dates)
    - Combobox (product search with search-as-you-type)
    - Textarea (notes, reasons)
    - Switch (is_vat_applicable, is_active)
    - Form (React Hook Form wrapper)
    - Button (primary, secondary, destructive, outline)

  feedback:
    - Dialog (confirm actions, payment forms)
    - AlertDialog (cancel invoice confirmation)
    - Toast (success/error notifications)
    - Sheet (mobile navigation, side panels)
    - Skeleton (loading states)
    - Tabs (report type selector)

  layout:
    - Separator
    - ScrollArea
    - Collapsible (sidebar sections)
    - ResizablePanels (optional: split views)

  print:
    - InvoicePdf (formatted invoice view for print)
    - QuotationPdf (formatted quotation view for print)
```

### 9.3 Dashboard Layouts

```
Admin Dashboard Grid:
┌─────────────┬──────────────┬──────────────┬──────────────────┐
│ Sales Today  │ Sales Month  │ Total Invoices│ Outstanding Amt  │
└─────────────┴──────────────┴──────────────┴──────────────────┘
┌─────────────────────────────┬───────────────────────────────┐
│ Recent Transactions (table) │ Low Stock Alert Panel (list)   │
│ Last 10 invoices            │ Items below minimum            │
└─────────────────────────────┴───────────────────────────────┘
┌─────────────────────────────┐
│ Top 5 Selling Items (chart) │
└─────────────────────────────┘

Salesman Dashboard Grid:
┌──────────────┬───────────────┐
│ My Sales Today│ My Sales Month│
└──────────────┴───────────────┘
┌─────────────────────────────┐
│ My Recent Invoices (table)   │
└─────────────────────────────┘
┌─────────────────────────────┐
│ Stock Overview (count only)  │
└─────────────────────────────┘
```

---

## 10. Context for Agents

### 10.1 Code Locations

```yaml
backend:
  root: /backend
  controllers: app/Http/Controllers/Api/
  models: app/Models/
  policies: app/Policies/
  services: app/Services/
  events: app/Events/
  listeners: app/Listeners/
  jobs: app/Jobs/
  notifications: app/Notifications/
  exports: app/Exports/
  requests: app/Http/Requests/
  resources: app/Http/Resources/
  migrations: database/migrations/
  seeders: database/seeders/
  routes: routes/api.php
  pdf_views: resources/views/pdf/
  config: config/erp.php

frontend:
  root: /frontend
  components: src/components/
  pages: src/pages/
  hooks: src/hooks/
  types: src/types/
  lib: src/lib/
  app: src/app/
```

### 10.2 Key Patterns

```yaml
backend:
  auth: "Laravel Sanctum SPA auth (cookie-based, not token-based)"
  middleware: "auth:sanctum for all protected routes, EnsureIsAdmin for admin-only"
  policies: "Laravel Policies for model-level authorization (InvoicePolicy, ProductPolicy, etc.)"
  resources: "Separate Resource classes for admin vs salesman response shapes"
  services: "Business logic in Service classes (InvoiceService, StockService), not controllers"
  events_listeners: "Event-driven: InvoiceCreated event triggers listeners for stock, AP, activity"
  transactions: "DB::transaction() for all multi-table writes"
  queue: "Redis queue for PDF/Excel generation, backup jobs"
  validation: "Form Request classes for input validation"
  cache: "Redis cache with tag-based invalidation where supported"

frontend:
  auth: "useAuth hook + React Context for auth state"
  data_fetching: "TanStack Query (useQuery, useMutation) for all API calls"
  forms: "React Hook Form + Zod schema validation"
  routing: "React Router v7 with role-based route guards"
  ui: "shadcn/ui components (installed via CLI, not manual copy)"
  state: "Server state via React Query; minimal client state"
  api: "Axios instance with base URL, auth interceptors, error handling"
```

### 10.3 Laravel Route Structure (routes/api.php)

```php
// Auth (public)
Route::post('/auth/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::put('/auth/password', [AuthController::class, 'updatePassword']);

    // Admin only
    Route::middleware('admin')->group(function () {
        Route::apiResource('users', UserController::class);
        Route::apiResource('suppliers', SupplierController::class);
        Route::get('/suppliers/all', [SupplierController::class, 'all']);
        Route::get('/stock-movements', [StockMovementController::class, 'index']);
        Route::get('/stock-movements/{id}', [StockMovementController::class, 'show']);
        Route::get('/payments', [PaymentController::class, 'index']);
        Route::apiResource('accounts-payable', AccountsPayableController::class)->except(['store', 'destroy']);
        Route::post('/accounts-payable/{id}/record-payment', [AccountsPayableController::class, 'recordPayment']);
        Route::get('/activity-logs', [ActivityLogController::class, 'index']);
        Route::get('/settings', [SettingsController::class, 'index']);
        Route::put('/settings', [SettingsController::class, 'update']);
        Route::prefix('reports')->group(function () {
            Route::get('/daily-sales', [ReportController::class, 'dailySales']);
            Route::get('/monthly-sales', [ReportController::class, 'monthlySales']);
            Route::get('/sales-by-salesman', [ReportController::class, 'salesBySalesman']);
            Route::get('/top-selling-items', [ReportController::class, 'topSellingItems']);
            Route::get('/current-stock', [ReportController::class, 'currentStock']);
            Route::get('/low-stock-items', [ReportController::class, 'lowStockItems']);
            Route::get('/stock-movement', [ReportController::class, 'stockMovement']);
            Route::get('/revenue-summary', [ReportController::class, 'revenueSummary']);
            Route::get('/pending-payments', [ReportController::class, 'pendingPayments']);
            Route::get('/{reportType}/download', [ReportController::class, 'download']);
        });
        Route::get('/dashboard/admin', [DashboardController::class, 'admin']);
    });

    // All authenticated users
    Route::apiResource('categories', CategoryController::class);
    Route::get('/categories/all', [CategoryController::class, 'all']);
    Route::apiResource('products', ProductController::class)->except(['store', 'update', 'destroy']);
    Route::post('/products', [ProductController::class, 'store'])->middleware('admin');
    Route::put('/products/{id}', [ProductController::class, 'update'])->middleware('admin');
    Route::delete('/products/{id}', [ProductController::class, 'destroy'])->middleware('admin');
    Route::post('/products/{id}/stock-adjust', [ProductController::class, 'stockAdjust'])->middleware('admin');
    Route::get('/products/low-stock', [ProductController::class, 'lowStock'])->middleware('admin');
    Route::get('/products/search', [ProductController::class, 'search']);
    Route::apiResource('customers', CustomerController::class)->except(['destroy']);
    Route::get('/customers/search', [CustomerController::class, 'search']);
    Route::apiResource('invoices', InvoiceController::class);
    Route::post('/invoices/{id}/confirm', [InvoiceController::class, 'confirm']);
    Route::post('/invoices/{id}/cancel', [InvoiceController::class, 'cancel'])->middleware('admin');
    Route::get('/invoices/{id}/pdf', [InvoiceController::class, 'pdf']);
    Route::post('/invoices/{id}/payments', [PaymentController::class, 'store']);
    Route::get('/invoices/next-number', [InvoiceController::class, 'nextNumber']);
    Route::apiResource('quotations', QuotationController::class);
    Route::post('/quotations/{id}/convert', [QuotationController::class, 'convert']);
    Route::post('/quotations/{id}/mark-sent', [QuotationController::class, 'markSent']);
    Route::get('/quotations/{id}/pdf', [QuotationController::class, 'pdf']);
    Route::get('/quotations/next-number', [QuotationController::class, 'nextNumber']);
    Route::get('/dashboard/salesman', [DashboardController::class, 'salesman']);
});
```

### 10.4 VAT Calculation Logic

```php
// Per line item calculation (in InvoiceService / QuotationService)
$lineTotal = $quantity * $unitPrice;
$vatAmount = $isVatApplicable ? $lineTotal * (config('erp.vat_rate') / 100) : 0;
$lineGrandTotal = $lineTotal + $vatAmount;

// Invoice totals
$subTotal = $invoiceItems->sum('line_total');    // Sum of line_totals
$vatTotal = $invoiceItems->sum('vat_amount');     // Sum of vat_amounts
$grandTotal = $subTotal + $vatTotal;
```

### 10.5 Sequential Number Generation

```php
// Use database-level atomic counter (in a DB transaction)
$prefix = config('erp.invoice_prefix'); // 'INV'
$lastNumber = Invoice::withTrashed()
    ->where('invoice_number', 'LIKE', $prefix . '-%')
    ->orderBy('id', 'desc')
    ->value('invoice_number');
$nextSeq = $lastNumber
    ? (int) substr($lastNumber, strlen($prefix) + 1) + 1
    : 1;
$invoiceNumber = $prefix . '-' . str_pad($nextSeq, 6, '0', STR_PAD_LEFT);
```

### 10.6 Key Event/Listener Bindings

```php
// App\Providers\EventServiceProvider
protected $listen = [
    InvoiceCreated::class => [
        DeductStockOnInvoice::class,
        CreateAccountsPayableOnAccount::class,
        LogActivity::class,
    ],
    InvoiceCancelled::class => [
        RestoreStockOnCancel::class,
        LogActivity::class,
    ],
    LowStockDetected::class => [
        SendLowStockNotification::class,
    ],
    QuotationConverted::class => [
        LogActivity::class,
    ],
];
```

---

## 11. Risks & Mitigation

### Risk 1: Concurrent Invoice Number Generation

```yaml
likelihood: medium
impact: high (duplicate numbers)
mitigation: Generate number inside DB transaction with SELECT FOR UPDATE or use dedicated counter table with row-level locking
```

### Risk 2: Stock Overselling

```yaml
likelihood: medium
impact: high (negative stock)
mitigation: Stock validation inside DB transaction before deduction; FOR UPDATE lock on product row during confirmation
```

### Risk 3: Redis SPOF

```yaml
likelihood: low
impact: high (sessions lost, cache down)
mitigation: Redis persistence enabled (AOF); fallback config for database sessions; monitor Redis uptime
```

### Risk 4: PDF/Excel Generation Timeout

```yaml
likelihood: low
impact: medium (user waits)
mitigation: Queue PDF/Excel generation as background jobs; show progress indicator; limit report date ranges
```

### Risk 5: Purchase Price Leak to Salesman

```yaml
likelihood: medium
impact: high (business info exposure)
mitigation: Separate Resource classes for admin vs salesman; automated tests verifying salesman API responses contain no purchase_price; middleware stripping fields
```

---

## 12. Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| 1 | Cloud hosting or local server deployment? | Client | Open |
| 2 | Company logo + branding assets for PDF invoices/quotes | Client | Open |
| 3 | Multiple admin users or single admin account? | Client | Open |
| 4 | Expense tracking in Phase 1 or deferred to Phase 2? | Client | Open |
| 5 | Preferred UI language? (English / Arabic / Bilingual?) | Client | Open |
| 6 | Customer vehicle details: structured (make/model/year) or free text? | Client | Open |
| 7 | Existing supplier records or categories to import? | Client | Open |
| 8 | Preferred PDF invoice template design | PM + Client | Open |
| 9 | Email notification provider for alerts (SMTP config)? | Client | Open |
| 10 | Daily backup: cloud storage location or local path? | Client | Open |

**Assumptions made**:
- Two roles only at launch: Admin and Salesman
- VAT rate fixed at 5%, per-item flag
- Single currency (no multi-currency)
- No external accounting integration in Phase 1
- No barcode scanning in Phase 1
- Single branch only in Phase 1
- Vehicle details: free text field (can migrate to structured later)
- Default language: English (Arabic support can be added via i18n)

---

## 13. Appendix

### 13.1 Invoice Number Format

```
INV-000001
 │   └── 6-digit zero-padded sequential number
 └── Configurable prefix (default: "INV")

Quotation: QT-000001 (prefix: "QT")
```

### 13.2 Payment Status State Machine

```
Invoice Payment Status:
  pending ──(full payment)──→ paid
  pending ──(partial payment)──→ partial
  partial ──(full balance)──→ paid
  pending ──(mark on_account)──→ on_account (+ AP record)
  on_account ──(payments)──→ partially_paid → settled

Invoice Status:
  draft ──(confirm)──→ confirmed
  confirmed ──(admin cancel)──→ cancelled
  (draft can also be cancelled by admin)
```

### 13.3 Quotation Status State Machine

```
draft ──(mark sent)──→ sent
sent ──(convert to invoice)──→ converted
sent ──(validity expires)──→ expired
draft ──(validity expires)──→ expired
```

### 13.4 Stock Movement Types

```
in:         Stock added (purchase, return from customer)
out:        Stock removed (invoice confirmed, sold)
adjustment: Manual correction by admin (requires reason)
```

### 13.5 Redis Key Patterns

```
dashboard:admin                    → Admin dashboard stats (hash)
dashboard:salesman:{user_id}       → Salesman dashboard stats (hash)
products:list:{query_hash}         → Paginated product list (hash)
products:detail:{id}              → Product detail (hash)
low_stock:items                    → Low stock item list (list)
customers:search:{query_hash}      → Customer search results (hash)
monthly:sales:{year}:{month}       → Monthly sales aggregation (hash)
settings                           → All settings (hash)
```

### 13.6 Environment Variables (.env.example)

```env
APP_NAME="Al Khanjry ERP"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=alkhanjry_erp
DB_USERNAME=root
DB_PASSWORD=

CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

SANCTUM_STATEFUL_DOMAINS=localhost:5173
SESSION_DOMAIN=localhost

FRONTEND_URL=http://localhost:5173

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null

ERP_VAT_RATE=5.00
ERP_INVOICE_PREFIX=INV
ERP_QUOTATION_PREFIX=QT
ERP_SESSION_LIFETIME=30
```

### 13.7 Phase 2 Features (Out of Scope)

```yaml
phase_2:
  - Expense tracking with categories and receipts
  - Profit & Loss report (revenue minus expenses)
  - External accounting integration (QuickBooks, Zoho Books)
  - Mobile app (native iOS/Android)
  - Barcode scanner integration
  - Multi-branch support
  - CRM module (customer loyalty, follow-ups)
  - WhatsApp/SMS invoice delivery
```

### 13.8 Changelog

```yaml
changelog:
  - date: 2026-04-20
    author: PRD Generation
    action: Initial comprehensive PRD created from client document
    version: 1.0
```