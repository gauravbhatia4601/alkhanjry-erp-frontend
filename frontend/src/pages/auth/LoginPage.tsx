import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import PasswordInput from "../../components/form/input/PasswordInput";
import Label from "../../components/form/Label";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [loginError, setLoginError] = useState("");
  const { login, isAuthenticated, user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Already authenticated — redirect to home (router handles role-based routing)
  if (isAuthenticated && user) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (data: LoginFormData) => {
    setLoginError("");
    const result = await login(data.email, data.password);
    if (result.success) {
      // Navigate handled by re-render (isAuthenticated becomes true)
    } else {
      setLoginError(result.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Al Khanjry</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">ERP System</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">
              Sign In
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Enter your credentials to access the system
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label>
                Email <span className="text-error-500">*</span>
              </Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="admin@alkhanjry.com"
                error={!!errors.email}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-error-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label>
                Password <span className="text-error-500">*</span>
              </Label>
              <PasswordInput
                {...register("password")}
                placeholder="Enter your password"
                error={errors.password?.message}
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-error-50 border border-error-200">
                <p className="text-sm text-error-600">{loginError}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="md"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Al Khanjry Transport. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative flex flex-col items-center justify-center w-full h-full px-12 text-center">
          <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mb-8">
            <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Spare Parts Management
          </h2>

          <p className="text-lg text-gray-400 max-w-md">
            A comprehensive ERP solution for inventory, sales, invoicing, and financial tracking.
          </p>

          <div className="mt-12 flex items-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">VAT 5%</p>
              <p className="text-sm text-gray-400">Compliant</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">Real-time</p>
              <p className="text-sm text-gray-400">Inventory</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">PDF/Excel</p>
              <p className="text-sm text-gray-400">Reports</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
