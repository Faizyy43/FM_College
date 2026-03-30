// import { useEffect, useState } from "react";

// import AgentLayout from "../../../layout/AgentLayout";

// export default function AgentStuApplications() {
//   const [applications, setApplications] = useState([]);
 

// //   useEffect(() => {
// //     getAgentApplications()
// //       .then((res) => setApplications(res.data || []))
// //       .finally(() => setLoading(false));
// //   }, []);

//   return (
//     <AgentLayout>
//       {/* ================= HEADER ================= */}
//       <div className="mb-6">
//         <h1 className="text-xl font-semibold text-gray-800">
//           Student Applications
//         </h1>
//         <p className="text-sm text-gray-500">
//           Track all applications submitted by you
//         </p>
//       </div>

//       {/* ================= CARD CONTAINER ================= */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">

//             <thead className="bg-gray-50 text-gray-600">
//               <tr>
//                 <th className="text-left p-4">Student</th>
//                 <th className="text-left p-4">College</th>
//                 <th className="text-left p-4">Course</th>
//                 <th className="text-left p-4">Applied On</th>
//                 <th className="text-left p-4">Status</th>
//               </tr>
//             </thead>

//             <tbody>
//   {applications.length === 0 ? (
//     <tr>
//       <td colSpan="5" className="text-center py-14">
//         <div className="text-gray-400 text-sm">
//           No applications found.
//         </div>
//       </td>
//     </tr>
//   ) : (
//     applications.map((app) => (
//       <tr
//         key={app._id}
//         className="border-t hover:bg-gray-50 transition"
//       >
//         {/* STUDENT */}
//         <td className="p-4">
//           <div className="font-medium text-gray-800">
//             {app.studentId?.fullName || "-"}
//           </div>
//           <div className="text-xs text-gray-500">
//             {app.studentId?.mobile || "-"}
//           </div>
//         </td>

//         {/* COLLEGE */}
//         <td className="p-4">
//           <div className="font-medium text-gray-800">
//             {app.collegeId?.name || "-"}
//           </div>
//           <div className="text-xs text-gray-500">
//             {app.collegeId?.city || "-"}
//           </div>
//         </td>

//         {/* COURSE */}
//         <td className="p-4 text-gray-700">
//           {app.courseId?.name || "-"}
//         </td>

//         {/* DATE */}
//         <td className="p-4 text-gray-600">
//           {app.appliedOn
//             ? new Date(app.appliedOn).toLocaleDateString()
//             : "-"}
//         </td>

//         {/* STATUS */}
//         <td className="p-4">
//           <StatusBadge status={app.status} />
//         </td>
//       </tr>
//     ))
//   )}
// </tbody>

//           </table>
//         </div>
//       </div>
//     </AgentLayout>
//   );
// }

// /* ================= STATUS BADGE ================= */

// function StatusBadge({ status }) {
//   const base =
//     "inline-block px-3 py-1 rounded-full text-xs font-medium";

//   if (status === "APPROVED")
//     return (
//       <span className={`${base} bg-green-100 text-green-700`}>
//         APPROVED
//       </span>
//     );

//   if (status === "REJECTED")
//     return (
//       <span className={`${base} bg-red-100 text-red-700`}>
//         REJECTED
//       </span>
//     );

//   return (
//     <span className={`${base} bg-yellow-100 text-yellow-700`}>
//       {status || "PENDING"}
//     </span>
//   );
// }

// /* ================= SKELETON ================= */



////////////////////////////////////////////////


import { useEffect, useState } from "react";
import AgentLayout from "../../../layout/AgentLayout";
import api from "../../../api/axios";

export default function AgentStuApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const res = await api.get("/agent/applications");
        console.log("APPLICATIONS:", res.data);
        setApplications(res.data || []);
      } catch (err) {
        console.error("FETCH APPLICATIONS ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  return (
    <AgentLayout>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Student Applications
        </h1>
        <p className="text-sm text-gray-500">
          Track all applications submitted by you
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left p-4">Student</th>
                <th className="text-left p-4">College</th>
                <th className="text-left p-4">Course</th>
                <th className="text-left p-4">Applied On</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-400">
                    Loading applications...
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-14">
                    <div className="text-gray-400 text-sm">
                      No applications found.
                    </div>
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr
                    key={app.applicationId}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {/* STUDENT */}
                    <td className="p-4">
                      <div className="font-medium text-gray-800">
                        {app.student?.fullName || "-"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {app.student?.mobile || "-"}
                      </div>
                    </td>

                    {/* COLLEGE */}
                    <td className="p-4">
                      <div className="font-medium text-gray-800">
                        {app.college?.name || "-"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {app.college?.city || "-"}
                      </div>
                    </td>

                    {/* COURSE */}
                    <td className="p-4 text-gray-700">
                      {app.course?.name || "-"}
                    </td>

                    {/* DATE */}
                    <td className="p-4 text-gray-600">
                      {app.appliedDate
                        ? new Date(app.appliedDate).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* STATUS */}
                    <td className="p-4">
                      <StatusBadge status={app.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AgentLayout>
  );
}

/* STATUS BADGE */

function StatusBadge({ status }) {
  const base =
    "inline-block px-3 py-1 rounded-full text-xs font-medium";

  if (status === "APPROVED")
    return (
      <span className={`${base} bg-green-100 text-green-700`}>
        APPROVED
      </span>
    );

  if (status === "REJECTED")
    return (
      <span className={`${base} bg-red-100 text-red-700`}>
        REJECTED
      </span>
    );

  return (
    <span className={`${base} bg-yellow-100 text-yellow-700`}>
      {status || "APPLIED"}
    </span>
  );
}