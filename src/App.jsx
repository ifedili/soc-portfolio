import { useState, useEffect, useRef, useCallback } from 'react'

/* ─────────────── HOOKS ─────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, isVisible]
}

function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { threshold: 0.25, rootMargin: '-80px 0px 0px 0px' }
    )
    setTimeout(() => {
      document.querySelectorAll('section[id]').forEach((s) => obs.observe(s))
    }, 100)
    return () => obs.disconnect()
  }, [])
  return active
}

/* ─────────────── DATA ─────────────── */
const NAV = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Playbooks', id: 'playbooks' },
  { label: 'IR Reports', id: 'ir-reports' },
  { label: 'Articles', id: 'articles' },
  { label: 'Contact', id: 'contact' },
]

const SKILLS = [
  { cat: 'SIEM & Monitoring', items: ['Splunk', 'Microsoft Sentinel', 'Elastic SIEM', 'Wazuh', 'QRadar'] },
  { cat: 'Threat Intelligence', items: ['MITRE ATT&CK', 'VirusTotal', 'AbuseIPDB', 'OSINT', 'Threat Hunting'] },
  { cat: 'Network & Endpoint', items: ['Wireshark', 'Snort / Suricata', 'CrowdStrike', 'Velociraptor'] },
  { cat: 'Scripting & Automation', items: ['Python', 'PowerShell', 'Bash', 'KQL', 'SPL'] },
  { cat: 'Frameworks', items: ['NIST CSF', 'ISO 27001', 'OWASP Top 10', 'CIS Controls'] },
  { cat: 'Certifications', items: ['CompTIA Security+', 'Google Cybersec Cert', 'TryHackMe SOC 1', 'Splunk Core User', 'Remote IT & Security
Management Program - Foundations','SC-200 Microsoft Security Operations Analyst', 'ISO/IEC 27001:2022 Lead', 'Reverse Engineering and
Malware Analysis'] },
]

const PROJECTS = [
  {
    title: 'Home SOC Lab',
    desc: 'Built a full SOC environment with Wazuh, TheHive, and Shuffle SOAR for automated detection and response workflows.',
    tags: ['Wazuh', 'TheHive', 'SOAR', 'Docker'],
    status: 'COMPLETED',
    url: 'soc-lab',
    color: '#00b4d8',
  },
  {
    title: 'Phishing Analysis Toolkit',
    desc: 'Python-based toolkit for email header analysis, URL deobfuscation, and automated IOC extraction from phishing campaigns.',
    tags: ['Python', 'Email Security', 'IOC Extraction'],
    status: 'COMPLETED',
    url: 'phishing-toolkit',
    color: '#00e5a0',
  },
  {
    title: 'SIEM Detection Rules',
    desc: 'Custom Splunk detection rules mapped to MITRE ATT&CK for identifying lateral movement and privilege escalation.',
    tags: ['Splunk', 'MITRE ATT&CK', 'Detection Engineering'],
    status: 'IN PROGRESS',
    url: 'detection-rules',
    color: '#f5a623',
  },
  {
    title: 'Network Traffic Analyzer',
    desc: 'Packet capture analysis dashboard using Wireshark exports and Python to spot anomalous traffic and potential C2 beacons.',
    tags: ['Wireshark', 'Python', 'Threat Detection'],
    status: 'COMPLETED',
    url: 'network-analyzer',
    color: '#8b5cf6',
  },
]

const PLAYBOOKS = [
  {
    title: 'Phishing Incident Response',
    severity: 'HIGH',
    steps: ['Identify & isolate affected mailbox', 'Extract IOCs from headers & body', 'Block sender domain & malicious URLs', 'Scan endpoints for payload execution', 'Notify affected users & reset credentials', 'Document findings & update filters'],
    tools: ['Splunk', 'VirusTotal', 'Exchange Admin'],
    mitre: 'T1566.001 — Spearphishing Attachment',
  },
  {
    title: 'Malware Containment',
    severity: 'CRITICAL',
    steps: ['Isolate infected endpoint from network', 'Capture memory dump & disk image', 'Identify malware family & C2 infrastructure', 'Block C2 domains/IPs at firewall', 'Scan environment for lateral spread', 'Remediate, restore, and monitor'],
    tools: ['CrowdStrike', 'Velociraptor', 'YARA'],
    mitre: 'T1059 — Command & Scripting Interpreter',
  },
  {
    title: 'Brute Force Detection',
    severity: 'MEDIUM',
    steps: ['Detect >5 failed logins in 10 min window', 'Correlate source IP across accounts', 'Check for successful auth after failures', 'Block source IP if external', 'Enforce password reset if compromised', 'Tune detection rules & add to watchlist'],
    tools: ['Microsoft Sentinel', 'KQL', 'Azure AD'],
    mitre: 'T1110 — Brute Force',
  },
  {
    title: 'Data Exfiltration Response',
    severity: 'CRITICAL',
    steps: ['Identify unusual outbound data volumes', 'Correlate with user activity & DLP alerts', 'Block suspicious destinations', 'Preserve network logs & PCAP', 'Interview data owner for legitimacy', 'Escalate to legal if confirmed exfil'],
    tools: ['Wireshark', 'DLP', 'Firewall Logs'],
    mitre: 'T1041 — Exfiltration Over C2 Channel',
  },
]

const IR_REPORTS = [
  {
    id: 'IR-2026-001',
    title: 'Credential Harvesting via OAuth Phishing',
    date: '2026-02-15',
    severity: 'HIGH',
    status: 'CLOSED',
    summary: 'Threat actor distributed OAuth consent phishing emails targeting Microsoft 365 users. 3 accounts compromised before detection. Tokens revoked, conditional access policies updated.',
    iocs: ['login-microsft365[.]com', '185.234.xx.xx', 'SHA256: a3f2e8...'],
    mitre: ['T1566.002', 'T1528'],
    timeline: [
      { time: '09:15 UTC', event: 'First phishing email received' },
      { time: '09:42 UTC', event: 'User clicks OAuth consent link' },
      { time: '10:30 UTC', event: 'Suspicious mailbox rule detected by Sentinel' },
      { time: '10:45 UTC', event: 'SOC alerted — Severity: High' },
      { time: '11:00 UTC', event: 'Tokens revoked, sessions terminated' },
      { time: '11:30 UTC', event: 'Org-wide block applied' },
    ],
    lessons: 'Implement OAuth app whitelisting. Add conditional access requiring compliant device for token grants.',
  },
  {
    id: 'IR-2026-002',
    title: 'Ransomware Attempted Deployment — BlackCat Variant',
    date: '2026-01-28',
    severity: 'CRITICAL',
    status: 'CLOSED',
    summary: 'Initial access via vulnerable VPN appliance. Attacker performed AD enumeration and attempted to deploy BlackCat ransomware via PsExec. Contained before encryption began.',
    iocs: ['update-service[.]xyz', '103.45.xx.xx', 'PsExec renamed as svchost.exe'],
    mitre: ['T1190', 'T1021.002', 'T1486'],
    timeline: [
      { time: '02:00 UTC', event: 'VPN exploit triggers IDS alert' },
      { time: '02:15 UTC', event: 'AD enumeration detected via honey token' },
      { time: '02:30 UTC', event: 'PsExec lateral movement attempt flagged' },
      { time: '02:35 UTC', event: 'SOC isolates 3 endpoints via EDR' },
      { time: '03:00 UTC', event: 'Attacker C2 blocked at perimeter' },
      { time: '04:00 UTC', event: 'Full containment confirmed' },
    ],
    lessons: 'Patch VPN appliances within 24h of critical CVE. Deploy honey tokens across AD to catch enumeration early.',
  },
  {
    id: 'IR-2026-003',
    title: 'Insider Threat — Unauthorized Data Access',
    date: '2026-01-10',
    severity: 'MEDIUM',
    status: 'CLOSED',
    summary: 'Employee in marketing accessed restricted financial directories. DLP flagged bulk download of 2,400 files. Investigation found no exfiltration, but violated least-privilege policies.',
    iocs: ['Internal user: jdoe@corp', 'Bulk download: /finance/q4-reports/'],
    mitre: ['T1530', 'T1083'],
    timeline: [
      { time: '14:00 UTC', event: 'DLP alert: bulk file access' },
      { time: '14:15 UTC', event: 'SOC reviews user activity logs' },
      { time: '14:30 UTC', event: 'Access revoked, manager notified' },
      { time: '15:00 UTC', event: 'No exfil detected on network' },
      { time: '16:00 UTC', event: 'HR investigation initiated' },
    ],
    lessons: 'Review file-share permissions quarterly. Enforce need-to-know access with automated access reviews.',
  },
]

const ARTICLES = [
  { title: 'Building a Home SOC Lab from Scratch', excerpt: 'Step-by-step guide to setting up your own SOC environment for hands-on threat detection practice.', date: '2026-02-10', readTime: '8 min' },
  { title: 'Dissecting a Real Phishing Campaign', excerpt: 'Analysis of a sophisticated phishing attack targeting financial institutions, with IOC extraction and MITRE mapping.', date: '2026-01-25', readTime: '6 min' },
  { title: 'Getting Started with Splunk for SOC Analysts', excerpt: 'Essential SPL queries and dashboard configurations every junior SOC analyst should know on day one.', date: '2026-01-12', readTime: '10 min' },
  { title: 'MITRE ATT&CK: A Practical Guide for Blue Teams', excerpt: 'How to leverage the ATT&CK framework to improve detection coverage and prioritize defensive investments.', date: '2025-12-20', readTime: '12 min' },
]

/* ─────────────── SMALL COMPONENTS ─────────────── */
function SeverityBadge({ level }) {
  const colors = { CRITICAL: '#ef4444', HIGH: '#f5a623', MEDIUM: '#00b4d8', LOW: '#00e5a0' }
  const c = colors[level] || '#8892a4'
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em',
      color: c, border: `1px solid ${c}30`, padding: '2px 10px', borderRadius: '2px',
      background: `${c}10`, fontWeight: 600,
    }}>
      {level}
    </span>
  )
}

