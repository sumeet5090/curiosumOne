<template>
  <div class="profile-page">
    <section class="section my-0">
      <div class="container">
        <card class="card-profile mt-0" no-body shadow>
          <div class="px-4 text-dark">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a class="profile-pic" href>
                    <img alt="Team Logo" class="rounded-circle" v-if="team.logo" v-lazy="team.logo">
                    <img alt="Team Logo" src="@/assets/images/font-awesome/users-solid.svg" v-else>
                  </a>
                </div>
              </div>
              <div class="col-lg-4 order-3 order-lg-1">
                <div class="card-profile-stats d-flex justify-content-center">
                  <div>
                    <span class="heading" v-if="team.events">{{team.events.length}}</span>
                    <span class="heading" v-else>0</span>
                    <span class="description" v-if="!!team.events">Event{{team.events.length == 1? '' : 's'}}</span>
                    <span class="description" v-else>Events</span>
                  </div>
                  <div>
                    <span class="heading" v-if="team.users">{{team.users.length }}</span>
                    <span class="heading" v-else>0</span>
                    <span class="description" v-if="team.users && team.users.length === 1">Member</span>
                    <span class="description" v-else>Members</span>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                <div class="card-profile-actions py-2 mt-lg-1">
                  <span class="mr-1 text-center">
                    <a :href="team.website_url" rel="noreferrer" target="_blank" v-if="team.website_url">
                      <icon color="dark" name="fa fa-link" size="md"></icon>
                    </a>
                    <a :href="team.social.facebook" rel="noreferrer" target="_blank" v-if="team.social.facebook">
                      <icon name="fab fa-facebook-f" size="md" style="color: #3B5999"></icon>
                    </a>
                  </span>
                  <span class="float-right text-center">
                    <a :href="team.social.twitter" rel="noreferrer" target="_blank" v-if="team.social.twitter">
                      <icon name="fab fa-twitter" size="md" style="color: #1DA1F2"></icon>
                    </a>
                    <a :href="team.social.instagram" rel="noreferrer" target="_blank" v-if="team.social.instagram">
                      <icon color="danger" name="fab fa-instagram" size="md"></icon>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div class="text-center mt-0 mt-md-2 pt-lg-2">
              <div class="pt-0 pt-sm--100 pt-md-2 pt-lg-1">
                <span class="display-3">{{team.team_name}}</span>
                <router-link :to="{name: 'team-id-settings', params: {id: team._id}}" class="btn btn-sm btn-link cursor-pointer mb-3" tag="a" v-if="showSettings">
                  <i class="fas fa-pen fa-2x"></i>
                </router-link>
              </div>
              <div class="h6 font-weight-300 text-muted">{{team.location}}{{team.country && team.location ? ", ": ""}}{{team.country}}</div>
              <div class="float-left">
                <i class="mr-2 fa fa-university"></i>
              </div>
              <div>
                <div class="h6">{{team.institution.name}}</div>
                <small class="text-muted">{{team.institution.address}}</small>
              </div>
            </div>
            <div class="mt-2 py-2 border-top text-center" v-if="team.bio">
              <div class="row justify-content-center">
                <div class="col-lg-9">
                  <i class="fas fa-scroll"></i>
                  <p>{{team.bio}}</p>
                </div>
              </div>
            </div>
            <div class="my-1 py-2 border-top" v-if="team.events && team.events.length > 0">
              <b-row class="justify-content-center">
                <h4 class="font-weight-bold text-dark">Events</h4>
              </b-row>
              <b-row class="justify-content-start">
                <b-col :key="event.event_short" sm="6" v-for="event in team.events">
                  <div class="text-center text-primary">
                    <a :href="event.link" class="btn btn-link" tag="a">{{event.name}}</a>
                  </div>
                </b-col>
              </b-row>
            </div>
            <div class="my-1 py-2 border-top" v-if="!!(team.users && team.users.length > 0)">
              <div class="text-center">
                <i class="fas fa-users"></i>
                <router-link :to="{name: 'team-id-members', params: team._id}" class="h4 font-weight-bold text-dark cursor-pointer" tag="div">Team Members</router-link>
              </div>
              <b-row class="justify-content-center">
                <b-col :key="user.id" lg="2" md="3" sm="4" v-bind:class="{'team-captain order-first': !!isCaptain(team.captain, user._id), 'order-2': !isCaptain(team.captain, user._id)}" v-for="user in team.users">
                  <card class="team-user-profiles my-1" no-body tag="article">
                    <div class="text-center">
                      <img alt="User profile" class="rounded-circle" style="height: 64px; width: 64px; object-fit: cover;" v-lazy="user.profile.picture">
                      <div class="my-2">
                        <router-link :to="'/profile/'+user.username" class="text-primary font-weight-300">{{user.display_name}}</router-link>
                        <div v-if="isCaptain(team.captain, user._id)">
                          <small class="text-muted">Captain</small>
                        </div>
                      </div>
                    </div>
                  </card>
                </b-col>
              </b-row>
            </div>
            <div class="my-1 py-2 border-top" v-if="!!(team.alumnus && team.alumnus.length > 0)">
              <div class="text-center">
                <i class="fas fa-user-graduate"></i>
                <router-link :to="{name: 'team-id-members', params: team._id}" class="h4 font-weight-bold text-dark cursor-pointer" tag="div">Alumni</router-link>
              </div>
              <b-row class="justify-content-center">
                <b-col :key="user.id" lg="2" md="3" sm="4" v-bind:class="{'team-captain order-first': !!isCaptain(team.captain, user._id), 'order-2': !isCaptain(team.captain, user._id)}" v-for="user in team.alumnus">
                  <card class="team-user-profiles my-1" no-body tag="article">
                    <div class="text-center">
                      <img alt="User profile" class="rounded-circle" v-lazy="user.profile.picture">
                      <div class="my-2">
                        <router-link :to="'/profile/'+user.username" class="text-primary font-weight-300">{{user.display_name}}</router-link>
                      </div>
                    </div>
                  </card>
                </b-col>
              </b-row>
              <b-row class="justify-content-center">
                <div class="col-12 text-center">
                  <table class="table table-responsive-md table-sm table-hover table-bordered">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Queue</th>
                        <th scope="col">Date</th>
                        <th scope="col">Start time</th>
                        <th scope="col">End time</th>
                      </tr>
                    </thead>
                    <tbody :key="st_sc._id" v-for="st_sc in team.static_schedules">
                      <tr>
                        <th scope="row">Business</th>
                        <td>{{st_sc.business.queue}}</td>
                        <td>{{formatDate(st_sc.business.start_time)}}</td>
                        <td>{{getTime(st_sc.business.start_time)}}</td>
                        <td>{{getTime(st_sc.business.end_time)}}</td>
                      </tr>
                      <tr>
                        <th scope="row">Cost</th>
                        <td>{{st_sc.cost.queue}}</td>
                        <td>{{formatDate(st_sc.cost.start_time)}}</td>
                        <td>{{getTime(st_sc.cost.start_time)}}</td>
                        <td>{{getTime(st_sc.cost.end_time)}}</td>
                      </tr>
                      <tr>
                        <th scope="row">Design</th>
                        <td>{{st_sc.design.queue}}</td>
                        <td>{{formatDate(st_sc.design.start_time)}}</td>
                        <td>{{getTime(st_sc.design.start_time)}}</td>
                        <td>{{getTime(st_sc.design.end_time)}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-row>
            </div>
            <div class="my-1 py-2 border-top" v-if="team.drive_folder" v-show="!!(team.drive_folder)">
              <div class="text-center">
                <i class="fab fa-google-drive"></i>
                <h4 class="font-weight-bold text-dark">Team Drive folder</h4>
              </div>
              <b-row class="justify-content-center">
                <b-col lg="2" md="3" sm="3">
                  <card class="my-1" no-body tag="article">
                    <div class="text-center">
                      <a :href="team.drive_folder" class="btn btn-link" rel="noreferrer" target="_blank">Link</a>
                    </div>
                  </card>
                </b-col>
              </b-row>
            </div>
          </div>
        </card>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const moment = require("moment");
import _ from "lodash";
export default {
  async asyncData({ $axios, params, error }) {
    try {
      const { data } = await $axios.get(`/api/team/${params.id}`, {
        validateStatus: status => {
          return status < 400;
        }
      });
      data.team.events.sort(
        (d1, d2) =>
          new Date(d2.start_date).getTime() - new Date(d1.start_date).getTime()
      );
      return {
        team: data.team
      };
    } catch (err) {
      console.log(err);
      return error({
        message: "Couldn't get team."
      });
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["currentUser", "isAdmin"]),
    showSettings: function() {
      if (this.currentUser) {
        return (
          this.isCaptain(this.currentUser._id, this.team.captain) ||
          this.isAdmin
        );
      }
    }
  },
  methods: {
    isCaptain: (cap, user) => (cap == user ? true : false),
    accessControl(perm) {
      switch (perm) {
        case "admin":
          return !!this.isAdmin;
          break;
        case "adminOrTeamCaptain":
          if (this.currentUser) {
            return !!(
              this.isAdmin || this.team.captain == this.currentUser._id
            );
          }
          return false;
          break;
        case "user":
          return !!this.currentUser;
          break;
        default:
          return false;
          break;
      }
    },
    formatDate(date) {
      return moment(date).format("LL");
    },
    getTime(date) {
      return moment(date).format("hh:mm A");
    },
    sortByDate(events) {
      var a = events;
      return events;
    }
  }
};
</script>

<style lang="scss">
.profile-page .card-profile .card-profile-image img {
  box-shadow: none;
}
</style>
