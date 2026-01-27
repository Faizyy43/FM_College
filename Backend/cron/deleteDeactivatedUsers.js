import cron from "node-cron";
import Profile from "../models/Profile.js";
import PendingApplication from "../models/PendingApplication.js";
import ProfileView from "../models/ProfileView.js";

export const startDeleteCron = () => {
  // Runs every 1 hour
  cron.schedule("0 * * * *", async () => {
    try {
      console.log("🕒 Checking for accounts to delete...");

      const now = new Date();

      // Find users who are deactivated AND 7 days time is finished
      const usersToDelete = await Profile.find({
        isDeactivated: true,
        deletionScheduledAt: { $lte: now },
      });

      for (const user of usersToDelete) {
        const userId = user._id;

        // Delete all user data
        await PendingApplication.deleteMany({ userId });
        await ProfileView.deleteMany({ userId });

        // Delete profile
        await Profile.deleteOne({ _id: userId });

        console.log("✅ Deleted user permanently:", userId);
      }
    } catch (err) {
      console.log("❌ CRON ERROR:", err);
    }
  });
};
