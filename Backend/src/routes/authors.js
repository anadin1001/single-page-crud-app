const express = require("express");

const router = express.Router();

//Metodele sunt create in controllere
const {getAllAuthors, createAuthor, deleteAuthor, getAuthorById, updateAuthor} = require("../controllers/authorController");

router.get("/", getAllAuthors);
// router.get("/:id", getAuthorById);
router.post("/", createAuthor);
router.put("/:authorId", updateAuthor);
router.delete("/:id", deleteAuthor);
router.get("/:authorId", getAuthorById);

module.exports = router;