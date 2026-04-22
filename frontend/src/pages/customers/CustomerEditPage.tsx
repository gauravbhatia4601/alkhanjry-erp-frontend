import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import useRoutePrefix from "../../hooks/useRoutePrefix";

const dummyCustomers = [
  { id: 1, name: "Ali Hassan", phone: "+968 9123 4567", email: "ali.hassan@email.com", vehicle_make: "Toyota", vehicle_model: "Hilux", vehicle_year: "2020", notes: "" },
  { id: 2, name: "Mohammed Saeed", phone: "+968 9234 5678", email: "", vehicle_make: "Nissan", vehicle_model: "Patrol", vehicle_year: "2019", notes: "" },
];

export default function CustomerEditPage() {
  const prefix = useRoutePrefix();
  const navigate = useNavigate();
  const { id } = useParams();
  const customer = dummyCustomers.find(c => c.id === Number(id));

  if (!customer) {
    return <div className="text-center py-10 text-gray-500">Customer not found</div>;
  }

  const [form, setForm] = useState({
    name: customer.name,
    phone: customer.phone,
    email: customer.email,
    vehicle_make: customer.vehicle_make,
    vehicle_model: customer.vehicle_model,
    vehicle_year: customer.vehicle_year,
    notes: customer.notes,
  });

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Customer" items={[{ label: "CRM" }, { label: "Customers", href: `${prefix}/customers` }, { label: "Edit" }]} />
      <ComponentCard title={`Editing: ${customer.name}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Full Name <span className="text-error-500">*</span></Label>
            <Input value={form.name} onChange={(e) => updateField("name", e.target.value)} />
          </div>
          <div>
            <Label>Phone Number <span className="text-error-500">*</span></Label>
            <Input type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
          </div>
          <div>
            <Label>Vehicle Make</Label>
            <Input value={form.vehicle_make} onChange={(e) => updateField("vehicle_make", e.target.value)} />
          </div>
          <div>
            <Label>Vehicle Model</Label>
            <Input value={form.vehicle_model} onChange={(e) => updateField("vehicle_model", e.target.value)} />
          </div>
          <div>
            <Label>Vehicle Year</Label>
            <Input type="number" value={form.vehicle_year} onChange={(e) => updateField("vehicle_year", e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label>Notes</Label>
            <textarea rows={3} value={form.notes} onChange={(e) => updateField("notes", e.target.value)} className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
          </div>
        </div>
        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          <Button onClick={() => navigate(`${prefix}/customers`)}>Update Customer</Button>
          <Button variant="outline" onClick={() => navigate(`${prefix}/customers`)}>Cancel</Button>
        </div>
      </ComponentCard>
    </>
  );
}
