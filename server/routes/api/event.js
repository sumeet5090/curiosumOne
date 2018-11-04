const { Router } = require('express')
const router = Router();
const eventCont = require('./../../controllers/event')
// GET
router.get('/', eventCont.getAllEvents)
router.get('/:id', eventCont.getOneEvent)
router.get('/:id/teams', eventCont.getTeamForEvent)
router.get('/:id/announcements', eventCont.getAnnouncementsForEvent)
router.get('/:id/techupdates/:tu_id', eventCont.getOneTechupdate)
router.get('/:id/schedules/:tu_id', eventCont.getOneSchedule)
router.get('/:id/livetimings/:tu_id', eventCont.getOneLivetiming)
router.get('/:id/techupdates', eventCont.getAllTechupdates)
router.get('/:id/schedules', eventCont.getAllSchedules)
router.get('/:id/livetimings', eventCont.getAllLivetimings)
router.get('/:id/cars', eventCont.getAllCars)
// POST
router.post('/:id/create/announcement', eventCont.createAnnouncement)
router.post('/:id/create/:team_id/car', eventCont.createCar)
router.post('/:id/create/:team_id/livetiming', eventCont.createLivetiming)
router.post('/:id/create/:team_id/techupdates', eventCont.createTechupdate)
router.post('/:id/create/schedule', eventCont.createSchedule)
router.post('/:id/add/team', eventCont.addTeam)
router.post('/create', eventCont.createEvent)
// PUT
router.put('/:id', eventCont.updateEvent)
// DELETE
router.delete('/:id', eventCont.deleteEvent)

module.exports = router;