const { Router } = require('express')
const router = Router();
const TeamController = require('./../../controllers/team')
const passport = require('passport')

const Event = require('./../../models/event.model')
const Announcement = require('./../../models/announcement.model')
const Team = require('./../../models/team.model')

router.get('/', TeamController.getAll)
router.post('/create', TeamController.create)
router.post('/:id/register/event/:event_id', async (req, res) => {
    try {
        let team_id = req.params.id,
            event_id = req.params.event_id,
            team, event, event_list, team2event = false, event2team = false
        team = await Team.findOne({ _id: team_id })
        if (team) {
            event = await Event.findOne({ _id: event_id })
            if (event) {
                if (event.teams.indexOf(team_id) > -1) {
                    event2team = true
                } else {
                    let output = await event.updateOne({ $push: { teams: team_id } }, { new: true }).exec()
                    if (output.nModified >= 1 && output.ok == 1) {
                        event2team = true
                    }
                }
                if (team.events.indexOf(event._id) > -1) {
                    team2event = true
                } else {
                    let output = await team.updateOne({ $push: { events: event._id } }, { new: true }).exec()
                    if (output.nModified >= 1 && output.ok == 1) {
                        team2event = true
                    }
                }
                if(team2event && event2team) {
                    return res.send({
                        message: "Successfully linked team and events."
                    })
                } return res.send({
                    message: "Couldn't link team and event."
                })
            }
            return res.sendStatus(404)
        }
        return res.sendStatus(404)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})
router.get('/:id', TeamController.getOne)
router.put('/:id', TeamController.updateTeam)
router.delete('/:id', TeamController.deleteTeam)

module.exports = router;