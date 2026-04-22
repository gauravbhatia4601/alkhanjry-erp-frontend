import { useState } from "react";
import { useNavigate } from "react-router";
import { useToast } from "../../context/ToastContext";
import useLoading from "../../hooks/useLoading";
import PageSkeleton from "../../components/ui/skeleton/PageSkeleton";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import useRoutePrefix from "../../hooks/useRoutePrefix";

const dummyProducts = [
  { id: 1, item_code: "BRK-001", name: "Brake Pad Toyota Hilux", stock: 3 },
  { id: 2, item_code: "FIL-023", name: "Engine Oil Filter (Genuine)", stock: 5 },
  { id: 3, item_code: "ENG-001", name: "Engine Oil 10W-40 Castrol 4L", stock: 24 },
  { id: 4, item_code: "BAT-005", name: "Battery 12V 70Ah Amaron", stock: 18 },
];

const dummySuppliers = [
  { id: 1, name: "Gulf Auto Parts LLC" },
  { id: 2, name: "Toyota Genuine Parts" },
  { id: 3, name: "Bosch Middle East" },
];

export default function StockAdjustmentPage() {
  const prefix = useRoutePrefix();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const isLoading = useLoading([]);

  const [productId, setProductId] = useState("");
  const [adjustmentType, setAdjustmentType] = useState("in");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");

  if (isLoading) {
    return <PageSkeleton />;
  }

  const handleSubmit = () => {
    console.log("Stock adjustment:", {
      productId,
      adjustmentType,
      quantity,
      reason,
      supplierId,
      purchasePrice,
    });
    showToast("Stock adjustment saved successfully", "success");
    navigate(`${prefix}/stock-movements`);
  };

  const showSupplier = adjustmentType === "in";
  const requireReason = adjustmentType === "adjustment";

  return (
    <>
      <PageBreadcrumb pageTitle="Stock Adjustment" items={[{ label: "Inventory" }, { label: "Stock Movements", href: `${prefix}/stock-movements` }, { label: "Adjust" }]} />

      <ComponentCard title="Adjust Stock Levels">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Label>Product <span className="text-error-500">*</span></Label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option value="">Select a product...</option>
              {dummyProducts.map((p) => (
                <option key={p.id} value={p.id}>{p.item_code} — {p.name} (Stock: {p.stock})</option>
              ))}
            </select>
          </div>

          <div>
            <Label>Adjustment Type <span className="text-error-500">*</span></Label>
            <select
              value={adjustmentType}
              onChange={(e) => setAdjustmentType(e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option value="in">Stock In (+)</option>
              <option value="out">Stock Out (-)</option>
              <option value="adjustment">Adjustment (Set New)</option>
            </select>
          </div>

          <div>
            <Label>Quantity <span className="text-error-500">*</span></Label>
            <Input
              type="number"
              min={1}
              placeholder="Enter quantity..."
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          {showSupplier && (
            <>
              <div>
                <Label>Supplier <span className="text-error-500">*</span></Label>
                <select
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                >
                  <option value="">Select supplier...</option>
                  {dummySuppliers.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Purchase Price (AED) <span className="text-error-500">*</span></Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="md:col-span-2">
            <Label>Reason {requireReason && <span className="text-error-500">*</span>}</Label>
            <textarea
              rows={3}
              placeholder={adjustmentType === "adjustment" ? "Required: Explain why stock is being adjusted..." : "Optional: Reason for this adjustment..."}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          <Button onClick={handleSubmit}>Save Adjustment</Button>
          <Button variant="outline" onClick={() => navigate(`${prefix}/stock-movements`)}>Cancel</Button>
        </div>
      </ComponentCard>
    </>
  );
}
