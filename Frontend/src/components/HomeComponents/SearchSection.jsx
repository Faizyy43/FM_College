import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MehsanaColleges,
  AhmedabadColleges,
  VadodaraColleges,
  RajkotColleges,
  GandhinagarColleges,
} from "../../assets/assets.js";

// ALL SLIDES
const slides = [
  "https://www.searchurcollege.com/blog/wp-content/uploads/2023/11/Swarnim-Startup-Innovation-University-Gujarat.png",
  "https://www.knimbus.com/static-content/org_b275eb76-bcb7-4023-a652-ad678c5fc6a8/org_b275eb76-bcb7-4023-a652-ad678c5fc6a8_cover.jpg",
  "https://ahduni.edu.in/site/assets/files/30078/1600_x_1080_gate.1400x0.webp",
  "https://bookuradmission.com/campus_tour/16401534845.png",
  "https://assets.collegedunia.com/public/college_data/images/og_images/news/1678018416-pdeu.jpeg",
];

// COMBINE ALL COLLEGE LISTS
const ALL_COLLEGES = [
  ...MehsanaColleges,
  ...AhmedabadColleges,
  ...VadodaraColleges,
  ...RajkotColleges,
  ...GandhinagarColleges,
];

// Flatten colleges with cityKey added for navigation
const ALL_COLLEGES_FLAT = ALL_COLLEGES.map((college) => {
  const cityKey = MehsanaColleges.includes(college)
    ? "mehsana"
    : AhmedabadColleges.includes(college)
    ? "ahmedabad"
    : VadodaraColleges.includes(college)
    ? "vadodara"
    : RajkotColleges.includes(college)
    ? "rajkot"
    : GandhinagarColleges.includes(college)
    ? "gandhinagar"
    : null;
  return { ...college, cityKey };
});

// Slugify function to create URL-safe strings
const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function EducationalBanner() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // AUTOPLAY SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // FILTER SEARCH RESULTS
  const filteredResults =
    searchText.length >= 1
      ? ALL_COLLEGES.filter((college) =>
          college.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : [];

  // HANDLE SEARCH
  const handleSearch = (query) => {
    if (!query || query.length < 1) return;

    const college = ALL_COLLEGES_FLAT.find(
      (c) => c.name.toLowerCase() === query.toLowerCase()
    );

    if (college) {
      setSearchText("");
      navigate(`/college/${college.cityKey}/${slugify(college.name)}`);
    } else {
      alert("College not found");
    }
  };

  const handleCollegeClick = (college) => {
    handleSearch(college.name);
  };

  return (
    <div className="relative w-full h-[420px] md:h-[550px] overflow-hidden bg-gray-900 text-white">
      {/* SLIDER */}
      {slides.map((slide, idx) => (
        <img
          key={idx}
          src={slide}
          alt={`Slide ${idx + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
            idx === currentSlide ? "opacity-100 z-20" : "opacity-0"
          } brightness-50`}
        />
      ))}

      {/* TEXT + SEARCH */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-6">
       

        <h2 className="text-2xl md:text-3xl font-semibold">
          Search Better. Decide Smarter. Succeed Faster.
        </h2>

        {/* INLINE SEARCH BAR  */}
        <div className="mt-6 w-full max-w-5xl mx-auto px-4  sm:px-0">
          <div className="bg-white rounded-lg shadow-md flex flex-col sm:flex-row h-auto sm:h-14">
            <input
              type="text"
              placeholder="Search Colleges & Courses ..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="grow h-12 sm:h-full rounded-t-md sm:rounded-l-md sm:rounded-t-none px-4 py-3 text-gray-900 text-lg focus:outline-orange-400 border-none focus:ring-orange-400"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(searchText);
              }}
            />
           <button
  className="group relative overflow-hidden bg-linear-to-br from-amber-500 to-orange-500 text-white rounded-b-md sm:rounded-r-lg sm:rounded-b-none sm:rounded-br-lg h-12 sm:h-14 px-12 py-3 font-semibold flex items-center justify-center text-xl sm:text-xl mt-1 sm:mt-0"
  onClick={() => handleSearch(searchText)}
>

              <span
    className="
      inline-block
      transform
      transition-transform duration-200 ease-out
      group-hover:scale-[1]
    "
  >
    Search
  </span>

  <span
      className="
        absolute inset-0 opacity-0 group-hover:opacity-100
        bg-white/10
        transition-opacity duration-300
      "
    />
  
  
            </button>
          </div>

          {/* AJAX-STYLE DROPDOWN RESULTS */}
          {searchText.length >= 1 && (
            <div className="bg-white rounded-md shadow mt-1 text-left max-h-60 overflow-y-auto">
              {filteredResults.length === 0 ? (
                <p className="px-4 py-2 text-gray-600 text-sm">
                  No results found
                </p>
              ) : (
                <ul>
                  {filteredResults.map((college, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleCollegeClick(college)}
                    >
                      <span className="text-gray-800 font-semibold">
                        {college.name}
                      </span>
                      <br />
                      <span className="text-gray-500 text-sm">
                        {college.address}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
