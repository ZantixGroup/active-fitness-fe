<template>
  <v-container class="form-container rounded-lg">
    <h1>Edit user</h1>
    <EditForm :fields="fields" name="users" />
  </v-container>
</template>

<script>
import EditForm from "@/Admin/components/EditForm.vue";
import DatePickField from "@/Admin/components/form/DatePickField.vue";
import SelectField from "@/Admin/components/form/SelectField.vue";
import TextField from "@/Admin/components/form/TextField.vue";
import { ruleSet, ruleSetGen } from "@/Admin/helpers/rules";
import { markRaw } from "vue";

export default {
  name: "UserEditView",
  components: { EditForm },
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
        phone: {
          component: markRaw(TextField),
          data: {
            label: "Phone number",
            placeholder: "Enter phone number",
            name: "phone",
            rules: ruleSetGen.phoneNumber("Phone number must be valid", false),
          },
        },
        address: {
          component: markRaw(TextField),
          data: {
            label: "Address",
            placeholder: "Enter address",
            name: "address",
            rules: ruleSetGen.text("Address must be valid", false, 3),
          },
        },
        date_of_birthday: {
          component: markRaw(DatePickField),
          data: {
            label: "Birthday",
            placeholder: "Enter birthday",
            name: "date_of_birthday",
            rules: ruleSetGen.text("Birthday must be valid", false, 3),
          },
        },
        role_id: {
          component: markRaw(SelectField),
          data: {
            label: "Role",
            placeholder: "Select role",
            name: "role_id",
            rules: ruleSet.select,
            items: [],
            itemTitle: "name",
            itemValue: "id",
          },
        },
      },
    };
  },
  async created() {
    this.axios.get(`/users/${this.$route.params.id}`).then(response => {
      for (const key in this.fields) {
        this.fields[key].data.value = response.data.data[key];
      }
    })
    this.fields.role_id.data.items = [
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
    // await fetch(`${config.baseURL}/users/${this.$route.params.id}`, {
    //   method: "GET",
    //   headers: config.headers,
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     for (const key in this.fields) {
    //       this.fields[key].data.value = response.data[key];
    //     }
    //     this.fields.avatar.data.preview = response.data.avatar;
    //     this.fields.role.data.value = response.data.role.id;
    //   });
    //
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
