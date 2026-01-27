import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: String, // dummy user for now
    },
    college: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    fees: {
      type: String,
    },
    status: {
      type: String,
      default: "Submitted",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
