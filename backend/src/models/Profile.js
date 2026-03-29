const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  shareId: { type: String, default: uuidv4, unique: true },
  status: { type: String, enum: ['draft', 'submitted'], default: 'draft' },
  completionScore: { type: Number, default: 0 },
  aiSummary: String,
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    location: String,
    linkedIn: String,
    github: String,
  },
  experience: [{
    company: String,
    role: String,
    duration: String,
    description: String,
  }],
  skills: [String],
  projects: [{
    name: String,
    description: String,
    techStack: [String],
    link: String,
  }],
  education: [{
    institution: String,
    degree: String,
    year: String,
  }],
  isShortlisted: { type: Boolean, default: false },
}, { timestamps: true });

// Auto-calculate completion score before save
profileSchema.pre('save', function () {
  let score = 0;
  if (this.personalInfo?.name) score += 20;
  if (this.experience?.length > 0) score += 25;
  if (this.skills?.length > 0) score += 20;
  if (this.projects?.length > 0) score += 20;
  if (this.education?.length > 0) score += 15;
  this.completionScore = score;
});

module.exports = mongoose.model('Profile', profileSchema);