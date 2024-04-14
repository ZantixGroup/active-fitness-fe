<template>
  <MainNavigationBar />
  <div class="content-wrapper">
    <slot />
  </div>
</template>

<script>
import MainNavigationBar from "@/components/MainNavigationBar";

export default {
  name: "AuthLayout.vue",
  components: {
    MainNavigationBar
  },
}
</script>

<style scoped>
.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

</style>