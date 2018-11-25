<template>
<div>
  <no-ssr>
    <section class="section">
      <b-container>
        <b-row class="justify-content-center">
          <card class="col-md-8">
            <b-form @submit.prevent @reset.prevent="onReset">
              <b-form-group id="form-event" label="Event:" label-for="form-event--input" description="Select an event">
                <b-form-select id="form-event--input" required v-model="selectedEvent" class="mb-3 text-dark">
                  <option :value="null">Select an event</option>
                  <option :value="ev._id" v-for="ev in events" :key="ev._id">{{ev.name}}</option>
                </b-form-select>
              </b-form-group>
              <b-form-group id="form-team" label="Team:" label-for="form-team--input" description="Select a team">
                <b-form-select id="form-team--input" required v-model="selectedTeam" class="mb-3 text-dark">
                  <option :value="null">Select a team</option>
                  <option :value="tm._id" v-for="tm in teams" :key="tm._id">{{tm.team_name}}</option>
                </b-form-select>
              </b-form-group>
              <b-form-group>
                <div class="container">
                  <span class="row align-items-center">
                    <base-switch class="mb-1" id="form-accumulator" v-model="form.accumulator"></base-switch>
                  <label class="ml-2 h6" for="form-accumulator">Accumulator</label>
                  </span>
                </div>
                <div class="container">
                  <span class="row align-items-center">
                    <base-switch class="mb-1" id="form-scrutineering_elec" v-model="form.scrutineering_elec"></base-switch>
                  <label class="ml-2 h6" for="form-scrutineering_elec">Scrutineering Electric</label>
                  </span>
                </div>
                <div class="container">
                  <span class="row align-items-center">
                    <base-switch class="mb-1" id="form-scrutineering_mech" v-model="form.scrutineering_mech"></base-switch>
                  <label class="ml-2 h6" for="form-scrutineering_mech">Scrutineering Mechanical</label>
                  </span>
                </div>
                <div class="container">
                  <span class="row align-items-center">
                    <base-switch class="mb-1" id="form-driver_egress" v-model="form.driver_egress"></base-switch>
                  <label class="ml-2 h6" for="form-driver_egress">Driver Egress</label>
                  </span>
                </div>
                <div class="container">
                  <span class="row align-items-center">
                    <base-switch class="mb-1" id="form-tilt" v-model="form.tilt"></base-switch>
                  <label class="ml-2 h6" for="form-tilt">Tilt</label>
                  </span>
                </div>
                <div class="container">
                  <span class="row align-items-center">
                    <base-switch class="mb-1" id="form-noise_ready_to_drive_sound" v-model="form.noise_ready_to_drive_sound"></base-switch>
                  <label class="ml-2 h6" for="form-noise_ready_to_drive_sound">Noise ready to drive sound</label>
                  </span>
                </div>
                <div class="container">
                  <span class="row align-items-center">
                    <base-switch class="mb-1" id="form-brakes" v-model="form.brakes"></base-switch>
                  <label class="ml-2 h6" for="form-brakes">Brakes</label>
                  </span>
                </div>
                <div class="container">
                  <span class="row align-items-center">
                    <base-switch class="mb-1" id="form-rain" v-model="form.rain"></base-switch>
                  <label class="ml-2 h6" for="form-rain">Rain</label>
                  </span>
                </div>
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
        </b-row>
      </b-container>
    </section>
  </no-ssr>
</div>
</template>

<script>
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import {
  mapActions,
  mapGetters
} from "vuex";
export default {
  components: {
    flatpickr: flatPicker
  },
  data() {
    return {
      selectedEvent: null,
      selectedTeam: null,
      showDismissableAlert: false,
      form: {
        accumulator: false,
        scrutineering_elec: false,
        scrutineering_mech: false,
        driver_egress: false,
        tilt: false,
        noise_ready_to_drive_sound: false,
        brakes: false,
        rain: false
      },
      success_msg: "",
      errors: []
    };
  },
  computed: {
    ...mapGetters(["currentUser", "isAdmin", "events", "teams"])
  },
  methods: {
    ...mapActions(["postReq", "getEvents", "getTeamsForEvent"]),
    async onSubmit() {
      try {
        this.success_msg = null;
        this.errors = [];
        let url = `/api/event/${this.selectedEvent}/create/${this.selectedTeam}/techupdate`;
        if (this.validatedInputs()) {
          let res = await this.postReq({
            url: url,
            body: {
              accumulator: this.form.accumulator,
              scrutineering_elec: this.form.scrutineering_elec,
              scrutineering_mech: this.form.scrutineering_mech,
              driver_egress: this.form.driver_egress,
              tilt: this.form.tilt,
              noise_ready_to_drive_sound: this.form.noise_ready_to_drive_sound,
              brakes: this.form.brakes,
              rain: this.form.rain
            }
          });
          if (res.success) {
            this.success_msg = res.message;
            this.onReset()
          } else {
            this.showError(res.message);
            this.onReset()
          }
        } else {
          this.showError("Enter all fields.");
        }
      } catch (error) {
        console.log(error);
        this.showError("Couldn't reach server. Try again later.");
      }
    },
    validatedInputs() {
      if (
        this.selectedEvent &&
        this.selectedTeam
      ) {
        return true;
      }
      return false;
    },
    showError(msg) {
      this.showDismissableAlert = true;
      this.errors.push(msg);
    },
    onReset() {
      this.errors = [];
      this.selectedEvent = null;
      this.selectedTeam = null;
      this.form.accumulator = false;
      this.form.scrutineering_elec = false;
      this.form.scrutineering_mech = false;
      this.form.driver_egress = false;
      this.form.tilt = false;
      this.form.noise_ready_to_drive_sound = false;
      this.form.brakes = false;
      this.form.rain = false;
      this.$store.commit("SET_TEAMS", []);
    }
  },
  watch: {
    selectedEvent: function () {
      if (this.selectedEvent != null) {
        return this.getTeamsForEvent(this.selectedEvent);
      }
      this.selectedTeam = null;
    },
    errors: function (val) {
      this.showDismissableAlert = true;
      this.errors = val;
    }
  },
  beforeMount() {
    this.getEvents();
  }
};
</script>

<style lang="scss">
</style>
