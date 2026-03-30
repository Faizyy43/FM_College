// import { useEffect, useState } from "react";
// import StudentProfileDrawer from "../components/StudentProfileDrawer";

// import {
//   fetchCollegeAdmissions,
//   approveCollegeAdmission,
//   rejectCollegeAdmission,
//   collectCollegeFee,
// } from "../services/clgAdmissions.api";

// import CollegeLayout from "../../../layout/CollegeLayout";

// export default function ClgAdmissions() {
//   const [admissions, setAdmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(null);
//   const [selectedAdmission, setSelectedAdmission] = useState(null);

//   /* ================= LOAD ================= */
//   const loadAdmissions = async () => {
//     try {
//       const res = await fetchCollegeAdmissions();
//       setAdmissions(res.data || []);
//     } catch (err) {
//       console.error("Failed to load admissions");
//       setAdmissions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadAdmissions();
//   }, []);

//   /* ================= ACTIONS ================= */

//   const approve = async (id) => {
//     setActionLoading(id);
//     try {
//       await approveCollegeAdmission(id);

//       setAdmissions((prev) =>
//         prev.map((a) =>
//           a._id === id ? { ...a, status: "approved" } : a
//         )
//       );
//     } catch {
//       alert("Failed to approve admission");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const reject = async (id) => {
//     setActionLoading(id);
//     try {
//       await rejectCollegeAdmission(id);

//       setAdmissions((prev) =>
//         prev.map((a) =>
//           a._id === id ? { ...a, status: "rejected" } : a
//         )
//       );
//     } catch {
//       alert("Failed to reject admission");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const collectFee = async (id) => {
//     setActionLoading(id);
//     try {
//       await collectCollegeFee(id);

//       setAdmissions((prev) =>
//         prev.map((a) =>
//           a._id === id ? { ...a, feeCollected: true } : a
//         )
//       );
//     } catch {
//       alert("Failed to collect fee");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   /* ================= UI ================= */

//   return (
//     <CollegeLayout>
//       <div className="space-y-8">

//         {/* HEADER */}
//         <div className="mb-6">
//           <h2 className="text-3xl font-bold">
//             Student Admissions
//           </h2>

//           <p className="mt-2 text-sm text-gray-500">
//             Review, approve, and manage incoming student applications
//           </p>

//           <div className="mt-3 h-1 w-16 bg-blue-600 rounded-full" />
//         </div>

//         {/* LOADING */}
//         {loading && (
//           <p className="text-sm text-gray-500">
//             Loading admissions...
//           </p>
//         )}

//         {/* EMPTY */}
//         {!loading && admissions.length === 0 && (
//           <p className="text-gray-500 text-sm">
//             No admission requests yet.
//           </p>
//         )}

//         {/* CARDS */}
//         {admissions.map((a) => (
//           <div
//             key={a._id}
//             className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 max-w-4xl mx-auto"
//           >
//             {/* HEADER */}
//             <div className="flex justify-between items-start">
//               <div className="space-y-1">
//                 <h3 className="text-lg font-semibold">
//                   {a.studentName}
//                 </h3>

//                 <p className="text-sm text-gray-500">
//                   {a.email}
//                 </p>

//                 <div className="flex items-center gap-2 text-sm mt-1">
//                   <span className="text-gray-400">
//                     Course:
//                   </span>

//                   <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 font-medium">
//                     {a.courseId?.name || "—"}
//                   </span>
//                 </div>

//                 <button
//                   onClick={() => setSelectedAdmission(a)}
//                   className="text-blue-600 text-sm mt-2 hover:underline"
//                 >
//                   View Student Details
//                 </button>
//               </div>

//               {/* STATUS */}
//               <span
//                 className={`px-3 py-1 text-xs rounded-full font-semibold uppercase
//                   ${
//                     a.status === "pending"
//                       ? "bg-yellow-100 text-yellow-700"
//                       : a.status === "approved"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-red-100 text-red-700"
//                   }`}
//               >
//                 {a.status}
//               </span>
//             </div>

//             <div className="border-t border-gray-200 my-4" />

//             {/* ACTIONS */}
//             <div className="flex gap-3 flex-wrap">
//               {a.status === "pending" && (
//                 <>
//                   <button
//                     disabled={actionLoading === a._id}
//                     onClick={() => approve(a._id)}
//                     className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
//                   >
//                     Approve
//                   </button>

//                   <button
//                     disabled={actionLoading === a._id}
//                     onClick={() => reject(a._id)}
//                     className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
//                   >
//                     Reject
//                   </button>
//                 </>
//               )}

//               {a.status === "approved" && !a.feeCollected && (
//                 <button
//                   disabled={actionLoading === a._id}
//                   onClick={() => collectFee(a._id)}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//                 >
//                   Collect Fee
//                 </button>
//               )}

//               {a.feeCollected && (
//                 <span className="text-green-700 text-sm font-medium">
//                   ✓ Fee Collected
//                 </span>
//               )}
//             </div>
//           </div>
//         ))}

//         {/* STUDENT DRAWER */}
//         <StudentProfileDrawer
//           admission={selectedAdmission}
//           onClose={() => setSelectedAdmission(null)}
//         />
//       </div>
//     </CollegeLayout>
//   );
// }




import CollegeLayout from "../../../layout/CollegeLayout";

export default function AdmissionsPage() {
  // TODO: Fetch only APPROVED applications

  const dummyApproved = [
    {
      id: 1,
      student: "Mahir Khan",
      course: "B.Tech",
      source: "AGENT",
    },
  ];

  return (
    <CollegeLayout>
      <div className="p-6 bg-gray-100 min-h-screen">

        <h1 className="text-2xl font-semibold mb-6">Admissions</h1>

        <div className="space-y-4">
          {dummyApproved.map((a) => (
            <div key={a.id} className="bg-white p-4 rounded-xl shadow">
              <p className="font-semibold">{a.student}</p>
              <p className="text-sm text-gray-500">{a.course}</p>
              <p className="text-xs text-gray-400 mt-1">
                Source: {a.source}
              </p>
            </div>
          ))}
        </div>

      </div>
    </CollegeLayout>
  );
}