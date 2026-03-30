// import { useEffect, useState } from "react";
// import { FiCheckCircle, FiClock } from "react-icons/fi";
// import { IoIosWallet } from "react-icons/io";

// import { fetchStudents } from "../services/esStudent.api";
// import { updateStudentPayment } from "../services/esPayment.api";
// import EstablishmentLayout from "../../../layout/EstablishmentLayout";

// export default function EsPayment() {
//   const [viewStudent, setViewStudent] = useState(null);
//   const [editStudent, setEditStudent] = useState(null);
//   const [students, setStudents] = useState([]);
//   const [editForm, setEditForm] = useState(null);
//   const [summary, setSummary] = useState({
//     totalCollected: 0,
//     pendingCollection: 0,
//     availableBalance: 0,
//   });

//   /* ================= LOAD STUDENTS ================= */
//   const loadStudents = async () => {
//     try {
//       const res = await fetchStudents();

//       let totalCollected = 0;
//       let pendingCollection = 0;

//       const mapped = (res.data || []).map((s) => {
//         const total = s.totalFees || s.courseId?.fees || 0;
//         const paid = s.paidFees || 0;
//         const remaining = total - paid;

//         totalCollected += paid;
//         pendingCollection += remaining;

//         return {
//           _id: s._id,
//           name: `${s.firstName} ${s.lastName}`,
//           email: s.email,
//           phone: s.phone,
//           course: s.courseId?.title || "-",
//           totalFees: total,
//           paid,
//           remaining,
//           financeStatus: remaining > 0 ? "PENDING" : "FEES_COMPLETED",
//         };
//       });

//       setStudents(mapped);
//       setSummary({
//         totalCollected,
//         pendingCollection,
//         availableBalance: totalCollected,
//       });
//     } catch (err) {
//       console.error("Payment fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     loadStudents();
//   }, []);

//   return (
//     <EstablishmentLayout>
//       <div className="mb-8">
//         <h1 className="text-2xl font-semibold text-slate-800">
//           Payments & Installments
//         </h1>
//         <p className="text-slate-500 text-sm mt-1">
//           Student fee management, installments & collections
//         </p>
//       </div>

//       {/* SUMMARY */}
//       <div className="grid md:grid-cols-3 gap-6 mb-12">
//         <StatCard
//           title="Available Balance"
//           value={`₹ ${summary.availableBalance.toLocaleString()}`}
//           icon={<IoIosWallet />}
//         />
//         <StatCard
//           title="Pending Collection"
//           value={`₹ ${summary.pendingCollection.toLocaleString()}`}
//           icon={<FiClock />}
//           yellow
//         />
//         <StatCard
//           title="Total Collected"
//           value={`₹ ${summary.totalCollected.toLocaleString()}`}
//           icon={<FiCheckCircle />}
//           green
//         />
//       </div>

//       <StudentFeeTable
//         students={students}
//         onView={setViewStudent}
//         onEdit={(s) => {
//           setEditStudent(s);
//           setEditForm({ totalFees: s.totalFees, paidFees: s.paid });
//         }}
//       />

//       {/* VIEW PANEL */}
//       {viewStudent && (
//         <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
//           <div className="w-full sm:w-[440px] h-full bg-white rounded-l-3xl shadow-xl p-7 overflow-y-auto">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-lg font-semibold text-slate-800">
//                 Student Profile
//               </h3>
//               <button onClick={() => setViewStudent(null)}>✕</button>
//             </div>

//             <div className="space-y-4 text-sm">
//               <Detail label="Name" value={viewStudent.name} />
//               <Detail label="Email" value={viewStudent.email} />
//               <Detail label="Phone" value={viewStudent.phone} />
//               <Detail label="Course" value={viewStudent.course} />
//               <Detail label="Total Fees" value={`₹ ${viewStudent.totalFees}`} />
//               <Detail label="Paid" value={`₹ ${viewStudent.paid}`} />
//               <Detail label="Remaining" value={`₹ ${viewStudent.remaining}`} highlight />
//               <Detail label="Status" value={viewStudent.financeStatus} badge />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* EDIT PANEL */}
//       {editStudent && editForm && (
//         <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
//           <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-7">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-lg font-semibold text-slate-800">
//                 Edit Payment Details
//               </h3>
//               <button onClick={() => setEditStudent(null)}>✕</button>
//             </div>

