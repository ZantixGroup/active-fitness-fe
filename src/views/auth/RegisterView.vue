<template>
  <div class="body">
    <div class="form-card">
      <div class="content">
        <div class="content-header">
          <p style="font-size: 30px; font-weight: bold;">Registration</p>
          <p>Create a new account.</p>
        </div>
        <v-form ref="form" @submit.prevent style="width: 100%">
          <div class="inputs">
            <v-text-field
                v-model="form.name"
                :rules="rules.firstname"
                color="#FF4545"
                label="Name"
                placeholder="Enter your name"
                type="text"
                required
                :error-messages="this.formErrors.name"
                variant="underlined"
            ></v-text-field>
            <v-text-field
                v-model="form.surname"
                :rules="rules.lastname"
                color="#FF4545"
                label="Surname"
                type="text"
                required
                :error-messages="this.formErrors.surname"
                placeholder="Enter your surname"
                variant="underlined"
            ></v-text-field>
            <v-text-field
                v-model="form.email"
                :rules="rules.email"
                color="#FF4545"
                label="Email Address"
                type="email"
                required
                :error-messages="this.formErrors.email"
                placeholder="Enter your email address"
                variant="underlined"
            ></v-text-field>
            <v-text-field
                v-model="form.phone"
                :rules="rules.phoneNumber"
                color="#FF4545"
                label="Phone number"
                type="phone"
                required
                :error-messages="this.formErrors.phone"
                placeholder="Enter your phone number"
                variant="underlined"
            ></v-text-field>
            <v-text-field
                v-model="form.address"
                :rules="rules.address"
                color="#FF4545"
                label="Address"
                type="text"
                required
                :error-messages="this.formErrors.address"
                placeholder="Enter your address"
                variant="underlined"
            ></v-text-field>
            <v-text-field
                v-model="form.date_of_birthday"
                color="#FF4545"
                label="Date of Birth"
                type="date"
                :rules="[v => validate_date(v)]"
                :error-messages="this.formErrors.date_of_birthday"
                placeholder="Enter your Date of Birthday"
                variant="underlined"
            ></v-text-field>
            <v-text-field
                v-model="form.password"
                :rules="rules.password"
                color="#FF4545"
                label="Password"
                type="password"
                required
                :error-messages="this.formErrors.password"
                placeholder="Enter password"
                variant="underlined"
            ></v-text-field>
          </div>
          <div class="buttons">
            <v-btn
                color="#FF4545"
                height="44"
                min-width="164"
                width="100%"
                variant="elevated"
                type="submit"
                @click="register()"
            >
              Register
            </v-btn>
          </div>
          <div style="display: flex; flex-wrap: wrap; justify-content: center; padding: 20px; font-size: 14px; gap: 2px;">
            <p>Already registered?</p>
            <a href="/login" style="color:#FF4545; text-decoration: none">Log in.</a>
          </div>
        </v-form>
      </div>

    </div>
  </div>
</template>

<script>
import Auth from "@/helpers/Auth"
import router from "@/router"
import { ruleSet, ruleSetGen } from "/src/helpers/rules.js"

export default {
  data() {
    return {
      form: {
        name: null,
        surname: null,
        email: null,
        phone: null,
        address: null,
        date_of_birthday: null,
        password: null,
      },
      formErrors:{
        name: null,
        surname: null,
        email: null,
        phone: null,
        address: null,
        date_of_birthday: null,
        password: null,
      },
      rules: {
        firstname: ruleSetGen.text("Please enter a valid name", true, 3),
        lastname: ruleSetGen.text("Please enter a valid surname", true, 3),
        address: ruleSetGen.text("Please enter a valid address", true, 3),
        email: ruleSet.email,
        phoneNumber: ruleSetGen.phoneNumber(undefined, false),
        date_of_birth: ruleSetGen.date("Please enter a valid birth date", true),
        password: ruleSetGen.text("A password must be at least 8 symbols long", true, 8),

      },
    }
  },
  mounted() {
    if (localStorage.getItem("access_token")) {
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    validate_date(birth_date) {
      const date = new Date(birth_date);
      const currentDate = new Date();
       if(date >= currentDate || date.getFullYear() < 1900) {
         return "Please enter a valid date"
       }
       return true
    },
    async register() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) return;
      this.formErrors = {
        name: null,
        surname: null,
        email: null,
        phone: null,
        address: null,
        date_of_birthday: null,
        password: null,
      }
      this.axios.post('/register', this.form).then(response => {
        window.localStorage.setItem('access_token', response.data.data.access_token)
        window.localStorage.setItem('user', JSON.stringify(response.data.data.user) ?? '{}')
        Auth.setAuth(response.data.data.access_token, response.data.data.user)
        router.push('/')
      }).catch(e => {
        Object.keys(e.response.data.errors).forEach((key) => {
          this.formErrors[key] = e.response.data.errors[key]
        })
      })
    },
  },
}
</script>

<style scoped>
.body {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.form-card {
  width: 369px;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  padding: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
  gap: 10px;
}

.content {
  display: flex;
  flex-wrap: wrap;
  gap:10px;
}
</style>
