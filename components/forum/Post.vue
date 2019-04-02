<template>
  <b-card no-body class="px-0 p-1">
    <b-row no-gutters class="px-0">
      <b-col sm="12" md="" lg="2">
        <b-card-img src="https://picsum.photos/400/400/?image=20" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="10">
        <b-card-body>
          <h3 class="font-weight-bold card-title my-0">{{subject}}</h3>
          <h6 class=""><span>Posted by </span><a href="#">{{author}}</a></h6>
          <p class="text-right">{{}}</p>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    formatDate(d) {
      return moment(d).format("LLL");
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
