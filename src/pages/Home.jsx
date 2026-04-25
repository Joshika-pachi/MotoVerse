import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"

function Home(){

const [role, setRole] = useState("customer")
const [mounted, setMounted] = useState(false)

useEffect(()=>{
  setMounted(true)
  loadUser()
},[])

async function loadUser(){
  try {
    const { data } = await supabase.auth.getUser()
    if(data.user){
      const { data: userData } = await supabase
        .from("users")
        .select("role")
        .eq("id", data.user.id)
        .single()
      if(userData) setRole(userData.role)
    }
  } catch(e) {}
}

const stats = [
  { value: "2,400+", label: "Premium Vehicles", icon: "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" },
  { value: "340+", label: "Verified Dealers", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" },
  { value: "98%", label: "Satisfaction Rate", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
  { value: "24/7", label: "Expert Support", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1-8h-2V7h2v2z" },
]

const features = [
  {
    icon: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
    title: "Smart Search",
    desc: "AI-powered filters to find your dream car in seconds. Filter by brand, price, year, and more.",
    badge: "AI Powered"
  },
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Instant Booking",
    desc: "Schedule test drives and reserve vehicles in real-time without delays or paperwork.",
    badge: "Real-Time"
  },
  {
    icon: "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z",
    title: "Direct Chat",
    desc: "Connect instantly with verified dealers for negotiations, questions, and exclusive deals.",
    badge: "Verified"
  }
]

return(
<div className="min-h-screen bg-dark overflow-x-hidden">

  {/* ===== HERO ===== */}
  <section className="hero-bg relative min-h-[90vh] flex items-center">

    {/* Ambient orbs */}
    <div className="hero-orb" style={{width:'500px',height:'500px',top:'-100px',left:'-150px',background:'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)'}}/>
    <div className="hero-orb delay-300" style={{width:'400px',height:'400px',bottom:'-80px',right:'-100px',background:'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)'}}/>

    {/* Grid lines background */}
    <div className="absolute inset-0 pointer-events-none" style={{
      backgroundImage: 'linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)',
      backgroundSize: '80px 80px'
    }}/>

    <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center relative z-10">

      {/* LEFT — TEXT */}
      <div className={mounted ? 'animate-fade-up' : 'opacity-0'}>
        <div className="section-eyebrow mb-6">Premium Automotive Experience</div>

        <h1 className="font-display text-6xl md:text-7xl font-black leading-tight mb-6">
          <span style={{color:'var(--text-primary)'}}>Drive Your</span>
          <br/>
          <span className="gold-text">Dream Car</span>
        </h1>

        <p className="text-lg mb-10 max-w-lg leading-relaxed" style={{color:'var(--text-secondary)'}}>
          Discover an exclusive collection of premium vehicles. Connect with verified dealers and book your perfect ride — all in one seamless experience.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/cars"
            className="btn-primary px-8 py-4 rounded-2xl text-base font-bold inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
            </svg>
            Explore Collection
          </Link>
          <Link
            to="/cars"
            className="btn-outline px-8 py-4 rounded-2xl text-base font-bold inline-flex items-center gap-2"
          >
            <span>Get Started</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{position:'relative',zIndex:1}}>
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
            </svg>
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex items-center gap-6 mt-10">
          {['🏆 Award-Winning', '🔒 Verified Dealers', '⚡ Instant Booking'].map((b, i) => (
            <span key={i} className="text-xs font-semibold" style={{color:'var(--text-muted)'}}>
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT — IMAGE */}
      <div className={`relative ${mounted ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
        <div className="relative rounded-3xl overflow-hidden" style={{boxShadow:'0 60px 120px rgba(0,0,0,0.6), 0 0 60px rgba(212,175,55,0.15)'}}>
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80"
            alt="Luxury Car"
            className="w-full h-[480px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60"/>
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-transparent opacity-30"/>
        </div>

        {/* Floating badge — Horsepower */}
        <div className="absolute -top-4 -right-4 glass-card rounded-2xl p-4 min-w-[120px] text-center gold-border" style={{boxShadow:'var(--glow-gold-sm)'}}>
          <div className="text-3xl font-black gold-text font-display">450</div>
          <div className="text-xs font-semibold mt-0.5" style={{color:'var(--text-secondary)'}}>Horsepower</div>
        </div>

        {/* Floating badge — Rating */}
        <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-4 gold-border" style={{boxShadow:'var(--glow-gold-sm)'}}>
          <div className="flex gap-0.5 mb-1">
            {[...Array(5)].map((_,i)=>(
              <svg key={i} className="w-3 h-3" fill="var(--gold-light)" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <div className="text-xs font-semibold" style={{color:'var(--text-secondary)'}}>4.9 Rating • 2.4k reviews</div>
        </div>
      </div>
    </div>
  </section>

  {/* ===== STATS BAR ===== */}
  <section className="border-y" style={{borderColor:'var(--border-subtle)'}}>
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className={`stat-card p-6 text-center ${mounted ? `animate-fade-up delay-${(i+1)*100}` : 'opacity-0'}`}>
            <div className="w-12 h-12 gold-gradient rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="#080808" viewBox="0 0 24 24">
                <path d={s.icon}/>
              </svg>
            </div>
            <div className="text-3xl font-black mb-1 gold-text font-display">{s.value}</div>
            <div className="text-sm font-medium" style={{color:'var(--text-secondary)'}}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ===== FEATURES ===== */}
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="section-eyebrow justify-center mb-4">Why Choose Us</div>
        <h2 className="font-display text-5xl font-black mb-5" style={{color:'var(--text-primary)'}}>
          The <span className="gold-text">MotoVerse</span> Difference
        </h2>
        <p className="text-lg max-w-2xl mx-auto" style={{color:'var(--text-secondary)'}}>
          We're redefining how you discover, evaluate, and own premium vehicles.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className={`glass-card rounded-3xl p-8 group ${mounted ? `animate-fade-up delay-${(i+1)*100}` : 'opacity-0'}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 gold-gradient rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7" fill="#080808" viewBox="0 0 24 24">
                  <path d={f.icon}/>
                </svg>
              </div>
              <span className="badge-gold">{f.badge}</span>
            </div>
            <h3 className="text-xl font-bold mb-3" style={{color:'var(--text-primary)'}}>{f.title}</h3>
            <p className="leading-relaxed" style={{color:'var(--text-secondary)'}}>{f.desc}</p>

            {/* Bottom accent line */}
            <div className="divider-gold mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ===== CTA SECTION ===== */}
  <section className="py-24 px-6 relative overflow-hidden">
    <div className="hero-orb" style={{width:'600px',height:'600px',top:'50%',left:'50%',transform:'translate(-50%,-50%)',background:'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)'}}/>

    <div className="max-w-4xl mx-auto relative z-10">
      <div className="glass-card rounded-[40px] p-16 text-center gold-border" style={{boxShadow:'0 60px 120px rgba(0,0,0,0.5), var(--glow-gold-sm)'}}>

        <div className="section-eyebrow justify-center mb-6">Ready To Begin?</div>

        <h2 className="font-display text-5xl font-black mb-6" style={{color:'var(--text-primary)'}}>
          Start Your Journey <span className="gold-text">Today</span>
        </h2>

        <p className="text-lg mb-10 max-w-lg mx-auto" style={{color:'var(--text-secondary)'}}>
          Join thousands of satisfied customers who found their perfect luxury vehicle through MotoVerse.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/cars"
            className="btn-primary px-10 py-5 rounded-2xl text-base font-bold inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Browse Premium Cars
          </Link>
          <button
            onClick={async ()=>{ await supabase.auth.signOut(); window.location.href = "/" }}
            className="btn-outline px-10 py-5 rounded-2xl text-base font-bold"
          >
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  </section>

  {/* ===== FOOTER ===== */}
  <footer className="border-t py-8 px-6" style={{borderColor:'var(--border-subtle)'}}>
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 gold-gradient rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4" fill="#080808" viewBox="0 0 24 24">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
          </svg>
        </div>
        <span className="font-bold gold-text">MotoVerse</span>
      </div>
      <p className="text-xs" style={{color:'var(--text-muted)'}}>© 2026 MotoVerse. Premium Automotive Experience.</p>
      <div className="flex gap-6">
        <Link to="/privacy" className="text-xs transition" style={{color:'var(--text-muted)'}} onMouseEnter={e=>e.target.style.color='var(--gold-primary)'} onMouseLeave={e=>e.target.style.color='var(--text-muted)'}>Privacy</Link>
        <Link to="/terms" className="text-xs transition" style={{color:'var(--text-muted)'}} onMouseEnter={e=>e.target.style.color='var(--gold-primary)'} onMouseLeave={e=>e.target.style.color='var(--text-muted)'}>Terms</Link>
        <Link to="/support" className="text-xs transition" style={{color:'var(--text-muted)'}} onMouseEnter={e=>e.target.style.color='var(--gold-primary)'} onMouseLeave={e=>e.target.style.color='var(--text-muted)'}>Support</Link>
      </div>
    </div>
  </footer>

</div>
)

}

export default Home