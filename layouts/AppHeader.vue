<template>
  <div>
    <no-ssr>
      <base-nav effect="light" expand type="none">
        <nuxt-link class="navbar-brand mr-lg-5" slot="brand" to="/">
          <div class="navbar-brand">
            <img alt="MEC" src="@/assets/images/brand/logo.png">
          </div>
        </nuxt-link>
        <div class="row" slot="content-header" slot-scope="{closeMenu}">
          <div class="col-6 collapse-brand">
            <nuxt-link class="navbar-brand mr-lg-5" slot="brand" to="/">
              <div class="navbar-brand">
                <img alt="MEC" src="@/assets/images/brand/logo.png">
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
            <nuxt-link class="nav-link" tag="a" to="/manage" v-if="!!isAdmin">Dashboard (Admin)</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" tag="a" to="/faq">FAQ</nuxt-link>
          </li>
        </ul>
        <ul class="navbar-nav navbar-nav-hover align-items-lg-center ml-lg-auto">
          <li class="nav-item">
            <a @click.prevent="modalShowNotification" class="nav-link nav-link-icon text-center" data-toggle="tooltip" href title="Notifications">
              <i aria-label="Notifications" class="fa fa-bell"></i>
              <span class="nav-link-inner--text d-lg-none">Notifications</span>
            </a>
          </li>
          <li class="nav-item text-center">
            <base-dropdown class="w-100 nav-item nav-link-icon" icon="fa fa-user" tag="div" v-if="!!isAuthenticated">
              <nuxt-link class="dropdown-item text-center" tag="a" to="/profile">{{getName}}</nuxt-link>
              <div class="dropdown-divider"></div>
              <a @click.prevent="logout" class="dropdown-item text-center" href>Logout</a>
            </base-dropdown>
            <a class="nav-link nav-link-icon" data-toggle="tooltip" href="/login" title="Notifications" v-else>
              <span slot="icon">
                <img alt="GOOGLE" aria-label="Google" class="nav-brand-logo" src="@/assets/images/icons/common/google.svg">
              </span>
              <span class="nav-link-inner--text d-lg-none text-uppercase font-weight-bold text-warning">Google</span>
            </a>
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
import { mapState, mapMutations, mapGetters } from "vuex";
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
    getName: function() {
      if (this.currentUser) {
        return (this.username = this.currentUser.display_name);
      } else {
      }
    }
  },
  methods: {
    ...mapMutations(["modalShowNotification"]),
    async logout() {
      try {
        this.$router.push("/");
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
