<template>
  <header>
    <div class="navigation-bar-content">
      <NavigationBarLogo />
      <div v-if="!auth.isLoggedIn" class="button-container">
        <v-btn
            variant="text"
            class="text-uppercase"
            @click="goTo('register')"
        >
          Register
        </v-btn>
        <v-btn
            variant="flat"
            class="text-uppercase ml-2"
            @click="goTo('login')"
        >
          Log in
        </v-btn>
      </div>
      <div class="d-flex align-center ga-5" v-else>
        <div class="avatar-container" @click="goTo('profile')">
          <h2 class="avatar-text text-uppercase">{{ auth.user.name }} {{ auth.user.surname }}</h2>
          <v-avatar>
            <v-icon class="avatar-icon" icon="mdi-account" size="x-large"></v-icon>
          </v-avatar>
        </div>
        <div>
          <v-icon icon="mdi-logout" @click="logout">
          </v-icon>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import NavigationBarLogo from "@/components/NavigationBarLogo";
import Auth from "@/helpers/Auth";
export default {
  name: "MainNavigationBar",
  components: {NavigationBarLogo},
  computed: {
    auth() {
      return Auth
    }
  },
  methods: {
    goTo(name) {
      this.$router.push({ name });
    },
    logout() {
      this.axios.get('/logout').then(() => {
        this.auth.clearAuth()
      }).catch(e => {
        console.log(e)
      })
    }
  },
}
</script>

<style scoped>
header {
  position: fixed;
  height: 60px;
  transition: 0.2s all;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  width: 100vw;
  top: 0;
  left: 0;
  background: #FF4545;
  color: white;
}

.navigation-bar-content {
  max-width: min(80vw, 1120px);
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.avatar-container {
  display: flex;
  align-items: center;
  gap: 3px;
  cursor: pointer;
}

.avatar-text {
  font-size: 14px;
  letter-spacing: 1.25px;
  font-weight: 500;
}

.avatar-icon {
  color: white;
}

</style>
