import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { useAuth } from "./context/AuthContext";
import type { ReactNode } from "react";

// Pages
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProductsPage from "./pages/products/ProductsPage";
import ProductFormPage from "./pages/products/ProductFormPage";
import ProductEditPage from "./pages/products/ProductEditPage";
import ProductDetailPage from "./pages/products/ProductDetailPage";
import InvoicesPage from "./pages/invoices/InvoicesPage";
import InvoiceFormPage from "./pages/invoices/InvoiceFormPage";
import InvoiceDetailPage from "./pages/invoices/InvoiceDetailPage";
import QuotationListPage from "./pages/quotations/QuotationListPage";
import QuotationFormPage from "./pages/quotations/QuotationFormPage";
import QuotationDetailPage from "./pages/quotations/QuotationDetailPage";
import CustomersPage from "./pages/customers/CustomersPage";
import CustomerFormPage from "./pages/customers/CustomerFormPage";
import CustomerEditPage from "./pages/customers/CustomerEditPage";
import CustomerDetailPage from "./pages/customers/CustomerDetailPage";
import PaymentsPage from "./pages/payments/PaymentsPage";
import AccountsPayablePage from "./pages/payments/AccountsPayablePage";
import ReportsPage from "./pages/reports/ReportsPage";
import UsersPage from "./pages/users/UsersPage";
import UserFormPage from "./pages/users/UserFormPage";
import UserDetailPage from "./pages/users/UserDetailPage";
import UserEditPage from "./pages/users/UserEditPage";
import SupplierDetailPage from "./pages/suppliers/SupplierDetailPage";
import CategoriesPage from "./pages/categories/CategoriesPage";
import CategoryFormPage from "./pages/categories/CategoryFormPage";
import CategoryEditPage from "./pages/categories/CategoryEditPage";
import SuppliersPage from "./pages/suppliers/SuppliersPage";
import SupplierFormPage from "./pages/suppliers/SupplierFormPage";
import SupplierEditPage from "./pages/suppliers/SupplierEditPage";
import StockMovementsPage from "./pages/stock/StockMovementsPage";
import StockAdjustmentPage from "./pages/stock/StockAdjustmentPage";
import ActivityLogsPage from "./pages/logs/ActivityLogsPage";
import SettingsPage from "./pages/settings/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import InvoiceEditPage from "./pages/invoices/InvoiceEditPage";
import InvoicePrintPage from "./pages/invoices/InvoicePrintPage";
import QuotationEditPage from "./pages/quotations/QuotationEditPage";
import QuotationPrintPage from "./pages/quotations/QuotationPrintPage";
import PermissionGuard from "./components/permission/PermissionGuard";

// TEMP: bypass auth to open dashboard directly for design review
const BYPASS_AUTH = true;

/* ───── Auth gate ───── */
interface ProtectedRouteProps { children: ReactNode; }
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (BYPASS_AUTH) return <>{children}</>;
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

