const config = require('./../../nuxt.config.js')
const proto = require('./../prototypes/index')
const mongoose = require('mongoose')
const Section = require('./../models/forum/section.model')
const Rule = require('./../models/forum/rule.model')
const SubRule = require('./../models/forum/sub-rule.model')
const database = require('./../database')
const db = database();
const data = require('./../../data/rules_forum');

if (1) {
  console.log("Started");
  data.forEach(d => {
    let rules = []
    let section = new Section({
      name: d.section_name,
      notation: d.section_notation,
    })
    d.rules.forEach(r => {
      let sub_rules = []
      let rule = new Rule({
        name: r.rule_name,
        notation: r.rule_notation,
        section: section._id
      })
      r.sub_rules.forEach(s => {
        let sub_rule = new SubRule({
          name: s.sub_rule_name,
          notation: s.sub_rule_notation,
          rule: rule._id
        })
        sub_rule.save((err, saved) => {
          if (err) {
            console.log(err);
          }
        })
        sub_rules.push(sub_rule._id)
      })
      console.log("Saved rules ", sub_rules.length);
      rule.sub_rules = sub_rules
      rule.save((err, saved) => {
        if (err) {
          console.log(err);
        }
      })
      rules.push(rule._id)
    })
    console.log("Saved rules ", rules.length);
    section.rules = rules
    section.save((err) => {
      if(err){
        console.log(err);
      }
    })
  })
}

if (0) {
  console.log("Started")
  try {
    data.forEach(async d => {
      try {
        console.log("Section ", d.section_notation)
        let rules = []
        let section = new Section({
          name: d.section_name,
          notation: d.section_notation
        })
        let saved = await section.save()
        if (saved) {
          d.rules.forEach(async r => {
            try {
              console.log("Rule ", r.rule_notation)
              let sub_rules = []
              let rule = await new Rule({
                name: r.rule_name,
                notation: r.rule_notation,
                section: section._id
              }).save()
              if (rule) {
                r.sub_rules.forEach(async s => {
                  try {
                    console.log("Sub rule ", s.sub_rule_notation)
                    let sub_rule = await new SubRule({
                      rule: rule._id,
                      name: s.sub_rule_name,
                      notation: s.sub_rule_notation
                    }).save()
                    if (sub_rule) {
                      console.log("Saved sub_rules")
                      sub_rules.push(sub_rule._id)
                    }
                  } catch (error2) {
                    console.log(error2)
                  }
                })
                rule.sub_rules = sub_rules
                let saved_rules = await rule.save()
                if (saved_rules) {
                  console.log("Saved rule")
                  rules.push(rule._id)
                }
              }
            } catch (error1) {
              console.log(error1)
            }
          })
          section.rules = rules
          console.log(section);
          let saved_section = await section.save()
          if (saved_section) {
            console.log("Saved section rule")
          }
        }
      } catch (error) {
        console.log(error)
      }
    })
  } catch (error) {
    console.log(error)
  }
  console.log("Ended")
}