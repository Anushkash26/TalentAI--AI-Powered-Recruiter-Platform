const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const getToken = () => localStorage.getItem('token')

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
})

// AUTH
export const authAPI = {
  login: (email: string, password: string) =>
    fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(r => r.json()),

  register: (name: string, email: string, password: string, role: string) =>
    fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    }).then(r => r.json()),

  getMe: () =>
    fetch(`${API_BASE}/auth/me`, { headers: headers() }).then(r => r.json()),
}

// PROFILE
export const profileAPI = {
  getMyProfile: () =>
    fetch(`${API_BASE}/profile/me`, { headers: headers() }).then(r => r.json()),

  updateProfile: (data: object) =>
    fetch(`${API_BASE}/profile/me`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(r => r.json()),

  submitProfile: () =>
    fetch(`${API_BASE}/profile/submit`, {
      method: 'POST',
      headers: headers(),
    }).then(r => r.json()),

  getPublicProfile: (shareId: string) =>
    fetch(`${API_BASE}/profile/share/${shareId}`).then(r => r.json()),
}

// AI
export const aiAPI = {
  chat: (section: string, message: string) =>
    fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ section, message }),
    }).then(r => r.json()),

  generateSummary: () =>
    fetch(`${API_BASE}/ai/generate-summary`, {
      method: 'POST',
      headers: headers(),
    }).then(r => r.json()),

  suggestSkills: (role: string) =>
    fetch(`${API_BASE}/ai/suggest-skills`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ role }),
    }).then(r => r.json()),
}

// RECRUITER
export const recruiterAPI = {
  getCandidates: (skill?: string) =>
    fetch(`${API_BASE}/recruiter/candidates${skill ? `?skill=${skill}` : ''}`, {
      headers: headers(),
    }).then(r => r.json()),

  getCandidateById: (id: string) =>
    fetch(`${API_BASE}/recruiter/candidates/${id}`, {
      headers: headers(),
    }).then(r => r.json()),

  toggleShortlist: (id: string) =>
    fetch(`${API_BASE}/recruiter/candidates/${id}/shortlist`, {
      method: 'POST',
      headers: headers(),
    }).then(r => r.json()),

  getShortlisted: () =>
    fetch(`${API_BASE}/recruiter/shortlisted`, {
      headers: headers(),
    }).then(r => r.json()),

    deleteCandidate: (id: string) =>
    fetch(`${API_BASE}/recruiter/candidates/${id}`, {
      method: 'DELETE',
      headers: headers(),
    }).then(r => r.json()),
}
