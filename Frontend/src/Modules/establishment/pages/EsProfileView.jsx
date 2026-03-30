// import { useEffect, useState } from "react";
// import { getFullProfile } from "../services/esProfile.api";
// import EstablishmentLayout from "../../../layout/EstablishmentLayout";


// export default function EsProfileView() {
//   const [data, setData] = useState(null);
//   const [preview, setPreview] = useState({
//     open: false,
//     url: "",
//     type: "", // "image" | "pdf"
//     name: "",
//   });

//   const email = "pms123@gmail.com"; // 🔥 later from auth/context

//   useEffect(() => {
//     getFullProfile(email)
//       .then((res) => {
//         console.log("DATA:", res.data);
//         setData(res.data);
//       })
//       .catch((err) => {
//         console.error("API ERROR:", err.response?.data || err.message);
//       });
//   }, []);

//   if (!data)
//     return (
//       <EstablishmentLayout>
//         <div className="flex items-center justify-center h-[60vh] text-gray-500">
//           Loading profile...
//         </div>
//       </EstablishmentLayout>
//     );

//   const {
//     basicDetails,
//     establishmentType,
//     address,
//     infrastructure,
//     documents,
//     declarations,
//   } = data;

//   const companyLogo = documents?.find(
//     (d) => d.documentType === "companyLogo",
//   )?.fileUrl;

//   const openPreview = (doc) => {
//     const url = `http://localhost:5000/${doc.fileUrl}`;

//     const ext = doc.fileUrl.split(".").pop().toLowerCase();

//     let type = "image";
//     if (ext === "pdf") type = "pdf";

//     setPreview({
//       open: true,
//       url,
//       type,
//       name: doc.documentType,
//     });
//   };

//   const closePreview = () => {
//     setPreview({
//       open: false,
//       url: "",
//       type: "",
//       name: "",
//     });
//   };

//   return (
//     <EstablishmentLayout>
//       <div className="max-w-6xl mx-auto p-6 space-y-8">
//         {/* ===== TOP PROFILE CARD ===== */}
//         <div className="relative bg-linear-to-br from-gray-700 to-indigo-500 rounded-3xl p-10 text-white shadow-xl overflow-hidden">
//           <div className="flex flex-col items-center text-center">
//             {/* OWNER PHOTO */}
//             <div className="w-32 h-32 rounded-full border-2 border-white overflow-hidden shadow-2xl bg-white">
//               {companyLogo ? (
//                 <img
//                   src={`http://localhost:5000/uploads/${companyLogo.split("uploads")[1]}`}
//                   alt="Owner"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-gray-400">
//                   No Photo
//                 </div>
//               )}
//             </div>

//             <h1 className="mt-4 text-2xl font-bold">
//               {basicDetails?.establishmentName}
//             </h1>

//             <p className="text-sm opacity-90">
//               Authorized Person: {basicDetails?.authorizedPerson}
//             </p>

//             <div className="mt-3 flex gap-3 flex-wrap justify-center">
//               <Badge text={basicDetails?.email} />
//               <Badge text={basicDetails?.mobile} />
//               <Badge text={data?.status?.toUpperCase() || "DRAFT"} />
//             </div>
//           </div>
//         </div>

//         {/* ===== GRID SECTIONS ===== */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <GlassCard title="Basic Details">
//             <Info label="Email" value={basicDetails?.email} />
//             <Info label="Mobile" value={basicDetails?.mobile} />
//           </GlassCard>

//           <GlassCard title="Establishment Type">
//             <Info label="Types" value={establishmentType?.types?.join(", ")} />
//             {establishmentType?.otherType && (
//               <Info label="Other" value={establishmentType.otherType} />
//             )}
//           </GlassCard>

//           <GlassCard title="Address">
//             <Info label="State" value={address?.state} />
//             <Info label="District" value={address?.district} />
//             <Info label="City" value={address?.city} />
//             <Info label="Pincode" value={address?.pincode} />
//             <Info label="Full Address" value={address?.fullAddress} />
//           </GlassCard>

//           <GlassCard title="Infrastructure">
//             <Info label="Classrooms" value={infrastructure?.classrooms} />
//             <Info label="Capacity" value={infrastructure?.capacity} />
//             <Info label="Staff" value={infrastructure?.staff} />
//             <Info label="Modes" value={infrastructure?.modes?.join(", ")} />
//           </GlassCard>
//         </div>

