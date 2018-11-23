<template>
<div class="profile-page custom-gradient">
  <section class="section-profile-cover"></section>
  <section class="section my-0">
    <div class="container">
      <card shadow class="card-profile mt--300" no-body>
        <div class="px-4 text-dark">
          <div class="row justify-content-center">
            <div class="col-lg-3 order-lg-2">
              <div class="card-profile-image">
                <a href="" class="profile-pic">
                    <img v-if="team.logo" v-lazy="team.logo" class="rounded-circle"/>
                    <img v-else src="@/assets/images/font-awesome/users-solid.svg">
                </a>
              </div>
            </div>
            <div class="col-lg-4 order-3 order-lg-1">
              <div class="card-profile-stats d-flex justify-content-center">
                <div>
                  <span class="heading" v-if="!!team.events">{{team.events.length}}</span>
                  <span class="description" v-if="!!team.events">Event{{team.events.length == 1? '' : 's'}}</span>
                </div>
                <div>
                  <span class="heading" v-if="!!team.users">{{team.users.length}}</span>
                  <span class="description">Members</span>
                </div>
              </div>
            </div>
            <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
              <div class="card-profile-actions py-2 mt-lg-1">
                <span class="mr-2 text-center">
                    <a v-if="team.website_url" :href="team.website_url" target="_blank"><icon name="fa fa-link" color="dark" size="md"></icon></a>
                    <a v-if="team.social.facebook" :href="team.social.facebook" target="_blank"><icon name="fab fa-facebook-f" style="color: #3B5999"  size="md"></icon></a>
                </span>
                <span class="float-right text-center">
                    <a v-if="team.social.twitter" :href="team.social.twitter" target="_blank"><icon name="fab fa-twitter" style="color: #1DA1F2"  size="md"></icon></a>
                    <a v-if="team.social.instagram" :href="team.social.instagram" target="_blank"><icon name="fab fa-instagram" color="danger" size="md"></icon></a>
                </span>
              </div>
            </div>
          </div>
          <div class="text-center mt-0 mt-md-5 pt-lg-2">
            <h3 class="pt-0 pt-sm--100 pt-md-2 pt-lg-1 display-3">{{team.team_name}}</h3>
            <div class="h6 font-weight-300 text-muted">{{team.location}}{{team.country && team.location ? ", ": ""}}{{team.country}}</div>
            <div class="h6 mt-2"><i class="mr-2 fa fa-university"></i></div>
            <div>
              <div class="display-4">{{team.institution.name}}</div>
              <small class="text-muted">{{team.institution.address}}</small>
            </div>
          </div>
          <div class="mt-2 py-2 border-top text-center">
            <div class="row justify-content-center">
              <div class="col-lg-9">
                <i class="fas fa-scroll"></i>
                <p>{{team.bio}}</p>
              </div>
            </div>
          </div>
          <div class="my-1 py-2 border-top" v-show="!!(team.events.length>0)">
            <b-row class="justify-content-center">
              <h4 class="font-weight-bold text-dark">Events</h4>
            </b-row>
            <b-row class="justify-content-center">
              <b-col sm="6" v-for="event in team.events" :key="event.event_short">
                <div class="text-center text-primary">
                  <router-link :to="'/event/'+event.event_short"> {{event.name}}</router-link>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
        <div class="my-1 py-2 border-top" v-show="!!(team.users.length > 0)">
          <div class="text-center">
            <i class="fas fa-users"></i>
            <h4 class="font-weight-bold text-dark">Team Members</h4>
          </div>
          <b-row class="justify-content-center">
            <b-col sm="4" md="3" lg="2" v-for="user in team.users" :key="user.id" v-bind:class="{'team-captain order-1': !!isCaptain(team.captain, user._id), 'order-2': !isCaptain(team.captain, user._id)}">
              <card no-body tag="article" class="team-user-profiles my-1">
                <div class="text-center">
                  <img class="rounded-circle" v-lazy="user.profile.picture">
                  <div class="my-2">
                    <router-link :to="'/profile/'+user.username" class="text-primary font-weight-300">{{user.display_name}}</router-link>
                    <div v-if="isCaptain(team.captain, user._id)"><small class="text-muted">(captain)</small></div>
                  </div>

                </div>
              </card>
            </b-col>
          </b-row>
        </div>
      </card>
    </div>
  </section>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from "vuex";
export default {
  async asyncData({
    $axios,
    params,
    error
  }) {
    try {
      const {
        data
      } = await $axios.get(`/api/team/${params.id}`, {
        validateStatus: status => {
          return status < 400;
        }
      });
      return {
        team: data.team
      };
    } catch (err) {
      return error({
        message: "Couldn't get team."
      });
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters["currentUser"]
  },
  methods: {
    isCaptain: (cap, user) => cap == user ? true : false
  }
};
</script>

<style lang="scss" scoped>
.profile-pic {
  img {
    box-shadow: none !important;
  }
}
</style>
