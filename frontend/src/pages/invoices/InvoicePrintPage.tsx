import { useParams, useNavigate } from "react-router";
import useRoutePrefix from "../../hooks/useRoutePrefix";

const dummyInvoice = {
  invoice_number: "INV-000145",
  invoice_date: "2026-04-21",
  customer: "Ali Hassan",
  phone: "+968 9123 4567",
  vehicle_details: "Toyota Hilux 2020",
  salesman: "Mohammed",
  sub_total: 1190.48,
  vat_total: 59.52,
  grand_total: 1250.0,
  amount_paid: 0,
  outstanding_balance: 1250.0,
  payment_status: "pending",
  items: [
    { id: 1, name: "Brake Pad Toyota Hilux", code: "BRK-001", qty: 2, unit_price: 125.0, is_vat: true, vat_amount: 12.5, line_total: 250.0 },
    { id: 2, name: "Engine Oil 10W-40 Castrol 4L", code: "ENG-001", qty: 1, unit_price: 50.0, is_vat: true, vat_amount: 2.5, line_total: 50.0 },
    { id: 3, name: "Wiper Blade 24\" Bosch", code: "WIP-045", qty: 2, unit_price: 35.0, is_vat: false, vat_amount: 0, line_total: 70.0 },
    { id: 4, name: "Battery 12V 70Ah Amaron", code: "BAT-005", qty: 1, unit_price: 150.0, is_vat: true, vat_amount: 7.5, line_total: 150.0 },
  ],
};

export default function InvoicePrintPage() {
  const prefix = useRoutePrefix();
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="print-page">
      {/* Floating toolbar — hidden on print */}
      <div className="no-print fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white/90 backdrop-blur rounded-full shadow-lg border border-gray-200 px-5 py-2.5 print:hidden">
        <button
          onClick={() => window.print()}
          className="text-sm font-medium text-gray-800 hover:text-brand-600 transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print / Save PDF
        </button>
        <span className="w-px h-4 bg-gray-300"></span>
        <button
          onClick={() => navigate(`${prefix}/invoices/${id}`)}
          className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
        >
          Back
        </button>
      </div>

      <div className="a4-page">
        {/* Company Header */}
        <div className="doc-header flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Al Khanjry Spare Parts LLC</h1>
            <p className="text-sm text-gray-600">Muscat, Oman &nbsp;|&nbsp; CR: 12345678</p>
            <p className="text-sm text-gray-600">Tel: +968 24 123 456 &nbsp;|&nbsp; Email: info@alkhanjry.com</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900">TAX INVOICE</p>
            <p className="text-lg font-semibold text-gray-700">{dummyInvoice.invoice_number}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="doc-meta">
          <div className="doc-meta-block">
            <strong>Bill To</strong>
            <p>{dummyInvoice.customer}</p>
            <p>{dummyInvoice.phone}</p>
          </div>
          <div className="doc-meta-block text-right">
            <strong>Invoice Details</strong>
            <p>Date: {dummyInvoice.invoice_date}</p>
            <p>Vehicle: {dummyInvoice.vehicle_details || "N/A"}</p>
            <p>Salesman: {dummyInvoice.salesman}</p>
          </div>
        </div>

        {/* Line Items */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Code</th>
              <th className="text-right">Qty</th>
              <th className="text-right">Unit Price (AED)</th>
              <th className="text-right">VAT (AED)</th>
              <th className="text-right">Amount (AED)</th>
            </tr>
          </thead>
          <tbody>
            {dummyInvoice.items.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.code}</td>
                <td className="text-right">{item.qty}</td>
                <td className="text-right">{item.unit_price.toFixed(2)}</td>
                <td className="text-right">{item.vat_amount.toFixed(2)}</td>
                <td className="text-right">{(item.line_total + item.vat_amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="totals">
          <div className="totals-row">
            <span>Sub Total:</span>
            <span>{dummyInvoice.sub_total.toFixed(2)} AED</span>
          </div>
          <div className="totals-row">
            <span>VAT (5%):</span>
            <span>{dummyInvoice.vat_total.toFixed(2)} AED</span>
          </div>
          <div className="totals-row grand-total">
            <span>Grand Total:</span>
            <span>{dummyInvoice.grand_total.toFixed(2)} AED</span>
          </div>
          {dummyInvoice.amount_paid > 0 && (
            <div className="totals-row">
              <span>Amount Paid:</span>
              <span>{dummyInvoice.amount_paid.toFixed(2)} AED</span>
            </div>
          )}
          {dummyInvoice.amount_paid < dummyInvoice.grand_total && (
            <div className="totals-row">
              <span>Outstanding:</span>
              <span>{dummyInvoice.outstanding_balance.toFixed(2)} AED</span>
            </div>
          )}
        </div>

        {/* Payment Info & QR placeholder */}
        <div className="doc-meta mt-6">
          <div className="doc-meta-block">
            <strong>Payment Status</strong>
            <p className="capitalize">{dummyInvoice.payment_status.replace("_", " ")}</p>
          </div>
          <div className="doc-meta-block text-right">
            <strong>Authorized Signature</strong>
            <p className="mt-4 border-t border-gray-400 w-40 ml-auto"></p>
          </div>
        </div>

        <p className="doc-footer">
          Thank you for your business! &nbsp;|&nbsp; Al Khanjry Spare Parts LLC
        </p>
      </div>
    </div>
  );
}
