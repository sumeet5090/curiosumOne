import Vuex from 'vuex';
const state = {
  images: {
    imgLanding: require('@/assets/images/theme/landing.jpg'),
    imgProfile: require("@/assets/images/theme/profile.jpg")
  },
  fields: {},
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
  SET_USER: function (state, user) {
    if (user === {}) {
      state.user = null
      state.isAuthenticated = false
    } else {
      state.user = user
      state.isAuthenticated = true
    }
  },
  auth: function (state, auth) {
    state.isAuthenticated = auth
  }
}
const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.user && req.session) {
      commit('SET_USER', JSON.parse(JSON.stringify(req.user)))
      commit('auth', req.isAuthenticated())
    } else {
      commit('SET_USER', null)
      commit('auth', false)
    }
  },
  modalShowNotification({ commit }) {
    commit('modalShowNotification')
  },
  async logout({ commit }) {
    await this.$axios.post('/api/logout')
    commit('SET_USER', null)
    commit('auth', false)
  }
}
const getters = {
  currentUser: function (state) {
    if(state.isAuthenticated){
      return state.user
    }
    return null
  },
  getModalStates: state => state.modals,
  getImages: state => state.images,
  getAnnouncements: state => state.announcements,
  isAuthenticated: state => state.isAuthenticated,
}

const createStore = () => {
  return new Vuex.Store({
    state,
    mutations,
    actions,
    getters
  })
}

export default createStore
