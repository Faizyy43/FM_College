import { ArrowLeft, CheckCircle, Clock, XCircle } from "lucide-react";

const statusConfig = {
  Submitted: {
    color: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
  Approved: {
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  Rejected: {
    color: "bg-red-100 text-red-700",
    icon: XCircle,
  },
};

const CollegeDetails = ({ application, onBack }) => {
  const StatusIcon = statusConfig[application.status]?.icon || Clock;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* BACK */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
      >
        <ArrowLeft size={16} />
        Back to Applied Colleges
      </button>

      {/* MAIN CARD */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {application.college}
            </h1>
            <p className="mt-1 text-gray-600">Course: {application.course}</p>
          </div>

          {/* STATUS BADGE */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              statusConfig[application.status]?.color
            }`}
          >
            <StatusIcon size={16} />
            {application.status}
          </div>
        </div>

        {/* FEES */}
        {application.fees && (
          <div className="mt-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-medium">
              ₹ {application.fees} / year
            </span>
          </div>
        )}

        {/* TIMELINE */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">
            Application Progress
          </h3>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle size={18} />
              Applied
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={18} />
              Review
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              <CheckCircle size={18} />
              Decision
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-10 flex flex-wrap gap-3">
          {/* APPLY AGAIN */}
          <button
            onClick={() => alert("Apply Again logic will be added later")}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Apply Again
          </button>

          {/* WITHDRAW */}
          <button
            onClick={() => alert("Withdraw logic will be added later")}
            className="px-5 py-2.5 rounded-lg border border-red-300 text-red-600 text-sm font-medium hover:bg-red-50 transition"
          >
            Withdraw Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;
