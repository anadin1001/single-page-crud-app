const Author = require('../models/Author');
const validateData = require("../utils/validateData.js");
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

const getAllAuthors = async (req, res) => {
  try {
    const authorsRef = await db.collection("authors").get();
    const authors = [];
    authorsRef.forEach((doc) => {
        authors.push({
          id: doc.id, 
          ...doc.data(), 
        });
      });

    res.status(200).json(authors);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "A apărut o eroare la citirea autorilor: " + error.message,
      });
  }
};

const createAuthor = async (req, res) => {
  try {
    const { name, genre, biography, email, age, nationality } = req.body;
    console.log("Received request body:", req.body);
    if (!name || !genre || !biography || !age || !nationality || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    results = validateData.validateAuthor(name);
    if (results !== true) {
      return res.status(400).send({ message: "Problema" });
    }

    results = validateData.validateGenre(genre);
    if (results !== true) {
      return res.status(400).send({ message: "Problema" });
    }

    results = validateData.validateBiography(biography);
    if (results !== true) {
      return res.status(400).send({ message: "Problema" });
    }

    results = validateData.validateEmail(email);
    if (results !== true) {
      return res.status(400).send({ message: "Problema" });
    }

    const authorJSON = {
      name: req.body.name,
      genre: req.body.genre,
      email: req.body.email,
      biography: req.body.biography,
      age: req.body.age,
      nationality: req.body.nationality,
      books:[]
    };

    const responseDB = await db.collection("authors").add(authorJSON);
    res.status(201).json({
      message: "Author has been created!",
      authorId: responseDB.id,
      authorData: authorJSON,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "A apărut o eroare la crearea cărții: " + error.message,
      });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;

    console.log("Received request to delete author:", authorId);

    // id exista
    if (!authorId) {
      return res.status(400).json({ error: "Author ID is required" });
    }

    const authorRef = db.collection("authors").doc(authorId);
    const authorSnapshot = await authorRef.get();

    // autor?
    if (!authorSnapshot.exists) {
      return res.status(404).json({ message: "Author not found" });
    }

    await authorRef.delete();

    res.status(200).json({
      message: "Author deleted successfully",
      authorId: authorId,
    });
  } catch (error) {
    console.error("Error deleting author:", error);
    res.status(500).json({
      message: "Doesn t work",
      error: error.message,
    });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Author ID is required" });
    }

    const authorRef = db.collection("authors").doc(id);
    const authorSnapshot = await authorRef.get();

    if (!authorSnapshot.exists) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json({ id: authorSnapshot.id, ...authorSnapshot.data() });
  } catch (error) {
    res.status(500).json({ message: "Error fetching author", error: error.message });
  }
};


const updateAuthor = async (req, res) => {
  try {
    const { authorId } = req.params; 
    const updateData = req.body;

    if (!authorId) {
      return res.status(400).json({ error: "Author ID is required" });
    }

    const authorRef = db.collection("authors").doc(authorId);
    const authorSnapshot = await authorRef.get();

    if (!authorSnapshot.exists) {
      return res.status(404).json({ message: "Author not found" });
    }

    //verificam daca primim modificare pt un anumit camp si dupa il validam cu regulile
    if (updateData.name && validateData.validateAuthor(updateData.name) !== true) {
      return res.status(400).json({ message: "Invalid name" });
    }

    if (updateData.genre && validateData.validateGenre(updateData.genre) !== true) {
      return res.status(400).json({ message: "Invalid genre" });
    }

    if (updateData.biography && validateData.validateBiography(updateData.biography) !== true) {
      return res.status(400).json({ message: "Invalid biography" });
    }

    if (updateData.email && validateData.validateEmail(updateData.email) !== true) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (updateData.age && isNaN(updateData.age)) {
      return res.status(400).json({ message: "Age must be a number" });
    }

    // actualizam campurile modificate 
    await authorRef.update(updateData);

    res.status(200).json({ message: "Author updated successfully", updatedData: updateData });
  } catch (error) {
    res.status(500).json({ message: "Error updating author", error: error.message });
  }
};


module.exports = { createAuthor, getAllAuthors ,deleteAuthor, getAuthorById, updateAuthor};