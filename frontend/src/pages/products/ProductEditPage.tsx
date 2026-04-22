import { useState } from "react";
import { useNavigate, useParams } from "react-router";
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

const dummyProducts = [
  { id: 1, item_code: "BRK-001", name: "Brake Pad Toyota Hilux", category_id: 1, description: "Genuine brake pads for Hilux", selling_price: 125.0, purchase_price: 80.0, min_stock: 10, current_stock: 3, supplier_id: 1, vat: true, is_active: true },
  { id: 2, item_code: "FIL-023", name: "Engine Oil Filter (Genuine)", category_id: 2, description: "OEM oil filter", selling_price: 45.0, purchase_price: 28.0, min_stock: 15, current_stock: 5, supplier_id: 2, vat: true, is_active: true },
];

export default function ProductEditPage() {
  const prefix = useRoutePrefix();
  const navigate = useNavigate();
  const { id } = useParams();
  const product = dummyProducts.find(p => p.id === Number(id));

  if (!product) {
    return <div className="text-center py-10 text-gray-500">Product not found</div>;
  }

  const [form, setForm] = useState({
    item_code: product.item_code,
    name: product.name,
    category_id: String(product.category_id),
    description: product.description,
    selling_price: String(product.selling_price),
    purchase_price: String(product.purchase_price),
    min_stock: String(product.min_stock),
    current_stock: String(product.current_stock),
    supplier_id: String(product.supplier_id),
    vat: product.vat,
    is_active: product.is_active,
  });

  const updateField = (field: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Product" items={[{ label: "Inventory" }, { label: "Products", href: `${prefix}/products` }, { label: "Edit" }]} />
      <ComponentCard title={`Editing: ${product.name}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Item Code <span className="text-error-500">*</span></Label>
            <Input value={form.item_code} onChange={(e) => updateField("item_code", e.target.value)} />
          </div>
          <div>
            <Label>Product Name <span className="text-error-500">*</span></Label>
            <Input value={form.name} onChange={(e) => updateField("name", e.target.value)} />
          </div>
          <div>
            <Label>Category <span className="text-error-500">*</span></Label>
            <select value={form.category_id} onChange={(e) => updateField("category_id", e.target.value)} className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90">
              <option value="">Select category...</option>
              {dummyCategories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Supplier</Label>
            <select value={form.supplier_id} onChange={(e) => updateField("supplier_id", e.target.value)} className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90">
              <option value="">Select supplier...</option>
              {dummySuppliers.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <Label>Description</Label>
            <textarea rows={3} value={form.description} onChange={(e) => updateField("description", e.target.value)} className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
          </div>
          <div>
            <Label>Selling Price (AED) <span className="text-error-500">*</span></Label>
            <Input type="number" step="0.01" value={form.selling_price} onChange={(e) => updateField("selling_price", e.target.value)} />
          </div>
          <div>
            <Label>Purchase Price (AED) <span className="text-error-500">*</span></Label>
            <Input type="number" step="0.01" value={form.purchase_price} onChange={(e) => updateField("purchase_price", e.target.value)} />
          </div>
          <div>
            <Label>Minimum Stock Level</Label>
            <Input type="number" value={form.min_stock} onChange={(e) => updateField("min_stock", e.target.value)} />
          </div>
          <div>
            <Label>Current Stock</Label>
            <Input type="number" value={form.current_stock} onChange={(e) => updateField("current_stock", e.target.value)} />
          </div>
          <div className="flex items-center gap-6">
            <Checkbox label="VAT Applicable (5%)" checked={form.vat} onChange={(checked) => updateField("vat", checked)} />
            <Checkbox label="Active Product" checked={form.is_active} onChange={(checked) => updateField("is_active", checked)} />
          </div>
        </div>
        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          <Button onClick={() => navigate(`${prefix}/products`)}>Update Product</Button>
          <Button variant="outline" onClick={() => navigate(`${prefix}/products`)}>Cancel</Button>
        </div>
      </ComponentCard>
    </>
  );
}
