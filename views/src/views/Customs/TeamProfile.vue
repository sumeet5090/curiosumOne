<template>
    <div class="profile-page">
        <section class="section-profile-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
                <!-- Bubbles on a background -->
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </section>
        <section class="section section-skew">
            <div class="container">
                <card shadow class="card-profile mt--300" no-body>
                    <div class="px-5">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                  <img v-lazy="team.team_logo_url" class="rounded-circle">
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                                <div class="card-profile-actions py-4 mt-lg-0">
                                    <base-button type="info" size="sm" class="mr-4">Connect</base-button>
                                    <base-button type="default" size="sm" class="float-right">Message</base-button>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-1">
                                <div class="card-profile-stats d-flex justify-content-center">
                                    <div>
                                        <span class="heading">{{(team.users || []).length}}</span>
                                        <span class="description">Members</span>
                                    </div>
                                    <div>
                                        <span class="heading">{{(team.events || []).length}}</span>
                                        <span class="description">Events</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-2">
                            <h2>
                                <span class="font-weight-bold">{{team.team_name}}</span>
                            </h2>
                            <div class="h6 mt-0">{{team.team_location}}</div>
                            <div class="h6 font-weight-bold mt-3">{{team.institution_name}}</div>
                            <div class="h6">{{team.institution_address}}</div>
                        </div>
                        <div class="mt-3 py-3 border-top text-center">
                            <div class="row justify-content-center">
                                <div class="col-lg-9">
                                  <truncate class="profile-description" clamp="Read More" :length="150" less="Show Less" :text="team.team_bio || ''"></truncate>
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
        </section>
    </div>
</template>
<script>
import Api from "@/services/Team.service.js";
import truncate from "vue-truncate-collapsed";
export default {
  components: {
    truncate: truncate
  },
  data() {
    return {
      images: {
        profilePic: require("./../../assets/img/theme/team-4-800x800.jpg")
      },
      team: {}
    };
  },
  methods: {
    async getTeam(id) {
      try {
        let response = await Api.getOne(id);
        if (!response) {
          return;
        }
        this.team = response.data.team;
        console.log(this.team);
      } catch (err) {
        console.log(err);
        return;
      }
    }
  },
  mounted() {},
  created() {
    this.getTeam(this.$route.params.id);
  }
};
</script>
<style>
</style>
