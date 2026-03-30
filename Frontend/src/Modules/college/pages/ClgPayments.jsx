import { useEffect, useState } from "react";
import CollegeLayout from "../../../layout/CollegeLayout";
import { fetchCollegePayments } from "../services/clgPayments.api";

export default function ClgPayments() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    available: 0,
    pending: 0,
    collected: 0,
  });

  /* ================= LOAD PAYMENTS ================= */
  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const res = await fetchCollegePayments();
      const data = res.data || [];

      setRows(data);

      // calculate stats safely
      let collected = 0;
      let pending = 0;

      data.forEach((p) => {
        collected += Number(p.paid || 0);
        pending += Number(p.remaining || 0);
      });

      setStats({
        available: collected,
        pending,
        collected,
      });
    } catch (err) {
      console.error("Payment load error:", err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CollegeLayout>
      <div className="space-y-8">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight 
            bg-gradient-to-r from-blue-600 to-indigo-600 
            bg-clip-text text-transparent">
            Payments & Installments
          </h2>

          <p className="mt-2 text-sm text-gray-500 max-w-xl">
            Manage student payments, installment plans, and revenue tracking.
          </p>

          <div className="mt-3 h-1 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center py-10">
            <div className="h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* STATS */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Available Balance" value={stats.available} />
            <StatCard title="Pending Collection" value={stats.pending} />
            <StatCard title="Total Collected" value={stats.collected} success />
          </div>
        )}

        {/* TABLE */}
        {!loading && (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <h3 className="text-lg font-semibold p-6 border-b border-gray-200">
              Student Payment Ledger
            </h3>

            {rows.length === 0 ? (
              <div className="p-6 text-gray-500 text-sm">
                No payments found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="p-4 text-left">Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Course</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Paid</th>
                      <th className="p-4">Remaining</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((r) => (
                      <tr
                        key={r._id}
                        className="border-t border-gray-200 hover:bg-gray-50"
                      >
                        <td className="p-4 font-medium">
                          {r.name}
                        </td>

                        <td className="p-4">
                          {r.email}
                        </td>

                        <td className="p-4">
                          {r.course}
                        </td>

                        <td className="p-4">
                          ₹{Number(r.total || 0).toLocaleString()}
                        </td>

                        <td className="p-4 text-green-600">
                          ₹{Number(r.paid || 0).toLocaleString()}
                        </td>

                        <td className="p-4 text-red-500">
                          ₹{Number(r.remaining || 0).toLocaleString()}
                        </td>

                        <td className="p-4">
                          <StatusBadge status={r.status} />
                        </td>

                        <td className="p-4 flex gap-2">
                          <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                            View
                          </button>

                          <button className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </CollegeLayout>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, success }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <p className="text-sm text-gray-500">{title}</p>

      <p
        className={`text-2xl font-bold mt-2 ${
          success ? "text-green-600" : "text-gray-900"
        }`}
      >
        ₹{Number(value || 0).toLocaleString()}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    PAID: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}
