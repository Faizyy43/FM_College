// import React, { useState } from "react";
// import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// const LoginPage = ({ onUsernameSubmit, onLoginSubmit }) => {
//   const navigate = useNavigate();

//   // Step state: USERNAME or PASSWORD
//   const [step, setStep] = useState("USERNAME");
//   const [showPassword, setShowPassword] = useState(false);

//   // Form state
//   const [form, setForm] = useState({
//     identifier: "",
//     password: "",
//   });

//   // Error state
//   const [errors, setErrors] = useState({});

//   // Handle input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" }); // clear error for this field
//   };

//   // Validation function
//   const validate = () => {
//     const newErrors = {};
//     if (step === "USERNAME" && !form.identifier.trim()) {
//       newErrors.identifier = "Email or mobile number is required";
//     }
//     if (step === "PASSWORD" && !form.password.trim()) {
//       newErrors.password = "Password is required";
//     }
//     setErrors(newErrors);
//     console.log("Validation errors:", newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle Continue / Username submission
//   const handleUsernameSubmit = (e) => {
//     e.preventDefault();
//     const isValid = validate();
//     if (!isValid) return; // stop if validation fails
//     if (onUsernameSubmit) {
//       onUsernameSubmit(form.identifier, setStep, setErrors);
//     }
//   };

//   // Handle Login / Password submission
//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     const isValid = validate();
//     if (!isValid) return;
//     if (onLoginSubmit) {
//       onLoginSubmit(form.identifier, form.password, setErrors);
//     }
//   };

//   return (
//     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
//       {/* LEFT – FORM */}
//       <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-6">
//         <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-2xl p-10">

//           {/* HEADER */}
//           <div className="text-center mb-8">
//             <h1 className="text-2xl text-gray-900">Welcome Back</h1>
//             <p className="text-sm text-gray-500 mt-2">Login to your account</p>
//           </div>

//           <form
//             onSubmit={step === "USERNAME" ? handleUsernameSubmit : handleLoginSubmit}
//             className="space-y-6"
//           >
//             {/* Username Input */}
//             <div>
//               <div className="relative h-[52px]">
//                 <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                 <input
//                   type="text"
//                   name="identifier"
//                   value={form.identifier}
//                   onChange={handleChange}
//                   placeholder="Email or Contact Number"
//                   className={`w-full h-full pl-12 pr-4 rounded-xl border ${
//                     errors.identifier ? "border-red-500" : "border-gray-300"
//                   } bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition shadow-sm`}
//                   disabled={step === "PASSWORD"}
//                 />
//               </div>
//               {errors.identifier && (
//                 <p className="text-sm text-red-500 mt-1">{errors.identifier}</p>
//               )}
//             </div>

//             {/* Password Input */}
//             {step === "PASSWORD" && (
//               <div>
//                 <div className="relative h-[52px]">
//                   <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={form.password}
//                     onChange={handleChange}
//                     placeholder="Password"
//                     className={`w-full h-full pl-12 pr-12 rounded-xl border ${
//                       errors.password ? "border-red-500" : "border-gray-300"
//                     } bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition shadow-sm`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//                     tabIndex={-1}
//                   >
//                     {showPassword ? <FiEyeOff /> : <FiEye />}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-sm text-red-500 mt-1">{errors.password}</p>
//                 )}
//               </div>
//             )}

//             {/* Buttons */}
//             <div>
//               {step === "USERNAME" && (
//                 <button
//                   type="submit"
//                   className="w-full py-4 rounded-xl text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition shadow-lg"
//                 >
//                   Continue
//                 </button>
//               )}

//               {step === "PASSWORD" && (
//                 <>
//                   <button
//                     type="submit"
//                     className="w-full py-4 rounded-xl text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition shadow-lg"
//                   >
//                     Login
//                   </button>
//                   <div className="text-right mt-3">
//                     <button
//                       type="button"
//                       onClick={() => navigate("/forgot-password")}
//                       className="text-sm text-indigo-600 hover:underline"
//                     >
//                       Forgot password?
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </form>

