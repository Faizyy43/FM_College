
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StreamsData } from "../assets/assets.js";
import { STREAM_CONFIG } from "../config/streamsConfig.js";

// Reusable slugify (must match CourseCollegesPage)
const slugify = (str = "") =>
  str
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function StreamPage() {
  const { streamKey } = useParams();
  const navigate = useNavigate();

  const config = STREAM_CONFIG[streamKey];
  const colleges = StreamsData[streamKey];

  // Prevent crash if invalid streamKey
  if (!config) {
    return <div className="p-8 text-red-500">Stream not found.</div>;
  }

  const Icon = config.Icon;

  const {
    title,
    heroTagline,
    aboutTitle,
    aboutText = [],
    stats = [],
    courses = [],
    careers = [],
  } = config;

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-gray-50 to-white">
      
      {/* HERO SECTION */}
      <section className="w-full bg-linear-to-br from-gray-600 to-blue-200 text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14 flex flex-col md:flex-row items-center md:items-start gap-6">
          
          {/* Icon */}
          <div className="shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur shadow-xl">
              <Icon className="text-3xl md:text-4xl text-amber-400" />
            </div>
          </div>

          {/* Title */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
              {title}
            </h1>
            <p className="text-sm md:text-base mt-3 text-gray-200 max-w-2xl">
              {heroTagline}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs md:text-sm">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                🔹 Gujarat Colleges
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                📚 Courses &amp; Specialisations
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                💼 Career Options
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
          
          {/* About */}
          <div className="md:col-span-2 leading-relaxed">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {aboutTitle}
            </h2>
            {aboutText.map((para, idx) => (
              <p key={idx} className={`text-sm md:text-base ${idx > 0 ? "mt-3" : ""}`}>
                {para}
              </p>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-xl p-3 bg-gray-50 border border-gray-200 hover:bg-blue-50 hover:border-blue-400 transition shadow-sm">
                <p className="text-[11px] text-gray-500 uppercase tracking-wide">
                  {item.label}
                </p>
                <p className="text-sm md:text-base font-semibold text-gray-900 mt-1">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      {courses.length > 0 && (
        <section className="w-full bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
              <h2 className="text-2xl font-semibold text-gray-900">
                Popular {title} Courses
              </h2>
              <p className="text-xs md:text-sm text-gray-500">
                Choose from undergraduate (UG) and postgraduate (PG) programs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {courses.map((course) => {
                const courseSlug = slugify(course.name);

                return (
                  <div
                    key={course.name}
                    className="group rounded-2xl p-5 bg-white border border-gray-200 shadow-sm cursor-pointer hover:border-blue-500"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                        {course.name}
                      </h3>

                      {course.level && (
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full border ${
                            course.level === "UG"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}
                        >
                          {course.level} Program
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm">{course.desc}</p>

                    <button
                      onClick={() =>
                        navigate(`/streams/${streamKey}/courses/${courseSlug}`)
                      }
                      className="mt-3 text-xs md:text-sm font-medium text-blue-600 group-hover:underline"
                    >
                      View colleges offering {course.name} →
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* CAREERS SECTION */}
      {careers.length > 0 && (
        <section className="w-full bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
            <h2 className="text-2xl font-semibold mb-5 text-gray-900">
              Career Opportunities after {title}
            </h2>

            <p className="text-sm md:text-base text-gray-600 mb-4">
              After completing a program in this stream, students can explore:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {careers.map((career, index) => (
                <div
                  key={index}
                  className="p-3 md:p-4 text-xs md:text-sm text-gray-800 rounded-xl bg-gray-50 border border-gray-200 hover:bg-blue-100 hover:border-blue-500 transition shadow-sm flex items-center"
                >
                  <span className="mr-2 text-blue-600 text-lg">•</span>
                  {career}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER CTA */}
      <section className="w-full bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-700">
            Ready to explore more colleges and courses for {title}?
          </p>

          <button
            onClick={() => navigate(`/streams/${streamKey}/colleges`)}
            className="
  group relative overflow-hidden
  px-7 py-2.5 rounded-xl
  bg-linear-to-bl from-blue-700 to-blue-900
  text-white font-normal
  shadow-md shadow-violet-500/20
  hover:shadow-lg hover:shadow-violet-500/25 
  transition-all duration-200 ease-out
  active:scale-[0.99]
"

          >
            Browse {title} Colleges

             <span
      className="
        absolute inset-0 opacity-0 group-hover:opacity-60
        bg-white/10
        transition-opacity duration-300
      "
    />
          </button>
        </div>
      </section>

      

    </div>
  );
}
