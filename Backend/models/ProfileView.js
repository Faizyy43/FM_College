import mongoose from "mongoose";

const profileViewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
    viewerName: { type: String, default: "Unknown Viewer" },
    source: { type: String, default: "Unknown Source" },
    viewedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.models.ProfileView ||
  mongoose.model("ProfileView", profileViewSchema);
