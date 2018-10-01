import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Argon from './plugins/argon-kit'
import "./styles/main.scss";
import BootStrapVue from 'bootstrap-vue';
Vue.use(BootStrapVue);
Vue.config.productionTip = false
Vue.use(Argon)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
