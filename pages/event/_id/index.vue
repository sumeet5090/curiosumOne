<template>
    <section class="section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="display-3">{{event}}</div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  data() {
    return {};
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
  }
};
</script>

<style lang="scss">
</style>