//           {/* Register */}
//           <p className="text-sm text-gray-500 mt-6 text-center">
//             Don’t have an account?{" "}
//             <a href="/register" className="text-indigo-600 hover:underline">
//               Register here
//             </a>
//           </p>
//         </div>
//       </div>

  
//     {/* RIGHT – INFO */}


// <div className="hidden lg:flex h-screen w-full bg-blue-50 items-center justify-center">
//   <img
//     src="/mainLogin.png"
//     alt="Login"
//     className="w-full h-full object-cover"
//   />
// </div>


//     </div>
//   );
// };

// export default LoginPage;

/////////////////////////////////////////////////////////////////////////////////



// import React, { useState } from "react";
// import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// const LoginPage = ({ onUsernameSubmit, onLoginSubmit }) => {
//   const navigate = useNavigate();

//   // Step state: USERNAME or PASSWORD
//   const [step, setStep] = useState("USERNAME");
//   const [showPassword, setShowPassword] = useState(false);

//   // Form state
//   const [form, setForm] = useState({
//     identifier: "",
//     password: "",
//   });

//   // Error state
//   const [errors, setErrors] = useState({});

//   // Handle input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" }); // clear error for this field
//   };

//   // Validation function
//   const validate = () => {
//     const newErrors = {};
//     if (step === "USERNAME" && !form.identifier.trim()) {
//       newErrors.identifier = "Email or mobile number is required";
//     }
//     if (step === "PASSWORD" && !form.password.trim()) {
//       newErrors.password = "Password is required";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle Continue / Username submission
//   const handleUsernameSubmit = (e) => {
//     e.preventDefault();
//     const isValid = validate();
//     if (!isValid) return;
//     if (onUsernameSubmit) {
//       onUsernameSubmit(form.identifier, setStep, setErrors);
//     }
//   };

//   // Handle Login / Password submission
//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     const isValid = validate();
//     if (!isValid) return;
//     if (onLoginSubmit) {
//       onLoginSubmit(form.identifier, form.password, setErrors);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-cover bg-center relative"
//       style={{ backgroundImage: "url('/mainLogin.png')" }}
//     >
//       {/* Overlay to darken background on mobile */}
//       <div className="absolute inset-0 bg-black/30 lg:bg-transparent"></div>

//       {/* LEFT – FORM */}
//       <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
//         <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-2xl p-10">
//           {/* HEADER */}
//           <div className="text-center mb-8">
//             <h1 className="text-2xl text-gray-900">Welcome Back</h1>
//             <p className="text-sm text-gray-500 mt-2">Login to your account</p>
//           </div>

//           <form
//             onSubmit={step === "USERNAME" ? handleUsernameSubmit : handleLoginSubmit}
//             className="space-y-6"
//           >
//             {/* Username Input */}
//             <div>
//               <div className="relative h-[52px]">
//                 <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                 <input
//                   type="text"
//                   name="identifier"
//                   value={form.identifier}
//                   onChange={handleChange}
//                   placeholder="Email or Contact Number"
//                   className={`w-full h-full pl-12 pr-4 rounded-xl border ${
//                     errors.identifier ? "border-red-500" : "border-gray-300"
//                   } bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition shadow-sm`}
//                   disabled={step === "PASSWORD"}
//                 />
//               </div>
//               {errors.identifier && (
//                 <p className="text-sm text-red-500 mt-1">{errors.identifier}</p>
//               )}
//             </div>

//             {/* Password Input */}
//             {step === "PASSWORD" && (
//               <div>
//                 <div className="relative h-[52px]">
//                   <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={form.password}
//                     onChange={handleChange}
//                     placeholder="Password"
//                     className={`w-full h-full pl-12 pr-12 rounded-xl border ${
//                       errors.password ? "border-red-500" : "border-gray-300"
//                     } bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition shadow-sm`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//                     tabIndex={-1}
//                   >
//                     {showPassword ? <FiEyeOff /> : <FiEye />}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-sm text-red-500 mt-1">{errors.password}</p>
//                 )}
//               </div>
//             )}

