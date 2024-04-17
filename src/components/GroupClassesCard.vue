<template>
  <v-card
      class="mx-auto"
      width="100%"
      hover
  >
    <v-card-item>
      <v-card-title style=" color: #FF4545">
        {{this.classes.title}}
      </v-card-title>

      <v-card-subtitle>
        {{this.classes.instructor.name}}
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      {{this.classes.description}}
    </v-card-text>

  </v-card>
</template>
<script>
export default {
  props: {
    classes: {
      type: Object,
      default: null,
    },
  },
};
</script>