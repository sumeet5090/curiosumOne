import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import StartingPage from "./views/Customs/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import Notifications from './views/Customs/Notifications.vue';
import Blog from './views/Customs/Blog.vue';
import TeamProfile from './views/Customs/TeamProfile.vue';
import Teams from './views/Customs/Teams.vue';
import Events from './views/Customs/Events.vue';
import CreateNotif from "./views/Customs/Admin/CreateNotif.vue";
import CreateEvent from './views/Customs/CreateEvent.vue';
import EventPage from './views/Customs/EventPage.vue';
Vue.use(Router)

export default new Router({
  linkExactActiveClass: "active",
  hash: false,
  routes: [{
    path: "/",
    name: "starting-page",
    components: {
      header: AppHeader,
      default: StartingPage,
      notifications: Notifications,
      footer: AppFooter
    }
  }, {
    path: "/landing",
    name: "landing",
    components: {
      header: AppHeader,
      notifications: Notifications,
      default: Landing,
      footer: AppFooter
    }
  }, {
    path: "/login",
    name: "login",
    components: {
      header: AppHeader,
      default: Login,
      footer: AppFooter
    }
  }, {
    path: "/register",
    name: "register",
    components: {
      header: AppHeader,
      default: Register,
      footer: AppFooter
    }
  }, {
    path: "/profile",
    name: "profile",
    components: {
      notifications: Notifications,
      header: AppHeader,
      default: Profile,
      footer: AppFooter
    }
  }, {
    path: "/announcements",
    name: "announcements",
    components: {
      notifications: Notifications,
      header: AppHeader,
      default: Blog,
      footer: AppFooter
    }
  }, {
    path: "/create",
    name: "create-notification",
    components: {
      notifications: Notifications,
      header: AppHeader,
      default: CreateNotif,
      footer: AppFooter
    }
  }, {
    path: "/team",
    name: "team",
    components: {
      notifications: Notifications,
      header: AppHeader,
      default: Teams,
      footer: AppFooter
    }
  }, {
    path: "/team/:id",
    name: "team-profile",
    components: {
      notifications: Notifications,
      header: AppHeader,
      default: TeamProfile,
      footer: AppFooter
    }
  }, {
    path: "/user/:id",
    name: "user-profile",
    components: {
      notifications: Notifications,
      header: AppHeader,
      default: TeamProfile,
      footer: AppFooter
    }
  }, {
    path: "/event/:id",
    name: "event-profile",
    components: {
      notifications: Notifications,
      header: AppHeader,
      default: EventPage,
      footer: AppFooter
    }
  }, {
    path: "/events",
    name: "events",
    components: {
      notifications: Notifications,
      header: AppHeader,
      default: Events,
      footer: AppFooter
    }
  }, {
    path: "/create/event",
    name: "create-event",
    components: {
      notifications: Notifications,
      header: AppHeader,
      default: CreateEvent,
      footer: AppFooter
    }
  }],
  scrollBehavior: to => {
    if (to.hash) {
      return {
        selector: to.hash
      };
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});
