<template>
  <v-card variant="flat">
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
.v-card {
  border-radius: 10px;
  color: #454545;
  width: 100%;
}

.v-card-title {
  padding: 20px 20px 0;
}

.v-card-text {
  padding: 0;
}
</style>
