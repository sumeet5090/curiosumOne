<template>
  <section class="section section-hero">
    <b-container>
      <b-row class="justify-content-center">
        <div class="display-4">Schedules</div>
      </b-row>
      <b-row class="justify-content-center">
        <b-table :fields="fields" :items="event.schedules" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" bordered hover outlined responsive small>
          <template slot="date" slot-scope="data">{{getDate(data.item.date)}}</template>
        </b-table>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      event: {
        schedules: []
      },
      sortBy: "date",
      sortDesc: true,
      fields: [
        {
          label: "Day #",
          key: "day_number",
          sortable: true
        },
        {
          label: "Day",
          key: "day",
          sortable: true
        },
        {
          label: "Date",
          key: "date",
          sortable: true
        },
        {
          label: "Activity",
          key: "activity"
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
          label: "Location",
          key: "location",
          sortable: true
        },
        {
          label: "Comments",
          key: "comments",
          sortable: true
        }
      ]
    };
  },
  methods: {
    ...mapActions(["getReq"]),
    async getSchedules() {
      try {
        let res = await this.getReq({
          url: `/api/event/${this.$route.params.id}/schedules`
        });
        if (res.success) {
          return (this.event = res.event);
        }
        return (this.event = { schedules: [] });
      } catch (error) {
        console.log(error);
        return (this.event = { schedules: [] });
      }
    },
    getDate(date) {
      return moment(date).format("LL");
    }
  },
  computed: {
    // ...mapGetters([])
  },
  beforeMount() {
    this.$nextTick(async () => {
      await this.getSchedules();
    });
  }
};
</script>

<style lang="scss">
</style>
