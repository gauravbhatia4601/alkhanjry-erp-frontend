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
import { PlusIcon, PencilIcon, TrashBinIcon } from "../../icons";
import useRoutePrefix from "../../hooks/useRoutePrefix";

const dummyProducts = [
  { id: 1, item_code: "BRK-001", name: "Brake Pad Toyota Hilux", category: "Brakes", stock: 3, min_stock: 10, selling_price: 125.0, purchase_price: 80.0, vat: true },
  { id: 2, item_code: "FIL-023", name: "Engine Oil Filter (Genuine)", category: "Filters", stock: 5, min_stock: 15, selling_price: 45.0, purchase_price: 28.0, vat: true },
  { id: 3, item_code: "ENG-001", name: "Engine Oil 10W-40 Castrol 4L", category: "Engine Oil", stock: 24, min_stock: 20, selling_price: 50.0, purchase_price: 32.0, vat: true },
  { id: 4, item_code: "BAT-005", name: "Battery 12V 70Ah Amaron", category: "Electrical", stock: 18, min_stock: 10, selling_price: 150.0, purchase_price: 100.0, vat: true },
  { id: 5, item_code: "SPK-007", name: "Spark Plug NGK Iridium", category: "Ignition", stock: 2, min_stock: 20, selling_price: 35.0, purchase_price: 22.0, vat: true },
  { id: 6, item_code: "BEL-012", name: "Timing Belt - Mitsubishi L200", category: "Belts", stock: 4, min_stock: 8, selling_price: 180.0, purchase_price: 120.0, vat: true },
  { id: 7, item_code: "WIP-045", name: "Wiper Blade 24\" Bosch", category: "Wipers", stock: 1, min_stock: 12, selling_price: 35.0, purchase_price: 20.0, vat: false },
  { id: 8, item_code: "RAD-003", name: "Radiator Coolant 4L", category: "Cooling", stock: 15, min_stock: 20, selling_price: 35.0, purchase_price: 22.0, vat: true },
  { id: 9, item_code: "AFI-002", name: "Air Filter HEPA Grade", category: "Filters", stock: 22, min_stock: 15, selling_price: 40.0, purchase_price: 25.0, vat: true },
  { id: 10, item_code: "SHK-001", name: "Shock Absorber Front - Nissan", category: "Suspension", stock: 8, min_stock: 6, selling_price: 220.0, purchase_price: 150.0, vat: true },
];

const dummyCategories = [
  { value: "", label: "All Categories" },
  { value: "brakes", label: "Brakes" },
  { value: "filters", label: "Filters" },
  { value: "engine-oil", label: "Engine Oil" },
  { value: "electrical", label: "Electrical" },
  { value: "ignition", label: "Ignition" },
  { value: "belts", label: "Belts" },
  { value: "wipers", label: "Wipers" },
  { value: "cooling", label: "Cooling" },
  { value: "suspension", label: "Suspension" },
];

export default function ProductsPage() {
  const prefix = useRoutePrefix();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const itemsPerPage = 5;

  const filtered = dummyProducts.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.item_code.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !categoryFilter || p.category.toLowerCase() === categoryFilter;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openDeleteModal = (id: number) => {
    setSelectedProductId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    console.log("Deleting product", selectedProductId);
    setDeleteModalOpen(false);
    setSelectedProductId(null);
  };

  return (
    <>
      <PageBreadcrumb
        pageTitle="Products"
        items={[{ label: "Inventory" }, { label: "Products" }]}
      />

      <ComponentCard
        title="Product List"
        action={
          <Button size="sm" onClick={() => navigate(`${prefix}/products/new`)}>
            <PlusIcon className="w-4 h-4" />
            Add Product
          </Button>
        }
      >
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Input
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="sm:max-w-xs"
          />
          <select
            className="h-11 rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 sm:max-w-xs"
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
          >
            {dummyCategories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <TableWrapper>
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Code</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Product Name</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Category</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Stock</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Selling Price</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Purchase</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">VAT</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {paginated.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <Link to={`${prefix}/products/${p.id}`} className="block font-medium text-brand-500 text-theme-sm hover:underline">{p.item_code}</Link>
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <Link to={`${prefix}/products/${p.id}`} className="block font-medium text-gray-800 text-theme-sm dark:text-white/90 hover:text-brand-500 transition-colors">{p.name}</Link>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Badge color="light" size="sm">{p.category}</Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <span className={`font-medium text-theme-sm ${p.stock <= p.min_stock ? "text-error-600" : "text-gray-800 dark:text-white/90"}`}>
                      {p.stock}
                    </span>
                    {p.stock <= p.min_stock && (
                      <Badge size="sm" color="error" variant="light" className="ml-2">Low</Badge>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{p.selling_price.toFixed(2)}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{p.purchase_price.toFixed(2)}</TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    {p.vat ? <Badge size="sm" color="success">5%</Badge> : <span className="text-gray-400">-</span>}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`${prefix}/products/${p.id}`)}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-brand-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400 transition-colors"
                        title="View"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => navigate(`${prefix}/products/${p.id}/edit`)}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-brand-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400 transition-colors"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(p.id)}
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
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </>
  );
}
