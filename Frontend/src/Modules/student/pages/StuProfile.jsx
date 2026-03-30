// import { useState, useEffect } from "react";
// import { FiMail, FiPhone, FiUser, FiMapPin } from "react-icons/fi";
// import StudentLayout from "../../../layout/StudentLayout";
// import {
//   fetchProfile,
//   saveStep1,
//   saveStep2,
//   saveStep3,
//   saveStep4,
//   saveStep5,
// } from "../services/stuProfile.api";

// /* ================= STEPS ================= */

// const steps = [
//   "Basic Details",
//   "Address",
//   "Education",
//   "Documents",
//   "Declarations",
// ];

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// const mobileRegex = /^[0-9]{10}$/;

// /* ================= COMPONENT ================= */

// export default function StuProfile() {
//   const [step, setStep] = useState(1);
//   const [errors, setErrors] = useState({});

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//     state: "",
//     city: "",
//     pincode: "",
//     address: "",
//     graduationCollege: "",
//     graduationYear: "",
//     consent: false,
//   });

//   const [documents, setDocuments] = useState({
//     tenth: null,
//     twelfth: null,
//     aadhaar: null,
//     photo: null,
//   });

//   /* ================= LOAD PROFILE ================= */

//   useEffect(() => {
//     fetchProfile()
//       .then((res) => {
//         if (!res.data) return;
//         setForm((prev) => ({ ...prev, ...res.data }));
//       })
//       .catch(() => {});
//   }, []);

//   /* ================= HELPERS ================= */

//   const update = (k, v) => {
//     setForm((p) => ({ ...p, [k]: v }));
//     setErrors((p) => ({ ...p, [k]: "" }));
//   };

//   const handleFile = (key, file) => {
//     if (!file) return;
//     if (file.size > 2 * 1024 * 1024) {
//       setErrors((p) => ({ ...p, [key]: "File must be under 2MB" }));
//       return;
//     }
//     setDocuments((p) => ({ ...p, [key]: file }));
//   };

//   /* ================= VALIDATION ================= */

//   const validate = () => {
//     const e = {};

//     if (step === 1) {
//       if (!form.name) e.name = "Required";
//       if (!emailRegex.test(form.email)) e.email = "Invalid email";
//       if (!mobileRegex.test(form.mobile)) e.mobile = "Invalid mobile";
//       if (form.password.length < 6) e.password = "Min 6 characters";
//     }

//     if (step === 2) {
//       if (!form.state) e.state = "Required";
//       if (!form.city) e.city = "Required";
//       if (!form.pincode) e.pincode = "Required";
//       if (!form.address) e.address = "Required";
//     }

//     if (step === 3) {
//       if (!form.graduationCollege)
//         e.graduationCollege = "Required";
//     }

//     if (step === 4) {
//       if (!documents.tenth) e.tenth = "10th required";
//       if (!documents.twelfth) e.twelfth = "12th required";
//     }

//     if (step === 5 && !form.consent)
//       e.declaration = "Accept declaration";

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   /* ================= NEXT ================= */

//   const next = async () => {
//     if (!validate()) return;

//     try {
//       if (step === 1)
//         await saveStep1({
//           name: form.name,
//           email: form.email,
//           mobile: form.mobile,
//           password: form.password,
//         });

//       if (step === 2)
//         await saveStep2({
//           state: form.state,
//           city: form.city,
//           pincode: form.pincode,
//           address: form.address,
//         });

//       if (step === 3)
//         await saveStep3({
//           graduationCollege: form.graduationCollege,
//           graduationYear: form.graduationYear,
//         });

//       if (step === 4) {
//         const fd = new FormData();
//         Object.entries(documents).forEach(
//           ([k, v]) => v && fd.append(k, v)
//         );
//         await saveStep4(fd);
//       }

//       if (step === 5) {
//         await saveStep5({ consent: true });
//         return;
//       }

//       setStep((s) => s + 1);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const back = () => setStep((s) => s - 1);

//   /* ================= UI ================= */

//   return (
//     <StudentLayout>
//       <div className="space-y-10">

//         <Stepper current={step} />

//         {/* Progress Bar */}
//         <div>
//           <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
//             <div
//               className="bg-blue-600 h-3 transition-all duration-500"
//               style={{ width: `${(step - 1) * (100 / 5)}%` }}
//             />
//           </div>
//           <p className="text-right text-xs text-gray-500 mt-1">
//             {(step - 1) * (100 / 5)}% Completed
//           </p>
//         </div>

