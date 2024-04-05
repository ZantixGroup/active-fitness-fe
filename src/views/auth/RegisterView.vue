<template>
  <div class="body">
    <div class="form-card">
      <div class="content">
        <div class="content-header">
          <p style="font-size: 30px; font-weight: bold;">Reģistrācija</p>
          <p>Izveidojiet jaunu kontu.</p>
        </div>
        <v-form>
          <div class="inputs">
            <v-text-field
                v-model="form.name"
                color="#FF4545"
                label="Vārds"
                placeholder="Ievadiet vārdu"
                variant="underlined"
            ></v-text-field>
            <v-text-field
                v-model="form.surname"
                color="#FF4545"
                label="Uzvārds"
                placeholder="Ievadiet uzvārdu"
                variant="underlined"
            ></v-text-field>
            <v-text-field
                v-model="form.email"
                color="#FF4545"
                label="Epasts"
                placeholder="Ievadiet epastu"
                variant="underlined"
            ></v-text-field>
            <v-text-field
                v-model="form.persone_code"
                color="#FF4545"
                label="Personas kods"
                placeholder="Ievadiet personas kodu"
                variant="underlined"
            ></v-text-field>
            <v-text-field
                v-model="form.password"
                color="#FF4545"
                label="Parole"
                placeholder="Ievadiet paroli"
                variant="underlined"
            ></v-text-field>
            <v-text-field
                v-model="form.password_confirmation"
                color="#FF4545"
                label="Atkārtoti parole"
                placeholder="Ievadiet paroli atkārtoti"
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
                @click="login()"
            >
              Reģistrēties
            </v-btn>
          </div>
          <div style="display: flex; flex-wrap: wrap; justify-content: center; padding: 20px; font-size: 14px; gap: 2px;">
            <p>Jau esi reģistrējies?</p>
            <a href="/login" style="color:#FF4545; text-decoration: none">Pieslēgties.</a>
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
        surname: null,
        email: null,
        persone_code: null,
        password: null,
        password_confirmation: null,
      },
      formErrors:{
        name: null,
        surname: null,
        email: null,
        persone_code: null,
        password: null,
        password_confirmation: null,
      },
    }
  },
  methods: {
    login() {
      this.formErrors = {
        name: null,
        surname: null,
        email: null,
        persone_code: null,
        password: null,
        password_confirmation: null,
      }
      this.axios.get('/clubs').then(response => {
        console.log(response.data)
      })
      // this.axios.post('/register', this.form).then(response => {
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