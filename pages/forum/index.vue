<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col sm="12" md="8">
        <div class="text-center fa-2x header-font text-uppercase">Rules Forum</div>
      </b-col>
    </b-row>
    <b-row>
      <post class="col-12" :post-id="1" subject="Can we all just take a moment." author="FrozeN" :replyCount="42" :upvotes="22" :downvotes="2" queryStatus="open" :last-post="Date.now()" rule-number="1234" :date-posted="Date.now()"/>
    </b-row>
  </b-container>
</template>

<script>
import Post from "@/components/forum/Post"
export default {
  components:{
    post: Post
  },
  data(){
    return {
      fields: [{
        key: 'date_posted',
        sortable: true,
        label: "Date posted"
      },{
        key: 'rule_number',
        sortable: true,
        label: "Rule #"
      },{
        key: 'query_subject',
        sortable: true,
        label: "Query Subject"
      },{
        key: 'responses',
        sortable: true,
        label: "Responses"
      },{
        key: 'last_post',
        sortable: true,
        label: "Last post"
      },{
        key: 'query_status',
        sortable: true,
        label: "Status"
      }],
      rules: [{
        date_posted: "14/11/2019",
        rule_number: "22.6",
        query_subject: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut dignissim urna, vel interdum arcu.",
        responses: 31,
        last_post: "19/12/2019",
        query_status: "active"
      },{
        date_posted: "14/11/2019",
        rule_number: 24,
        query_subject: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut dignissim urna, vel interdum arcu.",
        responses: 31,
        last_post: "19/12/2019",
        query_status: "closed"
      },{
        date_posted: "14/11/2019",
        rule_number: 55,
        query_subject: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut dignissim urna, vel interdum arcu.",
        responses: 31,
        last_post: "19/12/2019",
        query_status: "active"
      }]
    }
  }
}
</script>

<style lang="scss">

</style>
