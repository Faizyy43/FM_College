import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiUser, FiBook, FiUsers, FiMail, FiInfo, FiLayers } from "react-icons/fi";
import { FaRegImage, FaRupeeSign } from "react-icons/fa";

export default function EsSidebar({ isOpen, toggle }) {
  const navigate = useNavigate();

  const baseLink =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium";

  const activeLink = "bg-blue-600 text-white shadow-md";

  const normalLink = "text-gray-600 hover:bg-gray-100";

  return (
    <>
      {/* SIDEBAR */}
      <aside
  className={`relative w-64 bg-white z-40
  ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  transition-transform duration-300`}
>

      

        {/* MENU */}
        <nav className="p-4 space-y-2">
          <NavLink
            to="/establishment/dashboard"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : normalLink}`
            }
          >
            <FiHome size={18} /> Dashboard
          </NavLink>

          <NavLink
            to="/establishment/profile"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : normalLink}`
            }
          >
            <FiUser size={18} /> Profile
          </NavLink>

          <NavLink
            to="/establishment/courses"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : normalLink}`
            }
          >
            <FiBook size={18} /> Courses
          </NavLink>

          <NavLink
            to="/establishment/students"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : normalLink}`
            }
          >
            <FiUsers size={18} /> Admissions
          </NavLink>

          <NavLink
            to="/establishment/payment"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : normalLink}`
            }
          >
            <FaRupeeSign size={16} /> Payments
          </NavLink>

          <NavLink
            to="/establishment/gallery"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : normalLink}`
            }
          >
            <FaRegImage size={16} /> Gallery
          </NavLink>
          <NavLink
            to="/establishment/projects"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : normalLink}`
            }
          >
            <FiLayers size={16} /> Projects
          </NavLink>
          <NavLink
            to="/establishment/about-us"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : normalLink}`
            }
          >
            <FiInfo size={16} /> About Us
          </NavLink>
          <NavLink
            to="/establishment/contact"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : normalLink}`
            }
          >
            <FiMail size={16} /> Contact
          </NavLink>
        </nav>
      </aside>
    </>
  );
}