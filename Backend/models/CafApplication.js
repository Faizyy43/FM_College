import mongoose from "mongoose";

const cafApplicationSchema = new mongoose.Schema(
  {
    applicationId: { type: String, required: true, unique: true },
    course: { type: String, required: true },
    colleges: { type: [String], default: [] },
    date: { type: String, required: true },
    status: {
      type: String,
      enum: ["Submitted", "Under Review", "Approved", "Rejected"],
      default: "Submitted",
    },
  },
  { timestamps: true },
);

export default mongoose.model("CafApplication", cafApplicationSchema);
