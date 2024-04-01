<template>
  <section class="hero-section">
    <div class="hero-section-content">
      <div class="hero-section-text">
        <h1 class="hero-section-header">
          Vēlies uzlabot savu veselību?
          Pievienojies mūsu sporta klubam.
        </h1>
        <p class="hero-section-paragraph mt-4">
          Mēs palīdzam cilvēkiem uzlabot viņu fizisko sagatavotību
          un iegūt savu vēlamo ķermeņa figūru.
        </p>
        <div v-if="!isLoggedIn" class="hero-section-buttons d-flex mt-12" style="gap: 10px">
          <v-btn
              variant="flat"
              color="primary"
              class="text-uppercase"
              @click="$router.push({ name: 'login' })"
          >
            Pieslēgties
          </v-btn>
          <v-btn
              variant="text"
              color="black"
              class="text-uppercase"
              @click="$router.push({ name: 'register' })"
          >
            Reģistrēties
          </v-btn>
        </div>
      </div>
    </div>
    <div class="hero-section-image-container">
      <img
          class="hero-section-image"
          src="@/assets/images/athlete/athlete.png"
          alt="hero-section-image"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: "HeaderSection",
  computed: {
    isLoggedIn() {
      return false;
    }
  },
  methods: {
    goTo(name) {
      this.$router.push({ name });
    }
  },
}
</script>

<style scoped>
.hero-section {
  max-width: max(80vw, 1120px);
  width: 100%;
  height: min(100vh, 560px);
  display: flex;
}

.hero-section-content {
  display: flex;
  align-items: center;
  height: min(100vh, 560px);
  width: 50%;
  z-index: 10;
}

.hero-section-text {
  letter-spacing: 1.25px;
}

.hero-section-header {
  font-size: 32px;
  font-weight: 500;
  line-height: 36px;
}

.hero-section-paragraph {
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
}

.hero-section-buttons button {
  font-size: 14px !important;
  padding: 11px 16px !important;
  height: 100% !important;
}

.hero-section-image-container {
  width: 50%;
  height: min(100vh, 560px);
  display: flex;
  align-content: center;
  align-items: center;
}

.hero-section-image {
  margin-left: 20px;
  width: 100%;
}
</style>