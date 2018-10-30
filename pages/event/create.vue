<template>
    <div class="custom-gradient">
    <no-ssr>
        <section class="section section-hero">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <card>
                        <b-form @submit="onSubmit" @reset="onReset">
                            <b-form-group id="form-eventname" label="Event Name:" label-for="form-eventname--input" description="What's the event called?">
                                <b-form-input id="form-eventname--input" type="text" v-model="form.event_name" required placeholder="Enter event name"></b-form-input>
                            </b-form-group>
                            <b-form-group id="form-eventdate" label="Event Date:" label-for="form-eventdate--input" description="When is the event?">
                                <b-form-input id="form-eventdate--input" type="text" v-model="form.event_date" required placeholder="Enter date"></b-form-input>
                            </b-form-group>
                            <b-form-group id="form-eventvenue" label="Event Venue:" label-for="form-eventvenue--input" description="Where will the event take place?">
                                <b-form-input id="form-eventvenue--input" type="text" v-model="form.event_venue" required placeholder="Enter place"></b-form-input>
                            </b-form-group>
                            <b-form-group id="form-eventorganizers" label="Event organizers:" label-for="form-eventorganizers--input" description="Where will the event take place?">
                                <b-badge v-for="org in form.event_organizers" :key="org.id" variant="primary" class="mb-1">
                                    <span slot="text">
                                        Hello {{org.name}}
                                    </span>
                                    <span slot="icon" @click.prevent="popOrganizer(org)" class="cursor-pointer">
                                        <i class="fa fa-times"></i>
                                    </span>
                                </b-badge>
                                <b-form-input id="form-eventorganizers--input" type="text" v-model="form.orgranizer" required placeholder="Enter organizers"></b-form-input>
                            </b-form-group>
                            <b-form-group id="form-eventorganizers-list">
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
      form: {
        event_name: "",
        event_date: "",
        event_venue: "",
        event_link: "",
        orgranizer: "",
        event_organizers: [
          {
            id: 1,
            name: "Jeff"
          },
          {
            id: 2,
            name: "cheF"
          },
          {
            id: 2,
            name: "cheF"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {},
    onReset() {},
    popOrganizer(org) {
      let el = this.form.event_organizers.indexOf(org);
      if (el > -1) {
        this.form.event_organizers.splice(el, 1);
      }
    }
  }
};
</script>


<style lang="scss">
</style>
