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

const dummyPayments = [
  { id: 1, invoice: "INV-000145", customer: "Ali Hassan", amount: 1250.0, method: "cash", date: "2026-04-21", recorded_by: "Admin" },
  { id: 2, invoice: "INV-000142", customer: "Rashid Transport", amount: 2100.0, method: "transfer", date: "2026-04-20", recorded_by: "Admin" },
  { id: 3, invoice: "INV-000140", customer: "Faizan Spares", amount: 900.0, method: "cash", date: "2026-04-19", recorded_by: "Mohammed" },
  { id: 4, invoice: "INV-000144", customer: "Mohammed Saeed", amount: 400.0, method: "cheque", date: "2026-04-19", recorded_by: "Mohammed" },
  { id: 5, invoice: "INV-000136", customer: "Quick Fix Auto", amount: 3450.0, method: "transfer", date: "2026-04-17", recorded_by: "Admin" },
];

const getMethodBadge = (m: string) => ({
  cash: { color: "success" as const, text: "Cash" },
  card: { color: "primary" as const, text: "Card" },
  transfer: { color: "info" as const, text: "Transfer" },
  cheque: { color: "warning" as const, text: "Cheque" },
}[m] || { color: "light" as const, text: m });

export default function PaymentsPage() {
  const [search, setSearch] = useState("");

  const filtered = dummyPayments.filter((p) =>
    p.invoice.toLowerCase().includes(search.toLowerCase()) ||
    p.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <PageBreadcrumb pageTitle="Payments" items={[{ label: "Finance" }, { label: "Payments" }]} />
      <ComponentCard title="Payment Records">
        <Input
          placeholder="Search by invoice or customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 sm:max-w-xs"
        />
        <TableWrapper>
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Invoice</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Customer</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Amount</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Method</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Date</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Recorded By</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-brand-500 text-theme-sm">{p.invoice}</span>
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{p.customer}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{p.amount.toFixed(2)} AED</TableCell>
                  <TableCell className="px-4 py-3 text-start"><Badge size="sm" color={getMethodBadge(p.method).color}>{getMethodBadge(p.method).text}</Badge></TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{p.date}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{p.recorded_by}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableWrapper>
      </ComponentCard>
    </>
  );
}
