const express = require("express");
const router = express.Router();

const{getAllBooks, getBookById, createBook, deleteBook, updateBook} = require("../controllers/books");

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.delete("/:id", deleteBook);
router.put("/:id", updateBook);

module.exports = router;