const router = require('express').Router();
const { getCandidates, getCandidateById, toggleShortlist, getShortlisted, deleteCandidate } = require('../controllers/recruiterController');
const { protect, recruiterOnly } = require('../middleware/auth');

router.use(protect, recruiterOnly);
router.get('/candidates', getCandidates);
router.get('/candidates/:id', getCandidateById);
router.post('/candidates/:id/shortlist', toggleShortlist);
router.get('/shortlisted', getShortlisted);
router.delete('/candidates/:id', deleteCandidate);

module.exports = router;