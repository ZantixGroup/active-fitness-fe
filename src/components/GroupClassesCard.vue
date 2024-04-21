<template>
  <v-card
    :class="[
      'mx-auto card',
      {
        'is_accepted': classes.is_accepted && canCancelParticipation,
      }
    ]"
    width="100%"
    hover
  >
    <v-card-item>
      <v-card-title class="d-flex overflow-visible flex-column flex-sm-row justify-space-between align-center mb-2" style="color: #FF4545">
        {{classes.group_class.title}}<span style="color: gray; margin-left: 15px; font-size: 15px; font-weight: 300;">{{ classes.group_class.starts_at.substring(0, classes.group_class.starts_at.length - 3) }}</span>
        <v-spacer />
        <v-btn v-if="canCancelParticipation" @click="cancelParticipation" color="primary">
          Cancel Participation
        </v-btn>
      </v-card-title>
      <v-card-subtitle>
        <p>{{ descriptionText }}</p>
        <p class="mt-3">{{ classes.group_class.instructor.name }} {{ classes.group_class.instructor.surname }}</p>
        <p>Studio: {{ classes.group_class.studio.title }}</p>
        <p>Address: {{ classes.group_class.studio.club.title }} {{ classes.group_class.studio.club.address }}</p>
        <p>Contact: {{ classes.group_class.studio.club.phone }} - {{ classes.group_class.studio.club.email }}</p>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      {{classes.group_class.description}}
      <div v-if="canLeaveFeedback" style="display: flex; flex-direction: column; justify-content: start; margin-top: 10px;">
        <div ref="openFeedbackFormButtons" style="display: flex; flex-direction: column; justify-content: start">
          <p style="color: #7AE582;">Do you want to leave us feedback?</p>
          <div style="display: flex; flex-wrap: wrap; width: 100%; margin-top: 10px;">
            <v-btn style="color:#7AE582; margin-right: 10px;" type="button" @click="openFeedbackForm">leave feedback</v-btn>
            <v-btn style="color:#FF4545;" type="button" @click="sendFalseFeedback">No</v-btn>
          </div>
        </div>
        <div ref="feedbackForm" class="feedback-form-card" style="display: none; flex-wrap: wrap; width: 100%;">
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
            <div class="feedback-form-button d-flex" style="margin-top: 5px; gap: 15px;">
              <v-btn style="color:#7AE582;" type="button" @click="sendFeedbackContent" >Save</v-btn>
              <v-btn style="color:#FF4545;" type="button" @click="closeFeedbackForm" >Cancel</v-btn>
            </div>
          </v-form>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import axios from "axios"
import { ruleSetGen } from "/src/helpers/rules.js"

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
  computed: {
    canCancelParticipation() {
      return new Date(this.classes.group_class.starts_at) > new Date() && this.classes.is_not_attended !== true
    },
    canLeaveFeedback() {
      return new Date(this.classes.group_class.ends_at) < new Date() && this.classes.is_feedback_sent === null
    },
    descriptionText() {
      if (new Date(this.classes.group_class.ends_at) < new Date()) {
        if (this.classes.is_not_attended) {
          return "You canceled your participation"
        }

        return null
      }

      if (this.classes.is_not_attended) {
        return "You canceled your participation"
      }

      return this.classes.is_accepted ? "You have been accepted for this activity" : "You haven't yet been accepted for this activity"
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
    cancelParticipation() {
      axios.get(`/user_group_class/cancel/${this.classes.group_class.id}`).then(() => {
        window.location.reload()
      });
    },
  }
};
</script>
<style scoped>
.card {
  border: 1px solid #E0E0E0;
  border-radius: 5px;
  cursor: unset;
}

.is_accepted {
  border: 3px solid #7AE582;
  border-radius: 5px;
}
</style>