import { useState } from "react";
import CollegeLayout from "../../../layout/CollegeLayout";

export default function ClgStudentApplications() {
  const [selectedApp, setSelectedApp] = useState(null);

  const dummyApplications = [
    {
      id: 1,
      student: "Mahir Khan",
      mobile: "9876543210",
      course: "B.Tech",
      city: "Ahmedabad",
      source: "AGENT",
      agent: "Ahmed Agency",
      status: "APPLIED",
    },
    {
      id: 2,
      student: "Rahul Patel",
      mobile: "9123456789",
      course: "BCA",
      city: "Surat",
      source: "SELF",
      agent: null,
      status: "APPLIED",
    },
  ];

  return (
    <CollegeLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6">
          Student Applications
        </h1>

        <div className="space-y-4">
          {dummyApplications.map((app) => (
            <div
              key={app.id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{app.student}</p>
                <p className="text-sm text-gray-500">
                  {app.course}
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded-full text-white ${
                    app.source === "AGENT"
                      ? "bg-purple-600"
                      : "bg-blue-600"
                  }`}
                >
                  {app.source}
                </span>
              </div>

              <button
                onClick={() => setSelectedApp(app)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl"
              >
                View
              </button>
            </div>
          ))}
        </div>

        {/* ================= VIEW MODAL ================= */}
        {selectedApp && (
          <ViewModal
            application={selectedApp}
            onClose={() => setSelectedApp(null)}
          />
        )}
      </div>
    </CollegeLayout>
  );
}

/* ================= MODAL COMPONENT ================= */

function ViewModal({ application, onClose }) {
  const handleApprove = () => {
    console.log("Approved:", application.id);
    onClose();
  };

  const handleReject = () => {
    console.log("Rejected:", application.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-8 shadow-xl">

        <h2 className="text-xl font-semibold mb-6">
          Application Details
        </h2>

        <div className="space-y-3">
          <Detail label="Student Name" value={application.student} />
          <Detail label="Mobile" value={application.mobile} />
          <Detail label="City" value={application.city} />
          <Detail label="Course" value={application.course} />
          <Detail label="Source" value={application.source} />

          {application.source === "AGENT" && (
            <Detail label="Agent Name" value={application.agent} />
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-xl"
          >
            Close
          </button>

          <button
            onClick={handleReject}
            className="px-4 py-2 bg-red-500 text-white rounded-xl"
          >
            Reject
          </button>

          <button
            onClick={handleApprove}
            className="px-4 py-2 bg-green-600 text-white rounded-xl"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE DETAIL ================= */

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}