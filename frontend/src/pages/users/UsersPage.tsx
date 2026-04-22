import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useRoutePrefix from "../../hooks/useRoutePrefix";
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
import { PlusIcon, PencilIcon, TrashBinIcon, EyeIcon } from "../../icons";

const dummyUsers = [
  { id: 1, name: "Admin User", username: "admin", email: "admin@alkhanjry.com", role: "admin", is_active: true, last_login: "2026-04-21 09:30" },
  { id: 2, name: "Mohammed Omar", username: "mohammed", email: "mohammed@alkhanjry.com", role: "salesman", is_active: true, last_login: "2026-04-21 08:15" },
  { id: 3, name: "Ahmed Khalid", username: "ahmed", email: "ahmed@alkhanjry.com", role: "salesman", is_active: true, last_login: "2026-04-20 17:45" },
  { id: 4, name: "Salim Hamed", username: "salim", email: "salim@alkhanjry.com", role: "salesman", is_active: false, last_login: "2026-04-15 14:20" },
];

export default function UsersPage() {
  const navigate = useNavigate();
  const prefix = useRoutePrefix();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const itemsPerPage = 5;

  const filtered = dummyUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openDeleteModal = (id: number) => {
    setSelectedUserId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    console.log("Deleting user", selectedUserId);
    setDeleteModalOpen(false);
    setSelectedUserId(null);
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Users" items={[{ label: "Settings" }, { label: "Users" }]} />
      <ComponentCard
        title="User Management"
        action={
          <Button size="sm" onClick={() => navigate(`${prefix}/users/new`)}>
            <PlusIcon className="w-4 h-4" />
            Add User
          </Button>
        }
      >
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="mb-4 sm:max-w-xs"
        />
        <TableWrapper>
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Name</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Username</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Email</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Role</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Status</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Last Login</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {paginated.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <Link to={`${prefix}/users/${u.id}`} className="block font-medium text-brand-500 text-theme-sm hover:underline">{u.name}</Link>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{u.username}</TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{u.email}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start"><Badge size="sm" color={u.role === "admin" ? "primary" : "light"}>
                    {u.role === "admin" ? "Admin" : "Salesman"}
                  </Badge></TableCell>
                  <TableCell className="px-4 py-3 text-start"><Badge size="sm" color={u.is_active ? "success" : "error"}>
                    {u.is_active ? "Active" : "Inactive"}
                  </Badge></TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{u.last_login}</TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`${prefix}/users/${u.id}`)}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-brand-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400 transition-colors"
                        title="View"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigate(`${prefix}/users/${u.id}/edit`)}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-brand-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400 transition-colors"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(u.id)}
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
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
      />
    </>
  );
}
