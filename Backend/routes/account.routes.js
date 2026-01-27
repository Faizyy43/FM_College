import express from "express";
import User from "../models/User.js";
import PendingApplication from "../models/PendingApplication.js";
import AppliedCollege from "../models/AppliedCollege.js";
import Review from "../models/Review.js";

const router = express.Router();

router.post("/deactivate-account/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const deleteDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // user deactivate + deleteAt
    await User.findByIdAndUpdate(userId, {
      deactivated: true,
      deleteAt: deleteDate,
    });

    // set deleteAt in other collections
    await PendingApplication.updateMany(
      { userId },
      { $set: { deleteAt: deleteDate } },
    );

    await AppliedCollege.updateMany(
      { userId },
      { $set: { deleteAt: deleteDate } },
    );

    await Review.updateMany({ userId }, { $set: { deleteAt: deleteDate } });

    return res.json({
      message: "Account deactivated. Data will be deleted in 7 days.",
      deleteAt: deleteDate,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
