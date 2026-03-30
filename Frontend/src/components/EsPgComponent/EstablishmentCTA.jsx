import React from "react";
import { useNavigate } from "react-router-dom";

const EstablishmentCTA = ({
  establishment,
  districtKey,
  slug,
  isLoggedIn,
  setShowAuthPopup,
}) => {
  const navigate = useNavigate();

  return (
    <div className="mt-7 rounded-xl border border-gray-200 bg-linear-to-r from-slate-50 to-white px-6 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
      
      {/* Left Content */}
      <div>
        <p className="text-lg font-semibold text-gray-900">
          Ready to start your training?
        </p>

        <p className="mt-1 text-sm text-gray-600 max-w-md">
  Apply to{" "}
  <span className="font-medium">
    {establishment?.establishmentName || "this establishment"}
  </span>{" "}
  and begin building your career with industry-ready skills.
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
              navigate(`/establishment/${districtKey}/${slug}/apply`);
            }
          }}
          className="group relative overflow-hidden px-8 py-3.5 rounded-xl bg-linear-to-br from-amber-500 to-orange-500 text-white font-semibold shadow-md hover:shadow-lg transition-all"
        >
          Apply Now
        </button>

      </div>
    </div>
  );
};

export default EstablishmentCTA;