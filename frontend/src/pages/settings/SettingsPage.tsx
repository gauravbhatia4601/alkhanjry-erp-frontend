import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Checkbox from "../../components/form/input/Checkbox";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Admin User",
    username: "admin",
    email: "admin@alkhanjry.com",
    phone: "+968 9123 4567",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [preferences, setPreferences] = useState({
    email_notifications: true,
    low_stock_alerts: true,
    daily_summary: false,
  });

  const [business, setBusiness] = useState({
    shop_name: "Al Khanjry Spare Parts",
    address: "Ruwi, Muscat, Oman",
    vat_number: "OM1234567890",
    phone: "+968 2456 7890",
  });

  return (
    <>
      <PageBreadcrumb pageTitle="Settings" items={[{ label: "System" }, { label: "Settings" }]} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ComponentCard title="Business Profile">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Shop Name</Label>
                <Input
                  value={business.shop_name}
                  onChange={(e) => setBusiness(prev => ({ ...prev, shop_name: e.target.value }))}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={business.phone}
                  onChange={(e) => setBusiness(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <Label>VAT Number</Label>
                <Input
                  value={business.vat_number}
                  onChange={(e) => setBusiness(prev => ({ ...prev, vat_number: e.target.value }))}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Address</Label>
                <textarea
                  rows={3}
                  value={business.address}
                  onChange={(e) => setBusiness(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                />
              </div>
            </div>
            <div className="mt-6">
              <Button size="sm">Update Business Profile</Button>
            </div>
          </ComponentCard>

          <ComponentCard title="My Profile">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label>Username</Label>
                <Input
                  value={profile.username}
                  disabled
                  readOnly
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>
            <div className="mt-6">
              <Button size="sm">Update Profile</Button>
            </div>
          </ComponentCard>

          <ComponentCard title="Change Password">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Current Password</Label>
                <Input
                  type="password"
                  value={password.current}
                  onChange={(e) => setPassword(prev => ({ ...prev, current: e.target.value }))}
                />
              </div>
              <div>
                <Label>New Password</Label>
                <Input
                  type="password"
                  value={password.new}
                  onChange={(e) => setPassword(prev => ({ ...prev, new: e.target.value }))}
                />
              </div>
              <div>
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  value={password.confirm}
                  onChange={(e) => setPassword(prev => ({ ...prev, confirm: e.target.value }))}
                />
              </div>
            </div>
            <div className="mt-6">
              <Button size="sm">Change Password</Button>
            </div>
          </ComponentCard>
        </div>

        <div className="space-y-6">
          <ComponentCard title="Notifications">
            <div className="space-y-4">
              <Checkbox
                label="Email Notifications"
                checked={preferences.email_notifications}
                onChange={(checked) => setPreferences(prev => ({ ...prev, email_notifications: checked }))}
              />
              <Checkbox
                label="Low Stock Alerts"
                checked={preferences.low_stock_alerts}
                onChange={(checked) => setPreferences(prev => ({ ...prev, low_stock_alerts: checked }))}
              />
              <Checkbox
                label="Daily Summary"
                checked={preferences.daily_summary}
                onChange={(checked) => setPreferences(prev => ({ ...prev, daily_summary: checked }))}
              />
            </div>
            <div className="mt-6">
              <Button size="sm">Save Preferences</Button>
            </div>
          </ComponentCard>

          <ComponentCard title="System Info">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Version</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Build Date</span>
                <span className="font-medium">2026-04-21</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Environment</span>
                <span className="font-medium">Production</span>
              </div>
            </div>
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
