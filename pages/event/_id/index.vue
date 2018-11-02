<template>
<section class="section">
    <div class="container">
        <card no-body style="border: none;">
            <b-row class="justify-content-center">
                <div class="display-3 text-default">{{event.name}}</div>
            </b-row>
            <b-row class="justify-content-center">
              <b-table class="m-2" bordered stacked responsive :items="[event]" :fields="fields">
                <template slot="date" slot-scope="data">{{formatDate(data.item.date)}}</template>
                <template slot="link" slot-scope="data">
                  <a :href="data.item.link">Link</a>
                </template>
              </b-table>
            </b-row>
        </card>
    </div>
</section>
</template>

<script>
let moment = require('moment')
export default {
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Name"
        },
        {
          key: "date",
          label: "Date"
        },
        {
          key: "venue",
          label: "Location"
        },
        {
          key: "link"
        }
      ]
    };
  },
  computed: {},
  async asyncData({ $axios, params, error }) {
    try {
      const { data } = await $axios.get(`/api/event/${params.id}`, {
        validateStatus: status => {
          return status < 400;
        }
      });
      return {
        isLoaded: data.success,
        event: data.event
      };
    } catch (err) {
      error({
        message: "Event not found",
        statusCode: 404
      });
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format('LLLL');;
    }
  }
};
</script>

<style lang="scss" >
table.b-table.b-table-stacked > tbody > tr > [data-label]::before {
  text-align: initial !important;
}

table.b-table.b-table-stacked > tbody > tr > :first-child {
    border-top-width: 0.0625rem;
}
</style>