//         {/* Section Card */}
//         <Section
//           title={steps[step - 1]}
//           footer={
//             step === 5 ? (
//               <Btn text="Submit Profile" onClick={next} />
//             ) : (
//               <Nav
//                 back={step > 1 ? back : undefined}
//                 next={next}
//               />
//             )
//           }
//         >

//           {/* STEP 1 */}
//           {step === 1 && (
//             <Grid>
//               <Input
//                 label="Full Name"
//                 icon={<FiUser />}
//                 value={form.name}
//                 onChange={(v) => update("name", v)}
//                 error={errors.name}
//               />
//               <Input
//                 label="Email"
//                 icon={<FiMail />}
//                 value={form.email}
//                 onChange={(v) => update("email", v)}
//                 error={errors.email}
//               />
//               <Input
//                 label="Mobile"
//                 icon={<FiPhone />}
//                 value={form.mobile}
//                 onChange={(v) => update("mobile", v)}
//                 error={errors.mobile}
//               />
//               <Input
//                 label="Password"
//                 type="password"
//                 icon={<FiUser />}
//                 value={form.password}
//                 onChange={(v) => update("password", v)}
//                 error={errors.password}
//               />
//             </Grid>
//           )}

//           {/* STEP 2 */}
//           {step === 2 && (
//             <Grid>
//               <Input
//                 label="State"
//                 icon={<FiMapPin />}
//                 value={form.state}
//                 onChange={(v) => update("state", v)}
//                 error={errors.state}
//               />
//               <Input
//                 label="City"
//                 icon={<FiMapPin />}
//                 value={form.city}
//                 onChange={(v) => update("city", v)}
//                 error={errors.city}
//               />
//               <Input
//                 label="Pincode"
//                 icon={<FiMapPin />}
//                 value={form.pincode}
//                 onChange={(v) => update("pincode", v)}
//                 error={errors.pincode}
//               />
//               <Input
//                 label="Address"
//                 icon={<FiMapPin />}
//                 value={form.address}
//                 onChange={(v) => update("address", v)}
//                 error={errors.address}
//               />
//             </Grid>
//           )}

//           {/* STEP 3 */}
//           {step === 3 && (
//             <Grid>
//               <Input
//                 label="Graduation College"
//                 value={form.graduationCollege}
//                 onChange={(v) => update("graduationCollege", v)}
//                 error={errors.graduationCollege}
//               />
//               <Input
//                 label="Graduation Year"
//                 value={form.graduationYear}
//                 onChange={(v) => update("graduationYear", v)}
//               />
//             </Grid>
//           )}

//           {/* STEP 4 */}
//           {step === 4 && (
//             <div className="grid md:grid-cols-2 gap-6">
//               <DocUpload label="10th Marksheet" onChange={(f)=>handleFile("tenth",f)} error={errors.tenth}/>
//               <DocUpload label="12th Marksheet" onChange={(f)=>handleFile("twelfth",f)} error={errors.twelfth}/>
//               <DocUpload label="Aadhaar" onChange={(f)=>handleFile("aadhaar",f)} />
//               <DocUpload label="Passport Photo" onChange={(f)=>handleFile("photo",f)} />
//             </div>
//           )}

//           {/* STEP 5 */}
//           {step === 5 && (
//             <div className="space-y-4">
//               <label className="flex gap-2 items-center">
//                 <input
//                   type="checkbox"
//                   checked={form.consent}
//                   onChange={(e) =>
//                     update("consent", e.target.checked)
//                   }
//                 />
//                 I confirm that all information provided is correct
//               </label>
//               {errors.declaration && (
//                 <Error text={errors.declaration} />
//               )}
//             </div>
//           )}

//         </Section>
//       </div>
//     </StudentLayout>
//   );
// }

// /* ================= UI HELPERS ================= */

// const baseField = `
// w-full h-[54px] rounded-xl bg-white px-5 border border-gray-200 shadow-sm
// transition-all duration-300
// focus:border-blue-500
// focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]
// focus:outline-none
// hover:border-blue-300
// `;

// const Section = ({ title, children, footer }) => (
//   <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
//     <h2 className="mb-6 text-xl font-semibold text-gray-800">{title}</h2>
//     {children}
//     {footer && <div className="mt-8 flex justify-end">{footer}</div>}
//   </div>
// );

