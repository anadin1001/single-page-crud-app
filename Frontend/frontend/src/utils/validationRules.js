export const validationRules = {
    name: [
        (value) => !!value || "Numele nu poate fi gol.",
        (value) => /^[A-Za-zăâîșțĂÂÎȘȚ\s]+$/.test(value) || "Numele poate contine doar litere si spatii.",
        (value) => {
            const words = value.split(" ");
            for (let word of words) {
                if (word !== "" && !/^[A-ZĂÂÎȘȚ][a-zăâîșț]+$/.test(word)) {
                    return "Fiecare cuvant trebuie să inceapa cu litera mare si sa fie urmat doar de litere mici.";
                }
            }
            return true;
        },
    ],
    email: [
        (value) => !!value || "Emailul nu poate fi gol.",
        (value) => /^[a-zA-Z0-9._-]+@(yahoo\.com|gmail\.com)$/.test(value) || "Emailul trebuie sa fie de forma @yahoo.com sau @gmail.com.",
    ],
    genre: [
        (value) => !!value || "Genul nu poate fi gol.",
        (value) => [
            "Poezie", "Dragoste", "Thriller", "Fictiune pentru adolescenti",
            "Fictiune", "Fantezie", "Science Fiction", "Horror", "Biografie",
            "Istorie", "Filozofie", "Psihologie", "Educatie", "Stiinte",
            "Tehnologie", "Arte", "Muzica", "Calatorii"
        ].includes(value) || "Genul introdus nu este valid.",
    ],
    biography: [
        (value) => !!value || "Biografia nu poate fi goala.",
        (value) => value.length >= 20 || "Biografia trebuie sa aiba minim 20 de caractere.",
        (value) => value.length <= 2000 || "Biografia trebuie sa aiba maxim 2000 de caractere.",
    ],
    age: [
        (value) => !!value || "Varsta este necesara.",
        (value) => Number.isInteger(Number(value)) || "Varsta trebuie sa fie un numar intreg.",
        (value) => value > 0 || "Varsta trebuie sa fie pozitiva.",
        (value) => value <= 120 || "Varsta maxima acceptata este 120.",
    ],
};