//         {/* ===== DOCUMENTS ===== */}
//         <GlassCard title="Documents">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {documents?.map((doc, i) => (
//               <div
//                 key={i}
//                 className="flex items-center justify-between bg-white/70 rounded-xl px-4 py-3 shadow"
//               >
//                 <span className="text-sm font-medium text-gray-700 capitalize">
//                   {doc.documentType}
//                 </span>
//                 {/* <a
//                   href={`http://localhost:5000/${doc.fileUrl}`}
//                   target="_blank"
//                   className="text-blue-600 text-sm font-semibold hover:underline"
//                 >
//                   View
//                 </a> */}
//                 <button
//                   onClick={() => openPreview(doc)}
//                   className="text-blue-600 text-sm font-semibold hover:underline"
//                 >
//                   View
//                 </button>
//               </div>
//             ))}
//           </div>
//         </GlassCard>

//         {/* ===== DECLARATIONS ===== */}
//         <GlassCard title="Declarations">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Status label="Info Correct" value={declarations?.infoCorrect} />
//             <Status label="Agree Policy" value={declarations?.agreePolicy} />
//             <Status label="Accept Terms" value={declarations?.acceptTerms} />
//             <Info
//               label="Declared At"
//               value={
//                 declarations?.declaredAt
//                   ? new Date(declarations.declaredAt).toLocaleString()
//                   : "—"
//               }
//             />
//           </div>
//         </GlassCard>
//       </div>
//       {preview.open && (
//         <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl w-full max-w-3xl h-[85vh] shadow-2xl flex flex-col overflow-hidden">
//             {/* HEADER */}
//             <div className="flex justify-between items-center px-6 py-4 border-b">
//               <h2 className="font-semibold text-gray-800 capitalize">
//                 {preview.name} Preview
//               </h2>
//               <button
//                 onClick={closePreview}
//                 className="text-gray-500 hover:text-red-500 text-xl font-bold"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* BODY */}
//             <div className="flex-1 bg-gray-100 flex items-center justify-center overflow-auto p-4">
//               {preview.type === "image" ? (
//                 <img
//                   src={preview.url}
//                   alt="preview"
//                   className="max-h-full max-w-full object-contain rounded-xl shadow"
//                 />
//               ) : (
//                 <iframe
//                   src={preview.url}
//                   className="w-full h-full rounded-xl border"
//                   title="Document Preview"
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </EstablishmentLayout>
//   );
// }

// /* ================= UI COMPONENTS ================= */

// const GlassCard = ({ title, children }) => (
//   <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-3xl p-6 shadow-xl">
//     <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
//     <div className="space-y-2">{children}</div>
//   </div>
// );

// const Info = ({ label, value }) => (
//   <div className="flex justify-between text-sm py-1">
//     <span className="text-gray-500">{label}</span>
//     <span className="font-semibold text-gray-800">{value || "—"}</span>
//   </div>
// );

// const Status = ({ label, value }) => (
//   <div className="flex items-center justify-between bg-white/60 rounded-xl px-4 py-2 shadow">
//     <span className="text-sm text-gray-600">{label}</span>
//     <span
//       className={`px-3 py-1 rounded-full text-xs font-semibold ${
//         value ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
//       }`}
//     >
//       {value ? "YES" : "NO"}
//     </span>
//   </div>
// );

// const Badge = ({ text }) => (
//   <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-medium">
//     {text}
//   </span>
// );


///////////////////////////////////////////////////////////



// import { useEffect, useState } from "react";
// import { fetchFullProfile } from "../services/esProfile.api";
// import EstablishmentLayout from "../../../layout/EstablishmentLayout";

// export default function EsProfileView() {
//   const [data, setData] = useState(null);
//   const [preview, setPreview] = useState({
//     open: false,
//     url: "",
//     type: "",
//     name: "",
//   });

//   useEffect(() => {
//     fetchFullProfile()
//       .then((res) => setData(res.data))
//       .catch((err) =>
//         console.error("API ERROR:", err.response?.data || err.message)
//       );
//   }, []);

//   if (!data)
//     return (
//       <EstablishmentLayout>
//         <div className="flex items-center justify-center h-[60vh] text-gray-500">
//           Loading profile...
//         </div>
//       </EstablishmentLayout>
//     );

//   /* ===== BACKEND DATA STRUCTURE ===== */
//   const {
//     establishmentName,
//     authorizedPerson,
//     email,
//     mobile,
//     establishmentType,
//     address,
//     infrastructure,
//     documents,
//     declarations,
//     status,
//   } = data;

//   const companyLogo = documents?.find(
//     (d) => d.documentType === "companyLogo"
//   )?.fileUrl;

