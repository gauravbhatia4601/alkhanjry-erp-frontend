import { useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";

export default function CategoryFormPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Add Category" items={[{ label: "Inventory" }, { label: "Categories", href: "/categories" }, { label: "New" }]} />
      <ComponentCard title="Category Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Category Name <span className="text-error-500">*</span></Label>
            <Input
              placeholder="e.g. Brakes, Filters"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Description</Label>
            <textarea
              rows={3}
              placeholder="Brief description of this category..."
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          <Button onClick={() => navigate("/categories")}>Save Category</Button>
          <Button variant="outline" onClick={() => navigate("/categories")}>Cancel</Button>
        </div>
      </ComponentCard>
    </>
  );
}
