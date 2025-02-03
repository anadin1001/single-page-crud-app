<template>
    <div>
        <v-btn color="blue darken-1" class="edit-btn" @click="openDialog">
            Edit
        </v-btn>

        <v-dialog v-model="dialog" max-width="500">
            <v-card>
                <v-card-title class="headline">Edit Book</v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field v-model="editedBook.title" label="Title" :error-messages="validationErrors.title"
                            @input="validateField('title')"></v-text-field>

                        <v-text-field v-model="editedBook.genre" label="Genre" :error-messages="validationErrors.genre"
                            @input="validateField('genre')"></v-text-field>

                        <v-text-field v-model="editedBook.year" label="Year" type="number"
                            :error-messages="validationErrors.year" @input="validateField('year')"></v-text-field>

                        <v-textarea v-model="editedBook.description" label="Description"
                            :error-messages="validationErrors.description" @input="validateField('description')">
                        </v-textarea>

                        <v-text-field v-model="editedBook.pages" label="Pages" type="number"
                            :error-messages="validationErrors.pages" @input="validateField('pages')"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="green darken-1" @click="submitUpdate">Save</v-btn>
                    <v-btn color="red darken-1" @click="closeDialog">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { bookValidationRules } from "@/utils/validationRules";

const store = useStore();
const dialog = ref(false);

const props = defineProps({
    book: Object,
    authorId: String,

});

const findAuthorId = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/authors");
        const authors = response.data;

        for (const author of authors) {
            if (author.books.some(book => book.id === props.book.id)) {
                console.log("Found Author ID:", author.id);
                return author.id;
            }
        }
        console.error("Author ID not found for this book.");
        return null;
    } catch (error) {
        console.error("Error fetching authors:", error);
        return null;
    }
};


// const emit = defineEmits(["bookUpdated"]);

const editedBook = ref({ ...props.book });

const validationErrors = ref({
    title: [],
    genre: [],
    year: [],
    description: [],
    pages: [],
});


const openDialog = () => {
    editedBook.value = { ...props.book };
    validationErrors.value = {
        title: [],
        genre: [],
        year: [],
        description: [],
        pages: [],
    };
    dialog.value = true;
};

const validateField = (field) => {
    validationErrors.value[field] = bookValidationRules[field]
        .map((rule) => rule(editedBook.value[field]))
        .filter((result) => result !== true);
};


const validateForm = () => {
    let isValid = true;
    Object.keys(bookValidationRules).forEach((field) => {
        validateField(field);
        if (validationErrors.value[field].length > 0) {
            isValid = false;
        }
    });
    return isValid;
};


const submitUpdate = async () => {
    if (!validateForm()) {
        return;
    }
    let authorIdToUse = props.authorId || await findAuthorId();
    if (!authorIdToUse) {
        console.error("Author ID is missing!");
        return;
    }

    console.log("Sending update request with:", {
    authorId: authorIdToUse,
    bookId: props.book.id,
    updatedData: editedBook.value
  });

    try {
        await store.dispatch("updateBook", {
            authorId: authorIdToUse,
            bookId: props.book.id,
            updatedData: editedBook.value,
        });

        // emit("bookUpdated", editedBook.value);
        dialog.value = false;
    } catch (error) {
        console.error("Error updating book:", error);
    }
};

const closeDialog = () => {
    dialog.value = false;
};
</script>

<style scoped>
.edit-btn {
    margin-left: 10px;
}
</style>
