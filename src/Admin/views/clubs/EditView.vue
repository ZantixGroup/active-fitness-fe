<template>
  <v-container class="form-container rounded-lg">
    <h1>Edit club</h1>
    <EditForm :fields="fields" name="clubs" />
  </v-container>
</template>

<script>
import { markRaw } from "vue";
import TextField from "@/Admin/components/form/TextField.vue";

import { ruleSet, ruleSetGen } from "@/Admin/helpers/rules";
import EditForm from "@/Admin/components/EditForm.vue";
export default {
  name: "ClubEditView",
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
        address: {
          component: markRaw(TextField),
          data: {
            label: "Address",
            placeholder: "Enter address",
            name: "address",
            rules: ruleSetGen.text("", true, 3),
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
    await this.axios.get(`/clubs/${this.$route.params.id}`)
      .then((response) => {
        for (const key in this.fields) {
          this.fields[key].data.value = response.data.data[key];
        }
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
