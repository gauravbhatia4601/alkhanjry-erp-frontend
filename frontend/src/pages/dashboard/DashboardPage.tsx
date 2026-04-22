import { useAuth } from "../../context/AuthContext";
import useRoutePrefix from "../../hooks/useRoutePrefix";
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

const dummySalesToday = 4520.0;
const dummySalesMonth = 84750.0;
const dummyTotalInvoices = 128;
const dummyOutstanding = 12340.0;
const dummyMySalesToday = 2100.0;
const dummyMySalesMonth = 35400.0;

const dummyRecentInvoices = [
  { id: 1, number: "INV-000145", customer: "Ali Hassan", total: 1250.0, status: "confirmed", payment: "paid" },
  { id: 2, number: "INV-000144", customer: "Mohammed Saeed", total: 845.0, status: "confirmed", payment: "partial" },
  { id: 3, number: "INV-000143", customer: "Salem Al-Balushi", total: 3400.0, status: "confirmed", payment: "on_account" },
  { id: 4, number: "INV-000142", customer: "Rashid Transport", total: 2100.0, status: "confirmed", payment: "paid" },
  { id: 5, number: "INV-000141", customer: "Khalid Motors", total: 1750.0, status: "cancelled", payment: "pending" },
  { id: 6, number: "INV-000140", customer: "Faizan Spares", total: 900.0, status: "confirmed", payment: "paid" },
  { id: 7, number: "INV-000139", customer: "Al Amal Garage", total: 4500.0, status: "confirmed", payment: "partial" },
];

const dummyLowStock = [
  { id: 1, code: "BRK-001", name: "Brake Pad Toyota Hilux", qty: 3, min: 10 },
  { id: 2, code: "FIL-023", name: "Engine Oil Filter (Genuine)", qty: 5, min: 15 },
  { id: 3, code: "SPK-007", name: "Spark Plug NGK Iridium", qty: 2, min: 20 },
  { id: 4, code: "BEL-012", name: "Timing Belt - Mitsubishi", qty: 4, min: 8 },
  { id: 5, code: "WIP-045", name: "Wiper Blade 24\" Bosch", qty: 1, min: 12 },
];

const dummyTopSelling = [
  { id: 1, name: "Engine Oil 10W-40 Castrol", qty: 45, revenue: 2250.0 },
  { id: 2, name: "Air Filter HEPA Grade", qty: 38, revenue: 1520.0 },
  { id: 3, name: "Brake Disc Front - Toyota", qty: 32, revenue: 3200.0 },
  { id: 4, name: "Battery 12V 70Ah Amaron", qty: 28, revenue: 4200.0 },
  { id: 5, name: "Radiator Coolant 4L", qty: 25, revenue: 875.0 },
];

const getPaymentBadge = (status: string) => {
  switch (status) {
    case "paid": return { color: "success" as const, text: "Paid" };
    case "partial": return { color: "warning" as const, text: "Partial" };
    case "on_account": return { color: "primary" as const, text: "On Account" };
    case "pending": return { color: "error" as const, text: "Pending" };
    default: return { color: "light" as const, text: status };
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "confirmed": return { color: "success" as const, text: "Confirmed" };
    case "cancelled": return { color: "error" as const, text: "Cancelled" };
    case "draft": return { color: "warning" as const, text: "Draft" };
    default: return { color: "light" as const, text: status };
  }
};

