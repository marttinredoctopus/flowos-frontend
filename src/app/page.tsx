'use client';

import { useState, useEffect, useRef } from 'react';
import LoginModal from '@/components/auth/LoginModal';
import SignupModal from '@/components/auth/SignupModal';

/* ── Data ──────────────────────────────────────────────────────────────── */

const FEATURES = [
  {
    icon: '🎯',
    gradient: 'from-blue-500/20 to-blue-600/20',
    border: 'border-blue-500/20',
    title: 'Task & Project Management',
    desc: 'Kanban, List, Calendar, Timeline. Every view your team needs to stay aligned and deliver on time.',
  },
  {
    icon: '📅',
    gradient: 'from-purple-500/20 to-purple-600/20',
    border: 'border-purple-500/20',
    title: 'Content Calendar',
    desc: 'Plan and schedule content across every platform in one unified calendar. No more spreadsheets.',
  },
  {
    icon: '📈',
    gradient: 'from-pink-500/20 to-pink-600/20',
    border: 'border-pink-500/20',
    title: 'Ad Campaign Tracker',
    desc: 'Track ROAS, CTR, CPC across Facebook, Google, and TikTok ads. All metrics in one dashboard.',
  },
  {
    icon: '💬',
    gradient: 'from-green-500/20 to-green-600/20',
    border: 'border-green-500/20',
    title: 'Team Chat',
    desc: 'Real-time messaging with channels, DMs, and task links. Kill the WhatsApp group once and for all.',
  },
  {
    icon: '⏱️',
    gradient: 'from-yellow-500/20 to-yellow-600/20',
    border: 'border-yellow-500/20',
    title: 'Time Tracking',
    desc: 'One-click timers, billable hours, and automatic reports per client. Know where every hour goes.',
  },
  {
    icon: '🤖',
    gradient: 'from-cyan-500/20 to-cyan-600/20',
    border: 'border-cyan-500/20',
    title: 'AI Intelligence',
    desc: 'Competitor analysis, market research, and campaign ideas powered by AI. Win more pitches.',
  },
  {
    icon: '🧾',
    gradient: 'from-orange-500/20 to-orange-600/20',
    border: 'border-orange-500/20',
    title: 'Invoicing',
    desc: 'Create, send, and track invoices. Stripe integration so you get paid faster with less chasing.',
  },
  {
    icon: '👥',
    gradient: 'from-rose-500/20 to-rose-600/20',
    border: 'border-rose-500/20',
    title: 'Client Portal',
    desc: 'Give clients a branded portal to track progress, approve deliverables, and review reports.',
  },
  {
    icon: '⚡',
    gradient: 'from-violet-500/20 to-violet-600/20',
    border: 'border-violet-500/20',
    title: 'Automation',
    desc: 'Auto-assign tasks, send reminders, and trigger actions without lifting a finger. Work smarter.',
  },
];

const STEPS = [
  { num: '1', title: 'Create workspace', desc: 'Set up your agency workspace in 60 seconds. No credit card required.' },
  { num: '2', title: 'Add clients & team', desc: 'Invite your team, onboard clients, and assign roles instantly.' },
  { num: '3', title: 'Run your projects', desc: 'Create projects, assign tasks, track time, and manage content calendars.' },
  { num: '4', title: 'Get paid', desc: 'Send invoices, track time, and close the loop on every project.' },
];

const FAQ_ITEMS = [
  {
    q: 'Is FlowOS really free to start?',
    a: 'Yes — our Starter plan is free forever for up to 5 team members and 3 active projects. No credit card required. You can upgrade anytime when you need more.',
  },
  {
    q: 'Can I import data from ClickUp or Trello?',
    a: 'Yes. FlowOS supports CSV import from Trello and ClickUp, and we have a one-click migration tool for common formats. Your team can be up and running in minutes.',
  },
  {
    q: 'How does the client portal work?',
    a: 'Each client gets a branded portal where they can view project status, approve deliverables, leave feedback, and download reports — without access to your internal workspace.',
  },
  {
    q: 'Do you support Arabic language?',
    a: 'Yes. FlowOS fully supports Arabic with RTL layout. You can switch the interface language in your workspace settings. English and Arabic are both fully supported.',
  },
  {
    q: 'Is my data secure?',
    a: 'Absolutely. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We run regular security audits, maintain SOC 2 Type II compliance, and never sell your data.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes, cancel anytime with no penalties. If you cancel a paid plan, you keep access until the end of your billing period. We will never charge you after cancellation.',
  },
  {
    q: 'Do you have a mobile app?',
    a: 'FlowOS is a progressive web app (PWA) that works beautifully on mobile browsers. Native iOS and Android apps are on our roadmap for Q3 2026.',
  },
  {
    q: 'How does the AI competitor analysis work?',
    a: 'Enter a competitor\'s website or brand name and FlowOS AI will generate a full report: positioning, messaging, estimated ad spend, social strategy, and content gaps. Powered by Claude AI.',
  },
];

