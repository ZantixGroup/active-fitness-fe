<template>
  <img v-if="$vuetify.display.smAndDown" src="@/assets/images/logo_small.svg" @click="handleImageClick">
  <img v-else src="@/assets/images/logo.svg" @click="handleImageClick">
</template>

<script>
export default {
  name: "NavigationBarLogo",
  methods: {
    handleImageClick() {
      this.$router.push('/');
    }
  },
}
</script>

<style scoped>
img {
  cursor: pointer;
}
</style>