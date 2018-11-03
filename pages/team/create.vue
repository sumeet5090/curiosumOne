<template>
<div class="custom-gradient">
    <no-ssr>
        <section class="section section-hero">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <card>
                        <b-form @submit="onSubmit" @reset="onReset">
                            <b-form-group id="form-teamname" label="Team name:" label-for="form-teamname--input" description="Choose an unique name which describes your team.">
                                <base-input addon-left-icon="" id="form-teamname--input" type="text" v-model="teamForm.team_name" required placeholder="Enter team name">
                                </base-input>
                            </b-form-group>
                            <b-form-group id="form-category" label="Category:" label-for="form-category--input" description="Select a category">
                                <b-form-select required v-model="teamForm.category" :options="options" class="mb-3">
                                </b-form-select>
                            </b-form-group>
                            <b-form-group id="form-carnumber" label="Car Number:" label-for="form-carnumber--input">
                                <base-input addon-left-icon="fa fa-hashtag" id="form-carnumber--input" type="number" min="0" v-model="teamForm.car_number" required placeholder="Enter car number">
                                </base-input>
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
                            <b-button type="submit" variant="primary">Update</b-button>
                            <b-button type="reset" variant="danger">Reset</b-button>
                        </b-form>
                    </card>
                </div>
            </div>
        </section>
    </no-ssr>
</div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { value: "combustion", text: "Combustion" },
        { value: "electric", text: "Electric" },
        {value: null, text: "Select a category"}
      ],
      teamForm: {
        category: null,
        car_number: '',
        name: "",
        location: "",
        bio: "",
        logo_url: "",
        users: [""],
        captain_id: "",
        institution: {
            name: '',
            address: '',
            short_name: '',
        }
      }
    };
  },
  methods: {
    onSubmit() {},
    onReset() {}
  }
};
</script>

<style lang="scss">
</style>
