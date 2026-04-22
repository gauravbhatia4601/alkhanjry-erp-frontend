import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";

const reportTypes = [
  { name: "Daily Sales", path: "daily-sales", filters: ["date"] },
  { name: "Monthly Sales", path: "monthly-sales", filters: ["month", "year"] },
  { name: "Sales by Salesman", path: "sales-by-salesman", filters: ["salesman", "date_range"] },
  { name: "Top-Selling Items", path: "top-selling-items", filters: ["period", "category"] },
  { name: "Current Stock", path: "current-stock", filters: ["category"] },
  { name: "Low Stock Items", path: "low-stock-items", filters: [] },
  { name: "Stock Movement", path: "stock-movement", filters: ["product", "date_range"] },
  { name: "Revenue Summary", path: "revenue-summary", filters: ["period"] },
  { name: "Pending Payments", path: "pending-payments", filters: ["customer", "date_range"] },
];

export default function ReportsPage() {
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const filtered = reportTypes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  // This page is the report selector. Each report would have its own sub-route.
  return (
    <>
      <PageBreadcrumb pageTitle="Reports" items={[{ label: "Analytics" }, { label: "Reports" }]} />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 lg:col-span-4">
          <ComponentCard title="Available Reports">
            <Input
              placeholder="Search reports..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4"
            />
            <div className="space-y-2">
              {filtered.map((r) => (
                <button
                  key={r.path}
                  onClick={() => setSelectedReport(r.path)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition ${
                    selectedReport === r.path
                      ? "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  {r.name}
                  <p className="text-xs text-gray-400 mt-0.5">
                    Filters: {r.filters.length > 0 ? r.filters.join(", ") : "None"}
                  </p>
                </button>
              ))}
            </div>
          </ComponentCard>
        </div>
        <div className="col-span-12 lg:col-span-8">
          {selectedReport ? (
            <ComponentCard title="Report Preview" desc={`Preview for ${selectedReport}`}>
              <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Report: {reportTypes.find(r => r.path === selectedReport)?.name}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Select filters and generate the report
                  </p>
                  <div className="flex gap-3 justify-center mt-4">
                    <Button size="sm" variant="outline">PDF</Button>
                    <Button size="sm" variant="outline">Excel</Button>
                    <Button size="sm">Generate</Button>
                  </div>
                </div>
              </div>
            </ComponentCard>
          ) : (
            <ComponentCard title="Report Preview" desc="Select a report from the left panel">
              <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                <p className="text-gray-400">Select a report to preview</p>
              </div>
            </ComponentCard>
          )}
        </div>
      </div>
    </>
  );
}
