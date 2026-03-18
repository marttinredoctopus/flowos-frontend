'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [cycle, setCycle] = useState<'monthly' | 'annual'>('monthly');
  const [mouse, setMouse] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.anim').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: '✅', title: 'Task Management', color: '#6366f1', desc: 'Kanban, List, Calendar views. Subtasks, dependencies, priorities.' },
    { icon: '📅', title: 'Content Calendar', color: '#8b5cf6', desc: 'Plan, schedule, publish across all platforms from one calendar.' },
    { icon: '📈', title: 'Ad Campaign Tracker', color: '#ec4899', desc: 'Track ROAS, CTR, CPC in real-time. Built for media buyers.' },
    { icon: '💬', title: 'Team Chat', color: '#06b6d4', desc: 'Real-time messaging with channels, DMs, and file sharing.' },
    { icon: '⏱️', title: 'Time Tracking', color: '#10b981', desc: 'One-click timers, billable hours, automated invoicing.' },
    { icon: '✨', title: 'AI Intelligence', color: '#f59e0b', desc: 'Competitor SWOT, ad copy, campaign ideation. Your 24/7 strategist.' },
    { icon: '🧾', title: 'Invoices & Finance', color: '#6366f1', desc: 'Professional invoices, expense tracking, payment management.' },
    { icon: '👥', title: 'Client Portal', color: '#8b5cf6', desc: 'Branded portal: progress, approvals, invoices. No internal chaos exposed.' },
    { icon: '🎨', title: 'Design Hub', color: '#ec4899', desc: 'Upload designs, pixel-precise comments, version history.' },
  ];

  const painPoints = [
    { icon: '🗂️', title: 'Scattered across 6 apps', desc: 'Trello for tasks, Notion for docs, Slack for chat, Harvest for time, Drive for files...' },
    { icon: '👁️', title: 'No client visibility', desc: 'Clients emailing for updates. Status calls every week. You\'re the bottleneck.' },
    { icon: '⏰', title: 'Time tracking is broken', desc: 'Hours slip through the cracks. Invoices are late. Cash flow suffers.' },
    { icon: '🤖', title: 'AI tools not connected', desc: 'Switching between ChatGPT tabs to write copy that isn\'t connected to your actual work.' },
    { icon: '📉', title: 'Delivery keeps slipping', desc: 'Without a unified system, projects go over deadline and over budget.' },
    { icon: '📊', title: 'Reporting is a nightmare', desc: 'Building reports from 4 different exports every month. Manual, slow, error-prone.' },
  ];

  const testimonials = [
    { name: 'Sofia Martinez', role: 'Founder', company: 'Bolt Creative', initials: 'SM', color: '#8b5cf6', quote: 'We replaced 6 tools with TasksDone. Our team is faster, clients are happier.' },
    { name: 'James Okafor', role: 'Operations Director', company: 'Pulse Media', initials: 'JO', color: '#7c3aed', quote: 'The Client Portal alone is worth the subscription. No more status email threads.' },
    { name: 'Yuki Tanaka', role: 'Head of Growth', company: 'Neon Agency', initials: 'YT', color: '#ec4899', quote: 'TasksDone\'s AI feature generated 3 campaign ideas we actually shipped.' },
  ];

  const faqs = [
    { q: 'Is it really free to start?', a: 'Yes! The Free plan includes unlimited tasks, 2 active projects, and core features. No credit card required. Upgrade whenever your team is ready.' },
    { q: 'Can I upgrade or downgrade anytime?', a: 'Absolutely. You can change your plan at any time. Upgrades take effect immediately; downgrades apply at your next billing cycle.' },
    { q: 'What happens to my files if I downgrade?', a: 'Your files are never deleted. If you exceed the storage limit on a lower plan, files become read-only until you upgrade again.' },
    { q: 'How does the Client Portal work?', a: 'Each client gets a branded portal where they can view project progress, approve deliverables, and see their invoices — without accessing your internal workspace.' },
    { q: 'Do you have a mobile app?', a: 'Yes! Native iOS and Android apps are available with full feature parity including time tracking, chat, and task management.' },
    { q: 'How does AI competitor analysis work?', a: 'Enter a competitor\'s URL or name and our AI generates a full SWOT analysis, positioning recommendations, and content gap opportunities within seconds.' },
  ];

  const proMonthly = 18;
  const agencyMonthly = 38;
  const proAnnual = Math.round(proMonthly * 0.83);
  const agencyAnnual = Math.round(agencyMonthly * 0.83);

  const logos = ['Acme Corp', 'Pixel Studio', 'Nova Labs', 'Drift Media', 'Apex Digital', 'Beam Creative', 'Surge Co', 'Orbit Agency'];

  return (
    <div style={{ background: '#07080f', color: '#e2e8f0', minHeight: '100vh', fontFamily: "'Inter', -apple-system, sans-serif", overflowX: 'hidden', position: 'relative' }}>
      {/* Cursor Glow */}
      <div style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 0,
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
        transform: `translate(${mouse.x - 300}px, ${mouse.y - 300}px)`,
        transition: 'transform 0.1s ease',
      }} />

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 24px',
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(7,8,15,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(99,102,241,0.15)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => router.push('/')}>
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 800, color: '#fff',
          }}>T</div>
          <span style={{
            fontSize: 18, fontWeight: 700,
            background: 'linear-gradient(90deg, #818cf8, #c084fc)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>TasksDone</span>
        </div>

        {/* Nav Links */}
        <div className="nav-links" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <a href="#features" style={{ color: '#94a3b8', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#e2e8f0')}
            onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>Features</a>
          <a href="#pricing" style={{ color: '#94a3b8', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#e2e8f0')}
            onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>Pricing</a>
          <a href="#faq" style={{ color: '#94a3b8', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#e2e8f0')}
            onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>FAQ</a>
        </div>

        {/* Nav CTAs */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={() => router.push('/login')} style={{
            background: 'transparent', border: '1px solid rgba(99,102,241,0.4)',
            color: '#a5b4fc', borderRadius: 8, padding: '8px 16px', fontSize: 14,
            cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(99,102,241,0.1)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
            Sign in
          </button>
          <button onClick={() => router.push('/register')} style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            border: 'none', color: '#fff', borderRadius: 8, padding: '8px 18px',
            fontSize: 14, fontWeight: 600, cursor: 'pointer',
            boxShadow: '0 0 20px rgba(99,102,241,0.3)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 24px rgba(99,102,241,0.5)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(99,102,241,0.3)'; }}>
            Start free →
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '100px 24px 60px', textAlign: 'center', overflow: 'hidden',
      }}>
        {/* Hero Glow */}
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: 900, height: 600, borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Badge */}
        <div className="anim" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: 100, padding: '6px 16px', marginBottom: 28,
          fontSize: 13, color: '#a5b4fc', position: 'relative', zIndex: 1,
        }}>
          <span>🚀</span> Trusted by 2,400+ agencies worldwide
        </div>

        {/* Headline */}
        <h1 className="anim" style={{
          fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 800,
          lineHeight: 1.1, letterSpacing: '-0.03em',
          margin: '0 0 20px', maxWidth: 820,
          position: 'relative', zIndex: 1,
        }}>
          <span style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #a5b4fc 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>The Agency OS That</span>
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #c084fc)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Actually Ships.</span>
        </h1>

        {/* Sub */}
        <p className="anim" style={{
          fontSize: 'clamp(16px, 2vw, 22px)', color: '#94a3b8', maxWidth: 560,
          margin: '0 0 40px', lineHeight: 1.6, position: 'relative', zIndex: 1,
        }}>
          Replace 6 tools with one platform built for real agencies.
        </p>

        {/* CTAs */}
        <div className="anim" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <button onClick={() => router.push('/register')} style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            border: 'none', color: '#fff', borderRadius: 12,
            padding: '14px 32px', fontSize: 16, fontWeight: 700,
            cursor: 'pointer', boxShadow: '0 0 30px rgba(99,102,241,0.4)',
            transition: 'all 0.25s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 40px rgba(99,102,241,0.6)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 30px rgba(99,102,241,0.4)'; }}>
            Start Free Trial →
          </button>
          <button onClick={() => router.push('/login')} style={{
            background: 'transparent', border: '1px solid rgba(148,163,184,0.3)',
            color: '#cbd5e1', borderRadius: 12, padding: '14px 32px',
            fontSize: 16, fontWeight: 600, cursor: 'pointer', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(148,163,184,0.5)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(148,163,184,0.3)'; }}>
            Book a Demo
          </button>
        </div>

        {/* Below CTAs */}
        <p className="anim" style={{ marginTop: 18, color: '#64748b', fontSize: 13, position: 'relative', zIndex: 1 }}>
          Free 14-day trial · No credit card · Cancel anytime
        </p>

        {/* App Mockup */}
        <div className="anim" style={{
          marginTop: 60, width: '100%', maxWidth: 900,
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: 20, padding: 24, position: 'relative', zIndex: 1,
          boxShadow: '0 40px 120px rgba(99,102,241,0.15), 0 0 0 1px rgba(99,102,241,0.1)',
        }}>
          {/* Mockup Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
            <div style={{ flex: 1, height: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 6, marginLeft: 8 }} />
          </div>

          {/* Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
            {[
              { label: 'Active Projects', value: '24', color: '#6366f1' },
              { label: 'Tasks Due Today', value: '7', color: '#ec4899' },
              { label: 'Hours This Week', value: '128h', color: '#10b981' },
              { label: 'Revenue MTD', value: '$48k', color: '#f59e0b' },
            ].map((s, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '14px 16px',
                border: `1px solid ${s.color}22`,
              }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Kanban Columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              { col: 'Backlog', color: '#64748b', tasks: ['Competitor audit', 'Brand refresh brief'] },
              { col: 'In Progress', color: '#6366f1', tasks: ['Landing page copy', 'Ad creative batch'] },
              { col: 'Review', color: '#f59e0b', tasks: ['Campaign report', 'Client deck v2'] },
              { col: 'Done', color: '#22c55e', tasks: ['SEO audit', 'Social schedule'] },
            ].map((col, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: col.color }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>{col.col}</span>
                </div>
                {col.tasks.map((t, j) => (
                  <div key={j} style={{
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 7, padding: '8px 10px', marginBottom: 7,
                    fontSize: 12, color: '#cbd5e1',
                  }}>{t}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF MARQUEE ── */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '24px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
          background: 'linear-gradient(to right, #07080f, transparent)',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
          background: 'linear-gradient(to left, #07080f, transparent)',
        }} />
        <div style={{ display: 'flex', gap: 60, animation: 'marquee 22s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
          {[...logos, ...logos].map((l, i) => (
            <span key={i} style={{ color: '#334155', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>{l}</span>
          ))}
        </div>
      </div>

      {/* ── PROBLEM SECTION ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div className="anim" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#f87171', marginBottom: 14 }}>
            PAIN POINTS
          </div>
          <h2 className="anim" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.03em' }}>
            Sound familiar?
          </h2>
          <p className="anim" style={{ color: '#64748b', fontSize: 16, marginBottom: 56 }}>
            If you're running an agency on a patchwork of tools, you already know the pain.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
            {painPoints.map((p, i) => (
              <div key={i} className="anim" style={{
                background: '#111318', borderRadius: 14, padding: '20px 22px',
                borderLeft: '3px solid rgba(248,113,113,0.5)', textAlign: 'left',
                transition: 'transform 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{p.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#f87171', marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION SECTION ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px)', background: 'rgba(99,102,241,0.03)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div className="anim" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#818cf8', marginBottom: 14 }}>
            THE SOLUTION
          </div>
          <h2 className="anim" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.03em' }}>
            One platform. Every workflow.
          </h2>
          <p className="anim" style={{ color: '#64748b', fontSize: 16, maxWidth: 580, margin: '0 auto 56px' }}>
            TasksDone replaces every disconnected tool with a unified workspace purpose-built for agencies.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              {
                icon: '🏗️', title: 'Unified Workspace', accent: '#6366f1',
                items: ['Task & project management', 'Team chat & collaboration', 'Time tracking', 'All in one place'],
                bg: 'rgba(99,102,241,0.06)', border: 'rgba(99,102,241,0.25)',
              },
              {
                icon: '🤝', title: 'Client Intelligence', accent: '#8b5cf6',
                items: ['Branded client portal', 'Invoicing & payments', 'Approval workflows', 'Real-time reporting'],
                bg: 'rgba(139,92,246,0.06)', border: 'rgba(139,92,246,0.25)',
              },
              {
                icon: '🧠', title: 'AI-Powered', accent: '#06b6d4',
                items: ['Content generation', 'Competitor analysis', 'Campaign builder', 'Strategy automation'],
                bg: 'rgba(6,182,212,0.06)', border: 'rgba(6,182,212,0.25)',
              },
            ].map((s, i) => (
              <div key={i} className="anim" style={{
                background: s.bg, border: `1px solid ${s.border}`,
                borderRadius: 18, padding: '32px 28px', textAlign: 'left',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 40px ${s.accent}22`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: s.accent, marginBottom: 16 }}>{s.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {s.items.map((item, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: 14, color: '#94a3b8' }}>
                      <span style={{ color: s.accent, fontSize: 16 }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="anim" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 14 }}>
              EVERYTHING YOU NEED
            </div>
            <h2 className="anim" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.03em' }}>
              Every tool. Zero tab-switching.
            </h2>
            <p className="anim" style={{ color: '#64748b', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
              9 purpose-built modules that work together so your team doesn't have to juggle apps.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
            {features.map((f, i) => (
              <div key={i} className="anim" style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16, padding: '24px 22px', cursor: 'default',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(-4px)';
                  el.style.borderColor = f.color + '55';
                  el.style.background = f.color + '0a';
                  el.style.boxShadow = `0 12px 32px ${f.color}18`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(0)';
                  el.style.borderColor = 'rgba(255,255,255,0.07)';
                  el.style.background = 'rgba(255,255,255,0.03)';
                  el.style.boxShadow = 'none';
                }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: f.color, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px)', background: 'rgba(99,102,241,0.03)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div className="anim" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#818cf8', marginBottom: 14 }}>
            GET STARTED
          </div>
          <h2 className="anim" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 56, letterSpacing: '-0.03em' }}>
            Up and running in minutes.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32, position: 'relative' }}>
            {[
              { step: '01', title: 'Create your workspace', desc: 'Set up in 60 seconds. Invite team. Add first client.' },
              { step: '02', title: 'Connect your work', desc: 'Import from Trello, Asana, ClickUp — or start fresh in minutes.' },
              { step: '03', title: 'Ship faster', desc: 'Assign, track, communicate, deliver. All without leaving TasksDone.' },
            ].map((s, i) => (
              <div key={i} className="anim" style={{ position: 'relative' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 800, color: '#fff',
                  margin: '0 auto 18px',
                  boxShadow: '0 0 24px rgba(99,102,241,0.4)',
                }}>{s.step}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="anim" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 14 }}>
              SOCIAL PROOF
            </div>
            <h2 className="anim" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Agencies love it.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22 }}>
            {testimonials.map((t, i) => (
              <div key={i} className="anim" style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 18, padding: '28px 26px',
                transition: 'transform 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}>
                <div style={{ color: '#f59e0b', fontSize: 16, marginBottom: 16 }}>⭐⭐⭐⭐⭐</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: '#cbd5e1', marginBottom: 22 }}>"{t.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}99)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700, color: '#fff',
                  }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{
        padding: 'clamp(40px, 5vw, 60px) clamp(20px, 5vw, 80px)',
        background: 'rgba(99,102,241,0.06)',
        borderTop: '1px solid rgba(99,102,241,0.15)',
        borderBottom: '1px solid rgba(99,102,241,0.15)',
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, textAlign: 'center' }}>
          {[
            { value: '2,400+', label: 'Agencies worldwide', color: '#818cf8' },
            { value: '98%', label: 'Client satisfaction', color: '#34d399' },
            { value: '6', label: 'Tools replaced on average', color: '#f472b6' },
            { value: '4.9★', label: 'Average rating', color: '#fbbf24' },
          ].map((s, i) => (
            <div key={i} className="anim">
              <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: s.color, letterSpacing: '-0.03em' }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div className="anim" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#818cf8', marginBottom: 14 }}>
            PRICING
          </div>
          <h2 className="anim" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.03em' }}>
            Simple, honest pricing.
          </h2>
          <p className="anim" style={{ color: '#64748b', fontSize: 16, marginBottom: 36 }}>
            Start free. Scale as you grow.
          </p>

          {/* Toggle */}
          <div className="anim" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.05)', borderRadius: 100, padding: '4px 6px', marginBottom: 52, border: '1px solid rgba(255,255,255,0.08)' }}>
            {(['monthly', 'annual'] as const).map(c => (
              <button key={c} onClick={() => setCycle(c)} style={{
                background: cycle === c ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                border: 'none', borderRadius: 100, padding: '8px 20px',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                color: cycle === c ? '#fff' : '#64748b',
                transition: 'all 0.2s',
              }}>
                {c === 'monthly' ? 'Monthly' : (
                  <span>Annual <span style={{ fontSize: 11, background: 'rgba(52,211,153,0.2)', color: '#34d399', padding: '2px 8px', borderRadius: 100, marginLeft: 6 }}>Save 17%</span></span>
                )}
              </button>
            ))}
          </div>

          {/* Plans */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22, maxWidth: 960, margin: '0 auto' }}>
            {/* Free */}
            <div className="anim" style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20, padding: '32px 28px', textAlign: 'left',
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>Free</div>
              <div style={{ fontSize: 40, fontWeight: 800, marginBottom: 4 }}>$0</div>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>forever</div>
              {['3 team members', '5 active projects', 'Task management', 'Basic time tracking', 'Community support'].map((f, j) => (
                <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 14, color: '#94a3b8' }}>
                  <span style={{ color: '#6366f1' }}>✓</span>{f}
                </div>
              ))}
              <button onClick={() => router.push('/register')} style={{
                width: '100%', marginTop: 24, background: 'transparent',
                border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc',
                borderRadius: 10, padding: '12px 0', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(99,102,241,0.1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                Get started free
              </button>
            </div>

            {/* Pro */}
            <div className="anim" style={{
              background: 'linear-gradient(145deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))',
              border: '1px solid rgba(99,102,241,0.4)',
              borderRadius: 20, padding: '32px 28px', textAlign: 'left', position: 'relative',
              boxShadow: '0 0 40px rgba(99,102,241,0.2)',
              transform: 'scale(1.02)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02) translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 60px rgba(99,102,241,0.35)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02) translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 40px rgba(99,102,241,0.2)'; }}>
              <div style={{
                position: 'absolute', top: -12, right: 20,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                borderRadius: 100, padding: '4px 14px', fontSize: 11, fontWeight: 700, color: '#fff',
              }}>Most Popular</div>
              <div style={{ fontSize: 13, color: '#a5b4fc', marginBottom: 6 }}>Pro</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: 40, fontWeight: 800 }}>${cycle === 'monthly' ? proMonthly : proAnnual}</span>
                <span style={{ fontSize: 14, color: '#64748b' }}>/mo</span>
              </div>
              {cycle === 'annual' && <div style={{ fontSize: 12, color: '#34d399', marginTop: 2 }}>billed annually</div>}
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 24, marginTop: cycle === 'annual' ? 6 : 4 }}>per workspace</div>
              {['Unlimited team members', 'Unlimited projects', 'Everything in Free', 'AI features (100 credits/mo)', 'Client Portal', 'Time tracking + invoicing', 'Priority support'].map((f, j) => (
                <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 14, color: '#e2e8f0' }}>
                  <span style={{ color: '#818cf8' }}>✓</span>{f}
                </div>
              ))}
              <button onClick={() => router.push('/register')} style={{
                width: '100%', marginTop: 24,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border: 'none', color: '#fff',
                borderRadius: 10, padding: '12px 0', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 0 20px rgba(99,102,241,0.4)',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 30px rgba(99,102,241,0.6)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(99,102,241,0.4)'; }}>
                Start free trial
              </button>
            </div>

            {/* Agency */}
            <div className="anim" style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20, padding: '32px 28px', textAlign: 'left', position: 'relative',
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}>
              <div style={{
                position: 'absolute', top: -12, right: 20,
                background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)',
                borderRadius: 100, padding: '4px 14px', fontSize: 11, fontWeight: 700, color: '#34d399',
              }}>Best Value</div>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>Agency</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: 40, fontWeight: 800 }}>${cycle === 'monthly' ? agencyMonthly : agencyAnnual}</span>
                <span style={{ fontSize: 14, color: '#64748b' }}>/mo</span>
              </div>
              {cycle === 'annual' && <div style={{ fontSize: 12, color: '#34d399', marginTop: 2 }}>billed annually</div>}
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 24, marginTop: cycle === 'annual' ? 6 : 4 }}>per workspace</div>
              {['Everything in Pro', 'AI features (unlimited)', 'White-label portal', 'Custom domain', 'Advanced analytics', 'API access', 'Dedicated success manager'].map((f, j) => (
                <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 14, color: '#94a3b8' }}>
                  <span style={{ color: '#34d399' }}>✓</span>{f}
                </div>
              ))}
              <button onClick={() => router.push('/register')} style={{
                width: '100%', marginTop: 24, background: 'transparent',
                border: '1px solid rgba(52,211,153,0.4)', color: '#34d399',
                borderRadius: 10, padding: '12px 0', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(52,211,153,0.08)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                Get Agency plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px)', background: 'rgba(99,102,241,0.03)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="anim" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#818cf8', marginBottom: 14 }}>
              FAQ
            </div>
            <h2 className="anim" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Frequently asked questions.
            </h2>
          </div>

          {faqs.map((f, i) => (
            <div key={i} className="anim" style={{
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              overflow: 'hidden',
            }}>
              <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{
                width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '20px 0', background: 'transparent', border: 'none',
                color: '#e2e8f0', fontSize: 15, fontWeight: 600, cursor: 'pointer', textAlign: 'left',
              }}>
                {f.q}
                <span style={{
                  transition: 'transform 0.25s',
                  transform: faqOpen === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  color: '#6366f1', fontSize: 22, lineHeight: 1, flexShrink: 0, marginLeft: 12,
                }}>+</span>
              </button>
              <div style={{
                maxHeight: faqOpen === i ? 300 : 0,
                overflow: 'hidden', transition: 'max-height 0.35s ease',
              }}>
                <p style={{ paddingBottom: 20, color: '#64748b', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700, height: 400, borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="anim" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#818cf8', marginBottom: 20 }}>
            GET STARTED TODAY
          </div>
          <h2 className="anim" style={{ fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 800, marginBottom: 18, letterSpacing: '-0.03em', maxWidth: 700, margin: '0 auto 18px' }}>
            Ready to replace your tool stack?
          </h2>
          <p className="anim" style={{ color: '#64748b', fontSize: 16, marginBottom: 40 }}>
            Join 2,400+ agencies. Free to start, scales with your growth.
          </p>
          <div className="anim" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => router.push('/register')} style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none', color: '#fff', borderRadius: 12,
              padding: '14px 36px', fontSize: 16, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 0 32px rgba(99,102,241,0.45)',
              transition: 'all 0.25s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 40px rgba(99,102,241,0.6)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 32px rgba(99,102,241,0.45)'; }}>
              Start for Free →
            </button>
            <button onClick={() => router.push('/login')} style={{
              background: 'transparent', border: '1px solid rgba(148,163,184,0.3)',
              color: '#94a3b8', borderRadius: 12, padding: '14px 32px',
              fontSize: 16, fontWeight: 600, cursor: 'pointer', transition: 'all 0.25s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
              Sign in to workspace
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: 'clamp(32px, 4vw, 48px) clamp(20px, 5vw, 80px)',
        display: 'flex', flexWrap: 'wrap', gap: 24,
        alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 7,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 800, color: '#fff',
          }}>T</div>
          <span style={{
            fontSize: 16, fontWeight: 700,
            background: 'linear-gradient(90deg, #818cf8, #c084fc)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>TasksDone</span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {['Features', 'Pricing', 'FAQ'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: '#64748b', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}>{l}</a>
          ))}
          {['Privacy', 'Terms', 'Support'].map(l => (
            <a key={l} href="#" style={{ color: '#64748b', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}>{l}</a>
          ))}
        </div>

        <div style={{ fontSize: 12, color: '#334155' }}>© 2025 TasksDone</div>
      </footer>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }

        .anim {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .anim.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 640px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </div>
  );
}
