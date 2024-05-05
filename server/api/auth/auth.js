const { Router } = require("express");
const router = Router();
const User = require("./../../models/user");
require("dotenv").config();
const { encode } = require("node-base64-image");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltingRounds = 10;
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "info@digitalcoach4u.com",
    pass: "Kabir@498",
  },
});

const sendEmail = async (email, code) => {
  const info = await transporter.sendMail({
    from: '"DigitalCoach4u " <info@digitalcoach4u.com>', // sender address
    to: email, // list of receivers
    subject: "Your OTP for registering on DigitalCoach4u", // Subject line
    text: `Hello ✔, Your OTP for registering on DigitalCoach4u is ${code}`, // plain text bod
    html: `Hello ✔, Your OTP for registering on DigitalCoach4u is ${code}`, // html body
  });
  return info;
};

router.post("/register/otp", async (req, res) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((users) => {
      if (users) {
        res.status(200).json({
          status: "error",
          message:
            "Email already registered with another account. Please Sign-In",
        });
      } else {
        const verificationCode = Math.floor(
          Math.random() * 1000000 + 1
        ).toString();
        if (email) {
          sendEmail(email, verificationCode)
            .then((data) => {
              res.status(200).json({
                status: "success",
                message: "OTP has been sent to your email",
                verificationCode,
              });
              return;
            })
            .catch((error) => {
              res
                .status(200)
                .json({ status: "error", message: "Something went wrong" });
              return;
            });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(200)
        .json({ status: "error", message: "Something went wrong" });
    });
});

router.post("/register", async (req, res) => {
  const data = req.body;
  let encodeImage = await encode(
    `https://api.multiavatar.com/${data.username}.png`,
    {
      string: true,
      headers: {
        "User-Agent": "my-app",
      },
    }
  );
  bcrypt
    .hash(data.password, saltingRounds)
    .then((hashedPassword) => {
      data.password = hashedPassword;
      data.profile = encodeImage;
      let NewUser = new User(data);
      NewUser.save()
        .then((response) => {
          res.status(200).json({
            status: "success",
            message: "User registered successfully.",
          });
        })
        .catch((err) => {
          res
            .status(200)
            .json({ status: "error", message: "Failed to register." });
          console.log(err);
        });
    })
    .catch((err) => {
      res.status(200).json({ status: "error", message: "Some error occured" });
      console.log(err);
    });
});

router.post("/login", (req, res) => {
  const { username, password, remember } = req.body;
  User.findOne({ email: username })
    .then((data) => {
      if (data) {
        let ProfileImage = data.profile;
        data.profile = undefined;
        bcrypt
          .compare(password, data.password)
          .then(async (verified) => {
            if (verified) {
              const AccessToken = jwt.sign(
                { ...data },
                process.env.JWT_Secret,
                { expiresIn: remember ? "1h" : "15m" }
              );
              if (AccessToken) {
                res.status(200).json({
                  status: "success",
                  message: "User logged in successfully.",
                  accesstoken: AccessToken,
                  profile: ProfileImage,
                });
              } else {
                res
                  .status(200)
                  .json({ status: "error", message: "Some error occured." });
              }
            } else {
              res
                .status(200)
                .json({ status: "error", message: "Incorrect password." });
            }
          })
          .catch((error) => {
            res
              .status(200)
              .json({ status: "error", message: "Some error occured." });
            console.log(error);
          });
      } else {
        res.status(200).json({ status: "error", message: "User not found." });
      }
    })
    .catch((error) => {
      res
        .status(200)
        .json({ status: "error", message: "Some error occured at our side." });
      console.log(error);
    });
});

module.exports = router;
