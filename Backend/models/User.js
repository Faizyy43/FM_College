import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    password: String,

    deactivated: { type: Boolean, default: false },

    // 🔥 MongoDB auto delete after time
    deleteAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// ✅ TTL Index (auto delete when deleteAt time reached)
userSchema.index({ deleteAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("User", userSchema);
