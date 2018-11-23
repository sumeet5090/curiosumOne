<template>
<div>
  <no-ssr>
    <base-nav type="none" effect="light" expand>
      <nuxt-link to="/" slot="brand" class="navbar-brand mr-lg-5">
        <div class="navbar-brand">
          <img src="@/assets/images/brand/logo.png" alt="" />
            </div>
      </nuxt-link>
      <div class="row" slot="content-header" slot-scope="{closeMenu}">
        <div class="col-6 collapse-brand">
          <nuxt-link to="/" slot="brand" class="navbar-brand mr-lg-5">
            <div class="navbar-brand">
              <img src="@/assets/images/brand/logo.png" alt="" />
                    </div>
          </nuxt-link>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>
      <ul class="navbar-nav navbar-nav-hover align-items md-center">
        <li class="nav-item">
          <nuxt-link class="nav-link" tag="a" to="/">Home</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" tag="a" to="/profile" v-if="!!isAuthenticated">Profile</nuxt-link>
        </li>
      </ul>
      <ul class="navbar-nav navbar-nav-hover align-items-lg-center ml-lg-auto">
        <li class="nav-item">
          <div class="row ">
            <div class="text-center col-md-6">
              <a href="" class="nav-link nav-link-icon" data-toggle="tooltip" title="Notifications" @click.prevent="modalShowNotification" >
                  <i class="fa fa-bell"></i>
                  <span class="nav-link-inner--text d-lg-none text-uppercase font-weight-bold">Notifications</span>
              </a>
            </div>
            <div class="text-center col-md-6">
              <base-dropdown tag="div" class="w-100 nav-item nav-link-icon btn-light" icon="fa fa-user" v-if="!!isAuthenticated">
                <nuxt-link tag="a" class="dropdown-item text-center" to="/profile">{{getName}} </nuxt-link>
                <div class="dropdown-divider"></div>
                <nuxt-link tag="a" class="dropdown-item text-center" to="/"> Dashboard </nuxt-link>
                <a class="dropdown-item text-center" href="" @click.prevent="logout"> Logout </a>
              </base-dropdown>
              <a href="/login" class="nav-link nav-link-icon btn-light" data-toggle="tooltip" title="Notifications" v-else>
                  <span slot="icon"><img src="@/assets/images/icons/common/google.svg" alt="" class="nav-brand-logo" /></span>
                  <span class="nav-link-inner--text d-lg-none text-uppercase font-weight-bold text-warning">Google</span>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </base-nav>
  </no-ssr>
</div>
</template>

<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import Modal from "@/components/Modal";
import {
  mapState,
  mapMutations,
  mapGetters
} from "vuex";
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
    getName: function () {
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
        this.$router.go(this.$router.currentRoute)
    
      } catch (e) {
        this.formError = e.message;
      }
    },
    
  }
};
</script>

<style>
</style>
