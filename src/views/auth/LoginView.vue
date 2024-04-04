<template>
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
            height="72"
            min-width="164"
            variant="elevated"
        >
          Pieslēgties
        </v-btn>
        <v-btn
            height="72"
            min-width="164"
            variant="outlined"
            @click="login()"
        >
          Ievadīt kodu
        </v-btn>
      </div>
      <p>Nav konta? Reģistrēties</p>
    </v-form>
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
.content{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
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
}

</style>