import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["superadmin", "moderator"], default: "moderator" },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", AdminSchema);
