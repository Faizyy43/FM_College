import React from "react";
import { User, GraduationCap, Eye, LogOut } from "lucide-react";

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
    { label: "Profile Views", icon: Eye },
  ];

  const hasProfile = Boolean(profileData?.name);

  return (
    <aside className="w-64 lg:w-72 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* PROFILE */}
      <div className="px-6 pt-8 pb-6 text-center border-b border-gray-200">
        <div className="relative w-24 h-24 mx-auto mb-3">
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

          {onImageUpload && hasProfile && (
            <label className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center cursor-pointer border hover:bg-gray-100">
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

      {/* MENU */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1.5 text-sm">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = selectedMenu === item.label;

            return (
              <li
                key={item.label}
                onClick={() => setSelectedMenu(item.label)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-medium"
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

      {/* LOGOUT */}
      <div className="border-t border-gray-200 px-3 py-4">
        <button
          onClick={onLogoutClick}
          className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
