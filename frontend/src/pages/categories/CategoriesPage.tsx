import { useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import Badge from "../../components/ui/badge/Badge";
import Input from "../../components/form/input/InputField";
import Pagination from "../../components/ui/pagination/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableWrapper,
} from "../../components/ui/table";
import { PlusIcon } from "../../icons";

const dummyCategories = [
  { id: 1, name: "Brakes", description: "Brake pads, discs, drums, calipers", product_count: 18 },
  { id: 2, name: "Filters", description: "Oil filters, air filters, fuel filters", product_count: 24 },
  { id: 3, name: "Engine Oil", description: "Engine oils and lubricants", product_count: 12 },
  { id: 4, name: "Electrical", description: "Batteries, alternators, starters", product_count: 15 },
  { id: 5, name: "Ignition", description: "Spark plugs, coils, distributors", product_count: 8 },
  { id: 6, name: "Belts", description: "Timing belts, fan belts, alternator belts", product_count: 10 },
  { id: 7, name: "Wipers", description: "Wiper blades and motors", product_count: 6 },
  { id: 8, name: "Cooling", description: "Radiators, coolant, hoses", product_count: 9 },
  { id: 9, name: "Suspension", description: "Shocks, struts, springs", product_count: 7 },
];

export default function CategoriesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filtered = dummyCategories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <PageBreadcrumb pageTitle="Categories" items={[{ label: "Inventory" }, { label: "Categories" }]} />
      <ComponentCard
        title="Product Categories"
        action={
          <Button size="sm" onClick={() => navigate("/categories/new")}>
            <PlusIcon className="w-4 h-4" />
            Add Category
          </Button>
        }
      >
        <Input
          placeholder="Search categories..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="mb-4 sm:max-w-xs"
        />
        <TableWrapper>
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Category Name</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Description</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Products</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {paginated.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{c.name}</span>
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{c.description}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start"><Badge size="sm" color="light">{c.product_count}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </ComponentCard>
    </>
  );
}
