const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route    POST /api/users
// @desc     Sign Up
// @access   Public
const validator = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password length must be at least 5 characters").isLength({
    min: 5,
  }),
];
router.post("/", [...validator], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User already exists " }] });
    }
    // Get user's gravatar
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    // Hash user password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    user = new User({
      name,
      email,
      avatar,
      password: hash,
    });
    await user.save();

    // Return jsonwebtoken
    const key = config.get("jwtSecret");
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, key, { expiresIn: "2 days" }, (err, encoded) => {
      if (err) throw err;
      res.json({ token: encoded });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
