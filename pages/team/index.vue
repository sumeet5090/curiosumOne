<template>
<section class="section section-">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div v-if="team">
          <error-page :message="redirect_show_link?'If not redirected automatically, <a href=\'/team/'+team+'\'>Click here</a>':''" color="info" heading="Redirecting . . ." icon="fas fa-exclamation-circle" />
        </div>
        <error-page color="info" heading="NOT IN A TEAM" icon="fas fa-exclamation-circle" message="You need to be in a team first <a href='/team/create'> Click here</a>" v-else />
      </div>
    </div>
  </div>
</section>
</template>

<script>
import {
  mapGetters,
  mapActions
} from "vuex";
import {
  setTimeout
} from "timers";
export default {
  data() {
    return {
      redirect_show_link: false
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
    team() {
      if (this.currentUser != null) {
        if (this.currentUser.team) {
          return this.currentUser.team;
        }
      }
      return null;
    }
  },
  methods: {
    ...mapActions(["getReq"]),
    redirect() {
      console.log('/team/' + this.team);
      this.$router.push('/team/' + this.team)
    }
  },
  mounted() {
    this.$nextTick(() => {
      if(this.team){
        setTimeout(() => {
        this.redirect();
        this.redirect_show_link = true;
      }, 1200);
      }
    });
  }
};
</script>

<style lang="scss">
</style>
