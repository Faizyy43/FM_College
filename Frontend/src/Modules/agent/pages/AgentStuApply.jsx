// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   MdPerson,
//   MdPhone,
//   MdCalendarToday,
//   MdLocationOn,
// } from "react-icons/md";
// import AgentLayout from "../../../layout/AgentLayout";
// // import {
// //   getStudentById,
// //   updateStudent,
// //   updateStudentDocuments,
// //   getStudentApplications,
// //   applyStudentToCourse,
// //   getApplyOptions,
// // } from "../services/agentService";

// /* ================= CONSTANTS ================= */

// const steps = [
//   "Personal & Address Details",
//   "Education Details",
//   "Documents Upload",
//   "Apply to Colleges",
//   "Declaration",
// ];

// const BOARDS = [
//   "Gujarat Board",
//   "CBSE",
//   "ICSE",
//   "IGCSE",
//   "IB",
//   "State Boards",
//   "NIOS",
// ];

// const YEARS = Array.from({ length: 11 }, (_, i) => 2015 + i);

// /* ================= HELPERS ================= */

// const onlyDigits = (v) => /^\d*$/.test(v);

// const calculatePercentage = (obtained, total) => {
//   const o = Number(obtained);
//   const t = Number(total);
//   if (!o || !t || t <= 0 || o > t) return "";
//   return ((o / t) * 100).toFixed(2);
// };

// const mapStudentToForm = (student = {}) => ({
//   fullName: student.fullName || "",
//   mobile: student.mobile || "",
//   dob: student.dob ? student.dob.split("T")[0] : "",
//   gender: student.gender || "",
//   state: student.state || "",
//   city: student.city || "",
//   pincode: student.pincode || "",
//   fullAddress: student.fullAddress || "",

//   tenthBoard: student.tenthBoard || "",
//   tenthYear: student.tenthYear || "",
//   tenthMarksObtained: student.tenthMarksObtained || "",
//   tenthTotalMarks: student.tenthTotalMarks || "",
//   tenthPercentage: student.tenthPercentage || "",

//   twelfthBoard: student.twelfthBoard || "",
//   twelfthYear: student.twelfthYear || "",
//   twelfthMarksObtained: student.twelfthMarksObtained || "",
//   twelfthTotalMarks: student.twelfthTotalMarks || "",
//   twelfthPercentage: student.twelfthPercentage || "",

//   declarationAccepted: student.declarationAccepted || false,
// });

// /* ================= MAIN COMPONENT ================= */

// export default function AgentStuProfile() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [step, setStep] = useState(0);
//   const [form, setForm] = useState(mapStudentToForm());
//   const [documents, setDocuments] = useState({});
//   const [applications, setApplications] = useState([]);
//   const [selectedColleges, setSelectedColleges] = useState([]);
//   const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   // useEffect(() => {
//   //   const load = async () => {
//   //     const student = await getStudentById(id);
//   //     setForm(mapStudentToForm(student.data));
//   //     const apps = await getStudentApplications(id);
//   //     setApplications(apps.data || []);
//   //   };
//   //   load();
//   // }, [id]);

//   const validators = {
//     0: (d) =>
//       d.fullName &&
//       d.dob &&
//       d.gender &&
//       d.state &&
//       d.city &&
//       d.pincode &&
//       d.fullAddress,
//     1: (d) =>
//       d.tenthBoard &&
//       d.tenthYear &&
//       d.tenthMarksObtained &&
//       d.tenthTotalMarks &&
//       d.twelfthBoard &&
//       d.twelfthYear &&
//       d.twelfthMarksObtained &&
//       d.twelfthTotalMarks,
//     4: (d) => d.declarationAccepted === true,
//   };

//   const isStepValid = validators[step]?.(form) ?? true;

//   const handleFileChange = (name, file) =>
//     setDocuments((p) => ({ ...p, [name]: file }));

