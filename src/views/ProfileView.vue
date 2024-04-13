<template>
  <div class="body">
      <v-form ref="form" lazy-validation @submit.prevent>
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
        <div class="d-flex ga-2 pt-3 pa-3 form-submit-buttons">
          <v-btn type="submit" @submit="save" variant="flat" color="primary" >Saglabāt</v-btn>
          <v-btn @click="this.$router.go()" variant="text">Atmest izmaiņas</v-btn>
        </div>
      </v-form>
    </div>
</template>

<script>
import { ruleSet, ruleSetGen } from "/src/helpers/rules.js";
export default {
  data() {
    return {
      user: null,
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
    this.axios.get('/me').then(response =>{
      this.user = response.data
      if (this.user.role_id === 1) {
        this.user.role_id === "user"
      }
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
    }
  },
}
</script>

<style scoped>
.body {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.v-form {
  width: 1120px;
  margin: auto;
  margin-top: 100px;
  display: flex;
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
