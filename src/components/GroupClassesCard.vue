<template>
  <v-card
      id="class-card"
      class="mx-auto"
      width="100%"
      hover
  >
    <v-card-item>
      <v-card-title style=" color: #FF4545">
        {{this.classes.title}}
      </v-card-title>
      <p id="feedback-style" style="display: none; color:#7AE582;" >You have been accepted for the group class</p>
      <v-card-subtitle>
        {{this.classes.instructor.name}}
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      {{this.classes.description}}
    </v-card-text>

    <v-btn id="feedback-button" style="display:none; color:#7AE582;" type="button" @click="openFeedbackForm()" variant="text">leave feedback</v-btn>
    <v-text-field
        id="contet-field"
        style="display:none;"
        color="#FF4545"
        label="Email Address"
        type="email"
        required
        placeholder="Enter your email address"
        variant="underlined"
    ></v-text-field>
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
  mounted() {
    this.axios.get(`/check_if_user_is_accepted/${this.classes.id}`).then(response => {
      if (response.data.is_accepted === true) {
        document.getElementById('class-card').style.border = "2px solid #7AE582";
        document.getElementById('feedback-button').style.display = "block";
        document.getElementById('feedback-style').style.display = "block";
      }
    })
  },
  methods: {
    openFeedbackForm() {
    document.getElementById('contet-field')
    }
  }
};
</script>