const TESTIMONIALS = [
  {
    stars: 5,
    quote: 'We replaced 6 tools with FlowOS. Our team went from chaos to clarity in one week. The client portal alone is worth every penny.',
    name: 'Sarah Mitchell',
    role: 'Founder, Pulse Creative Agency',
    location: 'Dubai',
    initials: 'SM',
    gradient: 'from-blue-500 to-purple-500',
  },
  {
    stars: 5,
    quote: 'The AI competitor analysis feature changed how we pitch to clients. We now walk into every meeting with a full market report ready.',
    name: 'Ahmed Al-Rashidi',
    role: 'CEO, Momentum Digital',
    location: 'Riyadh',
    initials: 'AA',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    stars: 5,
    quote: 'Finally an agency tool that understands how we work. The content calendar and approval flow cut our review cycles in half.',
    name: 'Layla Hassan',
    role: 'Managing Director, Narrative Studio',
    location: 'Cairo',
    initials: 'LH',
    gradient: 'from-pink-500 to-orange-500',
  },
];

const SOCIAL_PROOF = [
  'Pulse Creative', 'Momentum Digital', 'Narrative Studio', 'Bright Side Digital',
  'Norte Agency', 'Vortex Media', 'Apex Creative', 'Nova Studios', 'Orbit Digital',
  'Catalyst Agency', 'Prism Creative', 'Zenith Media',
];

const PROBLEMS = [
  'Trello for tasks',
  'Slack for communication',
  'Google Drive for files',
  'Harvest for time tracking',
  'ClickUp for projects',
  'Notion for docs',
  'Separate tools for invoicing',
];

const SOLUTIONS = [
  'Everything in one place',
  'Your team stays in sync',
  'Clients have their own portal',
  'Invoices sent in seconds',
  'Reports built automatically',
  'AI does the research',
];

