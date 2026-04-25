import { Link } from "react-router-dom"

const sections = [
  {
    title: "Acceptance of Terms",
    icon: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
    content: [
      "By accessing or using MotoVerse, you confirm that you are at least 18 years of age and agree to be bound by these Terms of Service.",
      "These terms apply to all visitors, registered users, dealers, and administrators of the platform.",
      "We reserve the right to update these terms at any time. Continued use constitutes acceptance of revised terms.",
    ],
  },
  {
    title: "User Accounts",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z",
    content: [
      "You are responsible for maintaining the confidentiality of your account credentials.",
      "You must provide accurate, current, and complete information during registration.",
      "Accounts are non-transferable and may not be shared with third parties.",
      "MotoVerse reserves the right to suspend or terminate accounts that violate these terms.",
    ],
  },
  {
    title: "Dealer Listings",
    icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
    content: [
      "Dealers must ensure that all vehicle listings are accurate, legal, and up-to-date.",
      "Fraudulent, misleading, or duplicate listings are strictly prohibited.",
      "MotoVerse reserves the right to remove any listing at its sole discretion.",
      "Dealers are solely responsible for the accuracy of pricing, availability, and vehicle condition.",
    ],
  },
  {
    title: "Test Drive Bookings",
    icon: "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z",
    content: [
      "Test drive requests are subject to dealer availability and confirmation.",
      "MotoVerse acts as a facilitator only and is not a party to the agreement between you and the dealer.",
      "Cancellations must be made at least 24 hours in advance.",
      "MotoVerse is not liable for any incidents occurring during a test drive.",
    ],
  },
  {
    title: "Prohibited Conduct",
    icon: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z",
    content: [
      "Harassment, abuse, or threatening behavior toward other users or dealers.",
      "Posting false, misleading, or defamatory content.",
      "Attempting to hack, scrape, or reverse-engineer any part of the platform.",
      "Using the platform for any unlawful purpose.",
      "Circumventing platform fees by transacting off-platform.",
    ],
  },
  {
    title: "Limitation of Liability",
    icon: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z",
    content: [
      "MotoVerse is a marketplace and does not own, sell, or guarantee any vehicles listed.",
      "We are not responsible for losses arising from transactions between buyers and dealers.",
      "Our total liability is limited to fees paid to MotoVerse in the preceding 12 months.",
      "We do not warrant that the platform will be uninterrupted or error-free.",
    ],
  },
]

function TermsOfService() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="hero-orb" style={{ width: "500px", height: "500px", top: "-100px", left: "-100px", background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)" }} />
      <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">

        <Link to="/" className="btn-ghost inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold mb-10">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Back to Home
        </Link>

        <div className="text-center mb-16">
          <div className="section-eyebrow justify-center mb-4">Legal</div>
          <h1 className="font-display text-5xl font-black mb-5" style={{ color: "var(--text-primary)" }}>
            Terms of <span className="gold-text">Service</span>
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Effective date: <span style={{ color: "var(--gold-primary)" }}>January 1, 2026</span>
            &nbsp;&middot;&nbsp; Last updated: April 25, 2026
          </p>
          <div className="divider-gold mt-8" />
        </div>

        <div className="glass-card rounded-3xl p-8 mb-8 gold-border">
          <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Welcome to MotoVerse. These Terms of Service govern your access to and use of MotoVerse&apos;s website, services, and applications.
            By using MotoVerse, you agree to these Terms. MotoVerse reserves the right to modify these Terms at any time.
            Your continued use of the platform following any changes constitutes acceptance of the updated Terms.
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((s, i) => (
            <div key={i} className="glass-card rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="#080808" viewBox="0 0 24 24">
                    <path d={s.icon} />
                  </svg>
                </div>
                <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  <span className="mr-2" style={{ color: "var(--gold-primary)" }}>{String(i + 1).padStart(2, "0")}.</span>
                  {s.title}
                </h2>
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

        <div className="glass-card rounded-3xl p-8 mt-6 gold-border">
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Governing Law</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            These Terms shall be governed by and construed in accordance with applicable law.
            Any disputes shall be resolved through binding arbitration or in the competent courts of the relevant jurisdiction.
          </p>
        </div>

        <div className="flex justify-center gap-6 mt-10">
          {[{ label: "Privacy Policy", to: "/privacy" }, { label: "Support", to: "/support" }].map(l => (
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

export default TermsOfService
