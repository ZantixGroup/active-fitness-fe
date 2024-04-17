<template>
  <v-container class="form-container rounded-lg">
    <h1>Edit studio</h1>
    <EditForm :fields="fields" name="studios" />
  </v-container>
</template>

<script>
import { markRaw } from "vue";
import TextField from "@/Admin/components/form/TextField.vue";

import { ruleSetGen } from "@/Admin/helpers/rules";
import EditForm from "@/Admin/components/EditForm.vue";
import SelectField from "@/Admin/components/form/SelectField.vue";
export default {
  name: "StudioEditView",
  components: { EditForm },
  data() {
    return {
      fields: {
        title: {
          component: markRaw(TextField),
          data: {
            label: "Title",
            placeholder: "Enter title",
            name: "title",
            rules: ruleSetGen.text("", true, 3),
          },
        },
        capacity: {
          component: markRaw(TextField),
          data: {
            label: "Capacity",
            placeholder: "Enter capacity",
            name: "capacity",
            rules: ruleSetGen.number("", true),
          },
        },
        club: {
          component: markRaw(SelectField),
          data: {
            label: "Club",
            placeholder: "Select club",
            name: "club_id",
            rules: ruleSetGen.text("", true),
            items: [],
            itemTitle: "title",
            itemValue: "id",
          },
        },
      },
    };
  },
  async created() {
    await this.axios.get(`/studios/${this.$route.params.id}`)
      .then((response) => {
        for (const key in this.fields) {
          this.fields[key].data.value = response.data.data[key];
        }
      })

    await this.axios.get(`/clubs`).then((response) => {
      this.fields.club.data.items = response.data.data;
    })
  },
};
</script>

<style scoped>
.form-container {
  width: 1000px;
  margin: auto;
  background-color: white;
  padding: 10px;
}
</style>
