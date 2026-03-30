import { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>

      {/* Tabs */}
      <div className="flex gap-4 overflow-x-auto border-b border-gray-200 pb-2">
        {["profile", "password", "platform", "approval"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 capitalize whitespace-nowrap text-sm sm:text-base ${
              activeTab === tab
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && <ProfileSettings />}
      {activeTab === "password" && <PasswordSettings />}
      {activeTab === "platform" && <PlatformSettings />}
      {activeTab === "approval" && <ApprovalSettings />}
    </div>
  );
}

function ProfileSettings() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow border border-gray-200 space-y-4">
      <h2 className="font-semibold text-base sm:text-lg">Admin Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name"
          className="border border-gray-200 p-2 rounded w-full"
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-200 p-2 rounded w-full"
        />
      </div>

      <button className="bg-purple-600 text-white px-4 py-2 rounded text-sm sm:text-base">
        Update Profile
      </button>
    </div>
  );
}

function PasswordSettings() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow border border-gray-200 space-y-4">
      <h2 className="font-semibold text-base sm:text-lg">Change Password</h2>

      <input
        type="password"
        placeholder="Current Password"
        className="border border-gray-200 p-2 rounded w-full"
      />

      <input
        type="password"
        placeholder="New Password"
        className="border border-gray-200 p-2 rounded w-full"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        className="border border-gray-200 p-2 rounded w-full"
      />

      <button className="bg-purple-600 text-white px-4 py-2 rounded text-sm sm:text-base">
        Change Password
      </button>
    </div>
  );
}

function PlatformSettings() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow border border-gray-200 space-y-4">
      <h2 className="font-semibold text-base sm:text-lg">Platform Controls</h2>

      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
        <span className="text-sm sm:text-base">Enable Agent Registration</span>
        <input type="checkbox" />
      </div>

      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
        <span className="text-sm sm:text-base">
          Enable College Registration
        </span>
        <input type="checkbox" />
      </div>

      <button className="bg-purple-600 text-white px-4 py-2 rounded text-sm sm:text-base">
        Save Settings
      </button>
    </div>
  );
}

function ApprovalSettings() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow border border-gray-200 space-y-4">
      <h2 className="font-semibold text-base sm:text-lg">Approval Controls</h2>

      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
        <span className="text-sm sm:text-base">Agents Require Approval</span>
        <input type="checkbox" defaultChecked />
      </div>

      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
        <span className="text-sm sm:text-base">Colleges Require Approval</span>
        <input type="checkbox" defaultChecked />
      </div>

      <button className="bg-purple-600 text-white px-4 py-2 rounded text-sm sm:text-base">
        Update Approval Settings
      </button>
    </div>
  );
}
