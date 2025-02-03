export const validationRules = {
    // name: [
    //     (value) => !!value || "Numele nu poate fi gol.",
    //     (value) => /^[A-Za-zăâîșțĂÂÎȘȚ\s]+$/.test(value) || "Numele poate contine doar litere si spatii.",
    //     (value) => {
    //         const words = value.split(" ");
    //         for (let word of words) {
    //             if (word !== "" && !/^[A-ZĂÂÎȘȚ][a-zăâîșț]+$/.test(word)) {
    //                 return "Fiecare cuvant trebuie să inceapa cu litera mare si sa fie urmat doar de litere mici.";
    //             }
    //         }
    //         return true;
    //     },
    // ],
    // email: [
    //     (value) => !!value || "Emailul nu poate fi gol.",
    //     (value) => /^[a-zA-Z0-9._-]+@(yahoo\.com|gmail\.com)$/.test(value) || "Emailul trebuie sa fie de forma @yahoo.com sau @gmail.com.",
    // ],
    genre: [
        (value) => !!value || "Genul nu poate fi gol.",
        (value) => [
            "Poezie", "Dragoste", "Thriller", "Fictiune pentru adolescenti",
            "Fictiune", "Fantezie", "Science Fiction", "Horror", "Biografie",
            "Istorie", "Filozofie", "Psihologie", "Educatie", "Stiinte",
            "Tehnologie", "Arte", "Muzica", "Calatorii"
        ].includes(value) || "Genul introdus nu este valid.",
    ],
    // biography: [
    //     (value) => !!value || "Biografia nu poate fi goala.",
    //     (value) => value.length >= 20 || "Biografia trebuie sa aiba minim 20 de caractere.",
    //     (value) => value.length <= 2000 || "Biografia trebuie sa aiba maxim 2000 de caractere.",
    // ],
    // age: [
    //     (value) => !!value || "Varsta este necesara.",
    //     (value) => Number.isInteger(Number(value)) || "Varsta trebuie sa fie un numar intreg.",
    //     (value) => value > 0 || "Varsta trebuie sa fie pozitiva.",
    //     (value) => value <= 120 || "Varsta maxima acceptata este 120.",
    // ],
    // Pentru carti
    title: [
        (value) => !!value || "Title is required",
        (value) => (value && value.length >= 3) || "Title must be at least 3 characters long",
      ],
      year: [
        (value) => !!value || "Year is required",
        (value) => !isNaN(value) || "Year must be a number",
      ],
      description: [
        (value) => !!value || "Description is required",
        (value) => (value && value.length >= 10) || "Description must be at least 10 characters long",
      ],
      pages: [
        (value) => !!value || "Pages is required",
        (value) => !isNaN(value) || "Pages must be a number",
      ],
};