function StatusBadge({ status }) {
  const c = status === 'COMPLETED' || status === 'CLOSED' ? '#00e5a0' : status === 'IN PROGRESS' ? '#00b4d8' : '#f5a623'
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em',
      color: c, border: `1px solid ${c}30`, padding: '2px 10px', borderRadius: '2px',
      background: `${c}10`,
    }}>
      ● {status}
    </span>
  )
}

function SectionHeader({ num, label, title, highlight }) {
  return (
    <>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
        color: 'var(--accent-blue)', letterSpacing: '0.2em', marginBottom: '1rem',
        textTransform: 'uppercase',
      }}>
        {num} // {label}
      </div>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 400, color: 'var(--text-primary)', marginBottom: '3rem',
        letterSpacing: '-0.02em', lineHeight: 1.2,
      }}>
        {title} <span style={{ color: 'var(--text-muted)' }}>{highlight}</span>
      </h2>
    </>
  )
}

function BrowserMockup({ url, color, children }) {
  return (
    <div style={{
      background: '#0d0d0d', borderRadius: '10px', overflow: 'hidden',
      border: '1px solid #1a1a1a',
    }}>
      <div style={{
        padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px',
        background: '#080808', borderBottom: '1px solid #1a1a1a',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f5a623' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#00e5a0' }} />
        <div style={{
          flex: 1, marginLeft: '8px', background: '#050505', borderRadius: '6px',
          padding: '5px 14px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
          color: '#4a5568',
        }}>
          {url}
        </div>
      </div>
      <div style={{
        height: '180px', background: `linear-gradient(135deg, ${color}15, ${color}05)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(${color}15 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }} />
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '2.5rem', fontWeight: 700,
          color: `${color}30`, letterSpacing: '-0.05em', position: 'relative',
        }}>
          {children}
        </div>
      </div>
    </div>
  )
}

/* ─────────────── NAVBAR ─────────────── */
function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(0, 0, 0, 0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-primary)' : '1px solid transparent',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '0 2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        height: '70px',
      }}>
        <a href="#" style={{
          fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 700,
          color: 'var(--accent-blue)',
        }}>
          <span style={{ color: 'var(--text-muted)' }}>~/</span>ifediora
          <span className="cursor-blink" style={{ color: 'var(--accent-green)' }}>_</span>
        </a>

        {/* Desktop */}
        <div className="nav-desktop" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {NAV.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.04em',
              color: active === n.id ? 'var(--accent-blue)' : 'var(--text-muted)',
              textTransform: 'uppercase', transition: 'color 0.3s',
            }}>
              <span style={{ color: 'var(--accent-blue)', opacity: 0.4 }}>0{i + 1}.</span> {n.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button className="nav-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} style={{
          display: 'none', background: 'none', border: '1px solid var(--border-primary)',
          color: 'var(--accent-blue)', padding: '8px 12px', cursor: 'pointer',
          fontFamily: 'var(--font-mono)', fontSize: '0.85rem', borderRadius: '4px',
        }}>
          {mobileOpen ? '[×]' : '[≡]'}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="nav-mobile-menu" style={{
          background: 'rgba(0, 0, 0, 0.98)', padding: '0.5rem 2rem 1.5rem',
          borderBottom: '1px solid var(--border-primary)',
        }}>
          {NAV.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setMobileOpen(false)} style={{
              display: 'block', padding: '0.75rem 0',
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
              color: 'var(--text-secondary)', textTransform: 'uppercase',
              letterSpacing: '0.05em', borderBottom: '1px solid #0f0f0f',
            }}>
              <span style={{ color: 'var(--accent-blue)', opacity: 0.4 }}>0{i + 1}.</span> {n.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ─────────────── HERO ─────────────── */
function Hero() {
  const [ref, vis] = useInView()
  const [typed, setTyped] = useState('')
  const text = '$ whoami'
  useEffect(() => {
    let i = 0
    const iv = setInterval(() => {
      if (i <= text.length) { setTyped(text.slice(0, i)); i++ }
      else clearInterval(iv)
    }, 80)
    return () => clearInterval(iv)
  }, [])

  return (
    <section ref={ref} style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: '2rem',
    }}>
      {/* Grid bg */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(0,180,216,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        mask: 'radial-gradient(ellipse 70% 55% at 50% 50%, black 20%, transparent 70%)',
        WebkitMask: 'radial-gradient(ellipse 70% 55% at 50% 50%, black 20%, transparent 70%)',
      }} />

      <div style={{
        textAlign: 'center', position: 'relative', zIndex: 2,
        opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-green)',
          letterSpacing: '0.2em', marginBottom: '1.5rem', textTransform: 'uppercase',
        }}>
          {typed}<span className="cursor-blink" style={{ color: 'var(--accent-green)' }}>▊</span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
          fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.05,
          marginBottom: '1.5rem', letterSpacing: '-0.03em',
        }}>
          Ifediora{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00b4d8, #0077b6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Okolo</span>
        </h1>

        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.75rem, 1.5vw, 0.95rem)',
          color: 'var(--text-muted)', marginBottom: '2.5rem', letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          SOC Analyst &nbsp;·&nbsp; Threat Hunter &nbsp;·&nbsp; Blue Team
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)',
          padding: '0.75rem 1.5rem', border: '1px solid var(--border-primary)',
          borderRadius: '4px', display: 'inline-flex', flexWrap: 'wrap',
          justifyContent: 'center', gap: '0.5rem',
          background: 'rgba(0, 0, 0, 0.6)',
        }}>
          <span><span style={{ color: 'var(--accent-green)' }}>STATUS:</span> <span style={{ color: 'var(--accent-blue)' }}>ACTIVE</span></span>
          <span style={{ color: '#1a1a1a' }}>│</span>
          <span><span style={{ color: 'var(--accent-green)' }}>CLEARANCE:</span> <span style={{ color: 'var(--accent-blue)' }}>BLUE TEAM</span></span>
          <span style={{ color: '#1a1a1a' }}>│</span>
          <span><span style={{ color: 'var(--accent-green)' }}>THREAT LEVEL:</span> <span style={{ color: 'var(--accent-amber)' }}>MONITORED</span></span>
        </div>
      </div>

      <a href="#about" style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        }}>
          SCROLL <span className="float-anim">↓</span>
        </div>
      </a>
    </section>
  )
}

/* ─────────────── ABOUT ─────────────── */
function About() {
  const [ref, vis] = useInView()
  return (
    <section id="about" ref={ref} style={{
      padding: '8rem 2rem', maxWidth: '900px', margin: '0 auto',
      opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(50px)',
      transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <SectionHeader num="01" label="About Me" title="Defending networks," highlight="one alert at a time." />

      <div style={{
        fontFamily: 'var(--font-body)', fontSize: '1.05rem',
        color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '680px',
        marginTop: '-1rem',
      }}>
        <p style={{ marginBottom: '1.5rem' }}>
          I'm a SOC Analyst passionate about protecting organizations from cyber threats.
          I specialize in threat detection, incident response, and security monitoring,
          turning raw alerts into actionable intelligence.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          My approach combines hands on technical skills with analytical thinking.
          From triaging phishing attempts to hunting for advanced persistent threats,
          I thrive in the fast-paced world of security operations.
        </p>
        <p>
          When I'm not monitoring dashboards, you'll find me building home labs,
          writing about cybersecurity, and contributing to the blue team community.
        </p>
      </div>

      <div style={{
        marginTop: '3rem', padding: '1.25rem 1.5rem',
        border: '1px solid var(--border-primary)', borderRadius: '4px',
        fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
        color: 'var(--text-muted)', background: 'rgba(0, 180, 216, 0.03)',
        borderLeft: '3px solid var(--accent-blue)',
      }}>
        <span style={{ color: 'var(--accent-green)' }}>$</span> cat /etc/analyst-profile<br />
        <span style={{ color: 'var(--text-secondary)' }}>
          Focus: Detection & Response &nbsp;|&nbsp; Location: Ireland 🇮🇪 &nbsp;|&nbsp; Available for: Hybrid / Remote Roles
        </span>
      </div>
    </section>
  )
}

/* ─────────────── SKILLS ─────────────── */
function Skills() {
  const [ref, vis] = useInView()
  return (
    <section id="skills" ref={ref} style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{
        opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <SectionHeader num="02" label="Skills & Certifications" title="Arsenal &" highlight="Credentials" />
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem',
      }}>
        {SKILLS.map((s, i) => (
          <SkillCard key={s.cat} skill={s} delay={i * 0.08} />
        ))}
      </div>
    </section>
  )
}

function SkillCard({ skill, delay }) {
  const [ref, vis] = useInView(0.1)
  return (
    <div ref={ref} style={{
      padding: '1.75rem', border: '1px solid var(--border-primary)', borderRadius: '8px',
      background: 'linear-gradient(135deg, rgba(0,180,216,0.03), var(--bg-secondary))',
      opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)',
      transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      cursor: 'default',
    }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,180,216,0.2)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-primary)' }}
    >
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-blue)',
        letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem',
        display: 'flex', alignItems: 'center', gap: '0.5rem',
      }}>
        <span className="pulse-dot" style={{
          width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-blue)',
          display: 'inline-block',
        }} />
        {skill.cat}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
        {skill.items.map((item) => (
          <span key={item} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)',
            padding: '4px 10px', border: '1px solid var(--border-primary)', borderRadius: '3px',
            background: 'rgba(0, 0, 0, 0.5)', transition: 'all 0.3s',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,180,216,0.3)'; e.currentTarget.style.color = 'var(--accent-blue)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-primary)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─────────────── PROJECTS ─────────────── */
function Projects() {
  const [ref, vis] = useInView()
  return (
    <section id="projects" ref={ref} style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{
        opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <SectionHeader num="03" label="Featured Projects" title="Field" highlight="Operations" />
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem',
      }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} delay={i * 0.1} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project, delay }) {
  const [ref, vis] = useInView(0.1)
  const [hov, setHov] = useState(false)
  return (
    <div ref={ref} style={{
      borderRadius: '12px', overflow: 'hidden',
      border: `1px solid ${hov ? 'rgba(0,180,216,0.2)' : 'var(--border-primary)'}`,
      background: 'var(--bg-card)', transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)',
      cursor: 'pointer',
    }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <BrowserMockup url={`portfolio/${project.url}`} color={project.color}>
        {project.title.split(' ').map(w => w[0]).join('')}
      </BrowserMockup>

      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-body)', fontSize: '1.15rem', fontWeight: 600,
            color: 'var(--text-primary)',
          }}>{project.title}</h3>
          <StatusBadge status={project.status} />
        </div>

        <div style={{
          width: '40px', height: '3px', borderRadius: '2px', marginBottom: '0.75rem',
          background: project.color,
        }} />

        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.88rem',
          color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1rem',
        }}>{project.desc}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {project.tags.map((t) => (
            <span key={t} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: project.color,
              padding: '3px 8px', borderRadius: '3px',
              background: `${project.color}12`, border: `1px solid ${project.color}20`,
              letterSpacing: '0.03em',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────── PLAYBOOKS ─────────────── */
function Playbooks() {
  const [ref, vis] = useInView()
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <section id="playbooks" ref={ref} style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{
        opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <SectionHeader num="04" label="Playbooks" title="Response" highlight="Procedures" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {PLAYBOOKS.map((pb, i) => (
          <PlaybookCard key={pb.title} pb={pb} idx={i} open={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? null : i)} />
        ))}
      </div>
    </section>
  )
}

function PlaybookCard({ pb, idx, open, onToggle }) {
  const [ref, vis] = useInView(0.1)
  return (
    <div ref={ref} style={{
      border: `1px solid ${open ? 'rgba(0,180,216,0.2)' : 'var(--border-primary)'}`,
      borderRadius: '10px', overflow: 'hidden',
      background: open ? 'var(--bg-card)' : 'var(--bg-secondary)',
      opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.08}s`,
    }}>
      {/* Header */}
      <div onClick={onToggle} style={{
        padding: '1.25rem 1.5rem', cursor: 'pointer',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '0.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)',
            background: 'var(--bg-primary)', padding: '4px 10px', borderRadius: '3px',
            border: '1px solid var(--border-primary)',
          }}>PB-{String(idx + 1).padStart(3, '0')}</span>
          <h3 style={{
            fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: 600,
            color: 'var(--text-primary)',
          }}>{pb.title}</h3>
          <SeverityBadge level={pb.severity} />
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--accent-blue)',
          transition: 'transform 0.3s',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}>+</span>
      </div>

      {/* Expanded */}
      {open && (
        <div style={{
          padding: '0 1.5rem 1.5rem',
          animation: 'fadeInUp 0.3s ease-out',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent-blue)',
            marginBottom: '0.75rem', letterSpacing: '0.1em',
          }}>
            MITRE: {pb.mitre}
          </div>

          {/* Steps */}
          <div style={{
            background: 'var(--bg-primary)', borderRadius: '8px',
            padding: '1.25rem', border: '1px solid var(--border-primary)',
            marginBottom: '1rem',
          }}>
            {pb.steps.map((step, si) => (
              <div key={si} style={{
                display: 'flex', gap: '0.75rem', marginBottom: si < pb.steps.length - 1 ? '0.75rem' : 0,
                alignItems: 'flex-start',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  color: 'var(--accent-green)', fontWeight: 700,
                  background: 'rgba(0, 229, 160, 0.1)',
                  minWidth: '24px', height: '24px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '4px', border: '1px solid rgba(0, 229, 160, 0.2)',
                  flexShrink: 0,
                }}>{si + 1}</span>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                  color: 'var(--text-secondary)', lineHeight: 1.6, paddingTop: '2px',
                }}>{step}</span>
              </div>
            ))}
          </div>

          {/* Tools */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)',
              letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: '0.5rem',
              lineHeight: '24px',
            }}>TOOLS:</span>
            {pb.tools.map((t) => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                color: 'var(--accent-blue)', padding: '3px 8px', borderRadius: '3px',
                background: 'var(--accent-blue-dim)', border: '1px solid rgba(0,180,216,0.15)',
              }}>{t}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─────────────── IR REPORTS ─────────────── */
