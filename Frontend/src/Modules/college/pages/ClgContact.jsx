import { useEffect, useState } from "react";
import CollegeLayout from "../../../layout/CollegeLayout"
import {
  FiSave,
  FiPhone,
  FiMail,
  FiGlobe,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import toast from "react-hot-toast";

import {
  fetchCollegeContact,
  updateCollegeContact,
} from "../services/clgContact.api";

export default function ClgContact() {
  const [contact, setContact] = useState({
    phone: "",
    email: "",
    website: "",
    address: "",
    locationLink: "",
    collegeTiming: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */

  useEffect(() => {
    loadContact();
  }, []);

  const loadContact = async () => {
    try {
      const res = await fetchCollegeContact();
      setContact(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= CHANGE ================= */

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= SAVE ================= */

  const handleSave = async () => {
    try {
      setLoading(true);

      await updateCollegeContact(contact);

      toast.success("Contact Info Updated ✅");
    } catch (err) {
      toast.error("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CollegeLayout>
      <div className="relative py-16 px-6">
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-indigo-50 via-white to-purple-50" />

        <div
          className="
            max-w-4xl mx-auto
            bg-white/70 backdrop-blur-xl
            border border-white/40
            rounded-4xl
            shadow-[0_20px_60px_rgba(0,0,0,0.06)]
            p-12
            space-y-10
          "
        >
          {/* HEADER */}

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Contact Settings
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your public college contact information
            </p>
          </div>

          {/* INPUTS */}

          <div className="space-y-6">
            <Input
              icon={<FiPhone />}
              label="Phone Number"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
            />

            <Input
              icon={<FiMail />}
              label="Email Address"
              name="email"
              value={contact.email}
              onChange={handleChange}
            />

            <Input
              icon={<FiGlobe />}
              label="Website"
              name="website"
              value={contact.website}
              onChange={handleChange}
            />

            <Input
              icon={<FiMapPin />}
              label="College Address"
              name="address"
              value={contact.address}
              onChange={handleChange}
            />

            <Input
              icon={<FiMapPin />}
              label="Google Maps Location Link"
              name="locationLink"
              value={contact.locationLink}
              onChange={handleChange}
            />

            <Input
              icon={<FiClock />}
              label="College Timing"
              name="collegeTiming"
              value={contact.collegeTiming}
              onChange={handleChange}
            />
          </div>

          {/* SAVE BUTTON */}

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={loading}
              className="
                flex items-center gap-2
                px-8 py-3 rounded-xl
                bg-linear-to-r from-indigo-600 to-purple-600
                text-white font-semibold
                shadow-lg
                hover:scale-105 transition
                disabled:opacity-50
              "
            >
              <FiSave />

              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </CollegeLayout>
  );
}

/* ================= INPUT COMPONENT ================= */

function Input({ label, icon, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>

        <input
          {...props}
          className="
            w-full pl-12 pr-4 py-4
            rounded-xl
            bg-gray-50
            focus:bg-white
            focus:ring-2 focus:ring-indigo-500
            outline-none transition
          "
        />
      </div>
    </div>
  );
}