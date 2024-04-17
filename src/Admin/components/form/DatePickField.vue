<template>
  <v-text-field
    class="input"
    v-model="value"
    :label="data.label"
    :rules="data.rules"
    prepend-icon="mdi-calendar"
    variant="underlined"
    type="datetime-local"
  />
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
.input {
  margin-top: 20px;
}
</style>
