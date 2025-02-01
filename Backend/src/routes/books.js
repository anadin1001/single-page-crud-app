const express = require("express");
const router = express.Router();

// const{getAllBooks, getBookById, createBook, deleteBook, updateBook} = require("../controllers/bookController");
const{getAllBooks, createBook, deleteBook,getBookById, updateBook} = require("../controllers/bookController");

// router.get("/", getAllBooks);
// router.get("/:authorId/:bookId", getBookById);
// router.post("/", createBook);
// router.delete("/", deleteBook);
// router.put("/:authorId/:bookId", updateBook);

router.get("/:authorId", getAllBooks);
router.get("/:bookId", getBookById);
router.post("/", createBook);
router.put("/:authorId/:bookId", updateBook);
router.delete("/", deleteBook);

module.exports = router;


