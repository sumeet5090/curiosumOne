<template>
  <section class="section section-xl">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12 text-dark">
          <b-card :key="faq.id" no-body v-for="faq in faq_list">
            <b-card-header class="card-title" v-b-toggle="'collapse-'+faq.id">
              <span>
                <i class="collapse-icon fas fa-chevron-right"></i>
              </span>
              <span class="ml-2 font-weight-bold">{{faq.question}}</span>
            </b-card-header>
            <b-collapse :id="'collapse-'+faq.id" :visible="faq.open">
              <b-card-body>
                <no-ssr tag="p">
                  <vue-markdown :linkify="false">{{faq.answer}}</vue-markdown>
                </no-ssr>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VueMarkdown from "vue-markdown";
export default {
  components: {
    "vue-markdown": VueMarkdown
  },
  data() {
    return {
      faq_list: [
        {
          id: 1,
          name: "FAQ #1",
          question: "How do I report a bug / issue on the website?",
          answer:
            "1. Shoot us an email at **business@mobilityeng.in**\n2. Describe the issue best you can, also try to include the screenshot of the issue.\n3. We will look into it and resolve it as soon as possible.",
          admin: false,
          captain: false,
          open: true
        },
        {
          id: 2,
          name: "FAQ #2",
          question: "Where do I check registered teams?",
          answer:
            "Here's a direct link. [**All teams**](https://mobilityeng.online/teams/all)\nYou could also find <span><button class='btn btn-sm btn-danger'>All</button></span> on the [**Dashboard**](https://mobilityeng.online)",
          admin: false,
          captain: false
        },
        {
          id: 3,
          name: "FAQ #3",
          question: "What are the steps for creating a team?",
          answer:
            "1. <a href=\"/login\" class='btn-link' target='_blank'>Login</a> with your <i class='fab fa-google'></i> account.\n2. Go to <a href='/team/create' target='_blank'>/team/create</a>\n3. Fill in relavant information, invite members with their registered email. (They must have a registered account.)\n4. Click <a class='btn btn-sm btn-primary text-white'>CREATE</a> to finalize.\n\n\nYou will be the default team captain, you can change that in team settings."
        },
        {
          id: 4,
          name: "FAQ #4",
          question: "How to join a team?",
          answer:
            "You need to ask the team captain to send a team invite. You'll receive an email from our team. Click the join button."
        },
        {
          id: 5,
          name: "FAQ #5",
          question:
            "I am the team captain, how do I update the team information or add members?",
          answer:
            "The team profile has a \"<i class=\"fas fa-pen text-primary font-weight-bold\"></i> \" link. That's the place to update your team information.\nStill can't find it? Just add a **'/settings'** at the end of the team url.\nIt may look like this <span class='text-primary'>https://mobilityeng.online/team/5bf7efca44277a3cee2eeec2<strong class='font-weight-bold'>/settings</strong></span>",
          admin: false,
          captain: false
        }
      ]
    };
  }
};
</script>

<style lang="scss">
strong {
  font-weight: bold !important;
}

.card-header.card-title {
  .collapse-icon {
    transition-duration: 200ms;
    transform: rotate(90deg);
  }

  &.collapsed {
    .collapse-icon {
      transform: rotate(0deg);
    }
  }
}
</style>