const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");

// @route GET /api/auth
// @desc Get user info + Authenticate with existing token
// access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password").exec();
    res.json(user);
  } catch (e) {}
});

// @route    POST /api/auth
// @desc     Authenticate and get token
// @access   Public
const validator = [
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password is required").exists(),
];
router.post("/", [...validator], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credential" }] }); // Be careful not to say email not found, as we don want people to find one if some email goes through
    }
    console.log(password);
    // Check if password is correct
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credential" }] });
    }
    // Create and return jsonwebtoken
    const key = config.get("jwtSecret");
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, key, { expiresIn: "2 days" }, (err, encoded) => {
      if (err) throw err;
      res.json({
        token: encoded,
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
