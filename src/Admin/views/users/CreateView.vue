<template>
  <v-container class="form-container rounded-lg">
    <h1>New user</h1>
    <CreateForm :fields="fields" name="users" />
  </v-container>
</template>

<script>
import { markRaw } from "vue";
import CreateForm from "@/Admin/components/CreateForm.vue";
import TextField from "@/Admin/components/form/TextField.vue";
import SelectField from "@/Admin/components/form/SelectField.vue";

import { ruleSet, ruleSetGen } from "@/Admin/helpers/rules";
import DatePickField from "@/Admin/components/form/DatePickField.vue";
export default {
  name: "UserCreateView",
  components: { CreateForm },
  data() {
    return {
      fields: {
        name: {
          component: markRaw(TextField),
          data: {
            label: "Name",
            placeholder: "Enter name",
            name: "name",
            rules: ruleSetGen.text("", true, 3),
          },
        },
        surname: {
          component: markRaw(TextField),
          data: {
            label: "Surname",
            placeholder: "Enter surname",
            name: "surname",
            rules: ruleSetGen.text("", true, 3),
          },
        },
        email: {
          component: markRaw(TextField),
          data: {
            label: "E-pasts",
            placeholder: "Enter email",
            name: "email",
            rules: ruleSet.email,
          },
        },
        password: {
          component: markRaw(TextField),
          data: {
            label: "Password",
            placeholder: "Enter password",
            name: "password",
            rules: ruleSetGen.text("", true, 9),
          },
        },
        phone: {
          component: markRaw(TextField),
          data: {
            label: "Phone number",
            placeholder: "Enter phone number",
            name: "phone",
            rules: ruleSetGen.phoneNumber("", true),
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
        date_of_birthday: {
          component: markRaw(DatePickField),
          data: {
            label: "Birthday",
            placeholder: "Enter birthday",
            name: "date_of_birthday",
            rules: ruleSetGen.text("", true, 3),
          },
        },
        role: {
          component: markRaw(SelectField),
          data: {
            label: "Role",
            placeholder: "Select role",
            name: "role_id",
            rules: ruleSetGen.text("", true),
            items: [],
            itemTitle: "name",
            itemValue: "id",
          },
        },
      },
    };
  },
  async created() {
    this.fields.role.data.items = [
      {
        id: 1,
        name: 'User'
      },
      {
        id: 2,
        name: 'Instructor'
      },
      {
        id: 3,
        name: 'Admin'
      },
    ]
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
