const mongoose = require("mongoose");

const orderPaymentSchema = new mongoose.Schema({
  user: {
    user_id: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
  },
  course_id: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["UPI"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  utr: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const OrderPayment = mongoose.model("OrderPayment", orderPaymentSchema);

module.exports = OrderPayment;
