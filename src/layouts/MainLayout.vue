<template>
  <v-main>
    <MainNavigationBar />
    <div class="content-wrapper"></div>
    <slot />
    <MainFooter />
  </v-main>
</template>

<script>
import MainNavigationBar from "@/components/MainNavigationBar";
import MainFooter from "@/components/MainFooter";

export default {
  name: "MainLayout",
  components: {
    MainFooter,
    MainNavigationBar
  },
};
</script>

<style scoped>
.content-wrapper {
  margin-top: 60px;
}
</style>
