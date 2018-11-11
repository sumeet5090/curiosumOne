<template>
<div class="position-relative custom-gradient">
  <section class="section">
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="12">
          <img v-lazy="require('@/assets/images/brand/header.jpg')" class="img-thumbnail">
        </b-col>
      </b-row>
      <b-row>
        <b-col sm=12>
          <!-- <h3 class="display-3 text-white">Description Title</h3> -->
        </b-col>
      </b-row>
    </b-container>
  </section>
  <section class="section has-cards">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10 mb-2 p-2" v-for="event in events" :key="event._id">
          <div class="container">
            <div class="row justify-content-center">
              <card no-body class="col-12">
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
          <!-- <div class="row">
            <card no-body>
              <div class="col-8">
                <span class="display-3 text-uppercase text-dark">{{event.name}}</span>
              </div>
              <div class="col-4">
                <span class="text-center text-dark">{{formatDate(event.date)}}</span>
              </div>
            </card>
          </div> -->
          <div class="row mt-4">
            <div class="col-lg-4 mt-1">
              <card class="border-0" shadow body-classes="py-3">
                <icon name="fa fa-trophy" type="primary" rounded class="mb-4">
                </icon>
                <h6 class="text-primary text-uppercase">Registered Teams</h6>
                <p class="description mt-3">Checkout the teams.</p>
                <router-link tag="a" class="btn btn-primary mt-2" :to="{name: 'event-id-teams', params: {id: event._id}}">
                  Teams
                </router-link>
              </card>
            </div>
            <div class="col-lg-4 mt-1">
              <card class="border-0" shadow body-classes="py-3">
                <icon name="fa fa-bell" type="warning" rounded class="mb-4">
                </icon>
                <h6 class="text-warning text-uppercase">Announcements</h6>
                <p class="description mt-3">Get the latest announcements!</p>
                <router-link tag="a" class="btn btn-warning mt-2" :to="{name: 'event-id-announcements', params: {id: event._id}}">
                  Click Here
                </router-link>
              </card>
            </div>
            <div class="col-lg-4 mt-1">
              <card class="border-0" shadow body-classes="py-3">
                <icon name="fa fa-calendar" type="success" rounded class="mb-4">
                </icon>
                <h6 class="text-success text-uppercase">Schedule</h6>
                <p class="description mt-3">Get the current schedule!</p>
                <router-link tag="a" class="btn btn-success mt-2" :to="{name: 'event-id-schedule', params: {id: event._id}}">
                  Click Here
                </router-link>
              </card>
            </div>
            <div class="col-lg-4 mt-1" v-show="showMoreCards">
              <card class="border-0" shadow body-classes="py-3">
                <icon name="fa fa-trophy" type="success" rounded class="mb-4">
                </icon>
                <h6 class="text-success text-uppercase">Schedule</h6>
                <p class="description mt-3">Get the current schedule!</p>
                <base-button tag="a" href="" type="success" class="mt-4">
                  Learn more
                </base-button>
              </card>
            </div>
            <div class="col-lg-4 mt-1" v-show="showMoreCards">
              <card class="border-0" shadow body-classes="py-3">
                <icon name="fa fa-trophy" type="success" rounded class="mb-4">
                </icon>
                <h6 class="text-success text-uppercase">Schedule</h6>
                <p class="description mt-3">Get the current schedule!</p>
                <base-button tag="a" href="" type="success" class="mt-4">
                  Learn more
                </base-button>
              </card>
            </div>
            <div class="col-lg-4 mt-1" v-show="showMoreCards">
              <card class="border-0" shadow body-classes="py-3">
                <icon name="fa fa-trophy" type="success" rounded class="mb-4">
                </icon>
                <h6 class="text-success text-uppercase">Schedule</h6>
                <p class="description mt-3">Get the current schedule!</p>
                <base-button tag="a" href="" type="success" class="mt-4">
                  Learn more
                </base-button>
              </card>
            </div>
          </div>
          <div class="row justify-content-center mt-1">
            <base-button size="sm" type="secondary" @click.prevent="handleCards">
              <div v-if="showMoreCards">Hide</div>
              <div v-else>Show more</div>
            </base-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import api from "@/services/Event.service.js";
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  head(){
    return {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Oswald' }
      ]
    }
  },
  data() {
    return {
      showMoreCards: false
    };
  },
  async asyncData({ $axios, error }) {
    try {
      const { data } = await $axios.get(`/api/event`, {
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
    this.$nextTick(function() {
      this.fetchEvents();
    });
  }
};
</script>
