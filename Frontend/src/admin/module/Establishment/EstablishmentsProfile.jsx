import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EstablishmentsProfile() {
  const { id } = useParams();
  const [establishment, setEstablishment] = useState(null);

  useEffect(() => {
    const fetchEstablishment = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:5000/api/admin/establishments/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setEstablishment(res.data);
      } catch (error) {
        console.error("Error fetching establishment:", error);
      }
    };

    fetchEstablishment();
  }, [id]);

  if (!establishment)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading establishment profile...
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

  const DocumentCard = ({ title, file }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 transition">
      <div>
        <p className="text-sm font-medium text-gray-700">{title}</p>
        <p className="text-xs text-gray-400 mt-1">
          Uploaded document for verification
        </p>
      </div>

      {file ? (
        <a
          href={file}
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
  );

  /* ---------- UI ---------- */

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center bg-gray-50">
            {establishment.companyLogo ? (
              <img
                src={establishment.companyLogo}
                alt="Company Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-indigo-600 font-bold text-xl sm:text-2xl flex items-center justify-center w-full h-full">
                {establishment.name?.charAt(0) || "E"}
              </span>
            )}
          </div>

          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
              {establishment.name}
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 mt-1 wrap-break-word">
              {establishment.email}
            </p>

            <p className="text-xs sm:text-sm text-gray-400 mt-1 break-all">
              Establishment ID: {establishment._id}
            </p>
          </div>
        </div>

        <span
          className={`self-start md:self-auto px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full border border-gray-200 ${
            establishment.status === "APPROVED"
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-yellow-100 text-yellow-700 border-yellow-200"
          }`}
        >
          {establishment.status}
        </span>
      </div>

      {/* Basic Details */}

      <Section title="Basic Details">
        <Field label="Establishment Name" value={establishment.name} />
        <Field label="Email" value={establishment.email} />
        <Field label="Mobile" value={establishment.mobile} />
        <Field
          label="Authorized Person"
          value={establishment.authorizedPerson}
        />
        <Field label="Designation" value={establishment.designation} />
        <Field label="Website" value={establishment.website} />
      </Section>

      {/* Establishment Info */}

      <Section title="Establishment Information">
        <Field
          label="Coaching Category"
          value={establishment.coachingCategory}
        />
        <Field
          label="Years of Experience"
          value={establishment.yearsOfExperience}
        />
      </Section>

      {/* Address */}

      <Section title="Address Information">
        <Field label="State" value={establishment.state} />
        <Field label="City" value={establishment.city} />
        <Field label="Full Address" value={establishment.address} />
      </Section>

      {/* Infrastructure */}

      <Section title="Infrastructure">
        <Field label="Classrooms" value={establishment.classrooms} />
        <Field label="Capacity" value={establishment.capacity} />
        <Field label="Staff" value={establishment.staff} />
        <Field label="Mode" value={establishment.mode} />
      </Section>

      {/* Documents */}

      <Section title="Documents">
        <DocumentCard
          title="GST Certificate"
          file={establishment.businessCertificate}
        />

        <DocumentCard title="PAN Card" file={establishment.panCard} />

        <DocumentCard title="Address Proof" file={establishment.addressProof} />

        <DocumentCard
          title="Registration Certificate"
          file={establishment.registrationCertificate}
        />

        <DocumentCard title="Owner Photo" file={establishment.ownerPhoto} />

        <DocumentCard title="Company Logo" file={establishment.companyLogo} />
      </Section>
    </div>
  );
}
