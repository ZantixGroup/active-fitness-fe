<template>
  <v-card
      :class="[
          'mx-auto',
          {
            'asd': classes.is_accepted
          }
      ]"
      width="100%"
      hover
  >
    <v-card-item>
      <v-card-title style=" color: #FF4545">
        {{classes.group_class.title}}
      </v-card-title>
      <p v-if="classes.is_accepted" style="color:#7AE582;" >You have been accepted for the group class</p>
      <v-card-subtitle>
        {{classes.group_class.instructor.name}}
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      {{classes.group_class.description}}
    </v-card-text>
    <div v-if="classes.is_accepted === true && classes.is_not_attended === false && classes.is_feedback_sent === null" style="display: flex; flex-direction: column; justify-content: start">
      <div ref="openFeedbackFormButtons" style="display: flex; flex-direction: column; justify-content: start">
        <p style="color: #7AE582; padding-left: 15px">Do you want to leave a feedback ?</p>
        <div style="display: flex; flex-wrap: wrap; width: 100%">
          <v-btn style="color:#7AE582;" type="button" variant="text" @click="openFeedbackForm">leave feedback</v-btn>
          <v-btn style="color:#FF4545;" type="button" variant="text" @click="sendFalseFeedback">No</v-btn>
        </div>
      </div>
      <div ref="feedbackForm" class="feedback-form-card"  style="display: none; flex-wrap: wrap; width: 100%; padding: 15px ">
        <v-form ref="form" lazy-validation style="width: 100%">
          <div style="width: 100%;">
            <v-textarea
                v-model="form.feedback_content"
                :error-messages="this.formErrors.feedback_content"
                :rules="rules.feedback_content"
                label="Feedback content"
                required
                placeholder="Here you can enter feedback"
                variant="outlined"
                row-height="25"
                rows="3"
                auto-grow
                shaped
            ></v-textarea>
          </div>
          <div class="feedback-form-button">
            <v-btn style="color:#7AE582;" type="button" variant="text" @click="sendFeedbackContent" >Save</v-btn>
            <v-btn style="color:#FF4545;" type="button" variant="text" @click="closeFeedbackForm" >Cancel</v-btn>
          </div>
        </v-form>
      </div>
    </div>
  </v-card>
</template>
<script>
import {ruleSetGen} from "/src/helpers/rules.js";

export default {
  props: {
    classes: {
      type: Object,
      default: null,
    },
  },
  data () {
    return {
      form: {
        data: null,
        is_feedback_sent: true,
        feedback_content: null,
      },
      formErrors:{
        is_feedback_sent: null,
        feedback_content: null,
      },
      rules: {
        feedback_content: ruleSetGen.text("Please enter feedback text", true, 3),
      },
    }
  },
  methods: {
    openFeedbackForm() {
      this.$refs.feedbackForm.style.display = "flex"
      this.$refs.openFeedbackFormButtons.style.display = "none"
    },
    closeFeedbackForm() {
      this.$refs.feedbackForm.style.display = "none"
      this.$refs.openFeedbackFormButtons.style.display = "flex"
    },
    async sendFeedbackContent() {
      this.axios.put(`/send_feedback/${this.classes.id}`,this.form).then(() =>{
        window.location.reload()
      }).catch(e => {
        Object.keys(e.response.data.errors).forEach((key) => {
          this.formErrors[key] = e.response.data.errors[key]
        })
      })
    },
    async sendFalseFeedback() {
      this.form = {
        is_feedback_sent: false,
      }
      this.formErrors = {
        name: null,
        surname: null,
        email: null,
        phone: null,
        address: null,
        date_of_birthday: null,
        password: null,
      }
      this.axios.put(`/send_feedback/${this.classes.id}`,this.form).then(response => {
        this.form.data === response.data
        window.location.reload();
      }).catch(e => {
        Object.keys(e.response.data.errors).forEach((key) => {
          this.formErrors[key] = e.response.data.errors[key]
        })
      })
    },
  }
};
</script>
<style scoped>
.asd {
  border: 3px solid #7AE582;
}
</style>