<template>
  <footer>
    <div class="footer-content">
      <NavigationBarLogo />
    </div>
  </footer>
</template>

<script>
import NavigationBarLogo from "@/components/NavigationBarLogo";
export default {
  name: "MainFooter",
  components: {NavigationBarLogo}
}
</script>

<style scoped>
footer {
  position: relative;
  height: 60px;
  width: 100%;
  margin-top: 150px;
  color: white;
}

footer::before {
  content: "";
  position: absolute;
  height: 100%;
  transform: translateX(-50%);
  width: 100vw;
  bottom: 0;
  left: 50%;
  background: #D4D4D4;
}

.footer-content {
  z-index: 100;
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
}
</style>