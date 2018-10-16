const Announcement = require('./../models/announcement.model')

const Response = require('./../services/response')

const getAll = async function (req, res) {
  try {
    let announcements = await Announcement.find(), correctedannouncements;
    if (!(announcements.length > 0)) {
      announcements.forEach(announcement => {
        correctedAnnouncements.push(announcement.toWeb())
      });
      return Response.success(res, { announcements: correctedAnnouncements }, 302)
    }
    return Response.success(res, { message: "No announcements found." }, 204)
  } catch (error) {
    return Response.failed(res, { message: "Internal Server Error" }, 500)
  }
}

const getOne = async function (req, res) {
  try {
    let id = req.params.id
    let announcement = await Announcement.findOne({ _id: id })
    if (!announcement) {
      return Response.success(res, { message: "No such announcement found." }, 204)
    }
    return Response.success(res, { announcement }, 302)
  } catch (error) {
    return Response.failed(res, { message: "Internal Server Error" }, 500)
  }
}

const create = async function (req, res) {
  let body = req.body
  try {
    let announcement = await new Announcement({
        dateTime: '',
        author: '',
        title: '',
        body: '',
        tags: ''
    }).save()
    if(!announcement){
      return Response.success(res, { message: "Couldn't create announcement" }, 204)
    }
    return Response.success(res, { message: "Created new announcement" }, 203)
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal Server Error" }, 500)
  }
}

const updateAnnouncement = async function (req, res) {
  // Put request
  let id = req.params.id
  try {
    let announcement = await Announcement.findOneAndUpdate({ _id: id }, req.body, { new: true })
    if (!announcement) {
      return Response.success(res, { message: "Couldn't update announcement." }, 204)
    }
    return Response.success(res, { message: "Updated announcement.", announcement }, 204)
  } catch (error) {
    return Response.failed(res, { message: "Internal Server Error" }, 204)
  }
}

const deleteAnnouncement = async function (req, res) {
  let id = req.params.id
  try {
    let deletedAnnouncement = await Announcement.findOneAndRemove({ _id: id })
    if (!deletedAnnouncement) {
      return res.send({
        message: "Couldn't Delete Announcement."
      })
    }
    return res.send({
      message: "Deleted Announcement",
      deletedAnnouncement
    })
  } catch (error) {
    return Response.failed(res, { message: "Internal Server Error" }, 204)
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  updateAnnouncement,
  deleteAnnouncement
}