import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Badge from "../../components/ui/badge/Badge";
import Input from "../../components/form/input/InputField";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableWrapper,
} from "../../components/ui/table";

const dummyLogs = [
  { id: 1, user: "Admin", action: "create", model: "Invoice", model_id: 145, description: "Created invoice INV-000145", date: "2026-04-21 10:30:45", ip: "192.168.1.10" },
  { id: 2, user: "Mohammed", action: "create", model: "Invoice", model_id: 144, description: "Created invoice INV-000144", date: "2026-04-21 10:15:22", ip: "192.168.1.11" },
  { id: 3, user: "Mohammed", action: "confirm", model: "Invoice", model_id: 144, description: "Confirmed invoice INV-000144", date: "2026-04-21 10:20:05", ip: "192.168.1.11" },
  { id: 4, user: "Admin", action: "create", model: "Product", model_id: 12, description: "Added new product: Air Filter HEPA", date: "2026-04-21 09:00:15", ip: "192.168.1.10" },
  { id: 5, user: "Admin", action: "adjust", model: "StockMovement", model_id: 6, description: "Stock adjustment for Air Filter HEPA", date: "2026-04-19 14:30:00", ip: "192.168.1.10" },
  { id: 6, user: "Ahmed", action: "create", model: "Quotation", model_id: 42, description: "Created quotation QT-000042", date: "2026-04-21 08:45:00", ip: "192.168.1.12" },
  { id: 7, user: "Mohammed", action: "payment", model: "Payment", model_id: 4, description: "Recorded payment for INV-000144", date: "2026-04-19 15:00:00", ip: "192.168.1.11" },
  { id: 8, user: "Admin", action: "cancel", model: "Invoice", model_id: 141, description: "Cancelled invoice INV-000141", date: "2026-04-19 11:30:00", ip: "192.168.1.10" },
  { id: 9, user: "Admin", action: "login", model: "User", model_id: 1, description: "Admin logged in", date: "2026-04-21 08:00:00", ip: "192.168.1.10" },
  { id: 10, user: "Mohammed", action: "login", model: "User", model_id: 2, description: "Mohammed logged in", date: "2026-04-21 08:15:00", ip: "192.168.1.11" },
];

const getActionBadge = (a: string) => ({
  create: { color: "success" as const, text: "Create" },
  update: { color: "primary" as const, text: "Update" },
  delete: { color: "error" as const, text: "Delete" },
  confirm: { color: "success" as const, text: "Confirm" },
  cancel: { color: "error" as const, text: "Cancel" },
  adjust: { color: "warning" as const, text: "Adjust" },
  login: { color: "info" as const, text: "Login" },
  logout: { color: "light" as const, text: "Logout" },
  payment: { color: "success" as const, text: "Payment" },
}[a] || { color: "light" as const, text: a });

export default function ActivityLogsPage() {
  const [search, setSearch] = useState("");

  const filtered = dummyLogs.filter((l) =>
    l.user.toLowerCase().includes(search.toLowerCase()) ||
    l.description.toLowerCase().includes(search.toLowerCase()) ||
    l.action.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <PageBreadcrumb pageTitle="Activity Logs" items={[{ label: "System" }, { label: "Activity Logs" }]} />
      <ComponentCard title="Audit Trail">
        <Input
          placeholder="Search logs by user, action, or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 sm:max-w-xs"
        />
        <TableWrapper>
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Date</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">User</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Action</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Entity</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Description</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">IP Address</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{l.date}</TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{l.user}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start"><Badge size="sm" color={getActionBadge(l.action).color}>{getActionBadge(l.action).text}</Badge></TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{l.model} #{l.model_id}</TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{l.description}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{l.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableWrapper>
      </ComponentCard>
    </>
  );
}
