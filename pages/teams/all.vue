<template>
  <section class="section">
    <div class="container">
      <b-row class="justify-content-center">
        <div class="h2 font-weight-bold header-font text-uppercase">All teams</div>
      </b-row>
      <b-row class="justify-content-center">
        <base-input addon-left-icon="fas fa-search text-success" class="col-sm-12 col-md-6 px-0 mx-0" placeholder="Search" type="text" v-model="filter"></base-input>
      </b-row>
      <b-row>
        <b-table :fields="fields" :filter="filter" :items="teams" :sort-compare="sortCompareAdvanced" bordered hover outlined responsive>
          <template slot="category" slot-scope="data">
            <div class>
              <img class="img-thumbnail icon-category" src="@/assets/images/icons/category/combustion.svg" v-if="data.item.category == 'combustion'">
              <img class="img-thumbnail icon-category" src="@/assets/images/icons/category/electric.svg" v-if="data.item.category == 'electric'">
            </div>
          </template>
          <template slot="team_name" slot-scope="data">
            <div class="d-flex justify-content-between">
              <router-link :to="{name: 'team-id', params: {id: data.item._id}}" class="text-primary" tag="a">{{data.item.team_name}}</router-link>
              <router-link :to="{name: 'team-id-settings', params: {id: data.item._id}}" class="btn btn-sm btn-link cursor-pointer ml-auto" tag="a" v-if="isAdmin">
                <i class="fas fa-pen"></i>
              </router-link>
            </div>
          </template>
          <template slot="institution.name" slot-scope="data">
            <truncate :length="45" :text="(data.item.institution.name || '').toString()" action-class="truncated-less-sign" clamp=" ... " less="[hide]"></truncate>
          </template>
          <template slot="social" slot-scope="data">
            <a :href="data.item.website_url" rel="noreferrer" target="_blank" v-if="data.item.website_url">
              <icon color="dark" name="fa fa-link" size="sm"></icon>
            </a>
            <a :href="data.item.social.facebook" rel="noreferrer" target="_blank" v-if="data.item.social.facebook">
              <icon name="fab fa-facebook" size="sm" style="color: #3B5999"></icon>
            </a>
            <a :href="data.item.social.twitter" rel="noreferrer" target="_blank" v-if="data.item.social.twitter">
              <icon name="fab fa-twitter" size="sm" style="color: #1DA1F2"></icon>
            </a>
            <a :href="data.item.social.instagram" rel="noreferrer" target="_blank" v-if="data.item.social.instagram">
              <icon color="danger" name="fab fa-instagram" size="sm"></icon>
            </a>
          </template>
        </b-table>
      </b-row>
    </div>
  </section>
</template>

<script>
import truncate from "vue-truncate-collapsed";
import { mapGetters } from "vuex";
import flatten from "flat";
export default {
  components: {
    truncate
  },
  computed: {
    ...mapGetters(["isAdmin"])
  },
  methods: {
    sortCompareAdvanced: function(a, b, key) {
      if (typeof a[key] === "number" && typeof b[key] === "number") {
        return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
      } else if (typeof a[key] === "undefined") {
        return 1;
      } else {
        return flatten(a)
          [key].toString()
          .localeCompare(flatten(b)[key].toString(), undefined, {
            numeric: true
          });
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
      fields: [
        {
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
          key: "institution.name",
          label: " ",
          sortable: true
        },
        {
          sortable: true,
          label: " ",
          key: "location",
          formatter: function(val) {
            if (val) {
              return val;
            }
            return "-";
          }
        },
        {
          sortable: true,
          label: " ",
          key: "country",
          formatter: function(val) {
            if (val) {
              return val;
            }
            return "-";
          }
        },
        {
          label: " ",
          key: "social"
        }
      ]
    };
  },
  async asyncData({ $axios, params, error }) {
    try {
      const { data } = await $axios.get(`/api/team`, {
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

td > .icon.icon-shape {
  padding: 0;
  margin: 0;
}
</style>