//             <div className="grid grid-cols-2 gap-5 text-sm">
//               <Input label="Student Name" value={editStudent.name} disabled />
//               <Input label="Phone" value={editStudent.phone} disabled />

//               <Input
//                 label="Total Fees"
//                 value={editForm.totalFees}
//                 onChange={(e) =>
//                   setEditForm({ ...editForm, totalFees: Number(e.target.value) })
//                 }
//               />
//               <Input
//                 label="Paid Amount"
//                 value={editForm.paidFees}
//                 onChange={(e) =>
//                   setEditForm({ ...editForm, paidFees: Number(e.target.value) })
//                 }
//               />
//             </div>

//             <div className="mt-8 flex justify-end gap-3">
//               <button onClick={() => setEditStudent(null)}>Cancel</button>

//               <button
//                 onClick={async () => {
//                   try {
//                     await updateStudentPayment(editStudent._id, editForm);
//                     alert("Payment Updated Successfully ✅");
//                     setEditStudent(null);
//                     loadStudents();
//                   } catch {
//                     alert("Payment Update Failed ❌");
//                   }
//                 }}
//                 className="bg-blue-600 text-white px-5 py-2.5 rounded-xl"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </EstablishmentLayout>
//   );
// }

// /* ---------- UI COMPONENTS (UNCHANGED) ---------- */

// const StatCard = ({ title, value, icon, green, yellow }) => (
//   <div className="bg-white rounded-3xl p-6 shadow-md flex items-center gap-4">
//     {icon}
//     <div>
//       <p className="text-slate-500 text-sm">{title}</p>
//       <p className="text-xl font-semibold text-slate-800">{value}</p>
//     </div>
//   </div>
// );

// const Detail = ({ label, value, highlight, badge }) => (
//   <div className="flex justify-between items-center">
//     <span className="text-slate-500">{label}</span>
//     {badge ? (
//       <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
//         {value}
//       </span>
//     ) : (
//       <span className={`font-medium ${highlight ? "text-rose-600" : ""}`}>
//         {value}
//       </span>
//     )}
//   </div>
// );

// const Input = ({ label, value, onChange, disabled }) => (
//   <div className="flex flex-col gap-1.5">
//     <label className="text-xs text-slate-500">{label}</label>
//     <input
//       value={value}
//       disabled={disabled}
//       onChange={onChange}
//       className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm"
//     />
//   </div>
// );


////////////////////////////////////////////////




// import { useEffect, useState } from "react";
// import PaymentHistory from "./PaymentHistory";
// import InstallmentSection from "./InstallmentSection";
// import ReceiptSection from "./ReceiptSection";
// import { FiCheckCircle, FiClock } from "react-icons/fi";
// import { IoIosWallet } from "react-icons/io";
// import EstablishmentLayout from "../../layouts/EstablishmentLayout";
// import { fetchStudents } from "../../services/student.api";
// import { updateStudentPayment } from "../../services/payment.api";
// import { addPayment } from "../../services/payment.api";

// export default function EsPayment() {
//   const [viewStudent, setViewStudent] = useState(null);
//   const [editStudent, setEditStudent] = useState(null);
//   const [students, setStudents] = useState([]);
//   const [editForm, setEditForm] = useState(null);
//   const [installment, setInstallment] = useState("");
//   const [summary, setSummary] = useState({
//     totalCollected: 0,
//     pendingCollection: 0,
//     availableBalance: 0,
//   });

//   const EST_ID = "69785d18b64e410eec88ac2e"; // temp

//   /* ================= LOAD STUDENTS ================= */
//   useEffect(() => {
//     fetchStudents(EST_ID)
//       .then((res) => {
//         let totalCollected = 0;
//         let pendingCollection = 0;

//         const mapped = res.data.map((s) => {
//           const total = s.totalFees || s.courseId?.fees || 0;
//           const paid = s.paidFees || 0;
//           const remaining = total - paid;

//           totalCollected += paid;
//           pendingCollection += remaining;

//           return {
//             _id: s._id,
//             name: `${s.firstName} ${s.lastName}`,
//             email: s.email,
//             phone: s.phone,
//             course: s.courseId?.title || "-",
//             totalFees: total,
//             paid: paid,
//             remaining,
//             financeStatus: remaining > 0 ? "PENDING" : "FEES_COMPLETED",
//           };
//         });

//         setStudents(mapped);

//         setSummary({
//           totalCollected,
//           pendingCollection,
//           availableBalance: totalCollected,
//         });
//       })

