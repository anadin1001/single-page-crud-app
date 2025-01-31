

class Book{
    constructor(id, title, genre, year, description, pages){
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.year = year;
        this.description = description
        this.pages = pages;
    }
}

exports.Book = Book;    