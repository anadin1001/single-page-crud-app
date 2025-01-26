const Author = require('../models/Author');

exports.createAuthor = (req, res) => {
    const author = new Author(req.body.id, req.body.name, req.body.biography, req.body.books, req.body.genre, req.body.email);
    res.status(201).json(author);
}

