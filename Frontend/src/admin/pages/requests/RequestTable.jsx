import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RequestTable({ data = [] }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = data.filter((req) =>
    (req.fullName || req.name || "")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const statusBadge = (status) => {
    const styles = {
      PENDING: "bg-yellow-100 text-yellow-700 border border-yellow-200",
      VERIFIED: "bg-blue-100 text-blue-700 border border-blue-200",
      ACCOUNT_CREATED: "bg-green-100 text-green-700 border border-green-200",
      REJECTED: "bg-red-100 text-red-700 border border-red-200",
    };

    return (
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${
          styles[status] || styles.PENDING
        }`}
      >
        {status}
      </span>
    );
  };

  const handleVerify = async (req) => {
    try {
      let url = "";

      const role = (req.role || "").toUpperCase();

      if (role === "COLLEGE") {
        url = `http://localhost:5000/api/admin/colleges/verify/${req._id}`;
      }

      if (role === "ESTABLISHMENT") {
        url = `http://localhost:5000/api/admin/establishment/verify/${req._id}`;
      }

      if (!url) {
        console.error("Invalid role:", req.role);
        alert("Invalid request role");
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Admin not authenticated");
        return;
      }

      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) {
        console.error(result);
        throw new Error("Verification failed");
      }

      alert("Verified successfully");

      window.location.reload();
    } catch (error) {
      console.error("Verify error:", error);
      alert("Verification failed");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-white text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left">Name</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left">Role</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left">Status</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">
                  No requests found.
                </td>
              </tr>
            ) : (
              filtered.map((req) => (
                <tr
                  key={req._id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-indigo-600 cursor-pointer">
                    <span
                      onClick={() => navigate(`/admin/requests/${req._id}`)}
                      className="wrap-break-word"
                    >
                      {req.fullName || req.name}
                    </span>

                    <div className="text-xs text-gray-400 mt-1 break-all">
                      {req.email}
                    </div>
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    {req.role || "Agent"}
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    {statusBadge(req.status)}
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                    {/* VERIFY only for College & Establishment */}
                    {req.status === "PENDING" &&
                      ["COLLEGE", "ESTABLISHMENT"].includes(
                        (req.role || "").toUpperCase(),
                      ) && (
                        <button
                          onClick={() => handleVerify(req)}
                          className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-lg mr-2"
                        >
                          Verify
                        </button>
                      )}

                    <button
                      onClick={() => navigate(`/admin/requests/${req._id}`)}
                      className="px-3 sm:px-4 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
