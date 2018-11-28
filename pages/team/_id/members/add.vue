<template>
<section class="section section-hero">
  <no-ssr v-if="loaded">
    <div class="container" v-if="!!accessControl('adminOrTeamCaptain')">
      <!-- Team Captain or Admin -->
      <div class="row justify-content-center">
        <card class="col-sm-10 col-md-8 col-lg-8">
          <b-form @submit.prevent @reset.prevent>
            <b-form-group id="form-teamname" label="User email:" label-for="form-teamname--input" description="Enter emails (seperated by space)">
              <b-row>
                <b-col sm="12" md="10">
                  <base-input addon-left-icon="fa fa-user" id="form-teamname--input" type="text" required placeholder="Enter user email" v-model="user_email"></base-input>
                </b-col>
                <b-col sm="12" md="2">
                  <b-button type="submit" variant="success" @click.prevent="searchUser">
                    <i class="fa fa-search"></i>
                  </b-button>
                </b-col>
              </b-row>
            </b-form-group>
            <div v-if="!!(users.length > 0)">
              <b-form-group id="form-usernames" label="Users:" label-for="form-usernames--badge">
                <span class="h4" v-for="(user, key) in users" :key="key">
                    <badge class="text-capitalize text-dark m-1 vertical-align-middle" type="primary">
                      {{user.display_name}}
                      <base-button size="sm" type="warning" class="border-none" outline @click.prevent="removeUser(key)">
                        <i class="fas fa-times"></i>
                      </base-button>
                    </badge>
                  </span>
              </b-form-group>
            </div>
            <b-alert variant="danger" dismissible v-if="errors.length > 0" :show="showDismissableAlert" @dismissed="showDismissableAlert=false">
              <div v-for="error in errors" :key="error">{{error}}</div>
            </b-alert>
            <b-alert variant="success" :show="!!success_msg">
              <div>{{success_msg}}</div>
              <div v-if="!!(sentEmails.length>0)">
                <div>Invite sent to:</div>
                <span class="mx-1" v-for="(email, key) in sentEmails" :key="key">{{email}}</span>
              </div>
            </b-alert>
            <b-button type="submit" variant="success" @click.prevent="onSubmit">Add</b-button>
            <b-button type="reset" variant="danger" @click.prevent="onReset">Reset</b-button>
          </b-form>
        </card>
      </div>
    </div>
    <error-page v-else message="You are not authorized to add members."></error-page>
  </no-ssr>
</section>
</template>

<script>
import {
  mapActions,
  mapGetters
} from "vuex";
import {
  isNullOrUndefined
} from "util";
export default {
  data() {
    return {
      showDismissableAlert: false,
      success_msg: null,
      errors: [],
      users: [],
      emails: [],
      user_email: null,
      sentEmails: [],
      loaded: false,
    };
  },
  methods: {
    ...mapActions(["getReq", "postReq"]),
    async onSubmit() {
      this.errors = [];
      this.success_msg = null;
      if (this.users.length > 0) {
        let res = await this.postReq({
          url: `/api/team/${this.params.id}/add/members`, // Add team members
          body: {
            users: this.users,
            emails: this.emails
          }
        });
        if (res.success) {
          if (res.successful_emails.length > 0) {
            this.sentEmails = res.successful_emails;
          }
          this.success_msg = "Invitations sent!";
          this.emails = [];
          this.users = [];
          this.sentEmails = [];
          this.user_email = null;
        } else {
          this.showError(res.message);
        }
      } else {
        this.showError("No users invited.");
      }
    },
    async searchUser() {
      this.errors = [];
      this.success_msg = null;
      if (this.user_email) {
        let email = this.user_email.trim();
        let url = `/api/user/email/${email}/`,
          res,
          unique = true;
        this.users.forEach(user => {
          if (user.email == email) {
            unique = false;
          }
        });
        if (unique) {
          res = await this.getReq({
            url
          });
          if (res.success == true) {
            if (isNullOrUndefined(res.user.team)) {
              this.emails.push(res.user.email);
              this.users.push({
                _id: res.user._id,
                display_name: res.user.display_name,
                email: res.user.email
              });
            } else {
              this.showError("User already in a team.");
            }
          } else {
            this.showError("User not found.");
          }
        } else {
          this.showError("Already in queue.");
        }
      } else {
        this.showError("Enter a email.");
      }
      this.user_email = null;
    },
    showError(msg) {
      this.showDismissableAlert = true;
      this.errors.push(msg);
    },
    removeUser(id) {
      this.emails.splice(id, 1);
      this.users.splice(id, 1);
    },
    onReset() {
      this.users = [];
      this.showDismissableAlert = false;
      this.success_msg = null;
      this.errors = [];
      this.emails = [];
      this.user_email = null;
      this.sentEmails = [];
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
  computed: {
    ...mapGetters(["currentUser", "isAdmin"]),
  },
  async asyncData({
    params,
    $axios
  }) {
    let res = await $axios({
      url: `/api/team/${params.id}/mini`
    })
    if (res.success) {
      return {
        params,
        team: res.team,
        loaded: true
      }
    }
    return {
      params,
      team: {},
      loaded: true
    };
  },
  mounted() {},
  watch: {}
};
</script>

<style lang="scss">
.border-none {
  border: none;
}
</style>
