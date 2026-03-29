const router = require('express').Router();
const { getMyProfile, updateMyProfile, submitProfile, getPublicProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/auth');

router.get('/me', protect, getMyProfile);
router.put('/me', protect, updateMyProfile);
router.post('/submit', protect, submitProfile);
router.get('/share/:id', getPublicProfile); // public

module.exports = router;