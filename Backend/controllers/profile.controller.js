import Profile from "../models/Profile.js";
import AccountSettings from "../models/AccountSettings.js"; // ✅ ADD THIS

/* GET PROFILE (POST) */
export const getProfile = async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile || {});
};

/* BASIC DETAILS */
export const saveBasic = async (req, res) => {
  const profile = await Profile.findOneAndUpdate({}, req.body, {
    upsert: true,
    new: true,
  });
  res.json(profile);
};

/* ADDRESS */
export const saveAddress = async (req, res) => {
  const profile = await Profile.findOneAndUpdate({}, req.body, { new: true });
  res.json(profile);
};

/* EDUCATION */
export const saveEducation = async (req, res) => {
  const profile = await Profile.findOneAndUpdate(
    {},
    { education: req.body.education },
    { new: true }
  );
  res.json(profile);
};

/* CONSENT  ✅ STEP-5 FINAL */
export const saveConsent = async (req, res) => {
  try {
    console.log("✅ STEP 5 CONSENT CALLED");

    const profile = await Profile.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });

    return res.json(profile); // ✅ ONLY ONE RESPONSE
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* DOCUMENT UPLOAD */
export const uploadDocuments = async (req, res) => {
  const docs = {};

  Object.keys(req.files || {}).forEach((key) => {
    docs[key] = req.files[key][0].path;
  });

  const profile = await Profile.findOneAndUpdate(
    {},
    { documents: docs },
    { new: true }
  );

  res.json(profile);
};
