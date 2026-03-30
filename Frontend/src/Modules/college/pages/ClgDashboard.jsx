import { useEffect, useState } from "react";
import { fetchCollegeDashboard } from "../services/clgDashboard.api";
import { FiBook, FiUsers, FiClock, FiClipboard } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import CollegeLayout from "../../../layout/CollegeLayout";

export default function ClgDashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   fetchCollegeDashboard()
  .then((data) => {
    console.log("Dashboard Response:", data); 
    setStats(data || {});
  })

      .catch((err) => {
        console.error("Dashboard load failed:", err);
        setStats({});
      })
      .finally(() => setLoading(false));
  }, []);

  const filled = Number(stats?.seats?.filled || 0);
  const total = Number(stats?.seats?.total || 0);
  const percentage =
    total > 0 ? Math.round((filled / total) * 100) : 0;

  return (
    <CollegeLayout>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          College Dashboard
        </h1>
        {loading && (
          <p className="text-xs text-gray-400 mt-1">
            Loading data...
          </p>
        )}
      </div>

      {/* ================= TOP STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">

        {/* Total Courses */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <FiBook size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Courses</p>
            <p className="text-2xl font-semibold text-gray-800">
              {stats.totalCourses ?? 0}
            </p>
          </div>
        </div>

        {/* Total Admissions */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
            <FiUsers size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Admissions</p>
            <p className="text-2xl font-semibold text-gray-800">
              {stats.totalAdmissions ?? 0}
            </p>
          </div>
        </div>

        {/* Pending Admissions */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
            <FiClock size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending Admissions</p>
            <p className="text-2xl font-semibold text-gray-800">
              {stats.pendingAdmissions ?? 0}
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
            <FaRupeeSign size={18} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-xl font-semibold text-gray-800">
              ₹{Number(stats.revenue?.collected || 0).toLocaleString()}
            </p>
          </div>
        </div>

       
      </div>

       {/* Seat Utilization */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
  <h3 className="text-sm font-semibold text-gray-700 mb-2">
    Seat Utilization
  </h3>

  <p className="text-sm text-gray-500 mb-2">
    {filled} / {total} seats filled
  </p>

  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
    <div
      className="bg-blue-600 h-3 transition-all duration-500"
      style={{ width: `${percentage}%` }}
    />
  </div>

  <p className="text-xs text-gray-500 mt-2">
    {percentage}% utilized
  </p>
</div>

      {/* ================= BOTTOM PANELS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Admissions */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Recent Admissions
          </h3>

          <div className="space-y-3 text-sm">
            {(stats.recentAdmissions || []).length === 0 && (
              <p className="text-gray-400 text-xs">
                No recent admissions
              </p>
            )}

            {(stats.recentAdmissions || []).map((s) => (
              <div
                key={s._id}
                className="flex items-center justify-between"
              >
                <span className="text-gray-700">
                  {s.studentName || "—"}
                </span>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium
                    ${
                      s.status === "approved"
                        ? "bg-green-100 text-green-600"
                        : s.status === "rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                >
                  {s.status?.toUpperCase() || "PENDING"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Recent Payments
          </h3>

          <div className="space-y-3 text-sm">
            {(stats.recentPayments || []).length === 0 && (
              <p className="text-gray-400 text-xs">
                No recent payments
              </p>
            )}

            {(stats.recentPayments || []).map((p) => (
              <div
                key={p._id}
                className="flex items-center justify-between"
              >
                <span className="text-gray-700">
                  {p.studentName || "—"}
                </span>
                <span className="font-medium text-blue-600">
                  ₹{Number(p.paidAmount || 0).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CollegeLayout>
  );
}