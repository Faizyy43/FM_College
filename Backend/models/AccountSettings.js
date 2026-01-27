import mongoose from "mongoose";

const accountSettingsSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,

    profileCompleted: {
      type: Boolean,
      default: false, // 🔓 unlocked initially
    },

    password: String, // plain text (no auth)

    notifications: {
      email: { type: Boolean, default: true },
      whatsapp: { type: Boolean, default: true },
      promo: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("AccountSettings", accountSettingsSchema);
