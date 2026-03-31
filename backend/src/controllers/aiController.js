const Groq = require('groq-sdk')
const AIConversation = require('../models/AIConversation')
const Profile = require('../models/Profile')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SECTION_PROMPTS = {
  personal: `You are a recruitment assistant helping a candidate fill their personal information.
Ask for their full name, email, phone, location, LinkedIn and GitHub profiles.
Be conversational and friendly. After collecting info, output structured JSON wrapped in <extracted></extracted> tags like:
<extracted>{"personalInfo": {"name":"...","email":"...","phone":"...","location":"...","linkedIn":"...","github":"..."}}</extracted>`,

  experience: `You are a recruitment assistant helping a candidate describe their work experience.
Ask about companies they worked at, their roles, durations, and key responsibilities.
Be conversational. After gathering info, output structured JSON wrapped in <extracted></extracted> tags like:
<extracted>{"experience": [{"company":"...","role":"...","duration":"...","description":"..."}]}</extracted>`,

   skills: `You are a recruitment assistant helping identify a candidate's skills.
Ask about their technical skills, tools, and languages.
Be conversational and friendly.

CRITICAL RULE: You MUST output skills as a FLAT array only.
NEVER use nested objects or categories like "programming_languages", "frontend", "backend".
ALWAYS use exactly this format and nothing else:

<extracted>{"skills": ["JavaScript", "Python", "React.js", "Node.js", "MongoDB"]}</extracted>

Put ALL skills in ONE single flat array regardless of category.
Do not group them. Do not use nested objects. Just one flat list under "skills" key.`,  

  projects: `You are a recruitment assistant helping describe candidate projects.
Ask about project names, what they built, tech stack used, and links.
Be conversational. Output structured JSON wrapped in <extracted></extracted> tags like:
<extracted>{"projects": [{"name":"...","description":"...","techStack":["..."],"link":"..."}]}</extracted>`,

  education: `You are a recruitment assistant helping document education history.
Ask about institutions, degrees, and years.
Be conversational. Output structured JSON wrapped in <extracted></extracted> tags like:
<extracted>{"education": [{"institution":"...","degree":"...","year":"..."}]}</extracted>`,
}

exports.chat = async (req, res) => {
  try {
    const { section, message } = req.body
    const userId = req.user._id

    // Get or create conversation
    let convo = await AIConversation.findOne({ user: userId, section })
    if (!convo) convo = await AIConversation.create({ user: userId, section, messages: [] })

    // Add user message
    convo.messages.push({ role: 'user', content: message })

    // Build messages for Groq
    const messages = [
      { role: 'system', content: SECTION_PROMPTS[section] || SECTION_PROMPTS.experience },
      ...convo.messages.map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
      })),
    ]

    // Call Groq
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      max_tokens: 1024,
    })

    const assistantMessage = completion.choices[0].message.content

    // Save assistant response
    convo.messages.push({ role: 'assistant', content: assistantMessage })
    await convo.save()

    // Extract structured data if present
    const extractMatch = assistantMessage.match(/<extracted>([\s\S]*?)<\/extracted>/)
    if (extractMatch) {
      try {
        const extracted = JSON.parse(extractMatch[1])
        const profile = await Profile.findOne({ user: userId })
        if (profile) {
          Object.assign(profile, extracted)
          await profile.save()
        }
      } catch (_) {}
    }

    res.json({ message: assistantMessage, conversationId: convo._id })
  } catch (err) {
    console.error('Groq error:', err)
    res.status(500).json({ message: err.message })
  }
}

exports.generateSummary = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id })
    if (!profile) return res.status(404).json({ message: 'Profile not found' })

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{
        role: 'user',
        content: `Write a 2-3 sentence professional summary for this candidate: ${JSON.stringify(profile)}`,
      }],
      max_tokens: 300,
    })

    const summary = completion.choices[0].message.content
    await Profile.findOneAndUpdate({ user: req.user._id }, { aiSummary: summary })
    res.json({ summary })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.suggestSkills = async (req, res) => {
  try {
    const { role } = req.body
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{
        role: 'user',
        content: `List 10 key skills for a "${role}" role as a JSON array. Return ONLY the JSON array, nothing else.`,
      }],
      max_tokens: 200,
    })

    const text = completion.choices[0].message.content.replace(/```json|```/g, '').trim()
    const skills = JSON.parse(text)
    res.json({ skills })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}