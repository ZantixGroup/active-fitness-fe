<template>
  <v-icon icon="mdi-pencil" @click="redirect('edit')"></v-icon>
</template>

<script>
export default {
  name: "EditAction",
  props: {
    data: {
      type: Object,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
  },
  methods: {
    redirect() {
      this.$router.push(`/admin/${this.name}/edit/${this.data.id}`);
    },
  },
};
</script>
