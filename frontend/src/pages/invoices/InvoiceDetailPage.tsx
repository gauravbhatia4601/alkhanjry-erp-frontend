import { useState } from "react";
import useRoutePrefix from "../../hooks/useRoutePrefix";
import { useParams, useNavigate } from "react-router";
import { useToast } from "../../context/ToastContext";
import useLoading from "../../hooks/useLoading";
import PageSkeleton from "../../components/ui/skeleton/PageSkeleton";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import Badge from "../../components/ui/badge/Badge";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import ConfirmModal from "../../components/ui/confirm-modal/ConfirmModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableWrapper,
} from "../../components/ui/table";

interface Payment {
  id: number;
  amount: number;
  method: string;
  date: string;
  recorded_by: string;
}

const dummyInvoice = {
  id: 45,
  invoice_number: "INV-000145",
  invoice_date: "2026-04-21",
  customer: "Ali Hassan",
  phone: "+968 9123 4567",
  vehicle_details: "Toyota Hilux 2020",
  salesman: "Mohammed",
  payment_status: "pending",
  status: "draft",
  sub_total: 1190.48,
  vat_total: 59.52,
  grand_total: 1250.0,
  amount_paid: 0,
  outstanding_balance: 1250.0,
  items: [
    { id: 1, name: "Brake Pad Toyota Hilux", code: "BRK-001", qty: 2, unit_price: 125.0, is_vat: true, vat_amount: 12.5, line_total: 250.0 },
    { id: 2, name: "Engine Oil 10W-40 Castrol 4L", code: "ENG-001", qty: 1, unit_price: 50.0, is_vat: true, vat_amount: 2.5, line_total: 50.0 },
    { id: 3, name: "Wiper Blade 24\" Bosch", code: "WIP-045", qty: 2, unit_price: 35.0, is_vat: false, vat_amount: 0, line_total: 70.0 },
    { id: 4, name: "Battery 12V 70Ah Amaron", code: "BAT-005", qty: 1, unit_price: 150.0, is_vat: true, vat_amount: 7.5, line_total: 150.0 },
  ],
  payments: [] as Payment[],
};

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

