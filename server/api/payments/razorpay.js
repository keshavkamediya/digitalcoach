const { Router } = require("express");
const router = Router();
require("dotenv").config();
const OrderPayment = require("../../models/order");
const authenticator = require("../../middleware/authenticator");

router.post("/create-order", async (req, res) => {
  const { order, user, utr } = req.body;
  const CreatedOrder = {
    ...order,
    user,
    utr,
  };
  try {
    const orderSave = OrderPayment({
      ...CreatedOrder,
      paymentMethod: "UPI",
    });
    orderSave.save();
    res.status(200).json({ status: "success", message: "Payment successfull" });
  } catch (error) {
    res.status(400).json({ status: "error", message: "Something went wrong" });
  }
});

module.exports = router;
