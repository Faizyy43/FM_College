// import { useState, useEffect } from "react";
// import { FiMail, FiPhone, FiUser } from "react-icons/fi";
// import { FaUniversity } from "react-icons/fa";

// import {
//   fetchCollegeProfile,
//   saveCollegeStep1,
//   saveCollegeStep2,
//   saveCollegeStep3,
//   saveCollegeStep4,
// } from "../services/clgProfile.api";

// import CollegeLayout from "../../../layout/CollegeLayout";

// /* ================= STEPS ================= */

// const steps = [
//   "Basic Details",
//   "College Type",
//   "Address",
//   "Documents",
// ];

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// const mobileRegex = /^[0-9]{10}$/;

// /* ================= COMPONENT ================= */

// export default function ClgProfile() {
//   const [step, setStep] = useState(1);
//   const [errors, setErrors] = useState({});

//   const [form, setForm] = useState({
//     collegeName: "",
//     authorizedPerson: "",
//     email: "",
//     mobile: "",
//     password: "",
//     collegeType: "",
//     state: "",
//     city: "",
//     pincode: "",
//     address: "",
//     registration: null,
//     approval: null,
//     logo: null,
//   });

//   /* ================= LOAD PROFILE ================= */

//   useEffect(() => {
//     fetchCollegeProfile()
//       .then((res) => {
//         const p = res.data;

//         setForm((f) => ({
//           ...f,
//           collegeName: p.collegeName || "",
//           authorizedPerson: p.authorizedPerson || "",
//           email: p.email || "",
//           mobile: p.mobile || "",
//           collegeType: p.collegeType || "",
//           state: p.state || "",
//           city: p.city || "",
//           pincode: p.pincode || "",
//           address: p.address || "",
//         }));
//       })
//       .catch(() => {});
//   }, []);

//   /* ================= HELPERS ================= */

//   const update = (key, value) => {
//     setForm((p) => ({ ...p, [key]: value }));
//     setErrors((p) => ({ ...p, [key]: "" }));
//   };

//   const handleFile = (key, file) => {
//     if (!file) return;
//     if (file.size > 2 * 1024 * 1024) {
//       setErrors((p) => ({ ...p, [key]: "File must be under 2MB" }));
//       return;
//     }
//     update(key, file);
//   };

//   /* ================= VALIDATION ================= */

//   const validate = () => {
//     const e = {};

//     if (step === 1) {
//       if (!form.collegeName) e.collegeName = "Required";
//       if (!form.authorizedPerson) e.authorizedPerson = "Required";
//       if (!emailRegex.test(form.email)) e.email = "Invalid email";
//       if (!mobileRegex.test(form.mobile)) e.mobile = "Invalid mobile";
//       if (form.password.length < 6) e.password = "Min 6 characters";
//     }

//     if (step === 2 && !form.collegeType)
//       e.collegeType = "Select college type";

//     if (step === 3) {
//       if (!form.state) e.state = "Required";
//       if (!form.city) e.city = "Required";
//       if (!form.pincode) e.pincode = "Required";
//       if (!form.address) e.address = "Required";
//     }

//     if (step === 4 && !form.registration)
//       e.registration = "Registration certificate required";

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   /* ================= STEP SAVE ================= */

//   const next = async () => {
//     if (!validate()) return;

//     try {
//       if (step === 1)
//         await saveCollegeStep1({
//           collegeName: form.collegeName,
//           authorizedPerson: form.authorizedPerson,
//           email: form.email,
//           mobile: form.mobile,
//           password: form.password,
//         });

//       if (step === 2)
//         await saveCollegeStep2({
//           collegeType: form.collegeType,
//         });

//       if (step === 3)
//         await saveCollegeStep3({
//           state: form.state,
//           city: form.city,
//           pincode: form.pincode,
//           address: form.address,
//         });

//       if (step === 4) {
//         const fd = new FormData();
//         fd.append("registration", form.registration);
//         fd.append("approval", form.approval);
//         fd.append("logo", form.logo);

