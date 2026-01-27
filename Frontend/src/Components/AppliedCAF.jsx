import React, { useEffect, useState } from "react";
import axios from "axios";
import { FileText, CalendarDays, Download, Eye } from "lucide-react";

const getStatusStyle = (status) => {
  switch (status) {
    case "Approved":
      return "bg-green-50 text-green-700 ring-1 ring-green-200";
    case "Under Review":
      return "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200";
    case "Rejected":
      return "bg-red-50 text-red-700 ring-1 ring-red-200";
    default:
      return "bg-blue-50 text-blue-700 ring-1 ring-blue-200";
  }
};

const AppliedCAF = () => {
  const [cafApplications, setCafApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCAF = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/caf-applications");
      setCafApplications(res.data);
    } catch (error) {
      console.log("CAF Fetch Error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCAF();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6 max-w-6xl">
      {/* HEADER */}
      <div className="flex items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100">
            <FileText className="text-blue-600" size={20} />
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Applied CAF
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Track your submitted CAF applications and their status.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
          <span className="px-2 py-1 rounded-lg bg-gray-50 border border-gray-200">
            Total: {cafApplications.length}
          </span>
        </div>
      </div>

      {/* BODY */}
      {loading ? (
        <div className="space-y-4">
          <div className="h-24 rounded-xl border border-gray-200 bg-gray-50 animate-pulse" />
          <div className="h-24 rounded-xl border border-gray-200 bg-gray-50 animate-pulse" />
        </div>
      ) : cafApplications.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
          <p className="text-sm font-medium text-gray-800">
            No CAF applications found
          </p>
          <p className="text-xs text-gray-500 mt-1">
            You have not submitted any CAF applications yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {cafApplications.map((item) => (
            <div
              key={item._id}
              className="group rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 transition-all duration-200 hover:shadow-lg hover:border-gray-300"
            >
              {/* TOP ROW */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100">
                    <FileText className="text-blue-600" size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Application ID</p>
                    <p className="text-base font-semibold text-gray-900">
                      {item.applicationId}
                    </p>

                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={14} className="text-gray-500" />
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:justify-end">
                  <span
                    className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
                      item.status,
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              {/* DETAILS */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Course</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {item.course}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 sm:col-span-2">
                  <p className="text-xs text-gray-500">Colleges Selected</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {item.colleges.join(", ")}
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-5 border-t border-gray-200 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex gap-3">
                  <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100 transition">
                    <Eye size={16} />
                    View Details
                  </button>

                  <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                    <Download size={16} />
                    Download PDF
                  </button>
                </div>

                <p className="text-xs text-gray-400 sm:text-right">
                  Updated recently
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedCAF;
