<template>
  <v-container class="container w-100 m-0">
    <v-img
      class="border elevation-1 small-image ma-auto"
      :src="preview"
      :style="{ width: `${data.size}px !important` }"
      cover
    />
    <v-file-input
      v-model="value"
      :label="data.label"
      required
      hide-details
      variant="underlined"
      accept="image/png, image/jpeg, image/bmp"
      @change="input"
      @click:clear="preview = null"
    />
  </v-container>
</template>

<script>
export default {
  name: "FileField",
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
      preview: {
        type: String,
        default: null,
      },
      size: {
        type: Number,
        default: 200,
      },
    },
  },
  data() {
    return {
      value: null,
      preview: null,
    };
  },
  created() {
    this.value = this.data.value;
    this.preview = this.data.preview;
  },
  updated() {
    this.preview = this.data.preview;
  },
  methods: {
    input() {
      if (!this.value[0]) return 0;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", (file) => {
        this.preview = file.target.result;
      });

      fileReader.readAsDataURL(this.value[0]);
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  gap: 10px;
  padding: 0 !important;
}

.small-image {
  height: 200px !important;
}
</style>