//       .catch((err) => console.error("Payment fetch error:", err));
//   }, []);

//   return (
//     <EstablishmentLayout>
//       {/* HEADER */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-semibold text-slate-800">
//           Payments & Installments
//         </h1>
//         <p className="text-slate-500 text-sm mt-1">
//           Student fee management, installments & collections
//         </p>
//       </div>

//       {/* SUMMARY */}
//       <div className="grid md:grid-cols-3 gap-6 mb-12">
//         <StatCard
//           title="Available Balance"
//           value={`₹ ${summary.availableBalance.toLocaleString()}`}
//           icon={<IoIosWallet />}
//           blue
//         />

//         <StatCard
//           title="Pending Collection"
//           value={`₹ ${summary.pendingCollection.toLocaleString()}`}
//           icon={<FiClock />}
//           yellow
//         />

//         <StatCard
//           title="Total Collected"
//           value={`₹ ${summary.totalCollected.toLocaleString()}`}
//           icon={<FiCheckCircle />}
//           green
//         />
//       </div>

//       {/* TABLE */}
//       <StudentFeeTable
//         students={students}
//         onView={setViewStudent}
//         onEdit={(s) => {
//           setEditStudent(s);
//           setEditForm({
//             totalFees: s.totalFees,
//             paidFees: s.paid,
//           });
//         }}
//       />

//       {/* ================= VIEW ================= */}
//       {viewStudent && (
//         <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
//           <div className="w-full sm:w-[440px] h-full bg-white rounded-l-3xl shadow-xl p-7 overflow-y-auto">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-lg font-semibold text-slate-800">
//                 Student Profile
//               </h3>
//               <button
//                 onClick={() => setViewStudent(null)}
//                 className="w-9 h-9 rounded-full bg-slate-100 text-slate-600"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="space-y-4 text-sm">
//               <Detail label="Name" value={viewStudent.name} />
//               <Detail label="Email" value={viewStudent.email} />
//               <Detail label="Phone" value={viewStudent.phone} />
//               <Detail label="Course" value={viewStudent.course} />
//               <Detail label="Total Fees" value={`₹ ${viewStudent.totalFees}`} />
//               <InstallmentSection student={viewStudent} />

//               <Detail label="Paid" value={`₹ ${viewStudent.paid}`} />
//               <Detail
//                 label="Remaining"
//                 value={`₹ ${viewStudent.remaining}`}
//                 highlight
//               />
//               <Detail label="Status" value={viewStudent.financeStatus} badge />
//               <ReceiptSection student={viewStudent} />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ================= EDIT ================= */}
//       {editStudent && editForm && (
//         <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
//           <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-7">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-lg font-semibold text-slate-800">
//                 Edit Payment Details
//               </h3>
//               <button
//                 onClick={() => setEditStudent(null)}
//                 className="w-9 h-9 rounded-full bg-slate-100 text-slate-600"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="grid grid-cols-2 gap-5 text-sm">
//               <Input label="Student Name" value={editStudent.name} disabled />
//               <Input label="Phone" value={editStudent.phone} disabled />

//               <Input
//                 label="Total Fees"
//                 value={editForm.totalFees}
//                 onChange={(e) =>
//                   setEditForm({
//                     ...editForm,
//                     totalFees: Number(e.target.value),
//                   })
//                 }
//               />

//               <Input
//                 label="Paid Amount"
//                 value={editForm.paidFees}
//                 onChange={(e) =>
//                   setEditForm({
//                     ...editForm,
//                     paidFees: Number(e.target.value),
//                   })
//                 }
//               />
//               <Input
//                 label="Add Installment Amount"
//                 value={installment}
//                 onChange={(e) => setInstallment(e.target.value)}
//               />
//             </div>

//             <div className="mt-8 flex justify-end gap-3">
//               <button
//                 onClick={() => setEditStudent(null)}
//                 className="px-5 py-2.5 rounded-xl text-sm bg-slate-100 text-slate-700"
//               >
//                 Cancel
//               </button>

//               {/* 🔥 REAL SAVE */}
//               <button
//                 onClick={async () => {
//                   try {
//                     if (!installment || Number(installment) <= 0) {
//                       alert("Please enter installment amount");
//                       return;
//                     }

//                     // 1️⃣ Create payment (THIS updates paidFees internally)
//                     await addPayment(editStudent._id, {
//                       amount: Number(installment),
//                       method: "Cash",
//                     });

