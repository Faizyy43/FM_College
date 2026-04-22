import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const baseCities = [
  {
    slug: "ahmedabad",
    name: "Ahmedabad",
    img: "/Ahmedabad.png",
    fallbackAvgCost: "\u20b960,000",
  },
  {
    slug: "gandhinagar",
    name: "Gandhinagar",
    img: "/Gandhinagar.png",
    fallbackAvgCost: "\u20b960,000",
  },
  {
    slug: "vadodara",
    name: "Vadodara",
    img: "/Vadodara.png",
    fallbackAvgCost: "\u20b960,000",
  },
  {
    slug: "rajkot",
    name: "Rajkot",
    img: "/Rajkot.png",
    fallbackAvgCost: "\u20b960,000",
  },
  {
    slug: "mehsana",
    name: "Mehsana",
    img: "/Mehsana.png",
    fallbackAvgCost: "\u20b950,000",
  },
];

const getFeeValues = (college = {}) => {
  const courseFees = (college?.courses || [])
    .map((course) => Number(course?.fees))
    .filter((fee) => Number.isFinite(fee) && fee > 0);

  if (courseFees.length) return courseFees;

  const fallbackFee = Number(
    String(college?.fees || "").replace(/[^0-9.]/g, ""),
  );

  return Number.isFinite(fallbackFee) && fallbackFee > 0 ? [fallbackFee] : [];
};

const formatCurrency = (amount) =>
  `\u20b9${Math.round(amount).toLocaleString("en-IN")}`;

const initialCities = baseCities.map((city) => ({
  ...city,
  colleges: null,
  avgCost: city.fallbackAvgCost,
}));

export default function StudyByDistrict() {
  const scrollerRef = useRef(null);
  const [cities, setCities] = useState(initialCities);

  const scroll = (direction = "right") => {
    if (!scrollerRef.current) return;
    const offset = scrollerRef.current.clientWidth * 0.8;
    scrollerRef.current.scrollBy({
      left: direction === "right" ? offset : -offset,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let isCancelled = false;

    const fetchCities = async () => {
      const liveCities = await Promise.all(
        baseCities.map(async (city) => {
          try {
            const res = await api.get(`/college/district/${city.slug}`);
            const colleges = Array.isArray(res.data) ? res.data : [];
            const fees = colleges.flatMap(getFeeValues);

            return {
              ...city,
              colleges: colleges.length,
              avgCost: fees.length
                ? formatCurrency(
                    fees.reduce((sum, fee) => sum + fee, 0) / fees.length,
                  )
                : city.fallbackAvgCost,
            };
          } catch (error) {
            console.error(
              `StudyByDistrict fetch failed for ${city.slug}:`,
              error,
            );

            return {
              ...city,
              colleges: 0,
              avgCost: city.fallbackAvgCost,
            };
          }
        }),
      );

      if (!isCancelled) {
        setCities(liveCities);
      }
    };

    fetchCities();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-slate-900 mb-6">
        Explore Higher Education Options in Your Area
      </h2>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex border border-slate-200 items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 z-20 -ml-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M15 6L9 12L15 18" stroke="#374151" strokeWidth="2" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex items-center border border-slate-200 justify-center absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 z-20 -mr-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M9 6L15 12L9 18" stroke="#374151" strokeWidth="2" />
          </svg>
        </button>

        {/* Scroll Area */}
        <div
          ref={scrollerRef}
          className="
    overflow-x-auto scroll-smooth py-2 -mx-2 px-2 md:mx-0 md:px-0
    [&::-webkit-scrollbar]:hidden
    [-ms-overflow-style:'none']
    [scrollbar-width:'none']
  "
        >
          <div className="flex gap-6 items-stretch w-max snap-x snap-mandatory">
            {cities.map((city) => (
              <Link
                key={city.slug}
                to={`/colleges/${city.slug}`}
                className="snap-start shrink-0 w-[320px] md:w-[360px] 
          bg-white hover:bg-slate-50
          border border-slate-200 hover:border-blue-600
          rounded-2xl shadow-sm p-5 flex flex-col
          transition-all duration-300
          hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.01]
          relative hover:z-10"
              >
                {/* Header */}
                <header className="mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {city.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    Check {city.colleges ?? "..."} Colleges
                  </p>
                </header>

                {/* Stats Box */}
                <div className="bg-linear-to-br from-slate-100 to-slate-200 border border-slate-300 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-2 divide-x divide-slate-200 text-sm">
                    <div className="px-2">
                      <div className="text-xs text-slate-500">
                        No. Of Colleges
                      </div>
                      <div className="text-sm font-medium text-slate-800">
                        {city.colleges ?? "..."}
                      </div>
                    </div>
                    <div className="px-2">
                      <div className="text-xs text-slate-500">
                        Avg. Study Cost
                      </div>
                      <div className="text-sm font-medium text-slate-800">
                        {city.avgCost}
                      </div>
                    </div>
                  </div>
                </div>

                {/* City Image with overlay */}

                <div className="relative w-full h-40 rounded-xl overflow-hidden mt-auto">
                  <img
                    src={city.img}
                    alt={city.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white text-shadow-md underline font-thin italic decoration-amber-400/90 decoration-2 text-3xl drop-shadow-[0_0_5px_white] ">
                    {city.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
