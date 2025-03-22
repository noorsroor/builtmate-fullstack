const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profilePicture: { type: String, default: "" },
    professionalId: { type: mongoose.Schema.Types.ObjectId, ref: "Professional" },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports= mongoose.model("User", UserSchema);
