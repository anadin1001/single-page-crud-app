<template>
    <div>
        <v-btn color="red" icon @click="openDialog">
            <v-icon>mdi-delete</v-icon>
            Delete
        </v-btn>

        <v-dialog v-model="dialog" max-width="400px">
            <v-card>
                <v-card-title class="headline">Confirm Delete</v-card-title>
                <v-card-text>Are you sure you want to delete this book?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="gray" @click="dialog = false">Cancel</v-btn>
                    <v-btn color="red" @click="deleteBook">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import axios from "axios";

const dialog = ref(false);
const authorId = ref(null);

const props = defineProps({
    bookId: String,
});


const emit = defineEmits(["bookDeleted"]);

const openDialog = async () => {
    dialog.value = true;
    await findAuthorId();
};

//din cauza ca in bookView afisam cartile din colectia books, nu este prevazut un id de autor
//    asa ca trb sa l cautam manual pt a putea stergeac cartea si din autori
const findAuthorId = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/authors`);
        const authors = response.data;

        for (const author of authors) {
            if (author.books.some(book => book.id === props.bookId)) {
                console.log(author.id);
                authorId.value = author.id;
                console.log(authorId.value);
                return;
            }
        }
        console.error("Author not found for this book!");
    } catch (error) {
        console.error("Error fetching authors:", error);
    }
};

// onMounted(findAuthorId);

const deleteBook = async () => {
    if (!authorId.value) {
        console.error("Cannot delete book, authorId not found!");
        return;
    }
    try {
        console.log("Sending DELETE request with:", {
            authorId: authorId.value,
            bookId: props.bookId
        });

        //axios.delete nu are date trimite prin body deci folosim axios cu specificatii
        await axios({
            method: "DELETE",
            url: "http://localhost:8080/api/books",
            data: { authorId: authorId.value, bookId: props.bookId }, // ✅ Asigură-te că este în `data`
            headers: { "Content-Type": "application/json" } // ✅ Setează explicit JSON
        });

        emit("bookDeleted", props.bookId);
        dialog.value = false;
    } catch (error) {
        console.error("Error deleting book:", error.response?.data || error);
    }
};
</script>

<style scoped>
.v-btn {
    margin-left: 8px;
}
</style>