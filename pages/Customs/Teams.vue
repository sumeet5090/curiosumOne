<template>
  <div>
     <div class="container d-flex mt-5">
        <div class="col px-0 mt-5">
            <div class="row">
                <div class="col-lg-12">
                  <b-table :items="teams" :fields="['team_name', 'institution_name', 'team_location']" bordered outlined hover :foot-clone="(teams || []).length > 10" @row-clicked="this.openTeam"></b-table>  
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import teamService from "@/middleware/Team.service.js";
export default {
  data() {
    return {
      teams: [],
      searchTerm: ""
    };
  },
  methods: {
    async getTeamsFromDB() {
      try {
        let response = await teamService.getMany();
        if (!response) {
          return;
        }
        this.teams = response.data.teams;
      } catch (error) {
        return;
      }
    },
    openTeam(team) {
      this.$router.push({ path: `/team/${team._id}` });
    }
  },
  mounted() {
    this.getTeamsFromDB();
  }
};
</script>