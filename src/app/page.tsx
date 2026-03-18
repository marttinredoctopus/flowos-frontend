'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [cycle, setCycle] = useState<'monthly' | 'annual'>('monthly');
  const [mouse, setMouse] = useState({ x: -999, y: -999 });
  const [activeFeature, setActiveFeature] = useState(0);

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
      { threshold: 0.12 }
    );
    document.querySelectorAll('.anim').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveFeature(f => (f + 1) % 9), 2800);
    return () => clearInterval(id);
  }, []);

  const features = [
    { icon: '✅', title: 'Task Management', color: '#6366f1', desc: 'Kanban, List, Calendar, and Timeline views. Subtasks, dependencies, priorities — everything your team needs to stay aligned.' },
    { icon: '📅', title: 'Content Calendar', color: '#8b5cf6', desc: 'Plan, schedule, and publish content across all platforms. Instagram, LinkedIn, TikTok — one unified calendar.' },
    { icon: '📈', title: 'Ad Campaign Tracker', color: '#ec4899', desc: 'Track ROAS, CTR, CPC, and conversions across all ad platforms. Real-time dashboards built for media buyers.' },
    { icon: '💬', title: 'Team Chat', color: '#06b6d4', desc: 'Real-time messaging with channels, DMs, and file sharing. No more switching to Slack mid-workflow.' },
    { icon: '⏱️', title: 'Time Tracking', color: '#10b981', desc: 'One-click timers, billable hours, and automated timesheets. Invoice clients directly from tracked time.' },
    { icon: '✨', title: 'AI Intelligence', color: '#f59e0b', desc: 'Competitor SWOT analysis, ad copy generation, campaign ideation. Your always-on creative strategist.' },
    { icon: '🧾', title: 'Invoices & Finance', color: '#6366f1', desc: 'Create professional invoices, track payments, manage expenses. Get paid faster with Stripe integration.' },
    { icon: '👥', title: 'Client Portal', color: '#8b5cf6', desc: 'Branded portal where clients track progress, approve deliverables, and view invoices — without seeing internal chatter.' },
    { icon: '🎨', title: 'Design Hub', color: '#ec4899', desc: 'Upload designs, leave pixel-precise comments, manage version history. Built for creative teams.' },
  ];

  const steps = [
    { num: '01', title: 'Set up your workspace', desc: 'Create your agency account in 60 seconds. Invite your team and add your first client.' },
    { num: '02', title: 'Import your projects', desc: 'Migrate from Trello, Asana, ClickUp, or start fresh. We handle the heavy lifting.' },
    { num: '03', title: 'Start shipping', desc: 'Assign tasks, track time, communicate in context, and deliver work your clients will love.' },
  ];

  const testimonials = [
    { name: 'Sofia Martinez', role: 'Founder, Bolt Creative', avatar: 'SM', color: '#6366f1', text: 'We replaced 6 tools with TasksDone. Our team is faster, clients are happier, and we actually know where every project stands at any moment.' },
    { name: 'James Okafor', role: 'Operations Director, Pulse Media', avatar: 'JO', color: '#8b5cf6', text: 'The Client Portal alone is worth the subscription. No more endless status email threads. Clients log in and see exactly what\'s happening.' },
    { name: 'Yuki Tanaka', role: 'Head of Growth, Neon Agency', avatar: 'YT', color: '#ec4899', text: 'TasksDone\'s AI intelligence feature generated 3 campaign ideas we actually shipped. It\'s like having a strategist available 24/7.' },
  ];

  return (
    <div style={{ background: '#07080f', color: '#e8eaf0', fontFamily: "'Inter',-apple-system,sans-serif", overflowX: 'hidden', position: 'relative' }}>

      {/* CURSOR GLOW */}
      <div style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 0,
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(99,102,241,0.06) 0%,transparent 70%)',
        transform: `translate(${mouse.x - 300}px,${mouse.y - 300}px)`,
        transition: 'transform 0.15s ease',
      }} />

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 64,
        background: scrolled ? 'rgba(7,8,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        display: 'flex', alignItems: 'center',
        padding: '0 5vw', justifyContent: 'space-between',
        transition: 'all 0.3s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: 'linear-gradient(135deg,#6366f1,#a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.95rem', fontWeight: 800, color: '#fff',
          }}>T</div>
          <span style={{
            fontWeight: 800, fontSize: '1.25rem',
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>TasksDone</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['Features', 'Pricing', 'FAQ'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
              fontSize: 14, fontWeight: 500, transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
              {item}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => router.push('/login')} style={{
            padding: '8px 18px', borderRadius: 8,
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.14)',
            color: 'rgba(255,255,255,0.75)', fontSize: 14,
            fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}>
            Sign in
          </button>
          <button onClick={() => router.push('/register')} style={{
            padding: '8px 20px', borderRadius: 8,
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            border: 'none', color: 'white', fontSize: 14,
            fontWeight: 600, cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(99,102,241,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.35)'; }}>
            Start free →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '130px 20px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', width: 900, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(99,102,241,0.11) 0%,transparent 70%)',
          top: '5%', left: '50%', transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(168,85,247,0.08) 0%,transparent 70%)',
          top: '30%', right: '5%', pointerEvents: 'none',
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(99,102,241,0.10)',
          border: '1px solid rgba(99,102,241,0.28)',
          borderRadius: 100, padding: '6px 16px',
          fontSize: 13, color: '#818cf8', fontWeight: 500,
          marginBottom: 28, animation: 'fadeUp 0.6s ease both',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite', display: 'inline-block' }} />
          Built for marketing agencies · 2,400+ teams worldwide
        </div>

        <h1 style={{
          fontSize: 'clamp(44px,7.5vw,86px)',
          fontWeight: 900, lineHeight: 1.04,
          letterSpacing: '-0.035em', marginBottom: 24,
          animation: 'fadeUp 0.6s 0.1s ease both',
        }}>
          The agency OS<br />
          <span style={{
            background: 'linear-gradient(135deg,#6366f1 0%,#8b5cf6 45%,#ec4899 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>that actually ships.</span>
        </h1>

        <p style={{
          fontSize: 18, color: 'rgba(255,255,255,0.52)',
          maxWidth: 540, lineHeight: 1.75, marginBottom: 44,
          animation: 'fadeUp 0.6s 0.2s ease both',
        }}>
          Replace Trello, ClickUp, Notion, Slack, and Harvest
          with one platform built specifically for how agencies work.
        </p>

        <div style={{
          display: 'flex', gap: 12, marginBottom: 20,
          flexWrap: 'wrap', justifyContent: 'center',
          animation: 'fadeUp 0.6s 0.3s ease both',
        }}>
          <button onClick={() => router.push('/register')} style={{
            padding: '15px 36px', borderRadius: 12, border: 'none',
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            color: 'white', fontSize: 16, fontWeight: 700,
            cursor: 'pointer', transition: 'all 0.2s',
            boxShadow: '0 8px 32px rgba(99,102,241,0.38)',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 44px rgba(99,102,241,0.52)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.38)'; }}>
            Start for free →
          </button>
          <button onClick={() => router.push('/login')} style={{
            padding: '15px 32px', borderRadius: 12,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.75)', fontSize: 16,
            fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}>
            Sign in to workspace
          </button>
        </div>

        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)', animation: 'fadeUp 0.6s 0.4s ease both' }}>
          Free 14-day trial · No credit card required · Cancel anytime
        </p>

        {/* App Mockup */}
        <div style={{
          marginTop: 64, width: '100%', maxWidth: 900,
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 18, overflow: 'hidden',
          boxShadow: '0 0 0 1px rgba(99,102,241,0.15), 0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(99,102,241,0.12)',
          animation: 'fadeUp 0.9s 0.5s ease both',
        }}>
          <div style={{
            background: '#111318', padding: '10px 16px',
            display: 'flex', alignItems: 'center', gap: 8,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {['#ff5f57', '#ffbd2e', '#28c840'].map(c => (
                <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{
              flex: 1, background: 'rgba(255,255,255,0.05)',
              borderRadius: 6, padding: '4px 12px',
              fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center',
            }}>app.tasksdone.cloud/dashboard</div>
          </div>
          <div style={{ background: '#0c0e1c', padding: '20px 20px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 16 }}>
              {[
                { label: 'Active Projects', value: '12', color: '#6366f1' },
                { label: 'Open Tasks', value: '48', color: '#8b5cf6' },
                { label: 'Due Today', value: '5', color: '#f59e0b' },
                { label: 'Team Online', value: '8', color: '#22c55e' },
              ].map(s => (
                <div key={s.label} style={{
                  background: `${s.color}18`,
                  border: `1px solid ${s.color}28`,
                  borderRadius: 12, padding: '14px 16px',
                }}>
                  <div style={{ fontSize: 10, color: s.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 7 }}>{s.label}</div>
                  <div style={{ fontSize: 30, fontWeight: 900, color: 'white' }}>{s.value}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
              {[
                { col: 'To Do', color: '#6b7280', tasks: ['Design banner', 'Write copy', 'Research comp'] },
                { col: 'In Progress', color: '#6366f1', tasks: ['Social campaign', 'FB Ads Q2'] },
                { col: 'In Review', color: '#f59e0b', tasks: ['Monthly report'] },
                { col: 'Done', color: '#22c55e', tasks: ['Presentation', 'Brand guide'] },
              ].map(col => (
                <div key={col.col} style={{ background: '#111318', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: col.color }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: col.color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{col.col}</span>
                  </div>
                  {col.tasks.map(t => (
                    <div key={t} style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderLeft: `2px solid ${col.color}`,
                      borderRadius: 6, padding: '7px 9px', marginBottom: 6,
                      fontSize: 11, color: 'rgba(255,255,255,0.65)',
                    }}>{t}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF STRIP */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '20px 40px',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        gap: 12, flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginRight: 8 }}>Trusted by teams at</span>
        {['Bolt Agency', 'Pulse Media', 'Neon Studio', 'GridForce', 'Apex Creative', 'Orbit Labs'].map(name => (
          <span key={name} style={{
            fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.22)',
            padding: '5px 16px', borderRadius: 100,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
          }}>{name}</span>
        ))}
      </div>

      {/* STATS */}
      <div style={{ padding: '56px 20px', display: 'flex', justifyContent: 'center', gap: 64, flexWrap: 'wrap' }}>
        {[
          { value: '2,400+', label: 'Agencies worldwide', color: '#6366f1' },
          { value: '98%', label: 'Client satisfaction', color: '#22c55e' },
          { value: '6 tools', label: 'Replaced on average', color: '#8b5cf6' },
          { value: '4.9 ★', label: 'Average rating', color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="anim" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 34, fontWeight: 900, color: s.color, marginBottom: 5 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <section id="features" style={{ padding: '100px 20px', maxWidth: 1140, margin: '0 auto' }}>
        <div className="anim" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6366f1', marginBottom: 14 }}>
            Everything you need
          </div>
          <h2 style={{
            fontSize: 'clamp(28px,4vw,46px)', fontWeight: 900,
            letterSpacing: '-0.025em', marginBottom: 16,
          }}>
            Built for agencies, not generic teams
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
            Every feature is designed around how marketing agencies actually work — not retrofitted from generic project management tools.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          {features.map((f, i) => (
            <div key={f.title} className="anim" style={{
              background: activeFeature === i ? `${f.color}10` : '#111318',
              border: `1px solid ${activeFeature === i ? f.color + '40' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: 16, padding: '24px 24px 26px', transition: 'all 0.35s',
              boxShadow: activeFeature === i ? `0 8px 32px ${f.color}15` : 'none',
              cursor: 'default',
            }}
              onMouseEnter={e => {
                setActiveFeature(i);
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
              }}>
              <div style={{
                width: 46, height: 46, borderRadius: 12,
                background: `${f.color}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, marginBottom: 16,
              }}>{f.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 9 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.48)', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '80px 20px', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div className="anim" style={{ marginBottom: 60 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#8b5cf6', marginBottom: 14 }}>
            How it works
          </div>
          <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 900, letterSpacing: '-0.025em' }}>
            Up and running in under an hour
          </h2>
        </div>
        <div className="anim" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{ position: 'relative' }}>
              {i < steps.length - 1 && (
                <div style={{
                  position: 'absolute', top: 22, left: '60%', right: '-40%',
                  height: 1, background: 'linear-gradient(90deg,rgba(99,102,241,0.3),transparent)',
                  zIndex: 0,
                }} />
              )}
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800, color: 'white',
                margin: '0 auto 20px', position: 'relative', zIndex: 1,
              }}>{s.num}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '80px 20px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="anim" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#ec4899', marginBottom: 14 }}>
            What agencies say
          </div>
          <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 900, letterSpacing: '-0.025em' }}>
            Loved by 2,400+ agencies
          </h2>
        </div>
        <div className="anim" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {testimonials.map(t => (
            <div key={t.name} style={{
              background: '#111318',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: '28px 26px',
              display: 'flex', flexDirection: 'column', gap: 20,
              transition: 'all 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${t.color}35`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>"{t.text}"</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: `linear-gradient(135deg,${t.color},${t.color}88)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: 'white', flexShrink: 0,
                }}>{t.avatar}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '100px 20px', maxWidth: 980, margin: '0 auto', textAlign: 'center' }}>
        <div className="anim" style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6366f1', marginBottom: 14 }}>
            Pricing
          </div>
          <h2 style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 14 }}>
            Simple, honest pricing
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: 15 }}>
            No hidden fees. No per-seat surprises. Cancel anytime.
          </p>
        </div>

        <div className="anim" style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          marginBottom: 44, background: '#111318',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 100, padding: '6px 22px',
        }}>
          <span style={{ fontSize: 13, color: cycle === 'monthly' ? 'white' : 'rgba(255,255,255,0.38)', fontWeight: cycle === 'monthly' ? 700 : 400 }}>Monthly</span>
          <div onClick={() => setCycle(c => c === 'monthly' ? 'annual' : 'monthly')} style={{
            width: 42, height: 23, borderRadius: 12,
            background: cycle === 'annual' ? '#6366f1' : 'rgba(255,255,255,0.14)',
            position: 'relative', cursor: 'pointer', transition: 'background 0.25s',
          }}>
            <div style={{
              position: 'absolute', top: 2.5,
              left: cycle === 'annual' ? 21 : 2.5,
              width: 18, height: 18, borderRadius: '50%',
              background: 'white', transition: 'left 0.25s',
            }} />
          </div>
          <span style={{ fontSize: 13, color: cycle === 'annual' ? 'white' : 'rgba(255,255,255,0.38)', fontWeight: cycle === 'annual' ? 700 : 400 }}>Annual</span>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#22c55e', background: 'rgba(34,197,94,0.14)', padding: '3px 10px', borderRadius: 100 }}>Save 17%</span>
        </div>

        <div className="anim" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {[
            {
              id: 'free', name: 'Free', monthly: 0, annual: 0,
              storage: '1 GB', fileLimit: '10 MB/file',
              highlight: false, badge: null as string | null,
              features: ['5 clients', '3 team members', '3 projects', 'Basic Kanban', '1 GB storage', 'Community support'],
            },
            {
              id: 'pro', name: 'Pro', monthly: 18, annual: 15,
              storage: '20 GB', fileLimit: '100 MB/file',
              highlight: true, badge: 'Most Popular' as string | null,
              features: ['Unlimited clients', '15 team members', 'All views', 'Content calendar', 'Time tracking & invoices', 'Client portal', '50 AI requests/mo', '20 GB storage', 'Priority support'],
            },
            {
              id: 'agency', name: 'Agency', monthly: 38, annual: 32,
              storage: '100 GB', fileLimit: '500 MB/file',
              highlight: false, badge: 'Best Value' as string | null,
              features: ['Everything in Pro', 'Unlimited team members', 'Unlimited AI requests', 'White-label branding', 'Public API + Webhooks', '100 GB storage', 'Dedicated support'],
            },
          ].map(plan => {
            const price = cycle === 'annual' ? plan.annual : plan.monthly;
            return (
              <div key={plan.id} style={{
                background: plan.highlight ? 'rgba(99,102,241,0.08)' : '#111318',
                border: `1px solid ${plan.highlight ? '#6366f1' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 18, padding: '30px 26px', position: 'relative',
                boxShadow: plan.highlight ? '0 0 50px rgba(99,102,241,0.14)' : 'none',
                transition: 'transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}>
                {plan.badge && (
                  <div style={{
                    position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                    background: plan.highlight ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'linear-gradient(135deg,#f59e0b,#ef4444)',
                    color: 'white', fontSize: 10, fontWeight: 800,
                    padding: '4px 14px', borderRadius: 100, whiteSpace: 'nowrap',
                  }}>{plan.badge}</div>
                )}
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 18 }}>{plan.name}</div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 40, fontWeight: 900 }}>${price}</span>
                  <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: 14 }}>{price === 0 ? ' forever' : '/mo'}</span>
                </div>
                {cycle === 'annual' && price > 0 && (
                  <div style={{ fontSize: 12, color: '#22c55e', marginBottom: 10 }}>Billed ${price * 12}/year</div>
                )}
                <div style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 8, padding: '8px 12px', marginBottom: 22,
                  fontSize: 12, color: 'rgba(255,255,255,0.55)',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  💾 <strong style={{ color: 'white' }}>{plan.storage}</strong> · {plan.fileLimit} max
                </div>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 26, textAlign: 'left' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', gap: 9, fontSize: 13, color: 'rgba(255,255,255,0.58)', alignItems: 'flex-start' }}>
                      <span style={{ color: '#22c55e', flexShrink: 0, marginTop: 1, fontWeight: 700 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => router.push('/register')} style={{
                  width: '100%', padding: '12px',
                  borderRadius: 10, border: 'none', fontSize: 14,
                  fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                  background: plan.highlight ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'rgba(255,255,255,0.07)',
                  color: plan.highlight ? 'white' : 'rgba(255,255,255,0.65)',
                  boxShadow: plan.highlight ? '0 4px 18px rgba(99,102,241,0.32)' : 'none',
                }}>
                  {plan.id === 'free' ? 'Start for free' : `Start ${plan.name} trial →`}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '80px 20px', maxWidth: 700, margin: '0 auto' }}>
        <div className="anim" style={{ textAlign: 'center', marginBottom: 52 }}>
          <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 900, letterSpacing: '-0.025em' }}>
            Frequently asked questions
          </h2>
        </div>
        <div className="anim">
          {[
            { q: 'Is TasksDone really free to start?', a: 'Yes! The Free plan is free forever. No credit card required. You get 5 clients, 3 projects, and 1GB of storage.' },
            { q: 'Can I upgrade or downgrade anytime?', a: 'Absolutely. Upgrades take effect immediately. Downgrades take effect at the end of your billing period.' },
            { q: 'What happens to my files if I downgrade?', a: 'Your files stay safe. You just cannot upload new files until you are under the storage limit of your plan.' },
            { q: 'How does the Client Portal work?', a: 'Each client gets a unique login to see only their projects, approve deliverables, and view invoices — without seeing any internal team activity.' },
            { q: 'Do you have a mobile app?', a: 'The web app is fully responsive and works great on mobile. A dedicated native app is on our roadmap for Q3 2025.' },
            { q: 'How does AI competitor analysis work?', a: 'Enter your brand, industry, and up to 5 competitor URLs. Our AI analyzes them and generates a full SWOT report with prioritized quick-win opportunities.' },
          ].map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{
                width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '19px 0', background: 'none', border: 'none',
                color: 'white', fontSize: 15, fontWeight: 500, cursor: 'pointer', textAlign: 'left',
              }}>
                {item.q}
                <span style={{
                  fontSize: 20, color: 'rgba(255,255,255,0.38)',
                  transform: faqOpen === i ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.25s', flexShrink: 0, marginLeft: 20,
                }}>⌄</span>
              </button>
              {faqOpen === i && (
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, paddingBottom: 20, animation: 'fadeUp 0.2s ease' }}>
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '110px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center,rgba(99,102,241,0.13) 0%,transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="anim">
          <div style={{
            display: 'inline-block', fontSize: 11, fontWeight: 800,
            letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6366f1',
            marginBottom: 18,
          }}>Get started today</div>
          <h2 style={{
            fontSize: 'clamp(32px,5.5vw,60px)', fontWeight: 900,
            letterSpacing: '-0.035em', marginBottom: 18,
          }}>Ready to get things done?</h2>
          <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: 17, marginBottom: 40 }}>
            Join 2,400+ agencies. Free to start. No credit card required.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => router.push('/register')} style={{
              padding: '17px 44px', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              color: 'white', fontSize: 17, fontWeight: 800,
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: '0 10px 44px rgba(99,102,241,0.42)',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 18px 56px rgba(99,102,241,0.55)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 44px rgba(99,102,241,0.42)'; }}>
              Start for free →
            </button>
            <button onClick={() => router.push('/login')} style={{
              padding: '17px 36px', borderRadius: 12,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.7)', fontSize: 17,
              fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}>
              Sign in
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '36px 5vw',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'linear-gradient(135deg,#6366f1,#a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.8rem', fontWeight: 800, color: '#fff',
          }}>T</div>
          <span style={{
            fontWeight: 800, fontSize: '1.1rem',
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>TasksDone</span>
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.26)' }}>
          © 2025 TasksDone · Built for marketing agencies
        </div>
        <div style={{ display: 'flex', gap: 22 }}>
          {['Privacy', 'Terms', 'Support'].map(l => (
            <a key={l} href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>
              {l}
            </a>
          ))}
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }
        .anim {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .anim.visible {
          opacity: 1;
          transform: translateY(0);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) {
          nav > div:nth-child(2) { display: none !important; }
        }
        @media (max-width: 640px) {
          section > div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          section > div[style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  );
}