//         await saveCollegeStep4(fd);
//       }

//       setStep((s) => s + 1);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const back = () => setStep((s) => s - 1);

//   /* ================= UI ================= */

//   return (
//     <CollegeLayout>
//       <Stepper current={step} />

//       <Section
//         title={steps[step - 1]}
//         footer={
//           <div className="flex gap-3">
//             {step > 1 && <Btn gray text="Back" onClick={back} />}
//             <Btn text={step === 4 ? "Save Profile" : "Continue"} onClick={next} />
//           </div>
//         }
//       >
//         {/* STEP 1 */}
//         {step === 1 && (
//           <Grid>
//             <Input label="College Name" icon={<FaUniversity />} value={form.collegeName} onChange={(v)=>update("collegeName",v)} error={errors.collegeName}/>
//             <Input label="Authorized Person" icon={<FiUser />} value={form.authorizedPerson} onChange={(v)=>update("authorizedPerson",v)} error={errors.authorizedPerson}/>
//             <Input label="Email" icon={<FiMail />} value={form.email} onChange={(v)=>update("email",v)} error={errors.email}/>
//             <Input label="Mobile" icon={<FiPhone />} value={form.mobile} onChange={(v)=>update("mobile",v)} error={errors.mobile}/>
//             <Input full type="password" label="Password" value={form.password} onChange={(v)=>update("password",v)} error={errors.password}/>
//           </Grid>
//         )}

//         {/* STEP 2 */}
//         {step === 2 && (
//           <select
//             value={form.collegeType}
//             onChange={(e)=>update("collegeType",e.target.value)}
//             className="w-full border rounded-xl px-4 py-3"
//           >
//             <option value="">Select Type</option>
//             <option>Government</option>
//             <option>Private</option>
//             <option>Deemed University</option>
//           </select>
//         )}

//         {/* STEP 3 */}
//         {step === 3 && (
//           <Grid>
//             <Input label="State" value={form.state} onChange={(v)=>update("state",v)} error={errors.state}/>
//             <Input label="City" value={form.city} onChange={(v)=>update("city",v)} error={errors.city}/>
//             <Input label="Pincode" value={form.pincode} onChange={(v)=>update("pincode",v)} error={errors.pincode}/>
//             <Input full label="Address" value={form.address} onChange={(v)=>update("address",v)} error={errors.address}/>
//           </Grid>
//         )}

//         {/* STEP 4 - INLINE DOCUMENTS */}
//         {step === 4 && (
//           <div className="grid md:grid-cols-2 gap-6">
//             <DocUpload label="Registration Certificate" file={form.registration} error={errors.registration} onChange={(f)=>handleFile("registration",f)} />
//             <DocUpload label="Approval Certificate" file={form.approval} onChange={(f)=>handleFile("approval",f)} />
//             <DocUpload label="College Logo" file={form.logo} imageOnly onChange={(f)=>handleFile("logo",f)} />
//           </div>
//         )}
//       </Section>
//     </CollegeLayout>
//   );
// }


// /* ================= UI HELPERS ================= */

// const baseField = `
// w-full h-[54px] rounded-xl
// bg-white
// px-5 border border-gray-200
// shadow-sm transition-all duration-300
// focus:border-blue-500
// focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]
// focus:outline-none
// hover:border-blue-300
// `;

// /* ===== Section Wrapper ===== */

// const Section = ({ title, children, footer }) => (
//   <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
//     <h2 className="mb-6 text-xl font-semibold text-gray-800">
//       {title}
//     </h2>

//     {children}

//     {footer && (
//       <div className="mt-8 flex justify-end">
//         {footer}
//       </div>
//     )}
//   </div>
// );

// /* ===== Grid ===== */

// const Grid = ({ children }) => (
//   <div className="grid md:grid-cols-2 gap-6">
//     {children}
//   </div>
// );

// /* ===== Button ===== */

