'use client'

import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Star, MapPin, Mail, Phone, Github, Linkedin } from 'lucide-react'
import { recruiterAPI } from '@/lib/api'

export default function CandidateDetail() {
  const router = useRouter()
  const params = useParams()
  const [candidate, setCandidate] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); return }

    recruiterAPI.getCandidateById(params.id as string).then(data => {
      setCandidate(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const handleShortlist = async () => {
    await recruiterAPI.toggleShortlist(params.id as string)
    setCandidate((prev: any) => ({ ...prev, isShortlisted: !prev.isShortlisted }))
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!candidate) return <div className="min-h-screen flex items-center justify-center">Candidate not found</div>

  const { user, personalInfo, experience, skills, projects, education, aiSummary, completionScore, isShortlisted } = candidate

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/recruiter/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Candidates
          </Link>
          <button onClick={handleShortlist} className="flex items-center gap-2 text-sm font-medium">
            <Star className={`h-5 w-5 transition-colors ${isShortlisted ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
            {isShortlisted ? 'Shortlisted' : 'Shortlist'}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        {/* Hero */}
        <Card className="border-border/40 bg-card/50">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold shrink-0">
                {(personalInfo?.name || user?.name || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">
                      {personalInfo?.name || user?.name}
                    </h1>
                    <p className="text-primary font-medium">{user?.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">{completionScore}%</p>
                    <p className="text-xs text-muted-foreground">Profile Complete</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  {personalInfo?.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{personalInfo.email}</span>}
                  {personalInfo?.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{personalInfo.phone}</span>}
                  {personalInfo?.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{personalInfo.location}</span>}
                  {personalInfo?.github && <span className="flex items-center gap-1"><Github className="h-3 w-3" />{personalInfo.github}</span>}
                  {personalInfo?.linkedIn && <span className="flex items-center gap-1"><Linkedin className="h-3 w-3" />{personalInfo.linkedIn}</span>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Summary */}
        {aiSummary && (
          <Card className="border-border/40 bg-card/50">
            <CardHeader><CardTitle className="text-foreground">AI Summary</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{aiSummary}</p>
            </CardContent>
          </Card>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <Card className="border-border/40 bg-card/50">
            <CardHeader><CardTitle className="text-foreground">Skills</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {skills.map((skill: string, i: number) => (
                <Badge key={i} variant="secondary">{skill}</Badge>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <Card className="border-border/40 bg-card/50">
            <CardHeader><CardTitle className="text-foreground">Work Experience</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {experience.map((exp: any, i: number) => (
                <div key={i} className="border-l-2 border-primary/30 pl-4">
                  <h3 className="font-semibold text-foreground">{exp.role}</h3>
                  <p className="text-sm text-primary">{exp.company} · {exp.duration}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <Card className="border-border/40 bg-card/50">
            <CardHeader><CardTitle className="text-foreground">Projects</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {projects.map((proj: any, i: number) => (
                <div key={i} className="border-l-2 border-accent/30 pl-4">
                  <h3 className="font-semibold text-foreground">{proj.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{proj.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {proj.techStack?.map((tech: string, j: number) => (
                      <Badge key={j} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <Card className="border-border/40 bg-card/50">
            <CardHeader><CardTitle className="text-foreground">Education</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {education.map((edu: any, i: number) => (
                <div key={i} className="border-l-2 border-primary/30 pl-4">
                  <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground">{edu.institution} · {edu.year}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Empty */}
        {!skills?.length && !experience?.length && !projects?.length && (
          <Card className="border-border/40 bg-card/50">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">This candidate hasn't filled their profile yet.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}