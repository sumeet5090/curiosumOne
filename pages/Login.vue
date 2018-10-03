<template>
    <section class="section section-shaped section-lg my-0">
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0">
                        <template>
                            <div class="text-center mb-5">
                                <strong>Login</strong>
                            </div>
                        </template>
                        <template>
                            <form role="form">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="user@domain.com"
                                            addon-left-icon="ni ni-email-83"
                                            v-model="fields.email"
                                            >
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            placeholder="Password"
                                            addon-left-icon="ni ni-lock-circle-open"
                                            v-model="fields.password"
                                            >
                                </base-input>
                                <base-checkbox class="text-center" v-model="fields.remember">
                                    Remember me
                                </base-checkbox>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click.prevent="handleSignIn">Sign In</base-button>
                                </div>
                            </form>
                        </template>
                        <div class="row mt-3">
                            <div class="col-6">
                                <a href="#" class="text-light">
                                    <small>Forgot password?</small>
                                </a>
                            </div>
                            <div class="col-6 text-right">
                                <a href="#" class="text-light">
                                    <small>Create new account</small>
                                </a>
                            </div>
                        </div>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import store from "./../store";
import axios from "axios";
let defaultFields = {
  email: "",
  password: "",
  remember: false
};
export default {
  data() {
    return {
      fields: {
        ...defaultFields
      }
    };
  },
  methods: {
    async handleSignIn() {
      postData = {
        email: fields.email,
        password: fields.password,
        remember: fields.remember
      };
      try {
        let response = await axios.post("/user/login", postData);
        // Save generated token in local storage
        let token = response.data.token;
        localStorage.setItem("token", "Bearer" + token);
        // Router push to dashboard
        // With user signed in.
      } catch (error) {
        // Some error occured?!
        console.log(error);
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  }
};
</script>
<style>
</style>
