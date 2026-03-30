import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { NotificationContext } from "../../admin/context/NotificationContext.jsx";
import {
  FiUser,
  FiHome,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { STREAM_KEYS, STREAM_LABELS } from "../../assets/assets.js";

// Top 5 districts (existing data)
const CITY_LINKS = [
  { key: "ahmedabad", name: "Ahmedabad" },
  { key: "gandhinagar", name: "Gandhinagar" },
  { key: "vadodara", name: "Vadodara" },
  { key: "rajkot", name: "Rajkot" },
  { key: "mehsana", name: "Mehsana" },
];

// All districts (for search)
const DISTRICTS_ALL = [
  ...CITY_LINKS,
  { key: "amreli", name: "Amreli" },
  { key: "anand", name: "Anand" },
  { key: "aravalli", name: "Aravalli" },
  { key: "banaskantha", name: "Banaskantha" },
  { key: "vav-tharad", name: "Vav-Tharad" },
  { key: "bharuch", name: "Bharuch" },
  { key: "bhavnagar", name: "Bhavnagar" },
  { key: "botad", name: "Botad" },
  { key: "chhota-udaipur", name: "Chhota Udaipur" },
  { key: "dahod", name: "Dahod" },
  { key: "dang", name: "Dang" },
  { key: "devbhumi-dwarka", name: "Devbhumi Dwarka" },
  { key: "gir-somnath", name: "Gir Somnath" },
  { key: "jamnagar", name: "Jamnagar" },
  { key: "junagadh", name: "Junagadh" },
  { key: "kutch", name: "Kutch" },
  { key: "kheda", name: "Kheda" },
  { key: "mahisagar", name: "Mahisagar" },
  { key: "morbi", name: "Morbi" },
  { key: "narmada", name: "Narmada" },
  { key: "navsari", name: "Navsari" },
  { key: "panchmahal", name: "Panchmahal" },
  { key: "patan", name: "Patan" },
  { key: "porbandar", name: "Porbandar" },
  { key: "sabarkantha", name: "Sabarkantha" },
  { key: "surat", name: "Surat" },
  { key: "surendranagar", name: "Surendranagar" },
  { key: "tapi", name: "Tapi" },
  { key: "valsad", name: "Valsad" },
];

const Navbar = ({ setSidebarOpen }) => {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [districtSearch, setDistrictSearch] = useState("");
  const [closeDropdown, setCloseDropdown] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const menuRef = useRef();

  const isTouchDevice = () =>
    window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return parts[0][0] + parts[1][0].toUpperCase();
  };

  const dropdowns = [
    {
      title: "Browse By Streams",
      items: STREAM_KEYS.map((key) => ({
        key,
        name: STREAM_LABELS[key] || key,
        to: `/streams/${key}`,
      })),
    },
    {
      title: "All Colleges",
      items: CITY_LINKS.map((city) => ({
        key: city.key,
        name: city.name,
        to: `/colleges/${city.key}`,
      })),
    },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(null);
    setDistrictSearch("");
    setCloseDropdown(true);
    setTimeout(() => setCloseDropdown(false), 100);
  };

  /* ================= ONLY SEARCH FIX ================= */

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      const found = DISTRICTS_ALL.find(
        (d) => d.name.toLowerCase() === districtSearch.toLowerCase(),
      );

      if (found) {
        navigate(`/colleges/${found.key}`);
        setDistrictSearch("");
        setMobileDropdownOpen(null);
        setMobileMenuOpen(false);
      }
    }
  };

  const filteredOtherDistricts = DISTRICTS_ALL.filter((d) =>
    d.name.toLowerCase().includes(districtSearch.toLowerCase()),
  );

  const closeTimer = useRef(null);

  const role = localStorage.getItem("role")?.toLowerCase() || null;

  const profilePath = role ? `/${role}/viewprofile` : null;
  const dashboardPath =
    role && role !== "student" ? `/${role}/dashboard` : null;

  const accountPath = role === "student" ? `/${role}/profile` : null;

  // ADMIN CONTAIN

  const context = useContext(NotificationContext) || {};

  const {
    notifications = [],
    unreadCount = 0,
    markAllAsRead = () => {},
  } = context;

  const [notifyOpen, setNotifyOpen] = useState(false);
  const notifyRef = useRef(null);

  const pathname = window?.location?.pathname || "";

  const isDashboard =
    pathname.includes("/admin") ||
    pathname.includes("/agent") ||
    pathname.includes("/admin/college") ||
    pathname.includes("/establishment");
    // pathname.includes("/student");

  // const isStudentDashboard = pathname.includes("/student");
  const isStudent = token && role === "student";
  const isAdminDashboard = pathname.startsWith("/admin");
  /* =================================================== */

  return (
    <>
      {/* ------------------- DESKTOP NAVBAR ------------------- */}
      <div className="w-full h-16 bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm flex items-center">
        <div className="w-full flex items-center justify-between px-6">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-4">
            {/* Logo (hide in admin dashboard) */}
            {!isAdminDashboard && (
              <Link to="/" className="flex items-center gap-3">
                <img
                  src="/find_my_college_logo[1].png"
                  alt="logo"
                  className="h-9 w-auto object-contain"
                />
              </Link>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-5 ml-auto">
            {/* STREAM + COLLEGE DROPDOWNS */}
            {/* STREAM + COLLEGE DROPDOWNS */}
            {isStudent &&
              dropdowns.map((dropdown) => (
                <div key={dropdown.title} className="relative group">
                  <button className="relative hover:text-orange-500 transition">
                    {dropdown.title}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 mt-3 w-56 max-w-[90vw] bg-white rounded-lg shadow-lg border border-gray-200
        opacity-0 translate-y-2 invisible
        group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible
        transition-all duration-200 z-50
        ${
          closeDropdown
            ? "hidden"
            : "opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible"
        }`}
                  >
                    {dropdown.title === "All Colleges" && (
                      <div className="px-2 py-2">
                        {dropdown.items.map((item) => (
                          <Link
                            key={item.key}
                            to={item.to}
                            onClick={handleLinkClick}
                            className="block px-4 py-2 text-gray-600 bg-linear-to-bl hover:from-blue-700 hover:to-blue-900 hover:text-white transition rounded"
                          >
                            {item.name}
                          </Link>
                        ))}

                        <input
                          type="text"
                          value={districtSearch}
                          onChange={(e) => setDistrictSearch(e.target.value)}
                          onKeyDown={handleSearchEnter}
                          placeholder="Search other districts..."
                          className="mt-2 h-10 w-full border border-gray-300 rounded px-3 py-1 text-sm focus:outline-orange-400 focus:ring-1 focus:ring-orange-400"
                        />

                        {districtSearch &&
                          filteredOtherDistricts.slice(0, 5).map((d) => (
                            <Link
                              key={d.key}
                              to={`/colleges/${d.key}`}
                              onClick={handleLinkClick}
                              className="block px-4 py-2 mb-1 text-gray-600 bg-linear-to-bl hover:from-blue-700 hover:to-blue-900 hover:text-white transition rounded"
                            >
                              {d.name}
                            </Link>
                          ))}
                      </div>
                    )}

                    {dropdown.title !== "All Colleges" &&
                      dropdown.items.map((item) => (
                        <Link
                          key={item.key}
                          to={item.to}
                          onClick={handleLinkClick}
                          className="block px-4 py-2 text-gray-600 bg-linear-to-bl hover:from-blue-700 hover:to-blue-900 hover:text-white transition rounded"
                        >
                          {item.name}
                        </Link>
                      ))}
                  </div>
                </div>
              ))}

            {/* ADMIN NOTIFICATION */}
            {token && role === "admin" && (
              <div className="relative" ref={notifyRef}>
                <button
                  onClick={async () => {
                    const newState = !notifyOpen;
                    setNotifyOpen(newState);

                    if (newState && unreadCount > 0) {
                      await markAllAsRead();
                    }
                  }}
                  className="relative p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <Bell size={20} />

                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notifyOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-4 space-y-3 max-h-96 overflow-y-auto z-50">
                    <h3 className="font-semibold text-gray-800">
                      Notifications
                    </h3>

                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-500">
                        No new notifications
                      </p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif._id}
                          className={`p-3 rounded-lg ${
                            notif.isRead
                              ? "bg-gray-50"
                              : "bg-blue-50 border border-blue-100"
                          }`}
                        >
                          <p className="text-sm font-medium wrap-break-word">
                            {notif.message}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(notif.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* USER PROFILE */}
            <div
              className="relative"
              ref={menuRef}
              onMouseEnter={() => {
                if (!isTouchDevice()) {
                  clearTimeout(closeTimer.current);
                  setUserMenuOpen(true);
                }
              }}
              onMouseLeave={() => {
                if (!isTouchDevice()) {
                  closeTimer.current = setTimeout(() => {
                    setUserMenuOpen(false);
                  }, 150);
                }
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setUserMenuOpen((prev) => !prev);
                }}
                className="w-11 h-11 rounded-full bg-linear-to-br from-gray-500 to-gray-950
    text-white text-lg font-semibold flex items-center justify-center"
              >
                {token && role === "student" ? (
                  getInitials(name)
                ) : (
                  <FiUser className="text-xl" />
                )}
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-999 overflow-hidden">
                  {/* USER HEADER */}
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200 bg-linear-to-br from-gray-300 to-gray-100">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-500 to-gray-950 text-white flex items-center justify-center font-semibold">
                      {getInitials(name)}
                    </div>

                    <div className="flex flex-col leading-tight">
                      <span className="font-semibold text-xl text-gray-900 normal-case">
                        {name
                          ?.split(" ")
                          .map(
                            (word) =>
                              word[0]?.toUpperCase() +
                              word.slice(1).toLowerCase(),
                          )
                          .join(" ") || "User"}
                      </span>

                      <span className="text-xs text-gray-500 tracking-wide normal-case">
                        {localStorage
                          .getItem("role")
                          ?.toLowerCase()
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase()) || "User"}
                      </span>
                    </div>
                  </div>

                  {/* MENU */}
                  <div className="py-2">
                    {!token ? (
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          navigate("/login");
                        }}
                        className="w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        <FiUser className="text-gray-500 text-lg" />
                        Login
                      </button>
                    ) : (
                      [
                        profilePath && {
                          label: "View Profile",
                          icon: FiUser,
                          action: () => navigate(profilePath),
                        },
                        role === "student"
                          ? {
                              label: "My Account",
                              icon: FiSettings,
                              action: () => navigate(accountPath),
                            }
                          : dashboardPath && {
                              label: "Dashboard",
                              icon: FiHome,
                              action: () => navigate(dashboardPath),
                            },
                      ]
                        .filter(Boolean)
                        .map(({ label, icon: Icon, action }) => (
                          <button
                            key={label}
                            onClick={() => {
                              setUserMenuOpen(false);
                              action();
                            }}
                            className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition"
                          >
                            <Icon className="text-gray-500 text-lg" />
                            {label}
                          </button>
                        ))
                    )}
                  </div>

                  {token && (
                    <div className="border-t border-gray-200">
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          setShowLogout(true);
                        }}
                        className="w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        <FiLogOut className="text-gray-500 text-lg" />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------- MOBILE NAVBAR ------------------- */}
      <div className="md:hidden w-full backdrop-blur-md bg-white/70 shadow-lg border-b border-gray-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 w-full">
          {/* Hamburger on the left */}
          <button
            className="text-gray-800 text-2xl"
            onClick={() => {
              if (setSidebarOpen) {
                setSidebarOpen(true); // DASHBOARD
              } else {
                setMobileMenuOpen(!mobileMenuOpen); // WEBSITE
              }
            }}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          {/* Logo in the center */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/find_my_college_logo[1].png"
              alt="logo"
              className="w-30 h-12 object-contain"
            />
          </Link>

          {/* Login button on the right and user dropdown after login*/}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className="w-9 h-9 rounded-full bg-linear-to-br from-gray-500 to-gray-950
  text-white text-lg font-semibold tracking-wide
  flex items-center justify-center
  ring-2 ring-indigo-400/40 shadow-md"
            >
              {token ? getInitials(name) : <FiUser className="text-xl" />}
            </button>

            <div className="relative">
              <button
                onClick={() => setNotifyOpen(!notifyOpen)}
                className="relative p-2"
              >
                <Bell size={18} />

                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            {userMenuOpen && (
              <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                {/* USER HEADER */}
                <div className="flex items-center gap-4 px-6 py-5 bg-linear-to-br from-gray-300 to-gray-100">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-gray-500 to-gray-950 text-white flex items-center justify-center text-lg font-semibold">
                    {getInitials(name)}
                  </div>

                  <div className="flex flex-col leading-tight">
                    <span className="text-lg font-semibold text-gray-900 normal-case">
                      {name
                        ?.split(" ")
                        .map(
                          (word) =>
                            word[0]?.toUpperCase() +
                            word.slice(1).toLowerCase(),
                        )
                        .join(" ") || "User"}
                    </span>

                    <span className="text-sm text-gray-500 normal-case">
                      {localStorage
                        .getItem("role")
                        ?.toLowerCase()
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase()) || "User"}
                    </span>
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="border-t border-gray-200" />

                {/* MENU ITEMS */}
                <div className="py-2">
                  {!token ? (
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        navigate("/login");
                      }}
                      className="w-full flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-gray-50 transition"
                    >
                      <FiUser className="text-gray-500 text-lg" />
                      <span className="text-base">Login</span>
                    </button>
                  ) : (
                    <>
                      {/* View Profile (all roles) */}
                      {profilePath && (
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            navigate(profilePath);
                          }}
                          className="w-full flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-gray-50 transition"
                        >
                          <FiUser className="text-gray-500 text-lg" />
                          <span className="text-base">View Profile</span>
                        </button>
                      )}

                      {/* My Account (for students only) */}
                      {accountPath && (
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            navigate(accountPath);
                          }}
                          className="w-full flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-gray-50 transition"
                        >
                          <FiSettings className="text-gray-500 text-lg" />
                          <span className="text-base">My Account</span>
                        </button>
                      )}

                      {/* Dashboard (non-students only) */}
                      {dashboardPath && (
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            navigate(dashboardPath);
                          }}
                          className="w-full flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-gray-50 transition"
                        >
                          <FiHome className="text-gray-500 text-lg" />
                          <span className="text-base">Dashboard</span>
                        </button>
                      )}
                    </>
                  )}
                </div>

                {/* LOGOUT */}
                <div className="px-1.5">
                  {token && (
                    <div className="py-2 border-t border-gray-200">
                      <button
                        onClick={() => {
                          setUserMenuOpen(false); // close dropdown
                          setShowLogout(true); // open confirm modal
                        }}
                        className="w-full flex items-center gap-4 px-5 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        <FiLogOut className="text-gray-500 text-lg" />
                        <span className="text-base ">Log out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu dropdown (collapsible) */}
        <div
          className={`md:hidden w-full bg-white/90 transition-max-height duration-300 overflow-hidden ${
            mobileMenuOpen ? "max-h-125" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-1 px-4 py-3 text-gray-700">
            {dropdowns.map((dropdown, index) => (
              <div key={dropdown.title} className="flex flex-col">
                <button
                  onClick={() =>
                    setMobileDropdownOpen(
                      mobileDropdownOpen === index ? null : index,
                    )
                  }
                  className="flex items-center justify-between w-full py-2 font-medium text-gray-700 hover:text-orange-600 transition"
                >
                  {dropdown.title}
                  {mobileDropdownOpen === index ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </button>

                {mobileDropdownOpen === index && (
                  <div className="flex flex-col pl-3 mt-1">
                    {dropdown.title === "All Colleges" && (
                      <>
                        {dropdown.items.map((item) => (
                          <Link
                            key={item.key}
                            to={item.to}
                            onClick={handleLinkClick}
                            className="block px-2 py-1 text-gray-600 bg-linear-to-bl hover:from-blue-700 hover:to-blue-900 hover:text-white rounded transition"
                          >
                            {item.name}
                          </Link>
                        ))}

                        <input
                          type="text"
                          value={districtSearch}
                          onChange={(e) => setDistrictSearch(e.target.value)}
                          onKeyDown={handleSearchEnter}
                          placeholder="Search other districts..."
                          className="mt-2 h-10 w-full border border-gray-300 rounded px-3 py-1 text-sm focus:outline-orange-400 focus:ring-1 focus:ring-orange-400"
                        />

                        {districtSearch &&
                          filteredOtherDistricts.slice(0, 5).map((d) => (
                            <Link
                              key={d.key}
                              to={`/colleges/${d.key}`}
                              onClick={handleLinkClick}
                              className="block px-2 py-1 mb-1 text-gray-600 bg-linear-to-bl hover:from-blue-700 hover:to-blue-900 hover:text-white rounded transition"
                            >
                              {d.name}
                            </Link>
                          ))}
                      </>
                    )}

                    {dropdown.title !== "All Colleges" &&
                      dropdown.items.map((item) => (
                        <Link
                          key={item.key}
                          to={item.to}
                          onClick={handleLinkClick}
                          className="block px-2 py-1 text-gray-600 bg-linear-to-bl hover:from-blue-700 hover:to-blue-900 hover:text-white rounded transition"
                        >
                          {item.name}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showLogout && (
        <div
          className="
      fixed inset-0 z-100
      bg-black/50 backdrop-blur-md
      flex items-end sm:items-center justify-center
    "
          onClick={() => setShowLogout(false)}
        >
          <div
            className="
        relative
        bg-white w-full sm:max-w-lg
        rounded-t-3xl sm:rounded-3xl
        p-6 sm:p-8
        shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)]
        animate-in slide-in-from-bottom sm:zoom-in-95 duration-200
      "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setShowLogout(false)}
              className="
          absolute top-4 right-4
          w-9 h-9 rounded-full
          flex items-center justify-center
          bg-gray-100 text-gray-500
          hover:bg-gray-200 hover:text-gray-700
          transition
        "
            >
              <FiX size={18} />
            </button>

            {/* Content */}
            <div className="pt-2">
              <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">
                Confirm Logout
              </h3>

              <p className="mt-3 text-base text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-900">
                  {name
                    ?.split(" ")
                    .map(
                      (word) =>
                        word[0]?.toUpperCase() + word.slice(1).toLowerCase(),
                    )
                    .join(" ") || "User"}
                </span>
                , are you sure you want to log out?
                <br className="hidden sm:block" />
                You can sign back in anytime to access your account again.
              </p>

              {/* Actions */}
              <div className="mt-8 flex flex-col-reverse sm:flex-row gap-4">
                {/* Cancel */}
                <button
                  onClick={() => setShowLogout(false)}
                  className="
              flex-1 py-3 rounded-xl
              bg-white
              border border-gray-300
              text-gray-700 font-semibold
              hover:bg-gray-50
              active:scale-[0.99]
              transition-all duration-150
              hover:shadow-md 
            "
                >
                  Cancel
                </button>

                {/* Logout */}
                <button
                  onClick={() => {
                    localStorage.clear();
                    setShowLogout(false);
                    navigate("/login");
                  }}
                  className="
              flex-1 py-3 rounded-xl
              bg-linear-to-br from-red-500 to-red-600 text-white font-semibold
              shadow-sm hover:shadow-lg hover:from-red-600 hover:to-red-700
               hover:shadow-red-500/25
              active:scale-[0.99]
              transition-all duration-200 ease-out
            "
                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
