import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import ClgSidebar from "../Modules/college/ClgSidebar";
import Navbar from "../components/MainComponents/Navbar";

export default function CollegeLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen bg-gray-50 relative">
        {/* Mobile Overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed z-50 inset-y-0 left-0 transform bg-white
            transition-transform duration-300 ease-in-out
            lg:static lg:translate-x-0 lg:z-auto
            ${open ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <ClgSidebar
            isOpen={open}
            toggle={() => setOpen(!open)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col w-full">
          {/* Mobile Topbar */}
          <div className="lg:hidden flex items-center px-4 py-3 bg-white shadow-sm">
            <button
              onClick={() => setOpen(true)}
              className="text-gray-700 text-2xl"
            >
              <FiMenu />
            </button>
            <h1 className="ml-4 font-semibold text-gray-800">
              Dashboard
            </h1>
          </div>

          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}