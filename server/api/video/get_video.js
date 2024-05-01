const { Router } = require("express");
const router = Router();
const User = require("../../models/user");
const GetObjectURL = require("../../aws/get_video");
const authenticator = require("../../middleware/authenticator");

require("dotenv").config();

router.post("/", (req, res) => {
  const { video, userId, course_id } = req.body;
  User.find({ userId })
    .then((data) => {
      const courses = data[0].courses.map((courseData) => {
        return courseData.course_id;
      });

      if (courses.includes(course_id)) {
        GetObjectURL(`${course_id}/${video}`)
          .then((URL) => {
            res.status(200).json({ status: "success", url: URL });
          })
          .catch((err) => {
            console.log(err);
            res
              .status(200)
              .json({ status: "error", message: "Something went wrong" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(200)
        .json({ status: "error", message: "Something went wrong" });
    });
});

module.exports = router;
