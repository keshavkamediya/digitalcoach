const express = require("express");
const cors = require("cors");

const Auth = require("./api/auth/auth");
const News = require("./api/news/news");
const Wallet = require("./api/wallet/wallet");
const Get_Course = require("./api/course/get_course");
const GetVideoURI = require("./api/video/get_video");
const Payments = require("./api/payments/razorpay");
const serverIP = process.env.server_ip;
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    // credentials: true,
    allowedHeaders: "*",
  })
);
app.use("/auth", Auth);
app.use("/wallet", Wallet);
app.use("/news", News);
app.use("/get-course", Get_Course);
app.use("/payment", Payments);
app.use("/get-video-uri", GetVideoURI);
app.get("/", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