// const Btn = ({ text, onClick, gray }) => (
//   <button
//     onClick={onClick}
//     className={`px-7 py-2.5 rounded-lg font-medium transition-all duration-300
//     ${
//       gray
//         ? "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
//         : "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
//     }`}
//   >
//     {text}
//   </button>
// );

// /* ===== Input ===== */

// const Input = ({
//   label,
//   icon,
//   value,
//   onChange,
//   error,
//   type = "text",
//   full,
// }) => (
//   <div className={full ? "md:col-span-2" : ""}>
//     <label className="text-sm font-medium text-gray-600">
//       {label}
//     </label>

//     <div className="relative mt-2">
//       {icon && (
//         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
//           {icon}
//         </span>
//       )}

//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className={`${baseField} ${icon ? "pl-12" : ""}`}
//       />
//     </div>

//     {error && <Error text={error} />}
//   </div>
// );

// /* ===== Document Upload ===== */

// const DocUpload = ({
//   label,
//   file,
//   onChange,
//   error,
//   imageOnly,
// }) => (
//   <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
//     <label className="block text-sm font-medium text-gray-600 mb-2">
//       {label}
//     </label>

//     <div className="flex items-center gap-4">
//       <input
//         type="file"
//         accept={imageOnly ? "image/*" : "image/*,.pdf"}
//         onChange={(e) => onChange(e.target.files[0])}
//         className="text-sm file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer"
//       />

//       {file && (
//         <span className="text-xs text-green-600 font-medium">
//           ✔ {file.name}
//         </span>
//       )}
//     </div>

//     {error && <Error text={error} />}
//   </div>
// );

// /* ===== Error ===== */

// const Error = ({ text }) => (
//   <p className="text-red-500 text-xs mt-1">
//     {text}
//   </p>
// );

// /* ===== Stepper ===== */

// const Stepper = ({ current }) => (
//   <div className="hidden sm:flex gap-6 mb-6 justify-items-start">
//     {steps.map((label, i) => {
//       const stepNo = i + 1;
//       const isActive = stepNo === current;
//       const isCompleted = stepNo < current;

//       return (
//         <div
//           key={label}
//           className={`
//             flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
//             ${
//               isActive
//                 ? "bg-blue-600 text-white"
//                 : isCompleted
//                 ? "bg-blue-100 text-blue-700"
//                 : "bg-gray-200 text-gray-600"
//             }
//           `}
//         >
//           <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-blue-600 text-xs font-bold">
//             {stepNo}
//           </span>
//           {label}
//         </div>
//       );
//     })}
//   </div>
// );



//////////////////////////////////////////////////////////////




import { useState, useEffect } from "react";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";
import { FaUniversity } from "react-icons/fa";

import {
  fetchCollegeProfile,
  saveCollegeStep1,
  saveCollegeStep2,
  saveCollegeStep3,
  saveCollegeStep4,
  saveCollegeStep5,   // ✅ ADDED
} from "../services/clgProfile.api";

import CollegeLayout from "../../../layout/CollegeLayout";

/* ================= STEPS ================= */

