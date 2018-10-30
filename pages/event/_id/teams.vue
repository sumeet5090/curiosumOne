<template>
    <section class="section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="display-2">Hello Teams</div>
                <div> {{teams}} </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  async asyncData({ $axios, params, error }) {
    try {
      const { data } = await $axios.get(`/api/event/${params.id}/teams`, {
        validateStatus: status => {
          return status < 400;
        }
      });
      return {
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
</style>
