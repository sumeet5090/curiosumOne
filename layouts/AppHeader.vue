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
                <li class="nav-item">
                    <router-link to="/">Event</router-link> <!-- TODO: Add event route -->
                </li>
            </ul>
            <ul class="navbar-nav align-items-lg-center ml-lg-auto">
                <li class="nav-item">
                    <a href="" target="_blank" class="nav-link nav-link-icon" data-toggle="tooltip" title="Notifications" @click.prevent="modalShowNotification" >
                        <i class="fa fa-bell"></i>
                        <span class="nav-link-inner--text d-lg-none">Notifications</span>
                    </a>
                </li>
                <li class="nav-item" v-if="!!isAuthenticated">
                    <div class="btn-wrapper text-center" >
                        <base-dropdown tag="li" class="nav-item">
                            <a slot="title" class="nav-link nav-link-icon" data-toggle="dropdown" role="button">
                                <i class="fa fa-user"></i>
                                <span class="nav-link-inner--text">{{getName}}</span>
                            </a>
                            <router-link to="/" class="dropdown-item">Dashboard</router-link>
                            <router-link to="/profile" class="dropdown-item">Profile</router-link>
                            <b-dropdown-item class="dropdown-item" @click.prevent="logout">Logout</b-dropdown-item>
                        </base-dropdown>
                    </div>
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
import { mapState, mapMutations, mapGetters } from "vuex";
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
      toggled: false,
      username: ""
    };
  },
  mutations: {},
  computed: {
    ...mapState({
      modalState: state => state.modals
    }),
    ...mapGetters(["currentUser", "isAuthenticated"]),
    getName: function() {
      if (this.currentUser) {
        return (this.username = this.currentUser.display_name);
      } else {
        // Not logged in
      }
    }
  },
  methods: {
    ...mapMutations(["modalShowNotification"]),
    async logout() {
      try {
        await this.$store.dispatch("logout");
      } catch (e) {
        this.formError = e.message;
      }
    }
  }
};
</script>

<style>
</style>
