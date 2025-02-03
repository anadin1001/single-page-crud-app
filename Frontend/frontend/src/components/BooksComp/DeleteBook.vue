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
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const dialog = ref(false);
const authorId = ref(null);

const props = defineProps({
    bookId: String,
});

const emit = defineEmits(["bookDeleted"]);

const openDialog = async () => {
    dialog.value = true;

    // daca in store nu avem autorii, ii luam din backend
    if (!store.state.authors.length) {
        console.log("Fetching authors because store is empty...");
        await store.dispatch("fetchAuthors");
    }

    findAuthorId();
};


// cautam in store autorul 
const findAuthorId = () => {
    const authors = store.state.authors;
    
    console.log("Checking authors in store:", authors); 

    for (const author of authors) {
        console.log("Checking author:", author.id, "Books:", author.books); 

        if (author.books.some(book => book.id === props.bookId)) {
            authorId.value = author.id;
            console.log("Found author ID:", authorId.value);
            return;
        }
    }

    console.error("Author not found for this book!");
};



const deleteBook = async () => {
    if (!authorId.value) {
        console.error("Cannot delete book, authorId not found!");
        return;
    }
    try {
        console.log("Deleting book with:", {
            authorId: authorId.value,
            bookId: props.bookId
        });

        
        await store.dispatch("deleteBook", { authorId: authorId.value, bookId: props.bookId });

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
