<template>
  <div id="app">
    <router-view name="header"></router-view>
    <router-view name="notifications"></router-view>
    <main>
      <fade-transition origin="center" mode="out-in" :duration="150">
        <router-view></router-view>
      </fade-transition>
    </main>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
import { FadeTransition } from "vue2-transitions";
import Modal from "@/components/Modal";
import store from "./store/";
export default {
  name: "app",
  components: {
    FadeTransition
  }
};
</script>