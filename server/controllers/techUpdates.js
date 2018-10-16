const TechUpdates = require('./../models/techUpdates.model')

const Response = require('./../services/response')

const getAll = async function (req, res) {
  try {
    let techUpdates = await TechUpdates.find(), correctedTechUpdates;
    if (!(techUpdates.length > 0)) {
      techUpdates.forEach(techUpdate => {
        correctedTechUpdates.push(techUpdate.toWeb())
      });
      return Response.success(res, { techUpdatess: correctedTechUpdates }, 302)
    }
    return Response.success(res, { message: "No techUpdatess found." }, 204)
  } catch (error) {
    return Response.failed(res, { message: "Internal Server Error" }, 500)
  }
}

const getOne = async function (req, res) {
  try {
    let id = req.params.id
    let techUpdates = await TechUpdates.findOne({ _id: id })
    if (!techUpdates) {
      return Response.success(res, { message: "No such techUpdates found." }, 204)
    }
    return Response.success(res, { techUpdates }, 302)
  } catch (error) {
    return Response.failed(res, { message: "Internal Server Error" }, 500)
  }
}

const create = async function (req, res) {
  let body = req.body
  try {
    let techUpdate = await new TechUpdates({
        dateTime: '',
        author: '',
        title: '',
        body: '',
        tags: ''
    }).save()
    if(!techUpdate){
      return Response.success(res, { message: "Couldn't create techUpdates" }, 204)
    }
    return Response.success(res, { message: "Created new techUpdates" }, 203)
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal Server Error" }, 500)
  }
}

const updateTechUpdates = async function (req, res) {
  // Put request
  let id = req.params.id
  try {
    let techUpdates = await TechUpdates.findOneAndUpdate({ _id: id }, req.body, { new: true })
    if (!techUpdates) {
      return Response.success(res, { message: "Couldn't update techUpdates." }, 204)
    }
    return Response.success(res, { message: "Updated techUpdates.", techUpdates }, 204)
  } catch (error) {
    return Response.failed(res, { message: "Internal Server Error" }, 204)
  }
}

const deleteTechUpdates = async function (req, res) {
  let id = req.params.id
  try {
    let deletedtechUpdates = await TechUpdates.findOneAndRemove({ _id: id })
    if (!deletedtechUpdates) {
      return res.send({
        message: "Couldn't Delete techUpdates."
      })
    }
    return res.send({
      message: "Deleted techUpdates",
      deletedtechUpdates
    })
  } catch (error) {
    return Response.failed(res, { message: "Internal Server Error" }, 204)
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  updateTechUpdates,
  deleteTechUpdates
}