//   const openPreview = (doc) => {
//     const url = `http://localhost:5000/${doc.fileUrl}`;
//     const ext = doc.fileUrl.split(".").pop().toLowerCase();
//     setPreview({
//       open: true,
//       url,
//       type: ext === "pdf" ? "pdf" : "image",
//       name: doc.documentType,
//     });
//   };

//   const closePreview = () =>
//     setPreview({ open: false, url: "", type: "", name: "" });

//   return (
//     <EstablishmentLayout>
//       <div className="max-w-6xl mx-auto p-6 space-y-8">
//         {/* ===== TOP PROFILE CARD ===== */}
//         <div className="relative bg-linear-to-br from-gray-700 to-indigo-500 rounded-3xl p-10 text-white shadow-xl overflow-hidden">
//           <div className="flex flex-col items-center text-center">
//             <div className="w-32 h-32 rounded-full border-2 border-white overflow-hidden shadow-2xl bg-white">
//               {companyLogo ? (
//                 <img
//                   src={`http://localhost:5000/${companyLogo}`}
//                   alt="Logo"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-gray-400">
//                   No Logo
//                 </div>
//               )}
//             </div>

//             <h1 className="mt-4 text-2xl font-bold">{establishmentName}</h1>
//             <p className="text-sm opacity-90">
//               Authorized Person: {authorizedPerson}
//             </p>

//             <div className="mt-3 flex gap-3 flex-wrap justify-center">
//               <Badge text={email} />
//               <Badge text={mobile} />
//               <Badge text={status?.toUpperCase() || "DRAFT"} />
//             </div>
//           </div>
//         </div>

//         {/* ===== GRID SECTIONS ===== */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <GlassCard title="Basic Details">
//             <Info label="Email" value={email} />
//             <Info label="Mobile" value={mobile} />
//           </GlassCard>

//           <GlassCard title="Establishment Type">
//             <Info label="Types" value={establishmentType?.types?.join(", ")} />
//             {establishmentType?.otherType && (
//               <Info label="Other" value={establishmentType.otherType} />
//             )}
//           </GlassCard>

//           <GlassCard title="Address">
//             <Info label="State" value={address?.state} />
//             <Info label="District" value={address?.district} />
//             <Info label="City" value={address?.city} />
//             <Info label="Pincode" value={address?.pincode} />
//             <Info label="Full Address" value={address?.fullAddress} />
//           </GlassCard>

//           <GlassCard title="Infrastructure">
//             <Info label="Classrooms" value={infrastructure?.classrooms} />
//             <Info label="Capacity" value={infrastructure?.capacity} />
//             <Info label="Staff" value={infrastructure?.staff} />
//             <Info label="Modes" value={infrastructure?.modes?.join(", ")} />
//           </GlassCard>
//         </div>

//         {/* ===== DOCUMENTS ===== */}
//         <GlassCard title="Documents">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {documents?.map((doc, i) => (
//               <div
//                 key={i}
//                 className="flex items-center justify-between bg-white/70 rounded-xl px-4 py-3 shadow"
//               >
//                 <span className="text-sm font-medium text-gray-700 capitalize">
//                   {doc.documentType}
//                 </span>
//                 <button
//                   onClick={() => openPreview(doc)}
//                   className="text-blue-600 text-sm font-semibold hover:underline"
//                 >
//                   View
//                 </button>
//               </div>
//             ))}
//           </div>
//         </GlassCard>

//         {/* ===== DECLARATIONS ===== */}
//         <GlassCard title="Declarations">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Status label="Info Correct" value={declarations?.infoCorrect} />
//             <Status label="Agree Policy" value={declarations?.agreePolicy} />
//             <Status label="Accept Terms" value={declarations?.acceptTerms} />
//             <Info
//               label="Declared At"
//               value={
//                 declarations?.declaredAt
//                   ? new Date(declarations.declaredAt).toLocaleString()
//                   : "—"
//               }
//             />
//           </div>
//         </GlassCard>
//       </div>

//       {/* ===== PREVIEW MODAL ===== */}
//       {preview.open && (
//         <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl w-full max-w-3xl h-[85vh] shadow-2xl flex flex-col overflow-hidden">
//             <div className="flex justify-between items-center px-6 py-4 border-b">
//               <h2 className="font-semibold text-gray-800 capitalize">
//                 {preview.name} Preview
//               </h2>
//               <button
//                 onClick={closePreview}
//                 className="text-gray-500 hover:text-red-500 text-xl font-bold"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="flex-1 bg-gray-100 flex items-center justify-center overflow-auto p-4">
//               {preview.type === "image" ? (
//                 <img
//                   src={preview.url}
//                   alt="preview"
//                   className="max-h-full max-w-full object-contain rounded-xl shadow"
//                 />
//               ) : (
//                 <iframe
//                   src={preview.url}
//                   className="w-full h-full rounded-xl border"
//                   title="Document Preview"
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </EstablishmentLayout>
//   );
// }

