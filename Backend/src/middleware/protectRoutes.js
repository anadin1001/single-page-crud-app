const { auth } = require("../utils/firebase");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(403).json({ error: "Token required" });

    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token", details: error.message });
  }
};

module.exports = verifyToken;
