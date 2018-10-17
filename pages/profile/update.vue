<template>
<div class="custom-gradient">
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
                        <b-form-group id="form-bio" label="Bio:" label-for="form-bio--input" description="Talk about yourself.">
                            <b-form-textarea id="form-bio--input" type="text" v-model="form.bio" required placeholder="Bio">
                            </b-form-textarea>
                        </b-form-group>
                        <b-button type="submit" variant="primary">Update</b-button>
                        <b-button type="reset" variant="danger">Reset</b-button>
                    </b-form>
                </card>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        display_name: "",
        bio: "",
        phone_number: ""
      }
    };
  },
  methods: {
    onSubmit() {
      alert(JSON.stringify(this.form));
    },
    onReset() {
        this.loadFormData()
    },
    loadFormData() {
      this.form.bio = this.currentUser.bio || ""
      this.form.phone_number = this.currentUser.phone_number || ""
      this.form.display_name = this.currentUser.display_name || ""
    }
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  mounted() {
    this.$nextTick(function() {
      this.loadFormData();
    });
  }
};
</script>
