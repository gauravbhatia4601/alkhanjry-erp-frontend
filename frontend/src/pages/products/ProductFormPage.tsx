import { useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Checkbox from "../../components/form/input/Checkbox";
import useRoutePrefix from "../../hooks/useRoutePrefix";

const dummyCategories = [
  { id: 1, name: "Brakes" },
  { id: 2, name: "Filters" },
  { id: 3, name: "Engine Oil" },
  { id: 4, name: "Electrical" },
  { id: 5, name: "Ignition" },
  { id: 6, name: "Belts" },
  { id: 7, name: "Wipers" },
  { id: 8, name: "Cooling" },
  { id: 9, name: "Suspension" },
];

const dummySuppliers = [
  { id: 1, name: "Gulf Auto Parts LLC" },
  { id: 2, name: "Toyota Genuine Parts" },
  { id: 3, name: "Bosch Middle East" },
  { id: 4, name: "Castrol Oman" },
];

export default function ProductFormPage() {
  const prefix = useRoutePrefix();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    item_code: "",
    name: "",
    category_id: "",
    description: "",
    selling_price: "",
    purchase_price: "",
    min_stock: "10",
    current_stock: "0",
    supplier_id: "",
    vat: true,
    is_active: true,
  });

  const updateField = (field: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Add Product" items={[{ label: "Inventory" }, { label: "Products", href: `${prefix}/products` }, { label: "New" }]} />
      <ComponentCard title="Product Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Item Code <span className="text-error-500">*</span></Label>
            <Input
              placeholder="e.g. BRK-001"
              value={form.item_code}
              onChange={(e) => updateField("item_code", e.target.value)}
            />
          </div>
          <div>
            <Label>Product Name <span className="text-error-500">*</span></Label>
            <Input
              placeholder="e.g. Brake Pad Toyota Hilux"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>
          <div>
            <Label>Category <span className="text-error-500">*</span></Label>
            <select
              value={form.category_id}
              onChange={(e) => updateField("category_id", e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option value="">Select category...</option>
              {dummyCategories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Supplier</Label>
            <select
              value={form.supplier_id}
              onChange={(e) => updateField("supplier_id", e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option value="">Select supplier...</option>
              {dummySuppliers.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <Label>Description</Label>
            <textarea
              rows={3}
              placeholder="Product description..."
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            />
          </div>
          <div>
            <Label>Selling Price (AED) <span className="text-error-500">*</span></Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={form.selling_price}
              onChange={(e) => updateField("selling_price", e.target.value)}
            />
          </div>
          <div>
            <Label>Purchase Price (AED) <span className="text-error-500">*</span></Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={form.purchase_price}
              onChange={(e) => updateField("purchase_price", e.target.value)}
            />
          </div>
          <div>
            <Label>Minimum Stock Level</Label>
            <Input
              type="number"
              value={form.min_stock}
              onChange={(e) => updateField("min_stock", e.target.value)}
            />
          </div>
          <div>
            <Label>Current Stock</Label>
            <Input
              type="number"
              value={form.current_stock}
              onChange={(e) => updateField("current_stock", e.target.value)}
            />
          </div>
          <div className="flex items-center gap-6">
            <Checkbox
              label="VAT Applicable (5%)"
              checked={form.vat}
              onChange={(checked) => updateField("vat", checked)}
            />
            <Checkbox
              label="Active Product"
              checked={form.is_active}
              onChange={(checked) => updateField("is_active", checked)}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          <Button onClick={() => navigate(`${prefix}/products`)}>Save Product</Button>
          <Button variant="outline" onClick={() => navigate(`${prefix}/products`)}>Cancel</Button>
        </div>
      </ComponentCard>
    </>
  );
}
