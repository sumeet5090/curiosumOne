<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col md="8" sm="12">
        <div class="text-center fa-2x header-font text-uppercase">Rules Forum</div>
      </b-col>
    </b-row>
    <b-row class="justify-content-between align-items-baseline">
      <div class="col-md-2 text-center text-md-left">Filter</div>
      <b-select class="col-md-3" size="sm" v-model="select.section">
        <option :value="null">Select section</option>
        <option :key="key" :value="key" v-for="(sect, key) in sections">{{sect.name}} ({{sect.notation}})</option>
      </b-select>
      <b-select class="col-md-3" size="sm" v-model="select.rule">
        <option :value="null">Select rule</option>
        <option :key="key" :value="key" v-for="(rule, key) in rules">{{rule.name}} ({{rule.notation}})</option>
      </b-select>
      <b-select class="col-md-3" size="sm" v-model="select.sub_rule">
        <option :value="null">Select sub rule</option>
        <option :key="key" :value="key" v-for="(subRule, key) in subRules">{{subRule.name}} ({{subRule.notation}})</option>
      </b-select>
    </b-row>
    <b-container class="px-0" fluid>
      <b-row class="px-0" v-if="!isMobile">
        <b-col lg="2" md>
          <div class="text-center">Date posted</div>
        </b-col>
        <b-col lg="1">
          <div class="text-center">Rule Number</div>
        </b-col>
        <b-col lg="5">
          <div class="text-center">Query Subject</div>
        </b-col>
        <b-col lg="1">
          <div class="text-center">Responses</div>
        </b-col>
        <b-col lg="2">
          <div class="text-center">Last posted</div>
        </b-col>
        <b-col lg="1">
          <div class="text-center">Status</div>
        </b-col>
      </b-row>
      <posts v-if="!isMobile" />
      <posts-mobile v-else />
    </b-container>
  </b-container>
</template>

<script>
import Posts from "@/components/forum/Posts";
import PostsMobile from '@/components/forum/Posts-mobile.vue';
export default {
  components: {
    posts: Posts,
    'posts-mobile': PostsMobile
  },
  data() {
    return {
      select: {
        section: null,
        rule: null,
        sub_rule: null
      },
      selected: {
        section: null
      },
      fields: [
        {
          key: "date_posted",
          sortable: true,
          label: "Date posted"
        },
        {
          key: "rule_number",
          sortable: true,
          label: "Rule #"
        },
        {
          key: "query_subject",
          sortable: true,
          label: "Query Subject"
        },
        {
          key: "responses",
          sortable: true,
          label: "Responses"
        },
        {
          key: "last_post",
          sortable: true,
          label: "Last post"
        },
        {
          key: "query_status",
          sortable: true,
          label: "Status"
        }
      ]
    };
  },
  computed: {
    rules() {
      if (this.select.section != null) {
        let key = this.select.section;
        if (this.sections && this.sections.length > 0) {
          return this.sections[key].rules;
        }
      }
      return [];
    },
    subRules() {
      if (this.select.section != null && this.select.rule != null) {
        let key = this.select.rule;
        let rules = this.rules;
        if (rules.length > 0) {
          return rules[key].sub_rules;
        }
      }
      return [];
    },
    isMobile(){
      if(process.browser){
        if(/Android|webOs|iPhone|iPad|iPod|Blackberry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
          return true
        }
        return false
      }
    },
  },
  methods: {
    
  },
  watch: {
    "select.section": {
      handler: function(val) {
        this.select.rule = null;
        this.select.sub_rule = null;
      }
    },
    "select.rule": {
      handler: function(val) {
        this.select.sub_rule = null;
      }
    }
  },
  async asyncData({ $axios, params, error }) {
    try {
      let { data } = await $axios.get("/api/forum/sections");
      if (data && data.success) {
        return {
          sections: data.sections
        };
      }
      return {
        sections: []
      };
    } catch (error) {}
  }
};
</script>

<style lang="scss">
</style>