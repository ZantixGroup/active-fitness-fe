<template>
  <div class="content">
    <h1>Administrator panel</h1>
    <div class="info-card-container info-container ga-6">
      <p>Select section in side bar</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainView",
};
</script>

<style scoped>
.content {
  width: 100%;
}

.info-card-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.info-container {
  margin: 20px 0;
}
</style>
