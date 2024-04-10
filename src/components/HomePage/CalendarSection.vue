<template>
  <section class="calendar-section-container">
    <div class="calendar-section-text">
      <h1 class="section-header">
        Calendar of Classes
      </h1>
      <p class="section-paragraph mt-2">
        Click on the most convenient lesson for you to find out more detailed information about this lesson.
      </p>
    </div>
    <EventCalendar />
  </section>
</template>

<script>
import EventCalendar from "@/components/HomePage/EventCalendar";
export default {
  name: "CalendarSection",
  components: {EventCalendar}
}
</script>

<style scoped>

</style>