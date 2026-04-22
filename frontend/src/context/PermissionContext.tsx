import { createContext, useContext, useMemo } from "react";
import { useAuth } from "./AuthContext";
import type { Permission } from "../types/permissions";

const ADMIN_PERMISSIONS: Permission[] = [
  "view_dashboard","view_products","create_product","edit_product","delete_product",
  "view_stock_movements","create_stock_adjustment","view_invoices","create_invoice",
  "edit_invoice","view_invoice_detail","print_invoice","confirm_invoice","cancel_invoice","record_payment",
  "view_quotations","create_quotation","edit_quotation","view_quotation_detail","print_quotation",
  "convert_quotation","mark_quotation_sent","delete_quotation",
  "view_customers","create_customer","edit_customer","view_customer_detail",
  "view_payments","view_accounts_payable","view_reports","view_users","view_user_detail","create_user",
  "edit_user","view_categories","create_category","edit_category","view_suppliers",
  "view_supplier_detail","create_supplier","edit_supplier","view_activity_logs","view_settings",
];

const SALESMAN_PERMISSIONS: Permission[] = [
  "view_dashboard","view_products","view_invoices","create_invoice",
  "view_invoice_detail","print_invoice","view_quotations","create_quotation",
  "view_quotation_detail","print_quotation","mark_quotation_sent","delete_quotation",
  "view_customers","create_customer","view_customer_detail",
];

const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  admin: ADMIN_PERMISSIONS,
  salesman: SALESMAN_PERMISSIONS,
};

export interface PermissionContextValue {
  can: (...perms: Permission[]) => boolean;
  canAny: (...perms: Permission[]) => boolean;
  permissions: Permission[];
  isBackend: boolean;
}

const PermissionContext = createContext<PermissionContextValue | undefined>(undefined);

export function PermissionProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const value = useMemo(() => {
    if (user?.permissions) {
      const perms = user.permissions as Permission[];
      const set = new Set(perms);
      return { permissions: perms, isBackend: true, can: (...p: Permission[]) => p.every((x) => set.has(x)), canAny: (...p: Permission[]) => p.some((x) => set.has(x)) };
    }
    const perms = user ? ROLE_PERMISSIONS[user.role] ?? [] : [];
    const set = new Set(perms);
    return { permissions: perms, isBackend: false, can: (...p: Permission[]) => p.every((x) => set.has(x)), canAny: (...p: Permission[]) => p.some((x) => set.has(x)) };
  }, [user]);

  return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>;
}

export function usePermission() {
  const ctx = useContext(PermissionContext);
  if (!ctx) throw new Error("usePermission must be within PermissionProvider");
  return ctx;
}
