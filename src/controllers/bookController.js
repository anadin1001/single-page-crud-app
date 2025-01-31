const db = require("../utils/firebase"); // Configurarea Firebase
const { collection, addDoc } = require("firebase/firestore");
const { getFirestore } = require("firebase/firestore");

const validateData = require('../utils/validateData.js');


let books = [];

exports.getAllBooks = async(req, res)=>{
    try {
        res.status(200).json(books); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createBook = async(req, res) => {

    const {title, genre, year, description, pages } = req.body;

    if(!title || !description || !genre || !year || !pages){
        return res.status(400).json({error: "All fields are required"});
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

    results = validateData.validateDescription(description);
    if(results.error){
        return res.status(400).json({error: results.error.details[0].message});
    }

    results = validateData.validatePages(pages);
    if(results.error){
        return res.status(400).json({error: results.error.details[0].message});
    }

    try{
        const bookJson = {
            title: req.body.title, 
            genre: req.body.genre,
            year: req.body.year,
            description:req.body.description,
            pages: req.body.pages
        };

        books.push(bookJson);
        res.status(201).json(bookJson);
    } catch (error) {
        res.status(500).json({ message: "A apărut o eroare la crearea cărții: " + error.message });
    }

   

  //To do: Add the book to the database
    // const response = await db.collection("").add(bookJson);
    //     res.status(201).json({
    //         message: "Book created successfully",
    //         medicId: response.id,
    //         medicData: medicJson 
    //     });
    // } catch (error) {
    //     res.status(500).send({
    //         message: "Error creating book",
    //         error: error.message
    //     });
    // }

};

