const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
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
    req.user = decoded.user; // used by auth router middleware to find user by id.
    next();
  } catch (e) {
    // token invalid
    return res.status(401).json({ msg: "Token is invalid." });
  }
};
