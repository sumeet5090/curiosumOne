<template>
<div class="profile-page">
  <section class="section-profile-cover custom-gradient">
  </section>
  <section class="section section-hero custom-gradient">
    <div class="container">
      <card shadow class="card-profile mt--300" no-body>
        <div class="px-4">
          <div class="row justify-content-center">
            <div class="col-lg-3 order-lg-1">
              <div class="card-profile-image">
                <a href="">
                    <img v-lazy="currentUser.profile.picture" class="rounded-circle">
                </a>
              </div>
            </div>
            <div class="col-lg-9 order-lg-2 text-lg-right align-self-lg-center">
              <div class="card-profile-actions py-4 mt-5 mt-lg-0">
                <span class="ml-2 float-right"><router-link :to="{name: 'profile-update'}" class="btn btn-primary btn-sm">Update</router-link></span>
              </div>
            </div>
          </div>
          <div class="text-center border-top mt-5 mt-md-3 pt-lg-3">
            <h3 class="pt-0 pt-sm--100 pt-md-4 pt-lg-4"><router-link :to="'/profile/'+currentUser.username">{{currentUser.display_name}}</router-link></h3>
            <div class="h6 font-weight-300 text-muted">{{currentUser.profile.location}}</div>
            <div class="mt-4 text-center" v-if="team">
              <i class="fa fa-university mr-2"></i>
              <h4 class="text-dark">{{team.institution.name}}</h4>
              <h6 class="text-muted">{{team.institution.address}}</h6>
            </div>
            <div class="border-top" v-if="team">
              <i class="mt-4 fa fa-users mr-2"></i>
              <h4><router-link tag="a" class="cursor-pointer text-primary" :to="'/team/'+team._id">{{team.team_name}}</router-link></h4>
              <div v-if="currentUser._id === team.captain_id">Team Captain</div>
              <div else>Team Member</div>
            </div>
          </div>
          <div class="mt-5 py-5 border-top text-center">
            <div class="row justify-content-center">
              <div class="col-lg-9">
                <h5>Bio</h5>
                <p>{{currentUser.bio}}</p>
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
import {
  mapActions,
  mapGetters
} from "vuex";
export default {
  data() {
    return {
      team: null
    };
  },
  async asyncData({
    $axios,
    error
  }) {},
  methods: {
    ...mapActions(["getTeam"]),
    saveTeam: async function () {
      this.team = await this.getTeam(this.currentUser.username);
    }
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
  created() {
    this.saveTeam();
  }
};
</script>

<style lang="scss">
</style>