/* ── Scroll Reveal Hook ─────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ── FAQ Item ───────────────────────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        style={{ minHeight: '44px', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: 'var(--text)' }}>
          {q}
        </span>
        <svg
          className="faq-icon"
          width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: 'var(--text-muted)' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className="faq-answer">
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7, paddingBottom: '20px' }}>
          {a}
        </p>
      </div>
    </div>
  );
}

/* ── Main Page ──────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useReveal();

  const prices = {
    starter: { monthly: 0, annual: 0 },
    pro: { monthly: 49, annual: 39 },
    enterprise: { monthly: 149, annual: 119 },
  };

  function openSignup() { setShowSignup(true); setMobileMenuOpen(false); }
  function openLogin() { setShowLogin(true); setMobileMenuOpen(false); }

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(4,5,10,0.85)', backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            FlowOS
          </span>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hidden md:flex">
            {['Features', 'Pricing', 'Docs'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                style={{ fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >{link}</a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="hidden md:flex">
            <button onClick={openLogin}
              style={{ padding: '8px 18px', fontSize: '14px', color: 'var(--text-muted)', background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', minHeight: '36px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'var(--text)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            >Sign in</button>
            <button onClick={openSignup}
              style={{ padding: '8px 18px', fontSize: '14px', fontWeight: 600, color: '#fff', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'opacity 0.2s', minHeight: '36px' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >Start free →</button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '8px' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div style={{ background: 'rgba(4,5,10,0.98)', padding: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}
            className="flex md:hidden flex-col gap-4"
          >
            {['Features', 'Pricing', 'Docs'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '18px', fontFamily: 'Syne, sans-serif', fontWeight: 600, color: 'var(--text)', textDecoration: 'none', padding: '8px 0' }}
              >{link}</a>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
              <button onClick={openLogin} style={{ padding: '14px', fontSize: '15px', fontWeight: 500, color: 'var(--text)', background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', cursor: 'pointer' }}>
                Sign in
              </button>
              <button onClick={openSignup} style={{ padding: '14px', fontSize: '15px', fontWeight: 600, color: '#fff', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
                Start free →
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '100px', paddingBottom: '80px', overflow: 'hidden' }}>
        {/* Grid */}
        <div className="grid-pattern" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        {/* Orbs */}
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />
        <div className="hero-orb-3" />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          {/* Badge */}
          <div className="animate-fade-up-1" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.08)', marginBottom: '32px' }}>
            <span className="animate-pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#93c5fd' }}>New &mdash; Now with AI-powered competitor analysis →</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up-2" style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(48px, 8vw, 88px)',
            lineHeight: 1.0,
            letterSpacing: '-3px',
            marginBottom: '24px',
            color: 'var(--text)',
          }}>
            The operating system<br />
            for{' '}
            <span style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              modern agencies
            </span>
          </h1>

          {/* Subtext */}
          <p className="animate-fade-up-3" style={{ fontSize: '18px', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.65 }}>
            Replace Trello, ClickUp, Notion, Slack, and Harvest.<br />
            One platform built specifically for marketing agencies.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up-4" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
            <button onClick={openSignup}
              style={{ padding: '14px 28px', fontSize: '15px', fontWeight: 600, color: '#fff', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: 'none', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 40px rgba(59,130,246,0.3)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 0 60px rgba(59,130,246,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(59,130,246,0.3)'; }}
            >
              Start for free →
            </button>
            <a href="#features"
              style={{ padding: '14px 28px', fontSize: '15px', fontWeight: 500, color: 'var(--text)', background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', textDecoration: 'none', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              See how it works
            </a>
          </div>
          <p className="animate-fade-up-4" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Free 14-day trial · No credit card · Cancel anytime
          </p>

          {/* App mockup */}
          <div className="animate-fade-up-5" style={{ marginTop: '56px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', boxShadow: '0 0 120px rgba(59,130,246,0.12), 0 40px 80px rgba(0,0,0,0.6)', maxWidth: '820px', margin: '56px auto 0' }}>
            {/* Browser chrome */}
            <div style={{ background: '#0a0b14', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                  <div key={c} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c }} />
                ))}
              </div>
              <div style={{ flex: 1, height: '24px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', marginLeft: '8px', display: 'flex', alignItems: 'center', paddingLeft: '10px' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', fontFamily: 'JetBrains Mono, monospace' }}>app.flowos.io/dashboard</span>
              </div>
            </div>
            {/* Dashboard preview */}
            <div style={{ background: '#070b0f', padding: '24px', minHeight: '280px', display: 'flex', gap: '16px' }}>
              {/* Sidebar */}
              <div style={{ width: '160px', flexShrink: 0 }}>
                <div style={{ height: '24px', background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3))', borderRadius: '6px', marginBottom: '20px' }} />
                {[80, 60, 70, 55, 65].map((w, i) => (
                  <div key={i} style={{ height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '10px', width: `${w}%` }} />
                ))}
              </div>
              {/* Main content */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  {['rgba(59,130,246,0.15)', 'rgba(139,92,246,0.15)', 'rgba(16,185,129,0.15)', 'rgba(236,72,153,0.15)'].map((bg, i) => (
                    <div key={i} style={{ height: '56px', background: bg, borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }} />
                  ))}
                </div>
                {/* Charts */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                  <div style={{ height: '120px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }} />
                  <div style={{ height: '120px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ─────────────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '40px 0', overflow: 'hidden' }}>
        <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Trusted by 2,400+ marketing agencies worldwide
        </p>
        <div className="marquee-container">
          <div className="animate-marquee" aria-hidden="true">
            {[...SOCIAL_PROOF, ...SOCIAL_PROOF].map((name, i) => (
              <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0 40px', whiteSpace: 'nowrap' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-muted)' }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM → SOLUTION ─────────────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }} id="features">
          {/* Problem */}
          <div style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.1)', borderRadius: '20px', padding: '36px' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', fontWeight: 700, marginBottom: '8px', color: 'var(--text)' }}>
              Too many tools.<br />Too much chaos.
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '28px' }}>The old way of running an agency:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {PROBLEMS.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '16px', flexShrink: 0 }}>❌</span>
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', textDecoration: 'line-through', textDecorationColor: 'rgba(239,68,68,0.5)' }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solution */}
          <div style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '20px', padding: '36px' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', fontWeight: 700, marginBottom: '8px', color: 'var(--text)' }}>
              One platform.<br />Total clarity.
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '28px' }}>The FlowOS way:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {SOLUTIONS.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '16px', color: '#10b981', flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: '14px', color: 'var(--text)', fontWeight: 500 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────────────── */}
      <section id="features" style={{ padding: '0 24px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 52px)', marginBottom: '16px', color: 'var(--text)' }}>
            Built for agencies. Not generic teams.
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto' }}>
            Every feature was designed specifically for how marketing agencies work.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="reveal"
              style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px', transition: 'all 0.3s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: `linear-gradient(135deg, ${f.gradient.replace('from-', '').replace(' to-', ', ')})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '18px', border: `1px solid ${f.border.replace('border-', '')}` }}>
                {f.icon}
              </div>
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '17px', color: 'var(--text)', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '16px' }}>{f.desc}</p>
              <span style={{ fontSize: '13px', color: 'var(--blue)', fontWeight: 500 }}>Learn more →</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section id="docs" style={{ padding: '80px 24px', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 48px)', color: 'var(--text)', marginBottom: '12px' }}>
              Up and running in minutes
            </h2>
            <p style={{ fontSize: '17px', color: 'var(--text-muted)' }}>Four simple steps to transform how your agency operates.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', position: 'relative' }}>
            {STEPS.map((step, i) => (
              <div key={i} className="reveal" style={{ textAlign: 'center' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: '#fff',
                  margin: '0 auto 20px', boxShadow: '0 0 24px rgba(59,130,246,0.3)',
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: 'var(--text)', marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────────────────────── */}
      <section id="pricing" style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 48px)', color: 'var(--text)', marginBottom: '12px' }}>
            Simple, honest pricing
          </h2>
          <p style={{ fontSize: '17px', color: 'var(--text-muted)', marginBottom: '32px' }}>
            No hidden fees. No per-seat surprises. Cancel anytime.
          </p>

          {/* Toggle */}
          <div className="billing-toggle" style={{ margin: '0 auto' }}>
            <button className={billing === 'monthly' ? 'active' : ''} onClick={() => setBilling('monthly')}>Monthly</button>
            <button className={billing === 'annual' ? 'active' : ''} onClick={() => setBilling('annual')}>
              Annual
              <span style={{ marginLeft: '6px', fontSize: '11px', fontWeight: 700, padding: '2px 6px', background: 'rgba(16,185,129,0.15)', color: '#10b981', borderRadius: '4px' }}>Save 20%</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {/* Starter */}
          <div className="reveal" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '32px' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: 'var(--text)', marginBottom: '6px' }}>Starter</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>For agencies just getting started</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '28px' }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '44px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>$0</span>
              <span style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>/month</span>
            </div>
            <ul style={{ listStyle: 'none', margin: '0 0 28px', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Up to 5 team members', '3 active projects', 'Basic task management', '5GB storage', 'Email support'].map(f => (
                <li key={f} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--blue)', fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                </li>
              ))}
            </ul>
            <button onClick={openSignup}
              style={{ width: '100%', padding: '12px', fontSize: '15px', fontWeight: 600, color: 'var(--text)', background: 'none', border: '1px solid var(--border)', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
            >Get started free</button>
          </div>

          {/* Pro — highlighted */}
          <div className="reveal" style={{ background: 'var(--card)', border: '2px solid transparent', backgroundImage: 'linear-gradient(var(--card), var(--card)), linear-gradient(135deg, #3b82f6, #8b5cf6)', backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box', borderRadius: '20px', padding: '32px', position: 'relative', boxShadow: '0 0 60px rgba(59,130,246,0.1)' }}>
            <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', padding: '4px 14px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, color: '#fff', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
              MOST POPULAR
            </div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: 'var(--text)', marginBottom: '6px' }}>Pro</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>For growing agencies</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '28px' }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '44px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                ${billing === 'annual' ? prices.pro.annual : prices.pro.monthly}
              </span>
              <span style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>/month</span>
            </div>
            <ul style={{ listStyle: 'none', margin: '0 0 28px', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Up to 25 members', 'Unlimited projects', 'All views (Kanban, List, Calendar)', 'Content calendar & time tracking', 'Client portal', 'AI features', '100GB storage', 'Priority support'].map(f => (
                <li key={f} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--blue)', fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                </li>
              ))}
            </ul>
            <button onClick={openSignup}
              style={{ width: '100%', padding: '12px', fontSize: '15px', fontWeight: 600, color: '#fff', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: 'none', borderRadius: '10px', cursor: 'pointer', transition: 'opacity 0.2s', boxShadow: '0 4px 20px rgba(59,130,246,0.3)' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >Start Pro trial</button>
          </div>

          {/* Enterprise */}
          <div className="reveal" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '32px' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: 'var(--text)', marginBottom: '6px' }}>Enterprise</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>For established agencies</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '28px' }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '44px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                ${billing === 'annual' ? prices.enterprise.annual : prices.enterprise.monthly}
              </span>
              <span style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>/month</span>
            </div>
            <ul style={{ listStyle: 'none', margin: '0 0 28px', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Unlimited members', 'Everything in Pro', 'White-label branding', 'Public API + webhooks', 'Facebook & Google Ads API', 'Custom integrations', 'Dedicated support'].map(f => (
                <li key={f} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--blue)', fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                </li>
              ))}
            </ul>
            <button onClick={openSignup}
              style={{ width: '100%', padding: '12px', fontSize: '15px', fontWeight: 600, color: 'var(--text)', background: 'none', border: '1px solid var(--border)', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
            >Contact sales</button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 48px)', color: 'var(--text)' }}>
              Loved by agency owners
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="reveal" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <span key={j} style={{ color: '#fbbf24', fontSize: '16px' }}>★</span>
                  ))}
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#d1d5db', lineHeight: 1.7, flex: 1 }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `linear-gradient(135deg, ${t.gradient.split(' ')[0].replace('from-','').replace('-500','')}, ${t.gradient.split(' ')[1].replace('to-','').replace('-500','')})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#fff', flexShrink: 0, backgroundImage: `linear-gradient(135deg, ${t.gradient.includes('blue') ? '#3b82f6' : t.gradient.includes('purple') ? '#8b5cf6' : '#ec4899'}, ${t.gradient.includes('purple') ? '#8b5cf6' : t.gradient.includes('pink') ? '#ec4899' : '#f97316'})` }}>
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{t.role} · {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', maxWidth: '720px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 48px)', color: 'var(--text)' }}>
            Frequently asked questions
          </h2>
        </div>
        <div className="reveal">
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section style={{
        padding: '100px 24px', textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.08) 50%, rgba(236,72,153,0.06) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div className="reveal" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 6vw, 56px)', color: 'var(--text)', marginBottom: '16px', lineHeight: 1.1 }}>
            Ready to run your agency better?
          </h2>
          <p style={{ fontSize: '17px', color: 'var(--text-muted)', marginBottom: '36px' }}>
            Join 2,400+ agencies already using FlowOS.
          </p>
          <button onClick={openSignup}
            style={{ padding: '16px 36px', fontSize: '17px', fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: 'none', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 0 60px rgba(59,130,246,0.3)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 80px rgba(59,130,246,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 60px rgba(59,130,246,0.3)'; }}
          >
            Start for free →
          </button>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '64px 24px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px', marginBottom: '48px' }}>
            {/* Brand */}
            <div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '10px' }}>
                FlowOS
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                The OS for modern agencies.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['𝕏', 'in', '◻'].map((icon, i) => (
                  <a key={i} href="#" style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                  >{icon}</a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '16px', letterSpacing: '0.02em' }}>Product</h4>
              {['Features', 'Pricing', 'Changelog', 'Roadmap'].map(link => (
                <a key={link} href="#" style={{ display: 'block', fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '10px', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                >{link}</a>
              ))}
            </div>

            {/* Company */}
            <div>
              <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '16px', letterSpacing: '0.02em' }}>Company</h4>
              {['About', 'Blog', 'Careers', 'Press'].map(link => (
                <a key={link} href="#" style={{ display: 'block', fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '10px', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                >{link}</a>
              ))}
            </div>

            {/* Legal */}
            <div>
              <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '16px', letterSpacing: '0.02em' }}>Legal</h4>
              {['Privacy Policy', 'Terms of Service', 'Security', 'Cookie Policy'].map(link => (
                <a key={link} href="#" style={{ display: 'block', fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '10px', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                >{link}</a>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>© 2026 FlowOS. All rights reserved.</span>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Made with ❤️ for agencies</span>
          </div>
        </div>
      </footer>

      {/* ── Modals ─────────────────────────────────────────────────────────── */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => { setShowLogin(false); setShowSignup(true); }}
        />
      )}
      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => { setShowSignup(false); setShowLogin(true); }}
        />
      )}
    </div>
  );
}
