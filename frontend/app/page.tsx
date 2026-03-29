'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Users, Brain, BarChart3, Shield, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">TalentAI</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-foreground hover:bg-secondary/10">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/20">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent">Powered by Advanced AI</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Find Your Perfect Talent Match
              </h1>
              <p className="text-lg text-muted-foreground sm:text-xl">
                TalentAI revolutionizes recruitment with intelligent candidate matching and AI-powered profile building. Connect with top talent effortlessly.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="w-full bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/30 sm:w-auto">
                  Start Recruiting <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/register?role=candidate">
                <Button size="lg" variant="outline" className="w-full border-border hover:bg-secondary/5 sm:w-auto">
                  Build Your Profile
                </Button>
              </Link>
            </div>
            <div className="space-y-3 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span>AI-powered candidate matching</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span>Smart profile builder with instant insights</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span>Real-time candidate comparison tools</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative h-96 lg:h-full">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />
            <div className="relative space-y-4 rounded-2xl border border-border/40 bg-gradient-to-br from-card to-card/50 p-8 backdrop-blur-sm">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">AI Assistant</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Let our AI help you build the perfect candidate profile with intelligent suggestions and insights.
                </p>
              </div>
              <div className="space-y-2 pt-4">
                <div className="h-2 rounded-full bg-border" />
                <div className="h-2 rounded-full bg-border" />
                <div className="h-2 w-2/3 rounded-full bg-border" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Powerful Features for Modern Recruiting
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to find, evaluate, and hire the best talent
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-xl border border-border/40 bg-card p-8 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Intelligent Matching</h3>
              <p className="text-muted-foreground">
                Our AI analyzes skills, experience, and cultural fit to recommend the perfect candidates for your roles.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl border border-border/40 bg-card p-8 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Collaboration Tools</h3>
              <p className="text-muted-foreground">
                Compare candidates side-by-side, share feedback with your team, and make better hiring decisions together.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl border border-border/40 bg-card p-8 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Analytics & Insights</h3>
              <p className="text-muted-foreground">
                Track hiring metrics, analyze candidate quality, and optimize your recruitment process with data-driven insights.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-xl border border-border/40 bg-card p-8 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Smart Profile Builder</h3>
              <p className="text-muted-foreground">
                Candidates can create comprehensive profiles with AI-powered suggestions and instant AI-generated summaries.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-xl border border-border/40 bg-card p-8 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Secure & Trusted</h3>
              <p className="text-muted-foreground">
                Enterprise-grade security ensures all candidate data and company information is protected and private.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-xl border border-border/40 bg-card p-8 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Real-time Updates</h3>
              <p className="text-muted-foreground">
                Get instant notifications when new candidates match your criteria or when candidates update their profiles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-accent/30 bg-gradient-to-r from-primary/10 to-accent/10 p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Ready to Transform Your Recruiting?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Join hundreds of companies using TalentAI to find and hire top talent faster and smarter.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/register?role=recruiter">
              <Button size="lg" className="w-full bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/30 sm:w-auto">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/register?role=candidate">
              <Button size="lg" variant="outline" className="w-full border-border hover:bg-secondary/5 sm:w-auto">
                Apply as Candidate
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-foreground">TalentAI</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 TalentAI. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
