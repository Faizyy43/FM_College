// src/pages/StreamColleges.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { StreamsData } from "../assets/assets.js";

// Helper to generate slugs
const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function StreamColleges() {
  const { streamKey } = useParams();

  const colleges = StreamsData[streamKey] || [];
  const streamTitle = streamKey.replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            {streamTitle.toUpperCase()} Colleges
          </h1>
          <p className="mt-2 text-slate-600 text-sm md:text-base">
            Explore all colleges available in the "{streamTitle}" stream.
          </p>
        </header>

        {/* Small summary card */}
        <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-white/80 px-3 py-2 text-xs md:text-sm shadow-sm">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs">
            🎓
          </span>
          <div>
            <p className="text-slate-700">
              Stream:{" "}
              <span className="font-semibold">{streamTitle.toUpperCase()}</span>
            </p>
            <p className="text-[11px] text-slate-500">
              Click a card to open the detailed page for that college.
            </p>
          </div>
        </div>

        {/* Count */}
        <p className="text-xs text-slate-500 mb-3 mt-3">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {colleges.length}
          </span>{" "}
          colleges for{" "}
          <span className="font-semibold text-slate-700">
            {streamTitle.toUpperCase()}
          </span>
        </p>

        {/* Cards */}
        {colleges.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
            No colleges found for this stream.
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-1">
            {colleges.map((college, idx) => {
              const slug = slugify(college.name);

              return (
                <Link
                  key={`${college.name}-${idx}`}
                  to={`/stream/${streamKey}/${slug}`}
                >
                  <article className="group flex h-full cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-blue-500 hover:shadow-lg">
                    {/* Logo + Details side by side */}
                    <div className="flex gap-10">
                      {/* Logo */}
                      {college.logo && (
                        <div className="shrink-0 flex items-start">
                          <img
                            src={college.logo}
                            alt={college.name}
                            className="h-32 w-32 rounded-sm object-contain bg-slate-50 p-1"
                          />
                        </div>
                      )}

                      {/* Details */}
                      <div className="flex flex-col flex-1">
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <h2 className="text-base md:text-lg font-semibold text-slate-900 group-hover:text-blue-700">
                            {college.name}
                          </h2>

                          <span className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-700">
                            {streamTitle.toUpperCase()}
                          </span>
                        </div>

                        {/* Address */}
                        <p className="text-xs text-slate-600 mb-2">
                          📍 <span>{college.address}</span>
                        </p>

                        {/* Courses */}
                        {Array.isArray(college.main_courses) &&
                          college.main_courses.length > 0 && (
                            <div className="mb-3 flex flex-wrap gap-1.5">
                              {college.main_courses
                                .slice(0, 5)
                                .map((course, i) => (
                                  <span
                                    key={i}
                                    className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-700"
                                  >
                                    {course}
                                  </span>
                                ))}

                              {college.main_courses.length > 5 && (
                                <span className="text-[11px] text-slate-500">
                                  +{college.main_courses.length - 5} more
                                </span>
                              )}
                            </div>
                          )}

                        {/* Fees / contact pill */}
                        <div className="mt-auto flex flex-wrap gap-2 pt-1 text-[11px]">
                          {college.fees && (
                            <div className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-500 border border-blue-500 px-3 py-1">
                              💰{" "}
                              <span className="font-medium">
                                {college.fees}
                              </span>
                            </div>
                          )}

                          {college.phone && (
                            <div className="inline-flex items-center gap-1 rounded-full bg-yellow-50 text-yellow-500 border border-yellow-500 px-3 py-1">
                              📞{" "}
                              <span className="font-medium">
                                {Array.isArray(college.phone)
                                  ? college.phone.join(" / ")
                                  : college.phone}
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
}