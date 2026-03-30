// import React from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import {
//   FiUser,
//   FiMail,
//   FiPhone,
//   FiLock,
//   FiMapPin,
//   FiBook,
// } from "react-icons/fi";
// import api from "../../api/axios";

// const StudentRegister = () => {
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//      try {
//        await api.post("/register/student",{
//         fullName: data.fullName,
//         email: data.email,
//         mobile: data.mobile,
//         password: data.password,
//         educationLevel: data.educationLevel,
//         course: data.course,
//         city:data.city,
//         referralCode: data.referralCode  
//        });

//        navigate("/register/success",{
//         state: {role: "STUDENT"},
//        });

//      } catch (error) {
//        alert(
//         error.response?.data?.message  || "Student registration failed"
//        )
//      }
//   };

//   const inputBase =
//     "w-full h-[52px] pl-12 pr-4 rounded-xl border border-gray-300 bg-white " +
//     "focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 " +
//     "outline-none transition shadow-sm";

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6">
//       <div className="w-full max-w-3xl p-10 bg-white rounded-3xl shadow-2xl border border-gray-200">

//         {/* HEADER */}
//         <div className="text-center mb-8">
//           <h1 className="text-2xl text-gray-800">
//             Create Student Account
//           </h1>
//           <p className="text-sm text-gray-500 mt-2">
//             Apply for courses and earn rewards
//           </p>
//         </div>

//         {/* FORM */}
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="grid grid-cols-1 md:grid-cols-2 gap-6"
//         >

//           {/* Full Name */}
//           <div>
//             <div className="relative h-[52px]">
//               <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <input
//                 {...register("fullName", { required: "Full name is required" })}
//                 className={inputBase}
//                 placeholder="Full Name"
//               />
//             </div>
//             {errors.fullName && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.fullName.message}
//               </p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <div className="relative h-[52px]">
//               <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <input
//                 type="email"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^\S+@\S+$/i,
//                     message: "Invalid email address",
//                   },
//                 })}
//                 className={inputBase}
//                 placeholder="Email"
//               />
//             </div>
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           {/* Mobile */}
//           <div>
//             <div className="relative h-[52px]">
//               <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <input
//                 type="tel"
//                 {...register("mobile", {
//                   required: "Mobile number is required",
//                   minLength: {
//                     value: 10,
//                     message: "Must be 10 digits",
//                   },
//                 })}
//                 className={inputBase}
//                 placeholder="Contact Number"
//               />
//             </div>
//             {errors.mobile && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.mobile.message}
//               </p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <div className="relative h-[52px]">
//               <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <input
//                 type="password"
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 6,
//                     message: "Minimum 6 characters",
//                   },
//                 })}
//                 className={inputBase}
//                 placeholder="Password"
//               />
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.password.message}
//               </p>
//             )}
//           </div>

//           {/* Education Level */}
//           <div>
//             <div className="relative h-[52px]">
//               <FiBook className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <select
//                 {...register("educationLevel", {
//                   required: "Select education level",
//                 })}
//                 className={`${inputBase} appearance-none`}
//               >
//                 <option value="">Select Education Level</option>
//                 <option value="school">School</option>
//                 <option value="college">College</option>
//                 <option value="graduate">Graduate</option>
//               </select>
//             </div>
//             {errors.educationLevel && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.educationLevel.message}
//               </p>
//             )}
//           </div>

//           {/* Course */}
//           <div>
//             <div className="relative h-[52px]">
//               <FiBook className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <select
//                 {...register("course", { required: "Select a course" })}
//                 className={`${inputBase} appearance-none`}
//               >
//                 <option value="">Select Course</option>
//                 <option value="science">Science</option>
//                 <option value="commerce">Commerce</option>
//                 <option value="arts">Arts</option>
//                 <option value="engineering">Engineering</option>
//                 <option value="medical">Medical</option>
//               </select>
//             </div>
//             {errors.course && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.course.message}
//               </p>
//             )}
//           </div>

//           {/* City */}
//           <div>
//             <div className="relative h-[52px]">
//               <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <input
//                 {...register("city", { required: "City is required" })}
//                 className={inputBase}
//                 placeholder="City"
//               />
//             </div>
//             {errors.city && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.city.message}
//               </p>
//             )}
//           </div>