export default function InvoiceDetailPage() {
  const prefix = useRoutePrefix();
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const isLoading = useLoading([id]);
  const [invoice, setInvoice] = useState(dummyInvoice);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    method: "cash",
    date: new Date().toISOString().split("T")[0],
    reference: "",
    notes: "",
  });

  if (isLoading) {
    return <PageSkeleton />;
  }

  const handleConfirm = () => {
    setInvoice(prev => ({ ...prev, status: "confirmed" }));
    showToast("Invoice confirmed successfully", "success");
  };

  const handleCancel = () => {
    console.log("Cancelling invoice", id, "reason:", cancelReason);
    setInvoice(prev => ({ ...prev, status: "cancelled", payment_status: "pending" }));
    setCancelModalOpen(false);
    setCancelReason("");
    showToast("Invoice cancelled", "warning");
  };

  const handleRecordPayment = () => {
    const amount = parseFloat(paymentForm.amount) || 0;
    if (amount <= 0) return;
    const newPaid = invoice.amount_paid + amount;
    const newOutstanding = invoice.grand_total - newPaid;
    let newPaymentStatus = invoice.payment_status;
    if (newOutstanding <= 0.01) newPaymentStatus = "paid";
    else if (newPaid > 0) newPaymentStatus = "partial";

    setInvoice(prev => ({
      ...prev,
      amount_paid: newPaid,
      outstanding_balance: Math.max(0, newOutstanding),
      payment_status: newPaymentStatus,
      payments: [
        ...prev.payments,
        {
          id: Date.now(),
          amount,
          method: paymentForm.method,
          date: paymentForm.date,
          recorded_by: "Admin",
        },
      ],
    }));
    setPaymentModalOpen(false);
    setPaymentForm({ amount: "", method: "cash", date: new Date().toISOString().split("T")[0], reference: "", notes: "" });
    showToast(`Payment of ${amount.toFixed(2)} AED recorded`, "success");
  };

  const isDraft = invoice.status === "draft";
  const isConfirmed = invoice.status === "confirmed";
  const isCancelled = invoice.status === "cancelled";

  return (
    <>
      <PageBreadcrumb
        pageTitle="Invoice Details"
        items={[{ label: "Sales" }, { label: "Invoices", href: `${prefix}/invoices` }, { label: `#${id}` }]}
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 lg:col-span-8">
          <ComponentCard
            title={
              <span className="flex items-center gap-2">
                {invoice.invoice_number}
                <Badge size="sm" color={getStatusBadge(invoice.status).color}>{getStatusBadge(invoice.status).text}</Badge>
              </span>
            }
          >
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-500">Customer</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{invoice.customer}</p>
                <p className="text-sm text-gray-500">{invoice.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Vehicle</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{invoice.vehicle_details}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{invoice.invoice_date}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Salesman</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{invoice.salesman}</p>
              </div>
            </div>

            <TableWrapper>
              <Table>
                <TableHeader className="border-b border-gray-100 dark:border-gray-800">
                  <TableRow>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Product</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Qty</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Unit Price</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">VAT</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Total</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {invoice.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.code}</p>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.qty}</TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.unit_price.toFixed(2)} AED</TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.vat_amount.toFixed(2)} AED</TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{(item.line_total + item.vat_amount).toFixed(2)} AED</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableWrapper>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-white/[0.03] rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Sub Total</span>
                <span className="text-gray-800 dark:text-white/90">{invoice.sub_total.toFixed(2)} AED</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600 dark:text-gray-400">VAT (5%)</span>
                <span className="text-gray-800 dark:text-white/90">{invoice.vat_total.toFixed(2)} AED</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-gray-800 dark:text-white">Grand Total</span>
                <span>{invoice.grand_total.toFixed(2)} AED</span>
              </div>
            </div>
          </ComponentCard>

          {/* Payments Section */}
          {invoice.payments.length > 0 && (
            <ComponentCard title="Payment History" className="mt-4">
              <TableWrapper>
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-gray-800">
                    <TableRow>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Date</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Amount</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Method</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Recorded By</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {invoice.payments.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">{p.date}</TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{p.amount.toFixed(2)} AED</TableCell>
                        <TableCell className="px-4 py-3 text-start">
                          <Badge size="sm" color={getPaymentBadge(p.method).color}>{getPaymentBadge(p.method).text}</Badge>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{p.recorded_by}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableWrapper>
            </ComponentCard>
          )}
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-4">
          <ComponentCard title="Actions">
            <div className="space-y-2">
              {isDraft && (
                <>
                  <Button className="w-full" onClick={handleConfirm}>Confirm Invoice</Button>
                  <Button variant="outline" className="w-full text-error-500 border-error-200 hover:bg-error-50" onClick={() => setCancelModalOpen(true)}>Cancel Invoice</Button>
                </>
              )}
              {isConfirmed && (
                <>
                  {invoice.outstanding_balance > 0 && (
                    <Button className="w-full" onClick={() => setPaymentModalOpen(true)}>Record Payment</Button>
                  )}
                  <Button variant="outline" className="w-full" onClick={() => navigate(`/invoices/${id}/print`)}>Print Invoice</Button>
                  <Button variant="outline" className="w-full" onClick={() => navigate(`/invoices/${id}/print`)}>Download PDF</Button>
                  <Button variant="outline" className="w-full text-error-500 border-error-200 hover:bg-error-50" onClick={() => setCancelModalOpen(true)}>Cancel Invoice</Button>
                </>
              )}
              {isCancelled && (
                <>
                  <Button variant="outline" className="w-full" disabled>Print Invoice</Button>
                  <div className="p-3 bg-error-50 dark:bg-error-500/10 rounded-lg border border-error-200 dark:border-error-500/20">
                    <p className="text-sm font-medium text-error-600">Invoice Cancelled</p>
                  </div>
                </>
              )}
            </div>
          </ComponentCard>

          <ComponentCard title="Payment Status">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <div className="mt-1"><Badge size="sm" color={getPaymentBadge(invoice.payment_status).color}>{getPaymentBadge(invoice.payment_status).text}</Badge></div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount Paid</p>
                <p className="text-lg font-medium text-gray-800 dark:text-white/90">{invoice.amount_paid.toFixed(2)} AED</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Outstanding</p>
                <p className="text-lg font-medium text-gray-800 dark:text-white/90">{invoice.outstanding_balance.toFixed(2)} AED</p>
              </div>
            </div>
          </ComponentCard>
        </div>
      </div>

      {/* Cancel Modal */}
      <ConfirmModal
        isOpen={cancelModalOpen}
        onClose={() => { setCancelModalOpen(false); setCancelReason(""); }}
        onConfirm={handleCancel}
        title="Cancel Invoice"
        confirmText="Cancel Invoice"
        confirmVariant="destructive"
      >
        <div className="mb-4">
          <Label>Cancellation Reason <span className="text-error-500">*</span></Label>
          <textarea
            rows={3}
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Enter reason for cancellation..."
            className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
          />
        </div>
      </ConfirmModal>

      {/* Payment Modal */}
      <ConfirmModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onConfirm={handleRecordPayment}
        title="Record Payment"
        confirmText="Record Payment"
        confirmVariant="primary"
      >
        <div className="space-y-4">
          <div>
            <Label>Amount (AED) <span className="text-error-500">*</span></Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={paymentForm.amount}
              onChange={(e) => setPaymentForm(prev => ({ ...prev, amount: e.target.value }))}
            />
          </div>
          <div>
            <Label>Payment Method <span className="text-error-500">*</span></Label>
            <select
              value={paymentForm.method}
              onChange={(e) => setPaymentForm(prev => ({ ...prev, method: e.target.value }))}
              className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="transfer">Bank Transfer</option>
              <option value="cheque">Cheque</option>
            </select>
          </div>
          <div>
            <Label>Payment Date</Label>
            <Input
              type="date"
              value={paymentForm.date}
              onChange={(e) => setPaymentForm(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>
          <div>
            <Label>Reference Number</Label>
            <Input
              placeholder="Cheque / Transfer reference..."
              value={paymentForm.reference}
              onChange={(e) => setPaymentForm(prev => ({ ...prev, reference: e.target.value }))}
            />
          </div>
        </div>
      </ConfirmModal>
    </>
  );
}
