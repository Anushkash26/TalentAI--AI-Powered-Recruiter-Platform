const router = require('express').Router();
const { chat, generateSummary, suggestSkills } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.post('/chat', protect, chat);
router.post('/generate-summary', protect, generateSummary);
router.post('/suggest-skills', protect, suggestSkills);

module.exports = router;