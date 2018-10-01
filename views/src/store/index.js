import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX)

const state = {
  images: {
    imgLanding: require('./../assets/img/theme/landing.jpg'),
    imgProfile: require("./../assets/img/theme/profile.jpg")
  },
  fields: {},
  currentUser: null,
  modals: {
    notifications: false,
    messages: false,
    login: false,
    register: false
  },
  announcements: [],
  isAuthenticated: false,
  user: {}
}
const mutations = {
  // userStatus(state, user) {   if (user) {     state.currentUser = user   } else
  // {     state.currentUser = null   } },
  modalShowNotification(state) {
    state.modals.notifications = !state.modals.notifications;
  },
  addAnnouncements(state, ancmt) {
    state
      .announcements
      .push(ancmt)
  },
  loadMoreAnnouncements(state, ancmt, count) {
    // TODO: add LoadMore button in notifications.
  },
}
const actions = {
  setUser(context, user) {
    context.commit('userStatus', user)
  },
  modalShowNotification(context) {
    context.commit('modalShowNotification')
  }
}
const getters = {
  currentUser: state => state.currentUser,
  getModalStates: state => state.modals,
  getImages: state => state.images,
  getAnnouncements: state => state.announcements
}

export default new VueX.Store({
  state,
  mutations,
  actions,
  getters
})
