import { useState } from "react";
import { Link, useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
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
import { PlusIcon, PencilIcon, TrashBinIcon } from "../../icons";
import useRoutePrefix from "../../hooks/useRoutePrefix";

const dummyCustomers = [
  { id: 1, name: "Ali Hassan", phone: "+968 9123 4567", email: "ali.hassan@email.com", vehicle_details: "Toyota Hilux 2020", total_invoices: 12, total_spent: 8450.0, outstanding: 0 },
  { id: 2, name: "Mohammed Saeed", phone: "+968 9234 5678", email: "", vehicle_details: "Nissan Patrol 2019", total_invoices: 8, total_spent: 5200.0, outstanding: 845.0 },
  { id: 3, name: "Salem Al-Balushi", phone: "+968 9345 6789", email: "salem@trading.om", vehicle_details: "Mitsubishi L200 2021", total_invoices: 15, total_spent: 15200.0, outstanding: 3400.0 },
  { id: 4, name: "Rashid Transport", phone: "+968 9456 7890", email: "info@rashidtransport.om", vehicle_details: "Fleet - Multiple", total_invoices: 45, total_spent: 48000.0, outstanding: 0 },
  { id: 5, name: "Khalid Motors", phone: "+968 9567 8901", email: "", vehicle_details: "Ford Ranger 2022", total_invoices: 6, total_spent: 3800.0, outstanding: 0 },
  { id: 6, name: "Faizan Spares", phone: "+968 9678 9012", email: "faizan@spares.om", vehicle_details: "Isuzu D-Max 2020", total_invoices: 20, total_spent: 18400.0, outstanding: 0 },
  { id: 7, name: "Al Amal Garage", phone: "+968 9789 0123", email: "amal@garage.om", vehicle_details: "Workshop", total_invoices: 30, total_spent: 25600.0, outstanding: 4500.0 },
  { id: 8, name: "Oman Trucks LLC", phone: "+968 9890 1234", email: "procurement@omantrucks.om", vehicle_details: "Fleet - 50 vehicles", total_invoices: 60, total_spent: 124000.0, outstanding: 6750.0 },
];

export default function CustomersPage() {
  const prefix = useRoutePrefix();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const itemsPerPage = 5;

  const filtered = dummyCustomers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openDeleteModal = (id: number) => {
    setSelectedCustomerId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    console.log("Deleting customer", selectedCustomerId);
    setDeleteModalOpen(false);
    setSelectedCustomerId(null);
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Customers" items={[{ label: "CRM" }, { label: "Customers" }]} />
      <ComponentCard
        title="Customer List"
        action={
          <Button size="sm" onClick={() => navigate(`${prefix}/customers/new`)}>
            <PlusIcon className="w-4 h-4" />
            Add Customer
          </Button>
        }
      >
        <Input
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="mb-4 sm:max-w-xs"
        />

        <TableWrapper>
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Name</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Phone</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Vehicle</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Invoices</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Total Spent</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Outstanding</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {paginated.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <Link to={`${prefix}/customers/${c.id}`} className="block font-medium text-brand-500 text-theme-sm hover:underline">{c.name}</Link>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{c.phone}</TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{c.vehicle_details}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{c.total_invoices}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{c.total_spent.toFixed(2)} AED</TableCell>
                  <TableCell className={`px-4 py-3 text-start font-medium text-theme-sm ${c.outstanding > 0 ? "text-warning-600" : "text-success-600"}`}>
                    {c.outstanding.toFixed(2)} AED
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`${prefix}/customers/${c.id}/edit`)}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-brand-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400 transition-colors"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(c.id)}
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
        title="Delete Customer"
        message="Are you sure you want to delete this customer? All associated invoices and data will remain but the customer record will be removed."
      />
    </>
  );
}
