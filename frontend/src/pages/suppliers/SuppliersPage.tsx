import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useRoutePrefix from "../../hooks/useRoutePrefix";
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
import { PlusIcon, PencilIcon, TrashBinIcon, EyeIcon } from "../../icons";

const dummySuppliers = [
  { id: 1, name: "Gulf Auto Parts LLC", phone: "+968 2456 7890", email: "info@gulfautoparts.om", address: "Ruwi, Muscat", is_active: true },
  { id: 2, name: "Toyota Genuine Parts", phone: "+968 2201 3344", email: "parts@toyota.om", address: "Al Mawaleh, Muscat", is_active: true },
  { id: 3, name: "Nissan Spare Parts", phone: "+968 2202 5566", email: "spares@nissan.om", address: "Al Khuwair, Muscat", is_active: true },
  { id: 4, name: "Bosch Middle East", phone: "+968 2203 7788", email: "om@bosch.com", address: "Ghala, Muscat", is_active: true },
  { id: 5, name: "Castrol Oman", phone: "+968 2204 9900", email: "orders@castrol.om", address: "Mina Al Fahal, Muscat", is_active: true },
];

export default function SuppliersPage() {
  const navigate = useNavigate();
  const prefix = useRoutePrefix();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);
  const itemsPerPage = 5;

  const filtered = dummySuppliers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openDeleteModal = (id: number) => {
    setSelectedSupplierId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    console.log("Deleting supplier", selectedSupplierId);
    setDeleteModalOpen(false);
    setSelectedSupplierId(null);
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Suppliers" items={[{ label: "Inventory" }, { label: "Suppliers" }]} />
      <ComponentCard
        title="Suppliers"
        action={
          <Button size="sm" onClick={() => navigate(`${prefix}/suppliers/new`)}>
            <PlusIcon className="w-4 h-4" />
            Add Supplier
          </Button>
        }
      >
        <Input
          placeholder="Search suppliers..."
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
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Email</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Address</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Status</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {paginated.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <Link to={`${prefix}/suppliers/${s.id}`} className="block font-medium text-brand-500 text-theme-sm hover:underline">{s.name}</Link>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{s.phone}</TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{s.email}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{s.address}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{s.is_active ? "Active" : "Inactive"}</TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`${prefix}/suppliers/${s.id}`)}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-brand-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400 transition-colors"
                        title="View"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigate(`${prefix}/suppliers/${s.id}/edit`)}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-brand-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400 transition-colors"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(s.id)}
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
        title="Delete Supplier"
        message="Are you sure you want to delete this supplier? Product supplier associations will be cleared."
      />
    </>
  );
}