//                     // 2️⃣ Update ONLY totalFees (NOT paidFees)
//                     await updateStudentPayment(editStudent._id, {
//                       totalFees: editForm.totalFees,
//                     });

//                     alert("Payment Added Successfully ✅");

//                     setEditStudent(null);
//                     setInstallment("");

//                     // 3️⃣ Refresh students
//                     const res = await fetchStudents(EST_ID);
//                     setStudents(
//                       res.data.map((s) => {
//                         const total = s.totalFees || s.courseId?.fees || 0;
//                         const paid = s.paidFees || 0;
//                         const remaining = total - paid;

//                         return {
//                           _id: s._id,
//                           name: `${s.firstName} ${s.lastName}`,
//                           email: s.email,
//                           phone: s.phone,
//                           course: s.courseId?.title || "-",
//                           totalFees: total,
//                           paid,
//                           remaining,
//                           financeStatus:
//                             remaining > 0 ? "PENDING" : "FEES_COMPLETED",
//                         };
//                       }),
//                     );
//                   } catch (err) {
//                     console.error(err);
//                     alert("Payment Failed ❌");
//                   }
//                 }}
//                 className="px-5 py-2.5 rounded-xl text-sm 
//              bg-linear-to-r from-indigo-600 to-blue-600 
//              text-white font-semibold shadow-lg"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </EstablishmentLayout>
//   );
// }

// /* ================= COMPONENTS ================= */

// const StatCard = ({ title, value, icon, green, yellow }) => (
//   <div className="bg-white rounded-3xl p-6 shadow-md flex items-center gap-4">
//     {icon && (
//       <div
//         className={`p-3 rounded-xl ${
//           green
//             ? "bg-emerald-50 text-emerald-600"
//             : yellow
//               ? "bg-amber-50 text-amber-600"
//               : "bg-indigo-50 text-indigo-600"
//         }`}
//       >
//         {icon}
//       </div>
//     )}
//     <div>
//       <p className="text-slate-500 text-sm">{title}</p>
//       <p className="text-xl font-semibold text-slate-800">{value}</p>
//     </div>
//   </div>
// );

// /* ================= RESPONSIVE STUDENT PAYMENT LEDGER ================= */

// const StudentFeeTable = ({ students, onView, onEdit }) => (
//   <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
//     <div className="px-7 py-6 border-b border-slate-100">
//       <h2 className="text-lg font-semibold text-slate-800">
//         Student Payment Ledger
//       </h2>
//     </div>

//     {/* Desktop Table */}
//     <div className="hidden md:block ">
//       <table className="w-full text-xs">
//         <thead>
//           <tr className="bg-slate-50 text-slate-600 text-xs uppercase">
//             <th className="px-6 py-4 text-left">Name</th>
//             <th className="px-6 py-4 text-left">Email</th>
//             <th className="px-6 py-4 text-left">Phone</th>
//             <th className="px-6 py-4 text-left">Course</th>
//             <th className="px-6 py-4 text-left">Total</th>
//             <th className="px-6 py-4 text-left">Paid</th>
//             <th className="px-6 py-4 text-left">Remaining</th>
//             <th className="px-6 py-4 text-left">Status</th>
//             <th className="px-6 py-4 text-left">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {students.map((s) => (
//             <tr key={s._id} className="border-t border-slate-100">
//               <td className="px-6 py-4 font-medium">{s.name}</td>
//               <td className="px-6 py-4">{s.email}</td>
//               <td className="px-6 py-4">{s.phone}</td>
//               <td className="px-6 py-4">{s.course}</td>
//               <td className="px-6 py-4">₹ {s.totalFees}</td>
//               <td className="px-6 py-4 text-emerald-600">₹ {s.paid}</td>
//               <td className="px-6 py-4 text-rose-600">₹ {s.remaining}</td>
//               <td className="px-6 py-4">
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                     s.financeStatus === "PENDING"
//                       ? "bg-yellow-100 text-yellow-700"
//                       : "bg-emerald-100 text-emerald-700"
//                   }`}
//                 >
//                   {s.financeStatus}
//                 </span>
//               </td>
//               <td className="px-6 py-4">
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => onView(s)}
//                     className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-linear-to-r
//                      from-indigo-600 to-blue-600 text-white"
//                   >
//                     View
//                   </button>

