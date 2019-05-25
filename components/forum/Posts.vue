<template>
  <div>
    <div :class="post.status === 'open' ? 'status-open' : post.status === 'closed' ? 'status-closed' : post.status === 'resolved' ? 'status-resolved' : ''" :key="post._id" class="px-0 post-container mb-2 " v-for="post in filteredPosts">
      <div class="media">
        <div class="mr-3 status-icon">
          <i class="fas fa-lock-open text-primary" title="Open" v-b-tooltip.hover.left v-if="post.status === 'open'"></i>
          <i class="fas fa-lock text-danger" title="Closed" v-b-tooltip.hover.left v-if="post.status === 'closed'"></i>
          <i class="fas fa-check text-success" title="Resolved" v-b-tooltip.hover.left v-if="post.status === 'resolved'"></i>
        </div>
        <div class="media-body">
          <router-link :to="{name: 'forum-post-id', params: {id: post._id}}">
            <truncate :length="100" :text="(post.subject || '').toString()" action-class="truncated-less-sign" clamp="..." less="[hide]"></truncate>
          </router-link>
          <div class="container">
            <div class="row">
              <div class="col-md-3 px-0" v-if="post.user">
                <small>
                  Posted by
                  <router-link :to="{name: 'profile-id', params: {id: post.user.username}}">{{post.user.display_name}}</router-link>
                </small>
              </div>
              <div class="col-3 px-0">
                <small>{{formatDate(post.date_posted)}}</small>
              </div>
              <div class="col-3 px-0">
                <small>{{post.replies.length % 2 == 0 ? `${post.replies.length} replies` : `${post.replies.length} reply` }}</small>
              </div>
              <div class="col-md-3 px-0" v-if="post.replies.length > 0">
                <small>
                  Last reply by
                  <a :href="'/profile/'+getLastReply(post.replies).username" target="_blank">{{getLastReply(post.replies).display_name}}</a>
                </small>
              </div>
            </div>
          </div>
        </div>
        <div>
          <b-dropdown no-caret right size="sm" toggle-class="text-decoration-none" v-if="post.user" variant="link">
            <template slot="button-content">
              <i class="fas fa-ellipsis-v m-0 text-black-50"></i>
              <span class="sr-only">Search</span>
            </template>
            <b-dropdown-item href="#" v-if="post.user._id === currentUser._id">Edit</b-dropdown-item>
            <b-dropdown-item href="#" v-if="isAdmin">Mark as duplicate</b-dropdown-item>
            <b-dropdown-item href="#" v-if="isAdmin">Mark as spam</b-dropdown-item>
            <b-dropdown-item href="#" v-if="isAdmin">Mark as resolved</b-dropdown-item>
            <b-dropdown-item href="#" v-if="isAdmin">Close query</b-dropdown-item>
            <b-dropdown-item href="#" v-if="isAdmin">Re-open query</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import truncate from "vue-truncate-collapsed";
import { mapGetters } from "vuex";
export default {
  components: {
    truncate
  },
  props: {
    filters: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      posts: []
    };
  },
  computed: {
    ...mapGetters(["currentUser", "isAdmin"]),
    filteredPosts() {
      let section, rule, sub_rule;
      if (this.filters) {
        console.log("This filters");
        section = this.filters.section;
        rule = this.filters.rule;
        sub_rule = this.filters.sub_rule;
        console.log(section, rule, sub_rule);
        let filtered = this.posts.filter(post => {
          console.log(post);
          if (section == null) {
            return true;
          }
          if (rule == null) {
            console.log("rule = null ", section, post.section.notation);
            if (section === post.section.notation) {
              return true;
            }
          }
          if (sub_rule == null) {
            console.log("rule = null ", section, post.section.notation);
            if (
              section === post.section.notation &&
              rule == post.rule.notation
            ) {
              return true;
            }
          } else {
            if (
              section === post.section.notation &&
              rule == post.rule.notation &&
              sub_rule === post.sub_rule.notation
            ) {
              return true;
            }
          }
          return false;
        });
        console.log(filtered);
        return filtered;
      }
      return [];
    }
  },
  methods: {
    formatDate(d) {
      return moment(d).fromNow();
    },
    getLastReply(replies) {
      let length = replies.length;
      if (length > 0) {
        let user = replies[length - 1].user;
        if (user) {
          return user;
        }
      }
      return false;
    },
    getPosts() {
      this.$axios
        .get("/api/forum/posts")
        .then(res => {
          if (res.data && res.data.success) {
            return (this.posts = res.data.posts);
          }
          return (this.posts = []);
        })
        .catch(err => console.log);
    }
  },
  beforeMount() {
    this.getPosts();
  }
};
</script>

<style lang="scss">
.status-open {
  border-left: 5px solid;
  border-color: #2c44d8;
}
.status-closed {
  border-left: 5px solid;
  border-color: #f5365c;
}
.status-resolved {
  border-left: 5px solid;
  border-color: #2dce89;
}
.post-body {
  width: 600px;
  height: 100%;
}
.status-icon {
  text-align: center;
  height: 80px;
  padding: 1.25rem 0.5rem;
  i {
    font-size: 22px;
    color: #1e1e1e;
  }
}
</style>
