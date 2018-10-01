const router = require('express').Router()
const Notification = require('../models/notification.model')

router.get('/', async (req, res) => {
  try {
    let notifs = await Notification.find()
    if (!notifs) {
      return res.send({
        message: "Couldn't GET Notifications."
      })
    }
    return res.send({
      notifications: notifs
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      message: "Some error occured."
    })
  }
})

router.get('/:id', async (req, res) => {
  let id = req.params.id
  try {
    let notif = await Notification.findOne({
      _id: id
    })
    if (!notif) {
      return res.send({
        message: "Couldn't GET Notification."
      })
    }
    return res.send({
      notification: notif
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      message: "Some error occured."
    })
  }
})

router.post('/create', async (req, res) => {
  let body = req.body,
    newNotifInfo = {
      title: body.title,
      date: body.date || Date.now(),
      description: body.description
    }
  try {
    let newNotif = await new Notification(newNotifInfo).save()
    if (!newNotif) {
      return res.send({
        message: "Couldn't Create Notification."
      })
    }
    return res.send({
      newNotif
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      message: "Some error occured."
    })
  }
})

router.put('/update/:id', async (req, res) => {
  let id = req.params.id,
    body = req.body,
    updatedNotifInfo = {
      title: body.title,
      description: body.description
    }
  try {
    let updatedNotif = await Notification.findOneAndUpdate({
      _id: id
    }, updatedNotifInfo, {
      new: true
    })
    if (!updatedNotif) {
      return res.send({
        message: "Couldn't Update Notification."
      })
    }
    return res.send({
      updatedNotif
    })
  } catch (error) {
    console.error(error)
    return res.send({
      message: "Some error occured."
    })
  }
})

router.delete('/delete/:id', async (req, res) => {
  let id = req.params.id
  try {
    let deletedNotif = await Notification.findOneAndRemove({
      _id: id
    })
    if (!deletedNotif) {
      return res.send({
        message: "Couldn't Delete Notification."
      })
    }
    return res.send({
      deletedNotif
    })
  } catch (error) {
    console.error(error)
    return res.send({
      message: "Some error occured."
    })
  }
})

module.exports = router