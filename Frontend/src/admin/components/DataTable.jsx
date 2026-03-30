import { useState, useMemo } from "react";

export default function DataTable({
  title,
  columns,
  data = [],
  onView,
  onDelete,
  onCreateAccount,
}) {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;

    const lowerSearch = search.toLowerCase();

    return data.filter((row) =>
      Object.values(row).join(" ").toLowerCase().includes(lowerSearch),
    );
  }, [data, search]);

  /* ================= STATUS BADGE ================= */

  const statusBadge = (status) => {
    const styles = {
      PENDING: "bg-yellow-50 text-yellow-600 border border-yellow-200",
      ACTIVE: "bg-green-50 text-green-600 border border-green-200",
      Approved: "bg-green-50 text-green-600 border border-green-200",
      APPROVED: "bg-green-50 text-green-600 border border-green-200",
      VERIFIED: "bg-blue-50 text-blue-600 border border-blue-200",
      ACCOUNT_CREATED: "bg-green-50 text-green-600 border border-green-200",
      Rejected: "bg-red-50 text-red-600 border border-red-200",
      Success: "bg-green-50 text-green-600 border border-green-200",
    };

    return (
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${
          styles[status] || "bg-white text-gray-600 border border-gray-200"
        }`}
      >
        {status || "Success"}
      </span>
    );
  };

  /* ================= DELETE ================= */

  const confirmDelete = async () => {
    if (!onDelete || !deleteId) return;

    try {
      setDeleting(true);
      await onDelete(deleteId);
      setDeleteId(null);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-200">
        {/* ================= HEADER ================= */}

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {title}
          </h2>

          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 text-sm w-full sm:w-64 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ================= TABLE ================= */}

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className="pb-4 text-left font-medium whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}

                <th className="pb-4 text-center font-medium whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredData.map((row) => {
                const status = (row.Status || row.status || "").toUpperCase();

                return (
                  <tr
                    key={row._id || row.id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    {columns.map((col, index) => {
                      const key = col.toLowerCase();
                      const value = row[col] || row[key];

                      return (
                        <td key={index} className="py-4 pr-4 whitespace-nowrap">
                          {key === "status" ? statusBadge(status) : value}
                        </td>
                      );
                    })}

                    {/* ================= ACTIONS ================= */}

                    <td className="py-4 text-center whitespace-nowrap space-x-2">
                      {/* CREATE ACCOUNT */}

                      {status === "VERIFIED" && onCreateAccount && (
                        <button
                          onClick={() => onCreateAccount(row._id)}
                          className="px-3 py-1 text-xs bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                          Create Account
                        </button>
                      )}

                      {/* VIEW */}

                      {["ACCOUNT_CREATED", "ACTIVE", "APPROVED"].includes(
                        status,
                      ) && (
                        <button
                          onClick={() => onView && onView(row)}
                          className="px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
                        >
                          View
                        </button>
                      )}

                      {/* DELETE (FIXED CONDITION) */}

                      {["ACCOUNT_CREATED", "ACTIVE", "APPROVED"].includes(
                        status,
                      ) &&
                        onDelete && (
                          <button
                            onClick={() =>
                              setDeleteId(row._id || row.id || row)
                            }
                            className="px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                          >
                            Delete
                          </button>
                        )}
                    </td>
                  </tr>
                );
              })}

              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="text-center py-10 text-gray-400"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= DELETE MODAL ================= */}

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Delete Item
            </h3>

            <p className="text-gray-600 text-sm mb-6">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {deleting && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}

                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
