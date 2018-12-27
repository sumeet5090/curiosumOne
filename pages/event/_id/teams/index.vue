<template>
<section class="section">
  <div class="container">
    <b-row class="justify-content-center">
      <div class="display-4 header-font">
        Registered Teams for <strong class="text-primary">{{event.name}}</strong>
      </div>
    </b-row>
    <b-row class="justify-content-center">
      <base-input class="col-sm-12 col-md-6 px-0 mx-0" v-model="filter" type="text" placeholder="Search" addon-left-icon="fas fa-search text-success"></base-input>
    </b-row>
    <b-row class="justify-content-center">
      <b-table outlined responsive bordered hover :items="teams" :fields="fields" :filter="filter">
        <template slot="category" slot-scope="data">
          <div class>
            <img src="@/assets/images/icons/category/combustion.svg" class="img-thumbnail icon-category" v-if="data.item.category == 'combustion'"/>
            <img src="@/assets/images/icons/category/electric.svg" class="img-thumbnail icon-category" v-if="data.item.category == 'electric'"/>
          </div>
        </template>
        <template slot="team_name" slot-scope="data">
          <div class="d-flex justify-content-between">
            <router-link :to="{name: 'team-id', params: {id: data.item._id}}" tag="a" class="text-primary">{{data.item.team_name}}</router-link>
            <router-link :to="{name: 'team-id-settings', params: {id: data.item._id}}" class="btn btn-sm btn-link cursor-pointer ml-auto" tag="a" v-if="isAdmin"><i class="fas fa-pen"></i></router-link>
          </div>
        </template>
        <template slot="institution" slot-scope="data">
          <truncate action-class="truncated-less-sign" clamp=" ... " :length="45" less="[hide]" :text="(data.item.institution.name || '').toString()"></truncate>
        </template>
        <template slot="social" slot-scope="data">
          <a v-if="data.item.website_url" :href="data.item.website_url" target="_blank" rel="noreferrer" ><icon name="fa fa-link" color="dark" size="sm"></icon></a>
          <a v-if="data.item.social.facebook" :href="data.item.social.facebook" target="_blank" rel="noreferrer" ><icon name="fab fa-facebook" style="color: #3B5999"  size="sm"></icon></a>
          <a v-if="data.item.social.twitter" :href="data.item.social.twitter" target="_blank" rel="noreferrer" ><icon name="fab fa-twitter" style="color: #1DA1F2"  size="sm"></icon></a>
          <a v-if="data.item.social.instagram" :href="data.item.social.instagram" target="_blank" rel="noreferrer" ><icon name="fab fa-instagram" color="danger" size="sm"></icon></a>
        </template>
      </b-table>
    </b-row>
  </div>
</section>
</template>

<script>
import truncate from "vue-truncate-collapsed";
import { mapGetters } from 'vuex';
export default {
  components: {
    truncate
  },
  computed: {
    ...mapGetters(['isAdmin']),
    pageCount: function () {
      if (this.teams) {
        let x = this.teams.length / this.table.perPage;
        let y = parseInt(x);
        return x == y ? y : y + 1;
      } else {
        return 1;
      }
    }
  },
  data() {
    return {
      filter: null,
      table: {
        currentPage: 1,
        perPage: 100
      },
      fields: [{
          label: "",
          key: "category",
          sortable: true
        },
        {
          label: " ",
          key: "car.car_number",
          sortable: true
        },
        {
          sortable: true,
          label: " ",
          key: "team_name"
        },
        {
          key: "institution",
          label: " ",
          sortable: true
        },
        {
          sortable: true,
          label: " ",
          key: "location"
        },
        {
          sortable: true,
          label: " ",
          key: "country"
        },
        {
          label: " ",
          key: "social"
        },
      ]
    };
  },
  async asyncData({
    $axios,
    params,
    error
  }) {
    try {
      const {
        data
      } = await $axios.get(`/api/event/${params.id}/teams`, {
        validateStatus: status => {
          return status < 400;
        }
      });
      let event_res = await $axios.get(`/api/event/${params.id}`, {
        validateStatus: status => {
          return status < 400;
        }
      });
      return {
        event: event_res.data.event,
        isLoaded: data.success,
        teams: data.teams
      };
    } catch (err) {
      error({
        message: "Teams not found",
        statusCode: 404
      });
    }
  }
};
</script>

<style lang="scss">
.truncated_less_sign {
  color: #5e72e4;
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

.table {

  th {
    padding: 0;
  }

  td {
    padding: 0.45rem;
    vertical-align: middle;
  }
}

a {
  .icon-sm {
    width: 1rem !important;
    height: 1rem !important;
  }
}

td>.icon.icon-shape {
  padding: 0;
  margin: 0;
}
</style>
