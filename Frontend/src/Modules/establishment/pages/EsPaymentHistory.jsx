// import { useEffect, useState } from "react";
// import { fetchPaymentHistory } from "../services/esPayment.api";

// export default function EsPaymentHistory({ studentId, onClose }) {
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     fetchPaymentHistory(studentId).then(res => setHistory(res.data));
//   }, []);

//   return (
//     <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
//       <div className="w-full sm:w-[420px] bg-white h-full p-6 rounded-l-3xl shadow-xl">
        
//         <div className="flex justify-between items-center mb-5">
//           <h2 className="text-lg font-semibold">Payment History</h2>
//           <button onClick={onClose}>✕</button>
//         </div>

//         <div className="space-y-4">
//           {history.map((p) => (
//             <div key={p._id} className="border rounded-xl p-4 shadow-sm">
//               <div className="flex justify-between">
//                 <span className="font-semibold">₹ {p.amount}</span>
//                 <span className="text-xs text-slate-500">
//                   {new Date(p.createdAt).toLocaleDateString()}
//                 </span>
//               </div>

//               <div className="text-xs text-slate-500 mt-1">
//                 Installment #{p.installmentNo}
//               </div>

//               <div className="text-xs mt-1">
//                 Method: {p.method}
//               </div>

//               <div className="text-xs mt-1">
//                 Receipt: {p.receiptNo}
//               </div>

//               <button className="mt-3 text-xs px-3 py-1 rounded-lg bg-indigo-600 text-white">
//                 Download Receipt
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


////////////////////////////////////////////////////////



// import { useEffect, useState } from "react";
// import { fetchPaymentHistory } from "../../services/payment.api";

// export default function EsPaymentHistory({ studentId, onClose }) {
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     fetchPaymentHistory(studentId).then((res) => setHistory(res.data));
//   }, []);

//   return (
//     <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
//       <div className="w-full sm:w-[420px] bg-white h-full p-6 rounded-l-3xl shadow-xl">
//         <div className="flex justify-between items-center mb-5">
//           <h2 className="text-lg font-semibold">Payment History</h2>
//           <button onClick={onClose}>✕</button>
//         </div>

//         <div className="space-y-4">
//           {history.map((p) => (
//             <div key={p._id} className="border rounded-xl p-4 shadow-sm">
//               <div className="flex justify-between">
//                 <span className="font-semibold">₹ {p.amount}</span>
//                 <span className="text-xs text-slate-500">
//                   {new Date(p.createdAt).toLocaleDateString()}
//                 </span>
//               </div>

//               <div className="text-xs text-slate-500 mt-1">
//                 Installment #{p.installmentNo}
//               </div>

//               <div className="text-xs mt-1">Method: {p.method}</div>

//               <div className="text-xs mt-1">Receipt: {p.receiptNo}</div>

//               <button className="mt-3 text-xs px-3 py-1 rounded-lg bg-indigo-600 text-white">
//                 Download Receipt
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


/////////////////////////////////////////////////////////



import { useEffect, useState } from "react";
import { fetchPaymentHistory } from "../services/esPayment.api";

export default function EsPaymentHistory({ studentId, onClose }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!studentId) return;

    fetchPaymentHistory(studentId)
      .then((res) => setHistory(res.data))
      .catch(console.error);
  }, [studentId]);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="w-full sm:w-[420px] bg-white h-full p-6">
        <button onClick={onClose}>✕</button>

        {history.map((p) => (
          <div key={p._id} className="border rounded-xl p-4 mt-3">
            <div className="flex justify-between">
              <span>₹ {p.amount}</span>
              <span>
                {new Date(p.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="text-xs mt-1">
              Receipt #{p.receiptNo}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
