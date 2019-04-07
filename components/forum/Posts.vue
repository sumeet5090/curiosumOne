<template >
  <b-row class="px-0 border">
    <b-col sm="1" md="2" lg="2">
      <div class="text-center">{{formatDate(datePosted)}}</div>
    </b-col>
    <b-col sm="1" md="1" lg="1">
      <div class="text-center">{{ruleNumber}}</div>
    </b-col>
    <b-col md="9" lg="5">
      <div class="text-center">{{subject}}</div>
    </b-col>
    <b-col md="1" lg="1">
      <div class="text-center">{{replyCount}}</div>
    </b-col>
    <b-col md="2" lg="2">
      <div class="text-center">{{formatDate(lastPost)}}</div>
    </b-col>
    <b-col md="" lg="1">
      <div class="text-right">{{queryStatus}}</div>
    </b-col>
  </b-row>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      posts: []
    };
  },
  computed: {
    
  },
  methods: {
    formatDate(d) {
      return moment(d).format("DD/mm/YY");
    },
    getPosts(){
      
    }
  },
  props: {
    postId: {
      type: Number
    },
    subject: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    author: {
      type: String,
      default: ""
    },
    replyCount: {
      type: Number,
      default: 0
    },
    upvotes: {
      type: Number,
      default: 1
    },
    downvotes: {
      type: Number,
      default: 0
    },
    queryStatus: {
      type: String,
      default: "open"
    },
    lastPost: {
      type: Number,
      default: Date.now()
    },
    ruleNumber: {
      type: String,
      default: ""
    },
    datePosted: {
      type: Number,
      default: Date.now()
    }
  },
  mounted() {}
};
</script>
