import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Upload,
  GraduationCap,
  Calendar,
  ClipboardCheck,
  Check,
} from "lucide-react";

const STEPS = [
  { id: 1, label: "Basic Details" },
  { id: 2, label: "Address" },
  { id: 3, label: "Education Details" },
  { id: 4, label: "Upload Documents" },
  { id: 5, label: "Refer & Consent" },
];

const initialFormState = {
  name: "",
  dateOfBirth: "",
  email: "",
  mobile: "",
  password: "",
  state: "",
  city: "",
  address: "",
  pincode: "",
  education: {
    graduation: {
      collegeName: "",
      course: "",
      passingYear: "",
      gradingSystem: "",
      marks: "",
    },
    class12: {
      schoolName: "",
      board: "",
      stream: "",
      passingYear: "",
    },
    class10: {
      schoolName: "",
      board: "",
      passingYear: "",
    },
  },
};

export default function ProfilePage({ setProfileData, isLoggedOut }) {
  const [activeStep, setActiveStep] = useState(1);
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [sameAs12th, setSameAs12th] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({
    tenthMarksheet: "",
    twelfthMarksheet: "",
    aadhaar: "",
    photo: "",
  });

  const [uploadMessage, setUploadMessage] = useState("");

  const [consentAccepted, setConsentAccepted] = useState(false);
  const [whatsappConsent, setWhatsappConsent] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const validateStep = () => {
    const e = {};

    if (activeStep === 1) {
      if (!form.name) e.name = "Required";
      if (!form.dateOfBirth) e.dateOfBirth = "Required";
      if (!form.email) e.email = "Required";
      if (!form.mobile) e.mobile = "Required";
    }

    if (activeStep === 2) {
      if (!form.city) e.city = "Required";
      if (!form.state) e.state = "Required";
      if (!form.pincode) e.pincode = "Required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const API_BASE = import.meta.env.VITE_API_URL;
  async function fetchWithRetry(url, options, retries = 3) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error("Request failed");
      return res;
    } catch (err) {
      if (retries > 0) {
        await new Promise((r) => setTimeout(r, 2000));
        return fetchWithRetry(url, options, retries - 1);
      }
      throw err;
    }
  }

  const saveStep = async () => {
    if (activeStep === 1) {
      const res = await fetchWithRetry(`${API_BASE}/api/profile/basic`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          mobile: form.mobile,
          dateOfBirth: form.dateOfBirth,
          password: form.password,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        alert("Server waking up, please try again in a few seconds.");
        throw new Error("STEP 1 FAILED");
      }

      await res.json();

      setProfileData({
        name: form.name,
        email: form.email,
      });
    }

    // ================= STEP 2: ADDRESS DETAILS =================
    if (activeStep === 2) {
      const res = await fetchWithRetry(`${API_BASE}/api/profile/address`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        }),
      });

      if (!res.ok) throw new Error("STEP 2 FAILED");
    }

    // ================= STEP 3: EDUCATION DETAILS =================
    if (activeStep === 3) {
      const res = await fetchWithRetry(`${API_BASE}/api/profile/education`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          education: form.education,
        }),
      });

      if (!res.ok) throw new Error("STEP 3 FAILED");
    }
  };

  const [showSuccess, setShowSuccess] = useState(false);

  const submitProfile = async () => {
    await fetchWithRetry(`${API_BASE}/api/profile/consent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        referralCode: form.referralCode,
        source: form.source,
        consentAccepted: true,
        whatsappConsent: true,
      }),
    });
  };

  const validateFile = (file) => {
    if (!file) return false;

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, JPG, PNG allowed");
      return false;
    }

    if (file.size > maxSize) {
      alert("File size must be less than 2MB");
      return false;
    }

    return true;
  };

  const areRequiredDocsUploaded = () => {
    return (
      documents.tenthMarksheet &&
      documents.twelfthMarksheet &&
      documents.aadhaar &&
      documents.photo
    );
  };

  const next = async () => {
    if (!validateStep()) return;

    try {
      // ================= STEP 4: UPLOAD DOCUMENTS =================
      if (activeStep === 4) {
        if (!areRequiredDocsUploaded()) {
          setUploadMessage("❌ Please upload all required documents");
          return;
        }

        await uploadDocuments(); // wait for upload
        setActiveStep(5);
        return;
      }

      // ================= STEP 5: CONSENT =================
      if (activeStep === 5) {
        if (!consentAccepted) {
          setConsentError("You must agree to the Terms & Conditions");
          return;
        }

        await submitProfile();
        setShowSuccess(true);
        return;
      }

      // ================= STEP 1–3: SAVE & NEXT =================
      await saveStep();
      setActiveStep((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  const back = () => setActiveStep((s) => Math.max(s - 1, 1));

  const [documents, setDocuments] = useState({
    tenthMarksheet: null,
    twelfthMarksheet: null,
    aadhaar: null,
    photo: null,
  });

  const uploadDocuments = async () => {
    setUploading(true); // ✅ START

    const formData = new FormData();

    if (documents.tenthMarksheet)
      formData.append("tenthMarksheet", documents.tenthMarksheet);
    if (documents.twelfthMarksheet)
      formData.append("twelfthMarksheet", documents.twelfthMarksheet);
    if (documents.aadhaar) formData.append("aadhaar", documents.aadhaar);
    if (documents.photo) formData.append("photo", documents.photo);

    try {
      const res = await fetchWithRetry(`${API_BASE}/api/profile/documents`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setUploadMessage("✅ Documents uploaded successfully");
    } catch (err) {
      setUploadMessage("❌ Upload failed");
    } finally {
      setUploading(false); // ✅ END
    }
  };

  useEffect(() => {
    if (localStorage.getItem("loggedOut") === "true") {
      setForm(initialFormState);
      return;
    }

    const loadProfile = async () => {
      try {
        const res = await fetchWithRetry(`${API_BASE}/api/profile/get`, {
          method: "GET",
          credentials: "include",
        });

        if (!res || !res.ok) {
          setForm(initialFormState);
          return;
        }

        const data = await res.json();

        if (!data || !data.name) {
          setForm(initialFormState);
          return;
        }

        setForm((prev) => ({
          ...initialFormState,
          ...prev,
          ...data,
          education: {
            ...initialFormState.education,
            ...(data.education || {}),
            graduation: {
              ...initialFormState.education.graduation,
              ...(data.education?.graduation || {}),
            },
            class12: {
              ...initialFormState.education.class12,
              ...(data.education?.class12 || {}),
            },
            class10: {
              ...initialFormState.education.class10,
              ...(data.education?.class10 || {}),
            },
          },
        }));
      } catch {
        setForm(initialFormState);
      }
    };

    loadProfile();
  }, [API_BASE]);

  const handleSameAs12th = (checked) => {
    setSameAs12th(checked);

    if (!checked) return;

    const year12 = Number(form.education.class12.passingYear);

    setForm((prev) => ({
      ...prev,
      education: {
        ...prev.education,

        class10: {
          ...prev.education.class10,
          schoolName: prev.education.class12.schoolName || "",
          board: prev.education.class12.board || "",
          passingYear: year12 ? String(year12 - 2) : "",
        },
      },
    }));
  };

  return (
    <div className="w-full flex justify-center bg-white min-h-screen py-8">
      <div className="w-full max-w-6xl px-4 sm:px-6 space-y-8">
        {/* ================= STEPPER ================= */}

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="relative">
            {/* Background Line (Full) */}
            <div className="absolute top-5 left-5 right-5 h-0.75 bg-gray-200 rounded-full" />

            {/* Progress Line (Filled) */}
            <div
              className="absolute top-5 left-5 h-0.75 bg-blue-600 rounded-full transition-all duration-300"
              style={{
                width:
                  STEPS.length <= 1
                    ? "0%"
                    : `${((activeStep - 1) / (STEPS.length - 1)) * 100}%`,
              }}
            />

            {/* Steps */}
            <div className="relative flex items-start w-full">
              {STEPS.map((step) => {
                const isActive = activeStep === step.id;
                const isCompleted = activeStep > step.id;

                return (
                  <div key={step.id} className="flex-1">
                    <button
                      onClick={() => {
                        setErrors({});
                        setActiveStep(step.id);
                      }}
                      className="relative z-10 flex flex-col items-center w-full focus:outline-none group"
                    >
                      {/* Circle */}
                      <div
                        className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  text-sm font-bold transition-all duration-200
                  ${
                    isCompleted
                      ? "bg-blue-500 text-white"
                      : isActive
                        ? "bg-white text-blue-700"
                        : "bg-white text-gray-500"
                  }
                  ${
                    isActive
                      ? "ring-2 ring-blue-600 ring-offset-2"
                      : "border border-gray-300"
                  }
                `}
                      >
                        {isCompleted ? <Check size={18} /> : step.id}
                      </div>

                      {/* Label */}
                      <span
                        className={`
                  mt-2 text-[11px] sm:text-sm font-semibold text-center
                  transition
                  ${
                    isActive
                      ? "text-blue-700"
                      : isCompleted
                        ? "text-gray-900"
                        : "text-gray-500"
                  }
                `}
                      >
                        {step.label}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 px-6 py-8 sm:px-10 sm:py-10">
          {activeStep === 1 && (
            <Section
              title="Personal Information"
              // subtitle="Enter your basic details to create your account"
            >
              <Grid>
                <Input
                  label="Full Name"
                  icon={<User />}
                  value={form.name}
                  error={errors.name}
                  placeholder="Enter your full name"
                  onChange={(e) => update("name", e.target.value)}
                />

                <Input
                  label="Email Address"
                  icon={<Mail />}
                  value={form.email}
                  error={errors.email}
                  placeholder="example@email.com"
                  onChange={(e) => update("email", e.target.value)}
                />

                <Input
                  label="Mobile Number"
                  icon={<Phone />}
                  value={form.mobile}
                  error={errors.mobile}
                  maxLength={10}
                  placeholder="10 digit mobile number"
                  onChange={(e) =>
                    update("mobile", e.target.value.replace(/\D/g, ""))
                  }
                />

                <Input
                  label="Date of Birth"
                  type="date"
                  icon={<Calendar />}
                  value={form.dateOfBirth}
                  onChange={(e) => update("dateOfBirth", e.target.value)}
                />

                {/* <Input
                  label="Password"
                  type="password"
                  icon={<Lock />}
                  value={form.password}
                  error={errors.password}
                  className="md:col-span-2"
                  placeholder="Minimum 8 characters"
                  onChange={(e) => update("password", e.target.value)}
                /> */}
              </Grid>
            </Section>
          )}

          {activeStep === 2 && (
            <Section
              title="Address Details"
              // subtitle="Provide your current residential address information"
            >
              <Grid>
                <Textarea
                  label="Full Address"
                  placeholder="House No, Street, Area, Landmark..."
                  value={form.address}
                  error={errors.address}
                  className="md:col-span-2"
                  onChange={(e) => update("address", e.target.value)}
                />

                <Input
                  label="City"
                  icon={<MapPin />}
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="Enter city"
                  error={errors.city}
                />

                <Input
                  label="State"
                  icon={<MapPin />}
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  placeholder="Enter state"
                  error={errors.state}
                />

                <Input
                  label="Pincode"
                  icon={<MapPin />}
                  value={form.pincode}
                  placeholder="Enter 6 digit pincode"
                  error={errors.pincode}
                  maxLength={6}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    update("pincode", value);
                  }}
                />
              </Grid>
            </Section>
          )}

          {activeStep === 3 && (
            <Section
              title="Education Details"
              // subtitle="Provide your academic background information"
            >
              <div className="space-y-8">
                {/* ================= GRADUATION ================= */}
                <div className="border border-gray-200 rounded-xl shadow-sm p-6 bg-gray-50/40">
                  <h3 className="text-base font-semibold text-gray-800 mb-5">
                    Graduation Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="College Name"
                      icon={<GraduationCap />}
                      value={form.education?.graduation?.collegeName ?? ""}
                      placeholder="Enter college or university"
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          education: {
                            ...prev.education,
                            graduation: {
                              ...prev.education.graduation,
                              collegeName: e.target.value,
                            },
                          },
                        }))
                      }
                    />

                    <Input
                      label="Course / Degree"
                      icon={<GraduationCap />}
                      value={form.education.graduation.course || ""}
                      placeholder="B.Tech / B.Sc / B.Com etc."
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          education: {
                            ...prev.education,
                            graduation: {
                              ...prev.education.graduation,
                              course: e.target.value,
                            },
                          },
                        }))
                      }
                    />

                    <Input
                      label="Passing Year"
                      icon={<Calendar />}
                      placeholder="YYYY"
                      value={form.education.graduation.passingYear}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          education: {
                            ...prev.education,
                            graduation: {
                              ...prev.education.graduation,
                              passingYear: e.target.value,
                            },
                          },
                        }))
                      }
                    />

                    <Input
                      label="Grading System"
                      icon={<ClipboardCheck />}
                      placeholder="Percentage / CGPA"
                      value={form.education.graduation.gradingSystem || ""}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          education: {
                            ...prev.education,
                            graduation: {
                              ...prev.education.graduation,
                              gradingSystem: e.target.value,
                            },
                          },
                        }))
                      }
                    />

                    <Input
                      label="Final Marks / CGPA"
                      icon={<ClipboardCheck />}
                      placeholder="Enter marks"
                      className="md:col-span-2"
                      value={form.education.graduation.marks || ""}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          education: {
                            ...prev.education,
                            graduation: {
                              ...prev.education.graduation,
                              marks: e.target.value,
                            },
                          },
                        }))
                      }
                    />
                  </div>
                </div>

                {/* ================= 12TH ================= */}
                <div className="border border-gray-200 rounded-xl shadow-sm p-6 bg-gray-50/40">
                  <h3 className="text-base font-semibold text-gray-800 mb-5">
                    12th Standard Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="School Name"
                      icon={<GraduationCap />}
                      value={form.education.class12.schoolName || ""}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          education: {
                            ...prev.education,
                            class12: {
                              ...prev.education.class12,
                              schoolName: e.target.value,
                            },
                          },
                        }))
                      }
                    />

                    <Input
                      label="Board"
                      icon={<ClipboardCheck />}
                      value={form.education.class12.board || ""}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          education: {
                            ...prev.education,
                            class12: {
                              ...prev.education.class12,
                              board: e.target.value,
                            },
                          },
                        }))
                      }
                    />

                    {/* Stream Dropdown */}
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-medium text-gray-600">
                        Stream
                      </label>

                      <div className="flex items-center gap-3 rounded-xl px-4 py-3 border border-gray-200 bg-gray-50">
                        <GraduationCap
                          className="text-blue-400 shrink-0"
                          size={18}
                        />

                        <select
                          value={form.education.class12.stream || ""}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              education: {
                                ...prev.education,
                                class12: {
                                  ...prev.education.class12,
                                  stream: e.target.value,
                                },
                              },
                            }))
                          }
                          className="w-full bg-transparent outline-none text-sm"
                        >
                          <option value="">Select Stream</option>
                          <option>Science</option>
                          <option>Commerce</option>
                          <option>Arts</option>
                        </select>
                      </div>
                    </div>

                    <Input
                      label="Passing Year"
                      icon={<Calendar />}
                      placeholder="YYYY"
                      value={form.education.class12.passingYear || ""}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          education: {
                            ...prev.education,
                            class12: {
                              ...prev.education.class12,
                              passingYear: e.target.value,
                            },
                          },
                        }))
                      }
                    />
                  </div>
                </div>

                {/* ================= 10TH ================= */}
                <div className="border border-gray-200 rounded-xl shadow-sm p-6 bg-gray-50/40">
                  <h3 className="text-base font-semibold text-gray-800 mb-5">
                    10th Standard Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="School Name"
                      icon={<GraduationCap />}
                      value={form.education.class10.schoolName || ""}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          education: {
                            ...prev.education,
                            class10: {
                              ...prev.education.class10,
                              schoolName: e.target.value,
                            },
                          },
                        }))
                      }
                    />

                    <Input
                      label="Board"
                      icon={<ClipboardCheck />}
                      value={form.education.class10.board || ""}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          education: {
                            ...prev.education,
                            class10: {
                              ...prev.education.class10,
                              board: e.target.value,
                            },
                          },
                        }))
                      }
                    />

                    <Input
                      label="Passing Year"
                      icon={<Calendar />}
                      placeholder="YYYY"
                      value={form.education.class10.passingYear || ""}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          education: {
                            ...prev.education,
                            class10: {
                              ...prev.education.class10,
                              passingYear: e.target.value,
                            },
                          },
                        }))
                      }
                    />
                  </div>

                  <div className="mt-5">
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-blue-600"
                        checked={sameAs12th}
                        onChange={(e) => handleSameAs12th(e.target.checked)}
                      />
                      Same board & grading system as 12th Standard
                    </label>
                  </div>
                </div>
              </div>
            </Section>
          )}

          {activeStep === 4 && (
            <Section
              title="Upload Documents"
              // subtitle="Upload all required academic and identity documents"
            >
              <div className="space-y-6">
                {/* Upload Progress */}
                {uploading && (
                  <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 animate-pulse w-full"></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Uploading documents, please wait...
                    </p>
                  </div>
                )}

                {/* Upload Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <UploadBox
                    label="10th Marksheet"
                    accept=".pdf,image/*"
                    file={documents.tenthMarksheet}
                    status={uploadStatus.tenthMarksheet}
                    onChange={(file) => {
                      if (!validateFile(file)) return;
                      setDocuments((prev) => ({
                        ...prev,
                        tenthMarksheet: file,
                      }));
                    }}
                  />

                  <UploadBox
                    label="12th Marksheet"
                    accept=".pdf,image/*"
                    file={documents.twelfthMarksheet}
                    status={uploadStatus.twelfthMarksheet}
                    onChange={(file) => {
                      if (!validateFile(file)) return;
                      setDocuments((prev) => ({
                        ...prev,
                        twelfthMarksheet: file,
                      }));
                    }}
                  />

                  <UploadBox
                    label="Aadhaar / ID Proof"
                    accept=".pdf,image/*"
                    file={documents.aadhaar}
                    status={uploadStatus.aadhaar}
                    onChange={(file) => {
                      if (!validateFile(file)) return;
                      setDocuments((prev) => ({ ...prev, aadhaar: file }));
                    }}
                  />

                  <div className="space-y-2">
                    <UploadBox
                      label="Passport Size Photo"
                      accept="image/*"
                      file={documents.photo}
                      status={uploadStatus.photo}
                      onChange={(file) => {
                        if (!validateFile(file)) return;

                        setDocuments((prev) => ({ ...prev, photo: file }));
                        setPhotoPreview(URL.createObjectURL(file));
                      }}
                    />

                    {photoPreview && (
                      <div className="flex items-center gap-3">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-20 h-20 rounded-full object-cover border border-gray-300 shadow-sm"
                        />
                        <span className="text-xs text-gray-500">
                          Photo Preview
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Section>
          )}

          {activeStep === 5 && (
            <div className="py-10">
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-1">
                  Referral & Consent
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Enter referral details and provide your consent to proceed
                </p>

                <div className="space-y-6">
                  {/* Referral Code */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Referral Code (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter referral code"
                      className="w-full h-12 rounded-lg border border-gray-300 px-4 text-sm
            focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>

                  {/* How did you hear */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How did you hear about us?
                    </label>
                    <select
                      className="w-full h-12 rounded-lg border border-gray-300 px-4 text-sm
            bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                      <option value="">Select an option</option>
                      <option>Google Search</option>
                      <option>Social Media</option>
                      <option>Friend / Referral</option>
                      <option>Advertisement</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Consent Checkboxes */}
                  <div className="space-y-4 pt-2">
                    {/* REQUIRED */}
                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 accent-blue-600"
                        checked={consentAccepted}
                        onChange={(e) => {
                          setConsentAccepted(e.target.checked);
                          setConsentError("");
                        }}
                      />
                      <span>
                        I agree to the{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </a>
                        <span className="text-blue-500 ml-1">*</span>
                      </span>
                    </label>

                    {/* ERROR MESSAGE */}
                    {consentError && (
                      <p className="text-sm text-red-600 ml-7">
                        {consentError}
                      </p>
                    )}

                    {/* OPTIONAL */}
                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 accent-blue-600"
                        checked={whatsappConsent}
                        onChange={(e) => setWhatsappConsent(e.target.checked)}
                      />
                      <span>
                        I agree to receive updates and counselling support via
                        WhatsApp
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* ACTIONS */}
          <div className="mt-10 flex justify-between items-center">
            {activeStep > 1 ? (
              <button
                type="button"
                onClick={back}
                className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={next}
              className="px-10 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              {activeStep === 5 ? "Save & Submit" : "Save & Submit"}
            </button>
          </div>
        </div>
      </div>
      {showSuccess && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-[fadeIn_180ms_ease-out]"
            onClick={() => setShowSuccess(false)}
          />

          {/* Bottom Sheet */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center px-3 pb-3 sm:pb-6">
            <div
              className="w-full max-w-md rounded-3xl bg-white border border-gray-200 shadow-2xl overflow-hidden
        animate-[sheetUp_260ms_cubic-bezier(0.2,0.9,0.2,1)]"
            >
              {/* Top handle (like apps) */}
              <div className="flex justify-center pt-3">
                <div className="h-1.5 w-12 rounded-full bg-gray-200" />
              </div>

              <div className="p-5 sm:p-6">
                {/* Row */}
                <div className="flex items-start gap-4">
                  {/* Animated success icon */}
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center">
                      <svg viewBox="0 0 52 52" className="w-7 h-7" fill="none">
                        <circle
                          cx="26"
                          cy="26"
                          r="20"
                          className="stroke-green-500"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray="126"
                          strokeDashoffset="126"
                          style={{
                            animation: "circleDraw 450ms ease-out forwards",
                          }}
                        />
                        <path
                          d="M16 27 L23 34 L37 19"
                          className="stroke-green-600"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="50"
                          strokeDashoffset="50"
                          style={{
                            animation:
                              "checkDraw 350ms ease-out 260ms forwards",
                          }}
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                      Submitted successfully
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                      Your form has been submitted. We’ll notify you once it’s
                      processed.
                    </p>

                    {/* small meta line */}
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 border border-gray-200 px-2.5 py-1">
                        Status:{" "}
                        <span className="text-gray-700 font-medium">
                          Success
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 border border-gray-200 px-2.5 py-1">
                        Time:{" "}
                        <span className="text-gray-700 font-medium">
                          Just now
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700
              hover:bg-gray-50 transition"
                  >
                    Close
                  </button>

                  <button
                    onClick={() => setShowSuccess(false)}
                    className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white
              hover:bg-blue-700 active:scale-[0.99] transition"
                  >
                    Done
                  </button>
                </div>
              </div>

              {/* Keyframes */}
              <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes sheetUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0px); }
          }
          @keyframes circleDraw {
            to { stroke-dashoffset: 0; }
          }
          @keyframes checkDraw {
            to { stroke-dashoffset: 0; }
          }
        `}</style>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- HELPERS ---------- */

function Section({ title, subtitle, children }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>

      <div className="border-t border-gray-200 pt-6">{children}</div>
    </div>
  );
}

function Grid({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 sm:gap-y-8 md:gap-x-10">
      {children}
    </div>
  );
}

function Input({ label, icon, error, className = "", ...props }) {
  const { onClick, ...rest } = props; // remove accidental string onClick

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-xs sm:text-sm font-medium text-gray-600">
        {label}
      </label>
      <div
        className={`flex items-center gap-3 rounded-xl px-4 py-3 border
        ${error ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"}`}
      >
        <span className="text-blue-400 shrink-0">{icon}</span>

        <input
          {...rest}
          value={rest.value ?? ""}
          className="w-full bg-transparent outline-none text-sm"
        />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function Textarea({ label, error, className = "", ...props }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-xs sm:text-sm font-medium text-gray-600">
        {label}
      </label>

      <div
        className={`rounded-xl px-4 py-3 border
        ${error ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"}`}
      >
        <textarea
          {...props}
          rows={3}
          className="w-full bg-transparent outline-none text-sm resize-none"
        />
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function UploadBox({ label, accept, onChange, status, file }) {
  {
    file && (
      <button
        type="button"
        onClick={() => onChange(null)}
        className="text-xs text-red-600 hover:underline mt-1"
      >
        Remove
      </button>
    );
  }

  return (
    <div className="relative border border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1 text-sm text-gray-600">
          {file ? (
            <>
              <span className="font-medium truncate">{file.name}</span>
              <span className="text-green-600 text-xs">✔ Uploaded</span>

              {/* ✅ STEP 4 REMOVE BUTTON */}
              <button
                type="button"
                onClick={() => onChange(null)}
                className="text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            </>
          ) : (
            <span className="text-gray-500">Choose file</span>
          )}
        </div>

        <input
          type="file"
          accept={accept}
          onChange={(e) => onChange(e.target.files[0])}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>

      <p className="text-xs text-gray-400 mt-1">
        Allowed formats: PDF, JPG, PNG (Max 2MB)
      </p>
    </div>
  );
}
