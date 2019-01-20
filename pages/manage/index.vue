<template>
<div>
  <section class="section" v-if="isAdmin">
    <div class="container">
      <div class="row">
        <card class="col-12 mb-2">
          <div class="card-title h4 font-weight-bold text-center">Event</div>
          <div class="my-1 text-center">
            <div class="mb-2">Manage entries related to events.</div>
            <router-link class="btn btn-outline-success" to="/manage/create/event">
              <i class="fas fa-plus-square pr-2"></i>New
            </router-link>
            <router-link class="btn btn-outline-info" to="/manage/update/event">
              <i class="fas fa-edit pr-2"></i>Edit
            </router-link>
          </div>
        </card>
        <card class="col-12 mb-2">
          <div class="card-title h4 font-weight-bold text-center">Team</div>
          <div class="my-1 text-center">
            <div class="mb-2">Manage cars linking events and teams.</div>
            <router-link class="btn btn-outline-success" to="/manage/create/car">
              <i class="fas fa-plus-square pr-2"></i>Add Car
            </router-link>
            <router-link class="btn btn-outline-info" to="/manage/update/car">
              <i class="fas fa-edit pr-2"></i>Edit
            </router-link>
          </div>
        </card>
        <card class="col-12 mb-2">
          <div class="card-title h4 font-weight-bold text-center">Announcements</div>
          <div class="my-1 text-center">
            <div class="mb-2">Manage announcements.</div>
            <router-link class="btn btn-outline-success" to="/manage/create/announcement">
              <i class="fas fa-plus-square pr-2"></i>New
            </router-link>
            <router-link class="btn btn-outline-info" to="/manage/update/announcement">
              <i class="fas fa-edit pr-2"></i>Edit
            </router-link>
            <router-link class="btn btn-outline-danger" to="/manage/delete/announcement">
              <i class="fas fa-trash-alt pr-1"></i>Remove
            </router-link>
          </div>
        </card>
        <card class="col-12 mb-2">
          <div class="card-title h4 font-weight-bold text-center">Live Timings</div>
          <div class="my-1 text-center">
            <div class="mb-2">Manage live timings.</div>
            <router-link class="btn btn-outline-success" to="/manage/create/livetiming">
              <i class="fas fa-plus-square pr-2"></i>New
            </router-link>
          </div>
        </card>
        <card class="col-12 mb-2">
          <div class="card-title h4 font-weight-bold text-center">Schedule</div>
          <div class="my-1 text-center">
            <div class="mb-2">Manage schedules.</div>
            <router-link class="btn btn-outline-success" to="/manage/create/schedule">
              <i class="fas fa-plus-square pr-2"></i>New
            </router-link>
            <router-link class="btn btn-outline-info" to="/manage/update/schedule">
              <i class="fas fa-edit pr-2"></i>Edit
            </router-link>
            <router-link class="btn btn-outline-danger" to="/manage/delete/schedule">
              <i class="fas fa-trash-alt pr-1"></i>Remove
            </router-link>
          </div>
        </card>
        <card class="col-12 mb-2">
          <div class="card-title h4 font-weight-bold text-center">Tech Updates</div>
          <div class="my-1 text-center">
            <div class="mb-2">Manage tech updates.</div>
            <router-link class="btn btn-outline-success" to="/manage/create/techupdate">
              <i class="fas fa-plus-square pr-2"></i>New
            </router-link>
            <router-link class="btn btn-outline-info" to="/manage/update/techupdate">
              <i class="fas fa-edit pr-2"></i>Edit
            </router-link>
            <router-link class="btn btn-outline-danger" to="/manage/delete/techupdate">
              <i class="fas fa-trash-alt pr-1"></i>Remove
            </router-link>
          </div>
        </card>
        <card class="col-12 mb-2">
          <div class="card-title h4 font-weight-bold text-center">Static Schedules</div>
          <div class="my-1 text-center">
            <div class="mb-2">Manage static schedules.</div>
            <router-link class="btn btn-outline-success" to="/manage/create/static-schedule">
              <i class="fas fa-plus-square pr-2"></i>New
            </router-link>
            <router-link class="btn btn-outline-info" to="/manage/update/static-schedule">
              <i class="fas fa-edit pr-1"></i>Edit
            </router-link>
            <router-link class="btn btn-outline-danger" to="/manage/delete/static-schedule">
              <i class="fas fa-trash-alt pr-1"></i>Delete
            </router-link>
          </div>
        </card>
        <card class="col-12 mb-2">
          <div class="card-title h4 font-weight-bold text-center">Roles</div>
          <div class="my-1 text-center">
            <div class="mb-2">Manage user roles.</div>
            <router-link class="btn btn-outline-success" to="/manage/role/add">
              <i class="fas fa-plus-square pr-2"></i>Add
            </router-link>
            <router-link class="btn btn-outline-danger" to="/manage/role/remove">
              <i class="fas fa-trash-alt pr-1"></i>Remove
            </router-link>
          </div>
        </card>
      </div>
    </div>
  </section>
  <section class="section section-xl my-5" v-else>
    <error-page class="my-3" message="Nice try, you aren't an admin." />
  </section>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from "vuex";
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
