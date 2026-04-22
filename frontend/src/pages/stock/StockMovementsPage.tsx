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

const dummyMovements = [
  { id: 1, product: "Brake Pad Toyota Hilux", type: "in", quantity: 20, previous: 3, new: 23, reason: "Purchase from Gulf Auto Parts", user: "Admin", date: "2026-04-21 10:30" },
  { id: 2, product: "Engine Oil Filter", type: "in", quantity: 30, previous: 5, new: 35, reason: "Purchase from Toyota", user: "Admin", date: "2026-04-21 09:15" },
  { id: 3, product: "Brake Pad Toyota Hilux", type: "out", quantity: 2, previous: 23, new: 21, reason: "Invoice INV-000145", user: "Mohammed", date: "2026-04-21 11:00" },
  { id: 4, product: "Spark Plug NGK", type: "out", quantity: 4, previous: 2, new: -2, reason: "Invoice INV-000144", user: "Mohammed", date: "2026-04-21 10:45" },
  { id: 5, product: "Battery 12V 70Ah", type: "in", quantity: 10, previous: 18, new: 28, reason: "Purchase from Gulf Auto", user: "Admin", date: "2026-04-20 16:00" },
  { id: 6, product: "Air Filter HEPA", type: "adjustment", quantity: 5, previous: 17, new: 22, reason: "Stock correction - found extra units", user: "Admin", date: "2026-04-19 14:30" },
  { id: 7, product: "Timing Belt", type: "out", quantity: 1, previous: 4, new: 3, reason: "Invoice INV-000140", user: "Ahmed", date: "2026-04-19 12:00" },
];

const getTypeBadge = (t: string) => ({
  in: { color: "success" as const, text: "Stock In" },
  out: { color: "error" as const, text: "Stock Out" },
  adjustment: { color: "warning" as const, text: "Adjustment" },
}[t] || { color: "light" as const, text: t });

export default function StockMovementsPage() {
  const [search, setSearch] = useState("");

  const filtered = dummyMovements.filter((m) =>
    m.product.toLowerCase().includes(search.toLowerCase()) ||
    m.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <PageBreadcrumb pageTitle="Stock Movements" items={[{ label: "Inventory" }, { label: "Stock Movements" }]} />
      <ComponentCard title="Stock Movement History">
        <Input
          placeholder="Search by product or user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 sm:max-w-xs"
        />
        <TableWrapper>
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Date</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Product</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Type</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Qty</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Previous</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">New</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Reason</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">User</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{m.date}</TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{m.product}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start"><Badge size="sm" color={getTypeBadge(m.type).color}>{getTypeBadge(m.type).text}</Badge></TableCell>
                  <TableCell className={`px-4 py-3 text-start font-medium text-theme-sm ${m.type === "in" ? "text-success-600" : m.type === "out" ? "text-error-600" : "text-warning-600"}`}>
                    {m.type === "in" ? "+" : m.type === "out" ? "-" : "±"}{m.quantity}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{m.previous}</TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{m.new}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{m.reason}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{m.user}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableWrapper>
      </ComponentCard>
    </>
  );
}