export default function DashboardPage() {
  const prefix = useRoutePrefix();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <>
      <PageBreadcrumb pageTitle={isAdmin ? "Admin Dashboard" : "Dashboard"} />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* KPI Cards */}
        {isAdmin ? (
          <>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <ComponentCard title="Sales Today" className="h-full">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white/90">
                      {dummySalesToday.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">AED</p>
                  </div>
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </ComponentCard>
            </div>

            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <ComponentCard title="Sales This Month" className="h-full">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white/90">
                      {dummySalesMonth.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">AED</p>
                  </div>
                  <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </ComponentCard>
            </div>

            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <ComponentCard title="Total Invoices" className="h-full">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white/90">
                      {dummyTotalInvoices}
                    </p>
                    <p className="text-sm text-gray-500">Invoices</p>
                  </div>
                  <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-warning-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </ComponentCard>
            </div>

            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <ComponentCard title="Outstanding" className="h-full">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white/90">
                      {dummyOutstanding.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">AED</p>
                  </div>
                  <div className="w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-error-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </ComponentCard>
            </div>

            {/* Recent Transactions */}
            <div className="col-span-12 lg:col-span-8">
              <ComponentCard title="Recent Transactions">
                <TableWrapper>
                  <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-gray-800">
                      <TableRow>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Invoice</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Customer</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Amount</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Status</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Payment</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {dummyRecentInvoices.map((inv) => (
                        <TableRow key={inv.id}>
                          <TableCell className="px-5 py-4 sm:px-6 text-start">
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{inv.number}</span>
                          </TableCell>
                          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{inv.customer}</TableCell>
                          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{inv.total.toFixed(2)} AED</TableCell>
                          <TableCell className="px-4 py-3 text-start">
                            <Badge size="sm" color={getStatusBadge(inv.status).color}>{getStatusBadge(inv.status).text}</Badge>
                          </TableCell>
                          <TableCell className="px-4 py-3 text-start">
                            <Badge size="sm" color={getPaymentBadge(inv.payment).color}>{getPaymentBadge(inv.payment).text}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableWrapper>
              </ComponentCard>
            </div>

            {/* Low Stock */}
            <div className="col-span-12 lg:col-span-4">
              <ComponentCard title="Low Stock Alerts" desc="Items below minimum stock">
                <div className="space-y-3">
                  {dummyLowStock.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-error-50 dark:bg-error-500/10 rounded-lg border border-error-200 dark:border-error-500/20">
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.code}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-error-600">{item.qty} left</p>
                        <p className="text-xs text-gray-500">min: {item.min}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ComponentCard>
            </div>

            {/* Top Selling Items */}
            <div className="col-span-12">
              <ComponentCard title="Top 5 Selling Items - This Month">
                <TableWrapper>
                  <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-gray-800">
                      <TableRow>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">#</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Product</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Qty Sold</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Revenue</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {dummyTopSelling.map((item, idx) => (
                        <TableRow key={item.id}>
                          <TableCell className="px-5 py-4 sm:px-6 text-start">
                            <span className="block font-medium text-brand-500 text-theme-sm">{idx + 1}</span>
                          </TableCell>
                          <TableCell className="px-5 py-4 sm:px-6 text-start">
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{item.name}</span>
                          </TableCell>
                          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.qty}</TableCell>
                          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.revenue.toFixed(2)} AED</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableWrapper>
              </ComponentCard>
            </div>
          </>
        ) : (
          <>
            {/* Salesman Dashboard KPIs */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <ComponentCard title="My Sales Today" className="h-full">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white/90">{dummyMySalesToday.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">AED</p>
                  </div>
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </ComponentCard>
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <ComponentCard title="My Sales This Month" className="h-full">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white/90">{dummyMySalesMonth.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">AED</p>
                  </div>
                  <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </ComponentCard>
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <ComponentCard title="My Invoices Today" className="h-full">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white/90">4</p>
                    <p className="text-sm text-gray-500">Invoices</p>
                  </div>
                  <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-warning-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </ComponentCard>
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <ComponentCard title="My Outstanding" className="h-full">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white/90">1,250.00</p>
                    <p className="text-sm text-gray-500">AED</p>
                  </div>
                  <div className="w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-error-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </ComponentCard>
            </div>
            <div className="col-span-12">
              <ComponentCard title="Quick Actions">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <a href={`${prefix}/invoices/new`} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20 hover:bg-brand-100 dark:hover:bg-brand-500/20 transition-colors">
                    <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <span className="text-sm font-medium text-brand-700 dark:text-brand-400">New Invoice</span>
                  </a>
                  <a href={`${prefix}/quotations/new`} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-success-50 dark:bg-success-500/10 border border-success-100 dark:border-success-500/20 hover:bg-success-100 dark:hover:bg-success-500/20 transition-colors">
                    <svg className="w-6 h-6 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <span className="text-sm font-medium text-success-700 dark:text-success-400">New Quotation</span>
                  </a>
                  <a href={`${prefix}/customers/new`} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-info-50 dark:bg-info-500/10 border border-info-100 dark:border-info-500/20 hover:bg-info-100 dark:hover:bg-info-500/20 transition-colors">
                    <svg className="w-6 h-6 text-info-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                    <span className="text-sm font-medium text-info-700 dark:text-info-400">New Customer</span>
                  </a>
                  <a href={`${prefix}/products`} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-warning-50 dark:bg-warning-500/10 border border-warning-100 dark:border-warning-500/20 hover:bg-warning-100 dark:hover:bg-warning-500/20 transition-colors">
                    <svg className="w-6 h-6 text-warning-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                    <span className="text-sm font-medium text-warning-700 dark:text-warning-400">Products</span>
                  </a>
                </div>
              </ComponentCard>
            </div>
            <div className="col-span-12">
              <ComponentCard title="My Recent Invoices">
                <TableWrapper>
                  <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-gray-800">
                      <TableRow>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Invoice</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Customer</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Amount</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Status</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Payment</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {dummyRecentInvoices.map((inv) => (
                        <TableRow key={inv.id}>
                          <TableCell className="px-5 py-4 sm:px-6 text-start">
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{inv.number}</span>
                          </TableCell>
                          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{inv.customer}</TableCell>
                          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{inv.total.toFixed(2)} AED</TableCell>
                          <TableCell className="px-4 py-3 text-start">
                            <Badge size="sm" color={getStatusBadge(inv.status).color}>{getStatusBadge(inv.status).text}</Badge>
                          </TableCell>
                          <TableCell className="px-4 py-3 text-start">
                            <Badge size="sm" color={getPaymentBadge(inv.payment).color}>{getPaymentBadge(inv.payment).text}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableWrapper>
              </ComponentCard>
            </div>
          </>
        )}
      </div>
    </>
  );
}
