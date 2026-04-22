import { useParams } from "react-router";
import useRoutePrefix from "../../hooks/useRoutePrefix";
import useLoading from "../../hooks/useLoading";
import PageSkeleton from "../../components/ui/skeleton/PageSkeleton";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableWrapper,
} from "../../components/ui/table";

const dummySupplier = {
  id: 1,
  name: "Gulf Auto Parts LLC",
  phone: "+968 2456 7890",
  email: "info@gulfautoparts.om",
  address: "Ruwi, Muscat",
  is_active: true,
  created_at: "2025-06-10",
  total_products: 28,
  total_purchases: 45000.0,
  outstanding_payable: 3200.0,
};

const dummyInvoices = [
  { id: 1, number: "PI-2026-0042", date: "2026-04-18", total: 8500.0 },
  { id: 2, number: "PI-2026-0039", date: "2026-04-10", total: 12500.0 },
  { id: 3, number: "PI-2026-0035", date: "2026-03-28", total: 7200.0 },
  { id: 4, number: "PI-2026-0031", date: "2026-03-15", total: 16800.0 },
];

export default function SupplierDetailPage() {
  const prefix = useRoutePrefix();
  const { id } = useParams();
  const isLoading = useLoading([id]);

  if (isLoading) return <PageSkeleton />;

  return (
    <>
      <PageBreadcrumb
        pageTitle="Supplier Details"
        items={[
          { label: "Inventory" },
          { label: "Suppliers", href: `${prefix}/suppliers` },
          { label: dummySupplier.name },
        ]}
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ComponentCard title="Products Supplied">
              <p className="text-3xl font-bold text-gray-800 dark:text-white/90">
                {dummySupplier.total_products}
              </p>
            </ComponentCard>
            <ComponentCard title="Total Purchases">
              <p className="text-3xl font-bold text-gray-800 dark:text-white/90">
                {dummySupplier.total_purchases.toFixed(2)} AED
              </p>
            </ComponentCard>
            <ComponentCard title="Outstanding Payable">
              <p className="text-3xl font-bold text-warning-600">
                {dummySupplier.outstanding_payable.toFixed(2)} AED
              </p>
            </ComponentCard>
          </div>

          <ComponentCard title="Purchase Invoice History" className="mt-6">
            <TableWrapper>
              <Table>
                <TableHeader className="border-b border-gray-100 dark:border-gray-800">
                  <TableRow>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Invoice #</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Date</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Total</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {dummyInvoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <span className="block font-medium text-brand-500 text-theme-sm">{inv.number}</span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{inv.date}</TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{inv.total.toFixed(2)} AED</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableWrapper>
          </ComponentCard>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <ComponentCard title="Supplier Information">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">Company Name</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{dummySupplier.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{dummySupplier.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{dummySupplier.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Address</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{dummySupplier.address || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{dummySupplier.is_active ? "Active" : "Inactive"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Since</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{dummySupplier.created_at}</p>
              </div>
            </div>
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
