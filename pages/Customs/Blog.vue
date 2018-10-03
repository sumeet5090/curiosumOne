<template>
    <div>
        <div>
            <section class="section section-lg mt-5 announcements-area">
                <div></div>
                <div class="container announcement-container">
                    <div class="announcement" v-for="post in posts" :key="post.id">
                        <b-media right-align vertical-align="center">
                            <b-img slot="aside" src="http://via.placeholder.com/300x300" height="80" width="80" alt="placeholder" />
                            <h5 class="mt-0 mb-1">{{post.title}}</h5>
                            {{post.content}}
                            <div>
                              <base-button tag="a" href="#" outline class="mt-3" size="sm" type="primary">Read More</base-button>
                            </div>
                        </b-media>
                    <hr/>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      posts: [
        {
          id: 0,
          title: "",
          data: "",
          img: {},
          content:
            "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.",
          markdown: {}
        },
        {
          id: 1,
          title: "",
          data: "",
          img: {},
          content:
            "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.",
          markdown: {}
        },
        {
          id: 2,
          title: "",
          data: "",
          img: {},
          content:
            "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.",
          markdown: {}
        },
        {
          id: 3,
          title: "",
          data: "",
          img: {},
          content:
            "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.",
          markdown: {}
        },
        {
          id: 4,
          title: "",
          data: "",
          img: {},
          content:
            "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.",
          markdown: {}
        }
      ]
    };
  },
  computed: {
    // ...mapState([''])
  },
  methods: {}
};
</script>
