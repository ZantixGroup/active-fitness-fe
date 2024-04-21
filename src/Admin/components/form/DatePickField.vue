<template>
  <v-container class="container">
    <v-text-field
        v-model="value"
        :label="data.label"
        :rules="data.rules"
        prepend-icon="mdi-calendar"
        variant="underlined"
        type="datetime-local"
        hide-details="auto"
    />
  </v-container>
</template>

<script>
export default {
  name: "DatePickField",
  props: {
    data: {
      type: Object,
      default: null,
      value: {
        type: String,
        default: null,
      },
      name: {
        type: String,
        default: "field",
      },
      label: {
        type: String,
        default: null,
      },
      rules: {
        type: Array,
        default: null,
      },
    },
  },
  data() {
    return {
      value: null,
    }
  },
  created() {
    this.value = this.data.value;
  },
  updated() {
    this.value = this.data.value;
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  gap: 10px;
  padding: 0 !important;
}

.input {
  margin-top: 20px;
}
</style>
