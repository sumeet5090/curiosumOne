<template>
  <div>
    <div>
      <header class="header-global">
        <app-header></app-header>
      </header>
      <!-- <notification-modal/> -->
      <nuxt/>
      <footer class="footer pt-0">
        <app-footer></app-footer>
      </footer>
    </div>
  </div>
</template>

<script>
import appHeader from "@/layouts/AppHeader";
import appFooter from "@/layouts/AppFooter";
import notifications from "@/layouts/custom/Notifications";
import { mapGetters } from "vuex";
export default {
  components: {
    "app-header": appHeader,
    "app-footer": appFooter,
    "notification-modal": notifications
  },
  computed: {
    ...mapGetters(["currentUser", "isAdmin"])
  },
  mounted() {
  }
};
</script>

<style>
html {
  font-family: "Open Sans" sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
#low-poly-background {
  background: linear-gradient(
    145deg,
    #ff3c00 0%,
    #4b2722 30%,
    #4b2722 70%,
    #ff3c00 100%
  );
  z-index: -999;
  background-position: cover;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.bg-none {
  background-color: rgba(255, 255, 255, 0) !important;
}
.noselect {
  -webkit-touch-callout: none; 
  -webkit-user-select: none; 
  -khtml-user-select: none; 
  -moz-user-select: none; 
  -ms-user-select: none; 
  user-select: none; 
}
</style>