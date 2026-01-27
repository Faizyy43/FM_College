import React from "react";
import {
  User,
  GraduationCap,
  Star,
  CheckCircle,
  Clock,
  Settings,
  Eye,
  LogOut,
} from "lucide-react";

const Sidebar = ({
  profileData = null,
  profileImage = null,
  getInitials,
  onImageUpload,
  selectedMenu,
  setSelectedMenu,
  onLogoutClick,
}) => {
  const menuItems = [
    { label: "Your Profile", icon: User },
    { label: "Applied Colleges", icon: GraduationCap },
    { label: "Your Reviews", icon: Star },
    { label: "Applied CAF", icon: CheckCircle },
    { label: "Pending Application", icon: Clock },
    { label: "Account Settings", icon: Settings },
    { label: "Profile Views", icon: Eye },
  ];

  const hasProfile = Boolean(profileData?.name);

  return (
    <aside className="w-72 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* ================= PROFILE ================= */}
      <div className="px-6 pt-8 pb-6 text-center shrink-0">
        <div className="relative w-24 h-24 mx-auto mb-4">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-semibold">
              {hasProfile ? getInitials(profileData.name) : "?"}
            </div>
          )}

          {/* EDIT IMAGE */}
          {onImageUpload && hasProfile && (
            <label className="absolute bottom-0 right-0 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center cursor-pointer border">
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={onImageUpload}
              />
              ✏️
            </label>
          )}
        </div>

        {/* SHOW NAME & EMAIL ONLY AFTER STEP 1 SAVE */}
        {hasProfile && (
          <>
            <h3 className="text-base font-semibold text-gray-900 truncate">
              {profileData.name}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              {profileData.email}
            </p>
          </>
        )}
      </div>

      {/* ================= MENU ================= */}
      <nav className="flex-1 overflow-y-auto px-3">
        <ul className="space-y-2 text-sm">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = selectedMenu === item.label;

            return (
              <li
                key={item.label}
                onClick={() => setSelectedMenu(item.label)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition
                  ${
                    isActive
                      ? "bg-orange-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <Icon size={18} />
                {item.label}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ================= LOGOUT ================= */}
      <div className="shrink-0 border-t border-gray-200 px-3 py-4">
        <button
          onClick={onLogoutClick}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
