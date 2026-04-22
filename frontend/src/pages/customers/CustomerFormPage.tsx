import { useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import useRoutePrefix from "../../hooks/useRoutePrefix";

export default function CustomerFormPage() {
  const prefix = useRoutePrefix();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle_make: "",
    vehicle_model: "",
    vehicle_year: "",
    notes: "",
  });

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Add Customer" items={[{ label: "CRM" }, { label: "Customers", href: `${prefix}/customers` }, { label: "New" }]} />
      <ComponentCard title="Customer Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Full Name <span className="text-error-500">*</span></Label>
            <Input
              placeholder="Customer full name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
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
              placeholder="customer@email.com"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>
          <div>
            <Label>Vehicle Make</Label>
            <Input
              placeholder="e.g. Toyota, Nissan"
              value={form.vehicle_make}
              onChange={(e) => updateField("vehicle_make", e.target.value)}
            />
          </div>
          <div>
            <Label>Vehicle Model</Label>
            <Input
              placeholder="e.g. Hilux, Patrol"
              value={form.vehicle_model}
              onChange={(e) => updateField("vehicle_model", e.target.value)}
            />
          </div>
          <div>
            <Label>Vehicle Year</Label>
            <Input
              type="number"
              placeholder="e.g. 2020"
              value={form.vehicle_year}
              onChange={(e) => updateField("vehicle_year", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Notes</Label>
            <textarea
              rows={3}
              placeholder="Additional notes..."
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          <Button onClick={() => navigate(`${prefix}/customers`)}>Save Customer</Button>
          <Button variant="outline" onClick={() => navigate(`${prefix}/customers`)}>Cancel</Button>
        </div>
      </ComponentCard>
    </>
  );
}
