require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://talentai-ai-powered-recruiter-plat.vercel.app',
    /\.vercel\.app$/
  ],
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/Profile'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/recruiter', require('./routes/recruiter'));
app.use('/api/export', require('./routes/export'));

app.get('/', (req, res) => res.json({ status: 'TalentAI API running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));