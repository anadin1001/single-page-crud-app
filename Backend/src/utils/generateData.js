const admin = require("firebase-admin");
const { faker } = require("@faker-js/faker");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const validateData = {
  validateAuthor: (name) => name.length > 2 && name.length < 50,
  validateGenre: (genre) =>
    [
      "Poezie", "Dragoste", "Thriller", "Fictiune pentru adolescenti",
      "Ficțiune", "Fantezie", "Science Fiction", "Horror", "Biografie",
      "Istorie", "Filozofie", "Psihologie", "Educatie", "Stiinte",
      "Tehnologie", "Arte", "Muzica", "Calatorii"
    ].includes(genre),
  validateBiography: (bio) => bio.length > 10,
  validateEmail: (email) => /^[\w.-]+@(yahoo\.com|gmail\.com)$/i.test(email),
  validateAge: (age) => age >= 18 && age <= 100,
  validateNationality: (nationality) => nationality.length > 2,
  validateTitle: (title) => /^[A-Z]/.test(title) && title.length > 3,
  validateYear: (year) => year >= 1800 && year <= new Date().getFullYear(),
  validateDescription: (description) => description.length > 10,
  validatePages: (pages) => pages >= 50 && pages <= 2000,
};

// Generare autor cu atribute și cărți minimalizate
const generateAuthor = () => {
  let name, genre, biography, email, age, nationality;

  do {
    name = faker.person.fullName();
  } while (!validateData.validateAuthor(name));

  do {
    genre = faker.helpers.arrayElement([
      "Poezie", "Dragoste", "Thriller", "Fictiune pentru adolescenti",
      "Ficțiune", "Fantezie", "Science Fiction", "Horror", "Biografie",
      "Istorie", "Filozofie", "Psihologie", "Educatie", "Stiinte",
      "Tehnologie", "Arte", "Muzica", "Calatorii"
    ]);
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
    books: [], // Cărțile vor fi adăugate după
  };
};

// Generare carte completă
const generateBook = () => {
  let title, year, description, pages, genre;

  do {
    title = faker.lorem.words(3);
    title = title.charAt(0).toUpperCase() + title.slice(1); // Prima literă mare
  } while (!validateData.validateTitle(title));

  do {
    year = faker.number.int({ min: 1800, max: new Date().getFullYear() });
  } while (!validateData.validateYear(year));

  do {
    description = faker.lorem.sentence(20);
  } while (!validateData.validateDescription(description));

  do {
    genre = faker.helpers.arrayElement([
      "Poezie", "Dragoste", "Thriller", "Fictiune pentru adolescenti",
      "Ficțiune", "Fantezie", "Science Fiction", "Horror", "Biografie",
      "Istorie", "Filozofie", "Psihologie", "Educatie", "Stiinte",
      "Tehnologie", "Arte", "Muzica", "Calatorii"
    ]);
  } while (!validateData.validateGenre(genre));

  do {
    pages = faker.number.int({ min: 50, max: 2000 });
  } while (!validateData.validatePages(pages));

  return {
    title,
    year,
    description,
    genre,
    pages,
  };
};

// Funcție pentru popularea bazei de date
const dbPopulation = async () => {
  console.log("Populare în curs...");

  for (let i = 0; i < 10; i++) {
    const authorData = generateAuthor();
    const authorRef = await db.collection("authors").add(authorData);
    console.log(`Autor creat: ${authorData.name} (ID: ${authorRef.id})`);

    // Generare între 1 și 5 cărți pentru fiecare autor
    const numberOfBooks = faker.number.int({ min: 1, max: 5 });
    let bookSnapshots = [];

    for (let j = 0; j < numberOfBooks; j++) {
      const bookData = generateBook();
      const bookRef = await db.collection("books").add(bookData);

      bookSnapshots.push({
        id: bookRef.id, // Referință către carte
        title: bookData.title,
        year: bookData.year,
      });
    }

    // Adăugare referințe către cărți în autor
    await authorRef.update({ books: bookSnapshots });

    console.log(`Adăugate ${bookSnapshots.length} cărți pentru ${authorData.name}`);
  }

  console.log("Populare finalizată!");
  process.exit();
};

// Executare script populare BD
dbPopulation().catch((error) => {
  console.error("Eroare la populare:", error);
  process.exit(1);
});
