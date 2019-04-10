const router = require('express').Router()
const Team = require('./../../models/team.model')
const path = require('path')
const crypto = require('crypto')
const fs = require('fs')
const rimraf = require('rimraf')
const { Parser } = require('json2csv')
const JSON2CSV = require('json-2-csv');

router.use(require('express-fileupload')())
let DOWNLOADS_DIR = path.resolve('downloads/')
fs.readdir(DOWNLOADS_DIR, function(err, files){
  if(err){
    return console.log(err)
  }
  files.forEach((file, index) => {
    if(file !== '.gitignore'){
      fs.stat(path.join(DOWNLOADS_DIR, file), (erStat, stat) => {
        let endTime, now
        if(erStat){
          return console.log(erStat);
        }
        now = new Date().getTime()
        endTime = new Date(stat.ctime).getTime() + 3600000
        if(now > endTime){
          return rimraf(path.join(DOWNLOADS_DIR, file), (errRimRaf) => {
            if(errRimRaf){
              return console.log(errRimRaf);
            }
            console.log("Deleted files older than 1 hour.");
          })
        }
      })
    }
  })
})

router.get('/event-team-csv', (req, res, next) => {
  let teams = Team.find({}, (err, teams) => {
    if (err) {
      console.log(err);
      return res.send({
        message: "Internal server error"
      })
    }
    if (teams) {
      const fields = ['_id', 'team_name', 'category', 'country', 'drive_folder', 'institution.address', 'institution.name', 'institution.short_name', 'logo', 'social.facebook', 'social.instagram', 'social.twitter', 'website_url', 'former_name']
      JSON2CSV.json2csv(teams, (err, csv) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Internal server error."
          })
        }
        if (csv) {
          let fname = 'downloads/team-' + crypto.randomBytes(8).toString('hex') + '.csv'
          let filename = path.resolve(fname)
          console.log(filename);
          fs.writeFileSync(fname, csv)
          res.locals.filename = fname
          res.sendFile(filename, {}, (err) => {
            if (err) {
              next(err);
            } else {
              console.log('Sent:', filename);
            }
          })
        }
      },
        {
          // delimiter: {
          //   field: ',',
          //   wrap: '"',
          //   eol: '\n'
          // },
          keys: fields,
          emptyFieldValue: '',
          expandArrayObjects: true
        })
    }
  })
}, (req, res) => {
  return res.send({
    success: false,
    message: "Some error occured."
  })  
})

router.post('/event-team-csv', function (req, res) {
  let file = req.files.file
  if (file && file.data) {
    let csv = file.data.toString('utf8')
    let x = csv.split('\n')
    return res.send({
      success: true,
      message: "File uploaded"
    })
  }
  return res.send({
    success: false,
    message: "File didn't reach the server."
  })

  // Team.find().then((teams) => {
  //   if(teams) {
  //     console.log(csv())
  //     return res.send(csv(teams))
  //   }
  // })
})

module.exports = router