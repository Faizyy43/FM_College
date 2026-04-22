import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildAddressText = (college) =>
  college?.address?.fullAddress ||
  [
    college?.address?.address,
    college?.address?.city,
    college?.address?.state,
    college?.address?.pincode,
  ]
    .filter(Boolean)
    .join(", ");

const getCourseNames = (college) => {
  if (Array.isArray(college?.courses)) {
    return college.courses.map((course) => course.name).filter(Boolean);
  }

  if (Array.isArray(college?.main_courses)) {
    return college.main_courses.filter(Boolean);
  }

  return [];
};

const getFeeText = (college) => {
  if (college?.fees) return college.fees;

  const fees = (college?.courses || [])
    .map((course) => Number(course?.fees))
    .filter((fee) => Number.isFinite(fee) && fee > 0);

  if (!fees.length) return null;

  return `From Rs.${Math.min(...fees).toLocaleString()}`;
};

const districts = [
  "ahmedabad",
  "amreli",
  "anand",
  "aravalli",
  "banaskantha",
  "bharuch",
  "bhavnagar",
  "botad",
  "chhota-udaipur",
  "dang",
  "dahod",
  "devbhumi-dwarka",
  "gandhinagar",
  "gir-somnath",
  "jamnagar",
  "junagadh",
  "kheda",
  "kutch",
  "mahisagar",
  "mehsana",
  "morbi",
  "narmada",
  "navsari",
  "panchmahal",
  "patan",
  "porbandar",
  "rajkot",
  "sabarkantha",
  "surat",
  "surendranagar",
  "tapi",
  "vadodara",
  "valsad",
  "vav-tharad",
];

const API = import.meta.env.VITE_API_URL;

const CollegeDirectory = () => {
  const { citySlug } = useParams();
  const cityName = citySlug ? citySlug.replace(/-/g, " ") : "";
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isValidDistrict = districts.includes(citySlug?.toLowerCase());

  useEffect(() => {
    if (!citySlug || !isValidDistrict) return;

    const fetchColleges = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `${API}/api/college/district/${citySlug}`,
        );
        setColleges(res.data || []);
      } catch (err) {
        console.error("College directory fetch error:", err);
        setError("Unable to load colleges right now. Please try again later.");
        setColleges([]);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [citySlug, isValidDistrict]);

  if (!isValidDistrict) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 text-slate-900">
        <div className="text-center text-gray-600 text-lg">
          Please select a valid district.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="mt-1 text-3xl md:text-4xl font-bold tracking-tight text-slate-900 capitalize">
            Colleges in {cityName}
          </h1>
        </header>

        <div className="flex items-center gap-3 rounded-2xl border border-amber-100 bg-white/80 px-3 py-2 text-xs md:text-sm shadow-sm mb-3">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs">
            <FiMapPin size={12} />
          </span>
          <div>
            <p className="text-slate-700">
              Viewing colleges in{" "}
              <span className="font-semibold capitalize">{cityName}</span>.
            </p>
            <p className="text-[11px] text-slate-500">
              Click a card to open the detailed page for that college.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-3 mt-3">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {loading ? "..." : colleges.length}
          </span>{" "}
          colleges in{" "}
          <span className="font-semibold text-slate-700 capitalize">
            {cityName}
          </span>
        </p>

        {loading ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
            Loading colleges...
          </div>
        ) : error ? (
          <div className="mt-8 rounded-2xl border border-dashed border-red-300 bg-red-50 px-4 py-10 text-center text-sm text-red-600">
            {error}
          </div>
        ) : colleges.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
            0 colleges in <span className="capitalize">{cityName}</span>
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-1">
            {colleges.map((college, idx) => {
              const collegeName =
                college.collegeName || college.name || "College";
              const slug = slugify(collegeName);
              const logoUrl = college?.gallery?.logo
                ? `${API}${college.gallery.logo}`
                : college?.logo || "";
              const addressText = buildAddressText(college);
              const courseNames = getCourseNames(college);
              const feeText = getFeeText(college);
              const phone =
                college?.contact?.phone || college?.mobile || college?.phone;

              return (
                <Link
                  key={`${college._id || college.userId || collegeName}-${idx}`}
                  to={`/college/${citySlug}/${slug}`}
                >
                  <article className="group flex h-full cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-blue-500 hover:shadow-lg">
                    <div className="flex gap-10">
                      {logoUrl && (
                        <div className="shrink-0 flex items-start">
                          <img
                            src={logoUrl}
                            alt={`${collegeName} logo`}
                            className="h-32 w-32 rounded-sm object-contain bg-slate-50 p-1"
                          />
                        </div>
                      )}

                      <div className="flex flex-col flex-1">
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <h2 className="text-base md:text-lg font-semibold text-slate-900 group-hover:text-blue-700">
                            {collegeName}
                          </h2>
                          <span className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-700 capitalize">
                            {cityName}
                          </span>
                        </div>

                        {addressText && (
                          <p className="text-xs text-slate-600 mb-2">
                            <FiMapPin className="inline-block mr-1 align-[-2px]" size={12} />
                            <span className="align-middle">{addressText}</span>
                          </p>
                        )}

                        {courseNames.length > 0 && (
                          <div className="mb-3 flex flex-wrap gap-1.5">
                            {courseNames.slice(0, 5).map((course, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-700"
                              >
                                {course}
                              </span>
                            ))}
                            {courseNames.length > 5 && (
                              <span className="text-[11px] text-slate-500">
                                +{courseNames.length - 5} more
                              </span>
                            )}
                          </div>
                        )}

                        <div className="mt-auto flex flex-wrap gap-2 pt-1 text-[11px]">
                          {feeText && (
                            <div className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-500 border border-blue-500 px-3 py-1">
                              <FaRupeeSign size={10} />
                              <span className="font-medium">{feeText}</span>
                            </div>
                          )}

                          {phone && (
                            <div className="inline-flex items-center gap-1 rounded-full bg-yellow-50 text-yellow-500 border border-yellow-500 px-3 py-1">
                              <FiPhone size={10} />
                              <span className="font-medium">
                                {Array.isArray(phone) ? phone.join(" / ") : phone}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeDirectory;
