import React, { useEffect, useState } from "react";
import { User, Lock, Bell, Shield } from "lucide-react";

const AccountSettings = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    profileCompleted: false,
    notifications: {
      email: true,
      whatsapp: true,
      promo: true,
    },
  });

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userId, setUserId] = useState(null);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  /* ================= USER LOCAL STORAGE CHECK ================= */

  useEffect(() => {
    fetch("http://localhost:5000/api/profile/get", { method: "POST" })
      .then((res) => res.json())
      .then((profile) => {
        if (profile) {
          setUserId(profile._id); // ✅ ADD THIS

          setForm((prev) => ({
            ...prev,
            name: profile.name || "",
            email: profile.email || "",
            phone:
              profile.phone || profile.mobile || profile.mobileNumber || "",
            profileCompleted: profile.profileCompleted ?? false,
          }));
        }
      })
      .catch(console.error);
  }, []);

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    setCheckingAuth(false);
  }, []);

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    fetch("http://localhost:5000/api/profile/get", { method: "POST" })
      .then((res) => res.json())
      .then((profile) => {
        if (profile) {
          setForm((prev) => ({
            ...prev,
            name: profile.name || "",
            email: profile.email || "",
            phone:
              profile.phone || profile.mobile || profile.mobileNumber || "",
            profileCompleted: profile.profileCompleted ?? false,
          }));
        }
      })
      .catch(console.error);
  }, []);

  if (checkingAuth) return null;

  /* ================= PASSWORD UPDATE ================= */
  const updatePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match");
      return;
    }

    await fetch("http://localhost:5000/api/account-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, password: passwords.new }),
    });

    alert("Password updated successfully");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  /* ================= NOTIFICATION TOGGLE ================= */
  const toggleNotification = (key) => {
    const updated = {
      ...form,
      notifications: {
        ...form.notifications,
        [key]: !form.notifications[key],
      },
    };

    setForm(updated);

    fetch("http://localhost:5000/api/account-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
  };

  /* ================= DELETE ACCOUNT ================= */
  const deactivateAccount = async () => {
    const confirmDelete = window.confirm(
      "Your account will be deleted after 7 days. You can recover it before that. Continue?",
    );
    if (!confirmDelete) return;

    if (!userId) {
      alert("UserId not found");
      return;
    }

    const res = await fetch(
      `http://localhost:5000/api/deactivate-account/${userId}`,
      { method: "POST" },
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to deactivate");
      return;
    }

    alert("Account deactivated. Data will be deleted in 7 days.");
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="max-w-5xl space-y-10">
      {/* ================= BASIC INFORMATION ================= */}
      <section className="bg-white border border-gray-400 rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <User className="text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Basic Information
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Full Name
            </label>
            <input
              value={form.name}
              disabled
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Email Address
            </label>
            <input
              value={form.email}
              disabled
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Mobile Number
            </label>
            <input
              value={form.phone || ""}
              disabled
              placeholder="Not available"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          These details are synced from your profile and cannot be edited here.
        </p>
      </section>

      {/* ================= CHANGE PASSWORD ================= */}
      <section className="bg-white border border-gray-400 rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Change Password
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="password"
            placeholder="Current Password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwords.new}
            onChange={(e) =>
              setPasswords({ ...passwords, new: e.target.value })
            }
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={updatePassword}
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          Update Password
        </button>
      </section>

      {/* ================= NOTIFICATIONS ================= */}
      <section className="bg-white border border-gray-400 rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Notification Preferences
          </h2>
        </div>

        <div className="space-y-4">
          {[
            ["email", "Email notifications"],
            ["whatsapp", "WhatsApp updates"],
            ["promo", "Promotional messages"],
          ].map(([key, label]) => (
            <label
              key={key}
              className="flex items-center justify-between text-sm text-gray-700"
            >
              {label}
              <input
                type="checkbox"
                checked={form.notifications[key]}
                onChange={() => toggleNotification(key)}
                className="accent-blue-600 h-4 w-4"
              />
            </label>
          ))}
        </div>
      </section>

      {/* ================= ACCOUNT ACTIONS ================= */}
      <section className="bg-white border border-gray-400 rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6 text-red-600">
          <Shield />
          <h2 className="text-lg font-semibold">Account Actions</h2>
        </div>

        <button
          onClick={deactivateAccount}
          className="inline-flex items-center justify-center rounded-lg border border-red-300 px-6 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition"
        >
          Deactivate Account
        </button>
      </section>
    </div>
  );
};

export default AccountSettings;
