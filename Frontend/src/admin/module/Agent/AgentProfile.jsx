import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AgentProfile() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token || token === "null" || token === "undefined") {
          console.error("No token found. Please login again.");
          return;
        }

        const res = await axios.get(`http://localhost:5000/api/agents/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setAgent(res.data);
      } catch (err) {
        console.error(
          "Error fetching agent:",
          err?.response?.data || err?.message || err,
        );
      }
    };

    fetchAgent();
  }, [id]);

  if (!agent)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading agent profile...
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
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-gray-200 shadow-sm bg-indigo-50 flex items-center justify-center">
            {agent.profilePhoto ? (
              <img
                src={agent.profilePhoto}
                alt="Agent"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-indigo-600 font-bold text-xl sm:text-2xl">
                {agent.name?.charAt(0) || "A"}
              </span>
            )}
          </div>

          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
              {agent.name}
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 mt-1 wrap-break-word">
              {agent.email}
            </p>

            <p className="text-xs sm:text-sm text-gray-400 mt-1 break-all">
              Agent ID: {agent._id}
            </p>
          </div>
        </div>

        <span
          className={`self-start md:self-auto px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full border ${
            agent.status === "Active"
              ? "bg-green-100 text-green-700 border-green-200"
              : agent.status === "Suspended"
                ? "bg-red-100 text-red-700 border-red-200"
                : "bg-yellow-100 text-yellow-700 border-yellow-200"
          }`}
        >
          {agent.status}
        </span>
      </div>

      {/* Basic Details */}
      <Section title="Basic Details">
        <Field label="Full Name" value={agent.name} />
        <Field label="Email" value={agent.email} />
        <Field label="Mobile" value={agent.mobile} />
        <Field label="Agency Name" value={agent.agencyName} />
        <Field
          label="Date of Birth"
          value={agent.dob ? new Date(agent.dob).toLocaleDateString() : "-"}
        />
        <Field label="Gender" value={agent.gender} />
        <Field label="Agent Type" value={agent.agentType} />
      </Section>

      {/* Address */}
      <Section title="Address Information">
        <Field label="State" value={agent.state} />
        <Field label="District" value={agent.district} />
        <Field label="City" value={agent.city} />
        <Field label="Pincode" value={agent.pincode} />
        <Field label="Full Address" value={agent.fullAddress} />
      </Section>

      {/* Bank Details */}
      <Section title="Bank Details">
        <Field label="Account Holder Name" value={agent.accountHolderName} />
        <Field label="Bank Name" value={agent.bankName} />
        <Field label="Account Number" value={agent.accountNumber} />
        <Field label="IFSC Code" value={agent.ifscCode} />
      </Section>

      {/* Performance */}
      <Section title="Performance & Financial Overview">
        <Field
          label="Commission Rate"
          value={`${agent.commissionRate || 0}%`}
        />
        <Field label="Wallet Balance" value={`₹${agent.walletBalance || 0}`} />
        <Field label="Total Students" value={agent.totalStudents || 0} />
        <Field label="Total Revenue" value={`₹${agent.totalRevenue || 0}`} />
        <Field label="Total Approved" value={agent.totalApproved || 0} />
      </Section>
    </div>
  );
}