// /* ================= UI COMPONENTS ================= */

// const GlassCard = ({ title, children }) => (
//   <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-3xl p-6 shadow-xl">
//     <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
//     <div className="space-y-2">{children}</div>
//   </div>
// );

// const Info = ({ label, value }) => (
//   <div className="flex justify-between text-sm py-1">
//     <span className="text-gray-500">{label}</span>
//     <span className="font-semibold text-gray-800">{value || "—"}</span>
//   </div>
// );

// const Status = ({ label, value }) => (
//   <div className="flex items-center justify-between bg-white/60 rounded-xl px-4 py-2 shadow">
//     <span className="text-sm text-gray-600">{label}</span>
//     <span
//       className={`px-3 py-1 rounded-full text-xs font-semibold ${
//         value ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
//       }`}
//     >
//       {value ? "YES" : "NO"}
//     </span>
//   </div>
// );

// const Badge = ({ text }) => (
//   <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-medium">
//     {text}
//   </span>
// );


///////////////////////////////////////////////////////////////////



import { useEffect, useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiFileText,
  FiCheckCircle,
} from "react-icons/fi";
import { FaSchool, FaCity, FaRegBuilding } from "react-icons/fa";
import { MdLocationCity, MdOutlineMeetingRoom } from "react-icons/md";
import { BsPeople, BsLaptop, BsShieldCheck } from "react-icons/bs";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { getFullProfile } from "../services/esProfile.api";
import EstablishmentLayout from "../../../layout/EstablishmentLayout";

