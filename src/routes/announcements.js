let router = require('express').Router(),
  Announcement = require('./../models/announcement.model')

router.get('/', async (req, res) => {
  try {
    let ancmts = await Announcement.find().populate('by').exec()
    if (!ancmts) {
      return res.send({
        message: "Couldn't GET Announcements."
      })
    }
    return res.send({
      ancmts
    })
  } catch (error) {
    console.log(error)
    return res.send({
      message: "Some error occured."
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    let ancmt = await Announcement.find().populate('by').exec()
    if (!ancmt) {
      return res.send({
        message: "Couldn't GET Announcements."
      })
    }
    return res.send({
      ancmt
    })
  } catch (error) {
    console.log(error)
    return res.send({
      message: "Some error occured."
    })
  }
})

router.post('/create', async (req, res) => {
  try {
    let ancmtInfo = req.body
    let newAncmt = await new Announcement(ancmtInfo).save()
    if (!newAncmt) {
      return res.send({
        message: "Couldn't Create Announcements."
      })
    }
    return res.send({
      newAncmt
    })
  } catch (error) {
    console.error(error)
    res.send({
      message: "Some error occured"
    })
  }
})

router.put('/update/:id', async (req, res) => {
  try {
    let id = req.params.id,
      updateInfo = req.body
    let updatedDoc = Announcement.findOneAndUpdate({
      _id: id
    }, updateInfo, {
      new: true
    })
    if (!updatedDoc) {
      return res.send({
        message: "Couldn't Update Record."
      })
    }
    return res.send({
      updated: updatedDoc
    })
  } catch (error) {
    console.error(error)
    return res.send({
      message: "Some error occured"
    })
  }
})

router.put('/delete/:id', async (req, res) => {
  try {
    let id = req.params.id,
      deletedDoc = Announcement.findOneAndRemove({
        _id: id
      })
    if (!deletedDoc) {
      return res.send({
        message: "Couldn't Delete Record."
      })
    }
    return res.send({
      deleted: deletedDoc
    })
  } catch (error) {
    console.error(error)
    return res.send({
      message: "Some error occured"
    })
  }
})

module.exports = router;