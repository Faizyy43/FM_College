import React from "react";
import { useNavigate } from "react-router-dom";

const CollegeStuCTA = ({
  college,
  collegeSlug,
  isLoggedIn,
  setShowAuthPopup,
}) => {
  const navigate = useNavigate();
  const collegeName = college?.collegeName || college?.name || "this college";

  return (
    <div className="mt-7 rounded-xl border border-gray-200 bg-linear-to-r from-slate-50 to-white px-6 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
      
      {/* Left Content */}
      <div>
        <p className="text-lg font-semibold text-gray-900">
          Ready to take the next step?
        </p>
        <p className="mt-1 text-sm text-gray-600 max-w-md">
          Apply to <span className="font-medium">{collegeName}</span> or
          download the official brochure with courses, fees & placements.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        
        {/* Apply */}
        <button
          onClick={() => {
            if (!isLoggedIn) {
              setShowAuthPopup(true);
            } else {
              navigate(`/apply/${collegeSlug}`);
            }
          }}
          className="group relative overflow-hidden px-8 py-3.5 rounded-xl bg-linear-to-br from-amber-500 to-orange-500 text-white font-semibold shadow-md hover:shadow-lg transition-all"
        >
          Apply Now
        </button>

        {/* Brochure */}
        <button
          onClick={() => alert(`Download brochure for ${collegeName}`)}
          className="px-8 py-3.5 rounded-xl border border-blue-500/40 text-blue-700 font-semibold bg-white shadow-sm hover:bg-blue-50 transition-all"
        >
          Download Brochure
        </button>
      </div>
    </div>
  );
};

export default CollegeStuCTA;
