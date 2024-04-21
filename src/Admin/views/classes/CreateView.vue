<template>
  <v-container class="form-container rounded-lg">
    <h1>New group class</h1>
    <CreateForm :fields="fields" name="classes" />
  </v-container>
</template>

<script>
import { markRaw } from "vue";
import CreateForm from "@/Admin/components/CreateForm.vue";
import TextField from "@/Admin/components/form/TextField.vue";

import {ruleSet, ruleSetGen} from "@/Admin/helpers/rules";
import SelectField from "@/Admin/components/form/SelectField.vue";
import DatePickField from "@/Admin/components/form/DatePickField.vue";
export default {
  name: "ClassCreateView",
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
        description: {
          component: markRaw(TextField),
          data: {
            label: "Description",
            placeholder: "Enter description",
            name: "description",
            rules: ruleSetGen.text("", true),
          },
        },
        instructor: {
          component: markRaw(SelectField),
          data: {
            label: "Instructor",
            placeholder: "Select instructor",
            name: "instructor_id",
            rules: ruleSet.select,
            items: [],
            itemTitle: "full_name",
            itemValue: "id",
          },
        },
        starts_at: {
          component: markRaw(DatePickField),
          data: {
            label: "Start at",
            placeholder: "Select start at date",
            name: "starts_at",
            rules: ruleSetGen.text("", true),
          },
        },
        ends_at: {
          component: markRaw(DatePickField),
          data: {
            label: "Ends at",
            placeholder: "Select end at date",
            name: "ends_at",
            rules: ruleSetGen.text("", true),
          },
        },
        studio: {
          component: markRaw(SelectField),
          data: {
            label: "Studio",
            placeholder: "Select studio",
            name: "studio_id",
            rules: ruleSet.select,
            items: [],
            itemTitle: "title",
            itemValue: "id",
          },
        },
        price: {
          component: markRaw(TextField),
          data: {
            label: "Price",
            placeholder: "Enter price",
            name: "price",
            rules: ruleSetGen.price("", true),
          },
        },
      },
    };
  },
  async created() {
    await this.axios.get('/instructors').then((response) => {
      response.data.data.map((user) => {
        user.full_name = `${user.name} ${user.surname}`;
      })
      this.fields.instructor.data.items = response.data.data;
    })

    await this.axios.get(`/studios`).then((response) => {
      this.fields.studio.data.items = response.data.data;
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
