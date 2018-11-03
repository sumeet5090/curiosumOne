<template>
<section class="section">
    <div class="container">
        <b-row class="justify-content-center">
            <div class="display-4">
                Registered Teams for <strong class="text-primary">{{event.name}}</strong>
            </div>
        </b-row>
        <b-row class="justify-content-center">
            <base-pagination :page-count="pageCount" v-model="table.currentPage"></base-pagination>
        </b-row>
        <b-row>
            <b-table outlined responsive bordered hover :items="teams" :fields="fields" :per-page="table.perPage" :current-page="table.currentPage">
                <template slot="category" slot-scope="data">
                    <div class>
                        <img v-lazy="combustion_icon" alt="Combustion" class="img-thumbnail icon-category" v-show="data.item.category == 'combustion'"/>
                        <img v-lazy="electric_icon" alt="Electric" class="img-thumbnail icon-category" v-show="data.item.category == 'electric'"/>
                </div>
                </template>
                <template slot="team_name" slot-scope="data">
                    <router-link :to="{name: 'team-id', params: {id: data.item._id}}" tag="a" class="text-primary">{{data.item.team_name}}</router-link>
                </template>
                <template slot="institution" slot-scope="data">
                    <truncate action-class="truncated-less-sign" clamp=" ... " :length="54" less="[hide]" :text="(data.item.institution.name || '').toString()"></truncate>
                </template>
                <template slot="social" slot-scope="data">
                    <a :href="data.item.website_url" target="_blank"><icon name="fa fa-link" color="dark" size="sm"></icon></a>
                    <a :href="data.item.social.facebook" target="_blank"><icon name="fa fa-facebook-official" style="color: #3B5999"  size="sm"></icon></a>
                    <a :href="data.item.social.twitter" target="_blank"><icon name="fa fa-twitter" style="color: #1DA1F2"  size="sm"></icon></a>
                    <a :href="data.item.social.instagram" target="_blank"><icon name="fa fa-instagram" color="danger" size="sm"></icon></a>
                </template>
            </b-table>
        </b-row>
    </div>
</section>
</template>

<script>
export default {
  async asyncData({ $axios, params, error }) {
    try {
      let { data } = $axios.get(`/api/event/${params.id}/techupdates`, {
        validateStatus: status => {
          return status < 400;
        }
      });
      return {
        tech_updates: data.tech_updates
      }
    } catch (err) {
      console.log(err)
      error({
        message: "Couldn't get tech updates."
      })
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
</style>
