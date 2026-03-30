// import { useEffect, useState } from "react";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";
// import AgentLayout from "../../../layout/AgentLayout";


// export default function AgentColleges() {
//   const [colleges, setColleges] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expanded, setExpanded] = useState(null);

// //   useEffect(() => {
// //     getAgentColleges()
// //       .then((res) => setColleges(res.data || []))
// //       .finally(() => setLoading(false));
// //   }, []);

//   return (
//     <AgentLayout>
//       {/* ================= HEADER ================= */}
//       <div className="mb-6">
//         <h1 className="text-xl font-semibold text-gray-800">
//           Colleges & Courses
//         </h1>
//         <p className="text-sm text-gray-500">
//           Browse available colleges and their active courses
//         </p>
//       </div>

//       {/* ================= MAIN CARD ================= */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

//         {loading ? (
//           <div className="p-6">
//             <p className="text-sm text-gray-500">Loading colleges...</p>
//           </div>
//         ) : colleges.length === 0 ? (
//           <div className="p-12 text-center text-gray-400 text-sm">
//             No colleges available.
//           </div>
//         ) : (
//           <div className="divide-y">
//             {colleges.map((college) => (
//               <div key={college._id} className="p-6">

//                 {/* College Header */}
//                 <div
//                   className="flex justify-between items-center cursor-pointer"
//                   onClick={() =>
//                     setExpanded(
//                       expanded === college._id ? null : college._id
//                     )
//                   }
//                 >
//                   <div>
//                     <h3 className="font-semibold text-gray-800">
//                       {college.name}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       {college.city}
//                     </p>
//                   </div>

//                   <div className="text-blue-600 text-sm flex items-center gap-1">
//                     {expanded === college._id ? (
//                       <>
//                         Hide Courses <FiChevronUp />
//                       </>
//                     ) : (
//                       <>
//                         View Courses <FiChevronDown />
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 {/* Courses Section */}
//                 {expanded === college._id && (
//                   <div className="mt-6">

//                     {college.courses?.length ? (
//                       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {college.courses.map((course) => (
//                           <div
//                             key={course._id}
//                             className="border border-gray-100 rounded-xl p-4 bg-gray-50"
//                           >
//                             <p className="font-medium text-gray-800">
//                               {course.name}
//                             </p>

//                             <p className="text-xs text-gray-500 mt-1">
//                               Seats: {course.seats?.available ?? 0}
//                             </p>

//                             <p className="text-xs text-gray-500">
//                               Fees: ₹{course.fees?.agentFees ?? 0}
//                             </p>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-sm text-gray-400">
//                         No active courses.
//                       </div>
//                     )}

//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </AgentLayout>
//   );
// }



////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import AgentLayout from "../../../layout/AgentLayout";
import { getPartnerColleges } from "../services/agentPartners.api";

export default function AgentColleges() {

  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {

    const loadColleges = async () => {

      try {

        const res = await getPartnerColleges();

        console.log("API RESPONSE:", res);

        if (res?.data) {
          setColleges(res.data);
        } else {
          setColleges([]);
        }

      } catch (err) {

        console.error("FETCH COLLEGES ERROR:", err);
        setError("Failed to load partner colleges");

      } finally {

        setLoading(false);

      }

    };

    loadColleges();

  }, []);

  return (
    <AgentLayout>

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Colleges & Courses
        </h1>
        <p className="text-sm text-gray-500">
          Your approved partner colleges
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        {loading && (
          <div className="p-6 text-sm text-gray-500">
            Loading colleges...
          </div>
        )}

        {error && (
          <div className="p-6 text-sm text-red-500">
            {error}
          </div>
        )}

        {!loading && !error && colleges.length === 0 && (
          <div className="p-12 text-center text-gray-400 text-sm">
            No partner colleges yet.
          </div>
        )}

        {!loading && !error && colleges.length > 0 && (
          <div className="divide-y">

            {colleges.map((college) => (

              <div key={college.collegeId} className="p-6">

                {/* Header */}
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setExpanded(
                      expanded === college.collegeId
                        ? null
                        : college.collegeId
                    )
                  }
                >

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {college.collegeName}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {college.city}, {college.state}
                    </p>
                  </div>

                  <div className="text-blue-600 text-sm flex items-center gap-1">

                    {expanded === college.collegeId ? (
                      <>
                        Hide Courses <FiChevronUp />
                      </>
                    ) : (
                      <>
                        View Courses <FiChevronDown />
                      </>
                    )}

                  </div>

                </div>

                {/* Courses */}
                {expanded === college.collegeId && (

                  <div className="mt-6">

                    {(college.courses && college.courses.length > 0) ? (

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

                        {college.courses.map((course) => (

                          <div
                            key={course.courseId}
                            className="border border-gray-100 rounded-xl p-4 bg-gray-50"
                          >

                            <p className="font-medium text-gray-800">
                              {course.courseName}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                              Seats: {course.seatsAvailable}
                            </p>

                            <p className="text-xs text-gray-500">
                              Fees: ₹{course?.fees?.agentFees || 0}
                            </p>

                          </div>

                        ))}

                      </div>

                    ) : (

                      <div className="text-sm text-gray-400">
                        No active courses.
                      </div>

                    )}

                  </div>

                )}

              </div>

            ))}

          </div>
        )}

      </div>

    </AgentLayout>
  );
}