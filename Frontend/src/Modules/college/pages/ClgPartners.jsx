import { useState } from "react";
import CollegeLayout from "../../../layout/CollegeLayout";

export default function ClgPartners() {
  const [activeTab, setActiveTab] = useState("PENDING");
  const [selectedPartner, setSelectedPartner] = useState(null);

  /* ================= DUMMY DATA ================= */

  const [partners, setPartners] = useState([
    {
      _id: "1",
      status: "PENDING",
      agent: {
        fullName: "Ahmed Agency",
        email: "ahmed@gmail.com",
        mobile: "9876543210",
      },
    },
    {
      _id: "2",
      status: "APPROVED",
      agent: {
        fullName: "Bright Future Consultancy",
        email: "bright@gmail.com",
        mobile: "9123456789",
      },
    },
  ]);

  const updateStatus = (id, status) => {
    setPartners((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, status } : p
      )
    );
    setSelectedPartner(null);
  };

  const filtered = partners.filter(
    (p) => p.status === activeTab
  );

  return (
    <CollegeLayout>
      <div className="p-6 bg-gray-100 min-h-screen">

        <h1 className="text-2xl font-semibold mb-6">
          Partner Management
        </h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {["PENDING", "APPROVED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl transition ${
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-white border hover:bg-gray-50"
              }`}
            >
              {tab === "PENDING"
                ? "Requests"
                : "Approved"}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow text-center text-gray-500">
            No partners found.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((partner) => (
              <div
                key={partner._id}
                className="bg-white p-5 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition"
              >
                <div>
                  <p className="font-semibold text-lg">
                    {partner.agent.fullName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {partner.agent.email}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setSelectedPartner(partner)
                  }
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ================= MODAL ================= */}
        {selectedPartner && (
          <PartnerModal
            partner={selectedPartner}
            onClose={() => setSelectedPartner(null)}
            onApprove={() =>
              updateStatus(selectedPartner._id, "APPROVED")
            }
          />
        )}
      </div>
    </CollegeLayout>
  );
}

/* ================= MODAL ================= */

function PartnerModal({ partner, onClose, onApprove }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-xl animate-fadeIn">

        <h2 className="text-xl font-semibold mb-6">
          Partner Details
        </h2>

        <div className="space-y-4">
          <Detail label="Agency Name" value={partner.agent.fullName} />
          <Detail label="Email" value={partner.agent.email} />
          <Detail label="Mobile" value={partner.agent.mobile} />
          <Detail label="Current Status" value={partner.status} />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-xl"
          >
            Close
          </button>

          {partner.status === "PENDING" && (
            <button
              onClick={onApprove}
              className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              Approve
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}