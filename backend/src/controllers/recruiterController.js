const Profile = require('../models/Profile');

exports.getCandidates = async (req, res) => {
  try {
    const { skill } = req.query;
    const filter = { status: 'submitted' };
    if (skill) filter.skills = { $in: [new RegExp(skill, 'i')] };

    const profiles = await Profile.find(filter)
      .populate('user', 'name email')
      .sort('-updatedAt');
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCandidateById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate('user', 'name email');
    if (!profile) return res.status(404).json({ message: 'Not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleShortlist = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Not found' });
    profile.isShortlisted = !profile.isShortlisted;
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getShortlisted = async (req, res) => {
  try {
    const profiles = await Profile.find({ isShortlisted: true, status: 'submitted' })
      .populate('user', 'name email');
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};