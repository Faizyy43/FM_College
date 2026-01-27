import mongoose from "mongoose";

const appliedCollegeSchema = new mongoose.Schema(
  {
    // ✅ add userId (IMPORTANT)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    college: String,
    course: String,
    appliedOn: Date,
    status: {
      type: String,
      default: "Applied",
    },

    // ✅ add this (for auto delete after 7 days)
    deleteAt: { type: Date, default: null },
  },
  { timestamps: true },
);

// ✅ TTL index
appliedCollegeSchema.index({ deleteAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("AppliedCollege", appliedCollegeSchema);
