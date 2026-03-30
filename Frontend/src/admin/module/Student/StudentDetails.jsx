import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { useParams, useNavigate } from "react-router-dom";

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const res = await api.get(`/admin/students/${id}`);
      setStudent(res.data);
    } catch (error) {
      console.error("Error fetching student:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading student profile...
      </div>
    );

  if (!student)
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Student not found
      </div>
    );

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString();
  };

  const Section = ({ title, children }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8">
      <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6 border-b border-gray-200 pb-3">
        {title}
      </h2>
      {children}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 md:space-y-10 px-4 sm:px-6 lg:px-0">
      {/* ================= HEADER CARD ================= */}

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl sm:text-2xl font-bold">
            {student.basicDetails?.fullName?.charAt(0)}
          </div>

          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 wrap-break-word">
              {student.basicDetails?.fullName}
            </h1>

            <p className="text-gray-500 text-xs sm:text-sm wrap-break-word">
              {student.basicDetails?.email || student.email}
            </p>

            <span className="inline-block mt-3 px-4 py-1 text-xs font-medium rounded-full bg-green-50 text-green-600">
              Success
            </span>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-gray-500 md:text-right break-all">
          <p>Student ID: {student._id}</p>
          <p>Created: {formatDate(student.createdAt)}</p>
        </div>
      </div>

      {/* ================= BASIC + ADDRESS ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Basic */}

        <Section title="Basic Information">
          <div className="space-y-3 sm:space-y-4 text-gray-700 text-sm sm:text-base">
            <p>
              <span className="text-gray-500">Mobile:</span>{" "}
              {student.basicDetails?.mobile || "-"}
            </p>

            <p>
              <span className="text-gray-500">Date of Birth:</span>{" "}
              {formatDate(student.basicDetails?.dob)}
            </p>

            <p>
              <span className="text-gray-500">Gender:</span>{" "}
              {student.basicDetails?.gender || "-"}
            </p>
          </div>
        </Section>

        {/* Address */}

        <Section title="Address Details">
          <div className="space-y-3 sm:space-y-4 text-gray-700 text-sm sm:text-base">
            <p>
              <span className="text-gray-500">State:</span>{" "}
              {student.address?.state || "-"}
            </p>

            <p>
              <span className="text-gray-500">City:</span>{" "}
              {student.address?.city || "-"}
            </p>

            <p>
              <span className="text-gray-500">Pincode:</span>{" "}
              {student.address?.pincode || "-"}
            </p>

            <p className="wrap-break-word">
              <span className="text-gray-500">Full Address:</span>{" "}
              {student.address?.fullAddress || "-"}
            </p>
          </div>
        </Section>
      </div>

      {/* ================= EDUCATION ================= */}

      <Section title="Education Details">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 text-gray-700 text-sm sm:text-base">
          {/* Graduation */}

          <div>
            <h3 className="font-semibold mb-3">Graduation</h3>
            <p>College: {student.education?.graduation?.collegeName || "-"}</p>
            <p>Year: {student.education?.graduation?.year || "-"}</p>
            <p>
              Percentage:{" "}
              {student.education?.graduation?.percentage
                ? `${student.education.graduation.percentage}%`
                : "-"}
            </p>
          </div>

          {/* Class 12 */}

          <div>
            <h3 className="font-semibold mb-3">Class 12</h3>
            <p>Board: {student.education?.class12?.board || "-"}</p>
            <p>Year: {student.education?.class12?.year || "-"}</p>
            <p>
              Percentage:{" "}
              {student.education?.class12?.percentage
                ? `${student.education.class12.percentage}%`
                : "-"}
            </p>
          </div>

          {/* Class 10 */}

          <div>
            <h3 className="font-semibold mb-3">Class 10</h3>
            <p>Board: {student.education?.class10?.board || "-"}</p>
            <p>Year: {student.education?.class10?.year || "-"}</p>
            <p>
              Percentage:{" "}
              {student.education?.class10?.percentage
                ? `${student.education.class10.percentage}%`
                : "-"}
            </p>
          </div>
        </div>
      </Section>

      {/* ================= APPLICATION DETAILS ================= */}

      <Section title="Application Details">
        {student.applications && student.applications.length > 0 ? (
          <div className="space-y-4 sm:space-y-6">
            {student.applications.map((app, index) => (
              <div
                key={index}
                className="w-full border border-gray-200 rounded-2xl p-4 sm:p-6 hover:shadow-md transition-all duration-200 bg-white"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-sm sm:text-base font-semibold text-gray-800 wrap-break-word">
                      College: {app.collegeName || "-"}
                    </p>

                    <p className="text-sm text-gray-600">
                      Course: {app.courseName || "-"}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-500">
                      Applied On: {formatDate(app.appliedAt)}
                    </p>
                  </div>

                  <div>
                    <span className="inline-block px-4 py-1 text-xs font-medium rounded-full bg-green-50 text-green-600">
                      {app.status || "Applied"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No applications found</p>
        )}
      </Section>

      {/* ================= DOCUMENTS ================= */}

      <Section title="Uploaded Documents">
        {student.documents &&
        Object.entries(student.documents).filter(([_, doc]) => doc.fileUrl)
          .length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {Object.entries(student.documents)
              .filter(([_, doc]) => doc.fileUrl)
              .map(([key, doc]) => (
                <div
                  key={key}
                  className="border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-sm transition"
                >
                  <p className="font-medium capitalize mb-2">{key}</p>

                  <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-green-50 text-green-600">
                    Success
                  </span>

                  <div>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      View Document →
                    </a>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-500">No documents uploaded</p>
        )}
      </Section>
    </div>
  );
}
