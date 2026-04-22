import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

/* Tab Components */
import EsAboutTab from "../components/EsPgComponent/EsAboutTab";
import EsCourseTab from "../components/EsPgComponent/EsCourseTab";
import EsProjectsTab from "../components/EsPgComponent/EsProjectsTab";
import EsGalleryTab from "../components/EsPgComponent/EsGalleryTab";
import EsContactTab from "../components/EsPgComponent/EsContactTab";

import EsBanner from "../components/EsPgComponent/EsBanner";
import EstablishmentCTA from "../components/EsPgComponent/EstablishmentCTA";

/* Tabs */
const TABS = ["About Us", "Courses", "Projects", "Gallery", "Contact"];

/* Map Tabs → Components */
const TAB_COMPONENTS = {
  "About Us": EsAboutTab,
  Courses: EsCourseTab,
  Projects: EsProjectsTab,
  Gallery: EsGalleryTab,
  Contact: EsContactTab,
};

/* Slugify helper */
const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-");

const EstablishmentPage = () => {
  const { districtKey, slug, tabName } = useParams();
  const navigate = useNavigate();

  const [establishment, setEstablishment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  /* ================= AUTH ================= */

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isLoggedIn = !!token;
  const isStudent = role === "STUDENT";

  /* ================= FETCH ESTABLISHMENT ================= */

  useEffect(() => {
    if (!districtKey || !slug) return;

    const fetchEstablishment = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:5000/api/establishment/view/${districtKey}/${slug}`,
        );

        setEstablishment(res.data);
      } catch (error) {
        console.error("Establishment fetch error:", error);
        setEstablishment(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEstablishment();
  }, [districtKey, slug]);

  /* ================= ACTIVE TAB ================= */

  const normalizedTab = tabName ? tabName.replace(/-/g, " ").toLowerCase() : "";

  const activeTab =
    TABS.find((t) => t.toLowerCase() === normalizedTab) || TABS[0];

  const CurrentTab = TAB_COMPONENTS[activeTab];

  /* ================= LOADING ================= */

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading establishment...
      </div>
    );

  /* ================= NOT FOUND ================= */

  if (!establishment)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg font-semibold">
        Establishment not found ❌
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* ================= BANNER ================= */}

      <EsBanner
        image={
          establishment.gallery?.banner
            ? `http://localhost:5000${establishment.gallery.banner}`
            : null
        }
        name={establishment.establishmentName}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-10 sm:-mt-14">
        {/* ================= PROFILE CARD ================= */}

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            {establishment?.gallery?.logo && (
              <img
                src={`http://localhost:5000${establishment.gallery.logo}`}
                alt="logo"
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-xl shadow-md"
              />
            )}

            <div className="flex-1 mt-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {establishment.establishmentName}
              </h1>

              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                📍 {establishment?.address?.fullAddress}
              </p>
            </div>
          </div>
        </div>

        {/* ================= STUDENT CTA ================= */}

        {isStudent && (
          <EstablishmentCTA
            establishment={establishment}
            districtKey={districtKey}
            slug={slug}
            isLoggedIn={isLoggedIn}
            setShowAuthPopup={setShowAuthPopup}
          />
        )}

        {/* ================= TABS ================= */}

        <nav className="mt-8 border-b border-gray-200 overflow-x-auto">
          <ul className="flex gap-7 text-base font-semibold text-gray-700">
            {TABS.map((t) => {
              const tabSlug = slugify(t);

              return (
                <li key={t}>
                  <NavLink
                    to={`/establishment/${districtKey}/${slug}/${tabSlug}`}
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

        {/* ================= TAB CONTENT ================= */}

        <div className="mt-6 bg-white rounded-xl shadow-md p-6 sm:p-7">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900">
            {activeTab}
          </h2>

          <CurrentTab
            establishment={establishment}
            establishmentId={establishment._id}
            courses={establishment.courses}
            projects={establishment.projects}
            gallery={establishment.gallery}
            contact={establishment.contact}
            about={establishment.about}
          />
        </div>
      </div>

      {/* ================= LOGIN POPUP ================= */}

      {showAuthPopup && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-md flex items-end sm:items-center justify-center"
          onClick={() => setShowAuthPopup(false)}
        >
          <div
            className="relative bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAuthPopup(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-gray-200"
            >
              ✕
            </button>

            <div className="pt-3">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Login Required
              </h3>

              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                To apply to this establishment, please sign in to your account.
              </p>

              <div className="mt-8 flex flex-col-reverse sm:flex-row gap-4">
                <button
                  onClick={() => setShowAuthPopup(false)}
                  className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
                >
                  Not Now
                </button>

                <button
                  onClick={() =>
                    navigate("/login", {
                      state: {
                        redirectTo: `/establishment/${districtKey}/${slug}/apply`,
                      },
                    })
                  }
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold"
                >
                  Login / Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstablishmentPage;
