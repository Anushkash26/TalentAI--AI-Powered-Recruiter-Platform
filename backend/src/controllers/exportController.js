const Profile = require('../models/Profile');

exports.exportResume = async (req, res) => {
  try {
    const profile = await Profile.findOne({ shareId: req.params.shareId })
      .populate('user', 'name email');
    if (!profile) return res.status(404).json({ message: 'Not found' });

    // Return structured JSON — frontend can use this to generate PDF
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 