<template>
<section class="section custom-gradient">
  <no-ssr>
    <div v-if="showPage">
      <error-page icon="fas fa-exclamation-triangle" color="danger" heading="Error" :size="5" message="Already in team" v-if="!!currentUser.team" />
      <div v-else class="container">
        <div class="row justify-content-center">
          <card class="col-sm-10 col-md-8 col-lg-6" v-if="!currentUser.team">
            <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
              <b-form-group id="form-teamname" label="Team name:" label-for="form-teamname--input" description="Choose an unique name which describes your team.">
                <base-input addon-left-icon id="form-teamname--input" type="text" v-model="teamForm.team_name" required placeholder="Enter team name"></base-input>
              </b-form-group>
              <b-form-group id="form-category" label="Category:" label-for="form-category--input" description="Select a category">
                <b-form-select required v-model="teamForm.category" :options="options" class="mb-3"></b-form-select>
              </b-form-group>
              <b-form-group id="form-institutionname" label="Institution Details:" label-for="form-institutionname--input" description="Enter your institution details.">
                <base-input id="form-institutionname--input" type="text" v-model="teamForm.institution.name" required placeholder="Enter institution name."></base-input>
                <base-input id="form-institutionname--input" type="text" v-model="teamForm.institution.address" required placeholder="Enter institution address."></base-input>
                <base-input id="form-institutionname--input" type="text" v-model="teamForm.institution.short_name" required placeholder="Enter institution short name."></base-input>
              </b-form-group>
              <b-form-group id="form-phonenumber" label="Location:" label-for="form-location--input" description="Where are you from?">
                <base-input id="form-location--input" type="text" v-model="teamForm.location" required placeholder="State"></base-input>
                <base-input id="form-country--input" type="text" v-model="teamForm.country" required placeholder="Country"></base-input>
              </b-form-group>
              <b-form-group id="form-picture-url" label="Team logo:" label-for="form-picture-url--input" description="Link to the team profile picture.">
                <base-input id="form-picture-url--input" type="link" v-model="teamForm.logo_url" required placeholder="https://example.website.com/images/demo.jpg"></base-input>
              </b-form-group>
              <b-form-group id="form-social-links" label="Social Media" label-for="form-social-links--input" description="Links to your teams social media">
                <base-input addon-left-icon="fa fa-link text-dark" placeholder="https://examplewebsite.com" v-model="teamForm.website_url"></base-input>
                <base-input addon-left-icon="fab fa-facebook-f" placeholder="https://facebook.com/example" v-model="teamForm.social.facebook"></base-input>
                <base-input addon-left-icon="fab fa-instagram text-danger" placeholder="https://instagram.com/example" v-model="teamForm.social.instagram"></base-input>
                <base-input addon-left-icon="fab fa-twitter" placeholder="https://twitter.com/example" v-model="teamForm.social.twitter"></base-input>
              </b-form-group>
              <b-form-group id="form-bio" label="Bio:" label-for="form-bio--input" description="Talk about yourself.">
                <b-form-textarea id="form-bio--input" type="text" v-model="teamForm.bio" required placeholder="Bio" :rows="4" :max-rows="6" :min-rows="3"></b-form-textarea>
              </b-form-group>
              <b-form-group id="form-members" label="Members:" label-for="form-members--input" description="Search email and press enter.">
                <b-row class="justify-content-center align-items-center">
                  <b-col md="10" sm="12">
                    <b-input type="text" v-model="user_email"></b-input>
                  </b-col>
                  <b-col md="2" sm="12" class="text-center">
                    <b-button size class="my-1" variant="success" @click="searchUser">
                      <i class="fa fa-search"></i>
                    </b-button>
                  </b-col>
                </b-row>
                <card no-body>
                  <b-row class="justify-content-start p-3">
                    <b-col md="4" sm="6" lg="4" v-for="user in users" :key="user._id">
                      <badge type="secondary">{{user.display_name}}</badge>
                    </b-col>
                  </b-row>
                </card>
              </b-form-group>
              <b-button type="submit" variant="primary">Create</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
          </card>
        </div>
      </div>
    </div>
    <div v-else>
      
    </div>
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
    return {
      dat: [],
      error: [],
      user: "",
      users: [],
      user_email: "",
      options: [{
          value: "combustion",
          text: "Combustion"
        },
        {
          value: "electric",
          text: "Electric"
        },
        {
          value: null,
          text: "Select a category"
        }
      ],
      teamForm: {
        category: null,
        user_emails: [],
        car_number: null,
        team_name: null,
        location: null,
        country: null,
        bio: null,
        logo_url: null,
        institution: {
          name: "",
          address: "",
          short_name: ""
        },
        social: {
          facebook: null,
          twitter: null,
          instagram: null
        },
        website_url: null
      },
      user_ids: []
    };
  },
  methods: {
    ...mapActions(["getReq", "postReq"]),
    onSubmit() {
      this.postReq({
        url: "/api/team/create",
        body: {
          category: this.teamForm.category,
          team_name: this.teamForm.team_name,
          team_bio: this.teamForm.bio,
          institution: this.teamForm.institution,
          website_url: this.teamForm.website_url,
          location: this.teamForm.location,
          country: this.teamForm.country,
          social: this.teamForm.social,
          user_ids: this.user_ids,
          user_emails: this.teamForm.user_emails,
          logo_url: this.logo_url
        }
      });
      // Add tea, to database
      // Send out team invites to each email
      this.$router.go(this.$route.name)
    },
    onReset() {
      this.$router.go(this.$route.name)
    },
    async searchUser() {
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
          if (typeof res.user.team == "undefined") {
            this.users.push(res.user);
            this.teamForm.user_emails.push(res.user.email);
            this.user_ids.push(res.user._id);
          } else {
            // Flash error (User already in a team)
          }
        } else {
          // Flash error user not found bhpndrsingh306@gmail.com
        }
      }
      this.user_email = "";
    }
  },
  computed: {
    ...mapGetters(["currentUser"]),
    showPage() {
      return !!this.currentUser ? true : false;
    }
  },
  beforeMount() {
    if(this.currentUser){
      if(!this.currentUser.team){
        console.log("me has no team");
      } else {
        this.$router.replace({name: "team"})
      }
    } else {
      window.location.href = "/login"
    }
  },
  watch: {}
};
</script>

<style lang="scss">
</style>
