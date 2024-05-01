const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function () {
  return function (req, res, next) {
    const { authtoken } = req.headers;
    console.log(req.headers);
    if (authtoken) {
      jwt.verify(authtoken, process.env.JWT_Secret, (error, decoded) => {
        if (error) {
          res
            .status(200)
            .json({ status: "error", code: 401, message: "unauthorised user" });
          return;
        }
        next();
      });
    } else {
      res
        .status(200)
        .json({ status: "error", code: 401, message: "unauthorised user" });
    }
  };
};