const steps = [
  "Basic Details",
  "College Type",
  "Address",
  "Documents",
  "Submit", // ✅ ADDED
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const mobileRegex = /^[0-9]{10}$/;

/* ================= COMPONENT ================= */

export default function ClgProfile() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    collegeName: "",
    authorizedPerson: "",
    email: "",
    mobile: "",
    password: "",
    collegeType: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    registration: null,
    approval: null,
    logo: null,

    // ✅ Step 5
    infoCorrect: false,
    agreePolicy: false,
    acceptTerms: false,
  });

  /* ================= LOAD PROFILE ================= */

  useEffect(() => {
    fetchCollegeProfile()
      .then((res) => {
        const p = res.data || {};

        setForm((f) => ({
          ...f,
          collegeName: p.collegeName || "",
          authorizedPerson: p.authorizedPerson || "",
          email: p.email || "",
          mobile: p.mobile || "",
          collegeType: p.collegeType || "",
          state: p.address?.state || "",
          city: p.address?.city || "",
          pincode: p.address?.pincode || "",
          address: p.address?.address || "",
        }));
      })
      .catch(() => {});
  }, []);

  /* ================= HELPERS ================= */

  const update = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: "" }));
  };

  const handleFile = (key, file) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setErrors((p) => ({ ...p, [key]: "File must be under 2MB" }));
      return;
    }
    update(key, file);
  };

  /* ================= VALIDATION ================= */

  const validate = () => {
    const e = {};

    if (step === 1) {
      if (!form.collegeName) e.collegeName = "Required";
      if (!form.authorizedPerson) e.authorizedPerson = "Required";
      if (!emailRegex.test(form.email)) e.email = "Invalid email";
      if (!mobileRegex.test(form.mobile)) e.mobile = "Invalid mobile";
      if (form.password.length < 6) e.password = "Min 6 characters";
    }

    if (step === 2 && !form.collegeType)
      e.collegeType = "Select college type";

    if (step === 3) {
      if (!form.state) e.state = "Required";
      if (!form.city) e.city = "Required";
      if (!form.pincode) e.pincode = "Required";
      if (!form.address) e.address = "Required";
    }

    if (step === 4 && !form.registration)
      e.registration = "Registration certificate required";

    if (step === 5) {
      if (!form.infoCorrect) e.infoCorrect = "Required";
      if (!form.agreePolicy) e.agreePolicy = "Required";
      if (!form.acceptTerms) e.acceptTerms = "Required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ================= STEP SAVE ================= */

  const next = async () => {
    if (!validate()) return;

    try {
      if (step === 1)
        await saveCollegeStep1({
          collegeName: form.collegeName,
          authorizedPerson: form.authorizedPerson,
          email: form.email,
          mobile: form.mobile,
        });

      if (step === 2)
        await saveCollegeStep2({
          collegeType: form.collegeType,
        });

      if (step === 3)
        await saveCollegeStep3({
          state: form.state,
          city: form.city,
          pincode: form.pincode,
          address: form.address,
        });

      if (step === 4) {
        const fd = new FormData();
        if (form.registration) fd.append("registration", form.registration);
        if (form.approval) fd.append("approval", form.approval);
        if (form.logo) fd.append("logo", form.logo);

        await saveCollegeStep4(fd);
      }

      if (step === 5)
        await saveCollegeStep5({
          infoCorrect: form.infoCorrect,
          agreePolicy: form.agreePolicy,
          acceptTerms: form.acceptTerms,
        });

      if (step < 5) {
        setStep((s) => s + 1);
      }

    } catch (err) {
      console.error(err);
    }
  };

  const back = () => setStep((s) => s - 1);

  /* ================= UI ================= */

  return (
    <CollegeLayout>
      <Stepper current={step} />

      <Section
        title={steps[step - 1]}
        footer={
          <div className="flex gap-3">
            {step > 1 && <Btn gray text="Back" onClick={back} />}
            <Btn
              text={step === 5 ? "Submit Profile" : "Continue"}
              onClick={next}
            />
          </div>
        }
      >
        {/* STEP 1 */}
        {step === 1 && (
          <Grid>
            <Input label="College Name" icon={<FaUniversity />} value={form.collegeName} onChange={(v)=>update("collegeName",v)} error={errors.collegeName}/>
            <Input label="Authorized Person" icon={<FiUser />} value={form.authorizedPerson} onChange={(v)=>update("authorizedPerson",v)} error={errors.authorizedPerson}/>
            <Input label="Email" icon={<FiMail />} value={form.email} onChange={(v)=>update("email",v)} error={errors.email}/>
            <Input label="Mobile" icon={<FiPhone />} value={form.mobile} onChange={(v)=>update("mobile",v)} error={errors.mobile}/>
            <Input full type="password" label="Password" value={form.password} onChange={(v)=>update("password",v)} error={errors.password}/>
          </Grid>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <select
            value={form.collegeType}
            onChange={(e)=>update("collegeType",e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="">Select Type</option>
            <option>Government</option>
            <option>Private</option>
            <option>Deemed University</option>
          </select>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <Grid>
            <Input label="State" value={form.state} onChange={(v)=>update("state",v)} error={errors.state}/>
            <Input label="City" value={form.city} onChange={(v)=>update("city",v)} error={errors.city}/>
            <Input label="Pincode" value={form.pincode} onChange={(v)=>update("pincode",v)} error={errors.pincode}/>
            <Input full label="Address" value={form.address} onChange={(v)=>update("address",v)} error={errors.address}/>
          </Grid>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="grid md:grid-cols-2 gap-6">
            <DocUpload label="Registration Certificate" file={form.registration} error={errors.registration} onChange={(f)=>handleFile("registration",f)} />
            <DocUpload label="Approval Certificate" file={form.approval} onChange={(f)=>handleFile("approval",f)} />
            <DocUpload label="College Logo" file={form.logo} imageOnly onChange={(f)=>handleFile("logo",f)} />
          </div>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.infoCorrect} onChange={(e)=>update("infoCorrect",e.target.checked)} />
              I confirm that all information is correct
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.agreePolicy} onChange={(e)=>update("agreePolicy",e.target.checked)} />
              I agree to platform policy
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.acceptTerms} onChange={(e)=>update("acceptTerms",e.target.checked)} />
              I accept terms & conditions
            </label>

            {(errors.infoCorrect || errors.agreePolicy || errors.acceptTerms) && (
              <p className="text-red-500 text-xs">
                Please accept all declarations
              </p>
            )}
          </div>
        )}
      </Section>
    </CollegeLayout>
  );
}

