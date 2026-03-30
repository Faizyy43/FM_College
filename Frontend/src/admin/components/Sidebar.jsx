import { NavLink } from "react-router-dom";
import {
  X,
  LayoutDashboard,
  School,
  Users,
  Building,
  User2Icon,
  ClipboardList,
  Settings,
} from "lucide-react";

export default function Sidebar({ open, setOpen, pendingCount }) {
  const baseClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium";

  const activeClass =
    "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md";

  const inactiveClass = "text-gray-600 hover:bg-gray-100 hover:text-gray-900";

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 w-64 max-w-[85vw] h-screen bg-white border-r border-gray-200 flex flex-col
        transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        {/* Mobile Close */}
        <div className="flex justify-between items-center p-4 sm:p-5 lg:hidden border-b border-gray-200">
          <h2 className="font-semibold text-gray-800">Menu</h2>

          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Logo */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-linear-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center rounded-2xl font-bold shadow">
              FM
            </div>

            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                FM College
              </h2>

              <p className="text-xs text-gray-400">College Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 sm:px-4 py-4 space-y-2 overflow-y-auto">
          {/* Dashboard */}
          <NavLink
            to="/admin/dashboard"
            end
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          {/* Colleges */}
          <NavLink
            to="/admin/colleges"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <School size={18} />
            Colleges
          </NavLink>

          {/* Students */}
          <NavLink
            to="/admin/students"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <Users size={18} />
            Students
          </NavLink>

          {/* Agents */}
          <NavLink
            to="/admin/agents"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <User2Icon size={18} />
            Agents
          </NavLink>

          {/* Establishments */}
          <NavLink
            to="/admin/establishments"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <Building size={18} />
            Establishments
          </NavLink>

          {/* Requests */}
          <NavLink
            to="/admin/requests"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <ClipboardList size={18} />
            Requests
            {pendingCount > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </NavLink>

          {/* Settings */}
          <NavLink
            to="/admin/settings"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <Settings size={18} />
            Settings
          </NavLink>
        </nav>

        <div className="p-4 sm:p-5 text-xs text-gray-400 border-t border-gray-200">
          © 2026 Admin System
        </div>
      </aside>
    </>
  );
}
