import { useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import useRoutePrefix from "../../hooks/useRoutePrefix";

const dummyCustomers = [
  { id: 1, name: "Ali Hassan", phone: "+968 9123 4567", vehicle: "Toyota Hilux 2020" },
  { id: 2, name: "Mohammed Saeed", phone: "+968 9234 5678", vehicle: "Nissan Patrol 2019" },
  { id: 3, name: "Salem Al-Balushi", phone: "+968 9345 6789", vehicle: "Mitsubishi L200 2021" },
  { id: 4, name: "Rashid Transport", phone: "+968 9456 7890", vehicle: "Fleet - Multiple" },
];

const dummyProducts = [
  { id: 1, code: "BRK-001", name: "Brake Pad Toyota Hilux", price: 125.0, vat: true, stock: 3 },
  { id: 2, code: "FIL-023", name: "Engine Oil Filter", price: 45.0, vat: true, stock: 5 },
  { id: 3, code: "ENG-001", name: "Engine Oil 10W-40 Castrol 4L", price: 50.0, vat: true, stock: 24 },
  { id: 4, code: "BAT-005", name: "Battery 12V 70Ah Amaron", price: 150.0, vat: true, stock: 18 },
  { id: 5, code: "SPK-007", name: "Spark Plug NGK Iridium", price: 35.0, vat: true, stock: 2 },
  { id: 6, code: "BEL-012", name: "Timing Belt - Mitsubishi L200", price: 180.0, vat: true, stock: 4 },
  { id: 7, code: "WIP-045", name: "Wiper Blade 24\" Bosch", price: 35.0, vat: false, stock: 1 },
  { id: 8, code: "RAD-003", name: "Radiator Coolant 4L", price: 35.0, vat: true, stock: 15 },
  { id: 9, code: "AFI-002", name: "Air Filter HEPA Grade", price: 40.0, vat: true, stock: 22 },
  { id: 10, code: "SHK-001", name: "Shock Absorber Front - Nissan", price: 220.0, vat: true, stock: 8 },
];

interface QuotationItem {
  id: number;
  productId: number;
  name: string;
  code: string;
  qty: number;
  unitPrice: number;
  isVat: boolean;
  lineTotal: number;
  vatAmount: number;
  lineGrandTotal: number;
}

export default function QuotationFormPage() {
  const prefix = useRoutePrefix();
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState("");
  const [validityDays, setValidityDays] = useState("7");
  const [items, setItems] = useState<QuotationItem[]>([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [itemSearchResults, setItemSearchResults] = useState<typeof dummyProducts>([]);

  const subTotal = items.reduce((s, i) => s + i.lineTotal, 0);
  const vatTotal = items.reduce((s, i) => s + i.vatAmount, 0);
  const grandTotal = subTotal + vatTotal;

  const searchItems = (term: string) => {
    setSearchProduct(term);
    if (!term.trim()) {
      setItemSearchResults([]);
      return;
    }
    setItemSearchResults(dummyProducts.filter(p =>
      p.name.toLowerCase().includes(term.toLowerCase()) ||
      p.code.toLowerCase().includes(term.toLowerCase())
    ));
  };

  const addItem = (product: typeof dummyProducts[0]) => {
    if (items.some(i => i.productId === product.id)) return;
    const qty = 1;
    const lineTotal = qty * product.price;
    const vatAmount = product.vat ? lineTotal * 0.05 : 0;
    const lineGrandTotal = lineTotal + vatAmount;
    setItems([...items, {
      id: Date.now(),
      productId: product.id,
      name: product.name,
      code: product.code,
      qty,
      unitPrice: product.price,
      isVat: product.vat,
      lineTotal,
      vatAmount,
      lineGrandTotal,
    }]);
    setSearchProduct("");
    setItemSearchResults([]);
  };

  const updateItemQty = (id: number, newQty: number) => {
    if (newQty < 1) return;
    const product = dummyProducts.find(p => p.id === items.find(i => i.id === id)?.productId);
    if (product && newQty > product.stock) return;
    setItems(items.map(i => {
      if (i.id !== id) return i;
      const lineTotal = newQty * i.unitPrice;
      const vatAmount = i.isVat ? lineTotal * 0.05 : 0;
      return { ...i, qty: newQty, lineTotal, vatAmount, lineGrandTotal: lineTotal + vatAmount };
    }));
  };

  const removeItem = (id: number) => setItems(items.filter(i => i.id !== id));

  const handleCustomerChange = (value: string) => {
    setCustomerId(value);
    const customer = dummyCustomers.find(c => c.id === Number(value));
    if (customer) setVehicleDetails(customer.vehicle);
  };

  return (
    <>
      <PageBreadcrumb pageTitle="New Quotation" items={[{ label: "Sales" }, { label: "Quotations", href: `${prefix}/quotations` }, { label: "New" }]} />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 lg:col-span-8">
          <ComponentCard title="Quotation Items">
            <div className="relative mb-4">
              <Label>Add Products</Label>
              <Input
                placeholder="Search by name or SKU..."
                value={searchProduct}
                onChange={(e) => searchItems(e.target.value)}
              />
              {itemSearchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-56 overflow-y-auto">
                  {itemSearchResults.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => addItem(p)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800 last:border-0"
                    >
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-800 dark:text-white/90">{p.name}</span>
                        <span className="text-sm text-gray-500">{p.price.toFixed(2)} AED</span>
                      </div>
                      <p className="text-xs text-gray-400">{p.code} — Stock: {p.stock}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 ? (
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.code} — VAT: {item.isVat ? "5%" : "0%"}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateItemQty(item.id, item.qty - 1)}
                            className="w-7 h-7 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) => updateItemQty(item.id, parseInt(e.target.value) || 1)}
                            className="w-12 h-7 text-center text-sm rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                          />
                          <button
                            onClick={() => updateItemQty(item.id, item.qty + 1)}
                            className="w-7 h-7 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90 w-24 text-right">
                          {item.lineGrandTotal.toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-7 h-7 text-error-500 hover:text-error-600"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                <p className="text-gray-500">No items added yet. Search and select products above.</p>
              </div>
            )}
          </ComponentCard>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <ComponentCard title="Quotation Details">
            <div className="space-y-4">
              <div>
                <Label>Customer <span className="text-error-500">*</span></Label>
                <select
                  value={customerId}
                  onChange={(e) => handleCustomerChange(e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                >
                  <option value="">Select a customer...</option>
                  {dummyCustomers.map((c) => (
                    <option key={c.id} value={c.id}>{c.name} — {c.phone}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Vehicle Details</Label>
                <Input
                  placeholder="Vehicle make, model, year..."
                  value={vehicleDetails}
                  onChange={(e) => setVehicleDetails(e.target.value)}
                />
              </div>

              <div>
                <Label>Validity (Days)</Label>
                <Input
                  type="number"
                  value={validityDays}
                  onChange={(e) => setValidityDays(e.target.value)}
                  min={1}
                  max={90}
                />
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Sub Total</span>
                  <span>{subTotal.toFixed(2)} AED</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>VAT (5%)</span>
                  <span>{vatTotal.toFixed(2)} AED</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <span>Grand Total</span>
                  <span>{grandTotal.toFixed(2)} AED</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="w-full">Save Quotation</Button>
                <Button variant="outline" onClick={() => navigate(`${prefix}/quotations`)}>Cancel</Button>
              </div>
            </div>
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
