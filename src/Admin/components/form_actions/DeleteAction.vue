<template>
  <v-icon icon="mdi-delete" @click="deleteDialog = true"></v-icon>
  <v-dialog v-model="deleteDialog" width="500px">
    <v-card>
      <v-card-text> Are you sure want to delete this row? </v-card-text>
      <v-container class="d-flex justify-space-between align-center">
        <v-btn color="primary" @click="deleteRow">Delete</v-btn>
        <v-btn color="primary" variant="text" @click="deleteDialog = false"
          >Close</v-btn
        >
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>

export default {
  name: "DeleteAction",
  props: {
    data: {
      type: Object,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
  },
  emits: ["change"],
  data: () => {
    return {
      deleteDialog: false,
    };
  },
  methods: {
    async deleteRow() {
      this.axios.delete(`/${this.name}/${this.data.id}`).then(() => {
        this.deleteDialog = false;
        this.$emit("change");
      })
    },
  },
};
</script>
