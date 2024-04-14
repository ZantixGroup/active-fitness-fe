<template>
  <div class="info-card d-flex align-center">
    <div class="info-card-content d-flex align-center ga-5">
      <v-icon :icon="icon" size="60px"></v-icon>
      <div class="info-card-content-text d-flex flex-column">
        <h2 class="info-card-title">{{ title }}</h2>
        <p class="info-card-value">{{ value }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoCard",
  props: {
    title: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
.info-card {
  border-radius: 10px;
  background-color: white;
  color: #454545;
  height: 100px;
  width: 100%;
  padding: 0 24px;
}

.info-card-title {
  font-size: 18px;
  line-height: 32px;
  font-weight: 400;
  white-space: nowrap;
}

.info-card-value {
  font-size: 28px;
  line-height: 32px;
  font-weight: 500;
}
</style>
