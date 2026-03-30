import { useState, useEffect } from "react";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";
import { FaBuilding, FaUniversity } from "react-icons/fa";
import AgentLayout from "../../../layout/AgentLayout";

import {
  fetchAgentProfile,
  saveAgentStep1,
  saveAgentStep2,
  saveAgentStep3,
  saveAgentStep4,
  saveAgentStep5,
  saveAgentStep6
} from "../services/agentProfile.api";

/* ================= STEP LABELS ================= */

const steps = [
  "Basic Details",
  "Agent Type",
  "Address",
  "Documents",
  "Bank Details",
  "Declarations",
];

export default function AgentProfile() {

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState({ open: false, type: "", message: "" });

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    agentType: "Individual",
    establishmentName: "",
    yearsOfExperience: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
    fullAddress: "",
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    d1: false,
    d2: false,
    d3: false,
  });

  const [documents, setDocuments] = useState({
    aadhaar: null,
    pan: null,
    addressProof: null,
    photo: null,
    establishmentCert: null,
  });

  useEffect(() => {
  loadProfile();
}, []);


const loadProfile = async () => {

  try {

    const res = await fetchAgentProfile();
    const data = res.data;

    setForm((prev) => ({
      ...prev,

      fullName: data.fullName || "",
      email: data.email || "",
      mobile: data.mobile || "",
      dob: data.dateOfBirth?.split("T")[0] || "",
      gender: data.gender || "",

      agentType: data.agentType || "Individual",
      establishmentName: data.establishmentName || "",

      state: data.address?.state || "",
      district: data.address?.district || "",
      city: data.address?.city || "",
      pincode: data.address?.pincode || "",
      fullAddress: data.address?.fullAddress || "",

      accountHolderName: data.bankDetails?.accountHolderName || "",
      bankName: data.bankDetails?.bankName || "",
      accountNumber: data.bankDetails?.accountNumber || "",
      ifscCode: data.bankDetails?.ifscCode || "",

      d1: data.declarations?.infoCorrect || false,
      d2: data.declarations?.agreePolicy || false,
      d3: data.declarations?.acceptTerms || false,
    }));

    // resume step automatically
    if (data.completedSteps?.length) {
      const maxStep = Math.max(...data.completedSteps);
      setStep(Math.min(maxStep + 1, 6));
    }

  } catch (err) {
    console.log(err);
  }

};
  /* ================= HELPERS ================= */

  const update = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: "" }));
  };

  const showPopup = (type, message) =>
    setPopup({ open: true, type, message });

  /* ================= VALIDATION ================= */


  const validate = () => {

    const e = {};

    if (step === 1) {
      if (!form.fullName) e.fullName = "Required";
      if (!form.email) e.email = "Required";
      if (!form.mobile) e.mobile = "Required";
      if (!form.dob) e.dob = "Required";
      if (!form.gender) e.gender = "Required";
    }

    if (step === 2) {
      if (!form.agentType) e.agentType = "Required";
      if (form.agentType === "Establishment" && !form.establishmentName)
        e.establishmentName = "Required";
    }

    if (step === 3) {
      if (!form.state) e.state = "Required";
      if (!form.city) e.city = "Required";
      if (!form.pincode) e.pincode = "Required";
      if (!form.fullAddress) e.fullAddress = "Required";
    }

    if (step === 4) {
      if (!documents.aadhaar) e.aadhaar = "Required";
      if (!documents.pan) e.pan = "Required";
      if (!documents.photo) e.photo = "Required";
    }

    if (step === 5) {
      if (!form.accountHolderName) e.accountHolderName = "Required";
      if (!form.bankName) e.bankName = "Required";
      if (!form.accountNumber) e.accountNumber = "Required";
      if (!form.ifscCode) e.ifscCode = "Required";
    }

    if (step === 6 && (!form.d1 || !form.d2 || !form.d3))
      e.declaration = "Accept all declarations";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ================= NEXT STEP ================= */

  const next = async () => {

    if (!validate()) return;

    try {

      if (step === 1) {
        await saveAgentStep1({
          fullName: form.fullName,
          email: form.email,
          mobile: form.mobile,
          dob: form.dob,
          gender: form.gender,
        });
      }

      if (step === 2) {
        await saveAgentStep2({
          agentType: form.agentType,
          establishmentName: form.establishmentName,
        });
      }

      if (step === 3) {
        await saveAgentStep3({
          state: form.state,
          district: form.district,
          city: form.city,
          pincode: form.pincode,
          fullAddress: form.fullAddress,
        });
      }

      if (step === 4) {

        const fd = new FormData();

        if (documents.aadhaar)
          fd.append("aadhaarCard", documents.aadhaar);

        if (documents.pan)
          fd.append("panCard", documents.pan);

        if (documents.addressProof)
          fd.append("addressProof", documents.addressProof);

        if (documents.photo)
          fd.append("agentPhoto", documents.photo);

        if (documents.establishmentCert)
          fd.append("establishmentRegistration", documents.establishmentCert);

        await saveAgentStep4(fd);
      }

      if (step === 5) {
        await saveAgentStep5({
          accountHolderName: form.accountHolderName,
          bankName: form.bankName,
          accountNumber: form.accountNumber,
          ifscCode: form.ifscCode,
        });
      }

      setStep((s) => s + 1);

    } catch (err) {
      showPopup("error", "Failed to save step");
    }
  };

  const back = () => setStep((s) => s - 1);

  /* ================= FINAL SUBMIT ================= */

  const submit = async () => {

    if (!validate()) return;

    try {

      await saveAgentStep6({
        d1: form.d1,
        d2: form.d2,
        d3: form.d3,
      });

      showPopup("success", "Profile submitted successfully 🚀");

    } catch {
      showPopup("error", "Something went wrong");
    }
  };

  /* ================= UI ================= */

  return (
    <AgentLayout>

      <Stepper current={step} />

      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div
          className="bg-blue-600 h-3 transition-all"
          style={{ width: `${(step - 1) * (100 / 6)}%` }}
        />
      </div>

      {/* STEP 1 */}

      {step === 1 && (
        <Section title="Basic Details" footer={<Btn text="Continue" onClick={next} />}>

          <Grid>

            <Input label="Full Name" icon={<FiUser />} value={form.fullName}
              onChange={(v) => update("fullName", v)} error={errors.fullName} />

            <Input label="Email" icon={<FiMail />} value={form.email}
              onChange={(v) => update("email", v)} error={errors.email} />

            <Input label="Mobile" icon={<FiPhone />} value={form.mobile}
              onChange={(v) => update("mobile", v)} error={errors.mobile} />

            <Input type="date" label="Date of Birth"
              value={form.dob}
              onChange={(v) => update("dob", v)}
              error={errors.dob}
            />

            <Select label="Gender"
              value={form.gender}
              onChange={(v) => update("gender", v)}
              options={["Male", "Female", "Other"]}
            />

          </Grid>

        </Section>
      )}

      {/* STEP 2 */}

      {step === 2 && (
        <Section title="Agent Type" footer={<Nav back={back} next={next} />}>

          <Grid>

            <Select
              label="Agent Type"
              value={form.agentType}
              onChange={(v) => update("agentType", v)}
              options={["Individual", "Establishment"]}
            />

            {form.agentType === "Establishment" && (
              <Input
                label="Establishment Name"
                icon={<FaBuilding />}
                value={form.establishmentName}
                onChange={(v) => update("establishmentName", v)}
                error={errors.establishmentName}
              />
            )}

          </Grid>

        </Section>
      )}

      {/* STEP 3 */}

      {step === 3 && (
        <Section title="Address" footer={<Nav back={back} next={next} />}>

          <Grid>

            <Input label="State" value={form.state}
              onChange={(v) => update("state", v)}
              error={errors.state} />

            <Input label="District" value={form.district}
              onChange={(v) => update("district", v)} />

            <Input label="City" value={form.city}
              onChange={(v) => update("city", v)}
              error={errors.city} />

            <Input label="Pincode" value={form.pincode}
              onChange={(v) => update("pincode", v)}
              error={errors.pincode} />

            <Input full label="Full Address"
              value={form.fullAddress}
              onChange={(v) => update("fullAddress", v)}
              error={errors.fullAddress}
            />

          </Grid>

        </Section>
      )}

      {/* STEP 4 */}

      {step === 4 && (
        <Section title="Documents Upload" footer={<Nav back={back} next={next} />}>

          <Grid>

            <FileUpload label="Aadhaar Card"
              onFile={(f) => setDocuments({ ...documents, aadhaar: f })}
              error={errors.aadhaar}
            />

            <FileUpload label="PAN Card"
              onFile={(f) => setDocuments({ ...documents, pan: f })}
              error={errors.pan}
            />

            <FileUpload label="Address Proof"
              onFile={(f) => setDocuments({ ...documents, addressProof: f })}
            />

            <FileUpload label="Agent Photo"
              onFile={(f) => setDocuments({ ...documents, photo: f })}
              error={errors.photo}
            />

            {form.agentType === "Establishment" && (
              <FileUpload
                label="Establishment Certificate"
                onFile={(f) =>
                  setDocuments({ ...documents, establishmentCert: f })
                }
              />
            )}

          </Grid>

        </Section>
      )}

      {/* STEP 5 */}

      {step === 5 && (
        <Section title="Bank Details" footer={<Nav back={back} next={next} />}>

          <Grid>

            <Input
              label="Account Holder Name"
              icon={<FaUniversity />}
              value={form.accountHolderName}
              onChange={(v) => update("accountHolderName", v)}
              error={errors.accountHolderName}
            />

            <Input label="Bank Name"
              value={form.bankName}
              onChange={(v) => update("bankName", v)}
              error={errors.bankName}
            />

            <Input label="Account Number"
              value={form.accountNumber}
              onChange={(v) => update("accountNumber", v)}
              error={errors.accountNumber}
            />

            <Input label="IFSC Code"
              value={form.ifscCode}
              onChange={(v) => update("ifscCode", v.toUpperCase())}
              error={errors.ifscCode}
            />

          </Grid>

        </Section>
      )}

      {/* STEP 6 */}

      {step === 6 && (
        <Section title="Declarations">

          <div className="space-y-3">

            <Check label="Information is correct"
              checked={form.d1}
              onChange={(v) => update("d1", v)}
            />

            <Check label="Agree to policy"
              checked={form.d2}
              onChange={(v) => update("d2", v)}
            />

            <Check label="Accept terms"
              checked={form.d3}
              onChange={(v) => update("d3", v)}
            />

            {errors.declaration && <Error text={errors.declaration} />}

            <Btn text="Submit Profile" onClick={submit} />

          </div>

        </Section>
      )}

      {popup.open && (
        <Popup
          popup={popup}
          onClose={() => setPopup({ ...popup, open: false })}
        />
      )}

    </AgentLayout>
  );
}