//   const handleSave = async () => {
//     if (step === 2) {
//       const formData = new FormData();
//       Object.entries(documents).forEach(([key, file]) => {
//         if (file) formData.append(key, file);
//       });
//       await updateStudentDocuments(id, formData);
//       setStep(step + 1);
//       return;
//     }

//     if (step === 4) {
//       setShowConfirmSubmit(true);
//       return;
//     }

//     await updateStudent(id, form);
//     setStep(step + 1);
//   };

//   const confirmFinalSubmit = async () => {
//     try {
//       setSubmitting(true);

//       await updateStudent(id, {
//         ...form,
//         finalSubmitted: true,
//         submittedAt: new Date(),
//       });

//       for (const item of selectedColleges) {
//         await applyStudentToCourse(id, {
//           collegeId: item.collegeId,
//           courseId: item.courseId,
//         });
//       }

//       setShowConfirmSubmit(false);
//       setShowSuccessPopup(true);

//       setTimeout(() => {
//         navigate("/agent/applications");
//       }, 2000);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <AgentLayout>
//     <div className="bg-gray-100 text-gray-700 min-h-screen px-3 sm:px-6 py-6">
//       <div className="max-w-6xl mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow">

//         {/* Step Navigation */}
//         <div className="hidden sm:flex flex-wrap gap-2 sm:gap-3 mb-6">
//           {steps.map((s, i) => (
//             <button
//               key={s}
//               disabled={i > step}
//               onClick={() => setStep(i)}
//               className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-full transition
//                 ${i === step ? "bg-indigo-600 text-white" : "bg-gray-200"}
//               `}
//             >
//               {i + 1}. {s}
//             </button>
//           ))}
//         </div>

//         {step === 0 && <PersonalStep form={form} setForm={setForm} />}
//         {step === 1 && (
//           <EducationStep
//             form={form}
//             setForm={setForm}
//             calculatePercentage={calculatePercentage}
//           />
//         )}
//         {step === 2 && (
//           <DocumentsStep documents={documents} onFileChange={handleFileChange} />
//         )}
//         {step === 3 && (
//           <ApplyCollegeStep
//             selectedColleges={selectedColleges}
//             setSelectedColleges={setSelectedColleges}
//           />
//         )}
//         {step === 4 && <DeclarationStep form={form} setForm={setForm} />}

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
//           <button
//             onClick={() => setStep(step - 1)}
//             disabled={step === 0}
//             className="px-6 py-2 bg-amber-500 text-white rounded-lg"
//           >
//             Back
//           </button>

//           <button
//             onClick={handleSave}
//             disabled={!isStepValid}
//             className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
//           >
//             Save & Continue
//           </button>
//         </div>
//       </div>

//       {/* Confirm Modal */}
//       {showConfirmSubmit && (
//         <Modal>
//           <h3 className="text-lg font-semibold text-red-600 mb-3">
//             Confirm Submission
//           </h3>
//           <p className="text-sm mb-6">
//             Once submitted, it cannot be changed.
//           </p>
//           <div className="flex justify-end gap-3">
//             <button
//               onClick={() => setShowConfirmSubmit(false)}
//               className="px-4 py-2 bg-gray-200 rounded-lg"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={confirmFinalSubmit}
//               disabled={submitting}
//               className="px-4 py-2 bg-red-600 text-white rounded-lg"
//             >
//               {submitting ? "Submitting..." : "Confirm Submit"}
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* Success Modal */}
//       {showSuccessPopup && (
//         <Modal>
//           <div className="text-center">
//             <div className="text-green-600 text-4xl mb-3">✓</div>
//             <h3 className="text-lg font-semibold mb-2">
//               Application Submitted
//             </h3>
//             <p className="text-sm text-gray-500">
//               Redirecting to Applications...
//             </p>
//           </div>
//         </Modal>
//       )}
//     </div>
//     </AgentLayout>
//   );
// }

// /* ================= MODAL ================= */

// function Modal({ children }) {
//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
//       <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
//         {children}
//       </div>
//     </div>
//   );
// }

// /* ================= STEPS ================= */

