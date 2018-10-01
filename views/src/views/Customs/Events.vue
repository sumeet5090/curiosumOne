<template>
  <div>
     <div class="container d-flex mt-5">
        <div class="col px-0 mt-5">
            <div class="row">
                <div class="col-lg-12">
                  <b-table :items="events" :fields="['event_name', 'institution_name', 'event_location']" bordered outlined hover :foot-clone="(events || []).length > 10" @row-clicked="this.openEvent"></b-table>  
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import eventService from "@/services/Event.service.js";
export default {
  data() {
    return {
      events: [],
      searchTerm: ""
    };
  },
  methods: {
    async getEventsFromDB() {
      try {
        let response = await eventService.getMany();
        if (!response) {
          return;
        }
        this.events = response.data.events;
      } catch (error) {
        return;
      }
    },
    openEvent(event) {
      this.$router.push({ path: `/event/${event._id}` });
    }
  },
  mounted() {
    this.getEventsFromDB();
  }
};
</script>