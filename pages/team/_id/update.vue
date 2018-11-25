<template>
<section class="section section-hero">
  <no-ssr>
    <b-container v-if="accessControl('user') && accessControl('adminOrTeamCaptain')">
      <b-row>
        <div class="col-sm-12 col-md-10">
          <card>
            <b-form @submit.prevent @reset="onReset">
              <b-form-group id="form-teamname" label="Team Name:" label-for="form-teamname--input">
                <base-input id="form-teamname--input" type="text" required placeholder="Enter team name" v-model="form.team_name">
                </base-input>
              </b-form-group>
              <b-form-group id="form-website-url" label="Social:">
                <base-input type="text" required placeholder="Enter Website URL" v-model="form.website_url" addon-left-icon="fa fa-link text-dark">
                </base-input>
                <base-input type="text" required placeholder="Enter Facebook URL" v-model="form.social.facebook" addon-left-icon="fab fa-facebook facebook-icon">
                </base-input>
                <base-input type="text" required placeholder="Enter Instagram URL" v-model="form.social.instagram" addon-left-icon="fab fa-instagram text-danger">
                </base-input>
                <base-input type="text" required placeholder="Enter Twitter URL" v-model="form.social.twitter" addon-left-icon="fab fa-twitter twitter-icon">
                </base-input>
              </b-form-group>
              <b-form-group id="form-bio" label="Bio: " label-for="form-bio--input">
                <b-form-textarea id="form-bio--input" type="text" no-resize required placeholder="Enter bio" v-model="form.bio" :rows="2" :max-rows="4">
                </b-form-textarea>
              </b-form-group>
              <b-form-group id="form-logo-url" label="Logo URL:" label-for="form-logo-url--input">
                <base-input id="form-logo-url--input" type="link" required placeholder="Enter URL for logo" v-model="form.logo" addon-left-icon="fas fa-image text-dark">
                </base-input>
              </b-form-group>
              <b-form-group id="form-drive_folder-url" label="Drive folder URL:" label-for="form-drive_folder-url--input" v-if="accessControl('admin')">
                <base-input id="form-logo-url--input" type="link" required placeholder="Enter URL for drive folder" v-model="form.drive_folder" addon-left-icon="fab fa-google-drive text-dark">
                </base-input>
              </b-form-group>
              <b-alert variant="danger" dismissible v-if="errors.length > 0" :show="showDismissableAlert" @dismissed="showDismissableAlert=false">
                <div v-for="error in errors" :key="error">{{error}}</div>
              </b-alert>
              <b-alert variant="success" :show="!!success_msg">
                <div>{{success_msg}}</div>
              </b-alert>
              <b-button type="submit" variant="primary" @click.prevent="onSubmit">Update</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
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
        social: {},
        logo: null,
        bio: null,
      },
      loaded: false
    };
  },
  computed: {
    ...mapGetters(["isAdmin", "currentUser"])
  },
  methods: {
    ...mapActions(["getReq", "postReq", "putReq"]),
    async onSubmit() {
      this.success_msg = null;
      this.errors = [];
      let res = await this.putReq({
        url: `/api/team/${this.params.id}`,
        body: {
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
          url: `/api/team/${this.params.id}/mini`
        });
        if (res.success) {
          this.team = res.team;
          this.form = {
            ...res.team
          };
        } else {
          this.showError(res.message);
        }
        this.loaded = true
      } catch (error) {
        console.log(error);
        this.showError("Internal server error.");
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
    } catch (error) {}
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
  &:focus {
    color: black;
  }
}
</style>
