import Vuex from 'vuex';
import axios from 'axios';
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
  team: null,
  announcements: [],
  isAuthenticated: false,
  user: {},
  events: [],
  teams: []
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
  },
  SET_TEAMS: function (state, teams) {
    state.teams = teams
  },
  SET_EVENTS: function (state, events) {
    state.events = events
  },
  EMPTY: function (state, val){
    state.team = val
  }
}
const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.isAuthenticated()) {
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
  },
  async getTeam({ commit }, id) {
    let response = await this.$axios.get('/api/profile/' + id + '/team')
    console.log(response.data)
  },
  async getEvents({ commit }) {
    try {
      let { data } = await this.$axios.get('/api/event')
      commit('SET_EVENTS', data.events)
    } catch (error) {
      console.log(error)
      commit('SET_EVENTS', [])
    }
  },
  async getTeamsForEvent({ commit }, id) {
    try {
      let { data } = await this.$axios.get(`/api/event/${id}/teams`)
      if (data.teams.length > 0) {
        return commit('SET_TEAMS', data.teams)
      }
      return commit('SET_TEAMS', [])
    } catch (err) {
      console.log(err)
      commit('SET_TEAMS', [])
    }
  },
  async createCar({ }, params) {
    try {
      let {data} =  await this.$axios.post(`/api/event/${params.event_id}/create/${String(params.team_id)}/car`, {car_number: params.car_number})
      if (data) {
        if(params.push_url){
          this.$router.push({path: params.push_url})
        }
      }
    } catch (error) {
      console.log(error)
    }
  },
  async postReq({}, params){
    try {
      let {data} = await this.$axios.post(params.url, params.body)
    } catch (error) {
      console.log(error)
    }
  },
  async getReq({}, params) {
    try {
      const { data } = await this.$axios.get(params.url)
      return data;
    } catch (error) {
      console.log(error)
      return;
    }
  }
}
const getters = {
  currentUser: function (state) {
    if (state.isAuthenticated) {
      return state.user
    }
    return null
  },
  getModalStates: state => state.modals,
  getImages: state => state.images,
  getAnnouncements: state => state.announcements,
  isAuthenticated: state => state.isAuthenticated,
  events: state => state.events,
  teams: state => state.teams
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
