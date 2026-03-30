// import React, { useState } from "react";
// import { FiMail } from "react-icons/fi";
// import api from "../../api/axios";

// const ForgotPassword = () => {
//   const [identifier, setIdentifier] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     if (!identifier.trim()) {
//       setError("Email or mobile is required");
//       return;
//     }

//     try {
//       await api.post("/auth/forgot-password", { identifier });
//       setMessage("Password reset link sent. Check your email.");
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Something went wrong"
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-6">
//       <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

//         <h1 className="text-2xl text-center text-gray-900 mb-2">
//           Forgot Password
//         </h1>
//         <p className="text-sm text-center text-gray-500 mb-6">
//           Enter your email or mobile to reset password
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div className="relative h-[52px]">
//             <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               value={identifier}
//               onChange={(e) => setIdentifier(e.target.value)}
//               placeholder="Email or Mobile"
//               className="w-full h-full pl-12 pr-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           {message && <p className="text-green-600 text-sm">{message}</p>}

//           <button
//             type="submit"
//             className="w-full py-4 rounded-xl text-white bg-linear-to-r from-indigo-600 to-purple-600"
//           >
//             Send Reset Link
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

////////////////////////////////////////////////////////////////////////////////////////


// import React, { useState } from "react";
// import { FiMail } from "react-icons/fi";

// import api from "../../api/axios";
// import { useNavigate } from "react-router-dom";


// const ForgotPassword = () => {
//   const [identifier, setIdentifier] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

// const navigate = useNavigate();

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");

//   if (!identifier.trim()) {
//     setError("Email or contact number is required");
//     return;
//   }

//   try {
//     const res = await api.post("/auth/forgot-password", { identifier });

//     navigate(`/reset-password/${res.data.token}`);
//   } catch (err) {
//     setError(err.response?.data?.message || "Something went wrong");
//   }
// };



//   return (
//     <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

//       {/* LEFT SIDE */}
//       <div className="flex items-center justify-center bg-white px-6">
//         <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

//           <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">
//             Forgot Password
//           </h1>
//           <p className="text-sm text-gray-500 text-center mb-6">
//             Enter your email or contact number
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="relative h-[52px]">
//               <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 value={identifier}
//                 onChange={(e) => setIdentifier(e.target.value)}
//                 placeholder="Email or Contact Number"
//                 className="w-full h-full pl-12 pr-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
//               />
//             </div>

//             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//             {message && <p className="text-green-600 text-sm text-center">{message}</p>}

//             <button
//               type="submit"
//               className="w-full py-4 rounded-xl text-white font-medium bg-linear-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition"
//             >
//               Send Reset Link
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="hidden lg:flex h-screen w-full bg-blue-50 items-center justify-center">
//   <img
//     src="/forgotPass.png"
//     alt="Login"
//     className="w-full h-full object-cover"
//   />
// </div>

//     </div>
//   );
// };

// export default ForgotPassword; 

////////////////////////////////////////////////////////////////////////////////



import React, { useState } from "react";
import { FiMail } from "react-icons/fi";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim()) {
      setError("Email or contact number is required");
      return;
    }

    try {
      const res = await api.post("/auth/forgot-password", { identifier });
      navigate(`/reset-password/${res.data.token}`);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row">

      {/* BACKGROUND IMAGE – only visible on large screens */}
      <div
        className="hidden lg:block absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/forgotPass.png')" }}
      />

      {/* LEFT SIDE – FORM */}
      <div className="relative z-10 flex items-center justify-center w-full lg:w-1/2 px-6 min-h-screen bg-white lg:bg-transparent">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
          <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">
            Forgot Password
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter your email or contact number
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative h-[52px]">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Email or Contact Number"
                className="w-full h-full pl-12 pr-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {message && <p className="text-green-600 text-sm text-center">{message}</p>}

            <button
              type="submit"
              className="w-full py-4 rounded-xl text-white font-medium bg-linear-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE – Overlay text only, visible on large screens */}
      <div className="hidden lg:flex relative z-10 items-center justify-center w-1/2 px-10">
        <div className="text-center max-w-md p-8 rounded-lg text-white">
          <h2 className="text-4xl font-bold mb-4">Forgot Your Password?</h2>
          <p className="text-lg">
            Enter your registered email or contact number to reset your password.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