/* ================= REUSABLE UI ================= */

const Section = ({ title, children, footer }) => (
  <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 mb-6">
    <h2 className="mb-6 text-xl font-semibold text-gray-800">{title}</h2>
    {children}
    {footer && <div className="mt-6 flex justify-end">{footer}</div>}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid md:grid-cols-2 gap-6">{children}</div>
);

const Btn = ({ text, onClick }) => (
  <button onClick={onClick} className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
    {text}
  </button>
);

const Nav = ({ back, next }) => (
  <div className="flex gap-3">
    <Btn text="Back" onClick={back}/>
    <Btn text="Continue" onClick={next}/>
  </div>
);

const Input = ({ label, value, onChange, error, icon, type="text", full }) => (
  <div className={full ? "md:col-span-2":""}>
    <label className="text-sm text-gray-600">{label}</label>
    <div className="relative mt-2">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
      <input type={type} value={value} onChange={(e)=>onChange(e.target.value)}
        className={`w-full ${icon?"pl-10":"pl-4"} py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none`}
      />
    </div>
    {error && <Error text={error}/>}
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <select value={value} onChange={(e)=>onChange(e.target.value)}
      className="w-full mt-2 py-3 rounded-xl border border-gray-200">
      {options.map(o=> <option key={o}>{o}</option>)}
    </select>
  </div>
);

const FileUpload = ({ label, onFile, error }) => (
  <div>
    <label className="block text-sm mb-2">{label}</label>
    <input type="file" onChange={(e)=>onFile(e.target.files[0])}/>
    {error && <Error text={error}/>}
  </div>
);

const Check = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2">
    <input type="checkbox" checked={checked} onChange={(e)=>onChange(e.target.checked)}/>
    {label}
  </label>
);

const Error = ({ text }) => <p className="text-red-500 text-xs mt-1">{text}</p>;

const Popup = ({ popup, onClose }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div className="bg-white p-6 rounded-2xl w-80 text-center">
      <h2 className="font-semibold">{popup.type === "success" ? "Success" : "Error"}</h2>
      <p className="text-sm mt-2">{popup.message}</p>
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
        OK
      </button>
    </div>
  </div>
);

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