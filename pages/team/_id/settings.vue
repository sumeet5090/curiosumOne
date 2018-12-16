<template>
  <section class="section">
    <no-ssr>
      <b-container v-if="accessControl('user') && accessControl('adminOrTeamCaptain')">
        <modal :show.sync="confirmation.modal" gradient="danger" modal-classes="modal-danger modal-dialog-centered" v-if="confirmation.modal">
          <h6 class="modal-title" id="modal-title-notification" slot="header">Are you sure?</h6>
          <div class="py-3 text-center">
            <i class="fas fa-bell fa-2x"></i>
            <h4 class="heading mt-4"></h4>
            <p>
              By confirming this you are promoting
              <strong style="color: #FFF600;">{{confirmation.selectedUser.display_name}}</strong> to team captain.
            </p>
          </div>
          <template slot="footer">
            <base-button @click.prevent="cancelled" class="mr-auto" text-color="white" type="link">Cancel</base-button>
            <base-button @click.prevent="confirmed" type="success">Confirm</base-button>
          </template>
        </modal>
        <b-row class="justify-content-center">
          <div class="col-sm-12 col-md-10">
            <b-alert :show="showDismissableAlert" @dismissed="showDismissableAlert=false" dismissible v-if="errors.length > 0" variant="danger">
              <div :key="error" v-for="error in errors">{{error}}</div>
            </b-alert>
            <b-alert :show="!!success_msg" variant="success">
              <div>{{success_msg}}</div>
            </b-alert>
            <card>
              <div class="container" v-if="team._id">
                <div class="row justify-content-center">
                  <router-link :to="{name: 'team-id', params: {id: team._id}}" class="h3 font-weight-bold cursor-pointer text-primary" tag="a">{{team.team_name}}</router-link>
                </div>
              </div>
              <b-form @reset="onReset" @submit.prevent>
                <b-form-group id="form-teamname" label="Team Name:" label-for="form-teamname--input">
                  <base-input id="form-teamname--input" placeholder="Enter team name" required type="text" v-model="form.team_name"></base-input>
                </b-form-group>
                <b-form-group id="form-website-url" label="Social:">
                  <div class="row">
                    <base-input addon-left-icon="fa fa-link text-dark" class="col-sm-12 col-lg-6" placeholder="Enter Website URL" required type="text" v-model="form.website_url"></base-input>
                    <base-input addon-left-icon="fab fa-facebook facebook-icon" class="col-sm-12 col-lg-6" placeholder="Enter Facebook URL" required type="text" v-model="form.social.facebook"></base-input>
                    <base-input addon-left-icon="fab fa-instagram text-danger" class="col-sm-12 col-lg-6" placeholder="Enter Instagram URL" required type="text" v-model="form.social.instagram"></base-input>
                    <base-input addon-left-icon="fab fa-twitter twitter-icon" class="col-sm-12 col-lg-6" placeholder="Enter Twitter URL" required type="text" v-model="form.social.twitter"></base-input>
                  </div>
                </b-form-group>
                <b-form-group id="form-bio" label="Bio: " label-for="form-bio--input">
                  <b-form-textarea :max-rows="4" :rows="2" id="form-bio--input" no-resize placeholder="Enter bio" required type="text" v-model="form.bio"></b-form-textarea>
                </b-form-group>
                <div class="row">
                  <div class="col-sm-12 col-lg-6">
                    <b-form-group id="form-logo-url" label="Logo URL:" label-for="form-logo-url--input">
                      <base-input addon-left-icon="fas fa-image text-dark" id="form-logo-url--input" placeholder="Enter URL for logo" required type="link" v-model="form.logo"></base-input>
                    </b-form-group>
                  </div>
                  <div class="col-sm-12 col-lg-6">
                    <b-form-group id="form-drive_folder-url" label="Drive folder URL:" label-for="form-drive_folder-url--input" v-if="accessControl('admin')">
                      <base-input addon-left-icon="fab fa-google-drive text-dark" id="form-logo-url--input" placeholder="Enter URL for drive folder" required type="link" v-model="form.drive_folder"></base-input>
                    </b-form-group>
                  </div>
                </div>
                <div class="text-center">
                  <b-button @click.prevent="onSubmit" type="submit" variant="success">Update</b-button>
                  <b-button @click.prevent="onReset" type="reset" variant="danger">Reset</b-button>
                </div>
                <b-row class="justify-content-center border-top mt-3">
                  <h4 class="text-capitalize text-primary font-weight-bold">Members</h4>
                </b-row>
                <b-row class="justify-content-center">
                  <b-col :key="user.id" lg="3" md="4" v-bind:class="{'team-captain order-first': !!isCaptain(team.captain, user._id), 'order-2': !isCaptain(team.captain, user._id)}" v-for="user in team.users">
                    <card class="team-user-profiles mt-3" no-body tag="article">
                      <div class="text-center">
                        <img class="rounded-circle" v-lazy="user.profile.picture">
                        <div class="my-2">
                          <router-link :to="'/profile/'+user.username" class="text-primary font-weight-300">{{user.display_name}}</router-link>
                          <div v-if="isCaptain(team.captain, user._id)">
                            <small class="text-muted">Captain</small>
                          </div>
                          <div v-else>
                            <small @click.prevent="confirmationNotification(user)" class="btn btn-sm btn-danger btn-outline-danger">Make Captain</small>
                          </div>
                        </div>
                      </div>
                    </card>
                  </b-col>
                  <router-link :to="{name: 'team-id-members-add', params: {id: team._id}}" class="col-sm-4 col-md-3 col-lg-2 order-last" tag="div" v-if="accessControl('adminOrTeamCaptain')">
                    <card class="team-user-profiles text-center cursor-pointer" no-body tag="article">
                      <div class="card-body"></div>
                      <small>Add members</small>
                      <i class="far fa-plus-square fa-2x"></i>
                      <div class="card-body"></div>
                    </card>
                  </router-link>
                </b-row>
                <b-row class="justify-content-center border-top mt-3" v-if="team.alumnus.length > 0">
                  <h4 class="text-capitalize text-primary font-weight-bold">Alumni</h4>
                </b-row>
                <b-row class="justify-content-center" v-if="team.alumnus.length > 0">
                  <b-col :key="alumni.id" lg="3" md="4" v-for="alumni in team.alumnus"> 
                    <card class="team-user-profiles mt-3" no-body tag="article">
                      <div class="text-center">
                        <img class="rounded-circle" v-lazy="alumni.profile.picture">
                        <div class="my-2">
                          <router-link :to="'/profile/'+alumni.username" class="text-primary font-weight-300">{{alumni.display_name}}</router-link>
                        </div>
                      </div>
                    </card>
                  </b-col>
                </b-row>
              </b-form>
            </card>
          </div>
        </b-row>
      </b-container>
      <error-page message="You are not authorized to view this content." v-else v-show="loaded"/>
    </no-ssr>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      showDismissableAlert: false,
      success_msg: null,
      errors: [],
      team: {},
      form: {
        team_name: null,
        website_url: null,
        social: {},
        logo: null,
        bio: null
      },
      confirmation: {
        modal: false,
        selectedUser: {}
      },
      loaded: false
    };
  },
  computed: {
    ...mapGetters(["isAdmin", "currentUser"])
  },
  methods: {
    ...mapActions(["getReq", "postReq", "putReq", "putReq"]),
    async onSubmit() {
      this.success_msg = null;
      this.errors = [];
      let res = await this.putReq({
        url: `/api/team/${this.params.id}`,
        body: {
          website_url: this.form.website_url,
          social: this.form.social,
          logo: this.form.logo,
          bio: this.form.bio,
          driver_folder: this.form.drive_folder,
          team_name: this.form.team_name
        }
      });
      if (res.success) {
        this.$router.go(this.$router.currentRoute);
        return (this.success_msg = res.message ? res.message : "Team updated.");
      } else {
      }
    },
    async onReset() {
      this.success_msg = null;
      this.showDismissableAlert = false;
      this.errors = [];
      await this.loadFormData();
    },
    async loadFormData() {
      try {
        let res = await this.getReq({
          url: `/api/team/${this.params.id}`
        });
        if (res.success) {
          this.team = res.team;
          this.form = {
            ...res.team
          };
        } else {
          this.showError(res.message);
        }
        this.loaded = true;
      } catch (error) {
        console.log(error);
        this.showError("Internal server error.");
      }
    },
    confirmationNotification(user) {
      this.confirmation.selectedUser = user;
      this.confirmation.modal = true;
    },
    confirmed() {
      this.makeCaptain(this.confirmation.selectedUser._id);
    },
    cancelled() {
      this.confirmation.selectedUser = {};
      this.confirmation.modal = false;
    },
    isCaptain: (cap, user) => (cap == user ? true : false),
    async makeCaptain(user_id) {
      try {
        let team_id = this.params.id;
        let res = await this.putReq({
          url: `/api/team/${team_id}/captain`,
          body: {
            new_captain: user_id
          }
        });
        if (res.success) {
          this.success_msg = res.message;
          this.$router.go(this.$router.currentRoute);
        } else {
          this.showError(res.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    showError(msg) {
      this.showDismissableAlert = true;
      this.errors.push(msg);
    },
    validatedInputs() {
      if (1) {
        return true;
      }
      return false;
    },
    accessControl(perm) {
      switch (perm) {
        case "admin":
          return !!this.isAdmin;
          break;
        case "adminOrTeamCaptain":
          return !!(this.isAdmin || this.team.captain == this.currentUser._id);
          break;
        case "user":
          return !!this.currentUser;
          break;
        default:
          return false;
          break;
      }
    }
  },
  async asyncData({ params }) {
    try {
      return {
        params
      };
    } catch (error) {
      return {
        params: {}
      };
    }
  },
  created() {
    this.$nextTick(function() {
      this.loadFormData();
    });
  }
};
</script>

<style lang="scss">
.facebook-icon {
  color: rgb(59, 89, 153);
}

.twitter-icon {
  color: rgb(29, 161, 242);
}

.form-control {
  padding-left: 0.5rem !important;
  &:focus {
    color: black;
  }
}
</style>