// function PersonalStep({ form, setForm }) {
//   return (
//     <>
//       <Section title="Personal & Address Details" />
//       <Grid>
//         <Input
//           label="Full Name"
//           value={form.fullName}
//           icon={<MdPerson size={16} />}
//           onChange={(v) => setForm((p) => ({ ...p, fullName: v }))}
//         />

//         <Input
//           label="Mobile Number"
//           value={form.mobile}
//           disabled
//           icon={<MdPhone size={16} />}
//         />

//         <Input
//           label="Date of Birth"
//           type="date"
//           value={form.dob}
//           icon={<MdCalendarToday size={16} />}
//           onChange={(v) => setForm((p) => ({ ...p, dob: v }))}
//         />

//         <div>
//           <label className="block text-sm mb-2">Gender</label>
//           <div className="flex gap-4">
//             {["Male", "Female", "Other"].map((g) => (
//               <label key={g} className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="gender"
//                   value={g}
//                   checked={form.gender === g}
//                   onChange={() => setForm((p) => ({ ...p, gender: g }))}
//                 />
//                 {g}
//               </label>
//             ))}
//           </div>
//         </div>

//         <Input
//           label="State"
//           value={form.state}
//           icon={<MdLocationOn size={16} />}
//           onChange={(v) => setForm((p) => ({ ...p, state: v }))}
//         />

//         <Input
//           label="City"
//           value={form.city}
//           onChange={(v) => setForm((p) => ({ ...p, city: v }))}
//         />

//         <Input
//           label="Pincode"
//           value={form.pincode}
//           onChange={(v) =>
//             onlyDigits(v) && setForm((p) => ({ ...p, pincode: v }))
//           }
//         />

//         <Textarea
//           label="Full Address"
//           value={form.fullAddress}
//           onChange={(v) => setForm((p) => ({ ...p, fullAddress: v }))}
//         />
//       </Grid>
//     </>
//   );
// }

// /* ================= UI HELPERS ================= */

// function Section({ title }) {
//   return <h2 className="text-xl font-semibold mb-6">{title}</h2>;
// }

// function Grid({ children }) {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">{children}</div>
//   );
// }

// function Input({ label, icon, value, onChange, type = "text", disabled }) {
//   return (
//     <div>
//       <label className="block text-sm mb-2">{label}</label>
//       <div className="relative">
//         {icon && (
//           <div className="absolute top-3 left-3 text-gray-400">{icon}</div>
//         )}
//         <input
//           type={type}
//           value={value || ""}
//           disabled={disabled}
//           onChange={(e) => onChange?.(e.target.value)}
//           className={`w-full border rounded-md px-3 py-2 ${
//             icon ? "pl-10" : ""
//           } disabled:bg-gray-100 disabled:text-gray-400`}
//         />
//       </div>
//     </div>
//   );
// }

// function Textarea({ label, value, onChange }) {
//   return (
//     <div className="sm:col-span-2">
//       <label className="block text-sm mb-2">{label}</label>
//       <textarea
//         rows={3}
//         value={value || ""}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full border rounded-md px-3 py-2 resize-none"
//       />
//     </div>
//   );
// }

// function Select({ label, options, value, onChange }) {
//   return (
//     <div>
//       <label className="block text-sm mb-2">{label}</label>
//       <select
//         value={value || ""}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full border rounded-md px-3 py-2"
//       >
//         <option value="">Select</option>
//         {options.map((o) => (
//           <option key={o} value={o}>
//             {o}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }




//////////////////////////////////////////////////////////////////


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiCheck,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import AgentLayout from "../../../layout/AgentLayout";
import { useParams } from "react-router-dom";
import {
  getStudent,
  savePersonal,
  saveEducation,
  uploadDocuments,
  saveColleges,
  finalSubmit,
  getApplyOptions
} from "../services/agentStuApply.api";



/* ================= STEP LABELS ================= */

const steps = [
  "Personal & Address Details",
  "Education Details",
  "Documents Upload",
  "Apply to Colleges",
  "Declaration",
];