function IRReports() {
  const [ref, vis] = useInView()
  const [openId, setOpenId] = useState(null)
  return (
    <section id="ir-reports" ref={ref} style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{
        opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <SectionHeader num="05" label="IR Reports" title="Incident" highlight="Case Files" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {IR_REPORTS.map((ir, i) => (
          <IRCard key={ir.id} ir={ir} idx={i} open={openId === ir.id}
            onToggle={() => setOpenId(openId === ir.id ? null : ir.id)} />
        ))}
      </div>
    </section>
  )
}

function IRCard({ ir, idx, open, onToggle }) {
  const [ref, vis] = useInView(0.1)
  return (
    <div ref={ref} style={{
      border: `1px solid ${open ? 'rgba(0,180,216,0.2)' : 'var(--border-primary)'}`,
      borderRadius: '10px', overflow: 'hidden',
      background: open ? 'var(--bg-card)' : 'var(--bg-secondary)',
      opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s`,
    }}>
      {/* Header */}
      <div onClick={onToggle} style={{
        padding: '1.25rem 1.5rem', cursor: 'pointer',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '0.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-blue)',
            background: 'var(--accent-blue-dim)', padding: '4px 10px', borderRadius: '3px',
            border: '1px solid rgba(0,180,216,0.15)', fontWeight: 600,
          }}>{ir.id}</span>
          <h3 style={{
            fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600,
            color: 'var(--text-primary)', flex: 1, minWidth: '200px',
          }}>{ir.title}</h3>
          <SeverityBadge level={ir.severity} />
          <StatusBadge status={ir.status} />
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--accent-blue)',
          transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}>+</span>
      </div>

      {/* Expanded */}
      {open && (
        <div style={{ padding: '0 1.5rem 1.5rem', animation: 'fadeInUp 0.3s ease-out' }}>
          {/* Summary */}
          <div style={{
            padding: '1rem 1.25rem', background: 'var(--bg-primary)', borderRadius: '8px',
            border: '1px solid var(--border-primary)', marginBottom: '1rem',
            borderLeft: '3px solid var(--accent-blue)',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-blue)',
              letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem',
            }}>EXECUTIVE SUMMARY</div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.88rem',
              color: 'var(--text-secondary)', lineHeight: 1.65,
            }}>{ir.summary}</p>
          </div>

          {/* Two column: Timeline + IOCs */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem',
            marginBottom: '1rem',
          }}>
            {/* Timeline */}
            <div style={{
              padding: '1rem 1.25rem', background: 'var(--bg-primary)', borderRadius: '8px',
              border: '1px solid var(--border-primary)',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-green)',
                letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem',
              }}>TIMELINE</div>
              {ir.timeline.map((t, ti) => (
                <div key={ti} style={{
                  display: 'flex', gap: '0.75rem', marginBottom: ti < ir.timeline.length - 1 ? '0.6rem' : 0,
                  alignItems: 'flex-start',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-blue)',
                    whiteSpace: 'nowrap', minWidth: '70px', paddingTop: '1px',
                  }}>{t.time}</span>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-blue)',
                    flexShrink: 0, marginTop: '6px',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.82rem',
                    color: 'var(--text-secondary)', lineHeight: 1.5,
                  }}>{t.event}</span>
                </div>
              ))}
            </div>

            {/* IOCs + MITRE */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                padding: '1rem 1.25rem', background: 'var(--bg-primary)', borderRadius: '8px',
                border: '1px solid var(--border-primary)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-red)',
                  letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem',
                }}>INDICATORS OF COMPROMISE</div>
                {ir.iocs.map((ioc, ii) => (
                  <div key={ii} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)',
                    padding: '4px 0', borderBottom: ii < ir.iocs.length - 1 ? '1px solid #1a1a1a' : 'none',
                  }}>
                    <span style={{ color: 'var(--accent-red)', marginRight: '0.5rem' }}>▸</span>
                    {ioc}
                  </div>
                ))}
              </div>

              <div style={{
                padding: '1rem 1.25rem', background: 'var(--bg-primary)', borderRadius: '8px',
                border: '1px solid var(--border-primary)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-purple)',
                  letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem',
                }}>MITRE ATT&CK</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {ir.mitre.map((m) => (
                    <span key={m} style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                      color: 'var(--accent-purple)', padding: '3px 8px', borderRadius: '3px',
                      background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)',
                    }}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lessons */}
          <div style={{
            padding: '1rem 1.25rem', background: 'rgba(0, 229, 160, 0.04)', borderRadius: '8px',
            border: '1px solid rgba(0, 229, 160, 0.1)', borderLeft: '3px solid var(--accent-green)',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-green)',
              letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem',
            }}>LESSONS LEARNED</div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.88rem',
              color: 'var(--text-secondary)', lineHeight: 1.6,
            }}>{ir.lessons}</p>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─────────────── ARTICLES ─────────────── */
function Articles() {
  const [ref, vis] = useInView()
  return (
    <section id="articles" ref={ref} style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{
        opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <SectionHeader num="06" label="Articles" title="Threat" highlight="Intel Reports" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {ARTICLES.map((a, i) => (
          <ArticleRow key={a.title} article={a} idx={i} />
        ))}
      </div>
    </section>
  )
}

function ArticleRow({ article, idx }) {
  const [ref, vis] = useInView(0.1)
  const [hov, setHov] = useState(false)
  return (
    <div ref={ref} style={{
      padding: '1.75rem 0', borderBottom: '1px solid var(--border-primary)',
      opacity: vis ? 1 : 0, transform: vis ? 'translateX(0)' : 'translateX(-30px)',
      transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.08}s`,
      cursor: 'pointer',
    }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-body)', fontSize: '1.1rem', fontWeight: 600,
          color: hov ? 'var(--accent-blue)' : 'var(--text-primary)',
          transition: 'color 0.3s',
        }}>{article.title}</h3>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)',
          whiteSpace: 'nowrap',
        }}>
          {article.date} · {article.readTime}
        </span>
      </div>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '0.9rem',
        color: 'var(--text-secondary)', lineHeight: 1.6,
      }}>{article.excerpt}</p>
    </div>
  )
}

