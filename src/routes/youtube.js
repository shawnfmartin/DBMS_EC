var router = require('express').Router();

router.get('/', function (req, res, next) {
    res.redirect('http://www.youtube.com');
});

module.exports = router;