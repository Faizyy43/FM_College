// import React, { useState, useEffect  } from "react";
// import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import api from "../../api/axios";
// import toast from "react-hot-toast";


// const ResetPassword = () => {
//   const navigate = useNavigate();
//   const location = useLocation();


//   const {token} = useParams();

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   // Redirect if no token
//   useEffect(() => {
//   if (!token) {
//     navigate("/login");
//   }
// }, [token]);


//   const validate = () => {
//     const newErrors = {};
//     if (!password.trim()) newErrors.password = "Password is required";
//     if (!confirmPassword.trim())
//       newErrors.confirmPassword = "Confirm password is required";
//     if (password && confirmPassword && password !== confirmPassword)
//       newErrors.confirmPassword = "Passwords do not match";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       setLoading(true);
//       await api.post("/auth/reset-password", { token, password });
//       toast.success("Password reset successfully. Please login.");
//        setTimeout(() => {
//       navigate("/login");
//     }, 1500);

//     } catch (err) {
//       toast.error(
//         err.response?.data?.message || "Failed to reset password",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
//       {/* LEFT */}
//       <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-6">
//         <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-2xl p-10">
//           <div className="text-center mb-8">
//             <h1 className="text-2xl text-gray-900">Reset Your Password</h1>
//             <p className="text-sm text-gray-500 mt-2">
//               Enter a new password to secure your account
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Password */}
//             <div>
//               <div className="relative h-[52px]">
//                 <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="New password"
//                   className="w-full h-full pl-12 pr-12 rounded-xl border border-gray-300 focus:border-indigo-500"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2"
//                 >
//                   {showPassword ? <FiEyeOff /> : <FiEye />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-sm text-red-500 mt-1">{errors.password}</p>
//               )}
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <div className="relative h-[52px]">
//                 <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type={showConfirm ? "text" : "password"}
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   placeholder="Confirm password"
//                   className="w-full h-full pl-12 pr-12 rounded-xl border border-gray-300 focus:border-indigo-500"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirm(!showConfirm)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2"
//                 >
//                   {showConfirm ? <FiEyeOff /> : <FiEye />}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <p className="text-sm text-red-500 mt-1">
//                   {errors.confirmPassword}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-4 rounded-xl text-white bg-indigo-600 hover:opacity-90"
//             >
//               {loading ? "Resetting..." : "Reset Password"}
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className="hidden lg:flex items-center justify-center bg-blue-50 px-10">
//         <div className="text-center max-w-md">
//           <h2 className="text-xl font-semibold">Secure Your Account</h2>
//           <p className="text-sm mt-2">Your account will be safe with a strong password.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

//////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../../api/axios";
// import toast from "react-hot-toast";

// const ResetPassword = () => {
//   const navigate = useNavigate();
//   const { token } = useParams();

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!token) navigate("/login");
//   }, [token, navigate]);

//   const validate = () => {
//     const newErrors = {};
//     if (!password.trim()) newErrors.password = "Password is required";
//     if (!confirmPassword.trim())
//       newErrors.confirmPassword = "Confirm password is required";
//     if (password !== confirmPassword)
//       newErrors.confirmPassword = "Passwords do not match";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       setLoading(true);
//       await api.post("/auth/reset-password", { token, password });
//       toast.success("Password reset successfully. Please login.");
//       setTimeout(() => navigate("/login"), 1500);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to reset password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
//       <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-6">
//         <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-2xl p-10">
//           <div className="text-center mb-8">
//             <h1 className="text-2xl text-gray-900">Reset Your Password</h1>
//             <p className="text-sm text-gray-500 mt-2">
//               Enter a new password to secure your account
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Password */}
//             <div>
//               <div className="relative h-[52px]">
//                 <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="New password"
//                   autoComplete="off"
//                   autoCorrect="off"
//                   spellCheck={false}
//                   inputMode="text"
//                   className="w-full h-full pl-12 pr-12 rounded-xl border border-gray-300 outline-none focus:border-2 focus:border-indigo-500"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2"
//                 >
//                   {showPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
//                 </button>
//               </div>

//               {errors.password && (
//                 <p className="text-sm text-red-500 mt-1">{errors.password}</p>
//               )}
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <div className="relative h-[52px]">
//                 <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

//                 <input
//                   type={showConfirm ? "text" : "password"}
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   placeholder="Confirm password"
//                   autoComplete="off"
//                   autoCorrect="off"
//                   spellCheck={false}
//                   inputMode="text"
//                   className="w-full h-full pl-12 pr-12 rounded-xl border border-gray-300 outline-none focus:border-2  focus:border-indigo-500"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowConfirm(!showConfirm)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2"
//                 >
//                   {showConfirm ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400"/>}
//                 </button>
//               </div>

//               {errors.confirmPassword && (
//                 <p className="text-sm text-red-500 mt-1">
//                   {errors.confirmPassword}
//                 </p>
//               )}
//             </div>

            
//               <button
//                     type="submit"
//                        disabled={loading}
//                     className="w-full py-4 rounded-xl text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition shadow-lg"
//                   >
//                       {loading ? "Resetting..." : "Reset Password"}
//                   </button>
//           </form>
//         </div>
//       </div>

//        <div className="hidden lg:flex h-screen w-full bg-blue-50 items-center justify-center">
//   <img
//     src="/resetPass.png"
//     alt="Login"
//     className="w-full h-full object-cover"
//   />
// </div>
//     </div>
//   );
// };

// export default ResetPassword;


////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!password.trim()) newErrors.password = "Password is required";
    if (!confirmPassword.trim())
      newErrors.confirmPassword = "Confirm password is required";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await api.post("/auth/reset-password", { token, password });
      toast.success("Password reset successfully. Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row">

      {/* BACKGROUND IMAGE – only visible on large screens */}
      <div
        className="hidden lg:block absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/resetPass.png')" }}
      />

      {/* LEFT SIDE – FORM */}
      <div className="relative z-10 flex items-center justify-center w-full lg:w-1/2 px-6 min-h-screen bg-white lg:bg-transparent">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-2xl p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl text-gray-900">Reset Your Password</h1>
            <p className="text-sm text-gray-500 mt-2">
              Enter a new password to secure your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password */}
            <div>
              <div className="relative h-[52px]">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  inputMode="text"
                  className="w-full h-full pl-12 pr-12 rounded-xl border border-gray-300 outline-none focus:border-2 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative h-[52px]">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  inputMode="text"
                  className="w-full h-full pl-12 pr-12 rounded-xl border border-gray-300 outline-none focus:border-2 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirm ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition shadow-lg"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE – Overlay text only */}
      <div className="hidden lg:flex relative z-10 items-center justify-center w-1/2 px-10">
        <div className="text-center max-w-md p-8 rounded-lg text-white">
          <h2 className="text-4xl font-bold mb-4">Secure Your Account</h2>
          <p className="text-lg">
            Create a strong new password to protect your account from unauthorized access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