/* ─────────────── CONTACT ─────────────── */
function Contact() {
  const [ref, vis] = useInView()
  return (
    <section id="contact" ref={ref} style={{
      padding: '8rem 2rem 6rem', maxWidth: '900px', margin: '0 auto',
    }}>
      <div style={{
        opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-blue)',
          letterSpacing: '0.2em', marginBottom: '1rem', textTransform: 'uppercase',
        }}>07 // Contact</div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 400, color: 'var(--text-primary)', marginBottom: '1.5rem',
          letterSpacing: '-0.02em',
        }}>
          Let's <span style={{ color: 'var(--text-muted)' }}>Connect</span>
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '1.05rem',
          color: 'var(--text-secondary)', lineHeight: 1.7,
          maxWidth: '500px', margin: '0 auto 2.5rem',
        }}>
          Interested in working together or discussing cybersecurity?
          I'm always open to new opportunities and conversations.
        </p>
        <div style={{
          display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
        }}>
          <ContactBtn primary href="mailto:ifediora1000@gmail.com"> Email → </ContactBtn>
          <ContactBtn href="http://linkedin.com/in/ifediora-okolo-0896b8217">LinkedIn</ContactBtn>
          <ContactBtn href="https://github.com/ifedili">GitHub</ContactBtn>
        </div>
      </div>
    </section>
  )
}

