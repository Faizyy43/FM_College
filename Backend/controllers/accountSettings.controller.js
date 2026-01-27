import AccountSettings from "../models/AccountSettings.js";
import Profile from "../models/Profile.js"; // ✅ import profile
import Review from "../models/Review.js"; // optional if exists

export const deleteAccount = async (req, res) => {
  try {
    // Delete Account Settings
    await AccountSettings.deleteMany({});

    // Delete Profile
    await Profile.deleteMany({});

    // OPTIONAL: delete other user-related data
    // await Review.deleteMany({});

    return res.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ================= GET SETTINGS ================= */
export const getAccountSettings = async (req, res) => {
  try {
    const settings = await AccountSettings.findOne();
    const profile = await Profile.findOne();

    return res.json({
      name: profile?.name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      notifications: settings?.notifications || {
        email: true,
        whatsapp: true,
        promo: true,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= CREATE / UPDATE SETTINGS ================= */
export const saveAccountSettings = async (req, res) => {
  try {
    const existing = await AccountSettings.findOne();

    // ✅ ALWAYS NORMALIZE BEFORE SAVE
    const payload = {
      ...req.body,
      phone: req.body.phone || req.body.mobile || req.body.mobileNumber || "",
    };

    if (existing) {
      const updated = await AccountSettings.findByIdAndUpdate(
        existing._id,
        payload,
        { new: true }
      );
      return res.json(updated);
    }

    const created = await AccountSettings.create(payload);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
