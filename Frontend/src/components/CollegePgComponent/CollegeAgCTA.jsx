import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const CollegeAgCTA = ({ college, isLoggedIn, setShowAuthPopup }) => {
  const [status, setStatus] = useState("NONE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH PARTNER STATUS ================= */
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchStatus = async () => {
      try {
        const res = await api.get(
          `/agent/partners/${college._id}/status`
        );

        setStatus(res.data.status || "NONE");

      } catch (err) {
        setStatus("NONE");
      }
    };

    fetchStatus();
  }, [college._id, isLoggedIn]);

  /* ================= REQUEST PARTNER ================= */
  const handleApply = async () => {
    if (!isLoggedIn) {
      setShowAuthPopup(true);
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.post("/agent/partners", {
        collegeId: college._id,
      });

      setStatus("PENDING");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to send partner request."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= BUTTON RENDER ================= */
  const renderButton = () => {
    if (status === "APPROVED") {
      return (
        <span className="px-8 py-3.5 rounded-xl bg-green-600 text-white font-semibold">
          Partnered
        </span>
      );
    }

    if (status === "PENDING") {
      return (
        <span className="px-8 py-3.5 rounded-xl bg-yellow-500 text-white font-semibold">
          Request Pending
        </span>
      );
    }

    return (
      <button
        onClick={handleApply}
        disabled={loading}
        className="px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition-all disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Apply as Partner"}
      </button>
    );
  };

  return (
    <div className="mt-7 rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-white px-6 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

      <div>
        <p className="text-lg font-semibold text-indigo-900">
          Want to become a Partner?
        </p>

        <p className="mt-1 text-sm text-gray-600 max-w-md">
          Partner with{" "}
          <span className="font-medium">{college.collegeName}</span>
          {" "}and start helping students with admissions while earning commission.
        </p>

        {error && (
          <p className="mt-2 text-sm text-red-600 font-medium">
            {error}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {renderButton()}

        <button
          onClick={() => (window.location.href = "/contact")}
          className="px-8 py-3.5 rounded-xl border border-indigo-400 text-indigo-700 font-semibold bg-white hover:bg-indigo-50 transition-all"
        >
          Contact Team
        </button>
      </div>

    </div>
  );
};

export default CollegeAgCTA;