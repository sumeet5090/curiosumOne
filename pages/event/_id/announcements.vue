<template>
<section class="section">
    <b-container>
        <b-row class="justify-content-center">
            <div class="display-4">
                Announcements for <strong class="text-primary">{{event.name}}</strong>
            </div>
        </b-row>
        <b-row v-for="annc in announcements" :key="annc._id">
            <b-col md="2">{{annc.datetime}}</b-col>
            <b-col md="6"></b-col>
            <b-col md="4"></b-col>
            <b-col md="2"></b-col>
            <b-col md="6"></b-col>
            <b-col md="4"></b-col>
        </b-row>
    </b-container>
</section>
</template>

<script>
export default {
  async asyncData({ $axios, params, error }) {
    try {
      const { data } = await $axios.get(`/api/event/${params.id}`, {
        validateStatus: status => {
          return status < 400;
        }
      });
      return {
        // isLoaded: data.success,
        event: data.event
      };
    } catch (err) {
      error({
        message: "Event not found",
        statusCode: 404
      });
    }
  },
  data() {
    return {
      event: {},
      announcements: [
        {
          _id: 1,
          datetime: Date.now().toLocaleString(),
          author: "cheF",
          title: "This post is made by cheF Gang",
          body:
            "Imagine being so good at something that no one is even capable to be next to you.",
          tags: ["have", "you", "seen"]
        },
        {
          _id: 2,
          datetime: Date.now().toLocaleString(),
          author: "cheF2",
          title: "This post is made by cheF Gang",
          body:
            "Imagine being so good at something that no one is even capable to be next to you.",
          tags: ["have", "you", "seen"]
        },
        {
          _id: 3,
          datetime: Date.now().toLocaleString(),
          author: "cheF3",
          title: "This post is made by cheF Gang",
          body:
            "Imagine being so good at something that no one is even capable to be next to you.",
          tags: ["have", "you", "seen"]
        }
      ]
    };
  }
};
</script>

<style lang="scss">
</style>
