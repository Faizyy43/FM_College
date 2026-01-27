import Application from "../models/Application.js";

/* ================= APPLY COLLEGE ================= */
export const applyCollege = async (req, res) => {
  try {
    const { college, course, fees } = req.body;

    if (!college || !course) {
      return res.status(400).json({
        message: "college and course are required",
      });
    }

    const application = await Application.create({
      user: req.user?.id || "65f1caa111234567890abcd1", // dummy user
      college,
      course,
      fees,
      status: "Submitted",
    });

    res.status(201).json({
      message: "College applied successfully",
      application,
    });
  } catch (error) {
    console.error("APPLY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET MY APPLICATIONS ================= */
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({});

    res.status(200).json({
      applications,
    });
  } catch (error) {
    console.error("GET ERROR:", error);
    res.status(500).json({
      applications: [],
      message: error.message,
    });
  }
};
