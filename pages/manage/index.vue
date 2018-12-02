<template>
<div v-if="isAdmin">
  <section class="section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="text-uppercase font-weight-bold h4">Event</div>
      </div>
      <div class="row">
        <card class="col-sm-6 col-md-4">
          <div class="card-title">
            <i class="fas fa-plus-square"></i>
            Create Event
          </div>
            <div class="mb-3">
              Create a new event.
            </div>
          <router-link class="btn btn-sm btn-primary" to="/manage/create/event">
            Create
          </router-link>
        </card>
        <card class="col-sm-6 col-md-4">
          <div class="card-title">
            <i class="fas fa-edit"></i>
            Update Event
          </div>
            <div class="mb-3">
              Update event information.
            </div>
          <router-link class="btn btn-sm btn-primary" to="/manage/role/add">
            Update
          </router-link>
        </card>
        <card class="col-sm-6 col-md-4">
          <div class="card-title">
            <i class="fas fa-info-circle"></i>
            Remove Role
          </div>
            <div class="mb-3">
              Manage user roles.
            </div>
          <router-link class="btn btn-sm btn-primary" to="/manage/role/add">
            Manage
          </router-link>
        </card>
        <card class="col-sm-6 col-md-4">
          <div class="card-title">
            <i class="fas fa-info-circle"></i>
            Role
          </div>
            <div class="mb-3">
              Manage user roles.
            </div>
          <router-link class="btn btn-sm btn-primary" to="/manage/role/add">
            Manage
          </router-link>
        </card>
        <card class="col-sm-6 col-md-4">
          <div class="card-title">
            <i class="fas fa-info-circle"></i>
            Role
          </div>
            <div class="mb-3">
              Manage user roles.
            </div>
          <router-link class="btn btn-sm btn-primary" to="/manage/role/add">
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
