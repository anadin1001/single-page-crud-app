const GENRES = [
    "Poezie", "Dragoste", "Thriller", "Fictiune pentru adolescenti",
    "Ficțiune", "Fantezie", "Science Fiction", "Horror", "Biografie",
    "Istorie", "Filozofie", "Psihologie", "Educatie", "Stiinte",
    "Tehnologie", "Arte", "Muzica", "Calatorii"
];

function validateTitle(titleName){
    if(!titleName){
        return "Title is required";
    }

    if(titleName.length < 2 || titleName.length > 50){
        return "Title must be between 2 and 50 characters";
    }

    return true;
}

function validateDescription(description){
    if(!description){
        return "Description is required";
    }

    if(description.length < 10 || description.length > 500){
        return "Description must be between 10 and 500 characters";
    }

    return true;
}

function validateGenre(genre){
    if(!genre){
        return "Genre is required";
    }

    if(!GENRES.includes(genre)){
        return "Genre is not valid";
    }

    return true;
}

function validateEmail(email){
    if(!email){
        return "Email is required";
    }

    const formatPattern = /^[a-zA-Z0-9._-]+@/;
    if (!formatPattern.test(email)) {
        return "Emails must contain only letters, numbers, dots, underscores and hyphens.";
    }
    
    const domainPattern = /@(yahoo\.com|gmail\.com)$/;
    if (!domainPattern.test(email)) {
        return "Email must contain @yahoo.com or @gmail.com";
    }
    return true;
}

function validateAuthor(authorName){
    if (!authorName) {
        return "Author name is required.";
    }
    if (!/^[A-Za-zăâîșțĂÂÎȘȚ\s]+$/.test(authorName)) {
        return "Author name must contain only letters and spaces.";
    }
    const names = authorName.split(" ");
    for (let part of names) {
        if (!/^[A-ZĂÂÎȘȚ][a-zăâîșț]+$/.test(part)) {
            return "Every part of the name must start with an uppercase letter and continue with lowercase letters.";
        }
    }
    return true;
}

function validateBiography(biography) {
    if (!biography) {
        return "Biography is required.";
    }
    if (biography.length < 20 || biography.length > 2000) {
        return "Biography must be between 20 and 2000 characters.";
    }
    return true;
}

function validatePages(pages) {
    if (!pages) {
        return "The page number is required.";
    }
    if (!Number.isInteger(pages) || pages < 1 || pages > 10000) {
        return "The page number must be at least 1.";
    }
    return true;
}

function validateYear(year) {
    const currentYear = new Date().getFullYear();
    if (!year) {
        return "Please enter the year of publication.";
    }
    if (!Number.isInteger(year) || year > currentYear+1) {
        return `The year of publication must be before  ${currentYear+1}.`;
    }
    return true;
}



module.exports = {
    validateTitle,
    validateDescription,
    validateGenre,
    validateEmail,
    validateAuthor,
    validateBiography,
    validatePages,
    validateYear,
};