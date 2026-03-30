// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FaCheckCircle, FaClock } from "react-icons/fa";

// const roleSuccessMessages = {
//   STUDENT: {
//     title: "Registration Successful!",
//     description:
//       "Your student account has been created successfully. You can now log in and start applying for courses.",
//     badgeIcon: <FaCheckCircle className="text-green-500" />,
//     badgeText: "Instant Access",
//     buttonText: "Go to Login",
//     buttonAction: (navigate) => navigate("/login"),
//   },
//   AGENT: {
//     title: "Registration Submitted!",
//     description:
//       "Thank you for registering as an Agent. Your account is under admin review. You will be notified once approved.",
//     badgeIcon: <FaClock className="text-yellow-500" />,
//     badgeText: "Approval Pending",
//     buttonText: "Back to Home",
//     buttonAction: (navigate) => navigate("/"),
//   },
//   COLLEGE: {
//     title: "Application Submitted!",
//     description:
//       "Your College/School application has been received. Our admin team will verify your details and contact you soon.",
//     badgeIcon: <FaClock className="text-yellow-500" />,
//     badgeText: "Verification Pending",
//     buttonText: "Back to Home",
//     buttonAction: (navigate) => navigate("/"),
//   },
//   ESTABLISHMENT: {
//     title: "Application Submitted!",
//     description:
//       "Your Coaching Center application is under review. We will notify you when your account is approved.",
//     badgeIcon: <FaClock className="text-yellow-500" />,
//     badgeText: "Admin Review",
//     buttonText: "Back to Home",
//     buttonAction: (navigate) => navigate("/"),
//   },
// };

// const RASuccess = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✅ Normalize role to UPPERCASE
//   const role = (location.state?.role || "STUDENT").toUpperCase();

//   // ✅ Safe fallback
//   const data = roleSuccessMessages[role] || roleSuccessMessages.STUDENT;

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
//       <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-10 text-center">
//         {/* Icon */}
//         <div className="flex justify-center mb-6">
//           <div
//             className={`w-16 h-16 rounded-full flex items-center justify-center
//               ${role === "STUDENT" ? "bg-green-100" : "bg-yellow-100"}`}
//           >
//             {data.badgeIcon}
//           </div>
//         </div>

//         {/* Title */}
//         <h1 className="text-2xl font-semibold text-gray-800 mb-3">
//           {data.title}
//         </h1>

//         {/* Description */}
//         <p className="text-gray-600 mb-6">
//           {data.description}
//         </p>

//         {/* Badge */}
//         <div className="inline-flex items-center gap-2 mb-6 px-4 py-1 rounded-full bg-gray-100 text-gray-700 text-sm mx-auto">
//           {data.badgeIcon}
//           <span>{data.badgeText}</span>
//         </div>

//         {/* Action Button */}
//         <button
//           onClick={() => data.buttonAction(navigate)}
//           className="w-full py-3 rounded-xl text-white font-semibold
//                      bg-linear-to-r from-indigo-500 to-purple-600
//                      hover:opacity-90 transition"
//         >
//           {data.buttonText}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RASuccess;


////////////////////////////////////////////////////////////////////


import React from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { FaCheckCircle, FaClock } from "react-icons/fa";

const roleSuccessMessages = {
  STUDENT: {
    title: "Registration Successful!",
    description:
      "Your student account has been created successfully. You can now log in and start applying for courses.",
    badgeIcon: <FaCheckCircle className="text-green-500" />,
    badgeText: "Instant Access",
    buttonText: "Go to Login",
    buttonAction: (navigate) => navigate("/login")
  },
  AGENT: {
    title: "Registration Submitted!",
    description:
      "Thank you for registering as an Agent. Your account is under admin review. You will be notified once approved.",
    badgeIcon: <FaClock className="text-yellow-500" />,
    badgeText: "Approval Pending",
    buttonText: "Back to Home",
    buttonAction: (navigate) => navigate("/")
  },
  COLLEGE: {
    title: "Application Submitted!",
    description:
      "Your College/School application has been received. Our admin team will verify your details and contact you soon.",
    badgeIcon: <FaClock className="text-yellow-500" />,
    badgeText: "Verification Pending",
    buttonText: "Back to Home",
    buttonAction: (navigate) => navigate("/")
  },
  ESTABLISHMENT: {
    title: "Application Submitted!",
    description:
      "Your Coaching Center application is under review. We will notify you when your account is approved.",
    badgeIcon: <FaClock className="text-yellow-500" />,
    badgeText: "Admin Review",
    buttonText: "Back to Home",
    buttonAction: (navigate) => navigate("/")
  }
};

const registerRoles = ["STUDENT", "AGENT"];
const applyRoles = ["COLLEGE", "ESTABLISHMENT"];

const RASuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const role = (location.state?.role || "").toUpperCase();
  const pathname = location.pathname;

  if (
    (pathname === "/register/success" && !registerRoles.includes(role)) ||
    (pathname === "/apply/success" && !applyRoles.includes(role))
  ) {
    return <Navigate to="/" replace />;
  }

  const data = roleSuccessMessages[role];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-10 text-center">
        <div className="flex justify-center mb-6">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              role === "STUDENT" ? "bg-green-100" : "bg-yellow-100"
            }`}
          >
            {data.badgeIcon}
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-3">
          {data.title}
        </h1>

        <p className="text-gray-600 mb-6">
          {data.description}
        </p>

        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1 rounded-full bg-gray-100 text-gray-700 text-sm mx-auto">
          {data.badgeIcon}
          <span>{data.badgeText}</span>
        </div>

        <button
          onClick={() => data.buttonAction(navigate)}
          className="w-full py-3 rounded-xl text-white font-semibold
                     bg-linear-to-r from-indigo-500 to-purple-600
                     hover:opacity-90 transition"
        >
          {data.buttonText}
        </button>
      </div>
    </div>
  );
};

export default RASuccess;
