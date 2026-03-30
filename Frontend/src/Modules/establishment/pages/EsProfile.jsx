import { useState, useEffect } from "react";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";
import { FaSchool } from "react-icons/fa";

import {
  fetchProfile,
  saveStep1,
  saveStep2,
  saveStep3,
  saveStep4,
  saveStep5,
  saveStep6,
} from "../services/esProfile.api";
import EstablishmentLayout from "../../../layout/EstablishmentLayout";

/* ================= CONSTANTS ================= */

const steps = [
  "Basic Details",
  "Establishment Type",
  "Address",
  "Infrastructure",
  "Documents",
  "Declarations",
];

const ESTABLISHMENT_TYPES = [
  "IT Training",
  "Yoga Training",
  "CA Classes",
  "CS Classes",
  "Skill Coaching",
  "Competitive Exams",
  "other",
];

const ADDRESS_DATA = {
  Gujarat: {
    Ahmedabad: ["Ahmedabad City", "Sanand", "Daskroi"],
    Surat: ["Surat City", "Bardoli"],
  },
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const mobileRegex = /^[0-9]{10}$/;

/* ================= COMPONENT ================= */

export default function EsProfile() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState({ open: false, type: "success", message: "" });

  const [form, setForm] = useState({
    establishmentName: "",
    authorizedPerson: "",
    email: "",
    mobile: "",
    password: "",
    types: [],
    otherType: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
    address: "",
    classrooms: "",
    capacity: "",
    staff: "",
    modes: [],
    gst: null,
    pan: null,
    addressProof: null,
    registrationCert: null,
    ownerPhoto: null,
    companyLogo: null,
    d1: false,
    d2: false,
    d3: false,
  });

  /* ================= LOAD PROFILE ================= */

  useEffect(() => {
    fetchProfile()
      .then((res) => {
        const p = res.data;

        setForm((f) => ({
          ...f,
          establishmentName: p.establishmentName || "",
          authorizedPerson: p.authorizedPerson || "",
          email: p.email || "",
          mobile: p.mobile || "",
          types: p.establishmentType?.types || [],
          otherType: p.establishmentType?.otherType || "",
          state: p.address?.state || "",
          district: p.address?.district || "",
          city: p.address?.city || "",
          pincode: p.address?.pincode || "",
          address: p.address?.fullAddress || "",
          classrooms: p.infrastructure?.classrooms || "",
          capacity: p.infrastructure?.capacity || "",
          staff: p.infrastructure?.staff || "",
          modes: p.infrastructure?.modes || [],
          d1: p.declarations?.infoCorrect || false,
          d2: p.declarations?.agreePolicy || false,
          d3: p.declarations?.acceptTerms || false,
        }));

        if (p.completedSteps?.length) {
          const nextStep = Math.max(...p.completedSteps) + 1;
          setStep(nextStep > 6 ? 6 : nextStep);
        }
      })
      .catch(() => {});
  }, []);

  /* ================= HELPERS ================= */

  const showPopup = (type, message) => setPopup({ open: true, type, message });

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
    update(key, file);
  };

  /* ================= VALIDATION ================= */

  const validate = () => {
    const e = {};

    if (step === 1) {
      if (!form.establishmentName) e.establishmentName = "Required";
      if (!form.authorizedPerson) e.authorizedPerson = "Required";
      if (!emailRegex.test(form.email)) e.email = "Invalid email";
      if (!mobileRegex.test(form.mobile)) e.mobile = "Invalid mobile";
      if (form.password.length < 6) e.password = "Min 6 characters";
    }

    if (step === 2) {
      if (form.types.length === 0) e.types = "Select at least one type";
      if (form.types.includes("other") && !form.otherType.trim())
        e.otherType = "Please specify other establishment type";
    }

    if (step === 3) {
      if (!form.state) e.state = "Required";
      if (!form.district) e.district = "Required";
      if (!form.city) e.city = "Required";
      if (!form.pincode) e.pincode = "Required";
      if (!form.address) e.address = "Required";
    }

    if (step === 4) {
      if (!form.classrooms) e.classrooms = "Required";
      if (!form.capacity) e.capacity = "Required";
      if (!form.staff) e.staff = "Required";
      if (!form.modes.length) e.modes = "Select at least one mode";
    }

    if (step === 5) {
      if (!form.gst) e.gst = "GST certificate required";
      if (!form.pan) e.pan = "PAN card required";
      if (!form.addressProof) e.addressProof = "Address proof required";
      if (!form.registrationCert) e.registrationCert = "Registration certificate required";
      if (!form.ownerPhoto) e.ownerPhoto = "Owner photo required";
      if (!form.companyLogo) e.companyLogo = "Company logo required";
    }

    if (step === 6 && (!form.d1 || !form.d2 || !form.d3))
      e.declaration = "Accept all declarations";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ================= STEP SAVE ================= */

  const next = async () => {
    if (!validate()) return;

    try {
      if (step === 1)
        await saveStep1({
          establishmentName: form.establishmentName,
          authorizedPerson: form.authorizedPerson,
          email: form.email,
          mobile: form.mobile,
          password: form.password,
        });

      if (step === 2)
        await saveStep2({ types: form.types, otherType: form.otherType });

      if (step === 3)
        await saveStep3({
          state: form.state,
          district: form.district,
          city: form.city,
          pincode: form.pincode,
          fullAddress: form.address,
        });

      if (step === 4)
        await saveStep4({
          classrooms: form.classrooms,
          capacity: form.capacity,
          staff: form.staff,
          modes: form.modes,
        });

      if (step === 5) {
        const fd = new FormData();
        fd.append("gst", form.gst);
        fd.append("pan", form.pan);
        fd.append("addressProof", form.addressProof);
        fd.append("registrationCert", form.registrationCert);
        fd.append("ownerPhoto", form.ownerPhoto);
        fd.append("companyLogo", form.companyLogo);
        await saveStep5(fd);
      }

      setStep((s) => s + 1);
    } catch (err) {
      showPopup("error", err.response?.data?.message || "Something went wrong");
    }
  };

  const back = () => setStep((s) => s - 1);

  const submit = async () => {
    if (!validate()) return;
    try {
      await saveStep6({
        infoCorrect: form.d1,
        agreePolicy: form.d2,
        acceptTerms: form.d3,
      });
      showPopup("success", "Profile submitted successfully 🚀");
    } catch (err) {
      showPopup("error", err.response?.data?.message || "Submit failed");
    }
  };

  return (
    <EstablishmentLayout className="space-y-10">
      <Stepper current={step} />

      {/* 🔥 PROFILE COMPLETION BAR */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <div
          className="bg-blue-600 h-3 transition-all duration-500"
          style={{ width: `${(step - 1) * (100 / 6)}%` }}
        />
      </div>
      <p className="text-right text-xs text-gray-500 mt-1">
        {(step - 1) * (100 / 6)}% Completed
      </p>

      {/* ------------------ EXISTING UI BELOW (UNCHANGED) ------------------ */}
     
      {/* STEP 1 */}
      {step === 1 && (
        <Section
          title="Basic Details"
          footer={<Btn text="Continue" onClick={next} />}
        >
          <Grid>
            <Input
              label="Establishment Name"
              icon={<FaSchool />}
              value={form.establishmentName}
              onChange={(v) => update("establishmentName", v)}
              error={errors.establishmentName}
            />
            <Input
              label="Authorized Person"
              icon={<FiUser />}
              value={form.authorizedPerson}
              onChange={(v) => update("authorizedPerson", v)}
              error={errors.authorizedPerson}
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
              onChange={(v) => /^[0-9]*$/.test(v) && update("mobile", v)}
              error={errors.mobile}
            />
            <Input
              full
              type="password"
              label="Password"
              icon={<FiUser />}
              value={form.password}
              onChange={(v) => update("password", v)}
              error={errors.password}
            />
          </Grid>
        </Section>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <Section
          title="Establishment Type"
          footer={<Nav back={back} next={next} />}
        >
          <div className="grid md:grid-cols-3 gap-4">
            {ESTABLISHMENT_TYPES.map((t) => (
              <label
                key={t}
                className={`p-4 rounded-2xl shadow cursor-pointer flex gap-2
          ${
            form.types.includes(t)
              ? "border border-blue-400"
              : "border border-transparent"
          }`}
              >
                <input
                  type="checkbox"
                  checked={form.types.includes(t)}
                  onChange={(e) => {
                    const checked = e.target.checked;

                    update(
                      "types",
                      checked
                        ? [...form.types, t]
                        : form.types.filter((x) => x !== t),
                    );

                    // 🔥 If unchecking "other", clear text
                    if (t === "other" && !checked) {
                      update("otherType", "");
                    }
                  }}
                />
                <span className="capitalize">{t}</span>
              </label>
            ))}
          </div>

          {/* 🔥 OTHER SPECIFY INPUT */}
          {form.types.includes("other") && (
            <div className="mt-4">
              <SimpleInput
                full
                label="Please specify other establishment type"
                value={form.otherType}
                onChange={(v) => update("otherType", v)}
              />
              {errors.otherType && <Error text={errors.otherType} />}
            </div>
          )}

          {errors.types && <Error text={errors.types} />}
        </Section>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <Section title="Address" footer={<Nav back={back} next={next} />}>
          <Grid>
            <Select value={form.state} onChange={(v) => update("state", v)}>
              <option value="">State</option>
              {Object.keys(ADDRESS_DATA).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
            <SimpleInput
              label="District"
              value={form.district}
              onChange={(v) => update("district", v)}
            />
            <SimpleInput
              label="City"
              value={form.city}
              onChange={(v) => update("city", v)}
            />
            <SimpleInput
              label="Pincode"
              value={form.pincode}
              onChange={(v) => update("pincode", v)}
            />
            <SimpleInput
              full
              label="Address"
              value={form.address}
              onChange={(v) => update("address", v)}
            />
          </Grid>
        </Section>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <Section
          title="Infrastructure"
          footer={<Nav back={back} next={next} />}
        >
          <Grid>
            {/* Classrooms */}
            <div>
              <input
                placeholder="Classrooms"
                value={form.classrooms}
                onChange={(e) => update("classrooms", e.target.value)}
                className={baseField}
              />
              {errors.classrooms && <Error text={errors.classrooms} />}
            </div>

            {/* Capacity */}
            <div>
              <input
                placeholder="Capacity"
                value={form.capacity}
                onChange={(e) => update("capacity", e.target.value)}
                className={baseField}
              />
              {errors.capacity && <Error text={errors.capacity} />}
            </div>

            {/* Staff */}
            <div>
              <input
                placeholder="Staff"
                value={form.staff}
                onChange={(e) => update("staff", e.target.value)}
                className={baseField}
              />
              {errors.staff && <Error text={errors.staff} />}
            </div>

            {/* Teaching Mode (same row, right side) */}
            <div>
              <div className="h-13 px-4 flex items-center gap-6 rounded-2xl bg-white shadow border border-transparent">
                {["online", "offline"].map((mode) => {
                  const active = form.modes?.includes(mode);

                  return (
                    <label
                      key={mode}
                      className="flex items-center gap-2 cursor-pointer text-sm"
                      onClick={() => {
                        const updated = active
                          ? form.modes.filter((m) => m !== mode)
                          : [...(form.modes || []), mode];
                        update("modes", updated);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        readOnly
                        className="accent-blue-600"
                      />
                      <span className="capitalize">{mode}</span>
                    </label>
                  );
                })}
              </div>

              {errors.modes && (
                <p className="text-red-500 text-xs mt-1">{errors.modes}</p>
              )}
            </div>
          </Grid>
        </Section>
      )}

      {/* STEP 5 */}
      {step === 5 && (
        <Section
          title="Documents Upload"
          footer={<Nav back={back} next={next} />}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <DocUpload
              label="GST Certificate"
              file={form.gst}
              error={errors.gst}
              onChange={(f) => handleFile("gst", f)}
            />

            <DocUpload
              label="PAN Card"
              file={form.pan}
              error={errors.pan}
              onChange={(f) => handleFile("pan", f)}
            />

            <DocUpload
              label="Address Proof"
              file={form.addressProof}
              error={errors.addressProof}
              onChange={(f) => handleFile("addressProof", f)}
            />

            <DocUpload
              label="Registration Certificate"
              file={form.registrationCert}
              error={errors.registrationCert}
              onChange={(f) => handleFile("registrationCert", f)}
            />

            <DocUpload
              label="Owner Photo"
              file={form.ownerPhoto}
              imageOnly
              error={errors.ownerPhoto}
              onChange={(f) => handleFile("ownerPhoto", f)}
            />

            <DocUpload
              label="Company Logo"
              file={form.companyLogo}
              error={errors.companyLogo}
              imageOnly
              onChange={(f) => handleFile("companyLogo", f)}
            />
          </div>
        </Section>
      )}

      {/* STEP 6 */}
      {step === 6 && (
        <Section title="Declarations">
          <div className="space-y-4">
            <Accordion
              title="I confirm that all information provided is correct"
              checked={form.d1}
              onCheck={(v) => update("d1", v)}
            >
              I hereby declare that the information submitted by me is true,
              complete, and accurate to the best of my knowledge.
            </Accordion>

            <Accordion
              title="I agree to the platform policy"
              checked={form.d2}
              onCheck={(v) => update("d2", v)}
            >
              I have read and understood the privacy policy, refund policy, and
              code of conduct of the platform.
            </Accordion>

            <Accordion
              title="I accept the terms and conditions"
              checked={form.d3}
              onCheck={(v) => update("d3", v)}
            >
              I agree to comply with all rules, regulations, and legal
              obligations defined by the platform.
            </Accordion>

            {errors.declaration && <Error text={errors.declaration} />}

            {/* SUBMIT BUTTON */}
            <button
              disabled={!(form.d1 && form.d2 && form.d3)}
              onClick={submit}
              className={`mt-6 px-6 py-3 rounded-xl text-white
          ${
            form.d1 && form.d2 && form.d3
              ? "bg-blue-600"
              : "bg-blue-400 cursor-not-allowed"
          }
        `}
            >
              Submit Profile
            </button>
          </div>
        </Section>
      )}
      {/* ================= GLOBAL POPUP ================= */}
      {popup.open && (
        <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div
            className={`w-full max-w-sm rounded-3xl p-8 shadow-2xl bg-white
      ${popup.type === "success" ? "border border-green-200" : "border border-red-200"}
      `}
          >
            {/* ICON */}
            <div
              className={`w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-4
        ${popup.type === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}
        `}
            >
              {popup.type === "success" ? "✅" : "❌"}
            </div>

            {/* TEXT */}
            <h2 className="text-lg font-semibold text-center">
              {popup.type === "success" ? "Success" : "Error"}
            </h2>

            <p className="text-sm text-gray-500 text-center mt-2">
              {popup.message}
            </p>

            {/* BUTTON */}
            <button
              onClick={() => setPopup({ ...popup, open: false })}
              className={`w-full mt-6 py-3 rounded-xl text-white font-medium
        ${popup.type === "success" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
        `}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </EstablishmentLayout>
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
    className={`px-7 py-2.5 rounded-lg font-medium transition-all duration-300
${
  gray
    ? "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
    : "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
}
`}
  >
    {text}
  </button>
);

const Nav = ({ back, next }) => (
  <div className="flex gap-3">
    <Btn gray text="Back" onClick={back} />
    <Btn text="Continue" onClick={next} />
  </div>
);

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
    <label className="text-sm font-medium text-gray-600">{label}</label>

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

const SimpleInput = ({ label, value, onChange, full }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <input
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={baseField}
    />
  </div>
);

const Select = ({ value, onChange, children }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={baseField}
  >
    {children}
  </select>
);

const Check = ({ label, checked, onChange }) => (
  <label className="flex gap-2 items-center">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    {label}
  </label>
);

const DocUpload = ({ label, file, onChange, error, imageOnly }) => (
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

const Error = ({ text }) => <p className="text-red-500 text-xs mt-1">{text}</p>;

/* =================  STEPPER  ================= */

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
 
/* ================= FUSION ACCORDION ================= */

const Accordion = ({ title, checked, onCheck, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onCheck(e.target.checked)}
            onClick={(e) => e.stopPropagation()}
          />
          <span className="font-medium text-gray-700">{title}</span>
        </div>

        <span className="text-sm text-gray-400">{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="px-4 pb-4 text-sm text-gray-600">{children}</div>
      )}
    </div>
  );
};