<template>
  <img src="@/assets/images/logo.svg" @click="handleImageClick">
</template>

<script>
export default {
  name: "NavigationBarLogo",
  methods: {
    handleImageClick() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
img {
  cursor: pointer;
}
</style>