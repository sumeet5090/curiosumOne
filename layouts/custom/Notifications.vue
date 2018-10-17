<template>
    <modal :show.sync="modalState.notifications"
        gradient="success"
        style="height: 100vh"
        modal-classes="modal-danger modal-dialog-centered">
        <h6 slot="header" class="modal-title display-4" id="modal-title-notification">Notifications</h6>
        <div class="py-0 text-center">
            <b-list-group class="modal-custom">
                <div class="notification" v-for="n in notif" :key="n.id">
                    <b-list-group-item class="flex-column align-items-start" style="color: black;">
                        <div class="d-flex w-100 justify-content-between">
                            <b-link :href="'notification/'+n._id" class="font-weight-bold notification-header">{{n.title}}</b-link>
                            <b-badge variant="light">{{n.date}}</b-badge>
                        </div>
                        <p class="mb-1 font-weight-light notification-text">{{n.description}}</p>
                    </b-list-group-item>
                </div>
            </b-list-group>
        </div>
        <template slot="footer">
            <base-button type="white" @click="modalShowNotification">Ok, Got it</base-button>
            <base-button type="link"
                        text-color="white"
                        class="ml-auto"
                        @click="modalShowNotification">
                Close
            </base-button>
        </template>
    </modal>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
import Modal from "@/components/Modal";
import notifService from "@/services/Notification.service";
export default {
  name: "notifications",
  data() {
    return {
      notif: []
    };
  },
  components: {
    Modal
  },
  computed: {
    ...mapState({
      modalState: state => state.modals
    })
  },
  methods: {
    ...mapMutations(["modalShowNotification"]),
    formatNotifications(notifications) {
      let temp = "",
        splitDesc = [],
        slicedDesc = [],
        splitSlicedDesc = [],
        dateTimeArray = [],
        dateTimeString = "",
        lengthOfNoti = 240;
      for (let n = 0; n < notifications.length; n++) {
        temp = notifications[n].description;
        splitDesc = temp.split(" ");
        if (temp.length > lengthOfNoti) {
          slicedDesc = temp.slice(0, lengthOfNoti);
          splitSlicedDesc = slicedDesc.split(" ");
          if (
            splitDesc[splitDesc.length - 1] !=
            splitSlicedDesc[splitSlicedDesc.length - 1]
          ) {
            splitSlicedDesc[splitSlicedDesc.length - 1] = "...";
          }
          temp = splitSlicedDesc.join(" ");
          notifications[n].description = temp;
          temp = notifications[n].date;
          dateTimeArray = temp.split("T");
          dateTimeString =
            dateTimeArray[0] + " " + dateTimeArray[1].split(".")[0];
          notifications[n].date = dateTimeString;
        }
      }
      return notifications;
    },
    async getNotifications() {
      try {
        let response = await notifService.getMany();
        if (!response) {
          return;
        }
        this.notif = this.formatNotifications(response.data.notifications);
      } catch (error) {
        console.log(error);
        return;
      }
    },
    async clickAndGetNewValues() {
      let res = await notifService.getMany(); // TODO: Sort latest to oldest
      if (!res) {
        return;
      }
    }
  },
  mounted() {
    this.$nextTick(function(){
      // this.getNotifications(); 
    })
  }
};
</script>