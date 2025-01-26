

class Book{
    constructor(id, title, genre, year, description, pages, reviews = []){
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.year = year;
        this.description = description
        this.pages = pages;
        this.reviews = reviews;
    }
}

exports.Book = Book;    