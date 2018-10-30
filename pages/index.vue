<template>
<div class="position-relative custom-gradient">
    <section class="section ">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </section>
    <section class="section has-cards">
        <div class="container my-2">
            <div class="row justify-content-center custom-gradient">
                <div class="col-md-10 mb-2 p-2" v-for="event in events" :key="event._id">
                    <div class="row-justify-content-center">
                        <div class="card col-md-8 mx-auto">
                            <div class="card-title text-center font-weight-bold">{{event.name}}</div>
                            <badge>{{event.date}}</badge>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-lg-4 mt-1">
                            <card class="border-0" shadow body-classes="py-3">
                                <icon name="fa fa-trophy" type="primary" rounded class="mb-4">
                                </icon>
                                <h6 class="text-primary text-uppercase">Registered Teams</h6>
                                <p class="description mt-3">All our glorious teams.</p>
                                <div>
                                    <badge type="primary" rounded>design</badge>
                                    <badge type="primary" rounded>system</badge>
                                    <badge type="primary" rounded>creative</badge>
                                </div>
                                <router-link tag="a" class="btn btn-primary mt-4" :to="{name: 'event-id-teams', params: {id: event._id}}">
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
                                <div>
                                    <badge type="warning" rounded>design</badge>
                                    <badge type="warning" rounded>system</badge>
                                    <badge type="warning" rounded>creative</badge>
                                </div>
                                <base-button tag="a" href="" type="warning" class="mt-4">
                                    Click Here
                                </base-button>
                            </card>
                        </div>
                        <div class="col-lg-4 mt-1">
                            <card class="border-0" shadow body-classes="py-3">
                                <icon name="fa fa-calendar" type="success" rounded class="mb-4">
                                </icon>
                                <h6 class="text-success text-uppercase">Schedule</h6>
                                <p class="description mt-3">Get the current schedule!</p>
                                <div>
                                    <badge type="success" rounded>design</badge>
                                    <badge type="success" rounded>system</badge>
                                    <badge type="success" rounded>creative</badge>
                                </div>
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
                                <div>
                                    <badge type="success" rounded>design</badge>
                                    <badge type="success" rounded>system</badge>
                                    <badge type="success" rounded>creative</badge>
                                </div>
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
                                <div>
                                    <badge type="success" rounded>design</badge>
                                    <badge type="success" rounded>system</badge>
                                    <badge type="success" rounded>creative</badge>
                                </div>
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
                                <div>
                                    <badge type="success" rounded>design</badge>
                                    <badge type="success" rounded>system</badge>
                                    <badge type="success" rounded>creative</badge>
                                </div>
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
export default {
  data() {
    return {
      showMoreCards: false
    };
  },
  async asyncData({$axios, error}) {
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
