import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useEffect, useState } from "react";
import axios from "../../api/axios";

const colors = ["#16a34a", "#eab308", "#dc2626"];

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
      <p className="text-gray-500 text-sm sm:text-base">{title}</p>
      <h2 className="text-2xl sm:text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}

export default function DashboardHome() {
  const [stats, setStats] = useState([]);
  const [applicationsData, setApplicationsData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data || {};

        setStats([
          { title: "Students", value: data?.stats?.students || 0 },
          { title: "Colleges", value: data?.stats?.colleges || 0 },
          { title: "Agents", value: data?.stats?.agents || 0 },
          { title: "Establishments", value: data?.stats?.establishments || 0 },
        ]);

        setApplicationsData(data?.applicationsData || []);

        setStatusData(
          data?.statusData || [
            { name: "Verified", value: 0 },
            { name: "Pending", value: 0 },
            { name: "Rejected", value: 0 },
          ],
        );
      } catch (error) {
        console.error("Dashboard error", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="space-y-6 md:space-y-8 p-4 sm:p-6">
      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Applications Chart */}

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4 text-sm sm:text-base">
            Monthly Applications
          </h3>

          {applicationsData.length === 0 ? (
            <p className="text-gray-500 text-center mt-16 sm:mt-20 text-sm">
              No application data available
            </p>
          ) : (
            <div className="w-full h-62.5 sm:h-75">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={applicationsData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="apps" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Status Pie */}

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4 text-sm sm:text-base">
            Application Status
          </h3>

          {statusData.every((item) => item.value === 0) ? (
            <p className="text-gray-500 text-center mt-16 sm:mt-20 text-sm">
              No status data available
            </p>
          ) : (
            <div className="w-full h-62.5 sm:h-75">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={index} fill={colors[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
