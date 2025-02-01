const express = require("express");
const router = express.Router();

// Endpoint de test
router.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

module.exports = router;
