const { Router } = require("express");
const router = Router();
require("dotenv").config();
const Course = require("../../models/course");
const User = require("../../models/user");

router.get("/", (req, res) => {
  Course.find()
    .then((courses) => {
      res.status(200).json({ status: "success", data: courses });
    })
    .catch((err) =>
      res.status(200).json({ status: "error", message: "Something went wrong" })
    );
});

router.post("/by_id", (req, res) => {
  const { course_id } = req?.body;
  Course.find({ course_id })
    .then((course) => {
      res.status(200).json({ status: "success", data: course[0] });
    })
    .catch((err) =>
      res.status(200).json({ status: "error", message: "Something went wrong" })
    );
});

router.post("/by_user", (req, res) => {
  const { userId } = req?.body;
  User.find({ userId })
    .then((user) => {
      const courses = user[0].courses.map((courseData) => {
        return courseData.course_id;
      });
      Course.find({ course_id: courses })
        .then((data) => {
          res.status(200).json({ status: "success", courses: data });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(200)
            .json({ status: "error", message: "Something went wrong" });
        });
    })
    .catch((err) =>
      res.status(200).json({ status: "error", message: "Something went wrong" })
    );
});
module.exports = router;