export default function EsProfileView() {
  const [data, setData] = useState(null);
  const [preview, setPreview] = useState({
    open: false,
    url: "",
    type: "",
    name: "",
  });

  useEffect(() => {
    getFullProfile()
      .then((res) => setData(res.data))
      .catch((err) =>
        console.error("API ERROR:", err.response?.data || err.message)
      );
  }, []);

  if (!data)
    return (
      <EstablishmentLayout>
        <div className="flex items-center justify-center h-[60vh] text-gray-500">
          Loading profile...
        </div>
      </EstablishmentLayout>
    );

  const {
    basicDetails,
    establishmentType,
    address,
    infrastructure,
    documents,
    declarations,
    status,
  } = data;

  const companyLogo = documents?.find(
    (d) => d.documentType === "companyLogo"
  )?.fileUrl;

  const openPreview = (doc) => {
    const url = `http://localhost:5000/${doc.fileUrl}`;
    const ext = doc.fileUrl.split(".").pop().toLowerCase();
    setPreview({
      open: true,
      url,
      type: ext === "pdf" ? "pdf" : "image",
      name: doc.documentType,
    });
  };

  const closePreview = () =>
    setPreview({ open: false, url: "", type: "", name: "" });

  return (
    <EstablishmentLayout>
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* ===== TOP PROFILE CARD ===== */}
        <div className="relative bg-linear-to-br from-gray-700 to-indigo-500 rounded-3xl p-10 text-white shadow-xl overflow-hidden">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full border-2 border-white overflow-hidden shadow-2xl bg-white">
              {companyLogo ? (
                <img
                  src={`http://localhost:5000/${companyLogo}`}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Logo
                </div>
              )}
            </div>

            <h1 className="mt-4 text-2xl font-bold">
              {basicDetails?.establishmentName}
            </h1>

            <p className="text-sm opacity-90">
              Authorized Person: {basicDetails?.authorizedPerson}
            </p>

            <div className="mt-3 flex gap-3 flex-wrap justify-center">
              <Badge text={basicDetails?.email} icon={<FiMail />} />
              <Badge text={basicDetails?.mobile} icon={<FiPhone />} />
              <Badge text={(status || "draft").toUpperCase()} icon={<BsShieldCheck />} />
            </div>
          </div>
        </div>

        {/* ===== GRID SECTIONS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard title="Basic Details" icon={<FaSchool className="text-blue-600" />}>
            <Info label="Email" value={basicDetails?.email} icon={<FiMail />} />
            <Info label="Mobile" value={basicDetails?.mobile} icon={<FiPhone />} />
          </GlassCard>

          <GlassCard title="Establishment Type" icon={<FaRegBuilding className="text-indigo-600" />}>
            <Info label="Types" value={establishmentType?.types?.join(", ")} icon={<BsPeople />} />
            {establishmentType?.otherType && (
              <Info label="Other" value={establishmentType.otherType} icon={<FiUser />} />
            )}
          </GlassCard>

          <GlassCard title="Address" icon={<FiMapPin className="text-green-600" />}>
            <Info label="State" value={address?.state} icon={<FaCity />} />
            <Info label="District" value={address?.district} icon={<MdLocationCity />} />
            <Info label="City" value={address?.city} icon={<FaCity />} />
            <Info label="Pincode" value={address?.pincode} icon={<FiMapPin />} />
            <Info label="Full Address" value={address?.fullAddress} icon={<FiMapPin />} />
          </GlassCard>

          <GlassCard title="Infrastructure" icon={<MdOutlineMeetingRoom className="text-purple-600" />}>
            <Info label="Classrooms" value={infrastructure?.classrooms} icon={<MdOutlineMeetingRoom />} />
            <Info label="Capacity" value={infrastructure?.capacity} icon={<BsPeople />} />
            <Info label="Staff" value={infrastructure?.staff} icon={<BsPeople />} />
            <Info label="Modes" value={infrastructure?.modes?.join(", ")} icon={<BsLaptop />} />
          </GlassCard>
        </div>

        {/* ===== DOCUMENTS ===== */}
        <GlassCard title="Documents" icon={<FiFileText className="text-orange-600" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents?.map((doc, i) => (
              <div key={i} className="flex items-center justify-between bg-white/70 rounded-xl px-4 py-3 shadow">
                <span className="text-sm font-medium text-gray-700 capitalize flex items-center gap-2">
                  <HiOutlineDocumentSearch />
                  {doc.documentType}
                </span>
                <button
                  onClick={() => openPreview(doc)}
                  className="text-blue-600 text-sm font-semibold hover:underline"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* ===== DECLARATIONS ===== */}
        <GlassCard title="Declarations" icon={<BsShieldCheck className="text-green-600" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Status label="Info Correct" value={declarations?.infoCorrect} icon={<FiCheckCircle />} />
            <Status label="Agree Policy" value={declarations?.agreePolicy} icon={<FiCheckCircle />} />
            <Status label="Accept Terms" value={declarations?.acceptTerms} icon={<FiCheckCircle />} />
            <Info
              label="Declared At"
              value={
                declarations?.declaredAt
                  ? new Date(declarations.declaredAt).toLocaleString()
                  : "—"
              }
              icon={<FiUser />}
            />
          </div>
        </GlassCard>

        {/* ===== PREVIEW MODAL ===== */}
        {preview.open && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-3xl h-[85vh] shadow-2xl flex flex-col overflow-hidden">
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h2 className="font-semibold text-blue-800 capitalize">
                  {preview.name} Preview
                </h2>
                <button onClick={closePreview} className="text-gray-500 hover:text-red-500 text-xl font-bold">
                  ✕
                </button>
              </div>

              <div className="flex-1 bg-gray-100 flex items-center justify-center overflow-auto p-4">
                {preview.type === "image" ? (
                  <img src={preview.url} alt="preview" className="max-h-full max-w-full object-contain rounded-xl shadow" />
                ) : (
                  <iframe src={preview.url} className="w-full h-full rounded-xl border" title="Document Preview" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </EstablishmentLayout>
  );
}

/* ================= UI COMPONENTS ================= */

const GlassCard = ({ title, icon, children }) => (
  <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-3xl p-6 shadow-xl">
    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
      {icon}
      {title}
    </h2>
    <div className="space-y-2">{children}</div>
  </div>
);

const Info = ({ label, value, icon }) => (
  <div className="flex text-sm items-center justify-between bg-white/60 rounded-xl px-4 py-2 shadow">
    <div className="flex items-center gap-2 text-gray-500">
      {icon}
      <span>{label}</span>
    </div>
    <span className="font-semibold text-gray-800">{value || "—"}</span>
  </div>
);

const Status = ({ label, value, icon }) => (
  <div className="flex items-center justify-between bg-white/60 rounded-xl px-4 py-2 shadow">
    <div className="flex items-center gap-2 text-sm text-gray-600">
      {icon}
      <span>{label}</span>
    </div>
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
        value ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
      }`}
    >
      {value ? <FiCheckCircle /> : "✕"}
      {value ? "YES" : "NO"}
    </span>
  </div>
);

const Badge = ({ text, icon }) => (
  <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-medium flex items-center gap-1">
    {icon}
    {text}
  </span>
);
