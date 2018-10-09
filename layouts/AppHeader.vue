<template>
    <header class="header-global custom-gradient">
        <base-nav class="" transparent type="" effect="light" expand>
            <router-link slot="brand" to="/" class="navbar-brand mr-lg-5">
                <img src="@/assets/images/300x300.svg" alt="LOGO"/> 
            </router-link>
            <div class="row" slot="content-header" slot-scope="{closeMenu}">
                <div class="col-6 collapse-brand">
                    <router-link slot="brand" to="/" class="navbar-brand mr-lg-5">
                        <img src="@/assets/images/300x300.svg" alt="LOGO"/>
                    </router-link>
                </div>
                <div class="col-6 collapse-close">
                    <close-button @click="closeMenu"></close-button>
                </div>
            </div>
            <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
                <base-dropdown tag="li" class="nav-item">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <i class="ni ni-collection d-lg-none"></i>
                        <span class="nav-link-inner--text">Events</span>
                    </a>
                    <a href="#" class="nav-link"></a>
                    <router-link to="/landing" class="dropdown-item">Dashboard</router-link>
                    <router-link to="/profile" class="dropdown-item">Profile</router-link>
                    <router-link to="/login" class="dropdown-item">Login</router-link>
                </base-dropdown>
            </ul>
            
        </base-nav>
    </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import Modal from "@/components/Modal";
import { mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "headerNav",
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown,
    Modal
  },
  data() {
    return {
      toggled: false
    };
  },
  mutations: {},
  computed: {
    ...mapState({
      modalState: state => state.modals
    })
  },
  methods: {
    ...mapMutations(["modalShowNotification"])
    // async authLogin() {
    //   let response = await axios.get("http://localhost:3000/user");
    //   console.log(response);
    // }
  }
};
</script>
<style>
</style>