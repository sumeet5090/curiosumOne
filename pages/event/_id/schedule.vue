<template>
<section class="section section-hero">
  <b-container>
    <b-row class="justify-content-center">
      <div class="display-4">
        Schedules
      </div>
    </b-row>
    <b-row class="justify-content-center">
      <b-table outlined responsive bordered hover :items="schedules" :fields="fields">

      </b-table>
    </b-row>
  </b-container>
</section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
      fields: []
    };
  },
  methods: {
    ...mapActions(['getReq']),
  },
  computed: {
    // ...mapGetters([])
  },
  async asyncData({$axios, store, params, error}) {
    try {
      const res = await store._actions.getReq[0]({
        url: `/api/event/${params.id}/schedules`
      })
      if(res){
        return {
          schedules: res.schedules
        }
      }
    } catch (error) {
      return {
        schedules: []
      }
    }
  }
}; 
</script>

<style lang="scss">
</style>
