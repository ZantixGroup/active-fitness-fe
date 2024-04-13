<template>
  <div class="body">
      <v-form>
        <h2 class="form-subtitle">General information</h2>
        <v-container v-if="user">
          <v-row>
            <v-col>
              <v-row>
                <v-text-field
                    v-model="user.name"
                    label="First name"
                    placeholder="First name"
                    required
                    hide-details
                    variant="underlined"
                    :active="true"
                ></v-text-field>
                <v-text-field
                    v-model="user.surname"
                    label="Surname"
                    placeholder="Surname"
                    required
                    hide-details
                    variant="underlined"
                    :active="true"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                    v-model="user.email"
                    label="E-mail address"
                    placeholder="example@gmail.com"
                    required
                    hide-details
                    variant="underlined"
                    :active="true"
                ></v-text-field>
                <v-text-field
                    v-model="user.phone"
                    label="Phone number"
                    placeholder="+371 21234567"
                    required
                    hide-details
                    variant="underlined"
                    :active="true"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                    v-model="user.address"
                    label="Address"
                    placeholder="Enter your address"
                    required
                    hide-details
                    variant="underlined"
                    :active="true"
                ></v-text-field>
                <v-text-field
                    v-model="user.date_of_birthday"
                    color="#FF4545"
                    label="Date of Birth"
                    placeholder="Enter your Date of Birth"
                    required
                    hide-details
                    variant="underlined"
                    type="date"
                    :active="true"
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <div class="d-flex ga-2 pt-3 pa-3 form-submit-buttons">
          <v-btn @click="save" variant="flat" color="primary" >Saglabāt</v-btn>
          <v-btn @click="this.$router.go()" variant="text">Atmest izmaiņas</v-btn>
        </div>
      </v-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
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

.v-text-field >>> input {
  height: 64px;
  padding-bottom: 0;
}

.v-text-field >>> label {
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
