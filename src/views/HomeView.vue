<template>
  <div class="content">
    <HeaderSection />
    <CalendarSection />
  </div>
</template>

<script>

import HeaderSection from "@/components/HomePage/HeaderSection";
import CalendarSection from "@/components/HomePage/CalendarSection";
export default {
  name: 'HomeView',
  components: {CalendarSection, HeaderSection},
}
</script>

<style scoped>
.content {
  margin-top: 60px;
}
</style>
