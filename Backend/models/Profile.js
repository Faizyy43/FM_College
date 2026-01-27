import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
    password: String,
    dateOfBirth: String,

    profileImage: { type: String, default: "" },

    city: String,
    state: String,
    pincode: String,

    education: {
      graduation: Object,
      class12: Object,
      class10: Object,
    },

    documents: {
      tenthMarksheet: String,
      twelfthMarksheet: String,
      aadhaar: String,
      photo: String,
    },

    referralCode: String,
    source: String,
    consentAccepted: Boolean,
    whatsappConsent: Boolean,

    isDeactivated: { type: Boolean, default: false },
    deletionScheduledAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export default mongoose.model("Profile", profileSchema);
