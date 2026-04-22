import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

import StudentCTA from "../components/CollegePgComponent/CollegeStuCTA.jsx";
import AgentCTA from "../components/CollegePgComponent/CollegeAgCTA.jsx";

import ClgAboutTab from "../components/CollegePgComponent/ClgAboutTab";
import ClgCoursesTab from "../components/CollegePgComponent/ClgCoursesTab";
import ClgGalleryTab from "../components/CollegePgComponent/ClgGalleryTab";
import ClgContactTab from "../components/CollegePgComponent/ClgContactTab";

/* ================= TABS ================= */

const TABS = ["About Us", "Courses", "Gallery", "Contact"];

const TAB_COMPONENTS = {
  "About Us": ClgAboutTab,
  Courses: ClgCoursesTab,
  Gallery: ClgGalleryTab,
  Contact: ClgContactTab,
};

/* ================= SLUGIFY ================= */

const slugify = (str = "") => str.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/* ================= COMPONENT ================= */

const CollegePage = () => {
  const { citySlug, collegeSlug, tabName } = useParams();

  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  /* ================= AUTH ================= */

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.toUpperCase();

  const isLoggedIn = !!token;
  const isStudent = role === "STUDENT";

  const API = import.meta.env.VITE_API_URL;


  /* ================= FETCH COLLEGE ================= */

  useEffect(() => {
    if (!citySlug || !collegeSlug) return;

    const fetchCollege = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${API}/api/college/view/${citySlug}/${collegeSlug}`,
        );

        setCollege(res.data);
      } catch (err) {
        console.error("College fetch error:", err);
        setCollege(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [citySlug, collegeSlug]);

  /* ================= ACTIVE TAB ================= */

  const normalizedTab = tabName ? tabName.replace(/-/g, " ").toLowerCase() : "";

  const activeTab =
    TABS.find((t) => t.toLowerCase() === normalizedTab) || TABS[0];

  const CurrentTab = TAB_COMPONENTS[activeTab];

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading college...
      </div>
    );
  }

  /* ================= NOT FOUND ================= */

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg font-semibold">
        College not found ❌
      </div>
    );
  }

  const API = import.meta.env.VITE_API_URL;


  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-slate-50">
      {/* BANNER */}

      <div className="w-full bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
            <img
              src={
                college?.gallery?.banner
                  ? `${API}${college.gallery.banner}`
                  : ""
              }
              alt={college.collegeName}
              className="w-full h-full object-cover opacity-95"
            />
          </div>
        </div>
      </div>

      {/* PROFILE CARD */}

      <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-10">
        <div className="-mt-10 sm:-mt-12 lg:-mt-16 relative z-10">
          <div className="bg-white rounded-xl shadow-lg px-7 py-6 flex gap-6">
            {/* LOGO */}

            {college?.gallery?.logo && (
              <div className="w-24 h-24 bg-white rounded-xl shadow flex items-center justify-center border">
                <img
                  src={`${API}${college.gallery.logo}`}
                  alt="logo"
                  className="w-20 h-20 object-contain"
                />
              </div>
            )}

            {/* INFO */}

            <div>
              <h1 className="text-2xl font-semibold">{college.collegeName}</h1>

              <p className="mt-2 text-gray-700 text-base">
                📍 {college?.address?.fullAddress}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}

        {(!isLoggedIn || role === "STUDENT") && (
          <StudentCTA
            college={college}
            collegeSlug={collegeSlug}
            isLoggedIn={isLoggedIn}
            setShowAuthPopup={setShowAuthPopup}
          />
        )}

        {role === "AGENT" && (
          <AgentCTA
            college={college}
            isLoggedIn={isLoggedIn}
            setShowAuthPopup={setShowAuthPopup}
          />
        )}

        {/* TABS */}

        <nav className="mt-7 border-b border-gray-200 overflow-x-auto">
          <ul className="flex gap-7 text-base font-semibold text-gray-700">
            {TABS.map((t) => {
              const tabSlug = slugify(t);

              return (
                <li key={t}>
                  <NavLink
                    to={`/college/${citySlug}/${collegeSlug}/${tabSlug}`}
                    className={({ isActive }) =>
                      `inline-block pb-3 border-b-2 ${
                        isActive
                          ? "border-blue-700 text-blue-700"
                          : "border-transparent text-gray-600 hover:text-gray-900"
                      }`
                    }
                  >
                    {t}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* TAB CONTENT */}

        <div className="mt-5 bg-white rounded-xl shadow-md p-7">
          <h2 className="text-2xl font-semibold mb-4">{activeTab}</h2>

          <CurrentTab
            college={college}
            about={college.about}
            courses={college.courses}
            gallery={college.gallery}
            contact={college.contact}
          />
        </div>
      </div>
    </div>
  );
};

export default CollegePage;
