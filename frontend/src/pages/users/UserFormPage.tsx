import { useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Checkbox from "../../components/form/input/Checkbox";

export default function UserFormPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "salesman",
    is_active: true,
  });

  const updateField = (field: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Add User" items={[{ label: "Settings" }, { label: "Users", href: "/users" }, { label: "New" }]} />
      <ComponentCard title="User Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Full Name <span className="text-error-500">*</span></Label>
            <Input
              placeholder="User full name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>
          <div>
            <Label>Username <span className="text-error-500">*</span></Label>
            <Input
              placeholder="Login username"
              value={form.username}
              onChange={(e) => updateField("username", e.target.value)}
            />
          </div>
          <div>
            <Label>Email <span className="text-error-500">*</span></Label>
            <Input
              type="email"
              placeholder="user@alkhanjry.com"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>
          <div>
            <Label>Password <span className="text-error-500">*</span></Label>
            <Input
              type="password"
              placeholder="Minimum 8 characters"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
            />
          </div>
          <div>
            <Label>Role <span className="text-error-500">*</span></Label>
            <select
              value={form.role}
              onChange={(e) => updateField("role", e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option value="salesman">Salesman</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex items-center">
            <Checkbox
              label="Active User"
              checked={form.is_active}
              onChange={(checked) => updateField("is_active", checked)}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          <Button onClick={() => navigate("/users")}>Save User</Button>
          <Button variant="outline" onClick={() => navigate("/users")}>Cancel</Button>
        </div>
      </ComponentCard>
    </>
  );
}
