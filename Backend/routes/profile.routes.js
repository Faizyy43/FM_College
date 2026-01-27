import express from "express";
import Profile from "../models/Profile.js";
import upload from "../middleware/upload.middleware.js";

/* ✅ SINGLE, CORRECT IMPORT (duplicate removed) */
import {
  saveBasic,
  saveAddress,
  saveEducation,
  saveConsent,
  uploadDocuments,
} from "../controllers/profile.controller.js";

const router = express.Router();

/* ================= GET PROFILE ================= */
// profile.routes.js
router.post("/get", async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile || {});
});

/* ================= PROFILE STEPS ================= */
router.post("/basic", saveBasic);
router.post("/address", saveAddress);

/* 
  ⚠️ IMPORTANT:
  You had TWO /education routes.
  Express only runs the LAST one.
  So we KEEP BOTH LOGICS by chaining them safely.
*/
router.post("/education", async (req, res, next) => {
  // call controller version first
  await saveEducation(req, res, () => {});
  next();
});

/* 🔥 MERGE EDUCATION (YOUR CUSTOM FIX – KEPT) */
router.post("/education", async (req, res) => {
  try {
    const { education } = req.body;

    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    profile.education = {
      ...profile.education?.toObject(),
      ...education,
      graduation: {
        ...profile.education?.graduation?.toObject(),
        ...education?.graduation,
      },
      class12: {
        ...profile.education?.class12?.toObject(),
        ...education?.class12,
      },
      class10: {
        ...profile.education?.class10?.toObject(),
        ...education?.class10,
      },
    };

    await profile.save();
    return res.json({ message: "Education saved successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to save education" });
  }
});

/* ================= STEP-5 (CONSENT) ================= */
/* 🔒 THIS IS YOUR FINAL STEP — LOCK TRIGGER */
router.post("/consent", saveConsent);
router.post("/profile/step-5", saveConsent);

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

/* ================= UPLOAD PROFILE IMAGE ================= */
router.post(
  "/upload-image",
  upload.single("profileImage"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

      const profile = await Profile.findOne();
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

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

/* 
  ❌ You previously had:
  router.post("/profile/step-5", submitProfileStep5);

  That function DOES NOT EXIST.
  Step-5 is ALREADY handled by /consent.
  So we alias it safely instead of removing behavior.
*/
router.post("/consent", saveConsent);
router.post("/profile/step-5", saveConsent);

export default router;
