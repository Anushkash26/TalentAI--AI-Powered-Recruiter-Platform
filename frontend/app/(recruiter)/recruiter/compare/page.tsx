'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, MessageSquare, CheckCircle2, X } from 'lucide-react'

const candidates = [
  {
    id: 1,
    name: 'John Doe',
    title: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    experience: 8,
    match: 98,
    skills: ['React', 'Node.js', 'AWS', 'TypeScript', 'Docker'],
    technical: 9.2,
    communication: 8.5,
    leadership: 9.0,
    availability: 'Immediate',
    salary: '$180-220k',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    title: 'Full Stack Developer',
    location: 'Seattle, WA',
    experience: 5,
    match: 92,
    skills: ['Python', 'React', 'PostgreSQL', 'JavaScript', 'Docker'],
    technical: 8.8,
    communication: 8.0,
    leadership: 7.5,
    availability: '2 weeks',
    salary: '$140-180k',
  },
]

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/recruiter/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Compare Candidates</h1>
          <p className="text-muted-foreground mt-2">Side-by-side comparison of your selected candidates</p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-lg border border-border/40">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 bg-card/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Attribute</th>
                {candidates.map(candidate => (
                  <th key={candidate.id} className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    <div className="min-w-max">{candidate.name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Basic Info */}
              <tr className="border-b border-border/40">
                <td className="px-6 py-4 text-sm font-medium text-muted-foreground">Title</td>
                {candidates.map(candidate => (
                  <td key={candidate.id} className="px-6 py-4 text-sm text-foreground">
                    {candidate.title}
                  </td>
                ))}
              </tr>

              <tr className="border-b border-border/40">
                <td className="px-6 py-4 text-sm font-medium text-muted-foreground">Location</td>
                {candidates.map(candidate => (
                  <td key={candidate.id} className="px-6 py-4 text-sm text-foreground">
                    {candidate.location}
                  </td>
                ))}
              </tr>

              <tr className="border-b border-border/40">
                <td className="px-6 py-4 text-sm font-medium text-muted-foreground">Experience</td>
                {candidates.map(candidate => (
                  <td key={candidate.id} className="px-6 py-4 text-sm text-foreground">
                    {candidate.experience} years
                  </td>
                ))}
              </tr>

              {/* Match Scores */}
              <tr className="border-b border-border/40 bg-primary/5">
                <td className="px-6 py-4 text-sm font-medium text-muted-foreground">Overall Match</td>
                {candidates.map(candidate => (
                  <td key={candidate.id} className="px-6 py-4">
                    <span className="text-lg font-bold text-primary">{candidate.match}%</span>
                  </td>
                ))}
              </tr>

              {/* Skills */}
              <tr className="border-b border-border/40">
                <td className="px-6 py-4 text-sm font-medium text-muted-foreground">Top Skills</td>
                {candidates.map(candidate => (
                  <td key={candidate.id} className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 3).map(skill => (
                        <Badge key={skill} className="text-xs bg-primary/20 text-primary">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 3 && (
                        <Badge className="text-xs">+{candidate.skills.length - 3}</Badge>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Ratings */}
              <tr className="border-b border-border/40">
                <td className="px-6 py-4 text-sm font-medium text-muted-foreground">Technical Skills</td>
                {candidates.map(candidate => (
                  <td key={candidate.id} className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{candidate.technical}</span>
                      <span className="text-xs text-muted-foreground">/10</span>
                    </div>
                  </td>
                ))}
              </tr>

              <tr className="border-b border-border/40">
                <td className="px-6 py-4 text-sm font-medium text-muted-foreground">Communication</td>
                {candidates.map(candidate => (
                  <td key={candidate.id} className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{candidate.communication}</span>
                      <span className="text-xs text-muted-foreground">/10</span>
                    </div>
                  </td>
                ))}
              </tr>

              <tr className="border-b border-border/40">
                <td className="px-6 py-4 text-sm font-medium text-muted-foreground">Leadership</td>
                {candidates.map(candidate => (
                  <td key={candidate.id} className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{candidate.leadership}</span>
                      <span className="text-xs text-muted-foreground">/10</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Availability */}
              <tr className="border-b border-border/40">
                <td className="px-6 py-4 text-sm font-medium text-muted-foreground">Availability</td>
                {candidates.map(candidate => (
                  <td key={candidate.id} className="px-6 py-4 text-sm text-foreground">
                    {candidate.availability}
                  </td>
                ))}
              </tr>

              {/* Salary */}
              <tr className="border-b border-border/40">
                <td className="px-6 py-4 text-sm font-medium text-muted-foreground">Expected Salary</td>
                {candidates.map(candidate => (
                  <td key={candidate.id} className="px-6 py-4 text-sm font-semibold text-foreground">
                    {candidate.salary}
                  </td>
                ))}
              </tr>

              {/* Actions */}
              <tr className="bg-card/50">
                <td className="px-6 py-4 text-sm font-medium text-muted-foreground">Actions</td>
                {candidates.map(candidate => (
                  <td key={candidate.id} className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link href={`/recruiter/candidates/${candidate.id}`}>
                        <Button size="sm" variant="outline" className="border-border/40 hover:bg-secondary/5">
                          View
                        </Button>
                      </Link>
                      <Button size="sm" className="bg-gradient-to-r from-primary to-accent text-white">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Recommendation */}
        <Card className="mt-8 border-border/40 bg-primary/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">AI Recommendation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-foreground">
              <CheckCircle2 className="h-4 w-4 inline mr-2 text-primary" />
              <strong>John Doe</strong> is the better match with a 98% compatibility score. His 8+ years of experience and strong technical background make him an excellent fit for this senior role.
            </p>
            <p className="text-sm text-muted-foreground">
              However, Sarah Chen is a strong secondary candidate and may be more budget-friendly if salary is a constraint.
            </p>
          </CardContent>
        </Card>

        {/* Bottom Actions */}
        <div className="mt-8 flex gap-3">
          <Link href="/recruiter/dashboard" className="flex-1">
            <Button variant="outline" className="w-full border-border/40 hover:bg-secondary/5">
              Back to Dashboard
            </Button>
          </Link>
          <Button className="flex-1 bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg">
            Send to Interview
          </Button>
        </div>
      </div>
    </div>
  )
}
