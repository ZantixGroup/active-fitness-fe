<template>
  <v-container class="container">
    <v-text-field
      v-model="value"
      :label="data.label"
      :placeholder="data.placeholder"
      :rules="data.rules"
      required
      hide-details="auto"
      variant="underlined"
    >
    </v-text-field>
  </v-container>
</template>

<script>
export default {
  name: "TextField",
  props: {
    data: {
      type: Object,
      default: null,
      label: {
        type: String,
        default: null,
      },
      placeholder: {
        type: String,
        default: null,
      },
      required: {
        type: Boolean,
        default: false,
      },
      name: {
        type: String,
        default: "field",
      },
      value: {
        type: String,
        default: null,
      },
      inputType: {
        type: String,
        default: "text",
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
    };
  },
  created() {
    this.value = this.data.value;
  },
  updated() {
    this.value = this.data.value;
  },
};
</script>

<style scoped>
.container {
  height: 70px;
}
</style>
