<template>
  <v-icon :icon="this.icon" @click="redirect('edit')"></v-icon>
</template>

<script>
export default {
  name: "RedirectAction",
  props: {
    data: {
      type: Object,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    route: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: "mdi-eye",
    },
  },
  methods: {
    redirect() {
      console.log(this.route);
      this.$router.push(`/admin/${this.name}/${this.route}/${this.data.id}`);
    },
  },
};
</script>
