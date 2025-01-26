const db = require("../utils/firebase"); // Configurarea Firebase
const { collection, addDoc } = require("firebase/firestore");
const { getFirestore } = require("firebase/firestore");
import { Book } from '../models/Book.js';
const validateData = require('../utils/validateData.js');

exports.createBook = async(req, res) => {
    try {

    const {title, author, genre, year, price } = req.body;

    if(!title || !author || !genre || !year || !price){
        return res.status(400).json({error: "All fields are required"});
    }
    
    let results = validateData.validateAuthor(author);
    if(results.error){
        return res.status(400).json({error: results.error.details[0].message});
    }

    results = validateData.validateTitle(title);
    if(results.error){
        return res.status(400).json({error: results.error.details[0].message});
    }

    results = validateData.validateGenre(genre);
    if(results.error){
        return res.status(400).json({error: results.error.details[0].message});
    }

    results = validateData.validateYear(year);
    if(results.error){
        return res.status(400).json({error: results.error.details[0].message});
    }

    results = validateData.validatePrice(price);
    if(results.error){
        return res.status(400).json({error: results.error.details[0].message});
    }

    const bookJson = {
        tittle: req.body.title, 
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year,
        price: req.body.price
    };

  //To do: Add the book to the database
    const response = await db.collection("").add(bookJson);
        res.status(201).json({
            message: "Book created successfully",
            medicId: response.id,
            medicData: medicJson 
        });
    } catch (error) {
        res.status(500).send({
            message: "Error creating book",
            error: error.message
        });
    }

};

