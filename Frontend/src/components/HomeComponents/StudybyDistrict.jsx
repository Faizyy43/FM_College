import React, { useRef } from "react";
import { Link } from "react-router-dom";

// Import city college arrays
import {
  MehsanaColleges,
  AhmedabadColleges,
  GandhinagarColleges,
  VadodaraColleges,
  RajkotColleges,
} from "../../assets/assets.js";

// Summary info for cards
const cities = [
  {
    slug: "ahmedabad",
    name: "Ahmedabad",
    colleges: AhmedabadColleges.length,
    img: "Ahmedabad.png",
    avgCost: "₹60,000",
  },
  {
    slug: "gandhinagar",
    name: "Gandhinagar",
    colleges: GandhinagarColleges.length,
    img: "/Gandhinagar.png", // Fixed typo
    avgCost: "₹60,000",
  },
  {
    slug: "vadodara",
    name: "Vadodara",
    colleges: VadodaraColleges.length,
    img: "/Vadodara.png",
    avgCost: "₹60,000",
  },
  {
    slug: "rajkot",
    name: "Rajkot",
    colleges: RajkotColleges.length,
    img: "/Rajkot.png",
    avgCost: "₹60,000",
  },
  {
    slug: "mehsana",
    name: "Mehsana",
    colleges: MehsanaColleges.length,
    img: "/Mehsana.png",
    avgCost: "₹50,000",
  },
];

export default function StudyByDistrict() {
  const scrollerRef = useRef(null);

  const scroll = (direction = "right") => {
    if (!scrollerRef.current) return;
    const offset = scrollerRef.current.clientWidth * 0.8;
    scrollerRef.current.scrollBy({
      left: direction === "right" ? offset : -offset,
      behavior: "smooth",
    });
  };

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
                    Check {city.colleges} Colleges
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
                        {city.colleges}
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
                {/* City Image with transparent text overlay */}
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
