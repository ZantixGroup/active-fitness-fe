<template>
  <div class="body">
    <div class="form-card">
      <div class="content">
        <div class="content-header">
          <p style="font-size: 30px; font-weight: bold;">Esi sveicināts!</p>
          <p>Lūdzu ievadiet savus datus</p>
        </div>
        <v-form>
          <div class="inputs">
            <v-text-field
                v-model="form.email"
                color="#FF4545"
                label="Epasts"
                placeholder="Ievadiet epastu"
                variant="underlined"
            ></v-text-field>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; padding: 0">
              <v-text-field
                  v-model="form.password"
                  color="#FF4545"
                  label="Parole"
                  placeholder="Ievadiet paroli"
                  variant="underlined"
              ></v-text-field>
              <div style="display: flex; justify-content: end; width: 100%">
                <a href="/" style="text-decoration: none; color: black; font-size: 14px; padding: 0; margin: 0; align-self: end">Aizmirsi paroli?</a>
              </div>
            </div>
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
              Pieslēgties
            </v-btn>
            <v-btn
                color="#FF4545"
                height="44"
                min-width="164"
                width="100%"
                variant="outlined"
            >
              Ievadīt kodu
            </v-btn>
          </div>
          <div style="display: flex; flex-wrap: wrap; justify-content: center; padding: 20px; font-size: 14px; gap: 2px;">
            <p>Nav konta?</p>
            <a href="/register" style="color:#FF4545; text-decoration: none">Reģistrēties</a>
          </div>
        </v-form>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: null,
        email: null,
        password: null,
      },
      formErrors:{
        name: null,
        email: null,
        password: null,
      },
    }
  },
  methods: {
    login() {
      this.formErrors = {
        name: null,
        email: null,
        password: null,
      }
      this.axios.get('/clubs').then(response => {
        console.log(response.data)
      })
      // this.axios.post('/login', this.form).then(response => {
      //   console.log(response.data)
      //   window.localStorage.setItem('access_token', response.data.access_token)
      //   this.axios.defaults.headers.authorization = 'Bearer ' + response.data.access_token
      //   console.log(this.axios.defaults.headers.authorization)
      // }).catch(e => {
      //   console.log(e)
      //   Object.keys(e.response.data.errors).forEach((key) => {
      //     this.formErrors[key] = e.response.data.errors[key]
      //   })
      // })
    },
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
.form-card {
  width: 369px;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  padding: 25px;
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