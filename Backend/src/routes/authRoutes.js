const express = require("express");
const verifyToken = require("../middleware/protectRoutes"); // Middleware-ul de autentificare Firebase
const router = express.Router();

router.get("/protected-data", verifyToken, async (req, res) => {
  res.json({ message: "This is a protected route!", user: req.user });
});

module.exports = router;
