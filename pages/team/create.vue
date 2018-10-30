<template>
<div class="custom-gradient">
    <no-ssr>
        <section class="section section-hero">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <card>
                        <b-form @submit="onSubmit" @reset="onReset">
                            <b-form-group id="form-displayname" label="Display Name:" label-for="form-displayname--input" description="We'll never share your email with anyone else.">
                                <b-form-input id="form-displayname--input" type="text" v-model="form.display_name" required placeholder="Enter email">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group id="form-phonenumber" label="Phone number:" label-for="form-phonenumber--input" description="We'll never share your phone number with anyone else.">
                                <b-form-input id="form-phonenumber--input" type="text" v-model="form.phone_number" required placeholder="Phone number">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group id="form-picture-url" label="Profile picture:" label-for="form-picture-url--input" description="Link to a new profile picture.">
                                <b-form-input id="form-picture-url--input" type="link" v-model="form.link_to_logo" required placeholder="https://example.website.com/images/demo.jpg">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group id="form-bio" label="Bio:" label-for="form-bio--input" description="Talk about yourself.">
                                <b-form-textarea id="form-bio--input" type="text" v-model="form.bio" required placeholder="Bio" :rows="4" :max-rows="6" :min-rows="3">
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
      teamForm: {
        name: '',
        location: '',
        bio: '',
        logo_url: '',
        users: [''],
        captain_id: '',
      }
    };
  },
  methods: {
    onSubmit(){

    },
    onReset(){

    }
  }
};
</script>

<style lang="scss">
</style>
