import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FiMapPin } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";

const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const capitalize = (str = "") =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const API = import.meta.env.VITE_API_URL;


export default function EsDirectory() {
  const { districtKey } = useParams();

  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstablishments = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${API}/api/establishment/district/${districtKey}`,
        );

        setEstablishments(res.data || []);
      } catch (err) {
        console.error("Error fetching establishments:", err);
      } finally {
        setLoading(false);
      }
    };

    if (districtKey) fetchEstablishments();
  }, [districtKey]);

  const API = import.meta.env.VITE_API_URL;


  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Establishments in {districtKey?.toUpperCase()}
          </h1>
        </header>

        <div className="flex items-center gap-3 rounded-2xl border border-amber-100 bg-white/80 px-3 py-2 text-xs md:text-sm shadow-sm">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs">
            <FaBuilding size={11} />
          </span>

          <div>
            <p>
              Viewing establishments in{" "}
              <span className="font-semibold">
                {districtKey?.toUpperCase()}
              </span>
            </p>

            <p className="text-[11px] text-slate-500">
              Click a card to open the detailed establishment page.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-3 mt-3">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {establishments.length}
          </span>{" "}
          establishments
        </p>

        {loading && (
          <div className="mt-8 text-center text-sm text-slate-500">
            Loading...
          </div>
        )}

        {!loading && establishments.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
            No establishments found for this district.
          </div>
        )}

        <div className="grid gap-5 grid-cols-1">
          {establishments.map((establishment, idx) => {
            const slug = slugify(establishment.establishmentName);

            return (
              <Link
                key={`${establishment._id}-${idx}`}
                to={`/establishment/${districtKey}/${slug}`}
              >
                <article className="group flex h-full cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-blue-500 hover:shadow-lg">
                  <div className="flex gap-10">
                    {establishment?.gallery?.logo && (
                      <div className="shrink-0 flex items-start">
                        <img
                          src={`${API}${establishment.gallery.logo}`}
                          alt="logo"
                          className="h-28 w-28 object-contain bg-slate-50 p-2 rounded"
                        />
                      </div>
                    )}

                    <div className="flex flex-col flex-1">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <h2 className="text-base md:text-lg font-semibold group-hover:text-blue-600">
                          {establishment.establishmentName}
                        </h2>

                        <span className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-600">
                          {capitalize(districtKey)}
                        </span>
                      </div>

                      <p className="mt-0 text-xs text-slate-600 mb-2">
                        <FiMapPin className="inline-block mr-1 align-[-2px]" size={12} />
                        {establishment?.address?.fullAddress ||
                          "Address not available"}
                      </p>

                      {Array.isArray(establishment.courses) &&
                        establishment.courses.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {establishment.courses
                              .slice(0, 4)
                              .map((course, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center rounded-full bg-blue-50 text-blue-600 px-3 py-1 text-xs font-medium border border-blue-200"
                                >
                                  {course.title}
                                </span>
                              ))}

                            {establishment.courses.length > 4 && (
                              <span className="mt-1 text-xs text-slate-500">
                                +{establishment.courses.length - 4} more
                              </span>
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
