import { Link } from "react-router-dom"

function Footer(){
  return(
    <footer className="border-t" style={{borderColor:'var(--border-subtle)', background:'rgba(8,8,8,0.95)'}}>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 gold-gradient rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5" fill="#080808" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
                </svg>
              </div>
              <span className="text-xl font-bold gold-text">MotoVerse</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{color:'var(--text-muted)'}}>
              The premium automotive marketplace connecting discerning buyers with verified dealers worldwide.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-5">
              {[
                "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z",
                "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
              ].map((path, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{background:'rgba(212,175,55,0.06)', border:'1px solid var(--border-gold)'}}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(212,175,55,0.15)'; e.currentTarget.style.boxShadow='var(--glow-gold-sm)'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='rgba(212,175,55,0.06)'; e.currentTarget.style.boxShadow='none'}}
                >
                  <svg className="w-4 h-4" fill="var(--gold-primary)" viewBox="0 0 24 24"><path d={path}/></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-5" style={{color:'var(--gold-primary)'}}>Explore</h3>
            <ul className="space-y-3">
              {[
                { label: "Browse Cars", to: "/cars" },
                { label: "Home", to: "/" },
                { label: "Messages", to: "/messages" },
                { label: "My Profile", to: "/profile" },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm transition-colors duration-200"
                    style={{color:'var(--text-muted)'}}
                    onMouseEnter={e=>e.target.style.color='var(--gold-primary)'}
                    onMouseLeave={e=>e.target.style.color='var(--text-muted)'}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-5" style={{color:'var(--gold-primary)'}}>Legal & Support</h3>
            <ul className="space-y-3">
              {[
                { label: "Privacy Policy", to: "/privacy" },
                { label: "Terms of Service", to: "/terms" },
                { label: "Support Center", to: "/support" },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm transition-colors duration-200"
                    style={{color:'var(--text-muted)'}}
                    onMouseEnter={e=>e.target.style.color='var(--gold-primary)'}
                    onMouseLeave={e=>e.target.style.color='var(--text-muted)'}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="divider-gold mb-6"/>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{color:'var(--text-muted)'}}>
            © 2026 MotoVerse. All rights reserved. Premium Automotive Experience.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{background:'#22c55e'}}/>
            <span className="text-xs font-medium" style={{color:'var(--text-muted)'}}>All systems operational</span>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer