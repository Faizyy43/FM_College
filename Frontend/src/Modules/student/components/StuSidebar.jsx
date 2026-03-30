import { NavLink } from "react-router-dom";
import {
 
  FiUser,
  FiBookOpen,
 
} from "react-icons/fi";

export default function StuSidebar({ isOpen }) {
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
      {/* HEADER */}
      <div className="h-16 flex items-center px-6 ">
        <h2 className="text-lg font-semibold text-gray-800">
          Student Dashboard
        </h2>
      </div>

      {/* MENU */}
      <nav className="p-4 space-y-2">
       

        <NavLink
          to="/student/profile"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : normalLink}`
          }
        >
          <FiUser size={18} /> Profile
        </NavLink>

        <NavLink
          to="/student/applied-colleges"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : normalLink}`
          }
        >
          <FiBookOpen size={18} /> Applied Colleges
        </NavLink>

      
      </nav>
    </aside>
  );
}
