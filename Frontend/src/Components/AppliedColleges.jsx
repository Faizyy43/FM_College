import { useEffect, useState } from "react";
import {
  Eye,
  CheckCircle,
  Clock,
  IndianRupee,
  CalendarDays,
  MapPin,
} from "lucide-react";

/* ================= STATUS CONFIG ================= */
const statusConfig = {
  Approved: {
    text: "Application Submitted",
    bg: "bg-green-50",
    textColor: "text-green-700",
    icon: CheckCircle,
    ring: "ring-green-200",
  },
  "Under Review": {
    text: "Under Review",
    bg: "bg-yellow-50",
    textColor: "text-yellow-700",
    icon: Clock,
    ring: "ring-yellow-200",
  },
};

const AppliedColleges = ({ onViewDetails }) => {
  const [applications, setAppliedApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_BASE;

  /* ================= FETCH APPLIED COLLEGES ================= */
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchApplied = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${API_BASE}/api/applied-colleges/approved?userId=${userId}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!res.ok) throw new Error("Failed request");

        const data = await res.json();
        setAppliedApplications(data || []);
      } catch (err) {
        console.log("Failed to fetch applied colleges", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplied();

    window.addEventListener("application-approved", fetchApplied);

    return () => {
      window.removeEventListener("application-approved", fetchApplied);
    };
  }, [API_BASE]);

  return (
    <div className="bg-white min-h-screen p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 sm:p-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
            🎓
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Your Applied Colleges
            </h2>
            <p className="text-sm text-gray-500">
              Track your application progress in real time
            </p>
          </div>
        </div>

        {loading && (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-28 bg-gray-100 rounded-2xl border border-gray-200"
              />
            ))}
          </div>
        )}

        {!loading && applications.length === 0 && (
          <div className="text-center py-14">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-gray-600 font-medium">
              No applied colleges found
            </p>
            <p className="text-sm text-gray-400">
              Approved applications will appear here
            </p>
          </div>
        )}

        {!loading && applications.length > 0 && (
          <div className="space-y-5">
            {applications.map((item) => {
              const status = statusConfig[item.status] || statusConfig.Approved;
              const StatusIcon = status.icon;

              const collegeName =
                typeof item.college === "string"
                  ? item.college
                  : item.college?.name || "College Name";

              const fee =
                item.fee || item.college?.fee || item.collegeFee || null;

              const location =
                item.location ||
                item.college?.location ||
                item.address ||
                item.college?.address ||
                "";

              const appliedDate = item.appliedOn
                ? new Date(item.appliedOn).toLocaleDateString()
                : null;

              const logoUrl = item.logo || item.college?.logo || "";

              return (
                <div
                  key={item._id}
                  className="rounded-2xl border border-gray-200 bg-white shadow-sm
                  hover:shadow-md hover:border-blue-200 transition-all duration-300"
                >
                  <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-[96px_1fr_auto] gap-5 md:gap-6 items-start">
                    <div className="shrink-0">
                      <div className="w-24 h-24 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
                        {logoUrl ? (
                          <img
                            src={logoUrl}
                            alt={collegeName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-xs text-gray-400 font-semibold text-center px-2">
                            College Logo
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-snug truncate">
                        {collegeName}
                      </h3>

                      {location && (
                        <p className="mt-1 text-sm text-gray-500 flex items-start gap-2">
                          <MapPin size={14} className="mt-0.5 shrink-0" />
                          <span className="line-clamp-1">{location}</span>
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-gray-50 border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
                          {item.course || "Course"}
                        </span>

                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700">
                          <IndianRupee size={14} />
                          {fee ? fee : "Fee not available"}
                        </span>
                      </div>

                      {appliedDate && (
                        <div className="mt-3 text-sm text-gray-500 flex items-center gap-2">
                          <CalendarDays size={16} />
                          Applied on{" "}
                          <span className="font-medium text-gray-800">
                            {appliedDate}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-3 md:items-end w-full md:w-auto">
                      <div
                        className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
                        ${status.bg} ${status.textColor} ring-1 ${status.ring} w-full md:w-auto`}
                      >
                        <StatusIcon size={16} />
                        {status.text}
                      </div>

                      <button
                        onClick={() => onViewDetails?.(item)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl
                        border border-gray-200 text-sm font-semibold text-gray-700
                        hover:bg-gray-50 transition w-full md:w-auto"
                      >
                        <Eye size={16} />
                        View Application
                      </button>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedColleges;
