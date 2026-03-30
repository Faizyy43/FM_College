// import { useEffect, useState } from "react";
// import { fetchPaymentHistory } from "../../services/payment.api.js";

// export default function EsInstallmentSection({ student }) {
//   const [payments, setPayments] = useState([]);

//   //   useEffect(() => {
//   //     if (student?._id) {
//   //       fetchPaymentHistory(student._id).then(res => {
//   //         setPayments(res.data);
//   //       });
//   //     }
//   //   }, [student]);
//   useEffect(() => {
//     if (!student || !student._id) return;

//     fetchPaymentHistory(student._id)
//       .then((res) => setPayments(res.data))
//       .catch((err) => console.error("Payment history error:", err));
//   }, [student]);

//   if (!student) return null;

//   // const totalFees = student.totalFees;
//   // const installmentAmount =
//   //   payments.length > 0 ? payments[0].amount : totalFees;

//   // const totalInstallments = Math.ceil(totalFees / installmentAmount);

//   const totalFees = student.totalFees;
//   const paidFees = student.paid;

//   const installmentAmount =
//     payments.length > 0 ? payments[0].amount : totalFees;

//   const totalInstallments = Math.ceil(totalFees / installmentAmount);
//   const paidInstallments = Math.floor(paidFees / installmentAmount);

//   return (
//     <div className="mt-6">
//       <h4 className="text-sm font-semibold text-slate-700 mb-3">
//         Installments
//       </h4>

//       <div className="space-y-2">
//         {Array.from({ length: totalInstallments }).map((_, index) => {
//           const isPaid = index < paidInstallments;

//           return (
//             <div
//               key={index}
//               className="flex justify-between items-center
//                  bg-slate-50 rounded-xl px-4 py-2"
//             >
//               <span className="text-xs font-medium">
//                 Installment {index + 1}
//               </span>

//               <span className="text-xs">₹ {installmentAmount}</span>

//               {isPaid ? (
//                 <span className="text-xs font-semibold text-emerald-600">
//                   Paid
//                 </span>
//               ) : (
//                 <span className="text-xs font-semibold text-rose-500">
//                   Unpaid
//                 </span>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


////////////////////////////////////////////////


import { useEffect, useState } from "react";
import { fetchPaymentHistory } from "../services/esPayment.api";

export default function EsInstallmentSection({ student }) {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!student?._id) return;

    fetchPaymentHistory(student._id)
      .then((res) => setPayments(res.data))
      .catch((err) => console.error("Payment history error:", err));
  }, [student]);

  if (!student) return null;

  const totalFees = student.totalFees || 0;
  const paidFees = student.paid || 0;

  const installmentAmount =
    payments.length > 0
      ? payments[payments.length - 1].amount
      : totalFees;

  const totalInstallments =
    installmentAmount > 0
      ? Math.ceil(totalFees / installmentAmount)
      : 0;

  const paidInstallments =
    installmentAmount > 0
      ? Math.floor(paidFees / installmentAmount)
      : 0;

  return (
    <div className="mt-6">
      <h4 className="text-sm font-semibold text-slate-700 mb-3">
        Installments
      </h4>

      <div className="space-y-2">
        {Array.from({ length: totalInstallments }).map((_, index) => {
          const isPaid = index < paidInstallments;

          return (
            <div
              key={index}
              className="flex justify-between items-center
                 bg-slate-50 rounded-xl px-4 py-2"
            >
              <span className="text-xs font-medium">
                Installment {index + 1}
              </span>

              <span className="text-xs">₹ {installmentAmount}</span>

              {isPaid ? (
                <span className="text-xs font-semibold text-emerald-600">
                  Paid
                </span>
              ) : (
                <span className="text-xs font-semibold text-rose-500">
                  Unpaid
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
