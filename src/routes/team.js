let router = require('express').Router(),
  Team = require('./../models/team.model')

/* GET teams listing. */
router.get('/', async(req, res) => {
  // TODO: Parse search options, maybe req.params.id or ?name=""
  try {
    let teams = await Team
      .find()
      .populate('users')
      .populate('events')
      .exec()
    if (!teams) {
      return res.send({message: "No teams found!"})
    }
    return res.send({teams})
  } catch (error) {
    console.error(error)
  }
});

router.get('/:id', async(req, res) => {
  // Sends user profile data
  // TODO: User Profile
  let team_id = req.params.id
  try {
    let team = await Team
      .findOne({_id: team_id})
      .populate('users')
      .populate('events')
      .exec()
    if (!team) {
      return res.send({message: "No such team found"})
    }
    return res.send({team})
  } catch (err) {
    return res
      .status(500)
      .send({message: "Some error occured."})
  }
});
// Add Auth Middleware and Role Checking Where needed Passing variables between
// middlewares req.locals.name = 'xd'
// https://stackoverflow.com/questions/18875292/passing-variables-to-the-next-mi
// d dleware-using-next-in-express-js
router.post('/create', async(req, res) => {
  let body = req.body
  try {
    let newTeam = {
      team_name: body.team_name || "Testing123",
      team_location: body.team_location || "Mumbai, India",
      institution_name: body.institution_name || "Mumbai University",
      institution_address: body.institution_address || "CST, Mumbai",
      team_bio: body.team_bio || "We Will We Will Test you",
      team_logo_url: body.team_logo_url || "",
      // events: [],
      users: [body.user_1, body.user_2, body.user_3, body.user_4] || [
        '5b9b5d4c8cd30c2a445ca822', '5b97f2127c241624682a0a65'
      ],
      captain_id: body.user_1 || '5b97f2127c241624682a0a65'
    };
    let team = await new Team(newTeam).save()
    if (!team) {
      return res.send({message: "Couldn't create the team"})
    }
    return res.send({team})
  } catch (err) {
    return res
      .status(500)
      .send({message: "Some error occured."})
  }
})

// Verify Team Captain / Site Moderator
router.put('/update/:id', async(req, res) => {
  let team_id = req.params.id,
    body = req.body
  try {
    let team = await Team.findOneAndUpdate({
      _id: team_id
    }, body, {new: true})
    if (!team) {
      return res.send({message: "Team not found."})
    }
    return res.send({team})
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .send({message: "Some internal error."})
  }
})
// TODO: Auth Middleware
router.delete('/delete/:id', async(req, res) => {
  let team_id = req.params.id
  try {
    let deletedTeam = await Team.findOneAndRemove({_id: team_id})
    if (!deletedTeam) {
      return res.send({message: "Couldn't delete team."})
    }
    return res.send({deletedTeam})
  } catch (error) {
    return res
      .status(500)
      .send({message: "Some internal error."})
  }
})

module.exports = router;