const Section = require('./../models/forum/section.model')
const Rule = require('./../models/forum/rule.model')
const SubRule = require('./../models/forum/sub-rule.model')
// const Response = require('./../')
const getOne = async function(req, res){
  try {
    let params = req.params
    if(typeof params.id == 'number'){
      let id = params.id

    }
  } catch (error) {
    
  }
}

const getAll = async function(req, res) {
  try {
    let sections = await Section.find().populate({path: ''})
    if(sections && sections.length > 0){
      res.send(sections)
    } else {
      res.send([])
    }
  } catch (error){
    console.log(error)
    res.send(error)
  }
}

module.exports = {
  getOne,
  getAll
}