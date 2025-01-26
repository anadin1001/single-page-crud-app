

class Author{
    constructor(id, name, biography, books = [], genre, email){
        this.id = id;
        this.name = name;
        this.biography = biography;
        this.books = books;
        this.genre = genre;
        this.email = email;
    }
}

exports.Author = Author;