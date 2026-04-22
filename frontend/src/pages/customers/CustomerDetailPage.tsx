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

export default function CustomerDetailPage() {
  const prefix = useRoutePrefix();
  const { id } = useParams();
  const isLoading = useLoading([id]);

  const dummyCustomer = {
    id: Number(id),
    name: "Ali Hassan",
    phone: "+968 9123 4567",
    email: "ali.hassan@email.com",
    address: "Al Khuwair, Muscat",
    vehicle_details: "Toyota Hilux 2020",
    total_invoices: 12,
    total_spent: 8450.0,
    outstanding: 0,
    created_at: "2026-01-15",
  };

  const dummyInvoices = [
    { id: 1, number: "INV-000145", date: "2026-04-21", grand_total: 1250.0, status: "confirmed", payment_status: "paid", salesman: "Mohammed" },
    { id: 2, number: "INV-000138", date: "2026-04-18", grand_total: 3400.0, status: "confirmed", payment_status: "on_account", salesman: "Ahmed" },
    { id: 3, number: "INV-000132", date: "2026-04-12", grand_total: 850.0, status: "cancelled", payment_status: "pending", salesman: "Mohammed" },
    { id: 4, number: "INV-000128", date: "2026-04-08", grand_total: 2100.0, status: "confirmed", payment_status: "paid", salesman: "Ahmed" },
  ];

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <>
      <PageBreadcrumb
        pageTitle="Customer Details"
        items={[{ label: "CRM" }, { label: "Customers", href: `${prefix}/customers` }, { label: `#${id}` }]}
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ComponentCard title="Total Invoices">
              <p className="text-3xl font-bold text-gray-800 dark:text-white/90">{dummyCustomer.total_invoices}</p>
            </ComponentCard>
            <ComponentCard title="Total Spent">
              <p className="text-3xl font-bold text-gray-800 dark:text-white/90">{dummyCustomer.total_spent.toFixed(2)} AED</p>
            </ComponentCard>
            <ComponentCard title="Outstanding">
              <p className={`text-3xl font-bold ${dummyCustomer.outstanding > 0 ? "text-warning-600" : "text-success-600"}`}>
                {dummyCustomer.outstanding.toFixed(2)} AED
              </p>
            </ComponentCard>
          </div>

          <ComponentCard title="Invoice History" className="mt-6">
            <TableWrapper>
              <Table>
                <TableHeader className="border-b border-gray-100 dark:border-gray-800">
                  <TableRow>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Invoice #</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Date</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Total</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Status</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Payment</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Salesman</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {dummyInvoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <span className="block font-medium text-brand-500 text-theme-sm">{inv.number}</span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{inv.date}</TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{inv.grand_total.toFixed(2)} AED</TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <Badge size="sm" color={getStatusBadge(inv.status).color}>{getStatusBadge(inv.status).text}</Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <Badge size="sm" color={getPaymentBadge(inv.payment_status).color}>{getPaymentBadge(inv.payment_status).text}</Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{inv.salesman}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableWrapper>
          </ComponentCard>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <ComponentCard title="Customer Information">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{dummyCustomer.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{dummyCustomer.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{dummyCustomer.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Address</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{dummyCustomer.address || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Vehicle Details</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{dummyCustomer.vehicle_details || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Customer Since</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{dummyCustomer.created_at}</p>
              </div>
            </div>
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
