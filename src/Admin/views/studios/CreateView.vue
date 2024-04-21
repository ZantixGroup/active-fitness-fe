<template>
  <v-container class="form-container rounded-lg">
    <h1>New studio</h1>
    <CreateForm :fields="fields" name="studios" />
  </v-container>
</template>

<script>
import { markRaw } from "vue";
import CreateForm from "@/Admin/components/CreateForm.vue";
import TextField from "@/Admin/components/form/TextField.vue";

import {ruleSet, ruleSetGen} from "@/Admin/helpers/rules";
import SelectField from "@/Admin/components/form/SelectField.vue";
export default {
  name: "StudioCreateView",
  components: { CreateForm },
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
            rules: ruleSet.select,
            items: [],
            itemTitle: "title",
            itemValue: "id",
          },
        },
      },
    };
  },
  async created() {
    await this.axios.get(`/clubs`).then((response) => {
      this.fields.club.data.items = response.data.data;
    })
    // await fetch(`${config.baseURL}/roles`, {
    //   method: "GET",
    //   headers: config.headers,
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     this.fields.role.data.items = response.data;
    //   });
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
