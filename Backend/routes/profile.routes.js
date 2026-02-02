import express from "express";
import Profile from "../models/Profile.js";
import upload from "../middleware/upload.middleware.js";

import {
  saveBasic,
  saveAddress,
  saveEducation,
  saveConsent,
  uploadDocuments,
} from "../controllers/profile.controller.js";

const router = express.Router();

/* ================= GET PROFILE ================= */
// frontend uses GET request
router.get("/get", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile || {});
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

/* ================= PROFILE STEPS ================= */
router.post("/basic", saveBasic);
router.post("/address", saveAddress);

/* ================= EDUCATION ================= */
// Keep single route only
router.post("/education", saveEducation);

/* ================= CONSENT ================= */
router.post("/consent", saveConsent);

/* optional alias */
router.post("/step-5", saveConsent);

/* ================= DOCUMENT UPLOAD ================= */
router.post(
  "/documents",
  upload.fields([
    { name: "tenthMarksheet" },
    { name: "twelfthMarksheet" },
    { name: "aadhaar" },
    { name: "photo" },
  ]),
  uploadDocuments,
);

/* ================= PROFILE IMAGE ================= */
router.post(
  "/upload-image",
  upload.single("profileImage"),
  async (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({ message: "No image uploaded" });

      const profile = await Profile.findOne();
      if (!profile)
        return res.status(404).json({ message: "Profile not found" });

      // use backend URL dynamically
      const imageUrl = `/uploads/${req.file.filename}`;

      profile.profileImage = imageUrl;
      await profile.save();

      res.json({ message: "Profile image saved", imageUrl });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

/* ================= DUMMY LOGIN ================= */
router.post("/login", (req, res) => {
  res.json({
    token: "DUMMY_TOKEN",
    user: {
      id: "65f1caa111234567890abcd1",
      name: "Test User",
      email: "test@example.com",
    },
  });
});

export default router;