const BOARDS = [
  "Gujarat Board",
  "CBSE",
  "ICSE",
  "IGCSE",
  "IB",
  "State Boards",
  "NIOS",
];

const YEARS = Array.from({ length: 11 }, (_, i) => 2015 + i);

const onlyDigits = (v) => /^\d*$/.test(v);

const calculatePercentage = (obtained, total) => {
  const o = Number(obtained);
  const t = Number(total);
  if (!o || !t || t <= 0 || o > t) return "";
  return ((o / t) * 100).toFixed(2);
};




export default function AgentStuApply() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [documents, setDocuments] = useState({});
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    dob: "",
    gender: "",
    state: "",
    city: "",
    pincode: "",
    fullAddress: "",
    tenthBoard: "",
    tenthYear: "",
    tenthMarksObtained: "",
    tenthTotalMarks: "",
    twelfthBoard: "",
    twelfthYear: "",
    twelfthMarksObtained: "",
    twelfthTotalMarks: "",
    declarationAccepted: false,
  });

  const { id } = useParams();

useEffect(() => {

  const loadStudent = async () => {

    try {

      const res = await getStudent(id);
      const data = res.data;

      setForm((p) => ({
        ...p,
        fullName: data.fullName || "",
        mobile: data.mobile || "",
        state: data.state || "",
        city: data.city || "",
        pincode: data.pincode || "",
        fullAddress: data.fullAddress || "",
        dob: data.dob || "",
        gender: data.gender || "",
      }));

    } catch (err) {
      console.error(err);
    }
  };

  loadStudent();

}, [id]);

  /* ================= HELPERS ================= */

  const update = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: "" }));
  };

  const validate = () => {
    const e = {};

    if (step === 1) {
      if (!form.fullName) e.fullName = "Required";
      if (!form.mobile) e.mobile = "Required";
      if (!form.dob) e.dob = "Required";
      if (!form.gender) e.gender = "Required";
      if (!form.state) e.state = "Required";
      if (!form.city) e.city = "Required";
      if (!form.pincode) e.pincode = "Required";
      if (!form.fullAddress) e.fullAddress = "Required";
    }

    if (step === 2) {
      if (!form.tenthBoard) e.tenthBoard = "Required";
      if (!form.tenthYear) e.tenthYear = "Required";
      if (!form.tenthMarksObtained) e.tenthMarksObtained = "Required";
      if (!form.tenthTotalMarks) e.tenthTotalMarks = "Required";
      if (!form.twelfthBoard) e.twelfthBoard = "Required";
      if (!form.twelfthYear) e.twelfthYear = "Required";
      if (!form.twelfthMarksObtained) e.twelfthMarksObtained = "Required";
      if (!form.twelfthTotalMarks) e.twelfthTotalMarks = "Required";
    }

    if (step === 3) {
      if (!documents.passportPhoto) e.passportPhoto = "Required";
      if (!documents.signature) e.signature = "Required";
      if (!documents.aadhaarCard) e.aadhaarCard = "Required";
      if (!documents.tenthMarksheet) e.tenthMarksheet = "Required";
      if (!documents.twelfthMarksheet) e.twelfthMarksheet = "Required";
    }

    if (step === 4 && selectedColleges.length === 0) {
      e.apply = "Please select at least one college";
    }

    if (step === 5 && !form.declarationAccepted) {
      e.declaration = "Accept declaration";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };
   
  const next = async () => {

  if (!validate()) return;

  try {

    /* STEP 1 */
    if (step === 1) {

      await savePersonal(id, {
        fullName: form.fullName,
        mobile: form.mobile,
        dob: form.dob,
        gender: form.gender,
        state: form.state,
        city: form.city,
        pincode: form.pincode,
        fullAddress: form.fullAddress
      });

    }

    /* STEP 2 */
    if (step === 2) {

      await saveEducation(id, {
        tenthBoard: form.tenthBoard,
        tenthYear: form.tenthYear,
        tenthMarksObtained: form.tenthMarksObtained,
        tenthTotalMarks: form.tenthTotalMarks,
        twelfthBoard: form.twelfthBoard,
        twelfthYear: form.twelfthYear,
        twelfthMarksObtained: form.twelfthMarksObtained,
        twelfthTotalMarks: form.twelfthTotalMarks
      });

    }

    /* STEP 3 */
    if (step === 3) {

      const fd = new FormData();

      Object.entries(documents).forEach(([k, v]) => {
        if (v) fd.append(k, v);
      });

      await uploadDocuments(id, fd);

    }

    /* STEP 4 */
    if (step === 4) {

      await saveColleges(id, {
        selectedColleges
      });

    }

    setStep((s) => s + 1);

  } catch (err) {

    console.error(err);
    alert("Failed to save step");

  }

};
 

  const back = () => setStep((s) => s - 1);

const submitFinal = async () => {

  if (!validate()) return;

  try {

    setSubmitting(true);

    await finalSubmit(id);

    setShowSuccessPopup(true);

    setTimeout(() => {
      navigate("/agent/applications");
    }, 2000);

  } catch (err) {

    console.error(err);
    alert("Submission failed");

  } finally {

    setSubmitting(false);

  }

};

  /* ================= UI ================= */

  return (
    <AgentLayout>
      <div className="p-6 bg-gray-100 min-h-screen">

        <Stepper steps={steps} current={step} />
        <ProgressBar totalSteps={5} current={step} />

        {/* STEP 1 */}
        {step === 1 && (
          <Section title="Personal & Address Details" footer={<Nav next={next} />}>
            <Grid>
              <Input label="Full Name" icon={<FiUser />} value={form.fullName}
                onChange={(v)=>update("fullName",v)} error={errors.fullName}/>
              <Input label="Mobile" icon={<FiPhone />}
                value={form.mobile}
                onChange={(v)=>update("mobile",v)} error={errors.mobile}/>
              <Input type="date" label="Date of Birth" icon={<FiCalendar />}
                value={form.dob}
                onChange={(v)=>update("dob",v)} error={errors.dob}/>
              <Select label="Gender"
                value={form.gender}
                onChange={(v)=>update("gender",v)}
                options={["Male","Female","Other"]}/>
              <Input label="State" icon={<FiMapPin />}
                value={form.state}
                onChange={(v)=>update("state",v)} error={errors.state}/>
              <Input label="City"
                value={form.city}
                onChange={(v)=>update("city",v)} error={errors.city}/>
              <Input label="Pincode"
                value={form.pincode}
                onChange={(v)=>update("pincode",v)} error={errors.pincode}/>
              <Input full label="Full Address"
                value={form.fullAddress}
                onChange={(v)=>update("fullAddress",v)} error={errors.fullAddress}/>
            </Grid>
          </Section>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <Section title="Education Details" footer={<Nav back={back} next={next}/>}>
            <h3 className="font-semibold mb-4">10th Standard</h3>
            <Grid>
              <Select label="Board" options={BOARDS}
                value={form.tenthBoard}
                onChange={(v)=>update("tenthBoard",v)}/>
              <Select label="Year" options={YEARS}
                value={form.tenthYear}
                onChange={(v)=>update("tenthYear",v)}/>
              <Input label="Marks Obtained"
                value={form.tenthMarksObtained}
                onChange={(v)=> onlyDigits(v)&&update("tenthMarksObtained",v)}
                error={errors.tenthMarksObtained}/>
              <Input label="Total Marks"
                value={form.tenthTotalMarks}
                onChange={(v)=> onlyDigits(v)&&update("tenthTotalMarks",v)}
                error={errors.tenthTotalMarks}/>
              <Input label="Percentage"
                value={calculatePercentage(form.tenthMarksObtained,form.tenthTotalMarks)}
                disabled/>
            </Grid>

            <h3 className="font-semibold mt-8 mb-4">12th Standard</h3>
            <Grid>
              <Select label="Board" options={BOARDS}
                value={form.twelfthBoard}
                onChange={(v)=>update("twelfthBoard",v)}/>
              <Select label="Year" options={YEARS}
                value={form.twelfthYear}
                onChange={(v)=>update("twelfthYear",v)}/>
              <Input label="Marks Obtained"
                value={form.twelfthMarksObtained}
                onChange={(v)=> onlyDigits(v)&&update("twelfthMarksObtained",v)}
                error={errors.twelfthMarksObtained}/>
              <Input label="Total Marks"
                value={form.twelfthTotalMarks}
                onChange={(v)=> onlyDigits(v)&&update("twelfthTotalMarks",v)}
                error={errors.twelfthTotalMarks}/>
              <Input label="Percentage"
                value={calculatePercentage(form.twelfthMarksObtained,form.twelfthTotalMarks)}
                disabled/>
            </Grid>
          </Section>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <Section title="Documents Upload" footer={<Nav back={back} next={next}/>}>
            <Grid>
              <FileUpload label="Passport Size Photo"
                onFile={(f)=>setDocuments({...documents,passportPhoto:f})}
                error={errors.passportPhoto}/>
              <FileUpload label="Signature"
                onFile={(f)=>setDocuments({...documents,signature:f})}
                error={errors.signature}/>
              <FileUpload label="Aadhaar Card"
                onFile={(f)=>setDocuments({...documents,aadhaarCard:f})}
                error={errors.aadhaarCard}/>
              <FileUpload label="10th Marksheet"
                onFile={(f)=>setDocuments({...documents,tenthMarksheet:f})}
                error={errors.tenthMarksheet}/>
              <FileUpload label="12th Marksheet"
                onFile={(f)=>setDocuments({...documents,twelfthMarksheet:f})}
                error={errors.twelfthMarksheet}/>
            </Grid>
          </Section>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <Section title="Apply to Colleges" footer={<Nav back={back} next={next}/>}>
            <ApplyCollegeStep
              selectedColleges={selectedColleges}
              setSelectedColleges={setSelectedColleges}
              error={errors.apply}
            />
          </Section>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <Section title="Declaration"
            footer={
              <div className="flex gap-3">
                <button onClick={back}
                  className="px-6 py-2 bg-gray-200 rounded-xl">
                  Back
                </button>

                <button onClick={submitFinal}
                  disabled={submitting}
                  className="px-6 py-2 bg-green-600 text-white rounded-xl">
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            }>

            <label className="flex items-center gap-2">
              <input type="checkbox"
                checked={form.declarationAccepted}
                onChange={(e)=>update("declarationAccepted",e.target.checked)}/>
              I confirm all details are correct
            </label>

            {errors.declaration &&
              <p className="text-red-500 text-sm mt-2">
                {errors.declaration}
              </p>}

            {showSuccessPopup && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-96">
                  <div className="text-green-600 text-5xl mb-4">✓</div>
                  <h2 className="text-xl font-semibold mb-2">
                    Application Submitted Successfully
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Redirecting to Applications...
                  </p>
                </div>
              </div>
            )}
          </Section>
        )}

      </div>
    </AgentLayout>
  );
}

