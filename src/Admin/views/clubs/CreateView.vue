<template>
  <v-container class="form-container rounded-lg">
    <h1>New club</h1>
    <CreateForm :fields="fields" name="clubs" />
  </v-container>
</template>

<script>
import CreateForm from "@/Admin/components/CreateForm.vue";
import TextField from "@/Admin/components/form/TextField.vue";
import { markRaw } from "vue";

import { ruleSet, ruleSetGen } from "@/Admin/helpers/rules";
export default {
  name: "ClubCreateView",
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
            rules: ruleSetGen.text("Title is required", true, 3),
          },
        },
        address: {
          component: markRaw(TextField),
          data: {
            label: "Address",
            placeholder: "Enter address",
            name: "address",
            rules: ruleSetGen.text("Address is required", true, 3),
          },
        },
        phone: {
          component: markRaw(TextField),
          data: {
            label: "Phone",
            placeholder: "Enter phone number",
            name: "phone",
            rules: ruleSet.phoneNumber,
          },
        },
        email: {
          component: markRaw(TextField),
          data: {
            label: "Email",
            placeholder: "Enter email",
            name: "email",
            rules: ruleSet.email,
          },
        },
      },
    };
  },
  async created() {
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
