<template>
  <div class="body">
    <div class="form-card">
      <div class="content">
        <v-form v-model="form">
          <v-text-field
              v-model="email"
              color="primary"
              label="Epasts"
              placeholder="Ievadiet epastu"
              variant="underlined"
          ></v-text-field>

          <v-text-field
              v-model="password"
              color="primary"
              label="Parole"
              placeholder="Ievadiet paroli"
              variant="underlined"
          ></v-text-field>

          <div class="buttons">
            <v-btn
                color="#FF4545"
                height="44"
                min-width="164"
                width="299"
                variant="elevated"
            >
              Pieslēgties
            </v-btn>
            <v-btn
                color="#FF4545"
                height="44"
                min-width="164"
                width="299"
                variant="outlined"
                @click="login()"
            >
              Ievadīt kodu
            </v-btn>
          </div>
          <p>Nav konta? Reģistrēties</p>
        </v-form>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
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
    }
  },
  methods: {
    login(){
      this.formErrors = {
        data: null,
        email: null,
        password: null,
      }
      this.axios.post('/login', this.form).then(response => {
        console.log(response.data)
        window.localStorage.setItem('access_token', response.data.access_token)
        window.localStorage.setItem('user', JSON.stringify(response.data.user))
        this.$router.push('/');
      }).catch(e => {
        console.log(e)
        Object.keys(e.response.data.errors).forEach((key) => {
          this.formErrors[key] = e.response.data.errors[key]
        })
      })
    }
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
  height: 450px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  padding: 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.login-button {
  background-color: #FF4545;

}
.code-button {
  background-color: transparent;
  border: 1px solid #FF4545;
  color: #FF4545;
}
.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: 10px;
}

</style>