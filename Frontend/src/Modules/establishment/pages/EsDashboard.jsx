// import { useEffect, useState } from "react";
// import { fetchDashboardStats } from "../services/esDashboard.api";
// import { FiBook, FiUsers, FiClock } from "react-icons/fi";
// import { FaRupeeSign } from "react-icons/fa";
// import EstablishmentLayout from "../../../layout/EstablishmentLayout";

// export default function EsDashboard() {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     fetchDashboardStats()
//       .then((res) => setStats(res.data))
//       .catch(() => alert("Dashboard load failed"));
//   }, []);

//   if (!stats) return null;

//   return (
//     <EstablishmentLayout>
//       <div className="mb-6">
//         <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
//           <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
//             <FiBook size={20} />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Total Courses</p>
//             <p className="text-2xl font-semibold text-gray-800">
//               {stats.totalCourses ?? 0}
//             </p>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
//           <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-100 text-green-600">
//             <FiUsers size={20} />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Total Admissions</p>
//             <p className="text-2xl font-semibold text-gray-800">
//               {stats.totalStudents ?? 0}
//             </p>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
//           <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
//             <FiClock size={20} />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Pending Admissions</p>
//             <p className="text-2xl font-semibold text-gray-800">
//               {stats.newLeads ?? 0}
//             </p>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
//           <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
//             <FaRupeeSign size={18} />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Total Revenue</p>
//             <p className="text-xl font-semibold text-gray-800">
//               ₹{stats.revenue ?? 0}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-2xl shadow-sm p-6">
//           <h3 className="text-sm font-semibold text-gray-700 mb-4">
//             Recent Admissions
//           </h3>

//           <div className="space-y-3 text-sm">
//             {(stats.recentAdmissions || []).map((s, i) => (
//               <div key={i} className="flex items-center justify-between">
//                 <span className="text-gray-700">{s.name}</span>
//                 <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
//                   APPROVED
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm p-6">
//           <h3 className="text-sm font-semibold text-gray-700 mb-4">
//             Recent Payments
//           </h3>

//           <div className="space-y-3 text-sm">
//             {(stats.recentPayments || []).map((p, i) => (
//               <div key={i} className="flex items-center justify-between">
//                 <span className="text-gray-700">{p.name}</span>
//                 <span className="font-medium text-blue-600">₹{p.amount}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </EstablishmentLayout>
//   );
// }



//////////////////////////////////////////////




import { useEffect, useState } from "react";
import { fetchDashboardStats } from "../services/esDashboard.api";
import { FiBook, FiUsers, FiClock, FiClipboard } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import EstablishmentLayout from "../../../layout/EstablishmentLayout";

export default function EsDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboardStats()
      .then((res) => setStats(res.data))
      .catch(() => alert("Dashboard load failed"));
  }, []);

  if (!stats) return null;

  return (
    <EstablishmentLayout>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      {/* ================= TOP STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">

        {/* Total Courses */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <FiBook size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Courses</p>
            <p className="text-2xl font-semibold text-gray-800">
              {stats.totalCourses ?? 0}
            </p>
          </div>
        </div>

        {/* Total Admissions */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-100 text-green-600">
            <FiUsers size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Admissions</p>
            <p className="text-2xl font-semibold text-gray-800">
              {stats.totalStudents ?? 0}
            </p>
          </div>
        </div>

        {/* Pending Admissions */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
            <FiClock size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending Admissions</p>
            <p className="text-2xl font-semibold text-gray-800">
              {stats.newLeads ?? 0}
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
            <FaRupeeSign size={18} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-xl font-semibold text-gray-800">
              ₹{stats.revenue ?? 0}
            </p>
          </div>
        </div>

        {/* 🔥 Profile Completion */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
             <FiClipboard size={18} />
          </div>

          <div className="flex-1">
            <p className="text-sm text-gray-500">Profile Completion</p>
            <p className="text-lg font-semibold text-gray-800">
              {stats.profileCompletion ?? 0}%
            </p>

            <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-2 transition-all duration-500"
                style={{ width: `${stats.profileCompletion ?? 0}%` }}
              />
            </div>

           {stats.profileCompletion < 100 && (
  <p className="text-xs text-amber-600 mt-1">
    Complete profile to reach 100%
  </p>
)}

{stats.profileCompletion === 100 && (
  <p className="text-xs text-green-600 mt-1 font-medium">
    Profile fully completed 
  </p>
)}


            
          </div>
        </div>
      </div>

      {/* ================= BOTTOM PANELS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Admissions */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Recent Admissions
          </h3>

          <div className="space-y-3 text-sm">
            {(stats.recentAdmissions || []).map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-gray-700">{s.name}</span>
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                  APPROVED
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Recent Payments
          </h3>

          <div className="space-y-3 text-sm">
            {(stats.recentPayments || []).map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-gray-700">{p.name}</span>
                <span className="font-medium text-blue-600">₹{p.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </EstablishmentLayout>
  );
}
