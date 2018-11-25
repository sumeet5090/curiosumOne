<template>
<div v-if="isAdmin">
  <section class="section">
    <div class="container">
      <div class="row">
        <card class="col-md-4">
          <div class="card-title">
            <i class="fa fa-cogs"></i>
            Create Event
          </div>
            <div class="mb-3">
              Create a new event.
            </div>
          <router-link class="btn btn-sm btn-primary" to="/manage/role">
            Create
          </router-link>
        </card>
        <card class="col-md-4">
          <div class="card-title">
            <i class="fas fa-info-circle"></i>
            Role
          </div>
            <div class="mb-3">
              Manage user roles.
            </div>
          <router-link class="btn btn-sm btn-primary" to="/manage/role">
            Manage
          </router-link>
        </card>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["currentUser", "isAdmin"])
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
