const express = require("express");

const router = express.Router();

//Metodele sunt create in controllere
const {getAllAuthors, createAuthor, deleteAuthor} = require("../controllers/authorController");

router.get("/", getAllAuthors);
// router.get("/:id", getAuthorById);
router.post("/", createAuthor);
// router.put("/:id", updateAuthor);
router.delete("/", deleteAuthor);

module.exports = router;