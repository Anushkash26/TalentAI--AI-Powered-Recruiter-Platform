# TalentAI — AI-Powered Recruitment Platform

> No resume uploads. No PDF parsing. Just intelligent, structured profile building powered by AI.

Built for Andhumat Foundation Web Development Internship Assignment.

## 🎯 Problem Statement

Traditional hiring platforms rely on resume PDFs which suffer from:

| Problem | Impact |
|---------|--------|
| ❌ Resume PDF uploads | Poor parsing, lost information |
| ❌ Inconsistent formatting | Bias in screening |
| ❌ Manual review | Time-consuming & inefficient |
| ❌ Unstructured data | Hard to compare candidates |

### ✅ Our Solution
Replace **"Upload Resume"** with **Smart AI Profile Creation** — a conversational AI that guides candidates through building a structured, consistent profile that recruiters can easily evaluate.

---
## 🚀 Live Demo
- Frontend: [Coming Soon]
- Backend API: [Coming Soon]

## 📋 Demo Credentials
| Role | Email | Password |
|------|-------|----------|
| Candidate | hire-me@anshumat.org | HireMe@2025! |
| Recruiter | recruiter@anshumat.org | HireMe@2025! |

## ✨ Features

### For Candidates
- 🤖 AI Profile Builder — Chat with AI to build your profile
- 📊 Progress Tracker — See completion score (0-100%)
- 👁️ Profile Preview — See how recruiters see you
- 🔗 Share Link — Unique public URL for your profile
- 📤 Submit Profile — Send to recruiters

### For Recruiters
- 👥 Candidate Dashboard — Browse all submitted profiles
- 🔍 Search by Skill — Filter candidates by technology
- ⭐ Shortlist — One-click shortlisting
- 👤 Full Profile View — See complete candidate details

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, Tailwind CSS, shadcn/ui |
| Backend | Node.js, Express |
| Database | MongoDB Atlas |
| AI | Groq API (Llama 3.3 70B) |
| Auth | JWT |

## 📁 Project Structure
```
AI-Powered recruitement platform/
├── 📁 frontend/                    # Next.js Application
│   ├── 📁 app/
│   │   ├── 📁 (auth)/
│   │   │   ├── 📁 login/           # Login page
│   │   │   └── 📁 register/        # Register page
│   │   ├── 📁 (candidate)/
│   │   │   ├── 📁 dashboard/       # Candidate dashboard
│   │   │   ├── 📁 profile-builder/ # AI chat interface
│   │   │   └── 📁 preview/         # Profile preview
│   │   └── 📁 (recruiter)/
│   │       ├── 📁 dashboard/       # Recruiter dashboard
│   │       └── 📁 candidates/      # Candidate details
│   ├── 📁 components/ui/           # shadcn/ui components
│   ├── 📁 lib/
│   │   ├── api.ts                  # API utility functions
│   │   └── utils.ts                # Helper functions
│   └── .env.local                  # Frontend env variables
│
├── 📁 backend/                     # Node.js + Express API
│   └── 📁 src/
│       ├── 📁 config/
│       │   └── db.js               # MongoDB connection
│       ├── 📁 controllers/
│       │   ├── authController.js   # Login, Register, Me
│       │   ├── profileController.js# Profile CRUD
│       │   ├── aiController.js     # Groq AI integration
│       │   ├── recruiterController.js # Recruiter actions
│       │   └── exportController.js # Export functions
│       ├── 📁 middleware/
│       │   └── auth.js             # JWT middleware
│       ├── 📁 models/
│       │   ├── User.js             # User schema
│       │   ├── Profile.js          # Profile schema
│       │   └── AIConversation.js   # Chat history schema
│       ├── 📁 routes/              # Express routes
│       └── server.js               # Entry point
│
└── README.md
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Groq API key (free)

### 1. Clone the repo
```bash
git clone https://github.com/Anushkash26/talentai-recruitment.git
cd talentai-recruitment
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Fill in your .env values
npm run seed
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
# Create .env.local with NEXT_PUBLIC_API_URL=http://localhost:5000/api
npm run dev
```

### 4. Environment Variables

**Backend `.env`:**
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
CLIENT_URL=http://localhost:3000
PORT=5000
```

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🌐 Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## 👨‍💻 Author
Built with ❤️ using Next.js + Node.js + Groq AI