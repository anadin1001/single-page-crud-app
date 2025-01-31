// const Author = require('../models/Author');
const validateData = require('../utils/validateData.js');

const authors=[];

exports.getAllAuthors  = async(req, res)=>{
    res.status(200).json(authors);
}


exports.createAuthor = (req, res) => {
    const {name, genre, biography,email, age, nationality} = req.body;

    if(!name || !genre || !biography || !age || !nationality || !email){
        return res.status(400).json({error: "All fields are required"});
    }
 
    results = validateData.validateAuthor(name);
    if(results!==true){
        return res.status(400).send({message: results});
    }

    results = validateData.validateGenre(genre);
    if(results!==true){
        return res.status(400).send({message: results});
    }


    results = validateData.validateBiography(biography);
    if(results!==true){
        return res.status(400).send({message: results});
    }

    results = validateData.validateEmail(email);
    if(results!==true){
        return res.status(400).send({message: results});
    }

    try{
        const authorJSON={
            name : req.body.name,
            genre: req.body.genre,
            email:req.body.email,
            biography: req.body.biography,
            age: req.body.age,
            nationality: req.body.nationality
    
        }
    
        authors.push(authorJSON);
        res.status(201).json(authorJSON);
    }catch (error) {
        res.status(500).json({ message: "A apărut o eroare la crearea cărții: " + error.message });
    }
    
}

