import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CollegeProfile() {
  const { id } = useParams();
  const [college, setCollege] = useState(null);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const token = localStorage.getItem("token"); // get token

        const res = await axios.get(
          `${API}/api/admin/colleges/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setCollege(res.data);
      } catch (err) {
        console.error("Error fetching college:", err);
      }
    };

    fetchCollege();
  }, [id]);

  if (!college)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading college profile...
      </div>
    );

  /* ---------- Reusable Components ---------- */

  const Section = ({ title, children }) => (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">
        {title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-sm">
        {children}
      </div>
    </div>
  );

  const Field = ({ label, value }) => (
    <div>
      <p className="text-gray-500 mb-1">{label}</p>
      <p className="font-medium text-gray-800 wrap-break-word">
        {value || "-"}
      </p>
    </div>
  );

  /* ---------- UI ---------- */

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
      {/* Header Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center bg-white">
            {college.collegeLogo ? (
              <img
                src={college.collegeLogo}
                alt="College Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-indigo-600 font-bold text-xl sm:text-2xl">
                {college.name?.charAt(0) || "C"}
              </span>
            )}
          </div>

          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
              {college.name}
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 mt-1 wrap-break-word">
              {college.email}
            </p>

            <p className="text-xs sm:text-sm text-gray-400 mt-1 break-all">
              College ID: {college._id}
            </p>
          </div>
        </div>

        <span
          className={`self-start md:self-auto px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full border border-gray-200 ${
            college.status === "Active"
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-yellow-100 text-yellow-700 border-yellow-200"
          }`}
        >
          {college.status}
        </span>
      </div>

      {/* Basic Details */}
      <Section title="Basic Details">
        <Field label="College Name" value={college.name} />
        <Field label="Email" value={college.email} />
        <Field label="Mobile" value={college.mobile} />
        <Field label="Authorized Person" value={college.authorizedPerson} />
        <Field label="Designation" value={college.designation} />
        <Field label="Website" value={college.website} />
      </Section>

      {/* College Type */}
      <Section title="College Information">
        <Field label="College Type" value={college.collegeType} />
      </Section>

      {/* Address Section */}
      <Section title="Address Information">
        <Field label="State" value={college.state} />
        <Field label="City" value={college.city} />
        <Field label="Pincode" value={college.pincode} />
        <Field label="Full Address" value={college.fullAddress} />
      </Section>

      {/* Documents Section */}
      <Section title="Documents">
        {/* Registration Certificate */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 transition">
          <div>
            <p className="text-sm font-medium text-gray-700">
              Registration Certificate
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Uploaded document for verification
            </p>
          </div>

          {college.registrationCertificate ? (
            <a
              href={college.registrationCertificate}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit px-4 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              View Document
            </a>
          ) : (
            <span className="text-sm text-gray-400">Not Uploaded</span>
          )}
        </div>

        {/* Approval Certificate */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 transition">
          <div>
            <p className="text-sm font-medium text-gray-700">
              Approval Certificate
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Government approval document
            </p>
          </div>

          {college.approvalCertificate ? (
            <a
              href={college.approvalCertificate}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit px-4 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              View Document
            </a>
          ) : (
            <span className="text-sm text-gray-400">Not Uploaded</span>
          )}
        </div>
      </Section>
    </div>
  );
}