// const Grid = ({ children }) => (
//   <div className="grid md:grid-cols-2 gap-6">{children}</div>
// );

// const Btn = ({ text, onClick, gray }) => (
//   <button
//     onClick={onClick}
//     className={`px-7 py-2.5 rounded-lg font-medium transition-all duration-300
// ${
//   gray
//     ? "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
//     : "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
// }`}
//   >
//     {text}
//   </button>
// );

// const Nav = ({ back, next }) => (
//   <div className="flex gap-3">
//     {back && <Btn gray text="Back" onClick={back} />}
//     <Btn text="Continue" onClick={next} />
//   </div>
// );

// const Input = ({ label, icon, value, onChange, error, type = "text" }) => (
//   <div>
//     <label className="text-sm font-medium text-gray-600">{label}</label>
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

// const DocUpload = ({ label, onChange, error }) => (
//   <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
//     <label className="block text-sm font-medium text-gray-600 mb-2">
//       {label}
//     </label>
//     <input
//       type="file"
//       onChange={(e) => onChange(e.target.files[0])}
//       className="text-sm"
//     />
//     {error && <Error text={error} />}
//   </div>
// );

// const Error = ({ text }) => (
//   <p className="text-red-500 text-xs mt-1">{text}</p>
// );

// const Stepper = ({ current }) => (
//   <div className="hidden sm:flex gap-6 mb-6">
//     {steps.map((label, i) => {
//       const stepNo = i + 1;
//       const isActive = stepNo === current;
//       const isCompleted = stepNo < current;

//       return (
//         <div
//           key={label}
//           className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
//           ${
//             isActive
//               ? "bg-blue-600 text-white"
//               : isCompleted
//               ? "bg-blue-100 text-blue-700"
//               : "bg-gray-200 text-gray-600"
//           }`}
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


/////////////////////////////////////////////////////////



import { useState, useEffect } from "react";
import { FiMail, FiPhone, FiUser, FiMapPin } from "react-icons/fi";
import StudentLayout from "../../../layout/StudentLayout";
import {
  fetchProfile,
  saveStep1,
  saveStep2,
  saveStep3,
  saveStep4,
  saveStep5,
} from "../services/stuProfile.api";

/* ================= STEPS ================= */

