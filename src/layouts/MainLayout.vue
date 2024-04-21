<template>
  <v-main>
    <MainNavigationBar />
    <div class="content-wrapper">
      <slot />
    </div>
  </v-main>
</template>

<script>
import MainNavigationBar from "@/components/MainNavigationBar"

export default {
  name: "MainLayout",
  components: {
    MainNavigationBar
  },
};
</script>

<style scoped>
.content-wrapper {
  margin-top: 60px;
}
</style>
