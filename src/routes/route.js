const express = require('express');
const router = express.Router();

router.get('/test', function (req, res) {
    res.send('gadi chalu hai')
});



router.all('/*', function (req, res) {
    res.status(404).send({status: false, message: 'page not found'});
});

module.exports = router;