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
      return res.status(400).send({ message: results });
    }

    results = validateData.validateGenre(genre);
    if (results !== true) {
      return res.status(400).send({ message: results });
    }

    results = validateData.validateBiography(biography);
    if (results !== true) {
      return res.status(400).send({ message: results });
    }

    results = validateData.validateEmail(email);
    if (results !== true) {
      return res.status(400).send({ message: results });
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

module.exports = { createAuthor, getAllAuthors };