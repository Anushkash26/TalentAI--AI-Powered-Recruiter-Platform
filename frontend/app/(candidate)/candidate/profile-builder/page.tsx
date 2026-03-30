'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, LogOut, Send, Sparkles, CheckCircle2 } from 'lucide-react'
import { aiAPI, profileAPI } from '@/lib/api'

const sections = [
  { id: 'personal', label: 'Personal Information' },
  { id: 'experience', label: 'Work Experience' },
  { id: 'skills', label: 'Skills & Expertise' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects & Portfolio' },
]

const WELCOME_MESSAGES: Record<string, string> = {
  personal: "Hi! Let's start with your personal info. What's your full name and current job title?",
  experience: "Let's talk about your work experience. Which companies have you worked at and what were your roles?",
  skills: "What are your main technical skills, tools, and programming languages?",
  education: "Tell me about your educational background. Where did you study and what degree did you get?",
  projects: "Tell me about projects you've built. What did you create, what tech did you use?",
}

type Message = { id: number; type: 'ai' | 'user'; text: string }

function ProfileBuilderContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSection = searchParams.get('section') || 'personal'
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [saved, setSaved] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); return }
    profileAPI.getMyProfile().then(data => setProfile(data))
    setChatMessages([{
      id: 1,
      type: 'ai',
      text: WELCOME_MESSAGES[currentSection] || WELCOME_MESSAGES.personal,
    }])
    setInputValue('')
  }, [currentSection])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return
    const userMsg: Message = { id: chatMessages.length + 1, type: 'user', text: inputValue }
    setChatMessages(prev => [...prev, userMsg])
    setInputValue('')
    setIsLoading(true)
    try {
      const data = await aiAPI.chat(currentSection, inputValue)
      const aiMsg: Message = {
        id: chatMessages.length + 2,
        type: 'ai',
        text: data.message || 'Thanks! I have saved that information.',
      }
      setChatMessages(prev => [...prev, aiMsg])
      profileAPI.getMyProfile().then(updated => {
        setProfile(updated)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      })
    } catch {
      setChatMessages(prev => [...prev, {
        id: chatMessages.length + 2,
        type: 'ai',
        text: 'Sorry, something went wrong. Please try again.',
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  const isSectionComplete = (sectionId: string) => {
    if (!profile) return false
    const keyMap: Record<string, string> = {
      personal: 'personalInfo',
      experience: 'experience',
      skills: 'skills',
      education: 'education',
      projects: 'projects',
    }
    const val = profile[keyMap[sectionId]]
    if (Array.isArray(val)) return val.length > 0
    if (typeof val === 'object' && val !== null) return !!val.name
    return false
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/candidate/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            {saved && <span className="text-xs text-green-500 font-medium">✓ Saved</span>}
            <Button variant="ghost" className="text-muted-foreground" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" /> Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="hidden lg:block space-y-3">
            {sections.map((section, index) => (
              <Link key={section.id} href={`/candidate/profile-builder?section=${section.id}`}>
                <button className={`w-full rounded-lg p-3 text-left transition-all ${
                  currentSection === section.id
                    ? 'bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/40 text-foreground'
                    : 'border border-border/40 text-muted-foreground hover:border-accent/50 hover:bg-card/50'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isSectionComplete(section.id)
                        ? 'bg-green-100 text-green-600'
                        : currentSection === section.id
                        ? 'bg-primary text-white'
                        : 'bg-border text-muted-foreground'
                    }`}>
                      {isSectionComplete(section.id)
                        ? <CheckCircle2 className="h-4 w-4 text-green-500" />
                        : index + 1}
                    </div>
                    <span className="font-medium">{section.label}</span>
                    {isSectionComplete(section.id) && (
                      <span className="ml-auto text-xs text-green-500">✓ Done</span>
                    )}
                  </div>
                </button>
              </Link>
            ))}
            {profile && (
              <div className="mt-4 p-3 rounded-lg border border-border/40 bg-card/50">
                <p className="text-xs text-muted-foreground">Profile Completion</p>
                <p className="text-2xl font-bold text-primary">{profile.completionScore || 0}%</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm flex flex-col h-[600px]">
              <CardHeader className="border-b border-border/40">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-foreground">AI Profile Assistant</CardTitle>
                    <CardDescription>
                      {sections.find(s => s.id === currentSection)?.label}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-sm rounded-lg px-4 py-2 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-primary to-accent text-white'
                        : 'bg-border/40 text-foreground'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-border/40 rounded-lg px-4 py-2">
                      <p className="text-sm text-muted-foreground">AI is thinking...</p>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </CardContent>

              <div className="border-t border-border/40 p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your response..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    className="border-border/40 bg-input text-foreground"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="bg-gradient-to-r from-primary to-accent text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            <div className="mt-4 flex gap-3">
              <Link href="/candidate/dashboard">
                <Button variant="outline" className="border-border/40">← Dashboard</Button>
              </Link>
              <Link href="/candidate/preview" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-primary to-accent text-white">
                  Preview Profile →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProfileBuilder() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ProfileBuilderContent />
    </Suspense>
  )
}