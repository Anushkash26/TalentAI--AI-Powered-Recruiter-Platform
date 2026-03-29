'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { LogOut, Search, Star, Eye } from 'lucide-react'
import { recruiterAPI } from '@/lib/api'

export default function RecruiterDashboard() {
  const router = useRouter()
  const [candidates, setCandidates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) { router.push('/login'); return }
    const u = JSON.parse(storedUser)
    if (u.role !== 'recruiter') { router.push('/candidate/dashboard'); return }
    setUser(u)
    loadCandidates()
  }, [])

  const loadCandidates = (skill?: string) => {
    setLoading(true)
    recruiterAPI.getCandidates(skill).then(data => {
      setCandidates(Array.isArray(data) ? data : [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    loadCandidates(search)
  }

  const handleShortlist = async (id: string) => {
    await recruiterAPI.toggleShortlist(id)
    loadCandidates(search)
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-foreground">Recruiter Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {user?.name}
            </span>
            <Button variant="ghost" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" /> Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <Input
            placeholder="Search by skill (e.g. React, Python...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-border/40 bg-input"
          />
          <Button type="submit" className="bg-gradient-to-r from-primary to-accent text-white">
            <Search className="h-4 w-4 mr-2" /> Search
          </Button>
          {search && (
            <Button variant="outline" type="button" onClick={() => { setSearch(''); loadCandidates() }}>
              Clear
            </Button>
          )}
        </form>

        {/* Stats */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {loading ? 'Loading...' : `${candidates.length} submitted candidate${candidates.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {/* Candidates */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading candidates...</div>
        ) : candidates.length === 0 ? (
          <Card className="border-border/40 bg-card/50">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground font-medium">No submitted candidates yet.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Candidates will appear here once they submit their profiles.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {candidates.map((candidate: any) => (
              <Card key={candidate._id} className="border-border/40 bg-card/50 hover:border-primary/40 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                        {(candidate.user?.name || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{candidate.user?.name}</p>
                        <p className="text-xs text-muted-foreground">{candidate.user?.email}</p>
                      </div>
                    </div>
                    <button onClick={() => handleShortlist(candidate._id)}>
                      <Star className={`h-5 w-5 transition-colors ${
                        candidate.isShortlisted
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground hover:text-yellow-400'
                      }`} />
                    </button>
                  </div>

                  {/* Completion bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Profile Completion</span>
                      <span className="font-medium text-primary">{candidate.completionScore || 0}%</span>
                    </div>
                    <div className="w-full bg-border/40 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-1.5 rounded-full transition-all"
                        style={{ width: `${candidate.completionScore || 0}%` }}
                      />
                    </div>
                  </div>

                  {/* Skills */}
                  {candidate.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {candidate.skills.slice(0, 3).map((skill: string, i: number) => (
                        <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                      {candidate.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{candidate.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* No skills yet */}
                  {(!candidate.skills || candidate.skills.length === 0) && (
                    <p className="text-xs text-muted-foreground mb-4">No skills listed yet</p>
                  )}

                  <Link href={`/recruiter/candidates/${candidate._id}`}>
                    <Button variant="outline" className="w-full border-border/40 text-sm hover:border-primary/40">
                      <Eye className="h-3 w-3 mr-2" /> View Full Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}