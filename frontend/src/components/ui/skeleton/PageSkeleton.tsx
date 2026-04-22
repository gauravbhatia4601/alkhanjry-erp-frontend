export default function PageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb placeholder */}
      <div className="h-8 w-48 bg-gray-200 dark:bg-white/[0.05] rounded-md mb-6"></div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="h-64 bg-gray-100 dark:bg-white/[0.03] rounded-2xl border border-gray-200 dark:border-gray-800"></div>
          <div className="h-64 bg-gray-100 dark:bg-white/[0.03] rounded-2xl border border-gray-200 dark:border-gray-800"></div>
        </div>
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="h-48 bg-gray-100 dark:bg-white/[0.03] rounded-2xl border border-gray-200 dark:border-gray-800"></div>
          <div className="h-48 bg-gray-100 dark:bg-white/[0.03] rounded-2xl border border-gray-200 dark:border-gray-800"></div>
        </div>
      </div>
    </div>
  );
}
