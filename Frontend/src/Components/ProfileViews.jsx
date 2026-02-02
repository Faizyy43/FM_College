import React, { useEffect, useState } from "react";
import { Eye, CalendarDays, User, BarChart3 } from "lucide-react";

const ProfileViews = () => {
  const API_BASE = import.meta.env.VITE_API_BASE;

  const [data, setData] = useState({
    totalViews: 0,
    lastViewed: null,
    viewers: [],
  });

  const [loading, setLoading] = useState(true);

  // ⚠️ put your logged-in userId here
  const userId = "6964c81c93af5beb20bd40d7";

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/profile-views/${userId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Request failed");

        const result = await res.json();

        setData({
          totalViews: result?.totalViews || 0,
          lastViewed: result?.lastViewed || null,
          viewers: result?.viewers || [],
        });
      } catch (err) {
        console.log("Failed to fetch profile views", err);

        // Prevent crash if API missing
        setData({
          totalViews: 0,
          lastViewed: null,
          viewers: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchViews();
  }, [API_BASE, userId]);

  const formatLastViewed = (dateString) => {
    if (!dateString) return "Not viewed yet";

    const date = new Date(dateString);
    const diff = Date.now() - date.getTime();

    const mins = Math.floor(diff / (1000 * 60));
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins} minutes ago`;

    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hours ago`;

    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  return (
    <section className="w-full space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <Eye className="text-blue-600" />
            <h3 className="font-semibold text-gray-800">Total Views</h3>
          </div>

          {loading ? (
            <p className="text-gray-400 mt-3">Loading...</p>
          ) : (
            <p className="text-3xl font-bold text-gray-900 mt-3">
              {data.totalViews}
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <CalendarDays className="text-blue-600" />
            <h3 className="font-semibold text-gray-800">Last Viewed</h3>
          </div>

          {loading ? (
            <p className="text-gray-400 mt-3">Loading...</p>
          ) : (
            <p className="text-lg font-medium text-gray-800 mt-3">
              {formatLastViewed(data.lastViewed)}
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="text-blue-600" />
            <h3 className="font-semibold text-gray-800">Profile Visibility</h3>
          </div>

          {loading ? (
            <p className="text-gray-400 mt-3">Loading...</p>
          ) : (
            <p className="text-sm font-medium text-green-600 mt-3">
              {data.totalViews > 50 ? "High visibility" : "Normal visibility"}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-800">
          <User className="text-blue-600" />
          Recent Profile Views
        </h3>

        {loading ? (
          <p className="text-sm text-gray-500">Loading viewers...</p>
        ) : data.viewers.length === 0 ? (
          <p className="text-sm text-gray-500">No profile views yet.</p>
        ) : (
          <div className="space-y-4">
            {data.viewers.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border border-gray-200 rounded-xl p-4"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.source}</p>
                </div>

                <span className="text-xs text-gray-400">
                  {new Date(item.date).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileViews;
