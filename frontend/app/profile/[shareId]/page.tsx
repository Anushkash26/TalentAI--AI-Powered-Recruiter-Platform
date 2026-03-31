'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Mail, Phone, Github, Linkedin, Sparkles } from 'lucide-react'
import { profileAPI } from '@/lib/api'

export default function PublicProfilePage() {
  const params = useParams()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    profileAPI.getPublicProfile(params.shareId as string)
      .then(data => {
        if (data.message === 'Profile not found') {
          setNotFound(true)
        } else {
          setProfile(data)
        }
        setLoading(false)
      })
      .catch(() => {
        setNotFound(true)
        setLoading(false)
      })
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      Loading profile...
    </div>
  )

  if (notFound) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">Profile not found</h1>
        <p className="text-muted-foreground mt-2">This profile may have been removed or the link is invalid.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <div className="border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">TalentAI</span>
          </div>
          <span className="text-sm text-muted-foreground">Public Profile</span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
        {/* Personal Info */}
        <Card className="border-border/40 bg-card/50">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold shrink-0">
                {(profile?.personalInfo?.name || profile?.user?.name || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground">
                  {profile?.personalInfo?.name || profile?.user?.name}
                </h1>
                <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  {profile?.personalInfo?.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />{profile.personalInfo.email}
                    </span>
                  )}
                  {profile?.personalInfo?.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />{profile.personalInfo.phone}
                    </span>
                  )}
                  {profile?.personalInfo?.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />{profile.personalInfo.location}
                    </span>
                  )}
                  {profile?.personalInfo?.github && (
                    <a href={profile.personalInfo.github} target="_blank" className="flex items-center gap-1 hover:text-primary">
                      <Github className="h-3 w-3" />{profile.personalInfo.github}
                    </a>
                  )}
                  {profile?.personalInfo?.linkedIn && (
                    <a href={profile.personalInfo.linkedIn} target="_blank" className="flex items-center gap-1 hover:text-primary">
                      <Linkedin className="h-3 w-3" />{profile.personalInfo.linkedIn}
                    </a>
                  )}
                </div>
                {profile?.aiSummary && (
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {profile.aiSummary}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        {profile?.skills?.length > 0 && (
          <Card className="border-border/40 bg-card/50">
            <CardHeader><CardTitle className="text-foreground">Skills</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {profile.skills.map((skill: string, i: number) => (
                <Badge key={i} variant="secondary">{skill}</Badge>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Experience */}
        {profile?.experience?.length > 0 && (
          <Card className="border-border/40 bg-card/50">
            <CardHeader><CardTitle className="text-foreground">Work Experience</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {profile.experience.map((exp: any, i: number) => (
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
        {profile?.projects?.length > 0 && (
          <Card className="border-border/40 bg-card/50">
            <CardHeader><CardTitle className="text-foreground">Projects</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {profile.projects.map((proj: any, i: number) => (
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
        {profile?.education?.length > 0 && (
          <Card className="border-border/40 bg-card/50">
            <CardHeader><CardTitle className="text-foreground">Education</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {profile.education.map((edu: any, i: number) => (
                <div key={i} className="border-l-2 border-primary/30 pl-4">
                  <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground">{edu.institution} · {edu.year}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}