<template>
  <div class="body">
    <div class="form-card">
      <div class="content">
        <div class="content-header">
          <p style="font-size: 30px; font-weight: bold;">Welcome!</p>
          <p>Please enter your details</p>
        </div>
        <v-form ref="form" lazy-validation style="width: 100%">
          <div class="inputs">
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
            <div style="display: flex; flex-wrap: wrap; justify-content: center; padding: 0">
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
            <p v-if="formErrors.data" style="color: red">{{formErrors.data}}</p>
          </div>
          <div class="buttons">
            <v-btn
                color="#FF4545"
                height="44"
                min-width="164"
                width="100%"
                variant="elevated"
                @click="login()"
            >
              Log in
            </v-btn>
          </div>
          <div style="display: flex; flex-wrap: wrap; justify-content: center; padding: 20px; font-size: 14px; gap: 2px;">
            <p>Don't have an account?</p>
            <a href="/register" style="color:#FF4545; text-decoration: none">Register</a>
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
        email: null,
        password: null,
      },
      formErrors:{
        data: null,
        email: null,
        password: null,
      },
      rules: {
        email: ruleSet.email,
        password: ruleSetGen.text("Parolei jābūt vismaz 8 rakstzīmju simboliem", true, 8),
      },
    }
  },
  mounted() {
    if (localStorage.getItem("access_token")) {
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    login() {
      this.$refs.form.validate();
      this.formErrors = {
        email: null,
        password: null,
      }
      this.axios.post('/login', this.form).then(response => {
        window.localStorage.setItem('access_token', response.data.data.access_token)
        window.localStorage.setItem('user', JSON.stringify(response.data.data.user) ?? '{}')
        Auth.setAuth(response.data.data.access_token, response.data.data.user)
        router.push('/')
      }).catch(e => {
        this.formErrors.data = e.response.data.data;
        if (e.response.data?.errors) {
          Object.keys(e.response.data.errors).forEach((key) => {
            this.formErrors[key] = e.response.data.errors[key]
          })
        }
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
  width: 100%;
  gap:10px;
}
</style>
