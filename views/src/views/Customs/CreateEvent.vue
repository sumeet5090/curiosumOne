<template>
    <div>
        <section class="section section-hero custom-gradient my-0 section-lg">
            <div class="container pt-lg-md">
              <div class="row justify-content-center">
                <div class="col-md-8 col-lg-5">
                  <card >
                <template>
                    <h4 class="text-center"><strong >Create Event</strong></h4>
                </template>
                <template>
                    
                    <base-input type="text" default placeholder="Event Name" v-model="event.name"></base-input>
                    <!-- calendar-alt -->
                    <base-input addon-left-icon="far fa-calendar-alt">
                        <flat-picker slot-scope="{focus, blur}"
                                    @on-open="focus"
                                    @on-close="blur"
                                    :config="dateConfig"
                                    class="form-control datepicker"
                                    v-model="event.date">
                        </flat-picker>
                    </base-input>
                    <base-input type="text" default placeholder="Event Venue" v-model="event.venue"></base-input>

                    <!-- Submit button -->
                    <div class="row justify-content-center">
                      <base-button @click.prevent="submitEvent" type="success">Submit</base-button>
                    </div>
                </template>
            </card>
                </div>
              </div>
            </div>
        </section>
    </div>
</template>

<script>
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import api from "@/services/Event.service.js";
export default {
  components: { flatPicker },
  data() {
    return {
      dateConfig: {
        allowInput: true,
        enableTime: true,
        altInput: true,
        dateFormat: "Z",
        defaultHour: 10,
        defaultMinute: 0,
        altFormat: "h:i K J F Y"
      },
      event: {
        name: "",
        date: "",
        venue: ""
      }
    };
  },
  methods: {
    async submitEvent() {
      let res = await api.create(this.event);
      if (!res) {
        this.$router.refresh(true);
      }
      console.log(res.data.event);
    }
  }
};
</script>
<style lang="scss">
.flatpickr-calendar {
  .dayContainer {
    padding-right: 2px;
  }
}
</style>
