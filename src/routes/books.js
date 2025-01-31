const express = require("express");
const router = express.Router();

// const{getAllBooks, getBookById, createBook, deleteBook, updateBook} = require("../controllers/bookController");
const{getAllBooks, createBook, deleteBook,getBookById} = require("../controllers/bookController");

router.get("/", getAllBooks);
router.get("/:authorId/:bookId", getBookById);
router.post("/", createBook);
router.delete("/", deleteBook);
// router.put("/:id", updateBook);

module.exports = router;

