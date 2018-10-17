import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueLazyload from 'vue-lazyload'

import clickOutside from '@/directives/click-outside.js';
import '@/assets/vendor/nucleo/css/nucleo.css'
import '@/assets/vendor/font-awesome/css/font-awesome.css'
import '@/assets/scss/argon.scss';
import '@/assets/scss/main.scss';

Vue.directive("click-outside", clickOutside)
Vue.use(VueLazyload)
Vue.use(BootstrapVue)
  