//             {/* Buttons */}
//             <div>
//               {step === "USERNAME" && (
//                 <button
//                   type="submit"
//                   className="w-full py-4 rounded-xl text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition shadow-lg"
//                 >
//                   Continue
//                 </button>
//               )}

//               {step === "PASSWORD" && (
//                 <>
//                   <button
//                     type="submit"
//                     className="w-full py-4 rounded-xl text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition shadow-lg"
//                   >
//                     Login
//                   </button>
//                   <div className="text-right mt-3">
//                     <button
//                       type="button"
//                       onClick={() => navigate("/forgot-password")}
//                       className="text-sm text-indigo-600 hover:underline"
//                     >
//                       Forgot password?
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </form>

//           {/* Register */}
//           <p className="text-sm text-gray-500 mt-6 text-center">
//             Don’t have an account?{" "}
//             <a href="/register" className="text-indigo-600 hover:underline">
//               Register here
//             </a>
//           </p>
//         </div>
//       </div>

//       {/* RIGHT – OVERLAY TEXT */}
//       <div className="hidden lg:flex relative z-10 items-center justify-center px-10 text-white">
//         <div className="text-center max-w-md">
//           <h2 className="text-4xl font-bold mb-4">Welcome to Our Platform</h2>
//           <p className="text-lg">
//             Experience seamless login and access all features effortlessly.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


//////////////////////////////////////////////////////////////////////////////////////////////


import React, { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onUsernameSubmit, onLoginSubmit }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState("USERNAME");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (step === "USERNAME" && !form.identifier.trim()) {
      newErrors.identifier = "Email or mobile number is required";
    }
    if (step === "PASSWORD" && !form.password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onUsernameSubmit && onUsernameSubmit(form.identifier, setStep, setErrors);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onLoginSubmit && onLoginSubmit(form.identifier, form.password, setErrors);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2
                    bg-white lg:bg-[url('/mainLogin.png')] lg:bg-cover lg:bg-center">
      {/* LEFT – FORM */}
      <div className="flex items-center justify-center px-6 min-h-screen">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-2xl p-10">
          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-2xl text-gray-900">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-2">Login to your account</p>
          </div>

          <form
            onSubmit={step === "USERNAME" ? handleUsernameSubmit : handleLoginSubmit}
            className="space-y-6"
          >
            {/* Username */}
            <div>
              <div className="relative h-13">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  name="identifier"
                  value={form.identifier}
                  onChange={handleChange}
                  placeholder="Email or Contact Number"
                  className={`w-full h-full pl-12 pr-4 rounded-xl border ${
                    errors.identifier ? "border-red-500" : "border-gray-300"
                  } bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition shadow-sm`}
                  disabled={step === "PASSWORD"}
                />
              </div>
              {errors.identifier && (
                <p className="text-sm text-red-500 mt-1">{errors.identifier}</p>
              )}
            </div>

            {/* Password */}
            {step === "PASSWORD" && (
              <div>
                <div className="relative h-13">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`w-full h-full pl-12 pr-12 rounded-xl border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition shadow-sm`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    tabIndex={-1}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                )}
              </div>
            )}

            {/* Buttons */}
            <div>
              {step === "USERNAME" && (
                <button className="w-full py-4 rounded-xl text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition shadow-lg">
                  Continue
                </button>
              )}
              {step === "PASSWORD" && (
                <>
                  <button className="w-full py-4 rounded-xl text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition shadow-lg">
                    Login
                  </button>
                  <div className="text-right mt-3">
                    <button
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-indigo-600 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>

      {/* RIGHT – Overlay text only */}
      <div className="hidden lg:flex items-center justify-center px-10">
        <div className="text-center max-w-md p-8 rounded-lg text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome to Our Platform</h2>
          <p className="text-lg">
            Experience seamless login and access all features effortlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
