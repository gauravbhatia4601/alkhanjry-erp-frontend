import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-brand-500">404</h1>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
