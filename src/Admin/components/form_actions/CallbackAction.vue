<template>
  <v-icon :icon="this.icon" @click="callback(data)"></v-icon>
</template>

<script>
export default {
  name: "RedirectAction",
  props: {
    data: {
      type: Object,
      default: null,
    },
    icon: {
      type: String,
      default: "mdi-eye",
    },
    callback: {
      type: Function,
      default: () => {},
    },
  }
}
</script>
