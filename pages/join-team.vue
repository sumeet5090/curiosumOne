<template>
<section class="section custom-gradient">
  <no-ssr>
    <div class="container">
      <div class="row justify-content-center">
        <card class="col-md-10 px-0 curiosum-gradient">
          <div class="container px-0">
            <div class="row justify-content-center mx-0">
              <div class="col-md-12 px-0">
                <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
                  <b-form-group class="mb-3" id="form-teamname" label-for="form-teamname--input" description="Choose an unique name which describes your team.">
                    <base-input addon-left-icon id="form-teamname--input" type="text" v-model="teamForm.team_name" required placeholder="Enter team name"></base-input>
                  </b-form-group>
                  <!-- <b-form-group id="form-teamname" label-for="form-teamname--input" description="Choose an unique name which describes your team.">
                    <base-input addon-left-icon id="form-teamname--input" type="text" v-model="teamForm.team_name" required placeholder="Enter team name"></base-input>
                  </b-form-group> -->
                  <b-button type="submit" variant="primary">Create</b-button>
                  <b-button type="reset" variant="danger">Reset</b-button>
                </b-form>
              </div>
            </div>
          </div>
        </card>
      </div>
    </div>
  </no-ssr>
</section>
</template>

<script>
export default {
  data() {
    return {
      teamForm: {

      }
    }
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss">
.curiosum-gradient {
  background: linear-gradient(55deg, #fff -15%, #d1d1d1 30%, #c1c1c1 50%, #d1d1d1 70%, #fff 115%);
}
.input-group {
  input {
    &, &:focus {
      &::placeholder {
        color: #4B2722;
      }
      background: none;
      border: 2px solid #4B2722;
    }
  }
}
.b-form-group {
  .form-text { 
    color: #4B2722 !important;
  }
  margin-bottom: 1rem;
}
</style>
