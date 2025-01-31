const admin = require("firebase-admin");
const { faker } = require("@faker-js/faker");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const validateData = {
  validateAuthor: (name) => name.length > 2 && name.length < 50,
  validateGenre: (genre) => ["Fantasy", "Sci-Fi", "Mystery", "Romance", "Horror"].includes(genre),
  validateBiography: (bio) => bio.length > 10,
  validateEmail: (email) => /\S+@\S+\.\S+/.test(email),
  validateAge: (age) => age >= 18 && age <= 100,
  validateNationality: (nationality) => nationality.length > 2,
  validateTitle: (title) => title.length > 3,
  validateYear: (year) => year >= 1800 && year <= new Date().getFullYear(),
  validateDescription: (description) => description.length > 10,
  validatePages: (pages) => pages >= 50 && pages <= 2000,
};

//Gnerare autor
const generateAuthor = () => {
  let name, genre, biography, email, age, nationality;

  do {
    name = faker.person.fullName();
  } while (!validateData.validateAuthor(name));

  do {
    genre = faker.helpers.arrayElement(["Fantasy", "Sci-Fi", "Mystery", "Romance", "Horror"]);
  } while (!validateData.validateGenre(genre));

  do {
    biography = faker.lorem.sentence(15);
  } while (!validateData.validateBiography(biography));

  do {
    email = faker.internet.email();
  } while (!validateData.validateEmail(email));

  do {
    age = faker.number.int({ min: 18, max: 100 });
  } while (!validateData.validateAge(age));

  do {
    nationality = faker.location.country();
  } while (!validateData.validateNationality(nationality));

  return {
    name,
    genre,
    biography,
    email,
    age,
    nationality,
    books: [], 
  };
};

//generare carte
const generateBook = () => {
  let title, year, description, pages;

  do {
    title = faker.lorem.words(3);
  } while (!validateData.validateTitle(title));

  do {
    year = faker.number.int({ min: 1800, max: new Date().getFullYear() });
  } while (!validateData.validateYear(year));

  do {
    description = faker.lorem.sentence(20);
  } while (!validateData.validateDescription(description));

  do {
    pages = faker.number.int({ min: 50, max: 2000 });
  } while (!validateData.validatePages(pages));

  return {
    id: faker.string.uuid(), //id unic
    title,
    year,
    description,
    pages,
  };
};

// Funcție pentru popularea bazei de date
const dbPopulation = async () => {
  console.log("Populare:");

  for (let i = 0; i < 10; i++) {
    const authorData = generateAuthor();
    const authorRef = await db.collection("authors").add(authorData);
    console.log(`Autor: ${authorData.name} (ID: ${authorRef.id})`);

    // 1-5 carti de fiecare
    const numberOfBooks = faker.number.int({ min: 1, max: 5 });
    let books = [];

    for (let j = 0; j < numberOfBooks; j++) {
      const bookData = generateBook();
      books.push(bookData);
    }

    await authorRef.update({ books });
    console.log(`Adaugate ${books.length} carti pentru ${authorData.name}`);
  }

  console.log("Completed database populare");
  process.exit(); 
};


dbPopulation().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
