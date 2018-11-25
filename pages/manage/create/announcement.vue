<template>
<div>
  <no-ssr>
    <section class="section">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <card>
            <b-form @submit.prevent @reset.prevent="onReset">
              <b-form-group id="form-input-role" label="Event:" label-for="form-input-role--input">
                <b-form-select id="form-input-role--input" required v-model="form.event_id" :options="events" class="mb-3 text-dark"></b-form-select>
              </b-form-group>
              <b-form-group id="form-title" label="Title:" label-for="form-title--input">
                <b-form-input id="form-title--input" type="text" v-model="form.title" placeholder="Enter announcement title."></b-form-input>
              </b-form-group>
              <b-form-group id="form-start-date" label="Date:" label-for="form-start-date--input">
                <base-input id="form-start-date--input" addon-left-icon="fa fa-calendar">
                  <flatpickr slot-scope="{focus, blur}" @on-open="focus" @on-close="blur" :config="{altInput: true, dateFormat: 'Z', altFormat: 'J F Y h:i K', enableTime: true   }" class="form-control text-dark datepicker" v-model="form.date_time"></flatpickr>
                </base-input>
              </b-form-group>
              <b-form-group id="form-author" label="Author:" label-for="form-author--input">
                <b-form-input id="form-author--input" type="text" v-model="currentUser.display_name" placeholder="" disabled></b-form-input>
              </b-form-group>
              <b-form-group id="form-description" label="Description:" label-for="form-description--input" description="Describe the announcement.">
                <b-form-textarea id="form-description--input" no-resize :rows="4" :max-rows="6" v-model="form.description" placeholder="Enter some text."></b-form-textarea>
              </b-form-group>
              <b-form-group id="form-tags-list" label="Tags" label-for="form-tags-list--input" description="(Tags are seperated by space.)">
                <b-form-input id="form-tags-list--input" type="text" v-model="tag" placeholder="Enter a tag" @keyup.native='addTag'></b-form-input>
                <badge type="primary" v-for="t in form.tags" :key="t">{{t}}</badge>
              </b-form-group>
              <b-alert variant="danger" dismissible :show="errors.length > 0" @dismissed="showDismissibleAlert=false">
                <div v-for="error in errors" :key="error">{{error}}</div>
              </b-alert>
              <b-alert variant="success" :show="!!success_msg">
                <div>{{success_msg}}</div>
              </b-alert>
              <b-button variant="primary" @click.prevent="onSubmit">Update</b-button>
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
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    flatpickr: flatPicker
  },
  data() {
    return {
      tag: null,
      form: {
        event_id: null,
        title: null,
        description: null,
        date_time: Date.now(),
        tags: []
      },
      events: [],
      success_msg: "",
      errors: []
    };
  },
  computed: {
    ...mapGetters(["currentUser", "isAdmin"])
  },
  methods: {
    ...mapActions(["getReq", "postReq"]),
    addTag() {
      this.form.tags = this.tag.split(" ");
    },
    async getEvents() {
      try {
        let url = "/api/event/";
        let data = await this.getReq({
          url
        });
        if (data.events) {
          if (data.events.length > 0) {
            for (let i = 0; i < data.events.length; i++) {
              data.events[i].teams = null;
              data.events[i].value = data.events[i]._id;
              data.events[i].text = data.events[i].name;
            }
            data.events.push({ value: null, text: "Select an event" });
            this.events = data.events;
          }
        }
      } catch (error) {
        console.log(error);
        this.errors.push("Couldn't get events.");
        this.events = [];
      }
    },
    async onSubmit() {
      try {
        this.success_msg = null;
        this.errors = [];
        let url = `/api/event/${this.form.event_id}/create/announcement`;
        let res = await this.postReq({
          url: url,
          body: {
            dateTime: this.form.date_time,
            author: this.form.author,
            title: this.form.title,
            description: this.form.description,
            tags: this.form.tags,
          }
        });
        if (res.success) {
          this.success_msg = res.message;
        } else {
          this.errors.push(res.message);
        }
      } catch (error) {
        console.log(error);
        this.errors.push("Couldn't reach server. Try again later.");
      }
    },
    onReset() {
      this.form.event_id = null;
      this.form.title = null;
      this.form.description = null;
      this.form.date_time = Date.now();
      this.form.tags = [];
    },
  },
  beforeMount() {
    this.getEvents();
  }
};
</script>

<style lang="scss">
</style>
