<template>
  <div class="post-page">
    <b-container>
      <b-row>
        <b-col sm="12">
          <expanded-post :post="post"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ExpandedPost from "@/components/forum/ExpandedPost.vue";
export default {
  components: {
    "expanded-post": ExpandedPost
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
  async asyncData({ $axios, params, error }) {
    try {
      const { data } = await $axios.get(`/api/forum/posts/${params.id}`, {
        validateStatus: status => {
          return status < 400;
        }
      });
      return {
        isLoaded: data.success,
        post: data.post
      };
    } catch (err) {
      console.log(err);
      error({
        message: "Not found",
        statusCode: 404
      });
    }
  }
};
</script>

<style lang="scss">
</style>