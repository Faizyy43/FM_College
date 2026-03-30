import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import PersonalDetails from "./PersonalDetails";
import ContactDetails from "./ContactDetails";
import ParentDetails from "./ParentDetails";
import AcademicDetails from "./AcademicDetails";
import CourseDetails from "./CourseDetails";
import UploadDocuments from "./UploadDocuments";

import api from "../../api/axios";

const CollegeApplicationForm = () => {

  const { collegeSlug } = useParams();

  const formatCollegeName = (slug = "") =>
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const collegeName = formatCollegeName(collegeSlug);
  const academicYear = "2025–2026";

  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onTouched"
  });

  const navigate = useNavigate();
  /* ================= BODY SCROLL LOCK ================= */

  useEffect(() => {
    if (showSuccess) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSuccess]);

  /* ================= FILE REGISTER ================= */

  useEffect(() => {
    register("photo", { required: "Passport Size Photograph is required" });
    register("signature", { required: "Signature is required" });
    register("marksheet10", { required: "10th Marksheet is required" });
    register("marksheet12", { required: "12th Marksheet is required" });
    register("tc", { required: "Transfer Certificate is required" });
    register("characterCert", { required: "Character Certificate is required" });
    register("idProof", { required: "ID Proof is required" });

    register("migrationCert");
    register("casteCert");
    register("incomeCert");
  }, [register]);

  /* ================= STEP VALIDATION ================= */

  const stepFields = [
    ["fullName", "dob", "gender", "nationality", "idNumber"],
    ["permanentAddress", "currentAddress", "mobile", "email"],
    [
      "fatherName",
      "fatherOccupation",
      "motherName",
      "motherOccupation",
      "parentContact",
      "annualIncome",
    ],
    [
      "previousInstitute",
      "board",
      "rollNumber",
      "yearOfPassing",
      "subjects",
      "marks",
      "percentage",
    ],
    ["stream", "studyMode", "examRoll", "examScore"],
  ];

  /* ================= NEXT STEP ================= */

  const handleNext = async () => {
    const currentFields = stepFields[step - 1];

    const isValid = await trigger(currentFields);

    if (!isValid) return;

    setStep((prev) => prev + 1);
  };

  /* ================= SUBMIT ================= */

  const onSubmit = async (data) => {

    if (loading) return;

    setSubmitAttempted(true);
    setLoading(true);

    try {

      const formData = new FormData();

      Object.keys(data).forEach((key) => {

        if (!data[key]) return;

        if (data[key] instanceof File) {
          formData.append(key, data[key]);
        }

        else if (data[key] instanceof FileList) {
          formData.append(key, data[key][0]);
        }

        else {
          formData.append(key, data[key]);
        }

      });

      const response = await api.post(
        `/student/apply/${collegeSlug}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("Application response:", response.data);

      setShowPopup(true);

setTimeout(() => {
  navigate("/student/applied-colleges");
}, 2000);

    } catch (error) {

      console.error("Submit error:", error);

      if (error.response?.status === 409) {
        alert("You have already applied to this college.");
        setShowSuccess(true);
      } else {
        alert(error.response?.data?.message || "Application submission failed");
      }

    } finally {
      setLoading(false);
    }
  };

  /* ================= STEPS ================= */

  const steps = [
    <PersonalDetails register={register} errors={errors} />,
    <ContactDetails register={register} errors={errors} />,
    <ParentDetails register={register} errors={errors} />,
    <AcademicDetails register={register} errors={errors} />,
    <CourseDetails register={register} errors={errors} />,
    <UploadDocuments
      errors={errors}
      setValue={setValue}
      clearErrors={clearErrors}
      submitAttempted={submitAttempted}
    />,
  ];

  return (
    <div className="min-h-screen bg-slate-100 py-10 overflow-y-auto">

      {/* COLLEGE HEADER */}

      <div className="max-w-5xl mx-auto mb-8 px-6">

        <div className="border border-gray-200 bg-linear-to-tl from-orange-400 via-white to-white text-gray-900 rounded-2xl p-8 shadow-lg">

          <h1 className="text-3xl font-semibold">
            {collegeName} Admission Application
          </h1>

          <p className="mt-3">
            Application for admission to the academic year
            <span className="font-medium"> {academicYear}</span>.
          </p>

          <p className="mt-2 text-sm">
            Incomplete or incorrect applications may be rejected.
          </p>

        </div>

      </div>

      {/* FORM CARD */}

      <div className="max-w-5xl mx-auto px-6">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-gray-200 bg-white rounded-2xl shadow-xl p-10"
        >

          <p className="text-sm text-gray-400 mb-2">
            Step {step} of {steps.length}
          </p>

          <div className="mb-8">
            {steps[step - 1]}
          </div>

          <div className="flex justify-between">

            <button
              type="button"
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600"
            >
              Back
            </button>

            {step === steps.length ? (

              <button
                type="submit"
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>

            ) : (

              <button
                type="button"
                onClick={handleNext}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold"
              >
                Continue
              </button>

            )}

          </div>

        </form>

      </div>
      {showPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

    <div className="bg-white rounded-xl shadow-lg p-8 text-center w-[350px]">

      <div className="text-green-600 text-4xl mb-3">✔</div>

      <h2 className="text-lg font-semibold mb-2">
        Application Submitted
      </h2>

      <p className="text-sm text-gray-500">
        Redirecting to your applications...
      </p>

    </div>

  </div>
)}

    </div>
  );
};

export default CollegeApplicationForm;