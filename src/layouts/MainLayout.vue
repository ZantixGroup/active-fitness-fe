<template>
  <v-main>
    <MainNavigationBar />
    <!-- Lai content neaiziet aiz header -->
    <div class="content-wrapper">
      <slot />
    </div>
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