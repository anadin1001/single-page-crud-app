<template>
    <div>
        <v-btn color="red darken-1" class="delete-btn" @click="openDialog">
            Delete
        </v-btn>


        <v-dialog v-model="dialog" max-width="400">
            <v-card>
                <v-card-title class="headline">Confirm Delete</v-card-title>
                <v-card-text>Are you sure you want to delete this author?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey darken-1" @click="dialog = false">Cancel</v-btn>
                    <v-btn color="red darken-1" @click="deleteAuthor">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";
import axios from "axios";

const props = defineProps({
    authorId: String,
});

const emit = defineEmits(["onDelete"]);
const dialog = ref(false);

//cand apas pe buton se afiseaza dialogul
const openDialog = () => {
    dialog.value = true;
};


const deleteAuthor = async () => {
    try {
        if (!props.authorId) {
            console.error("Author ID is missing");
            return;
        }

        console.log(`Deleting author with ID: ${props.authorId}`);

        const response = await axios.delete(`http://localhost:8080/api/authors/${props.authorId}`);

        if (response.status === 200) {
            console.log("Author deleted successfully:", response.data);
            emit("authorDeleted", props.authorId);
            dialog.value = false;
        } else {
            console.error("Failed to delete author:", response);
        }
    } catch (error) {
        console.error("Error deleting author:", error);
    }
};
</script>

<style scoped>
.delete-btn {
    margin-left: 10px;
}
</style>