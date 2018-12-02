const { Router } = require('express')
const router = Router();
const helper = require('./../../auth/helper')
const eventCont = require('./../../controllers/event')
// GET
router.get('/', eventCont.getAllEvents)
router.get('/:id', eventCont.getOneEvent)
router.get('/:id/teams', eventCont.getTeamForEvent)
router.get('/:id/announcements', eventCont.getAnnouncementsForEvent)
router.get('/:id/techupdates/:tu_id', eventCont.getOneTechupdate)
router.get('/:id/schedules/:sc_id', eventCont.getOneSchedule)
router.get('/:id/livetimings/:lt_id', eventCont.getOneLivetiming)
router.get('/:id/techupdates', eventCont.getAllTechupdates)
router.get('/:id/schedules', eventCont.getAllSchedules)
router.get('/:id/livetimings', eventCont.getAllLivetimings)
router.get('/:id/cars', eventCont.getAllCars)
router.get('/:id/:team_id/car', eventCont.getTeamCar)
// router.get('/:event_name', eventCont.getOneEventByName)
// POST
router.post('/:id/create/announcement', helper.hasRole("admin"), eventCont.createAnnouncement)
router.post('/:id/create/:team_id/car', helper.hasRole("admin"), eventCont.createCar)
router.post('/:id/create/:team_id/livetiming', helper.hasRole("admin"), eventCont.createLivetiming)
router.post('/:id/create/:team_id/techupdate', helper.hasRole("admin"), eventCont.createTechupdate)
router.post('/:id/create/schedule', helper.hasRole("admin"), eventCont.createSchedule)
router.post('/:id/add/team', helper.hasRole("admin"), eventCont.addTeam)
router.post('/create', helper.hasRole("admin"), eventCont.createEvent)
// PUT
router.put('/:id', helper.hasRole("admin"), eventCont.updateEvent)
router.put('/:id/:team_id/car', helper.hasRole("admin"), eventCont.updateCar)
// DELETE
router.delete('/:id', helper.hasRole("admin"), eventCont.deleteEvent)

module.exports = router;