const steps = [
  "Basic Details",
  "Address",
  "Education",
  "Documents",
  "Declarations",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const mobileRegex = /^[0-9]{10}$/;

export default function StuProfile() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [documents, setDocuments] = useState()

 const [form, setForm] = useState({
  fullName: "",
  email: "",
  mobile: "",
  dateOfBirth: "",

  state: "",
  city: "",
  pincode: "",
  fullAddress: "",

  // Graduation
  graduationCollegeName: "",
  graduationYear: "",
  graduationPercentage: "",

  // Class 12
  class12Board: "",
  class12Year: "",
  class12Percentage: "",

  // Class 10
  class10Board: "",
  class10Year: "",
  class10Percentage: "",

  consent: false,
});

  /* ================= LOAD PROFILE ================= */

 useEffect(() => {
  fetchProfile()
    .then((res) => {
      const data = res.data;
      if (!data) return;

      setForm({
        fullName: data.fullName || "",
        email: data.email || "",
        mobile: data.mobile || "",
        dateOfBirth: data.dateOfBirth || "",

        state: data.address?.state || "",
        city: data.address?.city || "",
        pincode: data.address?.pincode || "",
        fullAddress: data.address?.fullAddress || "",

       graduationCollegeName:
  data.education?.graduation?.collegeName || "",
graduationYear:
  data.education?.graduation?.year || "",
graduationPercentage:
  data.education?.graduation?.percentage || "",

class12Board:
  data.education?.class12?.board || "",
class12Year:
  data.education?.class12?.year || "",
class12Percentage:
  data.education?.class12?.percentage || "",

class10Board:
  data.education?.class10?.board || "",
class10Year:
  data.education?.class10?.year || "",
class10Percentage:
  data.education?.class10?.percentage || "",

        consent: data.consent?.infoCorrect || false,
      });
    })
    .catch((err) => console.log(err));
}, []);

  /* ================= HELPERS ================= */

  const update = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };

  const handleFile = (key, file) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setErrors((p) => ({ ...p, [key]: "File must be under 2MB" }));
      return;
    }
    setDocuments((p) => ({ ...p, [key]: file }));
  };

  /* ================= VALIDATION ================= */

  const validate = () => {
    const e = {};

    if (step === 1) {
      if (!form.fullName) e.fullName = "Required";
      if (!emailRegex.test(form.email)) e.email = "Invalid email";
      if (!mobileRegex.test(form.mobile)) e.mobile = "Invalid mobile";
    }

    if (step === 2) {
      if (!form.state) e.state = "Required";
      if (!form.city) e.city = "Required";
      if (!form.pincode) e.pincode = "Required";
      if (!form.fullAddress) e.fullAddress = "Required";
    }

    if (step === 3) {
      if (!form.graduationCollegeName)
        e.graduationCollegeName = "Required";
    }

    if (step === 4) {
      if (!documents.tenthMarksheet)
        e.tenthMarksheet = "10th required";
      if (!documents.twelfthMarksheet)
        e.twelfthMarksheet = "12th required";
    }

    if (step === 5 && !form.consent)
      e.declaration = "Accept declaration";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ================= NEXT ================= */

  const next = async () => {
    if (!validate()) return;

    try {
      if (step === 1)
        await saveStep1({
          fullName: form.fullName,
          email: form.email,
          mobile: form.mobile,
          dateOfBirth: form.dateOfBirth,
        });

      if (step === 2)
        await saveStep2({
          state: form.state,
          city: form.city,
          pincode: form.pincode,
          fullAddress: form.fullAddress,
        });

    if (step === 3)
  await saveStep3({
    graduation: {
      collegeName: form.graduationCollegeName,
      year: form.graduationYear,
      percentage: form.graduationPercentage,
    },
    class12: {
      board: form.class12Board,
      year: form.class12Year,
      percentage: form.class12Percentage,
    },
    class10: {
      board: form.class10Board,
      year: form.class10Year,
      percentage: form.class10Percentage,
    },
  });

      if (step === 4) {
        const fd = new FormData();
        Object.entries(documents).forEach(
          ([k, v]) => v && fd.append(k, v)
        );
        await saveStep4(fd);
      }

      if (step === 5) {
        await saveStep5({
          infoCorrect: true,
          whatsappConsent: false,
        });
        return;
      }

      setStep((s) => s + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const back = () => setStep((s) => s - 1);

  /* ================= UI ================= */

  return (
    <StudentLayout>
      <div className="space-y-10">
        <Stepper current={step} />

        {/* Progress Bar */}
        <div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="bg-blue-600 h-3 transition-all duration-500"
              style={{ width: `${(step - 1) * (100 / 5)}%` }}
            />
          </div>
          <p className="text-right text-xs text-gray-500 mt-1">
            {(step - 1) * (100 / 5)}% Completed
          </p>
        </div>

        <Section
          title={steps[step - 1]}
          footer={
            step === 5 ? (
              <Btn text="Submit Profile" onClick={next} />
            ) : (
              <Nav
                back={step > 1 ? back : undefined}
                next={next}
              />
            )
          }
        >
          {/* STEP 1 */}
          {step === 1 && (
            <Grid>
              <Input
                label="Full Name"
                icon={<FiUser />}
                value={form.fullName}
                onChange={(v) => update("fullName", v)}
                error={errors.fullName}
              />
              <Input
                label="Email"
                icon={<FiMail />}
                value={form.email}
                onChange={(v) => update("email", v)}
                error={errors.email}
              />
              <Input
                label="Mobile"
                icon={<FiPhone />}
                value={form.mobile}
                onChange={(v) => update("mobile", v)}
                error={errors.mobile}
              />
              <Input
                label="Date of Birth"
                type="date"
                value={form.dateOfBirth}
                onChange={(v) => update("dateOfBirth", v)}
              />
            </Grid>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <Grid>
              <Input label="State" value={form.state}
                onChange={(v)=>update("state",v)}
                error={errors.state}/>
              <Input label="City" value={form.city}
                onChange={(v)=>update("city",v)}
                error={errors.city}/>
              <Input label="Pincode" value={form.pincode}
                onChange={(v)=>update("pincode",v)}
                error={errors.pincode}/>
              <Input label="Full Address"
                value={form.fullAddress}
                onChange={(v)=>update("fullAddress",v)}
                error={errors.fullAddress}/>
            </Grid>
          )}

         {/* STEP 3 */}
{step === 3 && (
  <div className="space-y-8">

    {/* Graduation */}
    <div>
      <h3 className="text-md font-semibold text-gray-700 mb-4">
        Graduation Details
      </h3>
      <Grid>
        <Input
          label="College Name"
          value={form.graduationCollegeName}
          onChange={(v)=>update("graduationCollegeName",v)}
        />
        <Input
          label="Year"
          value={form.graduationYear}
          onChange={(v)=>update("graduationYear",v)}
        />
        <Input
          label="Percentage"
          value={form.graduationPercentage}
          onChange={(v)=>update("graduationPercentage",v)}
        />
      </Grid>
    </div>

    {/* Class 12 */}
    <div>
      <h3 className="text-md font-semibold text-gray-700 mb-4">
        Class 12 Details
      </h3>
      <Grid>
        <Input
          label="Board"
          value={form.class12Board}
          onChange={(v)=>update("class12Board",v)}
        />
        <Input
          label="Year"
          value={form.class12Year}
          onChange={(v)=>update("class12Year",v)}
        />
        <Input
          label="Percentage"
          value={form.class12Percentage}
          onChange={(v)=>update("class12Percentage",v)}
        />
      </Grid>
    </div>

    {/* Class 10 */}
    <div>
      <h3 className="text-md font-semibold text-gray-700 mb-4">
        Class 10 Details
      </h3>
      <Grid>
        <Input
          label="Board"
          value={form.class10Board}
          onChange={(v)=>update("class10Board",v)}
        />
        <Input
          label="Year"
          value={form.class10Year}
          onChange={(v)=>update("class10Year",v)}
        />
        <Input
          label="Percentage"
          value={form.class10Percentage}
          onChange={(v)=>update("class10Percentage",v)}
        />
      </Grid>
    </div>

  </div>
)}
          {/* STEP 4 */}
          {step === 4 && (
            <div className="grid md:grid-cols-2 gap-6">
              <DocUpload label="10th Marksheet"
                onChange={(f)=>handleFile("tenthMarksheet",f)}
                error={errors.tenthMarksheet}/>
              <DocUpload label="12th Marksheet"
                onChange={(f)=>handleFile("twelfthMarksheet",f)}
                error={errors.twelfthMarksheet}/>
              <DocUpload label="Aadhaar"
                onChange={(f)=>handleFile("aadhaar",f)}/>
              <DocUpload label="Passport Photo"
                onChange={(f)=>handleFile("photo",f)}/>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="space-y-4">
              <label className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e)=>update("consent",e.target.checked)}
                />
                I confirm that all information provided is correct
              </label>
              {errors.declaration && <Error text={errors.declaration}/>}
            </div>
          )}
        </Section>
      </div>
    </StudentLayout>
  );
}

/* ================= UI HELPERS ================= */

const Section = ({ title, children, footer }) => (
  <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
    <h2 className="mb-6 text-xl font-semibold text-gray-800">{title}</h2>
    {children}
    {footer && <div className="mt-8 flex justify-end">{footer}</div>}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid md:grid-cols-2 gap-6">{children}</div>
);

const Btn = ({ text, onClick, gray }) => (
  <button
    onClick={onClick}
    className={`px-7 py-2.5 rounded-lg font-medium
    ${gray
      ? "bg-white border border-gray-300 text-gray-600"
      : "bg-blue-600 text-white"}`}
  >
    {text}
  </button>
);

const Nav = ({ back, next }) => (
  <div className="flex gap-3">
    {back && <Btn gray text="Back" onClick={back} />}
    <Btn text="Continue" onClick={next} />
  </div>
);

const Input = ({ label, value, onChange, error, type="text" }) => (
  <div>
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      className="w-full h-[54px] rounded-xl px-5 border border-gray-200 mt-2"
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const DocUpload = ({ label, onChange, error }) => (
  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
    <label className="block text-sm font-medium text-gray-600 mb-2">
      {label}
    </label>
    <input
      type="file"
      onChange={(e)=>onChange(e.target.files[0])}
      className="text-sm"
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const Stepper = ({ current }) => (
  <div className="hidden sm:flex gap-6 mb-6">
    {steps.map((label, i) => {
      const stepNo = i + 1;
      const active = stepNo === current;
      const completed = stepNo < current;
      return (
        <div key={label}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm
          ${active
            ? "bg-blue-600 text-white"
            : completed
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-200 text-gray-600"}`}>
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-blue-600 text-xs font-bold">
            {stepNo}
          </span>
          {label}
        </div>
      );
    })}
  </div>
);
