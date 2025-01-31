const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const db = getFirestore();;

const validateData = require("../utils/validateData.js");
const { experimentalSetDeliveryMetricsExportedToBigQueryEnabled } = require("firebase/messaging/sw");


exports.getAllBooks = async (req, res) => {
    try{
  const authorId = req.params.id.trim();

  const authorRef = await db.collection("authors").doc(authorId);
    const author = await authorRef.get();

    if (!author.exists) {
        return res.status(404).json({ message: "Author not found" });
        }

    
        const booksRef = await authorRef.collection("books").get();
        const books = [];
        booksRef.forEach((doc) => {
            books.push({
                id: doc.id,
                data: doc.data(),
            });
        });

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error getting books", error: error.message });
    }
};

exports.createBook = async (req, res) => {
    
    const { authorId, title, genre, year, description, pages } = req.body;

    if (!authorId || !title || !description || !genre || !year || !pages) {
        return res.status(400).json({ error: "All fields are required, including authorId" });
    }

  results = validateData.validateTitle(title);
  if (results !== true) {
    return res.status(400).send({ message: results });
  }

  results = validateData.validateGenre(genre);
  if (results !== true) {
    return res.status(400).send({ message: results });
  }

  results = validateData.validateYear(year);
  if (results !== true) {
    return res.status(400).send({ message: results });
  }

  results = validateData.validateDescription(description);
  if (results !== true) {
    return res.status(400).send({ message: results });
  }

  results = validateData.validatePages(pages);
  if (results !== true) {
    return res.status(400).send({ message: results });
  }

  try {
    const authorRef = db.collection("authors").doc(authorId);
        const authorSnapshot = await authorRef.get();

        if (!authorSnapshot.exists) {
            return res.status(404).json({ message: "Author not found" });
        }

    const bookId = db.collection("authors").doc().id;
    const bookJson = {
        id: bookId,
      title: req.body.title,
      genre: req.body.genre,
      year: req.body.year,
      description: req.body.description,
      pages: req.body.pages,
    };

    await authorRef.update({
        books: FieldValue.arrayUnion(bookJson)
    });

    res.status(201).json({
        message: "Book added to author's book list!",
        bookId: bookId,
        bookData: bookJson,
    });

  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating book", error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  const { authorId, bookId } = req.body;

  if (!authorId || !bookId) {
      return res.status(400).json({ error: "Both authorId and bookId are required" });
  }

  try {

      const authorRef = db.collection("authors").doc(authorId);
      const authorSnapshot = await authorRef.get();

      if (!authorSnapshot.exists) {
          return res.status(404).json({ message: "Author not found" });
      }


      const authorData = authorSnapshot.data();
      const books = authorData.books || [];


      const bookIndex = books.findIndex(book => book.id === bookId);
      if (bookIndex === -1) {
          return res.status(404).json({ message: "Book not found in author's book list" });
      }

    
      const updatedBooks = books.filter(book => book.id !== bookId);

      
      await authorRef.update({
          books: updatedBooks
      });

      res.status(200).json({ message: "Book deleted successfully", bookId });
  } catch (error) {
      res.status(500).json({ message: "Error deleting book", error: error.message });
  }
};