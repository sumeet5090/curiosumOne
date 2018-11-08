<template>
<section class="section section-hero">
  <b-container>
    <b-row class="justify-content-center">
      <div class="display-4">
        Schedules
      </div>
    </b-row>
    <b-row class="justify-content-center">
      <b-table small outlined responsive bordered hover :items="schedules" :fields="fields">
        <template slot="date" slot-scope="data">
          {{getDate(data.item.date)}}
        </template>
      </b-table>
    </b-row>
  </b-container>
</section>
</template>

<script>
import moment from 'moment';
import {
  mapActions,
  mapGetters
} from "vuex";
const accumalator = require('@/assets/images/icons/tech/accumulator.png')
const brakes = require('@/assets/images/icons/tech/brakes.png')
const egress = require('@/assets/images/icons/tech/egress.png')
const noise = require('@/assets/images/icons/tech/noise.png')
const rain = require('@/assets/images/icons/tech/rain.png')
const scrut_elec = require('@/assets/images/icons/tech/scrut-elec.png')
const scrut_mech = require('@/assets/images/icons/tech/scrut-mech.png')
export default {
  data() {
    return {
      schedules: [],
      fields: [{
          label: " ",
          key: "_id",
          sortable: true
        }, {
          label: "Activity",
          key: "activity",
        },
        {
          label: "Date",
          key: "date",
          sortable: true,
        },
        {
          label: "Start Time",
          key: "start_time",
          sortable: true
        },
        {
          label: "End Time",
          key: "end_time",
          sortable: true
        },
        {
          label: "Comments",
          key: "comments",
          sortable: true
        },
        {
          label: "Location",
          key: "location",
          sortable: true
        },
      ]
    };
  },
  methods: {
    ...mapActions(['getReq']),
    async getSchedules() {
      try {
        let res = await this.getReq({
          url: `/api/event/${this.$route.params.id}/schedules`
        })
        if (res.success) {
          return this.schedules = res.schedules
        }
        return this.schedules = []
      } catch (error) {
        console.log(error)
        return this.schedules = []
      }
    },
    getDate(date) {
      return moment(date).format('LL');
    }
  },
  computed: {
    // ...mapGetters([])
  },
  beforeMount() {
    this.$nextTick(async () => {
      await this.getSchedules()
    })
  }
};
</script>

<style lang="scss">
</style>
