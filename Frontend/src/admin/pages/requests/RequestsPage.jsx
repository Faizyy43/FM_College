import { useEffect, useState } from "react";
import RequestTable from "./RequestTable";
import { useOutletContext } from "react-router-dom";

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const outletContext = useOutletContext() || {};
  const globalRequests = outletContext.requests || [];
  const refreshRequests = outletContext.fetchRequests;

  const API = import.meta.env.VITE_API_URL;

  const fetchRequests = async () => {
    try {
      if (refreshRequests) {
        await refreshRequests();
        setRequests(globalRequests);
      } else {
        /* ===== FETCH BOTH REQUEST TYPES ===== */

        const token = localStorage.getItem("token");

        const [collegeRes, establishmentRes, requestRes] = await Promise.all([
          fetch(`${API}/api/admin/colleges/pending`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${API}/api/admin/establishments/pending`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${API}/api/admin/requests`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        /* ===== HANDLE BAD RESPONSES ===== */

        if (!collegeRes.ok || !establishmentRes.ok || !requestRes.ok) {
          console.error(
            "API Error:",
            collegeRes.status,
            establishmentRes.status,
            requestRes.status,
          );
          setRequests([]);
          return;
        }

        const colleges = await collegeRes.json();
        const establishments = await establishmentRes.json();
        const adminReqs = await requestRes.json();

        /* ===== NORMALIZE DATA ===== */

        const collegeRequests = Array.isArray(colleges)
          ? colleges.map((c) => ({
              ...c,
              role: "COLLEGE",
              name: c.name || c.collegeName,
              status: (c.status || "").toUpperCase(),
            }))
          : [];

        const establishmentRequests = Array.isArray(establishments)
          ? establishments.map((e) => ({
              ...e,
              role: "ESTABLISHMENT",
              name: e.establishmentName,
              status: (e.status || "").toUpperCase(),
            }))
          : [];

        const adminRequests = Array.isArray(adminReqs)
          ? adminReqs.map((r) => ({
              ...r,
              role: r.role?.toUpperCase(),
              name: r.fullName,
              status: (r.status || "").toUpperCase(),
            }))
          : [];

        const allRequests = [
          ...collegeRequests,
          ...establishmentRequests,
          ...adminRequests,
        ];

        console.log("All Requests:", allRequests);

        setRequests(allRequests);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (globalRequests.length > 0) {
      setRequests(globalRequests);
      setLoading(false);
    } else {
      fetchRequests();
    }
  }, [globalRequests]);

  /* ================= FILTER ================= */

  const filteredRequests =
    activeTab === "All"
      ? requests.filter((req) => req.status === "PENDING")
      : requests.filter(
          (req) =>
            (req.role === activeTab.toUpperCase() ||
              req.agentType === activeTab) &&
            req.status === "PENDING",
        );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-500 text-sm sm:text-base">
          Loading requests...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Requests Management
        </h1>

        <span className="text-sm text-gray-500">
          Total Pending: {filteredRequests.length}
        </span>
      </div>

      {/* ===== TABS ===== */}

      <div className="flex gap-2 sm:gap-3 overflow-x-auto border-b border-gray-300 pb-3">
        {["All", "Agent", "College", "Establishment"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              activeTab === tab
                ? "bg-indigo-500 text-white shadow"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ===== TABLE ===== */}

      {filteredRequests.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-10 text-center text-gray-500 text-sm shadow">
          No pending requests found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <RequestTable
            data={filteredRequests}
            onActionComplete={fetchRequests}
          />
        </div>
      )}
    </div>
  );
}
