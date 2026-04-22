import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RequestDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [actionType, setActionType] = useState(null);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await fetch(`${API}/api/requests/${id}`);
        const data = await res.json();
        setRequest(data);
      } catch (error) {
        console.error("Error fetching request:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  const processRequest = async (type) => {
    try {
      setProcessing(true);

      await fetch(`${API}/api/requests/${id}/${type}`, {
        method: "PUT",
      });

      navigate("/admin/requests");
    } catch (error) {
      console.error(error);
    } finally {
      setProcessing(false);
      setActionType(null);
    }
  };

  const handleApprove = async () => {
    try {
      await axios.put(`${API}/api/requests/${id}/approve`);
      alert("Request Approved");
      navigate("/admin/requests");
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      await axios.patch(
        `${API}/api/admin/requests/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Request rejected successfully");

      navigate("/admin/requests");
    } catch (error) {
      console.error("Reject failed:", error?.response?.data || error.message);
    }
  };

  const statusBadge = (status) => {
    const normalized = (status || "").toUpperCase();

    const styles = {
      PENDING: "bg-yellow-100 text-yellow-700 border border-yellow-200",
      APPROVED: "bg-green-100 text-green-700 border border-green-200",
      REJECTED: "bg-red-100 text-red-700 border border-red-200",
    };

    return (
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${
          styles[normalized] || styles.PENDING
        }`}
      >
        {normalized}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading request details...
      </div>
    );
  }

  if (!request) {
    return <div className="text-center text-red-500">Request not found</div>;
  }

  const status = (request.status || "").toUpperCase();

  return (
    <>
      <div className="min-h-screen bg-white p-4 sm:p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow border border-gray-200">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-4 sm:p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold wrap-break-word">
                {request.role} Registration Request
              </h2>

              <p className="text-xs sm:text-sm text-gray-500">
                {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>

            {statusBadge(request.status)}
          </div>

          {/* CONTENT */}
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-sm">
            {/* PERSONAL */}
            <div className="space-y-3">
              <h3 className="font-semibold border-b border-gray-200 pb-2">
                Personal Information
              </h3>

              <Detail label="Full Name" value={request.fullName} />
              <Detail label="Email" value={request.email} />
              <Detail label="Contact Number" value={request.contactNumber} />
              <Detail label="Role" value={request.role} />
            </div>

            {/* AGENT */}
            {request.role === "Agent" && (
              <div className="space-y-3">
                <h3 className="font-semibold border-b border-gray-200 pb-2">
                  Financial Information
                </h3>

                <Detail label="PAN Number" value={request.panNumber} />
                <Detail
                  label="Bank Account"
                  value={request.bankAccountNumber}
                />
                <Detail label="IFSC Code" value={request.ifscCode} />
                <Detail label="Experience" value={request.experience} />
              </div>
            )}

            {/* COLLEGE */}
            {request.role === "College" && (
              <div className="space-y-3">
                <h3 className="font-semibold border-b border-gray-200 pb-2">
                  College Information
                </h3>

                <Detail label="State" value={request.state} />
                <Detail label="City" value={request.city} />
                <Detail label="Pincode" value={request.pincode} />
                <Detail label="Full Address" value={request.fullAddress} />
                <Detail label="Website" value={request.website} />
                <Detail
                  label="Authorized Person"
                  value={request.authorizedPerson}
                />
                <Detail label="Designation" value={request.designation} />
              </div>
            )}

            {/* ESTABLISHMENT */}
            {request.role === "Establishment" && (
              <>
                <div className="space-y-3">
                  <h3 className="font-semibold border-b border-gray-200 pb-2">
                    Establishment Information
                  </h3>

                  <Detail
                    label="Establishment Name"
                    value={request.establishmentName}
                  />
                  <Detail label="Website" value={request.website} />
                  <Detail label="Full Address" value={request.fullAddress} />
                  <Detail label="City" value={request.city} />
                  <Detail label="State" value={request.state} />
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold border-b border-gray-200 pb-2">
                    Coaching Details
                  </h3>

                  <Detail
                    label="Authorized Person"
                    value={request.authorizedPerson}
                  />
                  <Detail label="Designation" value={request.designation} />
                  <Detail
                    label="Coaching Category"
                    value={request.coachingCategory}
                  />
                  <Detail
                    label="Years of Experience"
                    value={request.yearsOfExperience}
                  />

                  <FileLink
                    label="GST / Business Certificate"
                    file={request.businessCertificate}
                  />
                  <FileLink
                    label="Authorized Person ID Proof"
                    file={request.idProof}
                  />
                </div>
              </>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 mt-6">
            {/* Only Reject for College & Establishment */}

            {(request.role === "College" ||
              request.role === "Establishment") && (
              <button
                onClick={handleReject}
                className="bg-red-600 text-white px-6 py-2 rounded-lg"
              >
                Reject
              </button>
            )}

            {/* Other roles keep approve */}

            {request.role !== "College" && request.role !== "Establishment" && (
              <>
                <button
                  onClick={handleApprove}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg"
                >
                  Approve
                </button>

                <button
                  onClick={handleReject}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg"
                >
                  Reject
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {actionType && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-3">Confirm {actionType}</h3>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to {actionType} this request?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setActionType(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => processRequest(actionType)}
                className={`px-4 py-2 text-white rounded ${
                  actionType === "approve" ? "bg-green-600" : "bg-red-600"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium wrap-break-word">{value || "-"}</span>
    </div>
  );
}

function FileLink({ label, file }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
      <span className="text-gray-500">{label}</span>

      {file ? (
        <a
          href={file}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline break-all"
        >
          View File
        </a>
      ) : (
        "-"
      )}
    </div>
  );
}
