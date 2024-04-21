<template>
  <v-dialog v-if="dialogData" v-model="isDialogActive" max-width="700">
    <div class="class-dialog">
      <div class="dialog-header">
        <h3>{{ dialogData.name }}</h3>
        <div class="dialog-header-price">
          <p>{{ dialogData.price }}€</p>
        </div>
      </div>
      <div class="dialog-info">
        <div>
          <div class="dialog-date">
            <v-icon icon="mdi-calendar" />
            <p>{{ dialogData.date }}</p>
            <p>{{ dialogData.start }} - {{ dialogData.end }}</p>
          </div>
        </div>

        <p>{{ dialogData.description }}</p>
        <div class="dialog-details">
          <p><b>Instructor: </b>{{ dialogData.instructor }}</p>
          <p><b>Place: </b>{{ dialogData.place }}</p>
          <p><b>Class capacity: </b>{{ dialogData.capacity }}</p>
        </div>
      </div>
      <div class="dialog-footer">
        <v-btn @click="closeDialog">
          Close
        </v-btn>
        <v-btn v-if="dialogInfo.is_accepted" color="green" :disabled="true">accepted</v-btn>
        <v-btn v-else-if="dialogInfo.has_applied" color="green" :disabled="true">applied</v-btn>
        <v-btn v-else-if="auth.isLoggedIn" color="#ff4545" @click="applyForClass" :disabled="dialogInfo.is_full">Apply</v-btn>
        <v-btn v-else color="#ff4545" @click="$router.push('/login')">Login</v-btn>
      </div>
    </div>
  </v-dialog>
  <v-dialog v-model="isAcceptDialogActive" max-width="700">
    <div class="class-dialog">
      <h2>You have successfully applied for {{ dialogData.name }}</h2>
      <p>Check profile</p>
      <div class="dialog-footer">
        <v-btn @click="closeDialog">
          Close
        </v-btn>
      </div>
    </div>
  </v-dialog>
  <section class="calendar-section-container mb-5">
    <div class="calendar-section-text">
      <h1 class="section-header">
        Calendar of Classes
      </h1>
      <p class="section-paragraph mt-2">
        Click on the most convenient lesson for you to find out more detailed information about this lesson.
      </p>
    </div>
    <VueCalendar :options="calendarOptions"/>
  </section>
</template>

<script>
import Auth from "@/helpers/Auth"
import { VueCalendar } from "@zantixgroup/vue-calendar"
export default {
  name: "CalendarSection",
  components: {VueCalendar},
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      isDialogActive: false,
      dialogData: null,
      dialogInfo: null,
      isAcceptDialogActive: false,
      fetchedMonths: [],
      calendarOptions: {
        showViewSelector: false,
        events: [],
        onEventClick: (e) => {
          this.openDialog(e)
        },
        colors: {
          primaryBg: '#ff4545',
          primaryBgText: 'white',
          secondaryBg: '#FFDADA',
          scrollbarColor: '#FFDADA',
          dateSelectedColor: '#ff4545',
        }
      },
    }
  },
  computed: {
    auth() {
      return Auth;
    }
  },
  mounted() {
    this.getGroupClassesByEvents(new Date().toLocaleDateString("sv-SE"));
  },
  methods: {
    getGroupClassesByEvents(date) {
      if (this.fetchedMonths.find((e) => e === date) === undefined) {
        const calendarEvents = [];
        setTimeout(async () => {
          await this.axios.get('/events').then((response) => {
            response.data.data.forEach((groupClass) => {
              const groupClassStartDate = new Date(groupClass.starts_at)
              const groupClassEndDate = new Date(groupClass.ends_at)
              calendarEvents.push({
                id: groupClass.id,
                name: groupClass.title,
                title: `${groupClassStartDate.getHours()}:${groupClassStartDate.getMinutes() < 10 ? `0${groupClassStartDate.getMinutes()}` : groupClassStartDate.getMinutes()} ${groupClass.title}`,
                date: groupClassStartDate,
                start: `${groupClassStartDate.getHours()}:${groupClassStartDate.getMinutes() < 10 ? `0${groupClassStartDate.getMinutes()}` : groupClassStartDate.getMinutes()}`,
                end: `${groupClassEndDate.getHours()}:${groupClassEndDate.getMinutes() < 10 ? `0${groupClassEndDate.getMinutes()}` : groupClassStartDate.getMinutes()}`,
                price: groupClass.price,
                description: groupClass.description,
                instructor: groupClass.instructor,
                capacity: groupClass.capacity,
                place: groupClass.studio.club.address
              });
            });
            this.calendarOptions.events = this.calendarOptions.events.concat(calendarEvents);
            this.fetchedMonths.push(date);
          })
        }, 500);
      }
    },
    async openDialog(e) {
      await this.axios.get(`/user_group_class/${e.id}`)
        .then(response => {
          this.dialogInfo = response.data.data
        })
        .catch(() => {
          this.dialogInfo = {
            is_full: false,
            has_applied: false,
            is_accepted: false,
          }
        })
      this.isDialogActive = true
      this.dialogData = {
        id: e.id,
        name: e.name,
        title: e.title,
        price: e.price,
        date: `${e.date.toLocaleDateString("se-SE")}`,
        start: e.start,
        end: e.end,
        description: e.description,
        instructor: `${e.instructor.name} ${e.instructor.surname}`,
        capacity: e.capacity,
        place: e.place,
      }
    },
    closeDialog() {
      this.isAcceptDialogActive = false;
      this.isDialogActive = false;
    },
    async applyForClass() {
      await this.axios.get(`/applyForClass/${this.dialogData.id}`).then(() => {
        this.dialogInfo.has_applied = true;
        this.isAcceptDialogActive = true
      })
    }
  },
}
</script>

<style scoped>
.class-dialog {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: white;
  padding: 25px;
  border-radius: 4px;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-header-price {
  background: green;
  padding: 4px 12px;
  border-radius: 16px;
  color: white;
}

.dialog-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dialog-date {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: lightgrey;
  width: fit-content;
  border-radius: 16px;
  padding: 4px 16px;
}

.dialog-footer {
  padding-top: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

@media only screen and (max-width: 350px) {
  .dialog-header {
    flex-direction: column;
  }

  .dialog-date {
    flex-direction: column;
  }

  .dialog-footer {
    flex-direction: column;
  }
}
</style>
