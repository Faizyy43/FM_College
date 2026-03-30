// import React, { useState } from "react";
// import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// const SetPassword = ({ onSetPassword }) => {
//   const navigate = useNavigate();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [errors, setErrors] = useState({});

//   const handleChange = (field, value) => {
//     if (field === "password") setPassword(value);
//     else setConfirmPassword(value);
//     setErrors({ ...errors, [field]: "" });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!password.trim()) newErrors.password = "Password is required";
//     if (!confirmPassword.trim()) newErrors.confirmPassword = "Confirm password is required";
//     if (password && confirmPassword && password !== confirmPassword)
//       newErrors.confirmPassword = "Passwords do not match";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     if (onSetPassword) onSetPassword(password);
//     navigate("/dashboard"); // Redirect after setting password
//   };

//   return (
//     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
//       {/* LEFT – FORM */}
//       <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-6">
//         <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-2xl p-10">

//           {/* HEADER */}
//           <div className="text-center mb-8">
//             <h1 className="text-2xl text-gray-900">Set Your Password</h1>
//             <p className="text-sm text-gray-500 mt-2">
//               Create a strong password to secure your account
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">

//             {/* Password */}
//             <div>
//               <div className="relative h-[52px]">
//                 <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => handleChange("password", e.target.value)}
//                   placeholder="Enter password"
//                   className={`w-full h-full pl-12 pr-12 rounded-xl border ${
//                     errors.password ? "border-red-500" : "border-gray-300"
//                   } bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition shadow-sm`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//                   tabIndex={-1}
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
//                 <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                 <input
//                   type={showConfirm ? "text" : "password"}
//                   value={confirmPassword}
//                   onChange={(e) => handleChange("confirmPassword", e.target.value)}
//                   placeholder="Confirm password"
//                   className={`w-full h-full pl-12 pr-12 rounded-xl border ${
//                     errors.confirmPassword ? "border-red-500" : "border-gray-300"
//                   } bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition shadow-sm`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirm(!showConfirm)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//                   tabIndex={-1}
//                 >
//                   {showConfirm ? <FiEyeOff /> : <FiEye />}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
//               )}
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               className="w-full py-4 rounded-xl text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition shadow-lg"
//             >
//               Set Password
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* RIGHT – INFO */}
//       <div className="hidden lg:flex items-center justify-center bg-blue-50 px-10">
//         <div className="text-center max-w-md">
//           <img src="/login-illustration.svg" alt="Set Password" className="mb-6" />
//           <h2 className="text-xl font-semibold text-slate-800">
//             Secure Your Account
//           </h2>
//           <p className="text-sm text-slate-600 mt-2">
//             Your password protects your account and data.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SetPassword;


///////////////////////////////////////////////////////////////////////////////////


// import React, { useState } from "react";
// import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
// import { useNavigate, useLocation } from "react-router-dom";
// import api from "../../api/axios";
// import toast from "react-hot-toast";

// const SetPassword = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const token = location.state?.token;

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   // 🚨 If user opens this page without token
//   if (!token) {
//     navigate("/login");
//     return null;
//   }

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

//       await api.post("/auth/set-password", {
//         token,
//         password,
//       });

//       toast.success("Password set successfully. Please login.");
//        setTimeout(() => {
//       navigate("/login");
//     }, 1500);
//     } catch (err) {
//       toast.error(
//           err.response?.data?.message || "Failed to set password",
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
//             <h1 className="text-2xl text-gray-900">Set Your Password</h1>
//             <p className="text-sm text-gray-500 mt-2">
//               Create a strong password to secure your account
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
//                   placeholder="Enter password"
//                   className="w-full h-full pl-12 pr-12 rounded-xl border border-gray-300 outline-none focus:border-2 focus:border-indigo-500"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2"
//                 >
//                   {showPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-500" />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-sm text-red-500 mt-1">{errors.password}</p>
//               )}
//             </div>

//             {/* Confirm */}
//             <div>
//               <div className="relative h-[52px]">
//                 <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type={showConfirm ? "text" : "password"}
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   placeholder="Confirm password"
//                   className="w-full h-full pl-12 pr-12 rounded-xl border border-gray-300 outline-none focus:border-2 focus:border-indigo-500"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirm(!showConfirm)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2"
//                 >
//                   {showConfirm ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-500" />}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <p className="text-sm text-red-500 mt-1">
//                   {errors.confirmPassword}
//                 </p>
//               )}
//             </div>

            
//              <button
//                     type="submit"
//                        disabled={loading}
//                     className="w-full py-4 rounded-xl text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition shadow-lg"
//                   >
//                       {loading ? "Setting..." : "Set Password"}
//                   </button>
//           </form>
//         </div>
//       </div>

//       {/* RIGHT */}
//        <div className="hidden lg:flex h-screen w-full bg-blue-50 items-center justify-center">
//   <img
//     src="/setPass.png"
//     alt="Login"
//     className="w-full h-full object-cover"
//   />
// </div>
//     </div>
//   );
// };

// export default SetPassword;

////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";

const SetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = location.state?.token;

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
      await api.post("/auth/set-password", { token, password });
      toast.success("Password set successfully. Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to set password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row">

      {/* BACKGROUND IMAGE – only visible on large screens */}
      <div
        className="hidden lg:block absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/setPass.png')" }}
      />

      {/* LEFT SIDE – FORM */}
      <div className="relative z-10 flex items-center justify-center w-full lg:w-1/2 px-6 min-h-screen bg-white lg:bg-transparent">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-2xl p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl text-gray-900">Set Your Password</h1>
            <p className="text-sm text-gray-500 mt-2">
              Create a strong password to secure your account
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
                  placeholder="Enter password"
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
              {loading ? "Setting..." : "Set Password"}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE – Overlay text only */}
      <div className="hidden lg:flex relative z-10 items-center justify-center w-1/2 px-10">
        <div className="text-center max-w-md p-8 rounded-lg text-white">
          <h2 className="text-4xl font-bold mb-4">Secure Your Account</h2>
          <p className="text-lg">
            Create a strong password to protect your account from unauthorized access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