//                   <button
//                     onClick={() => onEdit(s)}
//                     className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-400"
//                   >
//                     Edit
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>

//     {/* Mobile Cards */}
//     <div className="md:hidden p-4 space-y-4">
//       {students.map((s) => (
//         <div
//           key={s._id}
//           className="border border-slate-200 rounded-2xl p-4 shadow-sm"
//         >
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="font-semibold text-slate-800">{s.name}</h3>
//             <span
//               className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
//                 s.financeStatus === "PENDING"
//                   ? "bg-yellow-100 text-yellow-700"
//                   : "bg-emerald-100 text-emerald-700"
//               }`}
//             >
//               {s.financeStatus}
//             </span>
//           </div>

//           <div className="text-xs text-slate-500 space-y-1">
//             <p>
//               <b>Email:</b> {s.email}
//             </p>
//             <p>
//               <b>Phone:</b> {s.phone}
//             </p>
//             <p>
//               <b>Course:</b> {s.course}
//             </p>
//           </div>

//           <div className="grid grid-cols-3 gap-2 text-xs mt-3">
//             <div className="bg-slate-50 p-2 rounded-lg text-center">
//               <p className="text-slate-500">Total</p>
//               <p className="font-semibold">₹ {s.totalFees}</p>
//             </div>
//             <div className="bg-emerald-50 p-2 rounded-lg text-center">
//               <p className="text-slate-500">Paid</p>
//               <p className="font-semibold text-emerald-600">₹ {s.paid}</p>
//             </div>
//             <div className="bg-rose-50 p-2 rounded-lg text-center">
//               <p className="text-slate-500">Remaining</p>
//               <p className="font-semibold text-rose-600">₹ {s.remaining}</p>
//             </div>
//           </div>

//           <div className="flex gap-2 mt-4">
//             <button
//               onClick={() => onView(s)}
//               className="flex-1 py-2 rounded-xl text-xs font-semibold bg-linear-to-r
//                from-indigo-600 to-blue-600 text-white"
//             >
//               View
//             </button>

//             <button
//               onClick={() => onEdit(s)}
//               className="flex-1 py-2 rounded-xl text-xs font-semibold bg-amber-400"
//             >
//               Edit
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// const Detail = ({ label, value, highlight, badge }) => (
//   <div className="flex justify-between items-center">
//     <span className="text-slate-500">{label}</span>
//     {badge ? (
//       <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
//         {value}
//       </span>
//     ) : (
//       <span className={`font-medium ${highlight ? "text-rose-600" : ""}`}>
//         {value}
//       </span>
//     )}
//   </div>
// );

// const Input = ({ label, value, onChange, disabled }) => (
//   <div className="flex flex-col gap-1.5">
//     <label className="text-xs text-slate-500">{label}</label>
//     <input
//       value={value}
//       disabled={disabled}
//       onChange={onChange}
//       className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm 
//       outline-none focus:ring-2 focus:ring-indigo-200"
//     />
//   </div>
// );



/////////////////////////////////////////////////////////////


// import { useEffect, useState } from "react";
// import { FiCheckCircle, FiClock } from "react-icons/fi";
// import { IoIosWallet } from "react-icons/io";
// import EstablishmentLayout from "../../../layout/EstablishmentLayout";
// import { fetchStudents } from "../services/esStudent.api";
// import { updateStudentPayment, addPayment } from "../services/esPayment.api";

// export default function EsPayment() {
//   const [viewStudent, setViewStudent] = useState(null);
//   const [editStudent, setEditStudent] = useState(null);
//   const [students, setStudents] = useState([]);
//   const [editForm, setEditForm] = useState(null);
//   const [installment, setInstallment] = useState("");
//   const [summary, setSummary] = useState({
//     totalCollected: 0,
//     pendingCollection: 0,
//     availableBalance: 0,
//   });

//   /* ================= LOAD STUDENTS ================= */
//   const loadStudents = async () => {
//     try {
//       const res = await fetchStudents();

//       let totalCollected = 0;
//       let pendingCollection = 0;

//       const mapped = res.data.map((s) => {
//         const total = s.totalFees || 0;
//         const paid = s.paidFees || 0;
//         const remaining = total - paid;

//         totalCollected += paid;
//         pendingCollection += remaining;

