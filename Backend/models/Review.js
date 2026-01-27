import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    // ✅ add userId (IMPORTANT)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    name: String,
    rating: Number,
    comment: String,

    // ✅ add this (for auto delete after 7 days)
    deleteAt: { type: Date, default: null },
  },
  { timestamps: true },
);

// ✅ TTL index
reviewSchema.index({ deleteAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Review", reviewSchema);
