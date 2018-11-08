<template>
<section class="section custom-gradient">
  <b-container>
    <b-row class="justify-content-center">
      <div class="display-4 text-white">
        Announcements for <strong class="text-primary">{{event.name}}</strong>
      </div>
    </b-row>
    <b-row class="justify-content-center mt-4" v-for="annc in announcements" :key="annc._id">
      <b-card>
        <h4 class="">{{annc.title}}</h4>
        <span class="ml-2 text-muted"><small>{{formatDate(Date.parse(annc.dateTime)) + ' by '}} <router-link tag="a" :to="{name: 'profile-id', params: {id: getAuthor(annc.author).username}}" class="card-link">{{getAuthor(annc.author).display_name}}</router-link></small></span>
        <p class="card-text">{{annc.description}}</p>
        <div>
          <badge v-for="tag in annc.tags" :key="tag" type="secondary">#{{tag}}</badge>
        </div>
      </b-card>
    </b-row>
  </b-container>
</section>
</template>

<script>
let moment = require("moment");
export default {
  async asyncData({ $axios, params, error }) {
    try {
      const { data } = await $axios.get(`/api/event/${params.id}`, {
        validateStatus: status => {
          return status < 400;
        }
      });
      const announcements = await $axios.get(
        `/api/event/${params.id}/announcements`,
        {
          validateStatus: status => {
            return status < 400;
          }
        }
      );
      return {
        // isLoaded: data.success,
        announcements: announcements.data.announcements,
        event: data.event
      };
    } catch (err) {}
  },
  data() {
    return {
      event: {}
    };
  },
  methods: {
    getAuthor: function(author_obj) {
      if (author_obj != null) {
        return {
          ...author_obj
        };
      }
      return {
        display_name: "",
        username: ""
      };
    },
    formatDate: function(date) {
      // From https://javascript.info/date
      let diff = new Date() - date;
      if (diff < 1000) {
        return "just now";
      }
      let sec = Math.floor(diff / 1000);
      if (sec < 60) return sec + " sec. ago";
      let min = Math.floor(diff / 60000);
      if (min < 60) return min + " min. ago";
      let d = date;
      return moment(d).fromNow();
    }
  }
};
</script>

<style lang="scss">
b-card {
  h6 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
