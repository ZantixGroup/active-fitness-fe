<template>
  <div class="body mb-10">
    <div class="header d-flex w-100 flex-column flex-sm-row justify-space-between align-center" id="welcomeText">
      <div>
        <h1>Hi, {{ auth.user?.name }} {{ auth.user?.surname }}</h1>
        <p>Your loyalty score: <b>{{ auth.user?.loyalty }}</b></p>
      </div>
      <v-btn type="button" @click="showUserForm" variant="flat" color="primary" >Edit profile</v-btn>
    </div>
      <v-form ref="form" lazy-validation @submit.prevent @submit="save" id="userForm">
        <h2 class="form-subtitle">General information</h2>
        <v-container v-if="user" :fluid="true">
          <v-row no-gutters>
            <v-col cols="12" sm="6">
              <v-text-field
                  v-model="user.name"
                  :rules="rules.firstname"
                  label="First name"
                  placeholder="First name"
                  required
                  hide-details="auto"
                  variant="underlined"
                  :active="true"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                  v-model="user.surname"
                  :rules="rules.lastname"
                  label="Last name"
                  placeholder="Last name"
                  required
                  hide-details="auto"
                  variant="underlined"
                  :active="true"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" sm="6">
                <v-text-field
                    v-model="user.email"
                    :rules="rules.email"
                    label="E-mail address"
                    placeholder="example@gmail.com"
                    required
                    hide-details="auto"
                    variant="underlined"
                    :active="true"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field
                    v-model="user.phone"
                    :rules="rules.phoneNumber"
                    label="Phone number"
                    placeholder="+371 21234567"
                    required
                    hide-details="auto"
                    variant="underlined"
                    :active="true"
                ></v-text-field>
              </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" sm="6">
                <v-text-field
                    v-model="user.address"
                    :rules="rules.address"
                    label="Address"
                    placeholder="Enter your address"
                    required
                    hide-details="auto"
                    variant="underlined"
                    :active="true"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field
                    v-model="user.date_of_birthday"
                    :rules="rules.date_of_birth"
                    color="#FF4545"
                    label="Date of Birth"
                    placeholder="Enter your Date of Birth"
                    required
                    hide-details="auto"
                    variant="underlined"
                    type="date"
                    :active="true"
                ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <div style="display: flex; justify-content: end; width: 100%">
          <div class="d-flex ga-2 pt-3 pa-3 form-submit-buttons" style="justify-content: end">
            <v-btn @click="this.$router.go()" variant="text">Discard changes</v-btn>
            <v-btn type="submit" @submit="save" variant="flat" color="primary" >Save</v-btn>
          </div>
        </div>
      </v-form>
    <div v-if="auth.user?.role_id === 2" class="salaries-graphic">
      <h1>Salaries :</h1>
      <apexchart
        id="slaries-chart"
        type="area"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
    <p class="text-h5 me-auto" v-if="user_classes_active.length > 0">Upcomming classes</p>
    <GroupClassesCard
      v-for="(classes, index) in user_classes_active"
      :key="index"
      :classes="classes"
    />
    <p class="text-h5 me-auto mt-4" v-if="user_classes_past.length > 0">Past classes</p>
    <GroupClassesCard
      v-for="(classes, index) in user_classes_past"
      :key="index"
      :classes="classes"
    />

    <p class="text-h5 mt-10" v-if="user_classes_active.length == 0 && user_classes_past.length == 0">You don't have any attendance history yet!</p>
  </div>
</template>

<script>
import GroupClassesCard from "@/components/GroupClassesCard"
import Auth from "@/helpers/Auth"
import { ruleSet, ruleSetGen } from "/src/helpers/rules.js"
export default {
  components: {GroupClassesCard},
  computed: {
    auth() {
      return Auth
    }
  },
  data() {
    return {
      chart: {
        id: "slaries-chart",
      },
      chartOptions: {
        xaxis: {
          categories: [],
        },
      },
      series: [
        {
          name: "salaries",
          data: [],
        },
      ],
      user: null,
      user_id: null,
      user_classes_active: [],
      user_classes_past: [],
      rules: {
        firstname: ruleSetGen.text("Please enter a valid name", true, 3),
        lastname: ruleSetGen.text("Please enter a valid surname", true, 3),
        address: ruleSetGen.text("Please enter a valid address", true, 3),
        email: ruleSet.email,
        phoneNumber: ruleSetGen.phoneNumber(undefined, false),
        date_of_birth: ruleSetGen.date("Please enter a valid birth date", true),
      },
    }
  },
  async mounted() {
    if (!localStorage.getItem("access_token")) {
      this.$router.push({ path: "/" });
    }
    await this.axios.get('/me').then(async response => {
      this.user = response.data
      this.user_id = this.user.id
      if (this.user.role_id === 1) {
        this.user.role_id === "user"
      } else if (this.user.role_id === 2) {
        await this.axios.get(`/instructor_salaries/${this.auth.user.id}`).then(response =>{
          const newData = [];
          const newCategories = [];
          response.data.data.forEach((element) => {
            newData.push(element.amount);
            newCategories.push(new Date(element.period).toLocaleString('en',{month:"long"}));
          });
          this.series = [{
            data: newData
          }]
          this.chartOptions = {
            labels: newCategories
          }
        })
      }

      Auth.setUser(response.data)
    })

    await this.axios.get(`/profile_user_group_classes`).then(response => {
      const user_classes = response.data.data
      this.user_classes_active = user_classes.filter((userClass) => (new Date(userClass.group_class.ends_at) > new Date() && userClass.is_not_attended != true)).sort((a, b) => new Date(a.group_class.starts_at) - new Date(b.group_class.starts_at))
      this.user_classes_past = user_classes.filter((userClass) => (new Date(userClass.group_class.starts_at) < new Date() || userClass.is_not_attended === true)).sort((a, b) => new Date(b.group_class.starts_at) - new Date(a.group_class.starts_at))
    })
  },
  methods: {
    save() {
      this.$refs.form.validate();
      this.axios.put(`/profile_update`, this.user).then(response => {
        Auth.setUser(response.data.data)
      })
    },
    showUserForm() {
      document.getElementById('userForm').style.display = "flex";
      document.getElementById('welcomeText').style.display = "none";
    },
  },
}
</script>

<style scoped>
.body {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
}
#slaries-chart{
  width: 100%;
}
.v-form {
  width: 100%;
  margin: auto;
  margin-block: 20px;
  display: none;
  flex-direction: column;
  background-color: white;
  flex-wrap: wrap;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.v-container {
  flex: 1;
}

.v-text-field {
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
}

.v-text-field :deep(input) {
  height: 64px;
  padding-bottom: 0;
}

.v-text-field :deep(label) {
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
  transform: translateY(10px);
}


.v-text-field {
  padding: 10px;
}

.form-subtitle {
  font-weight: 500;
  line-height: 32px;
  font-size: 22px;
  padding: 10px;
}
.form-submit-buttons > * {
  text-transform: none;
  font-weight: 500;
  font-size: 16px;
}
.salaries-graphic {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
</style>