//         return {
//           _id: s._id,
//           name: `${s.firstName} ${s.lastName}`,
//           email: s.email,
//           phone: s.phone,
//           course: s.courseId?.title || "-",
//           totalFees: total,
//           paid,
//           remaining,
//           financeStatus:
//             remaining > 0 ? "PENDING" : "FEES_COMPLETED",
//         };
//       });

//       setStudents(mapped);

//       setSummary({
//         totalCollected,
//         pendingCollection,
//         availableBalance: totalCollected,
//       });
//     } catch (err) {
//       console.error("Payment fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     loadStudents();
//   }, []);

//   /* ================= SAVE CHANGES ================= */
//   const handleSave = async () => {
//     try {
//       if (!installment || Number(installment) <= 0) {
//         alert("Please enter valid installment amount");
//         return;
//       }

//       await addPayment(editStudent._id, {
//         amount: Number(installment),
//         method: "Cash",
//       });

//       await updateStudentPayment(editStudent._id, {
//         totalFees: editForm.totalFees,
//       });

//       alert("Payment Added Successfully ✅");

//       setEditStudent(null);
//       setInstallment("");

//       await loadStudents();
//     } catch (err) {
//       console.error(err);
//       alert("Payment Failed ❌");
//     }
//   };

//   return (
//     <EstablishmentLayout>
//       <div className="mb-8">
//         <h1 className="text-2xl font-semibold text-slate-800">
//           Payments & Installments
//         </h1>
//       </div>

//       {/* SUMMARY */}
//       <div className="grid md:grid-cols-3 gap-6 mb-12">
//         <StatCard
//           title="Available Balance"
//           value={`₹ ${summary.availableBalance.toLocaleString()}`}
//           icon={<IoIosWallet />}
//         />
//         <StatCard
//           title="Pending Collection"
//           value={`₹ ${summary.pendingCollection.toLocaleString()}`}
//           icon={<FiClock />}
//         />
//         <StatCard
//           title="Total Collected"
//           value={`₹ ${summary.totalCollected.toLocaleString()}`}
//           icon={<FiCheckCircle />}
//         />
//       </div>

//       {/* TABLE */}
//       <StudentFeeTable
//         students={students}
//         onView={setViewStudent}
//         onEdit={(s) => {
//           setEditStudent(s);
//           setEditForm({
//             totalFees: s.totalFees,
//           });
//         }}
//       />

//       {/* EDIT MODAL */}
//       {editStudent && editForm && (
//         <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
//           <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-7">
//             <h3 className="text-lg font-semibold mb-4">
//               Edit Payment
//             </h3>

//             <div className="space-y-4">
//               <Input label="Student Name" value={editStudent.name} disabled />
//               <Input
//                 label="Total Fees"
//                 value={editForm.totalFees}
//                 onChange={(e) =>
//                   setEditForm({
//                     ...editForm,
//                     totalFees: Number(e.target.value),
//                   })
//                 }
//               />
//               <Input
//                 label="Add Installment"
//                 value={installment}
//                 onChange={(e) => setInstallment(e.target.value)}
//               />
//             </div>

//             <div className="mt-6 flex justify-end gap-3">
//               <button
//                 onClick={() => setEditStudent(null)}
//                 className="px-5 py-2 rounded-xl bg-gray-100"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleSave}
//                 className="px-5 py-2 rounded-xl bg-indigo-600 text-white"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </EstablishmentLayout>
//   );
// }

// /* ================= COMPONENTS ================= */

// const StatCard = ({ title, value, icon }) => (
//   <div className="bg-white rounded-3xl p-6 shadow-md flex items-center gap-4">
//     <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
//       {icon}
//     </div>
//     <div>
//       <p className="text-slate-500 text-sm">{title}</p>
//       <p className="text-xl font-semibold text-slate-800">{value}</p>
//     </div>
//   </div>
// );

// const Input = ({ label, value, onChange, disabled }) => (
//   <div className="flex flex-col gap-1.5">
//     <label className="text-xs text-slate-500">{label}</label>
//     <input
//       value={value}
//       disabled={disabled}
//       onChange={onChange}
//       className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm"
//     />
//   </div>
// );


///////////////////////////////////////////////////////////////




import { useEffect, useState } from "react";
import EsInstallmentSection from "./EsInstallmentSection";
import EsReceiptSection from "../pages/EsReceiptSection";
import { FiCheckCircle, FiClock } from "react-icons/fi";
import { IoIosWallet } from "react-icons/io";
import EstablishmentLayout from "../../../layout/EstablishmentLayout";
import { fetchStudents } from "../services/esStudent.api";
import {
  updateStudentPayment,
  addPayment,
} from "../services/esPayment.api";

