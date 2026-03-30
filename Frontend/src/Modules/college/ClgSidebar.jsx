import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiBook,
  FiUsers,
  FiMail,
  FiInfo,
  
} from "react-icons/fi";
import { FaRupeeSign ,FaHandshake,  FaClipboardList, FaRegImage} from "react-icons/fa";

export default function ClgSidebar({ isOpen }) {
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
      

      {/* MENU */}
      <nav className="p-4 space-y-2">
        <NavLink
          to="/college/dashboard"
          end
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : normalLink}`
          }
        >
          <FiHome size={18} /> Dashboard
        </NavLink>

        <NavLink
          to="/college/profile"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : normalLink}`
          }
        >
          <FiUser size={18} /> Profile
        </NavLink>

        <NavLink
          to="/college/courses"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : normalLink}`
          }
        >
          <FiBook size={18} /> Courses
        </NavLink>

        <NavLink
          to="/college/stu_applications"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : normalLink}`
          }
        >
          < FaClipboardList size={16} />  Student Applications
        </NavLink>

        <NavLink
          to="/college/admissions"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : normalLink}`
          }
        >
          <FiUsers size={18} /> Admissions
        </NavLink>

         <NavLink
          to="/college/partners"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : normalLink}`
          }
        >
          <FaHandshake size={16} /> Partners
        </NavLink>

        <NavLink
          to="/college/payments"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : normalLink}`
          }
        >
          <FaRupeeSign size={16} /> Payments
        </NavLink>

          <NavLink
          to="/college/gallery"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : normalLink}`
          }
        >
          <FaRegImage size={16} /> Gallery
        </NavLink>

          <NavLink
          to="/college/about-us"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : normalLink}`
          }
        >
          <FiInfo size={16} /> About Us
        </NavLink>

          <NavLink
          to="/college/contact"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : normalLink}`
          }
        >
          <FiMail size={16} /> Contact
        </NavLink>
      </nav>
    </aside>
  );
}