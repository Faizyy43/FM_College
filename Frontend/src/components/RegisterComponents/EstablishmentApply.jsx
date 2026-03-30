import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiBriefcase,
  FiFileText,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import api from "../../api/axios";
import toast from "react-hot-toast";

const MIN_SIZE = 500 * 1024; // 500 KB
const MAX_SIZE = 2 * 1024 * 1024; // 2 MB

const EstablishmentApply = () => {
  const navigate = useNavigate();

  const businessInputRef = useRef(null);
  const idProofInputRef = useRef(null);

  const [businessFile, setBusinessFile] = useState(null);
  const [idProofFile, setIdProofFile] = useState(null);

  const [businessError, setBusinessError] = useState("");
  const [idProofError, setIdProofError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const validateFile = (file) => {
    if (!file) return "File is required";

    if (file.size < MIN_SIZE) {
      return "Minimum file size is 500 KB";
    }

    if (file.size > MAX_SIZE) {
      return "Maximum file size is 2 MB";
    }

    return "";
  };

  /* ================= SUBMIT ================= */

  const onSubmit = async (data) => {
    try {
      if (!businessFile) {
        setBusinessError("Business document is required");
        toast.error("Please upload business document");
        return;
      }

      if (!idProofFile) {
        setIdProofError("ID proof is required");
        toast.error("Please upload ID proof");
        return;
      }

      const token = localStorage.getItem("token");

      /* ================= TOKEN CHECK ================= */

      // if (!token) {
      //   toast.error("Please login first");
      //   navigate("/login");
      //   return;
      // }

      const formData = new FormData();

      formData.append("establishmentName", data.establishmentName);
      formData.append("email", data.email);
      formData.append("mobile", data.mobile);
      formData.append("website", data.website || "");
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("authorizedPerson", data.authorizedPerson);
      formData.append("designation", data.designation);
      formData.append("category", data.category);
      formData.append("experience", data.experience);

      formData.append("businessProof", businessFile);
      formData.append("idProof", idProofFile);

      await api.post("/establishment/apply", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Application submitted successfully!", {
        duration: 1500,
      });

      navigate("/apply/success", {
        state: { role: "ESTABLISHMENT" },
      });
    } catch (error) {
      const message = error.response?.data?.message || "Application failed";

      setBusinessError(message);
      setIdProofError(message);

      toast.error(message);
    }
  };

  const inputBase =
    "w-full h-[52px] pl-12 pr-4 rounded-xl border border-gray-300 bg-white " +
    "focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none shadow-sm";

  const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400";

  const renderUpload = ({
    label,
    Icon,
    file,
    setFile,
    error,
    setError,
    inputRef,
    fieldName,
  }) => (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        className={`w-full flex flex-col items-center px-4 py-6 rounded-xl border cursor-pointer transition shadow
        ${
          error
            ? "border-red-400 bg-red-50"
            : file
              ? "border-green-300 bg-linear-to-br from-green-50 to-white"
              : "border-gray-300 bg-white hover:border-2 hover:border-indigo-500"
        }`}
      >
        {!file ? (
          <>
            <Icon size={32} className="text-gray-400 mb-2" />
            <span className="text-sm text-gray-500 text-center">{label}</span>
            <span className="text-xs text-gray-400 mt-1">
              PDF, JPG, PNG • 500 KB – 2 MB
            </span>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-green-600">
              <FiCheckCircle />
              <span className="text-sm font-medium">Uploaded</span>
            </div>

            <div className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 max-w-[220px] truncate">
              {file.name}
            </div>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          const selected = e.target.files[0];

          const err = validateFile(selected);

          if (err) {
            setError(err);
            setFile(null);
            setValue(fieldName, null);
            return;
          }

          setError("");
          setFile(selected);
          setValue(fieldName, selected);
          clearErrors(fieldName);
        }}
      />

      {file && (
        <button
          type="button"
          onClick={() => {
            setFile(null);
            setError("");
            setValue(fieldName, null);

            inputRef.current.value = "";
          }}
          className="mt-2 text-xs text-red-500 flex items-center gap-1"
        >
          <FiXCircle size={14} /> Remove file
        </button>
      )}

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl p-10 bg-white rounded-3xl shadow-2xl">
        {/* HEADER */}

        <div className="text-center mb-10">
          <h1 className="text-2xl text-gray-800">Establishment Application</h1>

          <p className="text-sm text-gray-500 mt-2">
            Apply to list your coaching institute and reach targeted students
          </p>

          <div className="mt-3 text-xs inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700">
            Admin approval required before account activation
          </div>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            ["establishmentName", "Establishment Name", FaBuilding],
            ["email", "Email", FiMail, "email"],
            ["mobile", "Contact Number", FiPhone],
            ["website", "Website (optional)", FiFileText],
            ["address", "Full Address", FiMapPin, "text", true],
            ["city", "City", FiMapPin],
            ["state", "State", FiMapPin],
            ["authorizedPerson", "Authorized Person", FiUser],
            ["designation", "Designation", FiBriefcase],
            // [
            //   "category",
            //   "Category (Coaching / Institute / Training)",
            //   FiBriefcase,
            // ],
            // ["experience", "Years of Experience", FiFileText],
          ].map(([name, placeholder, Icon, type, span]) => (
            <div key={name} className={span ? "md:col-span-2" : ""}>
              <div className="relative h-13">
                <Icon className={iconClass} />

                <input
                  type={type || "text"}
                  {...register(name, {
                    required: !placeholder.includes("optional"),
                  })}
                  className={inputBase}
                  placeholder={placeholder}
                />
              </div>
            </div>
          ))}

          {renderUpload({
            label: "Business Registration / GST Certificate",
            Icon: FiFileText,
            file: businessFile,
            setFile: setBusinessFile,
            error: businessError,
            setError: setBusinessError,
            inputRef: businessInputRef,
            fieldName: "businessProof",
          })}

          {renderUpload({
            label: "Authorized Person ID Proof",
            Icon: FiUser,
            file: idProofFile,
            setFile: setIdProofFile,
            error: idProofError,
            setError: setIdProofError,
            inputRef: idProofInputRef,
            fieldName: "idProof",
          })}

          <div className="md:col-span-2 mt-6">
            <button
              type="submit"
              className="w-full py-4 rounded-xl text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EstablishmentApply;
