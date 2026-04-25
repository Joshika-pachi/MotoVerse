import { Link } from "react-router-dom"

const sections = [
  {
    title: "Information We Collect",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
    content: [
      "Personal identification information (name, email address, phone number) provided during registration.",
      "Vehicle preferences, saved searches, and browsing activity within MotoVerse.",
      "Communication records between you and dealers through our messaging system.",
      "Test drive requests, including dates and vehicle preferences.",
      "Device information and usage analytics to improve our platform.",
    ],
  },
  {
    title: "How We Use Your Information",
    icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
    content: [
      "To facilitate connections between buyers and verified dealers.",
      "To send appointment confirmations, test drive reminders, and service updates.",
      "To personalize vehicle recommendations based on your browsing history.",
      "To maintain platform security and prevent fraudulent activity.",
      "To improve our services through aggregated, anonymized analytics.",
    ],
  },
  {
    title: "Data Sharing & Disclosure",
    icon: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z",
    content: [
      "We share your contact details with dealers only when you initiate a conversation or test drive booking.",
      "We do not sell your personal data to third-party advertisers.",
      "We may disclose information when required by law or to protect platform integrity.",
      "Anonymized, aggregated data may be used for industry research and reporting.",
    ],
  },
  {
    title: "Data Security",
    icon: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z",
    content: [
      "All data is encrypted in transit using TLS 1.3 and at rest using AES-256.",
      "Access to personal data is restricted to authorized personnel only.",
      "We conduct regular security audits and penetration testing.",
      "In the event of a breach, we will notify affected users within 72 hours.",
    ],
  },
  {
    title: "Your Rights",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
    content: [
      "Right to access: Request a copy of all personal data we hold about you.",
      "Right to rectification: Update or correct inaccurate information via your Profile.",
      "Right to erasure: Request deletion of your account and associated data.",
      "Right to portability: Receive your data in a structured, machine-readable format.",
      "Right to object: Opt out of marketing communications at any time.",
    ],
  },
  {
    title: "Cookies & Tracking",
    icon: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z",
    content: [
      "We use essential cookies to maintain your session and preferences.",
      "Analytics cookies help us understand platform usage (opt-out available).",
      "No third-party advertising cookies are used.",
      "You can manage cookie preferences via your browser settings.",
    ],
  },
]

function PrivacyPolicy() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>

      {/* Ambient */}
      <div className="hero-orb" style={{ width: "500px", height: "500px", top: "-100px", right: "-100px", background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)" }} />

      <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">

        {/* Back */}
        <Link to="/" className="btn-ghost inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold mb-10">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-eyebrow justify-center mb-4">Legal</div>
          <h1 className="font-display text-5xl font-black mb-5" style={{ color: "var(--text-primary)" }}>
            Privacy <span className="gold-text">Policy</span>
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Effective date: <span style={{ color: "var(--gold-primary)" }}>January 1, 2026</span> &nbsp;·&nbsp; Last updated: April 25, 2026
          </p>
          <div className="divider-gold mt-8" />
        </div>

        {/* Intro */}
        <div className="glass-card rounded-3xl p-8 mb-8 gold-border">
          <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            MotoVerse ("we", "our", or "us") is committed to protecting your personal information and your right to privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our premium automotive marketplace.
            Please read this document carefully. If you disagree with its terms, please discontinue use of MotoVerse.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((s, i) => (
            <div key={i} className="glass-card rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="#080808" viewBox="0 0 24 24">
                    <path d={s.icon} />
                  </svg>
                </div>
                <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{s.title}</h2>
              </div>
              <ul className="space-y-3">
                {s.content.map((c, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "var(--gold-primary)" }} />
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{c}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="glass-card rounded-3xl p-8 mt-8 gold-border text-center" style={{ boxShadow: "var(--glow-gold-sm)" }}>
          <div className="w-12 h-12 gold-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="#080808" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Privacy Questions?</h3>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            For privacy-related inquiries, contact our Data Protection Officer.
          </p>
          <a href="mailto:privacy@motoverse.com" className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm">
            privacy@motoverse.com
          </a>
        </div>

        {/* Footer nav */}
        <div className="flex justify-center gap-6 mt-10">
          {[{ label: "Terms of Service", to: "/terms" }, { label: "Support", to: "/support" }].map(l => (
            <Link key={l.to} to={l.to} className="text-sm transition" style={{ color: "var(--text-muted)" }}
              onMouseEnter={e => e.target.style.color = "var(--gold-primary)"}
              onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
            >{l.label}</Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
