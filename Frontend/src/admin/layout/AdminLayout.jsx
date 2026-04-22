import { Outlet } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Sidebar from "../../admin/components/Sidebar";
import Navbar from "../../components/MainComponents/Navbar";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const [requests, setRequests] = useState([]);

  const API = import.meta.env.VITE_API_URL;

  const fetchRequests = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/api/requests`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch requests");

      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setRequests([]);
    }
  }, []);

  useEffect(() => {
    fetchRequests();

    const interval = setInterval(fetchRequests, 15000);
    return () => clearInterval(interval);
  }, [fetchRequests]);

  const pendingCount = requests.filter((r) => r.status === "Pending").length;

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} pendingCount={pendingCount} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 lg:ml-64">
        {/* Admin Navbar */}
        <Navbar setSidebarOpen={() => setOpen(!open)} />

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet context={{ requests, fetchRequests }} />
        </main>
      </div>
    </div>
  );
}
