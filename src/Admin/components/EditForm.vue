<template>
  <v-form ref="form" class="w-100 d-flex flex-column mt-5" @submit.prevent>
    <!--  Success message  -->
    <v-alert
      v-show="success"
      type="success"
      class="mb-5"
      text="Row was edited"
    ></v-alert>

    <!--  Failure message  -->
    <v-alert
      v-show="failure"
      type="error"
      class="mb-5"
      text="An error occurred"
    ></v-alert>

    <!--  Form content  -->
    <component
      :is="field.component"
      v-for="(field, index) in fields"
      :key="index"
      :ref="field.data.name"
      v-model="field.data.value"
      :data="field.data"
      class="component"
    >
    </component>

    <!-- Submit button -->
    <v-btn
      type="submit"
      block
      class="mt-5"
      text="Edit"
      @click="submit"
    ></v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    fields: {
      type: Object,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      success: false,
      failure: false,
    };
  },
  methods: {
    async submit() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) return;
      this.loading = true;
      const formData = new FormData();
      for (const key in this.fields) {
        const field = this.$refs[this.fields[key].data.name][0];
        if (field.value === null || field.value === undefined) continue;
        if (typeof field.value === "object") {
          if (field.value[0]) {
            formData.append(field.data.name, field.value[0]);
          } else {
            formData.append(field.data.name, field.value.id);
          }
        } else {
          formData.append(field.data.name, field.value);
        }
      }

      await this.axios.post(`/${this.name}/${this.$route.params.id}?_method=PUT`, formData).then(() => {
        this.success = true;
        setTimeout(() => {
          this.$router.push(`/admin/${this.name}/list`);
        }, 1000);
      }).catch(() => {
        this.failure = true;
      }).finally(() => {
        this.loading = false;
      });
      // await fetch(
      //   `${config.baseURL}/${this.name}/${this.$route.params.id}?_method=PUT`,
      //   {
      //     method: "POST",
      //     headers: config.formDataHeaders,
      //     body: formData,
      //   },
      // )
      //   .then((response) => {
      //     if (response.ok) {
      //       this.success = true;
      //       setTimeout(() => {
      //         this.$router.push(`/admin/${this.name}/list`);
      //       }, 1000);
      //     } else {
      //       this.failure = true;
      //     }
      //   })
      //   .finally(() => {
      //     this.loading = false;
      //   });
    },
  },
};
</script>

<style scoped>
form {
  gap: 5px;
  padding: 10px;
}
</style>
