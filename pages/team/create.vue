<template>
<section class="section custom-gradient">
    <no-ssr>
        <div class="container">
            <div class="row justify-content-center">
            <card class="col-sm-10 col-md-8 col-lg-6">
                <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
                    <b-form-group id="form-teamname" label="Team name:" label-for="form-teamname--input" description="Choose an unique name which describes your team.">
                        <base-input addon-left-icon="" id="form-teamname--input" type="text" v-model="teamForm.team_name" required placeholder="Enter team name">
                        </base-input>
                    </b-form-group>
                    <b-form-group id="form-category" label="Category:" label-for="form-category--input" description="Select a category">
                        <b-form-select required v-model="teamForm.category" :options="options" class="mb-3">
                        </b-form-select>
                    </b-form-group>
                    <b-form-group id="form-institutionname" label="Institution Details:" label-for="form-institutionname--input" description="Enter your institution details.">
                        <base-input id="form-institutionname--input" type="text" v-model="teamForm.institution.name" required placeholder="Enter institution name.">
                        </base-input>
                        <base-input id="form-institutionname--input" type="text" v-model="teamForm.institution.address" required placeholder="Enter institution address.">
                        </base-input>
                        <base-input id="form-institutionname--input" type="text" v-model="teamForm.institution.short_name" required placeholder="Enter institution short name.">
                        </base-input>
                    </b-form-group>
                    <b-form-group id="form-phonenumber" label="Phone number:" label-for="form-phonenumber--input" description="We'll never share your phone number with anyone else.">
                        <base-input id="form-phonenumber--input" type="text" v-model="teamForm.location" required placeholder="Phone number">
                        </base-input>
                    </b-form-group>
                    <b-form-group id="form-picture-url" label="Team logo:" label-for="form-picture-url--input" description="Link to the team profile picture.">
                        <base-input id="form-picture-url--input" type="link" v-model="teamForm.logo_url" required placeholder="https://example.website.com/images/demo.jpg">
                        </base-input>
                    </b-form-group>
                    <b-form-group id="form-bio" label="Bio:" label-for="form-bio--input" description="Talk about yourself.">
                        <b-form-textarea id="form-bio--input" type="text" v-model="teamForm.bio" required placeholder="Bio" :rows="4" :max-rows="6" :min-rows="3">
                        </b-form-textarea>
                    </b-form-group>
                    <b-form-group id="form-members" label="Members:" label-for="form-members--input" description="Search email and press enter.">
                        <b-row class="justify-content-center align-items-center">
                            <b-col md="10" sm="12">
                                <b-input type="text" v-model="user_email"></b-input>
                            </b-col>
                            <b-col md="2" sm="12" class="text-center">
                                <b-button size="" class="my-1" variant="success" @click="searchUser">
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
    </no-ssr>
</section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dat: [],
      error: [],
      user: "",
      users: [],
      user_email: "",
      options: [
        {
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
        car_number: "",
        name: "",
        location: "",
        bio: "",
        logo_url: "",
        users: [],
        captain_id: "",
        institution: {
          name: "",
          address: "",
          short_name: ""
        }
      }
    };
  },
  methods: {
    ...mapActions(["getReq", 'postReq']),
    onSubmit() {
        this.postReq({})
        // Add tea, to database
        // Send out team invites to each email
    },
    onReset() {},
    async searchUser() {
    let email = (this.user_email).trim()
      let url = `/api/user/email/${email}/`,
        res,
        unique = true;
      this.users.forEach(user => {
        if (user.email == email) {
          unique = false;
        }
      });
      if (unique) {
        res = await this.getReq({ url });
        if (res.success == true) {
            this.teamForm.user_emails.push(res.user.email)
          this.users.push(res.user);
        } else {
        }
      }
      this.user_email = "";
    }
  },
  mounted() {},
  watch: {}
};
</script>

<style lang="scss">
</style>
