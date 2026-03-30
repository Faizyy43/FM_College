import CollegeProfile from "../models/college.profile.model.js";

const TOTAL_STEPS = 5;

const percent = (steps) =>
  Math.round((steps.length / TOTAL_STEPS) * 100);

const markStep = (profile, step) => {
  if (!profile.completedSteps.includes(step)) {
    profile.completedSteps.push(step);
  }
  profile.completionPercentage = percent(profile.completedSteps);
};

/* ================= GET PROFILE ================= */
export const fetchMyCollegeProfile = async (req, res) => {
  try {
    const profile = await CollegeProfile.findOne({
      userId: req.user._id,
    });

    if (!profile)
      return res.status(404).json({ message: "Profile not found" });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= STEP 1 - BASIC DETAILS ================= */
export const saveStep1 = async (req, res) => {
  try {
    const { collegeName, authorizedPerson, email, mobile } = req.body;

    const profile = await CollegeProfile.findOne({
      userId: req.user._id,
    });

    if (!profile)
      return res.status(404).json({ message: "Profile not found" });

    profile.collegeName = collegeName;
    profile.authorizedPerson = authorizedPerson;
    profile.email = email;
    profile.mobile = mobile;

    markStep(profile, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= STEP 2 - TYPE ================= */
export const saveStep2 = async (req, res) => {
  try {
    const { collegeType } = req.body;

    const profile = await CollegeProfile.findOne({
      userId: req.user._id,
    });

    if (!profile)
      return res.status(404).json({ message: "Profile not found" });

    profile.collegeType = collegeType;

    markStep(profile, 2);

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= STEP 3 - ADDRESS ================= */
export const saveStep3 = async (req, res) => {
  try {
    const { state, city, address, pincode } = req.body;

    const profile = await CollegeProfile.findOne({
      userId: req.user._id,
    });

    if (!profile)
      return res.status(404).json({ message: "Profile not found" });

    profile.address = { state, city, address, pincode };

    markStep(profile, 3);

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= STEP 4 - DOCUMENTS ================= */
export const saveStep4 = async (req, res) => {
  try {
    const profile = await CollegeProfile.findOne({
      userId: req.user._id,
    });

    if (!profile)
      return res.status(404).json({ message: "Profile not found" });

    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ message: "No files uploaded" });

    profile.documents = Object.keys(req.files).map((key) => ({
      documentType: key,
      fileUrl: req.files[key][0].path,
      status: "PENDING",
    }));

    markStep(profile, 4);

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= STEP 5 - SUBMIT ================= */
export const saveStep5 = async (req, res) => {
  try {
    const profile = await CollegeProfile.findOne({
      userId: req.user._id,
    });

    if (!profile)
      return res.status(404).json({ message: "Profile not found" });

    profile.status = "submitted";
    profile.profileCompleted = true;

    markStep(profile, 5);

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= FULL PROFILE VIEW ================= */
export const getFullCollegeProfile = async (req, res) => {
  try {
    const profile = await CollegeProfile.findOne({
      userId: req.user._id,
    });

    if (!profile)
      return res.status(404).json({ message: "Profile not found" });

    res.json({
      basicDetails: {
        collegeName: profile.collegeName,
        authorizedPerson: profile.authorizedPerson,
        email: profile.email,
        mobile: profile.mobile,
      },
      collegeType: profile.collegeType,
      address: profile.address,
      documents: profile.documents,
      status: profile.status,
      completionPercentage: profile.completionPercentage,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch full profile",
      error: error.message,
    });
  }
};