function ContactBtn({ primary, href, children }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.05em',
      padding: '0.85rem 2rem', borderRadius: '5px', display: 'inline-block',
      fontWeight: 600, transition: 'all 0.3s', cursor: 'pointer',
      ...(primary ? {
        color: 'var(--bg-primary)', background: hov ? '#0096b7' : 'var(--accent-blue)',
        border: 'none', boxShadow: hov ? '0 0 30px rgba(0,180,216,0.3)' : 'none',
      } : {
        color: 'var(--accent-blue)',
        border: `1px solid ${hov ? 'rgba(0,180,216,0.5)' : 'rgba(0,180,216,0.2)'}`,
        background: hov ? 'rgba(0,180,216,0.08)' : 'transparent',
      }),
    }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >{children}</a>
  )
}

/* ─────────────── FOOTER ─────────────── */
function Footer() {
  return (
    <footer style={{
      padding: '2rem', borderTop: '1px solid #111111', textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)',
        letterSpacing: '0.1em', display: 'flex', justifyContent: 'center',
        flexWrap: 'wrap', gap: '0.5rem',
      }}>
        <span>© 2026 IFEDIORA OKOLO</span>
        <span style={{ color: '#1a1a1a' }}>│</span>
        <span>SECURING THE DIGITAL FRONTIER</span>
        <span style={{ color: '#1a1a1a' }}>│</span>
        <span style={{ color: 'var(--accent-green)' }}>ALL SYSTEMS OPERATIONAL</span>
      </div>
    </footer>
  )
}

/* ─────────────── APP ─────────────── */
export default function App() {
  const active = useActiveSection()

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
      <Navbar active={active} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Playbooks />
      <IRReports />
      <Articles />
      <Contact />
      <Footer />
    </>
  )
}
