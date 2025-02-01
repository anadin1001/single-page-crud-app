const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const db = getFirestore();
const validateData = require("../utils/validateData.js");

exports.getAllBooksByAuthor = async (req, res) => {
    try {
        const authorId = req.params.authorId.trim();
        const authorRef = db.collection("authors").doc(authorId);
        const authorSnapshot = await authorRef.get();

        if (!authorSnapshot.exists) {
            return res.status(404).json({ message: "Author not found" });
        }

        const bookSnapshots = authorSnapshot.data().books || [];
        if (bookSnapshots.length === 0) {
            return res.status(200).json({ message: "No books found for this author", books: [] });
        }

       
        const booksPromises = bookSnapshots.map(book => db.collection("books").doc(book.id).get());
        const bookDocs = await Promise.all(booksPromises);
        const books = bookDocs.map(bookSnap => ({ id: bookSnap.id, ...bookSnap.data() }));

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error getting books", error: error.message });
    }
};

exports.getAllBooks = async (req, res) => {
try{
    const books = [];
    const booksRef = await db.collection("books").get();
    booksRef.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(books);
}catch(error){
    res.status(500).json({ message: "Error getting books", error: error.message });
};
};

exports.createBook = async (req, res) => {
    try {
        const { authorId, title, genre, year, description, pages } = req.body;

        if (!authorId || !title || !genre || !year || !description || !pages) {
            return res.status(400).json({ error: "All fields are required, including authorId" });
        }

        
        const validators = {
            title: validateData.validateTitle(title),
            genre: validateData.validateGenre(genre),
            year: validateData.validateYear(year),
            description: validateData.validateDescription(description),
            pages: validateData.validatePages(pages),
        };

        for (const [key, result] of Object.entries(validators)) {
            if (result !== true) {
                return res.status(400).json({ message: `${key} is invalid: ${result}` });
            }
        }

        // exista autor?
        const authorRef = db.collection("authors").doc(authorId);
        const authorSnapshot = await authorRef.get();
        if (!authorSnapshot.exists) {
            return res.status(404).json({ message: "Author not found" });
        }

        // add book in collection
        const bookRef = db.collection("books").doc();
        const bookData = { id: bookRef.id, title, genre, year, description, pages };
        await bookRef.set(bookData);

        //add book in author
        await authorRef.update({
            books: FieldValue.arrayUnion({ id: bookRef.id, title, year })
        });

        res.status(201).json({ message: "Book added!", bookData });
    } catch (error) {
        res.status(500).json({ message: "Error creating book", error: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const { bookId } = req.params;
        const bookRef = db.collection("books").doc(bookId);
        const bookSnapshot = await bookRef.get();

        if (!bookSnapshot.exists) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ id: bookSnapshot.id, ...bookSnapshot.data() });
    } catch (error) {
        res.status(500).json({ message: "Error fetching book", error: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const { authorId, bookId } = req.params;
        const updateData = req.body;

        if (!authorId || !bookId) {
            return res.status(400).json({ error: "Both authorId and bookId are required" });
        }

        const bookRef = db.collection("books").doc(bookId);
        const bookSnapshot = await bookRef.get();
        if (!bookSnapshot.exists) {
            return res.status(404).json({ message: "Book not found" });
        }

        await bookRef.update(updateData);

        // Sincronizăm title și year în lista de cărți a autorului (dacă s-au schimbat)
        if (updateData.title || updateData.year) {
            const authorRef = db.collection("authors").doc(authorId);
            const authorSnapshot = await authorRef.get();
            if (authorSnapshot.exists) {
                let books = authorSnapshot.data().books || [];
                const bookIndex = books.findIndex(book => book.id === bookId);
                if (bookIndex !== -1) {
                    books[bookIndex] = {
                        ...books[bookIndex],
                        title: updateData.title || books[bookIndex].title,
                        year: updateData.year || books[bookIndex].year,
                    };
                    await authorRef.update({ books });
                }
            }
        }

        res.status(200).json({ message: "Book updated successfully", updatedBook: { id: bookId, ...updateData } });
    } catch (error) {
        res.status(500).json({ message: "Error updating book", error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const { authorId, bookId } = req.body;

        if (!authorId || !bookId) {
            return res.status(400).json({ error: "Both authorId and bookId are required" });
        }

        const bookRef = db.collection("books").doc(bookId);
        const bookSnapshot = await bookRef.get();
        if (!bookSnapshot.exists) {
            return res.status(404).json({ message: "Book not found" });
        }

        await bookRef.delete();

        // Ștergem cartea din lista autorului
        const authorRef = db.collection("authors").doc(authorId);
        const authorSnapshot = await authorRef.get();
        if (authorSnapshot.exists) {
            let books = authorSnapshot.data().books || [];
            books = books.filter(book => book.id !== bookId);
            await authorRef.update({ books });
        }

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error: error.message });
    }
};
