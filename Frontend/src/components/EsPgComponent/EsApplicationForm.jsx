import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const EsApplicationForm = () => {
  const { districtKey, slug } = useParams();

  const [establishment, setEstablishment] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentAddress: "",
    collegeName: "",
    collegeAddress: "",
    collegeCourse: "",
    semester: "",
    courseIndex: "",
    paymentType: "full",
    installmentAmount: "",
  });

  const [errors, setErrors] = useState({});

  /* ================= FETCH ESTABLISHMENT ================= */

  useEffect(() => {
    const fetchEstablishment = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/establishment/view/${districtKey}/${slug}`
        );

        setEstablishment(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load establishment");
      } finally {
        setLoading(false);
      }
    };

    fetchEstablishment();
  }, [districtKey, slug]);

  /* ================= VALIDATION ================= */

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";

    if (!formData.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Enter a valid email";

    if (!formData.phone.match(/^[0-9]{10}$/))
      newErrors.phone = "Phone must be 10 digits";

    if (!formData.studentAddress.trim())
      newErrors.studentAddress = "Student address required";

    if (!formData.collegeName.trim())
      newErrors.collegeName = "College name required";

    if (!formData.collegeAddress.trim())
      newErrors.collegeAddress = "College address required";

    if (!formData.collegeCourse.trim())
      newErrors.collegeCourse = "College course required";

    if (!formData.semester) newErrors.semester = "Select semester";

    if (formData.courseIndex === "")
      newErrors.courseIndex = "Please select a training course";

    if (
      formData.paymentType === "installment" &&
      !formData.installmentAmount
    ) {
      newErrors.installmentAmount = "Enter installment amount";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= HANDLE SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const courses = establishment?.courses || [];

    const selectedCourse =
      formData.courseIndex !== ""
        ? courses[Number(formData.courseIndex)]
        : null;

    const toastId = toast.loading("Submitting application...");

    try {
    

      const totalFees = selectedCourse.price || selectedCourse.fees || 0;

      const installmentAllowed = formData.paymentType === "installment";

      const installmentDetails = installmentAllowed
        ? `Installment: ₹${formData.installmentAmount}`
        : "";

   const finalData = {
  fullName: formData.name,
  email: formData.email,
  phone: formData.phone,

  studentAddress: formData.studentAddress,

  collegeName: formData.collegeName,
  collegeAddress: formData.collegeAddress,
  collegeCourse: formData.collegeCourse,
  semester: formData.semester,

  courseId: selectedCourse._id,
  establishmentId: establishment._id,

  installmentAllowed,
  installmentDetails,
  totalFees,
};
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/establishment/students",
        finalData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Application submitted successfully", { id: toastId });

      setFormData({
        name: "",
        email: "",
        phone: "",
        studentAddress: "",
        collegeName: "",
        collegeAddress: "",
        collegeCourse: "",
        semester: "",
        courseIndex: "",
        paymentType: "full",
        installmentAmount: "",
      });

      setErrors({});
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  if (!establishment) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        Establishment not found
      </div>
    );
  }

  const courses = establishment?.courses || [];

  const selectedCourse =
    formData.courseIndex !== ""
      ? courses[Number(formData.courseIndex)]
      : null;

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-orange-50 py-16 px-4">

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-gray-200">

        <h1 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Apply at {establishment.establishmentName}
        </h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

          <div className="md:col-span-2 font-semibold text-gray-700">
            Student Details
          </div>

          <div>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={`w-full border rounded-lg px-4 py-3 outline-none focus:border-orange-500
              ${errors.name ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full border rounded-lg px-4 py-3 outline-none focus:border-orange-500
              ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className={`w-full border rounded-lg px-4 py-3 outline-none focus:border-orange-500
              ${errors.phone ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <input
              name="studentAddress"
              value={formData.studentAddress}
              onChange={handleChange}
              placeholder="Student Address"
              className={`w-full border rounded-lg px-4 py-3 outline-none focus:border-orange-500
              ${errors.studentAddress ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.studentAddress && (
              <p className="text-red-500 text-xs mt-1">
                {errors.studentAddress}
              </p>
            )}
          </div>

          {/* College Details */}

          <div className="md:col-span-2 font-semibold text-gray-700 mt-4">
            College Details
          </div>

          <div>
            <input
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              placeholder="College Name"
              className={`w-full border rounded-lg px-4 py-3 outline-none focus:border-orange-500
              ${errors.collegeName ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.collegeName && (
              <p className="text-red-500 text-xs mt-1">{errors.collegeName}</p>
            )}
          </div>

          <div>
            <input
              name="collegeAddress"
              value={formData.collegeAddress}
              onChange={handleChange}
              placeholder="College Address"
              className={`w-full border rounded-lg px-4 py-3 outline-none focus:border-orange-500
              ${errors.collegeAddress ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.collegeAddress && (
              <p className="text-red-500 text-xs mt-1">{errors.collegeAddress}</p>
            )}
          </div>

          <div>
            <input
              name="collegeCourse"
              value={formData.collegeCourse}
              onChange={handleChange}
              placeholder="Current College Course"
              className={`w-full border rounded-lg px-4 py-3 outline-none focus:border-orange-500
              ${errors.collegeCourse ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.collegeCourse && (
              <p className="text-red-500 text-xs mt-1">{errors.collegeCourse}</p>
            )}
          </div>

          <div>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-3 outline-none focus:border-orange-500
              ${errors.semester ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select Semester</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>

            {errors.semester && (
              <p className="text-red-500 text-xs mt-1">{errors.semester}</p>
            )}
          </div>

          {/* Course Selection */}

          <div className="md:col-span-2">
            <select
              name="courseIndex"
              value={formData.courseIndex}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-3 outline-none focus:border-orange-500
              ${errors.courseIndex ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select Training Course</option>

              {courses.map((course, index) => (
                <option key={index} value={index}>
                  {course.title} - ₹{course.price || course.fees || 0} ({course.duration})
                </option>
              ))}
            </select>

            {errors.courseIndex && (
              <p className="text-red-500 text-xs mt-1">{errors.courseIndex}</p>
            )}
          </div>

          {/* Payment */}

          <div className="md:col-span-2 flex gap-6 items-center">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentType"
                value="full"
                checked={formData.paymentType === "full"}
                onChange={handleChange}
              />
              Full Payment
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentType"
                value="installment"
                checked={formData.paymentType === "installment"}
                onChange={handleChange}
              />
              Installment
            </label>
          </div>

          {formData.paymentType === "installment" && (
            <div className="md:col-span-2">
              <input
                name="installmentAmount"
                value={formData.installmentAmount}
                onChange={handleChange}
                type="number"
                placeholder="Installment Amount"
                className={`w-full border rounded-lg px-4 py-3 outline-none focus:border-orange-500
                ${errors.installmentAmount ? "border-red-500" : "border-gray-300"}`}
              />

              {errors.installmentAmount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.installmentAmount}
                </p>
              )}
            </div>
          )}

          {/* Submit */}

          <button
            type="submit"
            className="md:col-span-2 bg-linear-to-r from-orange-500 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg shadow-md"
          >
            Submit Application
          </button>

        </form>
      </div>
    </div>
  );
};