<template>
  <v-container>
    <p>{{ data.label }}</p>
    <quill-editor
      v-model:content="value"
      content-type="html"
      theme="snow"
      @input="setValue"
    />
  </v-container>
</template>
<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  name: "TextEditorField",
  components: {
    QuillEditor,
  },
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
  methods: {
    setValue(event) {
      this.value = event.target.innerHTML;
    },
  },
};
</script>
