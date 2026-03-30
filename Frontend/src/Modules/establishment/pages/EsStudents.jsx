import { useEffect, useState } from "react";
import { FiPhone, FiMail } from "react-icons/fi";
import EsCard from "../../establishment/EsCard";
import EstablishmentLayout from "../../../layout/EstablishmentLayout";
import { fetchStudents } from "../services/esStudent.api";

export default function EsStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents()
      .then((res) => setStudents(res.data || []))
      .catch(() => alert("Failed to load students"));
  }, []);

  return (
    <EstablishmentLayout>
      <EsCard title="Student Leads" subtitle="Incoming enquiries">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {students.map((s) => (
            <div
              key={s._id}
              className="
                bg-white/80 backdrop-blur-xl 
                rounded-3xl p-7
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                border border-gray-300
              "
            >
              {/* HEADER */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[15px] font-semibold text-gray-800 tracking-tight">
                    {s.firstName} {s.lastName}
                  </h3>

                  {s.courseId?.title && (
                    <div className="mt-0.5">
                      <p className="text-sm text-gray-600 font-medium">
                        {s.courseId.title}
                      </p>

                      <p className="text-xs text-gray-500">
                        Fees: ₹ {s.courseId.fees?.toLocaleString() || 0}
                      </p>
                    </div>
                  )}
                </div>

                <span
                  className={`
                    px-4 py-1 rounded-full text-[11px] font-medium tracking-wide
                    ${
                      s.financeStatus === "PENDING"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-green-50 text-green-700"
                    }
                  `}
                >
                  {s.financeStatus}
                </span>
              </div>

              {/* CONTACT */}
              <div className="mt-5 space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                    <FiPhone className="text-gray-500" />
                  </div>
                  <span>{s.phone || "-"}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                    <FiMail className="text-gray-500" />
                  </div>
                  <span>{s.email || "-"}</span>
                </div>
              </div>

              <div className="my-5 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

              {/* INSTALLMENT */}
              <div className="text-sm">
                <p className="text-gray-700">
                  <span className="font-medium">Installment:</span>{" "}
                  <span
                    className={
                      s.installmentAllowed
                        ? "text-green-600 font-semibold"
                        : "text-gray-500"
                    }
                  >
                    {s.installmentAllowed ? "Yes" : "No"}
                  </span>
                </p>

                {s.installmentAllowed && (
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {s.installmentDetails}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </EsCard>
    </EstablishmentLayout>
  );
}
