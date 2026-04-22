import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Checkbox from "../../components/form/input/Checkbox";

const dummySuppliers = [
  { id: 1, name: "Gulf Auto Parts LLC", phone: "+968 2456 7890", email: "info@gulfautoparts.om", address: "Ruwi, Muscat", contact_person: "Ahmed", is_active: true },
  { id: 2, name: "Toyota Genuine Parts", phone: "+968 2201 3344", email: "parts@toyota.om", address: "Al Mawaleh, Muscat", contact_person: "Salem", is_active: true },
];

export default function SupplierEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const supplier = dummySuppliers.find(s => s.id === Number(id));

  if (!supplier) {
    return <div className="text-center py-10 text-gray-500">Supplier not found</div>;
  }

  const [form, setForm] = useState({
    name: supplier.name,
    phone: supplier.phone,
    email: supplier.email,
    address: supplier.address,
    contact_person: supplier.contact_person,
    is_active: supplier.is_active,
  });

  const updateField = (field: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Supplier" items={[{ label: "Inventory" }, { label: "Suppliers", href: "/suppliers" }, { label: "Edit" }]} />
      <ComponentCard title={`Editing: ${supplier.name}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Supplier Name <span className="text-error-500">*</span></Label>
            <Input value={form.name} onChange={(e) => updateField("name", e.target.value)} />
          </div>
          <div>
            <Label>Contact Person</Label>
            <Input value={form.contact_person} onChange={(e) => updateField("contact_person", e.target.value)} />
          </div>
          <div>
            <Label>Phone Number <span className="text-error-500">*</span></Label>
            <Input type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label>Address</Label>
            <textarea rows={3} value={form.address} onChange={(e) => updateField("address", e.target.value)} className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
          </div>
          <div className="flex items-center">
            <Checkbox label="Active Supplier" checked={form.is_active} onChange={(checked) => updateField("is_active", checked)} />
          </div>
        </div>
        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          <Button onClick={() => navigate("/suppliers")}>Update Supplier</Button>
          <Button variant="outline" onClick={() => navigate("/suppliers")}>Cancel</Button>
        </div>
      </ComponentCard>
    </>
  );
}