export default function Payment() {
  const [viewStudent, setViewStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [editForm, setEditForm] = useState(null);
  const [installment, setInstallment] = useState("");
  const [summary, setSummary] = useState({
    totalCollected: 0,
    pendingCollection: 0,
    availableBalance: 0,
  });

  /* ================= LOAD STUDENTS (DYNAMIC) ================= */
  const loadStudents = async () => {
    try {
      const res = await fetchStudents(); // 🔥 No EST_ID
      let totalCollected = 0;
      let pendingCollection = 0;

      const mapped = res.data.map((s) => {
        const total = s.totalFees || s.courseId?.fees || 0;
        const paid = s.paidFees || 0;
        const remaining = total - paid;

        totalCollected += paid;
        pendingCollection += remaining;

        return {
          _id: s._id,
          name: `${s.firstName} ${s.lastName}`,
          email: s.email,
          phone: s.phone,
          course: s.courseId?.title || "-",
          totalFees: total,
          paid,
          remaining,
          financeStatus:
            remaining > 0 ? "PENDING" : "FEES_COMPLETED",
        };
      });

      setStudents(mapped);

      setSummary({
        totalCollected,
        pendingCollection,
        availableBalance: totalCollected,
      });
    } catch (err) {
      console.error("Payment fetch error:", err);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  /* ================= SAVE PAYMENT ================= */
  const handleSavePayment = async () => {
    try {
      if (!installment || Number(installment) <= 0) {
        alert("Please enter installment amount");
        return;
      }

      await addPayment(editStudent._id, {
        amount: Number(installment),
        method: "Cash",
      });

      await updateStudentPayment(editStudent._id, {
        totalFees: editForm.totalFees,
      });

      alert("Payment Added Successfully ✅");

      setEditStudent(null);
      setInstallment("");

      await loadStudents(); // 🔥 Refresh
    } catch (err) {
      console.error(err);
      alert("Payment Failed ❌");
    }
  };

  return (
    <EstablishmentLayout>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-800">
          Payments & Installments
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Student fee management, installments & collections
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <StatCard
          title="Available Balance"
          value={`₹ ${summary.availableBalance.toLocaleString()}`}
          icon={<IoIosWallet />}
        />

        <StatCard
          title="Pending Collection"
          value={`₹ ${summary.pendingCollection.toLocaleString()}`}
          icon={<FiClock />}
        />

        <StatCard
          title="Total Collected"
          value={`₹ ${summary.totalCollected.toLocaleString()}`}
          icon={<FiCheckCircle />}
        />
      </div>

      {/* TABLE */}
      <StudentFeeTable
        students={students}
        onView={setViewStudent}
        onEdit={(s) => {
          setEditStudent(s);
          setEditForm({
            totalFees: s.totalFees,
          });
        }}
      />

      {/* ================= VIEW ================= */}
      {viewStudent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div className="w-full sm:w-[440px] h-full bg-white rounded-l-3xl shadow-xl p-7 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-slate-800">
                Student Profile
              </h3>
              <button
                onClick={() => setViewStudent(null)}
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <Detail label="Name" value={viewStudent.name} />
              <Detail label="Email" value={viewStudent.email} />
              <Detail label="Phone" value={viewStudent.phone} />
              <Detail label="Course" value={viewStudent.course} />
              <Detail label="Total Fees" value={`₹ ${viewStudent.totalFees}`} />
              <EsInstallmentSection student={viewStudent} />
              <Detail label="Paid" value={`₹ ${viewStudent.paid}`} />
              <Detail
                label="Remaining"
                value={`₹ ${viewStudent.remaining}`}
                highlight
              />
              <EsReceiptSection student={viewStudent} />
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT ================= */}
      {editStudent && editForm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-7">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-slate-800">
                Edit Payment Details
              </h3>
              <button
                onClick={() => setEditStudent(null)}
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-5 text-sm">
              <Input label="Student Name" value={editStudent.name} disabled />
              <Input label="Phone" value={editStudent.phone} disabled />

              <Input
                label="Total Fees"
                value={editForm.totalFees}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    totalFees: Number(e.target.value),
                  })
                }
              />

              <Input
                label="Paid Amount"
                value={editStudent.paid}
                disabled
              />

              <Input
                label="Add Installment Amount"
                value={installment}
                onChange={(e) => setInstallment(e.target.value)}
              />
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setEditStudent(null)}
                className="px-5 py-2.5 rounded-xl text-sm bg-slate-100 text-slate-700"
              >
                Cancel
              </button>

              <button
                onClick={handleSavePayment}
                className="px-5 py-2.5 rounded-xl text-sm 
                bg-gradient-to-r from-indigo-600 to-blue-600 
                text-white font-semibold shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </EstablishmentLayout>
  );
}

