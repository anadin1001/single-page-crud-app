const express = require("express");
const router = express.Router();

// const{getAllBooks, getBookById, createBook, deleteBook, updateBook} = require("../controllers/bookController");
const{getAllBooks, createBook} = require("../controllers/bookController");

router.get("/", getAllBooks);
// router.get("/:id", getBookById);
router.post("/", createBook);
// router.delete("/:id", deleteBook);
// router.put("/:id", updateBook);

module.exports = router;

