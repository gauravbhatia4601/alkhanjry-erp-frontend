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
import { PlusIcon, TrashBinIcon } from "../../icons";
import useRoutePrefix from "../../hooks/useRoutePrefix";

const dummyQuotations = [
  { id: 1, quotation_number: "QT-000042", date: "2026-04-21", customer: "Ali Hassan", validity: "2026-04-28", grand_total: 1250.0, status: "draft" },
  { id: 2, quotation_number: "QT-000041", date: "2026-04-20", customer: "Mohammed Saeed", validity: "2026-04-27", grand_total: 2100.0, status: "sent" },
  { id: 3, quotation_number: "QT-000040", date: "2026-04-19", customer: "Salem Al-Balushi", validity: "2026-04-26", grand_total: 4500.0, status: "converted" },
  { id: 4, quotation_number: "QT-000039", date: "2026-04-18", customer: "Rashid Transport", validity: "2026-04-25", grand_total: 1800.0, status: "sent" },
  { id: 5, quotation_number: "QT-000038", date: "2026-04-17", customer: "Khalid Motors", validity: "2026-04-24", grand_total: 950.0, status: "expired" },
  { id: 6, quotation_number: "QT-000037", date: "2026-04-16", customer: "Faizan Spares", validity: "2026-04-23", grand_total: 3400.0, status: "draft" },
  { id: 7, quotation_number: "QT-000036", date: "2026-04-15", customer: "Al Amal Garage", validity: "2026-04-22", grand_total: 6700.0, status: "sent" },
];

const getStatusBadge = (s: string) => ({
  draft: { color: "light" as const, text: "Draft" },
  sent: { color: "info" as const, text: "Sent" },
  converted: { color: "success" as const, text: "Converted" },
  expired: { color: "error" as const, text: "Expired" },
}[s] || { color: "light" as const, text: s });

export default function QuotationListPage() {
  const prefix = useRoutePrefix();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedQuotationId, setSelectedQuotationId] = useState<number | null>(null);
  const itemsPerPage = 5;

  const filtered = dummyQuotations.filter((q) => {
    const matchSearch = q.quotation_number.toLowerCase().includes(search.toLowerCase()) || q.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || q.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openDeleteModal = (id: number) => {
    setSelectedQuotationId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    console.log("Deleting quotation", selectedQuotationId);
    setDeleteModalOpen(false);
    setSelectedQuotationId(null);
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Quotations" items={[{ label: "Sales" }, { label: "Quotations" }]} />
      <ComponentCard
        title="Quotation List"
        action={
          <Button size="sm" onClick={() => navigate(`${prefix}/quotations/new`)}>
            <PlusIcon className="w-4 h-4" />
            New Quotation
          </Button>
        }
      >
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Input
            placeholder="Search by quotation number or customer..."
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
            <option value="sent">Sent</option>
            <option value="converted">Converted</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        <TableWrapper>
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Quotation #</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Date</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Customer</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Valid Until</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Total</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Status</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {paginated.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <Link to={`${prefix}/quotations/${q.id}`} className="block font-medium text-brand-500 text-theme-sm hover:underline">{q.quotation_number}</Link>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{q.date}</TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{q.customer}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{q.validity}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{q.grand_total.toFixed(2)} AED</TableCell>
                  <TableCell className="px-4 py-3 text-start"><Badge size="sm" color={getStatusBadge(q.status).color}>{getStatusBadge(q.status).text}</Badge></TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`${prefix}/quotations/${q.id}`)}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-brand-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400 transition-colors"
                        title="View"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => navigate(`${prefix}/quotations/${q.id}/edit`)}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-brand-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => openDeleteModal(q.id)}
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
        title="Delete Quotation"
        message="Are you sure you want to delete this quotation? If it has been converted to an invoice, the invoice will remain but the quotation will be removed."
      />
    </>
  );
}
