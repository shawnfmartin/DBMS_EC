var router = require('express').Router();

router.get('/', function (req, res, next) {
    res.send('Welcome to our application. Please use /api to begin.')
});

module.exports = router;