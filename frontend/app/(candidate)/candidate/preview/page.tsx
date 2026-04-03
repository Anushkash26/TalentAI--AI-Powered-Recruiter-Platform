'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, LogOut, MapPin, Mail, Phone, Github, Linkedin, Check, Download, Share2 } from 'lucide-react'
import { profileAPI } from '@/lib/api'

export default function PreviewPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [shareMsg, setShareMsg] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) { router.push('/login'); return }
    setUser(JSON.parse(storedUser))
    profileAPI.getMyProfile().then(data => {
      setProfile(data)
      setLoading(false)
    })
  }, [])

  const handleDownloadPDF = async () => {
    setDownloading(true)
    try {
      const jsPDFModule = await import('jspdf')
      const jsPDF = jsPDFModule.default
      const doc = new jsPDF()
      let y = 20
      const name = profile?.personalInfo?.name || user?.name || 'Candidate'

      doc.setFontSize(22)
      doc.setFont('helvetica', 'bold')
      doc.text(name, 20, y)
      y += 10

      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      const contact = [
        profile?.personalInfo?.email,
        profile?.personalInfo?.phone,
        profile?.personalInfo?.location,
        profile?.personalInfo?.linkedIn,
        profile?.personalInfo?.github,
      ].filter(Boolean).join(' | ')
      if (contact) { doc.text(contact, 20, y); y += 15 }

      if (profile?.skills?.length > 0) {
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.text('Skills', 20, y)
        y += 7
        doc.setFontSize(10)
        doc.setFont('helvetica', 'normal')
        const skillLines = doc.splitTextToSize(profile.skills.join(', '), 170)
        doc.text(skillLines, 20, y)
        y += skillLines.length * 5 + 10
      }

      if (profile?.experience?.length > 0) {
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.text('Work Experience', 20, y)
        y += 7
        profile.experience.forEach((exp: any) => {
          if (y > 270) { doc.addPage(); y = 20 }
          doc.setFontSize(11)
          doc.setFont('helvetica', 'bold')
          doc.text(`${exp.role} - ${exp.company}`, 20, y)
          y += 5
          doc.setFontSize(10)
          doc.setFont('helvetica', 'italic')
          doc.text(exp.duration || '', 20, y)
          y += 5
          doc.setFont('helvetica', 'normal')
          const lines = doc.splitTextToSize(exp.description || '', 170)
          doc.text(lines, 20, y)
          y += lines.length * 5 + 8
        })
      }

      if (profile?.projects?.length > 0) {
        if (y > 250) { doc.addPage(); y = 20 }
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.text('Projects', 20, y)
        y += 7
        profile.projects.forEach((proj: any) => {
          if (y > 270) { doc.addPage(); y = 20 }
          doc.setFontSize(11)
          doc.setFont('helvetica', 'bold')
          doc.text(proj.name || '', 20, y)
          y += 5
          doc.setFontSize(10)
          doc.setFont('helvetica', 'normal')
          const lines = doc.splitTextToSize(proj.description || '', 170)
          doc.text(lines, 20, y)
          y += lines.length * 5 + 5
          if (proj.techStack?.length > 0) {
            doc.text(`Tech: ${proj.techStack.join(', ')}`, 20, y)
            y += 8
          }
        })
      }

      if (profile?.education?.length > 0) {
        if (y > 250) { doc.addPage(); y = 20 }
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.text('Education', 20, y)
        y += 7
        profile.education.forEach((edu: any) => {
          doc.setFontSize(11)
          doc.setFont('helvetica', 'bold')
          doc.text(edu.degree || '', 20, y)
          y += 5
          doc.setFontSize(10)
          doc.setFont('helvetica', 'normal')
          doc.text(`${edu.institution} | ${edu.year}`, 20, y)
          y += 10
        })
      }

      doc.save(`${name}_Resume.pdf`)
    } catch (err) {
      console.error('PDF error:', err)
    } finally {
      setDownloading(false)
    }
  }

  const handleCopyLink = () => {
    const link = `${window.location.origin}/profile/${profile?.shareId}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setShareMsg('Link copied to clipboard!')
    setTimeout(() => { setCopied(false); setShareMsg('') }, 3000)
  }

  const handleShare = async () => {
    const link = `${window.location.origin}/profile/${profile?.shareId}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile?.personalInfo?.name || 'My'} - TalentAI Profile`,
          text: 'Check out my professional profile on TalentAI!',
          url: link,
        })
      } catch (_) { handleCopyLink() }
    } else {
      handleCopyLink()
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    await profileAPI.submitProfile()
    setProfile((prev: any) => ({ ...prev, status: 'submitted' }))
    setSubmitting(false)
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-foreground">
      Loading your profile...
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link href="/candidate/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {profile?.status !== 'submitted' ? (
              <Button onClick={handleSubmit} disabled={submitting}
                className="bg-gradient-to-r from-primary to-accent text-white">
                {submitting ? 'Submitting...' : 'Submit Profile'}
              </Button>
            ) : (
              <Badge className="bg-green-100 text-green-700 px-3 py-1">✓ Submitted</Badge>
            )}
            <Button variant="outline" onClick={handleDownloadPDF} disabled={downloading}>
              <Download className="h-4 w-4 mr-2" />
              {downloading ? 'Generating...' : 'Download PDF'}
            </Button>
            <Button variant="outline" onClick={handleShare}>
              {copied
                ? <><Check className="h-4 w-4 mr-2 text-green-500" /> Copied!</>
                : <><Share2 className="h-4 w-4 mr-2" /> Share Profile</>
              }
            </Button>
            <Button variant="ghost" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {shareMsg && (
        <div className="bg-green-50 border-b border-green-200 text-green-700 text-sm text-center py-2">
          🔗 {shareMsg}
        </div>
      )}

      <div id="resume-content" className="mx-auto max-w-4xl px-4 py-8 space-y-6">
        <Card className="border-border/40 bg-white">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold shrink-0">
                {(profile?.personalInfo?.name || user?.name || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground">
                  {profile?.personalInfo?.name || user?.name || 'Your Name'}
                </h1>
                <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  {profile?.personalInfo?.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{profile.personalInfo.email}</span>}
                  {profile?.personalInfo?.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{profile.personalInfo.phone}</span>}
                  {profile?.personalInfo?.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{profile.personalInfo.location}</span>}
                  {profile?.personalInfo?.github && <span className="flex items-center gap-1"><Github className="h-3 w-3" />{profile.personalInfo.github}</span>}
                  {profile?.personalInfo?.linkedIn && <span className="flex items-center gap-1"><Linkedin className="h-3 w-3" />{profile.personalInfo.linkedIn}</span>}
                </div>
                {profile?.aiSummary && <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{profile.aiSummary}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {profile?.skills?.length > 0 && (
          <Card className="border-border/40 bg-white">
            <CardHeader><CardTitle className="text-foreground">Skills</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {profile.skills.map((skill: string, i: number) => (
                <Badge key={i} variant="secondary">{skill}</Badge>
              ))}
            </CardContent>
          </Card>
        )}

        {profile?.experience?.length > 0 && (
          <Card className="border-border/40 bg-white">
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

        {profile?.projects?.length > 0 && (
          <Card className="border-border/40 bg-white">
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

        {profile?.education?.length > 0 && (
          <Card className="border-border/40 bg-white">
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

        {!profile?.skills?.length && !profile?.experience?.length && !profile?.projects?.length && (
          <Card className="border-border/40 bg-card/50">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">Your profile is empty.</p>
              <Link href="/candidate/profile-builder">
                <Button className="mt-4 bg-gradient-to-r from-primary to-accent text-white">
                  Build Profile with AI →
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}