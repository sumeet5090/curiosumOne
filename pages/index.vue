<template>
<div class="position-relative">
  <section class="section pt-0">
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="12">
          <img v-lazy="require('@/assets/images/brand/header.jpg')" class="img-thumbnail border-0 shadow-none" />
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col sm="12">
          <div class="text-dark">
            <div class="text-xs-left text-sm-left text-md-center text-lg-center">
              <span>
                  Welcome to the
                  <strong>mobilityeng.online</strong> portal hosted by
                  <strong>Mobility Engineering Consortium Private Limited.</strong>
                </span>
            </div>
            <div class="text-xs-center text-sm-left text-md-center text-lg-center">This site is meant for team and user registration to events organized by the company.</div>
            <div class="text-xs-center text-sm-left text-md-center text-lg-center">You can also view additional data such as event live schedules, inspection updates, lap times etc.</div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
  <section class="section has-cards pt-0">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-11 mb-2 p-2" v-for="event in events" :key="event._id">
          <div class="container">
            <div class="row justify-content-center">
              <card no-body class="col-12 border-0">
                <div class="container">
                  <div class="row header-font">
                    <div class="col-sm-8">
                      <div class="display-3 text-uppercase text-dark">{{event.name}}</div>
                    </div>
                    <div class="col-sm-4">
                      <div class="py-auto text-dark">{{formatDate(event.start_date, event.end_date)}}</div>
                      <div class="py-auto text-dark">{{event.venue}}</div>
                    </div>
                  </div>
                </div>
              </card>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-6 col-lg-4 mt-1 mt-lg-3">
              <card class="border-0" shadow body-classes="py-3">
                <icon name="fa fa-link" type="info" rounded class="mb-3"></icon>
                <h6 class="text-info text-uppercase">Official Website</h6>
                <p class="description mt-3">Visit {{event.name}} official website!</p>
                <a class="btn btn-info mt-2" :href="event.link" target="_blank">Website</a>
              </card>
            </div>
            <div class="col-md-6 col-lg-4 mt-1 mt-lg-3">
              <card class="border-0" shadow body-classes="py-3">
                <icon name="fa fa-trophy" type="primary" rounded class="mb-3"></icon>
                <h6 class="text-primary text-uppercase">Registered Teams</h6>
                <p class="description mt-3">List of registered teams for {{event.name}}.</p>
                <router-link tag="a" class="btn btn-primary mt-2" :to="{name: 'event-id-teams', params: {id: event.event_short}}">Teams</router-link>
              </card>
            </div>
            <div class="col-md-6 col-lg-4 mt-1 mt-lg-3">
              <card class="border-0" shadow body-classes="py-3">
                <icon name="fa fa-calendar" type="success" rounded class="mb-3"></icon>
                <h6 class="text-success text-uppercase">Schedule</h6>
                <p class="description mt-3">Day-to-day schedule for {{event.name}}!</p>
                <router-link tag="a" class="btn btn-success mt-2" :to="{name: 'event-id-schedule', params: {id: event.event_short}}">Schedule</router-link>
              </card>
            </div>
            <div class="col-md-6 col-lg-4 mt-1 mt-lg-3">
              <card class="border-0" shadow body-classes="py-3">
                <icon name="fa fa-bell" type="warning" rounded class="mb-3"></icon>
                <h6 class="text-warning text-uppercase">Live Announcements</h6>
                <p class="description mt-3">Live announcement feed duing {{event.name}}!</p>
                <router-link tag="a" class="btn btn-warning mt-2" :to="{name: 'event-id-announcements', params: {id: event.event_short}}">Live Feed</router-link>
              </card>
            </div>
            <div class="col-md-6 col-lg-4 mt-1 mt-lg-3">
              <card class="border-0" shadow body-classes="py-3">
                <icon name="fa fa-user-clock" type="dark" rounded class="mb-3"></icon>
                <h6 class="text-dark text-uppercase">Tech Inspection Updates</h6>
                <p class="description mt-3">Live updates of tech inspections for {{event.name}}!</p>
                <router-link tag="a" class="btn btn-light mt-2 text-dark" :to="{name: 'event-id-tech-updates', params: {id: event.event_short}}">Tech Updates</router-link>
              </card>
            </div>
            <div class="col-md-6 col-lg-4 mt-1 mt-lg-3">
              <card class="border-0" shadow body-classes="py-3">
                <icon name="fa fa-clock" type="default" rounded class="mb-3"></icon>
                <h6 class="text-default text-uppercase">Live Timing</h6>
                <p class="description mt-3">Un-official time display of {{event.name}}!</p>
                <router-link tag="a" class="btn btn-default mt-2" :to="{name: 'event-id-tech-updates', params: {id: event.event_short}}">Live Timings</router-link>
              </card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import api from "@/services/Event.service.js";
import {
  mapGetters
} from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      showMoreCards: false
    };
  },
  async asyncData({
    $axios,
    error
  }) {
    try {
      const {
        data
      } = await $axios.get(`/api/event`, {
        validateStatus: status => {
          return status < 400;
        }
      });
      return {
        isLoaded: data.success,
        events: data.events
      };
    } catch (err) {
      error({
        message: "Event not found",
        statusCode: 404
      });
    }
  },
  methods: {
    formatDate(start_date, end_date) {
      let d1 = moment(start_date).format(`DD MMM`);
      let d2 = moment(end_date).format(`DD MMM`);
      let y = moment(end_date).format(`YYYY`);
      return d1 + " - " + d2 + " " + y;
    },
    async fetchEvents() {
      // let response = await api.getMany();
      // if (!response) {
      //   return;
      // }
      // this.events = response.data.events;
    },
    handleCards() {
      this.showMoreCards = !this.showMoreCards;
    }
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  beforeMount() {},
  mounted() {
    this.$nextTick(function () {
      this.fetchEvents();
    });
  }
};
</script>
