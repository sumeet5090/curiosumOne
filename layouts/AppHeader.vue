<template>
<div>
  <no-ssr>
    <base-nav type="none" effect="light" expand>
      <nuxt-link to="/" slot="brand" class="navbar-brand mr-lg-5">
        <div class="navbar-brand">
          <img src="@/assets/images/brand/logo.png" alt="MEC" />
            </div>
      </nuxt-link>
      <div class="row" slot="content-header" slot-scope="{closeMenu}">
        <div class="col-6 collapse-brand">
          <nuxt-link to="/" slot="brand" class="navbar-brand mr-lg-5">
            <div class="navbar-brand">
              <img src="@/assets/images/brand/logo.png" alt="MEC" />
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
        <li class="nav-item" v-if="!!isAdmin">
          <nuxt-link class="nav-link" tag="a" to="/manage" v-if="!!isAdmin">Admin</nuxt-link>
        </li>
      </ul>
      <ul class="navbar-nav navbar-nav-hover align-items-lg-center ml-lg-auto">
        <li class="nav-item">
          <div class="row ">
            <div class="text-center col-md-6">
              <a href="" class="nav-link nav-link-icon" v-b-tooltip.hover title="Notifications" @click.prevent="modalShowNotification" >
                  <i class="fa fa-bell" aria-label="Notifications"></i>
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
                  <span slot="icon"><img src="@/assets/images/icons/common/google.svg" alt="GOOGLE" class="nav-brand-logo" aria-label="Google"/></span>
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
    ...mapGetters(["currentUser", "isAuthenticated", "isAdmin"]),
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
        this.$router.push('/')
        await this.$store.dispatch("logout");
      } catch (e) {
        this.formError = e.message;
      }
    },

  }
};
</script>

<style>
</style>
