<template>
  <div class="content">
    <HeaderSection />
    <div v-if="this.most_frequent_class" class="most-frequent-class" style="display: flex; justify-content: start; width: 100%; flex-direction: column; margin-bottom: 30px;">
      <h1 class="section-header">Our most popular group class:</h1>
      <span class="section-header" style="color: #FF4545; padding-left: 25px">{{this.most_frequent_class.title}}</span>
    </div>
    <CalendarSection />
  </div>
</template>

<script>

import CalendarSection from "@/components/HomePage/CalendarSection"
import HeaderSection from "@/components/HomePage/HeaderSection"
export default {
  name: 'HomeView',
  components: {CalendarSection, HeaderSection},
  data() {
    return {
      most_frequent_class: null,
    }
  },
  mounted() {
    this.axios.get(`/most_popular_class`).then(response => {
      this.most_frequent_class = response.data[0]
    })
  }
}
</script>

<style scoped>
.content {
  margin-top: 60px;
}
</style>
