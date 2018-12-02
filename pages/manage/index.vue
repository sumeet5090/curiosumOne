<template>
<div v-if="isAdmin">
  <section class="section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="text-uppercase font-weight-bold h4 mt-2">Event</div>
      </div>
      <div class="row">
        <card class="col-sm-6 col-md-4">
          <div class="card-title"><i class="fas fa-plus-square pr-1"></i>Create Event</div>
          <div class="mb-3">Create a new event.</div>
          <router-link class="btn btn-sm btn-primary" to="/manage/create/event">Create</router-link>
        </card>
        <card class="col-sm-6 col-md-4">
          <div class="card-title"><i class="fas fa-edit pr-1"></i>Update Event</div>
          <div class="mb-3">Update event information.</div>
          <router-link class="btn btn-sm btn-primary" to="/manage/update/event">Update</router-link>
        </card>
      </div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="text-uppercase font-weight-bold h4 mt-2">Team</div>
        </div>
        <div class="row">
          <card class="col-sm-6 col-md-4">
            <div class="card-title"><i class="fas fa-plus-square pr-1"></i>Add Car</div>
            <div class="mb-3">Assign a car to a team.</div>
            <router-link class="btn btn-sm btn-primary" to="/manage/create/car">Add</router-link>
          </card>
          <card class="col-sm-6 col-md-4">
            <div class="card-title"><i class="fas fa-edit pr-1"></i>Update Car</div>
            <div class="mb-3">Update car for team.</div>
            <router-link class="btn btn-sm btn-primary" to="/manage/update/car">Update</router-link>
          </card>
        </div>
      </div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="text-uppercase font-weight-bold h4 mt-2">Announcements</div>
        </div>
        <div class="row">
          <card class="col-sm-6 col-md-4">
            <div class="card-title"><i class="fas fa-plus-square pr-1"></i>Create announcement</div>
            <div class="mb-3">Create a new announcement for an event.</div>
            <router-link class="btn btn-sm btn-primary" to="/manage/create/announcement">Create</router-link>
          </card>
          <card class="col-sm-6 col-md-4">
            <div class="card-title"><i class="fas fa-edit pr-1"></i>Update announcement</div>
            <div class="mb-3">Update an announcement for an event.</div>
            <router-link class="btn btn-sm btn-primary" to="/manage/update/announcement">Update</router-link>
          </card>
          <card class="col-sm-6 col-md-4">
            <div class="card-title"><i class="fas fa-trash-alt pr-1"></i>Remove announcement</div>
            <div class="mb-3">Remove an announcement.</div>
            <router-link class="btn btn-sm btn-primary" to="/manage/delete/announcement">Remove</router-link>
          </card>
        </div>
      </div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="text-uppercase font-weight-bold h4 mt-2">Live Timings</div>
        </div>
        <div class="row">
          <card class="col-sm-6 col-md-4">
            <div class="card-title"><i class="fas fa-plus-square pr-1"></i>Create live timings</div>
            <div class="mb-3">Create a new live timing for an event.</div>
            <router-link class="btn btn-sm btn-primary" to="/manage/create/livetiming">Create</router-link>
          </card>
          <card class="col-sm-6 col-md-4">
            <div class="card-title"><i class="fas fa-edit pr-1"></i>Update live timings</div>
            <div class="mb-3">Update a live timing for an event.</div>
            <router-link class="btn btn-sm btn-primary" to="/manage/update/livetiming">Update</router-link>
          </card>
          <card class="col-sm-6 col-md-4">
            <div class="card-title"><i class="fas fa-trash-alt pr-1"></i>Remove live timings</div>
            <div class="mb-3">Remove an live timings.</div>
            <router-link class="btn btn-sm btn-primary" to="/manage/delete/livetiming">Remove</router-link>
          </card>
        </div>
      </div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="text-uppercase font-weight-bold h4 mt-2">Schedule</div>
        </div>
        <div class="row">
          <card class="col-sm-6 col-md-4">
            <div class="card-title"><i class="fas fa-plus-square pr-1"></i>Create schedule</div>
            <div class="mb-3">Create a new schedule for an event.</div>
            <router-link class="btn btn-sm btn-primary" to="/manage/create/schedule">Create</router-link>
          </card>
          <card class="col-sm-6 col-md-4">
            <div class="card-title"><i class="fas fa-edit pr-1"></i>Update schedule</div>
            <div class="mb-3">Update a schedule for an event.</div>
            <router-link class="btn btn-sm btn-primary" to="/manage/update/schedule">Update</router-link>
          </card>
          <card class="col-sm-6 col-md-4">
            <div class="card-title"><i class="fas fa-trash-alt pr-1"></i>Remove schedule</div>
            <div class="mb-3">Remove a schedule.</div>
            <router-link class="btn btn-sm btn-primary" to="/manage/delete/schedule">Remove</router-link>
          </card>
        </div>
      </div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="text-uppercase font-weight-bold h4 mt-2">Tech Updates</div>
        </div>
        <div class="row">
          <card class="col-sm-6 col-md-4">
            <div class="card-title"><i class="fas fa-plus-square pr-1"></i>Create Tech Updates</div>
            <div class="mb-3">Create a new tech update for an event.</div>
            <router-link class="btn btn-sm btn-primary" to="/manage/create/techupdate">Create</router-link>
          </card>
          <card class="col-sm-6 col-md-4">
            <div class="card-title"><i class="fas fa-edit pr-1"></i>Update tech update</div>
            <div class="mb-3">Update a tech update for an event.</div>
            <router-link class="btn btn-sm btn-primary" to="/manage/update/techupdate">Update</router-link>
          </card>
          <card class="col-sm-6 col-md-4">
            <div class="card-title"><i class="fas fa-trash-alt pr-1"></i>Remove tech update</div>
            <div class="mb-3">Remove a tech update.</div>
            <router-link class="btn btn-sm btn-primary" to="/manage/delete/techupdate">Remove</router-link>
          </card>
        </div>
      </div>
    </div>
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