/* ================= APPLY COLLEGE STEP ================= */

function ApplyCollegeStep({ selectedColleges, setSelectedColleges, error }) {

  const [options, setOptions] = useState([]);

  useEffect(() => {

    const loadOptions = async () => {

      try {

        const res = await getApplyOptions();

        console.log("STEP4 RESPONSE:", res.data);

        const list = [];

        res.data.forEach((college) => {

          if (!college.courses) return;

          college.courses.forEach((course) => {

            list.push({
              collegeId: college.collegeId,
              collegeName: college.collegeName,
              city: college.city,
              state: college.state,

              courseId: course.courseId,
              courseName: course.courseName,
              seatsAvailable: course.seatsAvailable,
              totalSeats: course.totalSeats
            });

          });

        });

        setOptions(list);

      } catch (err) {

        console.error("STEP4 LOAD ERROR:", err);

      }

    };

    loadOptions();

  }, []);

  const isSelected = (courseId) =>
    selectedColleges.some((s) => s.courseId === courseId);

  const toggleCollege = (item) => {

    if (isSelected(item.courseId)) {

      setSelectedColleges((prev) =>
        prev.filter((s) => s.courseId !== item.courseId)
      );

    } else {

      setSelectedColleges((prev) => [...prev, item]);

    }

  };

  return (

    <div className="space-y-4">

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {options.length === 0 && (
        <p className="text-gray-400 text-sm">
          No partner colleges available
        </p>
      )}

      {options.map((opt) => {

        const selected = isSelected(opt.courseId);

        return (

          <div
            key={opt.courseId}
            className={`flex justify-between items-center p-4 border rounded-xl shadow-sm
            ${selected ? "bg-indigo-50 border-indigo-400" : "bg-white"}`}
          >

            <div>

              <p className="font-semibold text-gray-800">
                {opt.collegeName}
              </p>

              <p className="text-sm text-gray-600">
                {opt.courseName}
              </p>

              <p className="text-xs text-gray-400">
                {opt.city}, {opt.state}
              </p>

              <p className="text-xs text-gray-400">
                Seats: {opt.seatsAvailable} / {opt.totalSeats}
              </p>

            </div>

            <button
              onClick={() => toggleCollege(opt)}
              className={`w-10 h-10 rounded-full flex items-center justify-center
              ${selected ? "bg-red-500 text-white" : "bg-indigo-600 text-white"}`}
            >
              {selected ? <FiMinus /> : <FiPlus />}
            </button>

          </div>

        );

      })}

    </div>

  );

}

