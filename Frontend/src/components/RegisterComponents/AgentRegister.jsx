import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiMapPin,
  FiCreditCard,
  FiBriefcase,
} from "react-icons/fi";
import api from "../../api/axios";
import toast from "react-hot-toast";

const AgentRegister = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 const onSubmit = async (data) => {
  try {
    await api.post("/agent/register", {
      fullName: data.fullName,
      email: data.email,
      mobile: data.mobile,
      password: data.password,
      city: data.city,
      pan: data.pan,
      bankAccount: data.bankAccount,
      ifsc: data.ifsc,
      experience: data.experience,
    });

   toast.success("Agent registered successfully! Await admin approval.", {
  className: "text-lg font-semibold px-6 py-4 rounded-xl bg-indigo-600 text-white text-center shadow-lg",
      duration: 1500,
});


  navigate("/register/success", {
    state: { role: "AGENT" },
  });


  } catch (error) {
    toast.error(
      error.response?.data?.message || "Agent registration failed",
      {
        duration: 2500,
        style: {
          padding: "20px",
          fontSize: "16px",
        },
      }
    );
  }
};

  const inputBase =
    "w-full h-[52px] pl-12 pr-4 rounded-xl border border-gray-300 bg-white " +
    "focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 " +
    "outline-none transition shadow-sm";

  const iconClass =
    "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none";

  return (
    <div className="min-h-full bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-5">
      <div className="w-full max-w-4xl p-10 bg-white rounded-3xl shadow-2xl border border-gray-200">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-2xl text-gray-800">Register as Agent</h1>
          <p className="text-sm text-gray-500 mt-2">
            Refer students and earn commission on successful admissions
          </p>

          <div className="mt-3 text-xs inline-block px-3 py-1 rounded-full bg-yellow-50 text-yellow-700">
            Account activation requires admin approval
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* Full Name */}
          <div>
            <div className="relative h-[52px]">
              <FiUser className={iconClass} />
              <input
                {...register("fullName", { required: "Full name is required" })}
                className={inputBase}
                placeholder="Full Name"
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <div className="relative h-[52px]">
              <FiMail className={iconClass} />
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={inputBase}
                placeholder="Email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <div className="relative h-[52px]">
              <FiPhone className={iconClass} />
              <input
                type="tel"
                {...register("mobile", { required: "Mobile number is required" })}
                className={inputBase}
                placeholder="Contact Number"
              />
            </div>
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative h-[52px]">
              <FiLock className={iconClass} />
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className={inputBase}
                placeholder="Password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <div className="relative h-[52px]">
              <FiMapPin className={iconClass} />
              <input
                {...register("city", { required: "City is required" })}
                className={inputBase}
                placeholder="City"
              />
            </div>
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">
                {errors.city.message}
              </p>
            )}
          </div>

          {/* PAN */}
          <div>
            <div className="relative h-[52px]">
              <FiCreditCard className={iconClass} />
              <input
                {...register("pan", { required: "PAN number is required" })}
                className={inputBase}
                placeholder="PAN Number"
              />
            </div>
            {errors.pan && (
              <p className="text-red-500 text-sm mt-1">
                {errors.pan.message}
              </p>
            )}
          </div>

          {/* Bank Account */}
          <div>
            <div className="relative h-[52px]">
              <FiCreditCard className={iconClass} />
              <input
                {...register("bankAccount", {
                  required: "Bank account number is required",
                })}
                className={inputBase}
                placeholder="Bank Account Number"
              />
            </div>
            {errors.bankAccount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bankAccount.message}
              </p>
            )}
          </div>

          {/* IFSC */}
          <div>
            <div className="relative h-[52px]">
              <FiCreditCard className={iconClass} />
              <input
                {...register("ifsc", { required: "IFSC code is required" })}
                className={inputBase}
                placeholder="IFSC Code"
              />
            </div>
            {errors.ifsc && (
              <p className="text-red-500 text-sm mt-1">
                {errors.ifsc.message}
              </p>
            )}
          </div>

          {/* Experience */}
          <div>
            <div className="relative h-[52px]">
              <FiBriefcase className={iconClass} />
              <select
                {...register("experience", {
                  required: "Experience selection is required",
                })}
                className={`${inputBase} appearance-none`}
              >
                <option value="">Experience in Education?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* SUBMIT */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full py-4 rounded-xl text-white
                         bg-linear-to-r from-indigo-600 to-purple-600
                         hover:opacity-90 transition shadow-lg"
            >
              Submit for Approval
            </button>
          </div>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already registered?{" "}
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

export default AgentRegister;
