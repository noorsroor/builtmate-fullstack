const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  professional: { type: mongoose.Schema.Types.ObjectId, ref: "Professional", required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "USD" },
  paymentMethod: { type: String, required: true }, // "Credit Card", "PayPal", "Stripe"
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  transactionId: { type: String, required: true },
  subscriptionPlan: { type: String, enum: ["basic", "premium", "enterprise"], required: true },
  validUntil: { type: Date, required: true }, // Subscription expiry date
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
