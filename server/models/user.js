require("./../database/connection");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  profile: {
    type: String,
  },
  userId: {
    type: Number,
    default: Math.floor(Math.random() * 1000000 + 1),
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  // phone: {
  //   type: String,
  //   required: [true, "Phone is required"],
  //   unique: [true, "Phone already registered"],
  // },
  password: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: String,
    default: new Date().toLocaleString(),
  },
  courses: [
    {
      course_id: { type: Number, required: true },
      purchased: {
        type: String,
        default: new Date().toLocaleString(),
      },
      utr_id: String,
    },
  ],
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
