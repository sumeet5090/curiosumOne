<template>
<section class="section custom-gradient">
  <b-container>
    <b-row class="justify-content-center">
      <div class="col-md-8" v-if="isAdmin">
        <card>
          <b-form @submit.prevent @reset.prevent="onReset">
            <b-form-group id="form-day-number" label="Day Number:" label-for="form-day-number--input">
              <b-form-input class="text-dark" id="form-day-number--input" type="number" min="1" v-model="day_number" required placeholder="Enter day number"></b-form-input>
            </b-form-group>
            <b-form-group id="form-day-number" label="Day:" label-for="form-day--input">
              <b-form-input class="text-dark" id="form-day--input" type="text" min="1" v-model="day" required placeholder="Enter day"></b-form-input>
            </b-form-group>
            <b-form-group id="form-date" label="Date:" label-for="form-date--input">
              <base-input id="form-date--input" addon-left-icon="fa fa-calendar">
                <flatpickr slot-scope="{focus, blur}" @on-open="focus" @on-close="blur" :config="{altInput: true, dateFormat: 'Z', altFormat: 'J F Y' }" class="form-control text-dark datepicker" v-model="date"></flatpickr>
              </base-input>
            </b-form-group>
            <b-form-group id="form-activity-number" label="Activity:" label-for="form-activity--input">
              <b-form-input class="text-dark" id="form-activity--input" type="text" min="1" v-model="activity" required placeholder="Enter activity"></b-form-input>
            </b-form-group>
            <b-form-group id="form-start_time" label="Start Time:" label-for="form-start_time--input">
              <base-input id="form-start_time--input" addon-left-icon="far fa-clock">
                <flatpickr slot-scope="{focus, blur}" @on-open="focus" @on-close="blur" :config="{noCalendar: true, defaultDate: date, enableTime: true, altInput: true, dateFormat: 'h:i K', altFormat: 'h:i K' }" class="form-control text-dark datepicker" v-model="start_time"></flatpickr>
              </base-input>
            </b-form-group>
            <b-form-group id="form-end_time" label="End Time:" label-for="form-end_time--input">
              <base-input id="form-end_time--input" addon-left-icon="far fa-clock">
                <flatpickr slot-scope="{focus, blur}" @on-open="focus" @on-close="blur" :config="{noCalendar: true, defaultDate: date, enableTime: true, altInput: true, dateFormat: 'h:i K', altFormat: 'h:i K' }" class="form-control text-dark datepicker" v-model="end_time"></flatpickr>
              </base-input>
            </b-form-group>
            <b-form-group id="form-comments-number" label="Comments:" label-for="form-comments--input">
              <b-form-input class="text-dark" id="form-comments--input" type="text" min="1" v-model="comments" required placeholder="Enter comment"></b-form-input>
            </b-form-group>
            <b-form-group id="form-location-number" label="Location:" label-for="form-location--input">
              <b-form-input class="text-dark" id="form-location--input" type="text" min="1" v-model="location" required placeholder="Enter location"></b-form-input>
            </b-form-group>
            <b-form-group>
              <div class="container">
                <span class="row align-items-center">
                  <base-switch class="" v-model="view.visitor"></base-switch>
                  <span class="ml-2">Visitor</span>
                </span>
              </div>
            </b-form-group>
            <b-form-group>
              <div class="container">
                <span class="row align-items-center">
              <base-switch class="mb-1" v-model="view.participant"></base-switch>
                  <span class="ml-2">Participant</span>
                </span>
              </div>
            </b-form-group>
            <b-form-group>
              <div class="container">
                <span class="row align-items-center">
              <base-switch class="mb-1" v-model="view.volunteer"></base-switch>
                  <span class="ml-2">Volunteer</span>
                </span>
              </div>
            </b-form-group>

            <b-alert variant="danger" dismissible :show="errors.length > 0" @dismissed="showDismissibleAlert=false">
              <div v-for="error in errors" :key="error">{{error}}</div>
            </b-alert>
            <b-alert variant="success" :show="!!success_msg">
              <div>{{success_msg}}</div>
            </b-alert>
            <b-button type="submit" variant="success" @click.prevent="onSubmit">Update</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </card>
      </div>
      <div class="col-md-8" v-else>
        <card>
          <p class="text-center display-3 text-warning text-uppercase ">Access denied</p>
        </card>
      </div>
    </b-row>
  </b-container>
</section>
</template>

<script>
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    flatpickr: flatPicker
  },
  data() {
    return {
      day_number: null,
      day: null,
      date: null,
      activity: null,
      start_time: "8:00 AM",
      end_time: "5:00 PM",
      location: null,
      comments: null,
      view: {
        volunteer: false,
        participant: false,
        visitor: true
      },
      view_options: [
        {
          value: "volunteer",
          label: "Volunteer"
        },
        {
          value: "participant",
          label: "Participant"
        },
        {
          value: "visitor",
          label: "Visitor"
        }
      ],
      selected_view: [],
      success_msg: null,
      errors: []
    };
  },
  methods: {
    ...mapActions(["postReq"]),
    async onSubmit() {
      this.errors = [];
      this.success_msg = null;
      if (
        !this.day ||
        !this.day_number ||
        !this.date ||
        !this.activity ||
        !this.start_time ||
        !this.end_time ||
        !this.location ||
        !this.comments
      ) {
        this.errors.push("Please enter all required fields.");
      }
      if (this.errors.length == 0) {
        try {
          let id = this.$route.params.id.toString();
          let url = `/api/event/${id}/create/schedule`;
          console.log(url);
          let res = await this.postReq({
            url: url,
            body: {
              day_number: this.day_number,
              day: this.day,
              date: this.date,
              activity: this.activity,
              start_time: this.start_time,
              end_time: this.end_time,
              location: this.location,
              comments: this.comments,
              volunteer_view: this.volunteer_view,
              visitor_view: this.visitor_view,
              participant_view: this.participant_view
            }
          });
          if (res.success) {
            this.onReset();
            return (this.success_msg = res.message);
          }
          this.errors.push(res.message);
        } catch (err) {
          console.log(err);
          this.errors.push(err);
        }
      }
    },
    onReset() {
      this.day = null;
      this.day_number = null;
      this.date = null;
      this.activity = null;
      this.start_time = "8:00 AM";
      this.end_time = "5:00 PM";
      this.location = null;
      this.comments = null;
      this.view.volunteer = false;
      this.view.visitor = true;
      this.view.participant = false;
    }
  },
  computed: {
    ...mapGetters(["currentUser", "isAdmin"])
  }
};
</script>

<style lang="scss">
</style>
