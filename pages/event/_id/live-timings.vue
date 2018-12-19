<template>
<section class="section section-hero">
  <div class="container">
    <b-row class="justify-content-center">
      <div class="display-4 header-font">
        Live Timings for
        <strong class="text-primary">{{event.name}}</strong>
      </div>
    </b-row>
    <b-row>
      <b-table outlined responsive bordered hover :items="event.live_timings" :fields="fields">
        <template slot="team_id.category" slot-scope="data">
          <div class="icon-container text-center">
            <img src="@/assets/images/icons/category/combustion.svg" class="img-thumbnail icon-category" v-if="data.item.team_id.category == 'combustion'" v-b-tooltip.hover.bottom title="Combustion"/>
            <img src="@/assets/images/icons/category/electric.svg" class="img-thumbnail icon-category" v-if="data.item.team_id.category == 'electric'"  v-b-tooltip.hover.bottom title="Electric"/>
            </div>
        </template>
        <template slot="team_id.car" slot-scope="data">
          <div class="text-center px-0">{{data.item.team_id.car}}</div>
        </template>
        <template slot="team_id.team_name" slot-scope="data">
          <div class="text-center px-0">{{data.item.team_id.team_name}}</div>
        </template>
        <template slot="team_id.institution.short_name" slot-scope="data">
          <div class="text-center px-0">{{data.item.team_id.institution.short_name}}</div>
        </template>
        <template slot="event_name" slot-scope="data">
          <div class="text-center px-0">{{data.item.event_name}}</div>
        </template>
        <template slot="lap_number" slot-scope="data">
          <div class="text-center px-0">{{data.item.lap_number}}</div>
        </template>
        <template slot="lap_time" slot-scope="data">
          <div class="text-center px-0">{{data.item.lap_time}}</div>
        </template>
        <template slot="driver_initial" slot-scope="data">
          <div class="text-center px-0">{{data.item.driver_initial}}</div>
        </template>
      </b-table>
    </b-row>
  </div>
</section>
</template>

<script>
import {
  mapActions,
  mapGetters
} from "vuex";
export default {
  data() {
    return {
      event: {},
      teams: [{}],
      fields: [{
          label: " ",
          key: "team_id.category",
          sortable: true
        },
        {
          label: " ",
          key: "team_id.car",
          sortable: true
        },
        {
          label: " ",
          key: "team_id.team_name",
          sortable: true
        },
        {
          label: " ",
          key: "team_id.institution.short_name",
          sortable: true
        },
        {
          label: " ",
          key: "event_name",
          sortable: true
        },
        {
          label: " ",
          key: "lap_number",
          sortable: true
        },
        {
          label: " ",
          key: "lap_time",
          sortable: true
        },
        {
          label: " ",
          key: "driver_initial",
          sortable: true
        }
      ]
    };
  },
  computed: {},
  methods: {
    ...mapActions(["getReq"])
  },
  mounted() {
    this.$nextTick(async function () {
      try {
        let res = await this.getReq({
          url: `/api/event/${this.$route.params.id}/livetimings/`
        });
        if (res.success) {
          this.event = res.event;
        } else {
          this.event = {};
        }
      } catch (err) {
        console.log(err);
      }
    });
  }
};
</script>

<style lang="scss">
.icon-container {
  padding: 0;
}
th.sorting::before, th.sorting::after {
  padding-bottom: 0 !important;
}
.icon-category {
  width: auto;
  height: 32px;
  background: none !important;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  min-width: 24px;
}

.gray-img {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}

.table td {
  padding: 1rem 0;
}
</style>