/* ================= UI HELPERS ================= */

const baseField = `
w-full h-[54px] rounded-xl
bg-white
px-5 border border-gray-200
shadow-sm transition-all duration-300
focus:border-blue-500
focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]
focus:outline-none
hover:border-blue-300
`;

/* ===== Section Wrapper ===== */

const Section = ({ title, children, footer }) => (
  <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
    <h2 className="mb-6 text-xl font-semibold text-gray-800">
      {title}
    </h2>

    {children}

    {footer && (
      <div className="mt-8 flex justify-end">
        {footer}
      </div>
    )}
  </div>
);

/* ===== Grid ===== */

const Grid = ({ children }) => (
  <div className="grid md:grid-cols-2 gap-6">
    {children}
  </div>
);

/* ===== Button ===== */

const Btn = ({ text, onClick, gray }) => (
  <button
    onClick={onClick}
    className={`px-7 py-2.5 rounded-lg font-medium transition-all duration-300
    ${
      gray
        ? "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
        : "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
    }`}
  >
    {text}
  </button>
);

/* ===== Input ===== */

const Input = ({
  label,
  icon,
  value,
  onChange,
  error,
  type = "text",
  full,
}) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label className="text-sm font-medium text-gray-600">
      {label}
    </label>

    <div className="relative mt-2">
      {icon && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
          {icon}
        </span>
      )}

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${baseField} ${icon ? "pl-12" : ""}`}
      />
    </div>

    {error && <Error text={error} />}
  </div>
);

/* ===== Document Upload ===== */

const DocUpload = ({
  label,
  file,
  onChange,
  error,
  imageOnly,
}) => (
  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
    <label className="block text-sm font-medium text-gray-600 mb-2">
      {label}
    </label>

    <div className="flex items-center gap-4">
      <input
        type="file"
        accept={imageOnly ? "image/*" : "image/*,.pdf"}
        onChange={(e) => onChange(e.target.files[0])}
        className="text-sm file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer"
      />

      {file && (
        <span className="text-xs text-green-600 font-medium">
          ✔ {file.name}
        </span>
      )}
    </div>

    {error && <Error text={error} />}
  </div>
);

/* ===== Error ===== */

const Error = ({ text }) => (
  <p className="text-red-500 text-xs mt-1">
    {text}
  </p>
);

/* ===== Stepper ===== */

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
