<template>
  <section class="section section-hero">
    <div class="container">
      <modal :show.sync="editModalActive" gradient="secondary" modal-classes="modal-secondary modal-dialog-centered" v-if="editModalActive">
        <h6 class="modal-title" id="modal-title-notification" slot="header">Edit</h6>
        <b-form @reset.prevent="onReset" @submit.prevent>
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
          <b-alert :show="showDismissableAlert" @dismissed="showDismissableAlert=false" dismissible v-if="errors.length > 0" variant="danger">
            <div :key="error" v-for="error in errors">{{error}}</div>
          </b-alert>
          <b-alert :show="!!success_msg" variant="success">
            <div>{{success_msg}}</div>
          </b-alert>
          <b-button @click.prevent="onSubmit" type="submit" variant="primary">Update</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        <template slot="footer">
          <base-button @click.prevent="cancelEdit" class="mr-auto" text-color="dark" type="link">Cancel</base-button>
          <base-button @click.prevent="confirmEdit" type="success">Confirm</base-button>
        </template>
      </modal>
      <modal :show.sync="deleteModalActive" gradient="danger" modal-classes="modal-danger modal-dialog-centered modal-sm" v-if="deleteModalActive">
        <h6 class="modal-title" id="modal-title-notification" slot="header">Delete</h6>
        <div class="row">
          <div class="col-12 text-center">
            <div class="text-white">By confirming you are deleting this entry.</div>
            <div class="text-white">Are you sure?</div>
          </div>
        </div>
        <template slot="footer">
          <base-button @click.prevent="cancelDelete" class="mr-auto" text-color="white" type="link">Cancel</base-button>
          <base-button @click.prevent="confirmDelete" type="success">Confirm</base-button>
        </template>
      </modal>
      <b-row class="justify-content-center">
        <div class="h2 header-font">
          Tech Updates for
          <strong class="text-primary text-capitalize">{{event.name}}</strong>
        </div>
      </b-row>
      <b-row>
        <b-table :fields="fields" :items="event.tech_updates" bordered hover outlined responsive>
          <template slot="team.category" slot-scope="data">
            <div class="icon-container text-center">
              <img alt="Combustion" class="img-thumbnail icon-category" src="@/assets/images/icons/category/combustion.svg" title="Combustion" v-b-tooltip.hover.bottom v-if="data.item.team.category == 'combustion'">
              <img alt="Electric" class="img-thumbnail icon-category" src="@/assets/images/icons/category/electric.svg" title="Electric" v-b-tooltip.hover.bottom v-if="data.item.team.category == 'electric'">
            </div>
          </template>
          <template slot="team.team_name" slot-scope="data">
            <div class="text-center px-0">
              <router-link :to="{name: 'team-id', params: {id: data.item.team._id}}" class="btn btn-link text-capitalize" tag="a">{{data.item.team.team_name}}</router-link>
            </div>
          </template>
          <template slot="team.car" slot-scope="data">
            <div class="text-center px-0">{{data.item.team.car}}</div>
          </template>
          <template slot="team.institution.short_name" slot-scope="data">
            <div class="text-center px-0">{{data.item.team.institution.short_name}}</div>
          </template>
          <template slot="accumulator" slot-scope="data">
            <div class="icon-container text-center">
              <img :class="[{'gray-img': !data.item.accumulator}]" alt="Accumulator" class="icon-category" src="@/assets/images/icons/tech/accumulator.png" title="Accumulator" v-b-tooltip.hover.bottom>
            </div>
          </template>
          <template slot="scrutineering_elec" slot-scope="data">
            <div class="icon-container text-center">
              <img :class="[{'gray-img': !data.item.scrutineering_elec}]" alt="Scrutineering Electric" class="icon-category" src="@/assets/images/icons/tech/scrut-elec.png" title="Scrutineering Electric" v-b-tooltip.hover.bottom>
            </div>
          </template>
          <template slot="scrutineering_mech" slot-scope="data">
            <div class="icon-container text-center">
              <img :class="[{'gray-img': !data.item.scrutineering_mech}]" alt="Scrutineering Mechanical" class="icon-category" src="@/assets/images/icons/tech/scrut-mech.png" title="Scrutineering Mechanical" v-b-tooltip.hover.bottom>
            </div>
          </template>
          <template slot="driver_egress" slot-scope="data">
            <div class="icon-container text-center">
              <img :class="[{'gray-img': !data.item.driver_egress}]" alt="Driver Egress" class="icon-category" src="@/assets/images/icons/tech/egress.png" title="Driver Egress" v-b-tooltip.hover.bottom>
            </div>
          </template>
          <template slot="tilt" slot-scope="data">
            <div class="icon-container text-center">
              <img :class="[{'gray-img': !data.item.tilt}]" alt="Tilt" class="icon-category" src="@/assets/images/icons/tech/tilt.png" title="Tilt" v-b-tooltip.hover.bottom>
            </div>
          </template>
          <template slot="noise_ready_to_drive_sound" slot-scope="data">
            <div class="icon-container text-center">
              <img :class="[{'gray-img': !data.item.noise_ready_to_drive_sound}]" alt="Noise Ready to Drive Sound" class="icon-category" src="@/assets/images/icons/tech/noise.png" title="Noise Ready to Drive Sound" v-b-tooltip.hover.bottom>
            </div>
          </template>
          <template slot="brakes" slot-scope="data">
            <div class="icon-container text-center">
              <img :class="[{'gray-img': !data.item.brakes}]" alt="Breaks" class="icon-category" src="@/assets/images/icons/tech/brakes.png" title="Breaks" v-b-tooltip.hover.bottom>
            </div>
          </template>
          <template slot="rain" slot-scope="data">
            <div class="icon-container text-center">
              <img :class="[{'gray-img': !data.item.rain}]" alt="Rain" class="icon-category" src="@/assets/images/icons/tech/rain.png" title="Rain" v-b-tooltip.hover.bottom>
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
          label: "",
          key: "team.category"
        },
        {
          label: "",
          key: "team.team_name"
        },
        {
          label: "",
          key: "team.car"
        },
        {
          label: "",
          key: "team.institution.short_name"
        },
        {
          label: "",
          key: "accumulator"
        },
        {
          label: "",
          key: "scrutineering_elec"
        },
        {
          label: "",
          key: "scrutineering_mech"
        },
        {
          label: "",
          key: "driver_egress"
        },
        {
          label: "",
          key: "tilt"
        },
        {
          label: "",
          key: "noise_ready_to_drive_sound"
        },
        {
          label: "",
          key: "brakes"
        },
        {
          label: "",
          key: "rain"
        }
      ],
      editModalActive: false,
      deleteModalActive: false,
      selectedEditRow: {},
      selectedDeleteRow: {}
    };
  },
  computed: {},
  methods: {
    ...mapActions(["getReq", "putReq", "delReq"])
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
