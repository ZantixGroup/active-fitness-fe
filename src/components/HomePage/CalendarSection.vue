<template>
  <section class="calendar-section-container">
    <div class="calendar-section-text">
      <h1 class="section-header">
        Nodarbību kalendārs
      </h1>
      <p class="section-paragraph mt-2">
        Uzspiediet uz jums ērtāko nodarbību lai uzzinātu padziļinātāku informāciju par šo nodarbību.
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