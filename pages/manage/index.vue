<template>
  <div>
    <div v-if="isAdmin">
      <div>
        <div class="row">
          <div class="col-12 bg-danger">
            <div class="text-center h3">
              <div class="text-white text-uppercase">Admin dashboard</div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-3">
            <b-list-group>
              <b-list-group-item :active="show == 'event' ? true : false" @click="showEvent" class="shadow cursor-pointer">Event</b-list-group-item>
              <b-list-group-item :active="show == 'users' ? true : false" @click="showUsers" class="shadow cursor-pointer">Users</b-list-group-item>
              <b-list-group-item :active="show == 'team' ? true : false" @click="show = 'team'" class="shadow cursor-pointer">Team</b-list-group-item>
              <b-list-group-item :active="show == 'cars' ? true : false" @click="show = 'cars'" class="shadow cursor-pointer">Cars</b-list-group-item>
              <b-list-group-item :active="show == 'announcements' ? true : false" @click="show = 'announcements'" class="shadow cursor-pointer">Announcements</b-list-group-item>
              <b-list-group-item :active="show == 'livetimings' ? true : false" @click="show = 'livetimings'" class="shadow cursor-pointer">Live Timings</b-list-group-item>
              <b-list-group-item :active="show == 'schedule' ? true : false" @click="show = 'schedule'" class="shadow cursor-pointer">Schedule</b-list-group-item>
              <b-list-group-item :active="show == 'techupdates' ? true : false" @click="show = 'techupdates'" class="shadow cursor-pointer">Tech Updates</b-list-group-item>
              <b-list-group-item :active="show == 'staticschedule' ? true : false" @click="show = 'staticschedule'" class="shadow cursor-pointer">Static Schedules</b-list-group-item>
            </b-list-group>
          </div>
          <div class="col-sm-12 col-md-9">
            <div v-if="show == 'event'">
              <div class="table-responsive">
                <table class="table align-items-center table-flush">
                  <thead class>
                    <tr>
                      <th scope="col">Event Name</th>
                      <th scope="col">Teams Registered</th>
                      <th scope="col">Rules Forum</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr :key="eve._id" v-for="eve in events">
                      <th scope="row">
                        <div class="media align-items-center">
                          <div class="media-body">
                            <span class="mb-0 text-sm">{{eve.name}}</span>
                          </div>
                        </div>
                      </th>
                      <td>{{eve.cars.length}}</td>
                      <td>
                        <router-link :to="{name: 'event-id-forum', params: { id: eve.event_short}}" class="btn btn-sm btn-curiosum" tag="a">Forum</router-link>
                      </td>
                      <td>
                        <b-dropdown size="sm">
                          <b-dropdown-item @click="() => { $router.push({name: 'manage-event-id-teams', params: {id: eve.event_short}})}">Teams</b-dropdown-item>
                        </b-dropdown>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-if="show == 'team'">
              <div class="h4 text-center">Coming Soon!</div>
              <h3 class="text-center">Team</h3>
              <b class="font-weight-bold text-danger" v-if="isAdmin">Add Download and Mass Upload feature here</b>
            </div>
            <div v-if="show == 'cars'">
              <div class="h4 text-center">Coming Soon!</div>
            </div>
            <div v-if="show == 'announcements'">
              <div class="h4 text-center">Coming Soon!</div>
            </div>
            <div v-if="show == 'livetimings'">
              <div class="h4 text-center">Coming Soon!</div>
            </div>
            <div v-if="show == 'schedule'">
              <div class="h4 text-center">Coming Soon!</div>
            </div>
            <div v-if="show == 'techupdates'">
              <div class="h4 text-center">Coming Soon!</div>
            </div>
            <div v-if="show == 'staticschedule'">
              <div class="h4 text-center">Coming Soon!</div>
            </div>
            <div v-if="show == 'users'">
              <div class="h4 text-center">Coming Soon!</div>
              <!-- <b-btn variant="success">Add Admin / Staff</b-btn> -->

              <div class="text-center mt-3">
                <div class="font-weight-bold text-uppercase">Admin / Staff Members</div>
              </div>
              <b-table :current-page="adminUsersPage" :fields="userFields" :items="adminUsers" :per-page="5" id="admin-users-table" show-empty>
                <template slot="display_name" slot-scope="data">
                  <a :href="'/profile/'+data.item.username" class="mb-0 text-sm" target="_blank">{{data.item.display_name}}</a>
                </template>
                <template slot="email" slot-scope="data">{{data.item.email}}</template>
                <template slot="role" slot-scope="data">
                  <div>
                    <span :key="j" class="py-1 px-3 bg-primary text-white text-uppercase font-weight-bold mr-2" v-for="(role, j) in data.item.role">{{role}}</span>
                  </div>
                </template>
                <template slot="empty" slot-scope="data">
                  <b-dropdown size="sm" v-if="data">
                    <b-dropdown-item>...</b-dropdown-item>
                  </b-dropdown>
                </template>
              </b-table>
              <div class="text-center">
                <b-pagination :per-page="5" :total-rows="adminUsersLength" align="center" aria-controls="admin-users-table" v-model="adminUsersPage"></b-pagination>
              </div>
              <div class="text-center mt-3">
                <div class="font-weight-bold text-uppercase">Volunteers</div>
              </div>
              <b-table :current-page="volunteerUsersPage" :fields="userFields" :items="volunteerUsers" :per-page="5" id="volunteer-users-table" show-empty>
                <template slot="display_name" slot-scope="data">
                  <a :href="'/profile/'+data.item.username" class="mb-0 text-sm" target="_blank">{{data.item.display_name}}</a>
                </template>
                <template slot="email" slot-scope="data">{{data.item.email}}</template>
                <template slot="role" slot-scope="data">
                  <div>
                    <span :key="j" class="py-1 px-3 bg-primary text-white text-uppercase font-weight-bold mr-2" v-for="(role, j) in data.item.role">{{role}}</span>
                  </div>
                </template>
                <template slot="empty" slot-scope="data">
                  <b-dropdown size="sm" v-if="data">
                    <b-dropdown-item>...</b-dropdown-item>
                  </b-dropdown>
                </template>
              </b-table>
              <div class="text-center">
                <b-pagination :per-page="5" :total-rows="volunteerUsersLength" align="center" aria-controls="volunteer-users-table" v-model="volunteerUsersPage"></b-pagination>
              </div>
              <div class="text-center mt-3">
                <div class="font-weight-bold text-uppercase">Participants</div>
              </div>
              <b-table :current-page="participantUsersPage" :fields="userFields" :items="participantUsers" :per-page="5" id="participant-users-table" show-empty>
                <template slot="display_name" slot-scope="data">
                  <a :href="'/profile/'+data.item.username" class="mb-0 text-sm" target="_blank">{{data.item.display_name}}</a>
                </template>
                <template slot="email" slot-scope="data">{{data.item.email}}</template>
                <template slot="role" slot-scope="data">
                  <div>
                    <span :key="j" class="py-1 px-3 bg-primary text-white text-uppercase font-weight-bold mr-2" v-for="(role, j) in data.item.role">{{role}}</span>
                  </div>
                </template>
                <template slot="empty" slot-scope="data">
                  <b-dropdown size="sm" v-if="data">
                    <b-dropdown-item>...</b-dropdown-item>
                  </b-dropdown>
                </template>
              </b-table>
              <div class="text-center">
                <b-pagination :per-page="5" :total-rows="participantUsersLength" align="center" aria-controls="volunteer-users-table" v-model="participantUsersPage"></b-pagination>
              </div>
              <!-- <div class="table-responsive">
                <table class="table align-items-center table-flush">
                  <thead class>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Roles</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr :key="i" v-for="(user, i) in adminUsers">
                      <th scope="row">
                        <div class="media align-items-center">
                          <div class="media-body">
                            <a :href="'/profile/'+user.username" class="mb-0 text-sm" target="_blank">{{user.display_name}}</a>
                          </div>
                        </div>
                      </th>
                      <td>{{user.email}}</td>
                      <td>
                        <span :key="j" class="py-1 px-3 bg-primary text-white text-uppercase font-weight-bold mr-2" v-for="(role, j) in user.role">{{role}}</span>
                      </td>
                      <td>
                        <b-dropdown size="sm">
                          <b-dropdown-item>...</b-dropdown-item>
                        </b-dropdown>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>-->
            </div>
          </div>
        </div>
      </div>
      <div class>
        <div class="row">
          <div class="col-12 bg-danger">
            <div class="text-center h3">
              <div class="text-white text-uppercase">Old admin dashboard</div>
            </div>
          </div>
        </div>
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
            </div>
          </card>
          <card class="col-12 mb-2">
            <div class="card-title h4 font-weight-bold text-center">Tech Updates</div>
            <div class="my-1 text-center">
              <div class="mb-2">Manage tech updates.</div>
              <router-link class="btn btn-outline-success" to="/manage/create/techupdate">
                <i class="fas fa-plus-square pr-2"></i>New
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
    </div>
    <section class="section section-xl my-5" v-else>
      <error-page class="my-3" message="Nice try, you aren't an admin." />
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      show: "event",
      events: [],
      adminUsers: [],
      participantUsers: [],
      volunteerUsers: [],
      userFields: [
        {
          key: "display_name",
          label: "Name"
        },
        {
          key: "email",
          label: "Email"
        },
        {
          key: "role",
          label: "Roles"
        },
        {
          key: "empty",
          label: " "
        }
      ],
      adminUsersPage: 1,
      volunteerUsersPage: 1,
      participantUsersPage: 1
    };
  },
  computed: {
    ...mapGetters(["currentUser", "isAdmin"]),
    adminUsersLength() {
      if (this.adminUsers) {
        return this.adminUsers.length;
      }
      return 0;
    },
    volunteerUsersLength() {
      if (this.volunteerUsers) {
        return this.volunteerUsers.length;
      }
      return 0;
    },
    participantUsersLength() {
      if (this.participantUsers) {
        return this.participantUsers.length;
      }
      return 0;
    }
  },
  methods: {
    loadEvents() {
      this.$axios
        .get("/api/event")
        .then(res => {
          if (res.data && res.data.success) {
            this.events = res.data.events;
          } else {
            this.events = [];
          }
        })
        .catch(err => {
          if (err) {
            console.log(err);
          }
          this.events = [];
        });
    },
    loadAdminUsers() {
      this.$axios
        .get("/api/user/admins")
        .then(res => {
          if (res.data && res.data.success) {
            this.adminUsers = res.data.users;
          } else {
            this.adminUsers = [];
          }
        })
        .catch(err => {
          if (err) {
            console.log(err);
          }
          this.adminUsers = [];
        });
    },
    loadAParticipantUsers() {
      this.$axios
        .get("/api/user/participants")
        .then(res => {
          if (res.data && res.data.success) {
            this.participantUsers = res.data.users;
          } else {
            this.participantUsers = [];
          }
        })
        .catch(err => {
          if (err) {
            console.log(err);
          }
          this.participantUsers = [];
        });
    },
    loadVolunteerUsers() {
      this.$axios
        .get("/api/user/volunteers")
        .then(res => {
          if (res.data && res.data.success) {
            this.volunteerUsers = res.data.users;
          } else {
            this.volunteerUsers = [];
          }
        })
        .catch(err => {
          if (err) {
            console.log(err);
          }
          this.volunteerUsers = [];
        });
    },
    showEvent() {
      this.show = "event";
      if (this.events.length === 0) {
        this.loadEvents();
      }
    },
    showUsers() {
      this.show = "users";
      if (this.adminUsers.length === 0) {
        this.loadAdminUsers();
        this.loadAParticipantUsers();
        this.loadVolunteerUsers();
      }
    }
  },
  mounted() {
    this.loadEvents();
    this.loadAdminUsers();
    this.loadAParticipantUsers();
    this.loadVolunteerUsers();
  }
};
</script>

<style lang="scss" scoped>
</style>
