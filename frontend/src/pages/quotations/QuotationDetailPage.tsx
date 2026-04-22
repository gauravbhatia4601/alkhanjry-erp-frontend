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

const getStatusBadge = (s: string) => ({
  draft: { color: "light" as const, text: "Draft" },
  sent: { color: "info" as const, text: "Sent" },
  converted: { color: "success" as const, text: "Converted" },
  expired: { color: "error" as const, text: "Expired" },
}[s] || { color: "light" as const, text: s });

export default function QuotationDetailPage() {
  const prefix = useRoutePrefix();
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const isLoading = useLoading([id]);

  const [quotation, setQuotation] = useState({
    id: 42,
    quotation_number: "QT-000042",
    date: "2026-04-21",
    valid_until: "2026-04-28",
    customer: "Ali Hassan",
    phone: "+968 9123 4567",
    vehicle_details: "Toyota Hilux 2020",
    salesman: "Mohammed",
    status: "draft",
    sub_total: 1190.48,
    vat_total: 59.52,
    grand_total: 1250.0,
    items: [
      { id: 1, name: "Brake Pad Toyota Hilux", code: "BRK-001", qty: 2, unit_price: 125.0, is_vat: true, vat_amount: 12.5, line_total: 250.0 },
      { id: 2, name: "Engine Oil 10W-40 Castrol 4L", code: "ENG-001", qty: 1, unit_price: 50.0, is_vat: true, vat_amount: 2.5, line_total: 50.0 },
      { id: 3, name: "Wiper Blade 24\" Bosch", code: "WIP-045", qty: 2, unit_price: 35.0, is_vat: false, vat_amount: 0, line_total: 70.0 },
      { id: 4, name: "Battery 12V 70Ah Amaron", code: "BAT-005", qty: 1, unit_price: 150.0, is_vat: true, vat_amount: 7.5, line_total: 150.0 },
    ],
  });

  const [convertModalOpen, setConvertModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [amountPaid, setAmountPaid] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  if (isLoading) {
    return <PageSkeleton />;
  }

  const handleMarkSent = () => {
    setQuotation(prev => ({ ...prev, status: "sent" }));
    showToast("Quotation marked as sent", "info");
  };

  const handleConvert = () => {
    setQuotation(prev => ({ ...prev, status: "converted" }));
    setConvertModalOpen(false);
    showToast("Quotation converted to invoice", "success");
    navigate(`${prefix}/invoices`);
  };

  const handleDelete = () => {
    setDeleteModalOpen(false);
    showToast("Quotation deleted", "warning");
    navigate(`${prefix}/quotations`);
  };

  const isDraft = quotation.status === "draft";
  const isSent = quotation.status === "sent";
  const isConverted = quotation.status === "converted";
  const isExpired = quotation.status === "expired";

  return (
    <>
      <PageBreadcrumb
        pageTitle="Quotation Details"
        items={[{ label: "Sales" }, { label: "Quotations", href: `${prefix}/quotations` }, { label: `#${id}` }]}
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 lg:col-span-8">
          <ComponentCard title={quotation.quotation_number}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-500">Customer</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{quotation.customer}</p>
                <p className="text-sm text-gray-500">{quotation.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Vehicle</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{quotation.vehicle_details}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{quotation.date}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Valid Until</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{quotation.valid_until}</p>
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
                  {quotation.items.map((item) => (
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
                <span className="text-gray-800 dark:text-white/90">{quotation.sub_total.toFixed(2)} AED</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600 dark:text-gray-400">VAT (5%)</span>
                <span className="text-gray-800 dark:text-white/90">{quotation.vat_total.toFixed(2)} AED</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-gray-800 dark:text-white">Grand Total</span>
                <span>{quotation.grand_total.toFixed(2)} AED</span>
              </div>
            </div>
          </ComponentCard>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-4">
          <ComponentCard title="Actions">
            <div className="space-y-2">
              {(isDraft || isSent) && (
                <>
                  <Button className="w-full" onClick={() => setConvertModalOpen(true)}>Convert to Invoice</Button>
                  <Button variant="outline" className="w-full" onClick={handleMarkSent}>{isSent ? "Already Sent" : "Mark as Sent"}</Button>
                  <Button variant="outline" className="w-full" onClick={() => navigate(`/quotations/${id}/print`)}>Print Quotation</Button>
                  <Button variant="outline" className="w-full" onClick={() => navigate(`/quotations/${id}/print`)}>Download PDF</Button>
                  <Button variant="outline" className="w-full text-error-500 border-error-200 hover:bg-error-50" onClick={() => setDeleteModalOpen(true)}>Delete Quotation</Button>
                </>
              )}
              {isConverted && (
                <>
                  <Button variant="outline" className="w-full" disabled
>Already Converted</Button>
                  <Button variant="outline" className="w-full">View Invoice</Button>
                  <Button variant="outline" className="w-full">Print Quotation</Button>
                </>
              )}
              {isExpired && (
                <>
                  <Button variant="outline" className="w-full" disabled>Expired</Button>
                  <Button variant="outline" className="w-full text-error-500 border-error-200 hover:bg-error-50" onClick={() => setDeleteModalOpen(true)}>Delete Quotation</Button>
                </>
              )}
            </div>
          </ComponentCard>

          <ComponentCard title="Status">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Current Status</p>
                <div className="mt-1"><Badge size="sm" color={getStatusBadge(quotation.status).color}>{getStatusBadge(quotation.status).text}</Badge></div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Salesman</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{quotation.salesman}</p>
              </div>
            </div>
          </ComponentCard>
        </div>
      </div>

      {/* Convert to Invoice Modal */}
      <ConfirmModal
        isOpen={convertModalOpen}
        onClose={() => setConvertModalOpen(false)}
        onConfirm={handleConvert}
        title="Convert to Invoice"
        confirmText="Convert"
        confirmVariant="primary"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            This will create a new invoice based on this quotation. Stock will NOT be deducted until the invoice is confirmed.
          </p>
          <div>
            <Label>Payment Status <span className="text-error-500">*</span></Label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="partial">Partial</option>
              <option value="on_account">On Account</option>
            </select>
          </div>
          {paymentStatus === "partial" && (
            <div>
              <Label>Amount Paid (AED)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
              />
            </div>
          )}
        </div>
      </ConfirmModal>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Quotation"
        message="Are you sure you want to delete this quotation?"
        confirmVariant="destructive"
      />
    </>
  );
}
