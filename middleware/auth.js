const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  // Get token from req headers
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token. Authorization denied." });
  }

  try {
    const key = config.get("jwtSecret");
    // Get the hidden data created in post users router.
    // Recall: the data is { user: { id: "..." } }
    const decoded = jwt.verify(token, key);

    // Check if token owner still exists in database
    const user = await User.findById(decoded.user.id).exec();
    if (!user) return res.status(401).json({ msg: "Token is invalid." });

    req.user = decoded.user; // used by signing in route to find user by id, used by get profile route to find user by id
    next();
  } catch (e) {
    // token invalid
    return res.status(401).json({ msg: "Token is invalid." });
  }
};
