// AgentSidebar.jsx

import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiUsers,
  FiFileText,
  FiBookOpen,
} from "react-icons/fi";

export default function AgentSidebar({ isOpen, toggle }) {
  const baseLink =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium";

  const activeLink = "bg-blue-600 text-white shadow-md";

  const normalLink = "text-gray-600 hover:bg-gray-100";

  return (
    <aside
      className={`relative w-64 bg-white z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        transition-transform duration-300`}
    >
      {/* LOGO / TITLE */}
      <div className="h-16 flex items-center px-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Agent Dashboard
        </h2>
      </div>

      {/* MENU */}
      <nav className="p-4 space-y-2">

        <NavLink
          to="/agent/dashboard"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : normalLink}`
          }
          onClick={toggle}
        >
          <FiHome size={18} /> Dashboard
        </NavLink>

        <NavLink
          to="/agent/profile"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : normalLink}`
          }
          onClick={toggle}
        >
          <FiUser size={18} /> My Profile
        </NavLink>

        <NavLink
          to="/agent/students"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : normalLink}`
          }
          onClick={toggle}
        >
          <FiUsers size={18} /> Students
        </NavLink>

        <NavLink
          to="/agent/applications"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : normalLink}`
          }
          onClick={toggle}
        >
          <FiFileText size={18} /> Applications
        </NavLink>

        <NavLink
          to="/agent/colleges"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : normalLink}`
          }
          onClick={toggle}
        >
          <FiBookOpen size={18} /> Colleges & Courses
        </NavLink>

      </nav>
    </aside>
  );
}