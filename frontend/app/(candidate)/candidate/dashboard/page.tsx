'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowRight, CheckCircle2, Circle, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { profileAPI } from '@/lib/api'

const sections = [
  { id: 'personal', label: 'Personal Information', key: 'personalInfo' },
  { id: 'experience', label: 'Work Experience', key: 'experience' },
  { id: 'skills', label: 'Skills & Expertise', key: 'skills' },
  { id: 'education', label: 'Education', key: 'education' },
  { id: 'projects', label: 'Projects & Portfolio', key: 'projects' },
]

export default function CandidateDashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

   useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) { router.push('/login'); return }
    const u = JSON.parse(storedUser)
    if (u.role === 'recruiter') { router.push('/recruiter/dashboard'); return }
    setUser(u)
    
    profileAPI.getMyProfile().then(data => {
      setProfile(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  const isSectionComplete = (key: string) => {
    if (!profile) return false
    const val = profile[key]
    if (Array.isArray(val)) return val.length > 0
    if (typeof val === 'object' && val !== null) return !!val.name
    return false
  }

  const completedCount = sections.filter(s => isSectionComplete(s.key)).length
  const completionPercentage = (completedCount / sections.length) * 100

  if (loading) return <div className="min-h-screen flex items-center justify-center text-foreground">Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-foreground">Candidate Dashboard</h1>
          <Button variant="ghost" className="text-muted-foreground" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Progress */}
            <Card className="border-border/40 bg-card/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-foreground">Profile Completion</CardTitle>
                    <CardDescription>{completedCount} of {sections.length} sections completed</CardDescription>
                  </div>
                  <span className="text-2xl font-bold text-primary">{Math.round(completionPercentage)}%</span>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={completionPercentage} className="h-2" />
                <p className="mt-2 text-sm text-muted-foreground">Complete all sections to maximize your visibility</p>
              </CardContent>
            </Card>

            {/* Sections */}
            {sections.map((section) => {
              const completed = isSectionComplete(section.key)
              return (
                <Card key={section.id} className="border-border/40 bg-card/50">
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-3">
                      {completed
                        ? <CheckCircle2 className="h-5 w-5 text-primary" />
                        : <Circle className="h-5 w-5 text-muted-foreground" />}
                      <div>
                        <p className="font-medium text-foreground">{section.label}</p>
                        <p className="text-sm text-muted-foreground">{completed ? 'Completed' : 'Not started'}</p>
                      </div>
                    </div>
                    <Link href="/candidate/profile-builder">
                      <Button variant="ghost" className={completed ? 'text-muted-foreground' : 'text-primary'}>
                        {completed ? 'Edit' : 'Complete'} <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-border/40 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{user?.name || 'Candidate'}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <Link href="/candidate/profile-builder">
                  <Button className="w-full bg-gradient-to-r from-primary to-accent text-white">
                    Edit Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-card/50">
              <CardContent className="p-6">
                <p className="font-medium text-foreground mb-1">Profile Status</p>
                <p className="text-sm text-muted-foreground capitalize">{profile?.status || 'draft'}</p>
                {profile?.status !== 'submitted' && (
                  <Button
                    className="w-full mt-4"
                    variant="outline"
                    onClick={() => profileAPI.submitProfile().then(() => window.location.reload())}
                  >
                    Submit Profile
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}