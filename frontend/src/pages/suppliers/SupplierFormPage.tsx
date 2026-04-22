import { useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Checkbox from "../../components/form/input/Checkbox";

export default function SupplierFormPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    contact_person: "",
    is_active: true,
  });

  const updateField = (field: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Add Supplier" items={[{ label: "Inventory" }, { label: "Suppliers", href: "/suppliers" }, { label: "New" }]} />
      <ComponentCard title="Supplier Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Supplier Name <span className="text-error-500">*</span></Label>
            <Input
              placeholder="Company or business name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>
          <div>
            <Label>Contact Person</Label>
            <Input
              placeholder="Primary contact name"
              value={form.contact_person}
              onChange={(e) => updateField("contact_person", e.target.value)}
            />
          </div>
          <div>
            <Label>Phone Number <span className="text-error-500">*</span></Label>
            <Input
              type="tel"
              placeholder="+968 XXXX XXXX"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="supplier@email.com"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Address</Label>
            <textarea
              rows={3}
              placeholder="Full address..."
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            />
          </div>
          <div className="flex items-center">
            <Checkbox
              label="Active Supplier"
              checked={form.is_active}
              onChange={(checked) => updateField("is_active", checked)}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          <Button onClick={() => navigate("/suppliers")}>Save Supplier</Button>
          <Button variant="outline" onClick={() => navigate("/suppliers")}>Cancel</Button>
        </div>
      </ComponentCard>
    </>
  );
}
