<template>
<section class="section">
  <div class="container">
    <b-row class="justify-content-center">
      <div class="h2 font-weight-bold header-font text-uppercase">All teams</div>
    </b-row>
    <b-row>
      <b-table outlined responsive bordered hover :items="teams" :fields="fields">
        <template slot="category" slot-scope="data">
          <div class>
            <img src="@/assets/images/icons/category/combustion.svg" class="img-thumbnail icon-category" v-if="data.item.category == 'combustion'"/>
            <img src="@/assets/images/icons/category/electric.svg" class="img-thumbnail icon-category" v-if="data.item.category == 'electric'"/>
                </div>
        </template>
        <template slot="team_name" slot-scope="data">
          <router-link :to="{name: 'team-id', params: {id: data.item._id}}" tag="a" class="text-primary">{{data.item.team_name}}</router-link>
        </template>
        <template slot="institution" slot-scope="data">
          <truncate action-class="truncated-less-sign" clamp=" ... " :length="54" less="[hide]" :text="(data.item.institution.name || '').toString()"></truncate>
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
export default {
  components: {
    truncate
  },
  computed: {},
  data() {
    return {
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
      } = await $axios.get(`/api/team`, {
        validateStatus: status => {
          return status < 400;
        }
      });
      return {
        teams: data.teams,
        isLoaded: data.success
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

  // border: 0.05rem solid $dark;
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
