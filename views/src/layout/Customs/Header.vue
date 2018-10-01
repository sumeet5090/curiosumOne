<template>
    <header class="header-global">
        <base-nav class="navbar-main" transparent type="info" effect="light" expand>
            <router-link slot="brand" to="/landing" class="navbar-brand mr-lg-5">
                <img src="./../assets/img/300x300.svg" alt="LOGO"/> <!-- TODO: Logo -->
            </router-link>
            <div class="row" slot="content-header" slot-scope="{closeMenu}">
                <div class="col-6 collapse-brand">
                    <router-link slot="brand" to="/landing" class="navbar-brand mr-lg-5">
                        <img src="./../assets/img/300x300.svg" alt="LOGO"/> <!-- TODO: Logo (DARK) -->
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
                        <span class="nav-link-inner--text">Profile Name</span>
                    </a>
                    <router-link to="/landing" class="dropdown-item">Dashboard</router-link>
                    <router-link to="/profile" class="dropdown-item">Profile</router-link>
                    <router-link to="/login" class="dropdown-item">Login</router-link>

                </base-dropdown>
            </ul>
            <ul class="navbar-nav align-items-lg-center ml-lg-auto">
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="" target="_blank"
                       data-toggle="tooltip" title="Like us on Facebook">
                        <i class="fa fa-facebook-square"></i>
                        <span class="nav-link-inner--text d-lg-none">Facebook</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href=""
                       target="_blank" data-toggle="tooltip" title="Follow us on Instagram">
                        <i class="fa fa-instagram"></i>
                        <span class="nav-link-inner--text d-lg-none">Instagram</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="" target="_blank"
                       data-toggle="tooltip" title="Follow us on Twitter">
                        <i class="fa fa-twitter-square"></i>
                        <span class="nav-link-inner--text d-lg-none">Twitter</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="" target="_blank" class="nav-link nav-link-icon" data-toggle="tooltip" title="Notifications" @click.prevent="modalShowNotification" >
                        <i class="fa fa-bell"></i>
                        <span class="nav-link-inner--text d-lg-none">Notifications</span>
                    </a>
                </li>
                <li class="nav-item" v-if="!this.$store.state.isAuthenticated">
                    <div class="btn-wrapper text-center">
                        <!-- TODO:  -->
                        <base-button data-toggle="tooltip" title="Get notifications" block type="default" class="btn btn-neutral btn-icon my-3">
                            <span>Sign In</span>
                        </base-button>
                    </div>
                </li>
                <li class="nav-item" v-else>
                    <!-- TODO: Add user profile badge and show logout button under drop down. -->
                </li>
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