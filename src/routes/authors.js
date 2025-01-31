const express = require("express");

const router = express.Router();

//Metodele sunt create in controllere
// const { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require("../controllers/authorController.js");
const {getAllAuthors, createAuthor} = require("../controllers/authorController");

router.get("/", getAllAuthors);
// router.get("/:id", getAuthorById);
router.post("/", createAuthor);
// router.put("/:id", updateAuthor);
// router.put("/:id", deleteAuthor);

module.exports = router;