/* ================= COMPONENTS ================= */

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-3xl p-6 shadow-md flex items-center gap-4">
    <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
      {icon}
    </div>
    <div>
      <p className="text-slate-500 text-sm">{title}</p>
      <p className="text-xl font-semibold text-slate-800">{value}</p>
    </div>
  </div>
);

/* ================= RESPONSIVE STUDENT PAYMENT LEDGER ================= */

const StudentFeeTable = ({ students, onView, onEdit }) => (
  <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
    <div className="px-7 py-6 border-b border-slate-100">
      <h2 className="text-lg font-semibold text-slate-800">
        Student Payment Ledger
      </h2>
    </div>

    {/* Desktop Table */}
    <div className="hidden md:block">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-slate-50 text-slate-600 text-xs uppercase">
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Phone</th>
            <th className="px-6 py-4 text-left">Course</th>
            <th className="px-6 py-4 text-left">Total</th>
            <th className="px-6 py-4 text-left">Paid</th>
            <th className="px-6 py-4 text-left">Remaining</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s._id} className="border-t border-slate-100">
              <td className="px-6 py-4 font-medium">{s.name}</td>
              <td className="px-6 py-4">{s.email}</td>
              <td className="px-6 py-4">{s.phone}</td>
              <td className="px-6 py-4">{s.course}</td>
              <td className="px-6 py-4">₹ {s.totalFees}</td>
              <td className="px-6 py-4 text-emerald-600">₹ {s.paid}</td>
              <td className="px-6 py-4 text-rose-600">₹ {s.remaining}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    s.financeStatus === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {s.financeStatus}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onView(s)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold 
                    bg-gradient-to-r from-indigo-600 to-blue-600 text-white"
                  >
                    View
                  </button>

                  <button
                    onClick={() => onEdit(s)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-400"
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile Cards */}
    <div className="md:hidden p-4 space-y-4">
      {students.map((s) => (
        <div
          key={s._id}
          className="border border-slate-200 rounded-2xl p-4 shadow-sm"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-slate-800">{s.name}</h3>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                s.financeStatus === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {s.financeStatus}
            </span>
          </div>

          <div className="text-xs text-slate-500 space-y-1">
            <p><b>Email:</b> {s.email}</p>
            <p><b>Phone:</b> {s.phone}</p>
            <p><b>Course:</b> {s.course}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs mt-3">
            <div className="bg-slate-50 p-2 rounded-lg text-center">
              <p className="text-slate-500">Total</p>
              <p className="font-semibold">₹ {s.totalFees}</p>
            </div>
            <div className="bg-emerald-50 p-2 rounded-lg text-center">
              <p className="text-slate-500">Paid</p>
              <p className="font-semibold text-emerald-600">₹ {s.paid}</p>
            </div>
            <div className="bg-rose-50 p-2 rounded-lg text-center">
              <p className="text-slate-500">Remaining</p>
              <p className="font-semibold text-rose-600">₹ {s.remaining}</p>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onView(s)}
              className="flex-1 py-2 rounded-xl text-xs font-semibold 
              bg-gradient-to-r from-indigo-600 to-blue-600 text-white"
            >
              View
            </button>

            <button
              onClick={() => onEdit(s)}
              className="flex-1 py-2 rounded-xl text-xs font-semibold bg-amber-400"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);


const Detail = ({ label, value, highlight }) => (
  <div className="flex justify-between items-center">
    <span className="text-slate-500">{label}</span>
    <span className={`font-medium ${highlight ? "text-rose-600" : ""}`}>
      {value}
    </span>
  </div>
);

const Input = ({ label, value, onChange, disabled }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs text-slate-500">{label}</label>
    <input
      value={value}
      disabled={disabled}
      onChange={onChange}
      className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm 
      outline-none focus:ring-2 focus:ring-indigo-200"
    />
  </div>
);
