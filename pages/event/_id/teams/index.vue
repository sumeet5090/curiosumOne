<template>
  <section class="section">
    <div class="container">
      <b-row class="justify-content-center">
        <div class="display-4 header-font">
          Registered Teams for
          <strong class="text-primary">{{event.name}}</strong>
        </div>
      </b-row>
      <b-row class="justify-content-center my-2" v-if="isAdmin" v-show="isAdmin">
        <base-alert v-if="isAdmin && error" type="danger" icon="far fa-times-circle" class="col-12" :dismissible="true">
          <template slot="text">{{error}}</template>
        </base-alert>
        <base-alert v-if="isAdmin && success" type="success" icon="far fa-check-circle" class="col-12" :dismissible="true">
          <template slot="text">{{success}}</template>
        </base-alert>
        <base-button @click.prevent="sendDownloadRequest" outline type="success" v-if="isAdmin">Download</base-button>
        <base-button @click.prevent="uploadModal.show = true" outline type="primary" v-if="isAdmin">Upload</base-button>
      </b-row>
      <b-row class="justify-content-center">
        <base-input addon-left-icon="fas fa-search text-success" class="col-sm-12 col-md-6 px-0 mx-0" placeholder="Search" type="text" v-model="filter"></base-input>
      </b-row>
      <b-row class="mt-2 justify-content-center">
        <no-ssr>
          <b-table :fields="fields" :filter="filter" :items="teams" :sort-by.sync="table.sortBy" :sort-compare="sortCompareAdvanced" bordered class="font-md-small" hover outlined responsive>
            <template slot="category" slot-scope="data">
              <div class>
                <img class="img-thumbnail icon-category" src="@/assets/images/icons/category/combustion.svg" v-if="data.item.category == 'combustion'">
                <img class="img-thumbnail icon-category" src="@/assets/images/icons/category/electric.svg" v-if="data.item.category == 'electric'">
              </div>
            </template>
            <template slot="car.car_number" slot-scope="data">{{data.item.car.car_number}}</template>
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
        </no-ssr>
      </b-row>
    </div>
    <modal :show.sync="uploadModal.show" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm" v-if="uploadModal.show">
      <card body-classes="px-lg-5 py-lg-5" class="border-0" header-classes="bg-white pb-5" shadow type="secondary">
        <template>
          <div class="text-muted text-center mb-3">
            <small>Upload file</small>
          </div>
          <div class="btn-wrapper text-center">
            <b-form-file class="text-left" v-model="uploadModal.file" @change="handleUpload"></b-form-file>
          </div>
        </template>
        <template>
          <div class="text-center pt-2">
            <base-button type="primary" @click.prevent="uploadFile">Upload</base-button>
          </div>
        </template>
      </card>
    </modal>
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
    ...mapGetters(["isAdmin"]),
    pageCount: function() {
      if (this.teams) {
        let x = this.teams.length / this.table.perPage;
        let y = parseInt(x);
        return x == y ? y : y + 1;
      } else {
        return 1;
      }
    }
  },
  methods: {
    handleUpload(v){
      this.uploadModal.file = v
    },
    sortCompareAdvanced: function(a, b, key) {
      let e1 = a,
        e2 = b;
      key.split(".").forEach(k => {
        e1 = e1[k];
        e2 = e2[k];
      });
      if (typeof e1 === "number" && typeof e2 === "number") {
        return e1 < e2 ? -1 : e1 > e2 ? 1 : 0;
      } else if (typeof e1 === "undefined") {
        return 1;
      } else {
        return e1.toString().localeCompare(e2.toString(), undefined, {
          numeric: true
        });
      }
    },
    sendDownloadRequest() {
      this.success = null
      this.error = null
      this.$axios.get('/api/io/event-team-csv').then(({data}) => {
        console.log(data);
        if(data && data.success == false){
          this.error = data.message
        } else {
          const url = window.URL.createObjectURL(new Blob([data])),
            link = document.createElement('a'),
            fileName = `teams-event-${Date.now()}.csv`
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          this.success = 'File downloaded.'
          document.body.removeChild(link)
        }
      }).catch((err)=>{
          this.error = "Internal server error."
      })
    },
    uploadFile() {
      this.success = null
      this.error = null
      let formData = new FormData()
      formData.append('file', this.uploadModal.file)
      console.log('formData :', formData);
      this.$axios.post('/api/io/event-team-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(({data}) => {
        console.log("Success");
        this.success = 'Upload successful.'
      }).catch((err)=>{
        this.error = 'Upload failed.'
      })
    }
  },
  data() {
    return {
      filter: null,
      table: {
        sortBy: "car.car_number"
      },
      fields: [
        {
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
          key: "country"
        },
        {
          label: " ",
          key: "social"
        }
      ],
      uploadModal: {
        show: true,
        file: null
      },
      error: null,
      success: null
    };
  },
  async asyncData({ $axios, params, error }) {
    try {
      const { data } = await $axios.get(`/api/event/${params.id}/teams`, {
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

td > .icon.icon-shape {
  padding: 0;
  margin: 0;
}
</style>
