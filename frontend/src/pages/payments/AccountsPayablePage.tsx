import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
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

const dummyAP = [
  { id: 1, invoice: "INV-000143", customer: "Salem Al-Balushi", total: 3400.0, paid: 0.0, outstanding: 3400.0, status: "open", due: "2026-05-20" },
  { id: 2, invoice: "INV-000144", customer: "Mohammed Saeed", total: 845.0, paid: 400.0, outstanding: 445.0, status: "partially_paid", due: "2026-05-21" },
  { id: 3, invoice: "INV-000139", customer: "Al Amal Garage", total: 4500.0, paid: 1000.0, outstanding: 3500.0, status: "partially_paid", due: "2026-05-18" },
  { id: 4, invoice: "INV-000138", customer: "Oman Trucks LLC", total: 6750.0, paid: 0.0, outstanding: 6750.0, status: "open", due: "2026-05-18" },
  { id: 5, invoice: "INV-000137", customer: "Salim Trading", total: 1200.0, paid: 0.0, outstanding: 1200.0, status: "open", due: "2026-05-17" },
];

const getStatusBadge = (s: string) => ({
  open: { color: "error" as const, text: "Open" },
  partially_paid: { color: "warning" as const, text: "Partially Paid" },
  settled: { color: "success" as const, text: "Settled" },
}[s] || { color: "light" as const, text: s });

export default function AccountsPayablePage() {
  const [search, setSearch] = useState("");

  const filtered = dummyAP.filter((ap) =>
    ap.invoice.toLowerCase().includes(search.toLowerCase()) ||
    ap.customer.toLowerCase().includes(search.toLowerCase())
  );

  const totalOutstanding = dummyAP.reduce((sum, ap) => sum + ap.outstanding, 0);

  return (
    <>
      <PageBreadcrumb pageTitle="Accounts Payable" items={[{ label: "Finance" }, { label: "Accounts Payable" }]} />
      <div className="grid grid-cols-12 gap-4 md:gap-6 mb-6">
        <div className="col-span-12 sm:col-span-6">
          <ComponentCard title="Total Outstanding" className="h-full">
            <p className="text-3xl font-bold text-error-600">{totalOutstanding.toFixed(2)} AED</p>
            <p className="text-sm text-gray-500 mt-1">{dummyAP.filter(a => a.status !== "settled").length} active accounts</p>
          </ComponentCard>
        </div>
        <div className="col-span-12 sm:col-span-6">
          <ComponentCard title="Total Paid" className="h-full">
            <p className="text-3xl font-bold text-success-600">{dummyAP.reduce((s, a) => s + a.paid, 0).toFixed(2)} AED</p>
            <p className="text-sm text-gray-500 mt-1">Payments received to date</p>
          </ComponentCard>
        </div>
      </div>
      <ComponentCard title="Accounts Payable List">
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
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Total</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Paid</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Outstanding</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Due Date</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Status</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((ap) => (
                <TableRow key={ap.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-brand-500 text-theme-sm">{ap.invoice}</span>
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{ap.customer}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{ap.total.toFixed(2)}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{ap.paid.toFixed(2)}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{ap.outstanding.toFixed(2)}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{ap.due}</TableCell>
                  <TableCell className="px-4 py-3 text-start"><Badge size="sm" color={getStatusBadge(ap.status).color}>{getStatusBadge(ap.status).text}</Badge></TableCell>
                  <TableCell className="px-4 py-3 text-start"><Button size="sm" variant="outline">Record Payment</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableWrapper>
      </ComponentCard>
    </>
  );
}
