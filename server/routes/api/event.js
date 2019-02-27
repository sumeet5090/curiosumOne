const { Router } = require('express')
const router = Router();
const helper = require('./../../auth/helper')
const eventCont = require('./../../controllers/event')
const announcementRouter = require('./announcement')
const techUpdateRouter = require('./tech-updates')
const scheduleRouter = require('./schedule')
const liveTimingRouter = require('./live-timing')
const staticScheduleRouter = require('./static-schedule')
const carRouter = require('./car')

// Announcements
router.use('/:id/announcements', announcementRouter)
// Technical Updates
router.use('/:id/tech-updates', techUpdateRouter)
// // Schedules
router.use('/:id/schedules', scheduleRouter)
// // Live timings
router.use('/:id/live-timings', liveTimingRouter)
// // Static Schedules
router.use('/:id/static-schedules', staticScheduleRouter)
// // Team and Car
router.use('/:id/cars', carRouter)
// // Event specific
// router.get('/', eventCont.getAllEvents)
// router.get('/:id', eventCont.getOneEvent)

// GET
router.get('/', eventCont.getAllEvents)
router.get('/:id', eventCont.getOneEvent)
router.get('/:id/teams', eventCont.getTeamForEvent)
// router.get('/:id/announcements/:annc_id', eventCont.getOneAnnouncement)
// router.get('/:id/techupdates/:tu_id', eventCont.getOneTechupdate)
// router.get('/:id/schedules/:sc_id', eventCont.getOneSchedule)
// router.get('/:id/livetimings/:lt_id', eventCont.getOneLivetiming)
// router.get('/:id/announcements', eventCont.getAnnouncementsForEvent)
// router.get('/:id/techupdates', eventCont.getAllTechupdates)
// router.get('/:id/schedules', eventCont.getAllSchedules)
// router.get('/:id/livetimings', eventCont.getAllLivetimings)
// router.get('/:id/cars', eventCont.getAllCars)
// router.get('/:id/:team_id/car', eventCont.getTeamCar)
// router.get('/:id/static-schedule', eventCont.getAllStaticSchedulesForEvent)
// router.get('/:id/static-schedule/:st_id', eventCont.getOneStaticSchedule)
// router.get('/:id/:team_id/static-schedule', eventCont.getOneStaticScheduleEventTeam)
// router.get('/:event_name', eventCont.getOneEventByName)
// POST
// router.post('/:id/create/announcement', helper.allowStaff, eventCont.createAnnouncement)
// router.post('/:id/create/:team_id/car', helper.allowStaff, eventCont.createCar)
// router.post('/:id/create/:team_id/livetiming', helper.allowStaff, eventCont.createLivetiming)
// router.post('/:id/create/:team_id/techupdate', helper.allowStaff, eventCont.createTechupdate)
// router.post('/:id/create/schedule', helper.allowStaff, eventCont.createSchedule)
// router.post('/:id/create/:team_id/static-schedule', helper.allowStaff, eventCont.createStaticSchedule)
// router.post('/:id/add/team', helper.allowStaff, eventCont.addTeam)
router.post('/create', helper.allowStaff, eventCont.createEvent)
// PUT
router.put('/:id', helper.allowStaff, eventCont.updateEvent)
// router.put('/:id/:team_id/car', helper.allowStaff, eventCont.updateCar)
// router.put('/:id/announcement/:annc_id', helper.allowStaff, eventCont.updateAnnouncement)
// router.put('/:id/livetiming/:lt_id', helper.allowStaff, eventCont.updateLiveTiming)
// router.put('/:id/techupdate/:tu_id', helper.allowStaff, eventCont.updateTechUpdate)
// router.put('/:id/schedule/:sc_id', helper.allowStaff, eventCont.updateSchedule)
// router.put('/:id/static-schedule/:st_id', helper.allowStaff, eventCont.updateStaticSchedule)
// DELETE
router.delete('/:id', helper.allowStaff, eventCont.deleteEvent)
// router.delete('/:id/announcement/:annc_id', helper.allowStaff, eventCont.deleteAnnouncement)
// router.delete('/:id/livetiming/:lt_id', helper.allowStaff, eventCont.deleteLiveTiming)
// router.delete('/:id/techupdate/:tu_id', helper.allowStaff, eventCont.deleteTechUpdate)
// router.delete('/:id/schedule/:sc_id', helper.allowStaff, eventCont.deleteSchedule)
// router.delete('/:id/static-schedule/:st_id', helper.allowStaff, eventCont.deleteStaticSchedule)
// router.delete('/:id/remove/team/:team_id', helper.allowStaff, eventCont.unlinkTeamFromEvent)

module.exports = router;