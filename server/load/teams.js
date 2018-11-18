const Team = require('./../models/team.model')
const teams = require('./../../data/mec_teams')


const loadTeams = async () => {
    try {
        let insertedTeams = await Team.insertMany(teams)
        if(insertedTeams && insertedTeams.length > 0) {
            console.log(`Inserted ${insertedTeams.length} teams`)
        } else {
            console.log("Failed to insert teams.")
        }
    } catch (error) {
        console.log(error)
        return;
    }
}

module.exports = loadTeams