/* ───── Permission wrappers (convenience) ───── */
const P = PermissionGuard; // alias

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected + Layout */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/" element={<DashboardPage />} />

          {/* ━━━━━━━━━━━━━━ S H A R E D ━━━━━━━━━━━━━━
             Both /admin/* and /salesman/* mount the same components.
             PermissionGuard decides access.                       */}

          {/* --- Products --- */}
          <Route path="/admin/products" element={<P allowed={["view_products"]}><ProductsPage /></P>} />
          <Route path="/admin/products/new" element={<P allowed={["create_product"]}><ProductFormPage /></P>} />
          <Route path="/admin/products/:id" element={<P allowed={["view_products"]}><ProductDetailPage /></P>} />
          <Route path="/admin/products/:id/edit" element={<P allowed={["edit_product"]}><ProductEditPage /></P>} />

          <Route path="/salesman/products" element={<P allowed={["view_products"]}><ProductsPage /></P>} />
          <Route path="/salesman/products/:id" element={<P allowed={["view_products"]}><ProductDetailPage /></P>} />

          {/* --- Invoices --- */}
          <Route path="/admin/invoices" element={<P allowed={["view_invoices"]}><InvoicesPage /></P>} />
          <Route path="/admin/invoices/new" element={<P allowed={["create_invoice"]}><InvoiceFormPage /></P>} />
          <Route path="/admin/invoices/:id" element={<P allowed={["view_invoice_detail"]}><InvoiceDetailPage /></P>} />
          <Route path="/admin/invoices/:id/print" element={<P allowed={["print_invoice"]}><InvoicePrintPage /></P>} />
          <Route path="/admin/invoices/:id/edit" element={<P allowed={["edit_invoice"]}><InvoiceEditPage /></P>} />

          <Route path="/salesman/invoices" element={<P allowed={["view_invoices"]}><InvoicesPage /></P>} />
          <Route path="/salesman/invoices/new" element={<P allowed={["create_invoice"]}><InvoiceFormPage /></P>} />
          <Route path="/salesman/invoices/:id" element={<P allowed={["view_invoice_detail"]}><InvoiceDetailPage /></P>} />
          <Route path="/salesman/invoices/:id/print" element={<P allowed={["print_invoice"]}><InvoicePrintPage /></P>} />

          {/* --- Quotations --- */}
          <Route path="/admin/quotations" element={<P allowed={["view_quotations"]}><QuotationListPage /></P>} />
          <Route path="/admin/quotations/new" element={<P allowed={["create_quotation"]}><QuotationFormPage /></P>} />
          <Route path="/admin/quotations/:id" element={<P allowed={["view_quotation_detail"]}><QuotationDetailPage /></P>} />
          <Route path="/admin/quotations/:id/print" element={<P allowed={["print_quotation"]}><QuotationPrintPage /></P>} />
          <Route path="/admin/quotations/:id/edit" element={<P allowed={["edit_quotation"]}><QuotationEditPage /></P>} />

          <Route path="/salesman/quotations" element={<P allowed={["view_quotations"]}><QuotationListPage /></P>} />
          <Route path="/salesman/quotations/new" element={<P allowed={["create_quotation"]}><QuotationFormPage /></P>} />
          <Route path="/salesman/quotations/:id" element={<P allowed={["view_quotation_detail"]}><QuotationDetailPage /></P>} />
          <Route path="/salesman/quotations/:id/print" element={<P allowed={["print_quotation"]}><QuotationPrintPage /></P>} />

          {/* --- Customers --- */}
          <Route path="/admin/customers" element={<P allowed={["view_customers"]}><CustomersPage /></P>} />
          <Route path="/admin/customers/new" element={<P allowed={["create_customer"]}><CustomerFormPage /></P>} />
          <Route path="/admin/customers/:id" element={<P allowed={["view_customer_detail"]}><CustomerDetailPage /></P>} />
          <Route path="/admin/customers/:id/edit" element={<P allowed={["edit_customer"]}><CustomerEditPage /></P>} />

          <Route path="/salesman/customers" element={<P allowed={["view_customers"]}><CustomersPage /></P>} />
          <Route path="/salesman/customers/new" element={<P allowed={["create_customer"]}><CustomerFormPage /></P>} />
          <Route path="/salesman/customers/:id" element={<P allowed={["view_customer_detail"]}><CustomerDetailPage /></P>} />

          {/* ━━━━━━━━━━━━━━ A D M I N   O N L Y ━━━━━━━━━━━━━━ */}

          {/* Payments */}
          <Route path="/admin/payments" element={<P allowed={["view_payments"]}><PaymentsPage /></P>} />
          <Route path="/admin/accounts-payable" element={<P allowed={["view_accounts_payable"]}><AccountsPayablePage /></P>} />

          {/* Reports */}
          <Route path="/admin/reports/*" element={<P allowed={["view_reports"]}><ReportsPage /></P>} />

          {/* Users */}
          <Route path="/admin/users" element={<P allowed={["view_users"]}><UsersPage /></P>} />
          <Route path="/admin/users/new" element={<P allowed={["create_user"]}><UserFormPage /></P>} />
          <Route path="/admin/users/:id" element={<P allowed={["view_user_detail"]}><UserDetailPage /></P>} />
          <Route path="/admin/users/:id/edit" element={<P allowed={["edit_user"]}><UserEditPage /></P>} />

          {/* Categories */}
          <Route path="/admin/categories" element={<P allowed={["view_categories"]}><CategoriesPage /></P>} />
          <Route path="/admin/categories/new" element={<P allowed={["create_category"]}><CategoryFormPage /></P>} />
          <Route path="/admin/categories/:id/edit" element={<P allowed={["edit_category"]}><CategoryEditPage /></P>} />

          {/* Suppliers */}
          <Route path="/admin/suppliers" element={<P allowed={["view_suppliers"]}><SuppliersPage /></P>} />
          <Route path="/admin/suppliers/new" element={<P allowed={["create_supplier"]}><SupplierFormPage /></P>} />
          <Route path="/admin/suppliers/:id" element={<P allowed={["view_supplier_detail"]}><SupplierDetailPage /></P>} />
          <Route path="/admin/suppliers/:id/edit" element={<P allowed={["edit_supplier"]}><SupplierEditPage /></P>} />

          {/* Stock */}
          <Route path="/admin/stock-movements" element={<P allowed={["view_stock_movements"]}><StockMovementsPage /></P>} />
          <Route path="/admin/stock-adjustment" element={<P allowed={["create_stock_adjustment"]}><StockAdjustmentPage /></P>} />

          {/* Logs / Settings */}
          <Route path="/admin/activity-logs" element={<P allowed={["view_activity_logs"]}><ActivityLogsPage /></P>} />
          <Route path="/admin/settings" element={<P allowed={["view_settings"]}><SettingsPage /></P>} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
