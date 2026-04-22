import { Navigate } from "react-router";
import { usePermission } from "../../context/PermissionContext";
import type { Permission } from "../../types/permissions";

interface PermissionGuardProps {
  allowed: Permission[];
  requireAll?: boolean;
  redirectTo?: string;
  children: React.ReactNode;
}

export default function PermissionGuard({
  allowed,
  requireAll = true,
  redirectTo = "/",
  children,
}: PermissionGuardProps) {
  const { can, canAny } = usePermission();
  const hasAccess = requireAll ? can(...allowed) : canAny(...allowed);

  if (!hasAccess) return <Navigate to={redirectTo} replace />;
  return <>{children}</>;
}

export function Can({
  perms,
  children,
  fallback = null,
}: {
  perms: Permission[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { can } = usePermission();
  return can(...perms) ? <>{children}</> : <>{fallback}</>;
}

export function CanAny({
  perms,
  children,
  fallback = null,
}: {
  perms: Permission[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { canAny } = usePermission();
  return canAny(...perms) ? <>{children}</> : <>{fallback}</>;
}
