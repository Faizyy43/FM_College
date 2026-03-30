// import { useEffect, useState } from "react";
// import { fetchAppliedColleges } from "../services/stuAppliedColleges.api";
// import StudentLayout from "../../../layout/StudentLayout";

// const statusConfig = {
//   Approved: {
//     text: "Application Submitted",
//     bg: "bg-green-50",
//     textColor: "text-green-700",
//   },
//   "Under Review": {
//     text: "Under Review",
//     bg: "bg-yellow-50",
//     textColor: "text-yellow-700",
//   },
// };

// const StuAppliedColleges = ({ onViewDetails }) => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadApplications = async () => {
//       try {
//         const res = await fetchAppliedColleges();
//         setApplications(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch applied colleges", err);
//         setApplications([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadApplications();
//   }, []);

//   return (
//     <StudentLayout>
//     <div className="bg-gray-50 min-h-screen p-6">
//       <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">

//         {/* HEADER */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold text-gray-900">
//             🎓 Your Applied Colleges
//           </h2>
//           <p className="text-sm text-gray-500">
//             Track your application progress
//           </p>
//         </div>

//         {/* LOADING */}
//         {loading && (
//           <div className="space-y-4">
//             {[1, 2, 3].map((i) => (
//               <div
//                 key={i}
//                 className="h-28 bg-gray-100 rounded-xl animate-pulse"
//               />
//             ))}
//           </div>
//         )}

//         {/* EMPTY */}
//         {!loading && applications.length === 0 && (
//           <div className="text-center py-16">
//             <div className="text-4xl mb-3">📭</div>
//             <p className="text-gray-600 font-medium">
//               No applied colleges found
//             </p>
//             <p className="text-sm text-gray-400">
//               Approved applications will appear here
//             </p>
//           </div>
//         )}

//         {/* LIST */}
//         {!loading && applications.length > 0 && (
//           <div className="space-y-5">
//             {applications.map((item) => {
//               const status =
//                 statusConfig[item.status] || statusConfig.Approved;

//               const collegeName =
//                 typeof item.college === "string"
//                   ? item.college
//                   : item.college?.name || "College Name";

//               const fee =
//                 item.fee ||
//                 item.college?.fee ||
//                 item.collegeFee ||
//                 "Not Available";

//               const location =
//                 item.location ||
//                 item.college?.location ||
//                 item.college?.address ||
//                 "";

//               const appliedDate = item.appliedOn
//                 ? new Date(item.appliedOn).toLocaleDateString()
//                 : null;

//               const logoUrl = item.logo || item.college?.logo || "";

//               return (
//                 <div
//                   key={item._id}
//                   className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all"
//                 >
//                   <div className="p-6 grid md:grid-cols-[100px_1fr_auto] gap-6 items-start">

//                     {/* LOGO */}
//                     <div>
//                       <div className="w-24 h-24 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
//                         {logoUrl ? (
//                           <img
//                             src={logoUrl}
//                             alt={collegeName}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <span className="text-xs text-gray-400">
//                             Logo
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     {/* DETAILS */}
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">
//                         {collegeName}
//                       </h3>

//                       {location && (
//                         <p className="mt-1 text-sm text-gray-500">
//                           📍 {location}
//                         </p>
//                       )}

//                       <div className="mt-3 flex flex-wrap gap-3 text-sm">
//                         <span className="px-3 py-1 bg-gray-100 rounded-full">
//                           {item.course || "Course"}
//                         </span>

//                         <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
//                           ₹ {fee}
//                         </span>
//                       </div>

//                       {appliedDate && (
//                         <p className="mt-3 text-sm text-gray-500">
//                           📅 Applied on{" "}
//                           <span className="font-medium text-gray-800">
//                             {appliedDate}
//                           </span>
//                         </p>
//                       )}
//                     </div>

//                     {/* RIGHT SIDE */}
//                     <div className="flex flex-col gap-3 md:items-end">
//                       <div
//                         className={`px-4 py-2 rounded-full text-sm font-semibold ${status.bg} ${status.textColor}`}
//                       >
//                         {status.text}
//                       </div>

//                       <button
//                         onClick={() => onViewDetails?.(item)}
//                         className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium hover:bg-gray-50"
//                       >
//                         👁 View Application
//                       </button>
//                     </div>

//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//       </div>
//     </div>
//     </StudentLayout>
//   );
// };

// export default StuAppliedColleges;


//////////////////////////////////////////////////////////////



import { useEffect, useState } from "react";
import { FiEye, FiTrash2, FiX } from "react-icons/fi";
import StudentLayout from "../../../layout/StudentLayout";
import { fetchAppliedColleges } from "../services/stuAppliedColleges.api";
import { useNavigate } from "react-router-dom";

const StuAppliedColleges = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const res = await fetchAppliedColleges();
      setApplications(res.data || []);
    } catch (err) {
      console.error("Error loading applications", err);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = () => {
    setApplications((prev) =>
      prev.filter((app) => app._id !== deleteId)
    );
    setDeleteId(null);
  };

  return (
    <StudentLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Your Applied Colleges
          </h1>
          <p className="text-gray-500 text-sm">
            Track and manage your applications
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-32 bg-white rounded-2xl shadow animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && applications.length === 0 && (
          <div className="text-center mt-20">
            <p className="text-gray-500 text-lg">
              No applications yet
            </p>
          </div>
        )}

        {/* Applications */}
        <div className="grid gap-6">
          {applications.map((item) => {
            const appliedDate = item.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : "";

            return (
              <div
                key={item._id}
                className="group relative bg-white/70 backdrop-blur-md border border-gray-200 shadow-lg hover:shadow-xl transition-all rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                {/* Left */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.collegeSlug}
                  </h3>

                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">
                      {item.course || "Course"}
                    </span>

                    <span className="px-3 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-full">
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-gray-500">
                    Applied on{" "}
                    <span className="font-medium text-gray-800">
                      {appliedDate}
                    </span>
                  </p>
                </div>

                {/* Right Buttons */}
                <div className="flex gap-3 flex-wrap sm:flex-nowrap">
                <button
  onClick={() => navigate(`/student/application/${item._id}`)}
  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition text-sm"
>
  <FiEye size={16} />
  View
</button>

                  <button
                    onClick={() => setDeleteId(item._id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition text-sm"
                  >
                    <FiTrash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= DELETE MODAL ================= */}
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl">

              <button
                onClick={() => setDeleteId(null)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                <FiX size={18} />
              </button>

              <h2 className="text-xl font-semibold mb-4">
                Delete Application
              </h2>

              <p className="text-gray-600 mb-6">
                This action cannot be undone. Are you sure?
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={confirmDelete}
                  className="w-full py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Yes, Delete
                </button>

                <button
                  onClick={() => setDeleteId(null)}
                  className="w-full py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </StudentLayout>
  );
};

export default StuAppliedColleges;