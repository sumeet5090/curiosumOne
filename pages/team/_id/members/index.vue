<template>
<section class="section">
  <no-ssr>
    <b-container v-if="!!accessControl('adminOrTeamCaptain')">
      <b-row class="justify-content-center">
        <b-col sm="12" md="10" lg="10">
          <card shadow class="card-profile" no-body>
            <div class="container" v-if="getTeam._id">
              <div class="row justify-content-center">
                <router-link tag="a" :to="{name: 'team-id', params: {id: getTeam._id}}" class="h3 font-weight-bold cursor-pointer">{{getTeam.team_name}}</router-link>
              </div>
            </div>
            <div class="container">
              <h4 class="text-center text-capitalize text-dark font-weight-bold mt-3 py-2">Team Members</h4>
              <b-row class="justify-content-center">
                <b-col sm="4" md="3" lg="2" v-for="user in getTeam.users" :key="user.id" v-bind:class="{'team-captain order-first': !!isCaptain(getTeam.captain, user._id), 'order-2': !isCaptain(getTeam.captain, user._id)}">
                  <card no-body tag="article" class="team-user-profiles mt-3">
                    <div class="text-center">
                      <img class="rounded-circle" v-lazy="user.profile.picture">
                      <div class="my-2">
                        <router-link :to="'/profile/'+user.username" class="text-primary font-weight-300">{{user.display_name}}</router-link>
                        <div v-if="isCaptain(getTeam.captain, user._id)">
                          <small class="text-muted">(captain)</small>
                        </div>
                      </div>
                    </div>
                  </card>
                </b-col>
                <router-link class="col-sm-4 col-md-3 col-lg-2 order-last" tag="div" v-if="accessControl('adminOrTeamCaptain')" :to="{name: 'team-id-members-add', params: {id: getTeam._id}}">
                  <card no-body tag="article" class="team-user-profiles text-center cursor-pointer">
                    <div class="card-body"></div>
                    <small>Add members</small>
                    <i class="far fa-plus-square fa-2x"></i>
                    <div class="card-body"></div>
                  </card>
                </router-link>
              </b-row>
            </div>
          </card>
        </b-col>
      </b-row>
    </b-container>
  </no-ssr>
</section>
</template>

<script>
import {
  mapActions,
  mapGetters
} from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["currentUser", "isAdmin", "getTeam"])
  },
  methods: {
    ...mapActions(["getReq", "postReq", "setTeam"]),
    isCaptain: (cap, user) => (cap == user ? true : false),
    accessControl(perm) {
      switch (perm) {
        case "admin":
          if (this.isAdmin) {
            return true;
          }
          return false;
          break;
        case "adminOrTeamCaptain":
          if (!!this.currentUser) {
            if (this.isAdmin || this.getTeam.captain == this.currentUser._id)
              return true;
          }
          return false;
          break;
        default:
          return false;
          break;
      }
    }
  },
  async asyncData({
    params
  }) {
    return {
      params
    };
  },
  created() {
    this.$nextTick(function () {
      this.setTeam(this.params.id);
    })
  }
};
</script>

<style lang="scss">
</style>
