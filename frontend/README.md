# Al Khanjry Spare Parts — ERP Frontend

React 19 + TypeScript + Vite + Tailwind CSS frontend for the Al Khanjry Spare Parts ERP system.

## Quick Start

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`. Auth is bypassed for development (`BYPASS_AUTH=true` in `AuthContext.tsx`).

## Tech Stack

| Technology | Version |
|------------|---------|
| React | 19 |
| TypeScript | 5.x |
| Vite | 6.x |
| Tailwind CSS | 4.x |
| React Router | v7 |
| Recharts | latest |

## Project Structure

```
src/
├── App.tsx                 # Routes (/admin/*, /salesman/*, permission guards)
├── main.tsx                # Entry point, wraps App in PermissionProvider
├── index.css               # Tailwind imports, A4 print styles
├── context/
│   ├── AuthContext.tsx       # BYPASS_AUTH, fetchWithCredentials, mock admin user
│   ├── PermissionContext.tsx # Role-based permission mapping, can()/canAny()
│   └── ToastContext.tsx    # Global toast notifications
├── pages/                  # Route pages — all under /admin/* or /salesman/*
│   ├── dashboard/
│   ├── invoices/           # List, Detail, Form, Edit, Print
│   ├── quotations/         # List, Detail, Form, Edit, Print
│   ├── products/           # List, Detail, Form, Edit
│   ├── customers/          # List, Detail, Form, Edit
│   ├── users/              # List, Detail, Form, Edit
│   ├── suppliers/          # List, Detail, Form, Edit
│   ├── stock/              # Movements, Adjustments
│   ├── payments/
│   ├── reports/
│   ├── categories/
│   ├── settings/
│   └── logs/
├── components/
│   ├── ui/                 # Buttons, badges, tables, modals, toasts, inputs, skeletons
│   ├── common/             # Breadcrumb, scroll-to-top
│   └── permission/         # PermissionGuard, Can/CanAny wrappers
├── hooks/
│   ├── useLoading.ts       # Skeleton delay hook
│   ├── useRoutePrefix.ts   # Detects /admin or /salesman from pathname
│   └── useSidebar.ts       # Sidebar collapse/expand state
├── layout/
│   ├── AppLayout.tsx       # Sidebar + Header + ToastContainer
│   ├── AppSidebar.tsx      # Permission-filtered nav with dropdowns
│   └── AppHeader.tsx
├── types/
│   └── permissions.ts      # Central Permission union type
└── icons/                  # Custom SVG icons imported as React components
```

## Auth & Permissions

- **Auth bypassed for dev**: `AuthContext.tsx` returns a mock admin user when `BYPASS_AUTH = true`.
- **Role-based routes**: `/admin/*` and `/salesman/*` share the same page components. `PermissionGuard` blocks access based on `allowed` permissions.
- **Dynamic links**: `useRoutePrefix()` reads `/admin/` or `/salesman/` from the current URL so all internal links work correctly in both contexts.

## Print Page Styles

`index.css` contains `@media print` and `@media screen` rules for A4 print previews in `InvoicePrintPage.tsx` and `QuotationPrintPage.tsx`.

## Key Features

- Role-based navigation with auto-open sidebar submenus
- Toast notifications (success / error / warning / info)
- Loading skeletons on every detail page
- Invoice lifecycle: confirm, cancel (with reason), record payment, print
- Quotation lifecycle: convert to invoice, mark sent, print, delete
- Product profit margins & stock movement history
- Customer detail with invoice KPIs and full history table
- Stock adjustment (admin-only) with conditional supplier fields
- Responsive layout with collapsible sidebar

## Build

```bash
npm run build
```

Output goes to `dist/`. No environment variables are required for development.
