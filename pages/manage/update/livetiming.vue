<template>
<section class="section">
  <b-container v-if="isAdmin">
    <error-page message="Under construction" color="info" heading="Wait..." icon="fas fa-hammer"></error-page>
  </b-container>
  <error-page v-else message="You are not authorized to view this content." icon="fas fa-exclamation-circle"></error-page>
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
      errors: [],
      success_msg: null
    };
  },
  components: {
  },
  computed: {
    ...mapGetters(["currentUser", "isAdmin"])
  },
  methods: {
    ...mapActions(["postReq", "getReq"]),
    async onSubmit() {},
    onReset() {}
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
</style>
