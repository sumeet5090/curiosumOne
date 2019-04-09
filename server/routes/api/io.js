const router = require('express').Router()
const csv = require('csv-parser')
const Team = require('./../../models/team.model')
const path = require('path')
const fs = require('fs')
router.use(require('express-fileupload')())
const { Parser } = require('json2csv');

router.get('/event-team-csv', (req, res) => {
  let teams = Team.find({}, (err, teams) => {
    if (err) {
      console.log(err);
      return res.send({
        message: "Internal server error"
      })
    }
    if (teams) {
      console.log(teams.length)
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'download-' + Date.now() + '.csv\"');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Pragma', 'no-cache');
      const fields = ['_id', 'team_name', 'category', 'country', 'drive_folder', 'institution.address', 'institution.name', 'institution.short_name', 'logo', 'social.facebook', 'social.instagram', 'social.twitter', 'website_url', 'former_name']
      const parser = new Parser({ fields })
      const _csv =  parser.parse(teams)
      let filename = path.resolve(`downloads/team-${Date.now()}.csv`)
      console.log(filename);
      fs.writeFileSync(filename, _csv)
      return res.download(filename)
    }
    return res.send({
      message: "No teams found"
    })
  })
})

router.post('/event-team-csv', function (req, res) {
  let file = req.files.file
  if (file && file.data) {
    let csv = file.data.toString('utf8')
    let x = csv.split('\n')
    x.forEach(c => {
      console.log(c)
    })
  }

  // Team.find().then((teams) => {
  //   if(teams) {
  //     console.log(csv())
  //     return res.send(csv(teams))
  //   }
  // })
})

module.exports = router