import React, { useEffect, useState } from "react";
import {
  GraduationCap,
  Clock,
  CalendarDays,
  AlertCircle,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";

const PendingApplications = () => {
  const [pendingApplications, setPendingApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  /* ================= FETCH DATA ================= */
  const fetchPendingApplications = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/pending-applications");

      if (!res.ok) {
        const text = await res.text();
        console.log("❌ Backend error:", res.status, text);
        throw new Error("Fetch failed");
      }

      const data = await res.json();
      setPendingApplications(data);
    } catch (err) {
      console.error("Failed to fetch pending applications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingApplications();
  }, []);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    try {
      setActionLoading(id);

      const res = await fetch(
        `http://localhost:5000/api/pending-applications/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        console.log("Backend error:", data);
        throw new Error(data.message || "Failed");
      }

      setPendingApplications((prev) => prev.filter((item) => item._id !== id));
      alert(`Application ${status}`);
      window.dispatchEvent(new Event("application-approved"));
    } catch (err) {
      console.log(err);
      alert("Update failed");
    } finally {
      setActionLoading(null);
    }
  };

  /* ================= UI ================= */
  return (
    <section className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-blue-50">
          <Clock className="text-blue-600" size={20} />
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Pending Applications
        </h2>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-sm text-gray-500">Loading applications...</p>
      )}

      {/* EMPTY */}
      {!loading && pendingApplications.length === 0 && (
        <p className="text-sm text-gray-500">
          You have no pending applications.
        </p>
      )}

      {/* LIST */}
      <div className="space-y-5">
        {pendingApplications.map((item) => (
          <div
            key={item._id}
            className="border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-md transition"
          >
            {/* HEADER ROW */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="text-blue-600 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item.college}
                  </h3>
                  <p className="text-sm text-gray-500">{item.course}</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                <AlertCircle size={14} />
                {item.status}
              </span>
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                <span>
                  Applied on {new Date(item.appliedOn).toLocaleDateString()}
                </span>
              </div>

              <div className="lg:col-span-2">
                <p className="text-gray-500 mb-1">Pending Reason</p>
                <p className="font-medium text-gray-800">
                  {item.reason || "—"}
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-5 pt-4 border-t flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
                <Eye size={14} />
                View Application
              </button>

              <div className="flex gap-2 ml-auto">
                <button
                  disabled={actionLoading === item._id}
                  onClick={() => updateStatus(item._id, "Approved")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                  bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
                >
                  <CheckCircle size={16} />
                  Approve
                </button>

                <button
                  disabled={actionLoading === item._id}
                  onClick={() => updateStatus(item._id, "Rejected")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                  bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
                >
                  <XCircle size={16} />
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PendingApplications;
