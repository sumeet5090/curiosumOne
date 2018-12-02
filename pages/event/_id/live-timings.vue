<template>
  <section class="section section-hero">
    <div class="container">
      <b-row class="justify-content-center">
        <div class="display-4 header-font">
          Live Updates for
          <strong class="text-primary">{{event.name}}</strong>
        </div>
      </b-row>
      <b-row>
        <b-table outlined responsive bordered hover :items="event.tech_updates" :fields="fields">
          <template slot="team.category" slot-scope="data">
            <div class="icon-container text-center">
              <img src="@/assets/images/icons/category/combustion.svg" class="img-thumbnail icon-category" v-if="data.item.team.category == 'combustion'" v-b-tooltip.hover.bottom title="Combustion"/>
              <img src="@/assets/images/icons/category/electric.svg" class="img-thumbnail icon-category" v-if="data.item.team.category == 'electric'"  v-b-tooltip.hover.bottom title="Electric"/>
            </div>
          </template>
          <template slot="team.team_name" slot-scope="data">
            <div class="text-center px-0">{{data.item.team.team_name}}</div>
          </template>
          <template slot="team.car" slot-scope="data">
            <div class="text-center px-0">
              {{data.item.team.car}}
            </div>
          </template>
          <template slot="team.institution.short_name" slot-scope="data">
            <div class="text-center px-0">
              {{data.item.team.institution.short_name}}
            </div>
          </template>
          <template slot="accumulator" slot-scope="data">
            <div class="icon-container text-center">
              <img
                class="icon-category"
                src="@/assets/images/icons/tech/accumulator.png"
                :class="[{'gray-img': !data.item.accumulator}]"
                v-b-tooltip.hover.bottom title="Accumulator"
              >
            </div>
          </template>
          <template slot="scrutineering_elec" slot-scope="data">
            <div class="icon-container text-center">
              <img
                class="icon-category"
                src="@/assets/images/icons/tech/scrut-elec.png"
                :class="[{'gray-img': !data.item.scrutineering_elec}]"
                v-b-tooltip.hover.bottom title="Scrutineering Electric"
              >
            </div>
          </template>
          <template slot="scrutineering_mech" slot-scope="data">
            <div class="icon-container text-center">
              <img
                class="icon-category"
                src="@/assets/images/icons/tech/scrut-mech.png"
                :class="[{'gray-img': !data.item.scrutineering_mech}]"
                v-b-tooltip.hover.bottom title="Scrutineering Mechanical"
              >
            </div>
          </template>
          <template slot="driver_egress" slot-scope="data">
            <div class="icon-container text-center">
              <img
                class="icon-category"
                src="@/assets/images/icons/tech/egress.png"
                :class="[{'gray-img': !data.item.driver_egress}]"
                v-b-tooltip.hover.bottom title="Driver Egress"
              >
            </div>
          </template>
          <template slot="tilt" slot-scope="data">
            <div class="icon-container text-center">
              <img
                class="icon-category"
                src="@/assets/images/icons/tech/tilt.png"
                :class="[{'gray-img': !data.item.tilt}]"
                v-b-tooltip.hover.bottom title="Tilt"
              >
            </div>
          </template>
          <template slot="noise_ready_to_drive_sound" slot-scope="data">
            <div class="icon-container text-center">
              <img
                class="icon-category"
                src="@/assets/images/icons/tech/noise.png"
                :class="[{'gray-img': !data.item.noise_ready_to_drive_sound}]"
                v-b-tooltip.hover.bottom title="Noise Ready to Drive Sound"
              >
            </div>
          </template>
          <template slot="brakes" slot-scope="data">
            <div class="icon-container text-center">
              <img
                class="icon-category"
                src="@/assets/images/icons/tech/brakes.png"
                :class="[{'gray-img': !data.item.brakes}]"
                v-b-tooltip.hover.bottom title="Breaks"
              >
            </div>
          </template>
          <template slot="rain" slot-scope="data">
            <div class="icon-container text-center">
              <img
                class="icon-category"
                src="@/assets/images/icons/tech/rain.png"
                :class="[{'gray-img': !data.item.rain}]"
                v-b-tooltip.hover.bottom title="Rain"
              >
            </div>
          </template>
        </b-table>
      </b-row>
    </div>
  </section>
</template>

<script>
// "accumulator": true, "scrutineering_elec": null, "scrutineering_mech": true, "driver_egress": null, "tilt": null, "noise_ready_to_drive_sound": true, "brakes": null, "rain": true,
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      event: {},
      teams: [{}],
      fields: [
        {
          label: " ",
          key: "team.category"
        },
        {
          label: " ",
          key: "team.team_name"
        },
        {
          label: " ",
          key: "team.car"
        },
        {
          label: " ",
          key: "team.institution.short_name"
        },
        {
          label: " ",
          key: "accumulator"
        },
        {
          label: " ",
          key: "scrutineering_elec"
        },
        {
          label: " ",
          key: "scrutineering_mech"
        },
        {
          label: " ",
          key: "driver_egress"
        },
        {
          label: " ",
          key: "tilt"
        },
        {
          label: " ",
          key: "noise_ready_to_drive_sound"
        },
        {
          label: " ",
          key: "brakes"
        },
        {
          label: " ",
          key: "rain"
        }
      ]
    };
  },
  computed: {},
  methods: {
    ...mapActions(["getReq"])
  },
  mounted() {
    this.$nextTick(async function() {
      try {
        let res = await this.getReq({
          url: `/api/event/${this.$route.params.id}/techupdates/`
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