//           {/* Referral Code */}
//           <div>
//             <div className="relative h-[52px]">
//               <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <input
//                 {...register("referralCode")}
//                 className={inputBase}
//                 placeholder="Referral Code (optional)"
//               />
//             </div>
//           </div>

//           {/* SUBMIT */}
//           <div className="md:col-span-2 mt-4">
//             <button
//               type="submit"
//               className="w-full py-4 rounded-xl text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition shadow-lg"
//             >
//               Create Account
//             </button>
//           </div>
//         </form>

//         {/* FOOTER */}
//         <p className="text-center text-sm text-gray-500 mt-6">
//           Already have an account?{" "}
//           <span
//             onClick={() => navigate("/login")}
//             className="text-indigo-600 cursor-pointer hover:underline"
//           >
//             Login here
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default StudentRegister;


//////////////////////////////////////////////////////////////////////////


import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiMapPin,
  FiBook,
} from "react-icons/fi";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

const StudentRegister = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/student/register", {
        fullName: data.fullName,
        email: data.email,
        mobile: data.mobile,
        password: data.password,
        educationLevel: data.educationLevel,
        course: data.course,
        city: data.city,
        referralCode: data.referralCode,
      });
toast.success("Student registered successfully!", {
  className: "text-lg font-semibold px-6 py-4 rounded-xl bg-indigo-600 text-white text-center shadow-lg",
  duration: 1500,
});

// Navigate immediately
navigate("/register/success", {
  state: { role: "STUDENT" },
});

    } catch (error) {
      toast.error(error.response?.data?.message || "Student registration failed", {
        className:
          "text-lg font-semibold px-6 py-4 rounded-xl bg-red-600 text-white text-center shadow-lg",
        duration: 1500,
      });
    }
  };

  const inputBase =
    "w-full h-[52px] pl-12 pr-4 rounded-xl border border-gray-300 bg-white " +
    "focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 " +
    "outline-none transition shadow-sm";

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl p-10 bg-white rounded-3xl shadow-2xl border border-gray-200">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-2xl text-gray-800">Create Student Account</h1>
          <p className="text-sm text-gray-500 mt-2">
            Apply for courses and earn rewards
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div>
            <div className="relative h-[52px]">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                {...register("fullName", { required: "Full name is required" })}
                className={inputBase}
                placeholder="Full Name"
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <div className="relative h-[52px]">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className={inputBase}
                placeholder="Email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <div className="relative h-[52px]">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="tel"
                {...register("mobile", {
                  required: "Mobile number is required",
                  minLength: {
                    value: 10,
                    message: "Must be 10 digits",
                  },
                })}
                className={inputBase}
                placeholder="Contact Number"
              />
            </div>
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative h-[52px]">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                className={inputBase}
                placeholder="Password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Education Level */}
          <div>
            <div className="relative h-[52px]">
              <FiBook className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                {...register("educationLevel", {
                  required: "Select education level",
                })}
                className={`${inputBase} appearance-none`}
              >
                <option value="">Select Education Level</option>
                <option value="school">School</option>
                <option value="college">College</option>
                <option value="graduate">Graduate</option>
              </select>
            </div>
            {errors.educationLevel && (
              <p className="text-red-500 text-sm mt-1">{errors.educationLevel.message}</p>
            )}
          </div>

          {/* Course */}
          <div>
            <div className="relative h-[52px]">
              <FiBook className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                {...register("course", { required: "Select a course" })}
                className={`${inputBase} appearance-none`}
              >
                <option value="">Select Course</option>
                <option value="science">Science</option>
                <option value="commerce">Commerce</option>
                <option value="arts">Arts</option>
                <option value="engineering">Engineering</option>
                <option value="medical">Medical</option>
              </select>
            </div>
            {errors.course && (
              <p className="text-red-500 text-sm mt-1">{errors.course.message}</p>
            )}
          </div>

          {/* City */}
          <div>
            <div className="relative h-[52px]">
              <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                {...register("city", { required: "City is required" })}
                className={inputBase}
                placeholder="City"
              />
            </div>
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* Referral Code */}
          <div>
            <div className="relative h-[52px]">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                {...register("referralCode")}
                className={inputBase}
                placeholder="Referral Code (optional)"
              />
            </div>
          </div>

          {/* SUBMIT */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full py-4 rounded-xl text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition shadow-lg"
            >
              Create Account
            </button>
          </div>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default StudentRegister;
