var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
const { body, validationResult } = require("express-validator");

router.post(
  "/register",
  body("username").custom((value) => {
    // Check with Database model method findUserByUserName
    /* return User.findUserByUserName(value).then(user => { */
    if (value == "username") {
      return Promise.reject("User name already in use");
    }
    return true;
    /*  }); */
  }),
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({
    min: 6,
  }),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
    });
  }
);
module.exports = router;
