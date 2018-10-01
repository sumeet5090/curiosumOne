<template>
    <div class="position-relative">
            <section class="section custom-gradient">
                <div class="container my-1">
                    <div class="row justify-content-center">
                        <div class="col-lg-6 col-md-10 my-3">
                            <card type="" shadow
                                header-classes="bg-white pb-1 mt-2"
                                body-classes="p-lg-4 mb-2"
                                class="border-0 py-3">
                                <template slot="header">
                                    <h5 class="text-center text-warning text-uppercase"><strong>Login</strong></h5>
                                </template>
                                <template>
                                    <div class="text-center">
                                        <base-button class="text-center" type="warning" outline >
                                            <!-- <i class="fa fa-google mr-1" slot="icon"></i> -->
                                            <span slot="icon"><img src="./../../assets/img/icons/common/google.svg" alt=""></span>
                                            <span class="" slot>Google</span>
                                        </base-button>
                                    </div>
                                </template>
                            </card>
                        </div>
                    </div>
                </div>
            </section>
            <section class="section has-cards">
                <div class="container my-2">
                    <div class="row justify-content-center custom-gradient">
                        <div class="col-md-10 mb-2 p-2" v-for="event in events" :key="event.name">
                            <div class="row-justify-content-center">
                                <div class="card col-md-8 mx-auto">
                                    <div class="card-title text-center font-weight-bold">{{event.name}}</div>
                                    <badge>{{event.date}}</badge>
                                </div>    
                            </div>
                            <div class="row mt-4">
                                <div class="col-lg-4 mt-1">
                                   <card class="border-0" hover shadow body-classes="py-3">
                                        <icon name="fa fa-trophy" type="primary" rounded class="mb-4">
                                        </icon>
                                        <h6 class="text-primary text-uppercase">Registered Teams</h6>
                                        <p class="description mt-3">All our glorious teams.</p>
                                        <div>
                                            <badge type="primary" rounded>design</badge>
                                            <badge type="primary" rounded>system</badge>
                                            <badge type="primary" rounded>creative</badge>
                                        </div>
                                        <base-button tag="a" href="#" type="primary" class="mt-4">
                                            Teams
                                        </base-button>
                                    </card>
                                </div>
                                <div class="col-lg-4 mt-1">
                                   <card class="border-0" hover shadow body-classes="py-3">
                                        <icon name="fa fa-trophy" type="warning" rounded class="mb-4">
                                        </icon>
                                        <h6 class="text-warning text-uppercase">Announcements</h6>
                                        <p class="description mt-3">Get the latest announcements!</p>
                                        <div>
                                            <badge type="warning" rounded>design</badge>
                                            <badge type="warning" rounded>system</badge>
                                            <badge type="warning" rounded>creative</badge>
                                        </div>
                                        <base-button tag="a" href="#" type="warning" class="mt-4">
                                            Click Here
                                        </base-button>
                                    </card>
                                </div>
                                <div class="col-lg-4 mt-1">
                                   <card class="border-0" hover shadow body-classes="py-3">
                                        <icon name="fa fa-trophy" type="success" rounded class="mb-4">
                                        </icon>
                                        <h6 class="text-success text-uppercase">Schedule</h6>
                                        <p class="description mt-3">Get the current schedule!</p>
                                        <div>
                                            <badge type="success" rounded>design</badge>
                                            <badge type="success" rounded>system</badge>
                                            <badge type="success" rounded>creative</badge>
                                        </div>
                                        <base-button tag="a" href="#" type="success" class="mt-4">
                                            Learn more
                                        </base-button>
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
export default {
  data() {
    return {
      events: [
        {
          date: "2018-09-11T04:30:00.000Z",
          orgranizer: [],
          _id: "5bafa15cf60d3e171cb1af5b",
          name: "Formula Bharat",
          venue: "Mumbai",
          __v: 0
        },
        {
          date: "2018-09-11T04:30:00.000Z",
          orgranizer: [],
          _id: "5bafa1fdf60d3e171cb1af5c",
          name: "Moto Racing",
          venue: "Pune",
          __v: 0
        },
        {
          date: "2018-01-01T06:30:00.000Z",
          orgranizer: [],
          _id: "5bafa4f3f60d3e171cb1af5d",
          name: "Mario Kart Racing",
          venue: "Rajkot",
          __v: 0
        },
        {
          date: "2019-01-02T04:30:00.000Z",
          orgranizer: [],
          _id: "5bafa573891ffc2e7c905444",
          name: "Mario Kart Racing II ",
          venue: "Chennai",
          __v: 0
        }
      ],
      event: {
        name: "hehehe",
        date: "12/12/2012"
      }
    };
  },
  methods: {
    async fetchEvents() {
      let response = await api.getMany();
      if (!response) {
        return;
      }
      this.events = response.data.events;
    }
  },
  beforeMount() {},
  mounted() {
    this.fetchEvents();
  }
};
</script>