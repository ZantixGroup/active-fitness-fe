<template>
  <v-container class="form-container rounded-lg">
    <h1>Jauns lietotājs</h1>
    <CreateForm :fields="fields" name="users" />
  </v-container>
</template>

<script>
import { markRaw } from "vue";
import CreateForm from "@/Admin/components/CreateForm.vue";
import TextField from "@/Admin/components/form/TextField.vue";
import ImagePickField from "@/Admin/components/form/ImagePickField.vue";
import SelectField from "@/Admin/components/form/SelectField.vue";

import { ruleSet, ruleSetGen } from "@/Admin/helpers/rules";
export default {
  name: "UserCreateView",
  components: { CreateForm },
  data() {
    return {
      fields: {
        avatar: {
          component: markRaw(ImagePickField),
          data: {
            label: "Izvēlieties profila attēlu",
            name: "avatar",
            size: 200,
          },
        },
        firstname: {
          component: markRaw(TextField),
          data: {
            label: "Vārds",
            placeholder: "Ievadiet vārdu",
            name: "firstname",
            rules: ruleSetGen.text("Lūdzu ievadiet derīgu vārdu", true, 3),
          },
        },
        lastname: {
          component: markRaw(TextField),
          data: {
            label: "Uzvārds",
            placeholder: "Ievadiet uzvārdu",
            name: "lastname",
            rules: ruleSetGen.text("Lūdzu ievadiet derīgu uzvārdu", true, 3),
          },
        },
        email: {
          component: markRaw(TextField),
          data: {
            label: "E-pasts",
            placeholder: "Ievadiet e-pastu",
            name: "email",
            rules: ruleSet.email,
          },
        },
        phone_number: {
          component: markRaw(TextField),
          data: {
            label: "Telefona numurs",
            placeholder: "Ievadiet telefona numuru",
            name: "phone_number",
            rules: ruleSetGen.phoneNumber(undefined, false),
          },
        },
        personal_code: {
          component: markRaw(TextField),
          data: {
            label: "Personas kods",
            placeholder: "Ievadiet personas kodu",
            name: "personal_code",
            rules: ruleSetGen.persCode(undefined, false),
          },
        },
        role: {
          component: markRaw(SelectField),
          data: {
            label: "Loma",
            placeholder: "Izvēlieties lomu",
            name: "role_id",
            items: [],
            itemTitle: "name",
            itemValue: "id",
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
