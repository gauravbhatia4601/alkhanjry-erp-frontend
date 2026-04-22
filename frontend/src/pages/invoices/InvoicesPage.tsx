import { useState } from "react";
import { Link, useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import Badge from "../../components/ui/badge/Badge";
import Input from "../../components/form/input/InputField";
import Pagination from "../../components/ui/pagination/Pagination";
import ConfirmModal from "../../components/ui/confirm-modal/ConfirmModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableWrapper,
} from "../../components/ui/table";
import { PlusIcon, TrashBinIcon, PencilIcon } from "../../icons";
import useRoutePrefix from "../../hooks/useRoutePrefix";

const dummyInvoices = [
  { id: 1, invoice_number: "INV-000145", date: "2026-04-21", customer: "Ali Hassan", salesman: "Mohammed", grand_total: 1250.0, status: "confirmed", payment_status: "paid" },
  { id: 2, invoice_number: "INV-000144", date: "2026-04-21", customer: "Mohammed Saeed", salesman: "Mohammed", grand_total: 845.0, status: "confirmed", payment_status: "partial" },
  { id: 3, invoice_number: "INV-000143", date: "2026-04-20", customer: "Salem Al-Balushi", salesman: "Ahmed", grand_total: 3400.0, status: "confirmed", payment_status: "on_account" },
  { id: 4, invoice_number: "INV-000142", date: "2026-04-20", customer: "Rashid Transport", salesman: "Mohammed", grand_total: 2100.0, status: "confirmed", payment_status: "paid" },
  { id: 5, invoice_number: "INV-000141", date: "2026-04-19", customer: "Khalid Motors", salesman: "Ahmed", grand_total: 1750.0, status: "cancelled", payment_status: "pending" },
  { id: 6, invoice_number: "INV-000140", date: "2026-04-19", customer: "Faizan Spares", salesman: "Mohammed", grand_total: 900.0, status: "confirmed", payment_status: "paid" },
  { id: 7, invoice_number: "INV-000139", date: "2026-04-18", customer: "Al Amal Garage", salesman: "Ahmed", grand_total: 4500.0, status: "confirmed", payment_status: "partial" },
  { id: 8, invoice_number: "INV-000138", date: "2026-04-18", customer: "Oman Trucks LLC", salesman: "Mohammed", grand_total: 6750.0, status: "confirmed", payment_status: "on_account" },
  { id: 9, invoice_number: "INV-000137", date: "2026-04-17", customer: "Salim Trading", salesman: "Ahmed", grand_total: 1200.0, status: "draft", payment_status: "pending" },
  { id: 10, invoice_number: "INV-000136", date: "2026-04-17", customer: "Quick Fix Auto", salesman: "Mohammed", grand_total: 3450.0, status: "confirmed", payment_status: "paid" },
];

const getPaymentBadge = (s: string) => ({
  paid: { color: "success" as const, text: "Paid" },
  partial: { color: "warning" as const, text: "Partial" },
  on_account: { color: "primary" as const, text: "On Account" },
  pending: { color: "error" as const, text: "Pending" },
}[s] || { color: "light" as const, text: s });

const getStatusBadge = (s: string) => ({
  confirmed: { color: "success" as const, text: "Confirmed" },
  cancelled: { color: "error" as const, text: "Cancelled" },
  draft: { color: "warning" as const, text: "Draft" },
}[s] || { color: "light" as const, text: s });

export default function InvoicesPage() {
  const prefix = useRoutePrefix();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(null);
  const itemsPerPage = 5;

  const filtered = dummyInvoices.filter((i) => {
    const matchSearch = i.invoice_number.toLowerCase().includes(search.toLowerCase()) || i.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || i.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openDeleteModal = (id: number) => {
    setSelectedInvoiceId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    console.log("Deleting invoice", selectedInvoiceId);
    setDeleteModalOpen(false);
    setSelectedInvoiceId(null);
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Invoices" items={[{ label: "Sales" }, { label: "Invoices" }]} />

      <ComponentCard
        title="Invoice List"
        action={
          <Button size="sm" onClick={() => navigate(`${prefix}/invoices/new`)}>
            <PlusIcon className="w-4 h-4" />
            New Invoice
          </Button>
        }
      >
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Input
            placeholder="Search by invoice number or customer..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="sm:max-w-xs"
          />
          <select
            className="h-11 rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 sm:max-w-xs"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <TableWrapper>
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Invoice #</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Date</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Customer</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Salesman</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Total</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Status</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Payment</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {paginated.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <Link to={`${prefix}/invoices/${inv.id}`} className="block font-medium text-brand-500 text-theme-sm hover:underline">{inv.invoice_number}</Link>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{inv.date}</TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{inv.customer}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{inv.salesman}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{inv.grand_total.toFixed(2)} AED</TableCell>
                  <TableCell className="px-4 py-3 text-start"><Badge size="sm" color={getStatusBadge(inv.status).color}>{getStatusBadge(inv.status).text}</Badge></TableCell>
                  <TableCell className="px-4 py-3 text-start"><Badge size="sm" color={getPaymentBadge(inv.payment_status).color}>{getPaymentBadge(inv.payment_status).text}</Badge></TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`${prefix}/invoices/${inv.id}`)}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-brand-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400 transition-colors"
                        title="View"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => navigate(`${prefix}/invoices/${inv.id}/edit`)}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-brand-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400 transition-colors"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(inv.id)}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-error-50 hover:text-error-500 dark:text-gray-400 dark:hover:bg-error-500/15 dark:hover:text-error-400 transition-colors"
                        title="Delete"
                      >
                        <TrashBinIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </ComponentCard>

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Invoice"
        message="Are you sure you want to delete this invoice? This action cannot be undone and will affect inventory records and financial totals."
      />
    </>
  );
}
