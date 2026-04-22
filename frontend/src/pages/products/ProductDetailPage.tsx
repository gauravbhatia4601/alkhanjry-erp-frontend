import { useParams } from "react-router";
import useRoutePrefix from "../../hooks/useRoutePrefix";
import useLoading from "../../hooks/useLoading";
import PageSkeleton from "../../components/ui/skeleton/PageSkeleton";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Badge from "../../components/ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableWrapper,
} from "../../components/ui/table";

const dummyProduct = {
  id: 1,
  item_code: "BRK-001",
  name: "Brake Pad Toyota Hilux",
  category: "Brakes",
  supplier: "Gulf Auto Parts LLC",
  description: "Genuine brake pads for Toyota Hilux",
  selling_price: 125.0,
  purchase_price: 80.0,
  stock: 3,
  min_stock: 10,
  vat: true,
  is_active: true,
};

const dummyMovements = [
  { id: 1, type: "out", quantity: 2, previous: 5, new: 3, reason: "Invoice #INV-000145", user: "Mohammed", date: "2026-04-21 14:30" },
  { id: 2, type: "in", quantity: 10, previous: 0, new: 10, reason: "Purchase from Gulf Auto Parts", user: "Admin", date: "2026-04-20 09:15" },
  { id: 3, type: "out", quantity: 1, previous: 11, new: 10, reason: "Invoice #INV-000140", user: "Mohammed", date: "2026-04-19 16:45" },
  { id: 4, type: "adjustment", quantity: 1, previous: 10, new: 11, reason: "Stock count correction", user: "Admin", date: "2026-04-18 11:00" },
  { id: 5, type: "out", quantity: 2, previous: 13, new: 11, reason: "Invoice #INV-000135", user: "Ahmed", date: "2026-04-15 13:20" },
];

const getMovementBadge = (type: string) => ({
  in: { color: "success" as const, text: "Stock In" },
  out: { color: "error" as const, text: "Stock Out" },
  adjustment: { color: "warning" as const, text: "Adjustment" },
}[type] || { color: "light" as const, text: type });

export default function ProductDetailPage() {
  const prefix = useRoutePrefix();
  const { id } = useParams();
  const isLoading = useLoading([id]);

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <>
      <PageBreadcrumb
        pageTitle="Product Details"
        items={[{ label: "Inventory" }, { label: "Products", href: `${prefix}/products` }, { label: `#${id}` }]}
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 lg:col-span-8">
          <ComponentCard title={dummyProduct.name}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-500">Item Code</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{dummyProduct.item_code}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{dummyProduct.category}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Supplier</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{dummyProduct.supplier || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">VAT</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{dummyProduct.vat ? "5% Applicable" : "Not Applicable"}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <ComponentCard title="Current Stock">
                <p className={`text-3xl font-bold ${dummyProduct.stock <= dummyProduct.min_stock ? "text-error-600" : "text-gray-800 dark:text-white/90"}`}>
                  {dummyProduct.stock}
                </p>
                <p className="text-xs text-gray-500 mt-1">Min: {dummyProduct.min_stock}</p>
              </ComponentCard>
              <ComponentCard title="Selling Price">
                <p className="text-3xl font-bold text-gray-800 dark:text-white/90">{dummyProduct.selling_price.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">AED</p>
              </ComponentCard>
              <ComponentCard title="Purchase Price">
                <p className="text-3xl font-bold text-gray-800 dark:text-white/90">{dummyProduct.purchase_price.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">AED</p>
              </ComponentCard>
            </div>

            <p className="text-sm text-gray-500 mb-6">{dummyProduct.description}</p>

            <ComponentCard title="Recent Stock Movements" className="mt-6">
              <TableWrapper>
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-gray-800">
                    <TableRow>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Type</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Qty</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Before</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">After</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Reference</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">User</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Date</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {dummyMovements.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <Badge size="sm" color={getMovementBadge(m.type).color}>{getMovementBadge(m.type).text}</Badge>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{m.type === "out" ? `-${m.quantity}` : `+${m.quantity}`}</TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{m.previous}</TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{m.new}</TableCell>
                        <TableCell className="px-4 py-3 text-start">
                          <span className="text-sm text-gray-700 dark:text-gray-300">{m.reason}</span>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{m.user}</TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{m.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableWrapper>
            </ComponentCard>
          </ComponentCard>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <ComponentCard title="Stock Status">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Current Stock</p>
                <p className={`text-3xl font-bold ${dummyProduct.stock <= dummyProduct.min_stock ? "text-error-600" : "text-gray-800 dark:text-white/90"}`}>
                  {dummyProduct.stock}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Minimum Level</p>
                <p className="text-lg font-medium text-gray-800 dark:text-white/90">{dummyProduct.min_stock}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <div className="mt-1">
                  {dummyProduct.stock <= dummyProduct.min_stock ? (
                    <Badge size="sm" color="error">Low Stock</Badge>
                  ) : dummyProduct.stock === 0 ? (
                    <Badge size="sm" color="error">Out of Stock</Badge>
                  ) : (
                    <Badge size="sm" color="success">In Stock</Badge>
                  )}
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <p className="text-sm text-gray-500">Profit Margin</p>
                <p className="text-lg font-medium text-success-600">
                  {(((dummyProduct.selling_price - dummyProduct.purchase_price) / dummyProduct.selling_price) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