/* ================= REUSABLE COMPONENTS ================= */
const Stepper = ({ current }) => (
  <div className="hidden sm:flex gap-6 mb-6 justify-items-start">
    {steps.map((label, i) => {
      const stepNo = i + 1;
      const isActive = stepNo === current;
      const isCompleted = stepNo < current;

      return (
        <div
          key={label}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
            ${
              isActive
                ? "bg-blue-600 text-white"
                : isCompleted
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-200 text-gray-600"
            }
          `}
        >
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-blue-600 text-xs font-bold">
            {stepNo}
          </span>
          {label}
        </div>
      );
    })}
  </div>
);

const ProgressBar = ({ totalSteps, current }) => (
  <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
    <div className="bg-indigo-600 h-3 transition-all"
      style={{ width: `${((current - 1) / (totalSteps - 1)) * 100}%` }} />
  </div>
);

const Section = ({ title, children, footer }) => (
  <div className="bg-white p-8 rounded-2xl shadow mb-6">
    <h2 className="text-xl font-semibold mb-6">{title}</h2>
    {children}
    {footer && <div className="mt-6 flex justify-end">{footer}</div>}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid md:grid-cols-2 gap-6">{children}</div>
);

const Nav = ({ back, next }) => (
  <div className="flex gap-3">
    {back &&
      <button onClick={back}
        className="px-6 py-2 bg-gray-200 rounded-xl">Back</button>}
    <button onClick={next}
      className="px-6 py-2 bg-indigo-600 text-white rounded-xl">
      Continue
    </button>
  </div>
);

const Input = ({ label, value, onChange, error, icon, type = "text", disabled }) => (
  <div>
    <label className="text-sm">{label}</label>
    <div className="relative mt-2">
      {icon &&
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>}
      <input
        type={type}
        value={value || ""}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full ${icon ? "pl-10" : "pl-4"} py-3 rounded-xl border ${
          error ? "border-red-400" : "border-gray-200"
        }`}
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="text-sm">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mt-2 py-3 px-4 rounded-xl border border-gray-200">
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

const FileUpload = ({ label, onFile, error }) => (
  <div>
    <label className="block text-sm mb-2">{label}</label>
    <input type="file" onChange={(e) => onFile(e.target.files[0])}/>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);