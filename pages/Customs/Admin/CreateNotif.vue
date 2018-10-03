<template>
    <div>
        <div>
            <section class="section section-lg mt-5 announcements-area">
                <div></div>
                <div class="row notification-admin">
                  <div class="col-md-10">
                    <form>
                      <base-input type="text" v-model="notif.title" placeholder="Title"></base-input>
                      <textarea class="form-control" v-model="notif.description" id="form-control-text-area" rows="3" placeholder="Write the description of the post here."></textarea>
                      <button class="btn btn-default" @click.prevent='postNotif'> Create </button>
                    </form>
                  </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import NotificationService from "@/middleware/Notification.service.js";
export default {
  data() {
    return {
      notif: {
        title: "",
        description: "",
        time: "",
        id: ""
      }
    };
  },
  methods: {
    validateBeforePost() {
      // Validate the state to match
    },
    postNotif() {
      NotificationService.create(this.notif);
    }
  }
};
</script>