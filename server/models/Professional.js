const mongoose = require("mongoose");

const ProfessionalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    profession: { type: String, required: true },
    bio: { type: String, default: "" },
    portfolio: [String], // Array of portfolio images or project links
    experience: { type: Number, required: true }, // Years of experience
    certifications: [String], // List of certifications (if any)
    backgroundImage: { type: String, default: "" }, // Will appear on "Find Pro" page
    location: { type: String, required: true },
    availability: { type: Boolean, default: true },
    pricePerHour: { type: Number, required: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    linkedShops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shop" }], // Recommended tool stores
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
    subscriptionPlan: { type: String, enum: ["basic", "premium", "enterprise"], default: "basic" },
    subscriptionExpires: { type: Date },
    status: { type: String, enum: ["pending", "approved","rejected"],default: "pending"},

}, { timestamps: true });

module.exports = mongoose.model("Professional", ProfessionalSchema);
