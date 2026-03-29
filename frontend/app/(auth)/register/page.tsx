'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { authAPI } from '@/lib/api'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('candidate')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const data = await authAPI.register(name, email, password, role)
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        router.push(role === 'recruiter' ? '/recruiter/dashboard' : '/candidate/dashboard')
      } else {
        setError(data.message || 'Registration failed')
      }
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">TalentAI</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-foreground">Create Account</CardTitle>
            <CardDescription>Join TalentAI and get started today</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              {error && <p className="text-sm text-red-500 bg-red-50 p-2 rounded">{error}</p>}

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <Input placeholder="John Doe" value={name}
                  onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input type="email" placeholder="your@email.com" value={email}
                  onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input type="password" placeholder="••••••••" value={password}
                  onChange={(e) => setPassword(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">I am a...</label>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setRole('candidate')}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      role === 'candidate'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border/40 text-muted-foreground hover:border-primary/50'
                    }`}>
                    👤 Candidate
                  </button>
                  <button type="button" onClick={() => setRole('recruiter')}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      role === 'recruiter'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border/40 text-muted-foreground hover:border-primary/50'
                    }`}>
                    🏢 Recruiter
                  </button>
                </div>
              </div>

              <Button type="submit" disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-accent text-white">
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/login" className="font-medium text-primary hover:text-accent">Sign in</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}