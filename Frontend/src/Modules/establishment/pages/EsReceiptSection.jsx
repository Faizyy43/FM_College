import { useEffect, useState } from "react";
import { fetchPaymentHistory } from "../services/esPayment.api";
import api from "../../../api/axios";

export default function EsReceiptSection({ student }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!student?._id) return;

    const loadReceipts = async () => {
      try {
        setLoading(true);
        const res = await fetchPaymentHistory(student._id);
        setPayments(res.data);
      } catch (err) {
        console.error("Receipt fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadReceipts();
  }, [student]);

  if (loading) {
    return (
      <div className="mt-6 text-sm text-slate-500">Loading receipts...</div>
    );
  }

  if (!payments.length) {
    return (
      <div className="mt-6 text-sm text-slate-400">No receipts available</div>
    );
  }

  return (
    <div className="mt-8">
      <h4 className="text-sm font-semibold text-slate-700 mb-4">Receipts</h4>

      <div className="space-y-3">
        {payments.map((p) => (
          <div
            key={p._id}
            className="flex justify-between items-center
                       bg-white border border-gray-200 
                       rounded-xl px-4 py-3 shadow-sm"
          >
            {/* LEFT SIDE */}
            <div>
              <p className="text-xs font-semibold">Receipt #{p.receiptNo}</p>
              <p className="text-[11px] text-slate-500">
                {new Date(p.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* AMOUNT */}
            <div className="text-xs font-semibold">₹ {p.amount}</div>

            {/* ACTIONS */}
            <div className="flex gap-2">
              <button
                onClick={() =>
                  window.open(`/api/payments/receipt/${p._id}`, "_blank")
                }
                className="px-3 py-1 rounded-lg text-xs
                           bg-slate-100 text-slate-700"
              >
                View
              </button>

              <a
                href={`/api/payments/receipt/${p._id}?download=true`}
                className="px-3 py-1 rounded-lg text-xs
                           bg-indigo-600 text-white"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
