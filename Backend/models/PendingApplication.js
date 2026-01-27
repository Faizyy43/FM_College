import mongoose from "mongoose";

const pendingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    college: String,
    course: String,
    appliedOn: Date,
    reason: String,
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    // ✅ add this (for auto delete after 7 days)
    deleteAt: { type: Date, default: null },
  },
  { timestamps: true },
);

// ✅ TTL index (MongoDB auto delete when deleteAt time comes)
pendingSchema.index({ deleteAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("PendingApplication", pendingSchema);
