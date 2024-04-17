<template>
  <div class="body">
    <div class="header" id="welcomeText" style="display: flex; justify-content: start; align-items: center; width: 100%; gap: 10px">
      <h1>Hi, {{ auth.user.name }} {{ auth.user.surname }}</h1>
      <v-btn type="button" @click="showUserFrom" variant="flat" color="primary" >Edit profile</v-btn>
    </div>
      <v-form ref="form" lazy-validation @submit.prevent id="userForm">
        <h2 class="form-subtitle">General information</h2>
        <v-container v-if="user">
          <v-row no-gutters>
            <v-col>
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
            <v-col>
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
            <v-col>
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
            <v-col>
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
            <v-col>
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
            <v-col>
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
        <div style="display: flex; justify-content: space-between; width: 100%">
          <div class="d-flex ga-2 pt-3 pa-3 form-submit-buttons" style="justify-content: start">
            <v-btn type="submit" @submit="save" variant="flat" color="primary" >Saglabāt</v-btn>
            <v-btn @click="this.$router.go()" variant="text">Atmest izmaiņas</v-btn>
          </div>
          <v-btn style="align-self: end" type="button" @click="closeUserForm" variant="text" width="40px">close</v-btn>
        </div>
      </v-form>
    <GroupClassesCard
        v-for="(classes, index) in user_classes"
        :key="index"
        :classes="classes"
    />
    </div>
</template>

<script>
import { ruleSet, ruleSetGen } from "/src/helpers/rules.js";
import Auth from "@/helpers/Auth";
import GroupClassesCard from "@/components/GroupClassesCard";
export default {
  components: {GroupClassesCard},
  computed: {
    auth() {
      return Auth
    }
  },
  data() {
    return {
      user: null,
      user_id: null,
      user_classes: [],
      rules: {
        firstname: ruleSetGen.text("Lūdzu ievadiet derīgu vārdu", true, 3),
        lastname: ruleSetGen.text("Lūdzu ievadiet derīgu uzvārdu", true, 3),
        address: ruleSetGen.text("Lūdzu ievadiet derīgu adresi", true, 3),
        email: ruleSet.email,
        phoneNumber: ruleSetGen.phoneNumber(undefined, false),
        date_of_birth: ruleSetGen.date("Lūdzu ievadiet derīgu dzimšanas datumu", true),
      },
    }
  },
  mounted() {
    if (!localStorage.getItem("access_token")) {
      this.$router.push({ path: "/" });
    }

    this.axios.get('/me').then(response =>{
      this.user = response.data
      this.user_id = this.user.id
      if (this.user.role_id === 1) {
        this.user.role_id === "user"
      }
    }).catch(e => {
      console.log(e)
    })
    this.axios.get(`/user_group_classes`).then(response => {
      this.user_classes = response.data.data
      console.log(response.data.data)
    })
  },
  methods: {
    save() {
      this.$refs.form.validate();
      this.axios.put(`/profile_update`, this.user).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error.response.data)
      })
    },
    showUserFrom() {
      document.getElementById('userForm').style.display = "flex";
      document.getElementById('welcomeText').style.display = "none";
    },
    closeUserForm() {
      document.getElementById('userForm').style.display = "none";
      document.getElementById('welcomeText').style.display = "block";
    }
  },
}
</script>

<style scoped>
.body {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
}

.v-form {
  width: 100%;
  margin: auto;
  margin-top: 100px;
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
</style>
