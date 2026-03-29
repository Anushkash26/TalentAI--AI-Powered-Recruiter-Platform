const router = require('express').Router();
const { exportResume } = require('../controllers/exportController');

router.get('/resume/:shareId', exportResume);

module.exports = router;