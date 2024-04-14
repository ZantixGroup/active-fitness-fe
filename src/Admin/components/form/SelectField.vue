<template>
  <v-container class="container">
    <v-select
      v-model="value"
      :label="data.label"
      :placeholder="data.placeholder"
      :rules="data.rules"
      :items="data.items"
      :item-title="data.itemTitle"
      :item-value="data.itemValue"
      persistent-hint
      return-object
      single-line
      required
      variant="underlined"
    >
    </v-select>
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
      name: {
        type: String,
        default: "field",
      },
      value: {
        type: String,
        default: null,
      },
      items: {
        type: Array,
        default: [],
      },
      itemValue: {
        type: String,
        default: null,
      },
      itemTitle: {
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
