import { Link } from "react-router-dom"

const faqs = [
  { q: "How do I schedule a test drive?", a: "Navigate to any car listing and click the 'Schedule Test Drive' button. Choose your preferred date and time, and your request will be sent to the dealer for confirmation." },
  { q: "How long does dealer confirmation take?", a: "Most dealers confirm test drive requests within 2–4 business hours. You'll see the status update in your Profile page under 'My Test Drives'." },
  { q: "Can I cancel a test drive request?", a: "Yes. Go to your Profile page, find the booking under 'My Test Drives', and click Cancel. Please cancel at least 24 hours in advance." },
  { q: "How do I contact a dealer directly?", a: "On any car detail page, click 'Contact Dealer'. This opens the Messages section where you can chat directly with the verified dealer." },
  { q: "How do I update my profile information?", a: "Go to Profile in the sidebar, then click 'Edit Profile' to update your name and phone number." },
  { q: "I can't log in — what should I do?", a: "Try resetting your password via the login page. If the issue persists, contact us at support@motoverse.com." },
]

const channels = [
  { icon: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z", label: "Email Support", value: "support@motoverse.com", sub: "Response within 24 hours", href: "mailto:support@motoverse.com" },
  { icon: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z", label: "Phone Support", value: "+1 (800) MOTO-VRS", sub: "Mon–Fri, 9 AM – 6 PM", href: "tel:+18006686877" },
  { icon: "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z", label: "Live Chat", value: "Chat with us now", sub: "Available 24/7 for premium members", href: "#" },
]

function Support() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>

      <div className="hero-orb" style={{ width: "500px", height: "500px", top: "-80px", right: "-120px", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)" }} />
      <div className="hero-orb delay-300" style={{ width: "350px", height: "350px", bottom: "10%", left: "-80px", background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">

        <Link to="/" className="btn-ghost inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold mb-10">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-eyebrow justify-center mb-4">Help Center</div>
          <h1 className="font-display text-5xl font-black mb-5" style={{ color: "var(--text-primary)" }}>
            How Can We <span className="gold-text">Help?</span>
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Our expert support team is here to ensure your MotoVerse experience is seamless.
          </p>
          <div className="divider-gold mt-8" />
        </div>

        {/* Contact Channels */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {channels.map((c, i) => (
            <a key={i} href={c.href} className="glass-card rounded-3xl p-7 text-center group" style={{ textDecoration: "none" }}>
              <div className="w-12 h-12 gold-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="#080808" viewBox="0 0 24 24">
                  <path d={c.icon} />
                </svg>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "var(--text-primary)" }}>{c.label}</h3>
              <p className="text-base font-semibold mb-1 gold-text">{c.value}</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{c.sub}</p>
            </a>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-14">
          <div className="section-eyebrow mb-6">Frequently Asked Questions</div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="glass-card rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 gold-gradient rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-black" style={{ color: "#080808" }}>Q</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{f.q}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Still need help */}
        <div className="glass-card rounded-3xl p-10 text-center gold-border" style={{ boxShadow: "var(--glow-gold-sm)" }}>
          <h2 className="font-display text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            Still need <span className="gold-text">help?</span>
          </h2>
          <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
            Our team is standing by. Reach out and we'll get back to you within one business day.
          </p>
          <a href="mailto:support@motoverse.com" className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            Email Support Team
          </a>
        </div>

        <div className="flex justify-center gap-6 mt-10">
          {[{ label: "Privacy Policy", to: "/privacy" }, { label: "Terms of Service", to: "/terms" }].map(l => (
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

export default Support
