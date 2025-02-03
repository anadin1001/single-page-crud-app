<template>
    <div>
        <v-btn color="red darken-1" class="delete-btn" @click="openDialog">
            Delete
        </v-btn>

        <v-dialog v-model="dialog" max-width="400">
            <v-card>
                <v-card-title class="headline">Confirm Delete</v-card-title>
                <v-card-text>
                    Are you sure you want to delete this author and all their books?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey darken-1" @click="dialog = false">Cancel</v-btn>
                    <v-btn color="red darken-1" @click="deleteAuthor">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<!-- se sterg si cartile din autori! -->
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const dialog = ref(false);

const props = defineProps({
    authorId: String,
});

const emit = defineEmits(["authorDeleted"]);

const openDialog = () => {
    dialog.value = true;
};

// stergem autorul+cartile lui
const deleteAuthor = async () => {
    if (!props.authorId) {
        console.error("Author ID is missing");
        return;
    }

    try {
        console.log(`Deleting author with ID: ${props.authorId}`);

        //prin dispatch stergem atat autor cat si carti
        await store.dispatch("deleteAuthor", props.authorId);

       //eliminam cartile din store ale autorului
        store.dispatch("removeBooksByAuthor", props.authorId);

        //informat componenta parinte 
        emit("authorDeleted", props.authorId);

        dialog.value = false;
    } catch (error) {
        console.error("❌ Error deleting author:", error);
    }
};
</script>

<style scoped>
.delete-btn {
    margin-left: 10px;
}
</style>
