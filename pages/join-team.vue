<template>
  <section class="section custom-gradient">
    <no-ssr>
      <div class="container">
        <div class="row justify-content-center">
          <card class="col-md-4 px-0 curiosum-gradient">
            <b-form @reset.prevent="onReset" @submit.prevent="onSubmit" class="form-join-team">
              <b-form-row class="mb-3">
                <div class="col-12 text-center">
                  <i class="fas fa-users text-dark" style="font-size: 85px;"></i>
                </div>
              </b-form-row>
              <b-form-row class="mb-3" style="min-height: 64px;">
                <div class="col-12 text-center">
                  <span>Create a new team and invite team members.</span>
                </div>
              </b-form-row>
              <b-form-group class="mb-3" id="form-join" label-for="form-join--input">
                <base-button class="col-12" id="form-join--input" type="curiosum">Create new team</base-button>
              </b-form-group>
            </b-form>
          </card>
          <card class="col-md-4 px-0 curiosum-gradient">
            <b-form @reset.prevent="onReset" @submit.prevent="onSubmit" class="form-join-team">
              <b-form-row class="mb-3">
                <div class="col-12 text-center">
                  <i class="fas fa-user-plus text-dark" style="font-size: 85px;"></i>
                </div>
              </b-form-row>
              <b-form-row class="mb-3" style="min-height: 64px;">
                <div class="col-12 text-center">
                  <span>Enter an invite link and join a team.</span>
                </div>
              </b-form-row>
              <b-form-group class="mb-3" id="form-join" label-for="form-join--input">
                <base-button @click="modalShow = true" class="col-12" id="form-join--input" type="curiosum-dark">Join</base-button>
              </b-form-group>
            </b-form>
          </card>
          <b-modal centered hide-footer title="Join a team" v-model="modalShow">
            <div class="container">
              <div class="row mx-0 justify-content-center">
                <div class="col-md-12">
                  <b-form-group class="b-form-group-curiosum mb-3" description="Paste an invite link here." id="form-invite" label-for="form-invite--input">
                    <base-input addon-left-icon id="form-invite--input" required type="text" v-model="inviteLink"></base-input>
                  </b-form-group>
                  <b-form-group class="mb-3" id="form-join" label-for="form-join--input">
                    <base-button class="col-12" id="form-join--input" type="curiosum">Join</base-button>
                  </b-form-group>
                </div>
              </div>
            </div>
          </b-modal>
        </div>
      </div>
    </no-ssr>
  </section>
</template>

<script>
export default {
  data() {
    return {
      inviteLink: "",
      modalShow: false
    };
  },
  computed: {
    isJoin() {
      return this.inviteLink !== "";
    }
  },
  methods: {}
};
</script>

<style lang="scss">
.b-form-group-curiosum {
  input[type="text"] {
    &,
    &:focus {
      &::placeholder {
        color: #4b2722aa;
      }
      background: none;
      border: 2px solid #4b2722;
      color: #4b2722;
    }
  }
  .form-group.input-group {
    margin-bottom: 0;
  }
  .form-text {
    color: #4b2722 !important;
  }
  margin-bottom: 1rem;
}
</style>
