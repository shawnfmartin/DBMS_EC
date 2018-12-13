let gameDao = require('./daos/gameDao')
let postDao = require('./daos/postDao')
let teamDao = require('./daos/teamDao')
let userDao = require('./daos/userDao')

const gameModel = require('./models/Game');
const postModel = require('./models/Post');
const teamModel = require('./models/Team');
const userModel = require('./models/User');

const assert = require('assert');

truncateDatabase = () => {
    return Promise.all([
        gameModel.deleteMany({}),
        postModel.deleteMany({}),
        teamModel.deleteMany({}),
        userModel.deleteMany({})
    ]);
};

module.exports = {
    truncateDatabase
};
