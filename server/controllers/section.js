const Section = require('./../models/forum/section.model')
const Rule = require('./../models/forum/rule.model')
const SubRule = require('./../models/forum/sub-rule.model')
const Response = require('./../services/response')
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
    let sections = await Section.find().populate({path: 'rules', populate: {path: 'sub_rules'}}).exec()
    if(sections && sections.length > 0){
      return Response.success(res, {sections})
    }
    return Response.success(res, {sections: []})
  } catch (error){
    console.log(error)
    return Response.failed(res, {sections: []})
  }
}

module.exports = {
  getOne,
  getAll
}