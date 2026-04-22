import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Checkbox from "../../components/form/input/Checkbox";

const dummyUsers = [
  { id: 1, name: "Admin User", username: "admin", email: "admin@alkhanjry.com", role: "admin", is_active: true },
  { id: 2, name: "Mohammed Omar", username: "mohammed", email: "mohammed@alkhanjry.com", role: "salesman", is_active: true },
];

export default function UserEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = dummyUsers.find(u => u.id === Number(id));

  if (!user) {
    return <div className="text-center py-10 text-gray-500">User not found</div>;
  }

  const [form, setForm] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    is_active: user.is_active,
  });

  const updateField = (field: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Edit User" items={[{ label: "Settings" }, { label: "Users", href: "/users" }, { label: "Edit" }]} />
      <ComponentCard title={`Editing: ${user.name}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Full Name <span className="text-error-500">*</span></Label>
            <Input value={form.name} onChange={(e) => updateField("name", e.target.value)} />
          </div>
          <div>
            <Label>Username <span className="text-error-500">*</span></Label>
            <Input value={form.username} disabled readOnly className="opacity-50 cursor-not-allowed" />
          </div>
          <div>
            <Label>Email <span className="text-error-500">*</span></Label>
            <Input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
          </div>
          <div>
            <Label>Role <span className="text-error-500">*</span></Label>
            <select value={form.role} onChange={(e) => updateField("role", e.target.value)} className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90">
              <option value="salesman">Salesman</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex items-center">
            <Checkbox label="Active User" checked={form.is_active} onChange={(checked) => updateField("is_active", checked)} />
          </div>
        </div>
        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          <Button onClick={() => navigate("/users")}>Update User</Button>
          <Button variant="outline" onClick={() => navigate("/users")}>Cancel</Button>
        </div>
      </ComponentCard>
    </>
  );
}
