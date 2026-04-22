import { useParams } from "react-router";
import useRoutePrefix from "../../hooks/useRoutePrefix";
import useLoading from "../../hooks/useLoading";
import PageSkeleton from "../../components/ui/skeleton/PageSkeleton";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Badge from "../../components/ui/badge/Badge";

const dummyUsers = [
  { id: 1, name: "Admin User", username: "admin", email: "admin@alkhanjry.com", phone: "+968 9123 4567", role: "admin", is_active: true, created_at: "2026-01-01", last_login: "2026-04-21 09:30" },
  { id: 2, name: "Mohammed Omar", username: "mohammed", email: "mohammed@alkhanjry.com", phone: "+968 9234 5678", role: "salesman", is_active: true, created_at: "2026-02-15", last_login: "2026-04-21 08:15" },
  { id: 3, name: "Ahmed Khalid", username: "ahmed", email: "ahmed@alkhanjry.com", phone: "+968 9345 6789", role: "salesman", is_active: true, created_at: "2026-03-01", last_login: "2026-04-20 17:45" },
  { id: 4, name: "Salim Hamed", username: "salim", email: "salim@alkhanjry.com", phone: "+968 9456 7890", role: "salesman", is_active: false, created_at: "2026-01-20", last_login: "2026-04-15 14:20" },
];

export default function UserDetailPage() {
  const prefix = useRoutePrefix();
  const { id } = useParams();
  const isLoading = useLoading([id]);
  const user = dummyUsers.find((u) => u.id === Number(id)) ?? dummyUsers[0];

  if (isLoading) return <PageSkeleton />;

  return (
    <>
      <PageBreadcrumb
        pageTitle={`${user.name}`}
        items={[{ label: "Settings" }, { label: "Users", href: `${prefix}/users` }, { label: user.name }]}
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 lg:col-span-8">
          <ComponentCard title="User Information">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{user.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Username</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{user.username}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{user.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{user.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Role</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90"><Badge size="sm" color={user.role === "admin" ? "primary" : "light"}>{user.role === "admin" ? "Admin" : "Salesman"}</Badge></p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90"><Badge size="sm" color={user.is_active ? "success" : "error"}>{user.is_active ? "Active" : "Inactive"}</Badge></p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Created At</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{user.created_at}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Last Login</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{user.last_login}</p>
              </div>
            </div>
          </ComponentCard>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <ComponentCard title="Activity Summary">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Account Age</p>
                <p className="text-lg font-medium text-gray-800 dark:text-white/90">3 months</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Invoices Created</p>
                <p className="text-lg font-medium text-gray-800 dark:text-white/90">{user.role === "admin" ? "N/A" : "45"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Quotations Created</p>
                <p className="text-lg font-medium text-gray-800 dark:text-white/90">{user.role === "admin" ? "N/A" : "38"}</p>
              </div>
            </div>
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
