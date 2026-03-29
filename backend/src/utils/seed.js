require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user');
const Profile = require('../models/Profile');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  await User.deleteMany({});
  await Profile.deleteMany({});

  const candidate = await User.create({
    name: 'Demo Candidate',
    email: 'hire-me@anshumat.org',
    password: 'HireMe@2025!',
    role: 'candidate',
  });
  await Profile.create({ user: candidate._id });

  await User.create({
    name: 'Demo Recruiter',
    email: 'recruiter@anshumat.org',
    password: 'HireMe@2025!',
    role: 'recruiter',
  });

  console.log('Seeded successfully!');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });