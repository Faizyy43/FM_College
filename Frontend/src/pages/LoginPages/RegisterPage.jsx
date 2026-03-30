// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUserGraduate, FaUserTie, FaSchool, FaBuilding } from "react-icons/fa";

// const roles = [
//   {
//     key: "student",
//     title: "Student",
//     desc: "Apply for courses & get cashback",
//     icon: <FaUserGraduate size={28} />,
//     color: "from-blue-500 to-indigo-500",
//     action: "Register",
//     route: "/register/student",
//   },
//   {
//     key: "agent",
//     title: "Agent",
//     desc: "Refer students & earn rewards",
//     icon: <FaUserTie size={28} />,
//     color: "from-green-500 to-emerald-500",
//     action: "Register",
//     route: "/register/agent",
//   },
//   {
//     key: "college",
//     title: "College / School",
//     desc: "Partner with us for admissions",
//     icon: <FaSchool size={28} />,
//     color: "from-orange-500 to-amber-500",
//     action: "Apply",
//     route: "/apply/college",
//   },
//   {
//     key: "establishment",
//     title: "Coaching Center",
//     desc: "List your coaching institute",
//     icon: <FaBuilding size={28} />,
//     color: "from-purple-500 to-violet-500",
//     action: "Apply",
//     route: "/apply/coaching",
//   },
// ];

// const RegisterPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
//       <div className="max-w-5xl w-full">
//       <div className="text-center mb-12">
//   {/* Main Heading */}
//   <h1 className="text-3xl md:text-4xl font-semibold text-slate-800">
//     Welcome to the{" "}
//     <span className="text-blue-600 font-bold">
//       Educational Cashback Portal
//     </span>
//   </h1>

//   {/* Divider with highlighted text */}
//   <div className="flex items-center justify-center gap-4 mt-6">
//     <span className="w-16 h-px bg-linear-to-r from-transparent via-blue-400 to-transparent"></span>

//     <span className="px-3 py-0.5 rounded-full text-sm font-semibold 
//                      bg-blue-50 text-blue-600">
//       Register as
//     </span>

//     <span className="w-16 h-px bg-linear-to-r from-transparent via-blue-400 to-transparent"></span>
//   </div>

//   {/* Highlighted subtitle */}
//   <p className="mt-3 text-sm font-medium text-slate-600">
//     Choose your role to get started{" "}
//     <span className="text-blue-600 font-semibold">!</span>
//   </p>
// </div>


//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {roles.map((role) => (
//             <button
//               key={role.key}
//               onClick={() => navigate(role.route)}
//               className="group bg-white rounded-2xl shadow-md p-6 text-left
//                          hover:shadow-xl transition"
//             >
//               <div
//                 className={`w-12 h-12 rounded-xl flex items-center justify-center
//                             text-white bg-linear-to-r ${role.color}`}
//               >
//                 {role.icon}
//               </div>

//               <h3 className="mt-4 text-lg font-semibold text-slate-800">
//                 {role.title}
//               </h3>

//               <p className="text-sm text-slate-500 mt-1">
//                 {role.desc}
//               </p>

//               <div className="mt-4 text-sm font-medium text-blue-600 group-hover:underline">
//                 {role.action} →
//               </div>
//             </button>
//           ))}
//         </div>

//         <p className="text-center text-sm text-slate-500 mt-10">
//           Already have an account?{" "}
//           <span
//             onClick={() => navigate("/login")}
//             className="text-blue-600 font-medium cursor-pointer hover:underline"
//           >
//             Login here
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaUserGraduate, 
  FaUserTie, 
  FaSchool, 
  FaBuilding, 
  FaCheckCircle, 
  FaClock 
} from "react-icons/fa";

/* ================= DATA ================= */

const registerRoles = [
  {
    role:"STUDENT",
    title: "Student",
    desc: "Apply for courses and earn cashback on successful admissions.",
    icon: <FaUserGraduate size={30} />,
    badge: { text: "Instant Access", icon: <FaCheckCircle /> },
    color: "from-blue-500 to-indigo-600",
    action: "Create Student Account",
    route: "/register/student",
  },
  {
    role:"AGENT",
    title: "Agent",
    desc: "Refer students, track admissions, and earn commissions.",
    icon: <FaUserTie size={30} />,
    badge: { text: "Approval Required", icon: <FaClock /> },
    color: "from-emerald-500 to-green-600",
    action: "Register as Agent",
    route: "/register/agent",
  },
];

const applyRoles = [
  {
    role:"COLLEGE",
    title: "College",
    desc: "Partner with us to receive verified student applications.",
    icon: <FaSchool size={30} />,
    badge: { text: "Verified Partnership", icon: <FaClock /> },
    color: "from-orange-500 to-amber-500",
    action: "Apply as College",
    route: "/apply/college",
  },
  {
    role:"ESTABLISHMENT",
    title: "Establishment",
    desc: "List your institute and reach targeted students.",
    icon: <FaBuilding size={30} />,
    badge: { text: "Admin Review", icon: <FaClock /> },
    color: "from-purple-500 to-violet-600",
    action: "Apply as Establishment",
    route: "/apply/establishment",
  },
];

/* ================= CARD ================= */

const RoleCard = ({ role, navigate }) => (
  <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 flex flex-col items-start text-left
                  hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out
                  h-80 w-full max-w-sm">
    
    {/* Icon */}
    <div
      className={`w-14 h-14 rounded-xl flex items-center justify-center
                  text-white bg-linear-to-r ${role.color}`}
    >
      {role.icon}
    </div>

    {/* Title */}
    <h3 className="mt-5 text-lg font-semibold text-slate-800">
      {role.title}
    </h3>

    {/* Description */}
    <p className="mt-2 text-sm text-slate-500 leading-relaxed">
      {role.desc}
    </p>

    {/* Badge */}
    <div className="mt-4 inline-flex items-center gap-2 text-xs
                    px-3 py-1 rounded-full bg-slate-100 text-slate-600 w-fit">
      {role.badge.icon}
      {role.badge.text}
    </div>

    {/* Button */}
    <div className="mt-auto w-full">
      <button
        onClick={() => navigate(role.route)}
        className={`mt-6 w-full py-2.5 rounded-lg text-sm font-semibold
                    text-white bg-linear-to-r ${role.color}
                    hover:opacity-95 transition`}
      >
        {role.action}
      </button>
    </div>
  </div>
);

/* ================= PAGE ================= */

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-linear-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-7xl w-full text-center">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-800">
            Welcome to the{" "}
            <span className="text-blue-600 font-bold">
              Educational Cashback Portal
            </span>
          </h1>

          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            One platform connecting students, agents, and institutions
            through verified admissions and rewards.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full justify-items-center">
          {[...registerRoles, ...applyRoles].map((role, idx) => (
            <RoleCard key={idx} role={role} navigate={navigate} />
          ))}
        </div>

        {/* Login link */}
        <p className="mt-12 text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-700 font-medium cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
