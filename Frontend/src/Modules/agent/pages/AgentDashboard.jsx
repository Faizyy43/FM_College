import { useEffect, useState } from "react";
import { fetchAgentDashboardStats } from "../services/agentDashboard.api";
import {
  FiUsers,
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";

import AgentLayout from "../../../layout/AgentLayout";

export default function AgentDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalApplications: 0,
    approved: 0,
    pending: 0,
    approvalRate: 0,
    profileCompletion: 0,
    recentApplications: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgentDashboardStats()
      .then((res) => {
        if (res?.data) {
          setStats({
            totalStudents: res.data.totalStudents ?? 0,
            totalApplications: res.data.totalApplications ?? 0,
            approved: res.data.approved ?? 0,
            pending: res.data.pending ?? 0,
          
            approvalRate: res.data.approvalRate ?? 0,
            profileCompletion: res.data.profileCompletion ?? 0,
            recentApplications: res.data.recentApplications ?? [],
          });
        }
      })
      .catch(() => {
        console.log("Dashboard API failed — showing default UI");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AgentLayout>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Dashboard
        </h1>
      </div>

      {/* Optional loading shimmer */}
      {loading && (
        <div className="text-sm text-gray-500 mb-4">
          Loading dashboard...
        </div>
      )}

      {/* ================= TOP STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">

        <StatCard
          icon={<FiUsers size={20} />}
          bg="bg-blue-100"
          text="text-blue-600"
          label="Total Students"
          value={stats.totalStudents}
        />

        <StatCard
          icon={<FiFileText size={20} />}
          bg="bg-indigo-100"
          text="text-indigo-600"
          label="Total Applications"
          value={stats.totalApplications}
        />

        <StatCard
          icon={<FiCheckCircle size={20} />}
          bg="bg-green-100"
          text="text-green-600"
          label="Approved"
          value={stats.approved}
        />

        <StatCard
          icon={<FiClock size={20} />}
          bg="bg-yellow-100"
          text="text-yellow-600"
          label="Pending"
          value={stats.pending}
        />
         
         {/* Profile Completion */}
<div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
    <FiFileText size={18} />
  </div>

  <div className="flex-1">
    <p className="text-sm text-gray-500">Profile Completion</p>
    <p className="text-lg font-semibold text-gray-800">
      {stats.profileCompletion}%
    </p>

    <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
      <div
        className="bg-indigo-600 h-2 transition-all duration-500"
        style={{ width: `${stats.profileCompletion}%` }}
      />
    </div>

    {stats.profileCompletion < 100 && (
      <p className="text-xs text-amber-600 mt-1">
        Complete profile to reach 100%
      </p>
    )}

    {stats.profileCompletion === 100 && (
      <p className="text-xs text-green-600 mt-1 font-medium">
        Profile fully completed
      </p>
    )}
  </div>
</div>
        
      </div>

      {/* ================= BOTTOM PANELS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Applications */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Recent Applications
          </h3>

          {stats.recentApplications.length === 0 ? (
            <p className="text-sm text-gray-400">
              No applications yet.
            </p>
          ) : (
            <div className="space-y-3 text-sm">
              {stats.recentApplications.map((app, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-gray-700">
                    {app.studentName}
                  </span>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      app.status === "APPROVED"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Approval Rate */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Approval Rate
          </h3>

          <div className="flex items-center gap-4">
            <FiTrendingUp size={28} className="text-green-600" />
            <p className="text-3xl font-bold text-green-600">
              {stats.approvalRate}%
            </p>
          </div>
        </div>
      </div>
    </AgentLayout>
  );
}

/* Reusable Card */
function StatCard({ icon, bg, text, label, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
      <div
        className={`w-10 h-10 rounded-xl ${bg} ${text} flex items-center justify-center`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-semibold text-gray-800">
          {value}
        </p>
      </div>
    </div>
  );
}


