import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { STREAM_CONFIG } from "../config/streamsConfig.js";
import {
  AhmedabadColleges,
  GandhinagarColleges,
  VadodaraColleges,
  RajkotColleges,
  MehsanaColleges,
} from "../assets/assets.js";

const slugify = (str = "") =>
  str
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const CITY_COLLEGES = {
  ahmedabad: AhmedabadColleges,
  gandhinagar: GandhinagarColleges,
  vadodara: VadodaraColleges,
  rajkot: RajkotColleges,
  mehsana: MehsanaColleges,
};

const ALL_COLLEGES = Object.entries(CITY_COLLEGES).flatMap(
  ([cityKey, colleges]) => colleges.map((college) => ({ ...college, cityKey }))
);

export default function CourseCollegesPage() {
  const { streamKey, courseSlug, programSlug } = useParams();
  const navigate = useNavigate();

  // Decide mode based on which param exists
  const isProgramRoute = Boolean(programSlug);

  let title = "";
  let colleges = [];

  if (isProgramRoute) {
    // Program-based
    title = programSlug.replace(/-/g, " ").toUpperCase();
    colleges = ALL_COLLEGES.filter((college) =>
      college.main_courses?.some((c) =>
        slugify(c).includes(programSlug)
      )
    );
  } else {
    // Stream-based
    const stream = STREAM_CONFIG[streamKey];
    if (!stream) return <div className="p-8">Stream not found.</div>;

    const course = stream.courses.find((c) => slugify(c.name) === courseSlug);
    if (!course) return <div className="p-8">Course not found.</div>;

    title = course.name + " – " + stream.title;

    colleges = ALL_COLLEGES.filter((college) =>
      college.main_courses?.some((c) =>
        c.toLowerCase().includes(course.name.toLowerCase().split(" ")[0])
      )
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg h-9 text-sm font-medium text-white bg-linear-to-b from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 shadow-md hover:shadow-lg active:scale-95"
        >
          ← Back
        </button>

        <h1 className="mt-4 text-2xl font-bold text-slate-900">{title} Colleges</h1>
        <p className="mt-2 text-sm text-slate-600">
          Showing colleges offering <strong>{title}</strong>.
        </p>

        <p className="mt-4 text-xs text-slate-500">
          {colleges.length} college{colleges.length !== 1 ? "s" : ""} found.
        </p>

        <div className="mt-4 grid gap-4">
          {colleges.map((college, idx) => {
            const slug = slugify(college.name);

            return (
              <Link
                key={`${college.cityKey}-${slug}-${idx}`}
                to={`/college/${college.cityKey}/${slug}`}
                className="bg-white rounded-2xl shadow-sm p-5 flex gap-4 items-start border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all"
              >
                {college.logo && (
                  <div className="h-32 w-32 bg-slate-50 p-1 flex items-center justify-center rounded-sm">
                    <img src={college.logo} alt={college.name} className="w-full h-full object-contain" />
                  </div>
                )}

                <div className="flex-1 pl-2 md:pl-4">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-lg font-semibold text-slate-900">{college.name}</h2>
                    <span className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-700">
                      {college.cityKey.replace(/^\w/, (c) => c.toUpperCase())}
                    </span>
                  </div>

                  {college.address && <p className="mt-1 text-sm text-slate-600">📍 {college.address}</p>}
                  {college.main_courses && <p className="mt-2 text-xs text-slate-500">Courses: {college.main_courses.join(", ")}</p>}
                  {college.fees && <p className="mt-1 text-xs text-slate-500">Fees: {college.fees}</p>}
                </div>
              </Link>
            );
          })}

          {colleges.length === 0 && <p className="mt-6 text-sm text-slate-500">No colleges added yet for this course.</p>}
        </div>

        {!isProgramRoute && (
          <div className="mt-8">
            <Link
              to={`/streams/${streamKey}`}
              className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full bg-linear-to-b from-blue-700 to-blue-900 text-white hover:from-blue-800 hover:to-blue-950"
            >
              Browse more courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
