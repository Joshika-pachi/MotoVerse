import { useState } from "react"
import { supabase } from "../services/supabaseClient"
import { Link, useNavigate } from "react-router-dom"

function Login(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [loading,setLoading]=useState(false)
const [showPass, setShowPass]=useState(false)

const navigate = useNavigate()

async function handleLogin(e){
  e.preventDefault()
  setLoading(true)
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if(error){ alert(error.message); setLoading(false); return }
  const { data: userData } = await supabase.from("users").select("role").eq("id", data.user.id).single()
  const role = userData?.role
  if(role === "admin") window.location.href = "/admin"
  else if(role === "dealer") window.location.href = "/dealer"
  else window.location.href = "/"
}

return(
<div className="min-h-screen grid md:grid-cols-2 bg-dark">

  {/* ===== LEFT — VISUAL PANEL ===== */}
  <div className="relative hidden md:flex flex-col justify-between overflow-hidden" style={{background:'#050505'}}>

    {/* Background image */}
    <img
      src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80"
      alt="Luxury Car"
      className="absolute inset-0 w-full h-full object-cover"
      style={{opacity:0.35}}
    />

    {/* Gradient overlay */}
    <div className="absolute inset-0" style={{background:'linear-gradient(135deg, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.5) 50%, rgba(8,8,8,0.8) 100%)'}}/>

    {/* Grid pattern */}
    <div className="absolute inset-0 pointer-events-none" style={{
      backgroundImage:'linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)',
      backgroundSize:'60px 60px'
    }}/>

    {/* Ambient glow */}
    <div className="absolute" style={{width:'400px',height:'400px',top:'30%',left:'-100px',borderRadius:'50%',background:'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',filter:'blur(40px)'}}/>

    {/* Content */}
    <div className="relative z-10 p-10 flex flex-col h-full justify-between">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6" fill="#080808" viewBox="0 0 24 24">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
          </svg>
        </div>
        <span className="text-xl font-bold gold-text">MotoVerse</span>
      </div>

      {/* Center hero text */}
      <div>
        <div className="section-eyebrow mb-6">Welcome Back</div>
        <h2 className="font-display text-5xl font-black leading-tight mb-6" style={{color:'var(--text-primary)'}}>
          Your Dream Car<br/>
          <span className="gold-text">Awaits You</span>
        </h2>
        <p className="text-lg leading-relaxed" style={{color:'var(--text-secondary)'}}>
          Access your account to browse exclusive vehicles, manage bookings, and connect with premium dealers.
        </p>

        {/* Feature list */}
        <div className="space-y-3 mt-10">
          {['Access 2,400+ premium vehicles', 'Connect with verified dealers', 'Book test drives instantly'].map((f,i)=>(
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 gold-gradient rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3" fill="#080808" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <span className="text-sm" style={{color:'var(--text-secondary)'}}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom quote */}
      <div className="glass-card rounded-2xl p-5 gold-border">
        <p className="text-sm italic leading-relaxed mb-3" style={{color:'var(--text-secondary)'}}>
          "MotoVerse completely changed how I buy cars. Found my dream BMW in under 10 minutes."
        </p>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gold-gradient rounded-full flex items-center justify-center text-xs font-bold" style={{color:'#080808'}}>JD</div>
          <div>
            <p className="text-xs font-semibold" style={{color:'var(--text-primary)'}}>James D.</p>
            <p className="text-xs" style={{color:'var(--text-muted)'}}>Verified Customer</p>
          </div>
          <div className="ml-auto flex gap-0.5">
            {[...Array(5)].map((_,i)=>(
              <svg key={i} className="w-3 h-3" fill="var(--gold-primary)" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* ===== RIGHT — FORM ===== */}
  <div className="auth-container flex items-center justify-center p-8" style={{background:'var(--bg-primary)'}}>

    <div className="w-full max-w-md animate-fade-up">

      {/* Mobile logo */}
      <div className="flex items-center gap-3 mb-10 md:hidden">
        <div className="w-9 h-9 gold-gradient rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5" fill="#080808" viewBox="0 0 24 24">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
          </svg>
        </div>
        <span className="text-xl font-bold gold-text">MotoVerse</span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <h1 className="font-display text-4xl font-black mb-2" style={{color:'var(--text-primary)'}}>Sign In</h1>
        <p style={{color:'var(--text-secondary)'}}>Welcome back! Enter your credentials below.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-5">

        <div className="form-group">
          <label>Email Address</label>
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" fill="var(--text-muted)" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              onChange={(e)=>setEmail(e.target.value)}
              className="input-luxury w-full pl-12 pr-4 py-3.5 rounded-xl"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" fill="var(--text-muted)" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
            <input
              id="login-password"
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              onChange={(e)=>setPassword(e.target.value)}
              className="input-luxury w-full pl-12 pr-12 py-3.5 rounded-xl"
            />
            <button
              type="button"
              onClick={()=>setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
              style={{color:'var(--text-muted)',background:'none',border:'none',padding:0,cursor:'pointer'}}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                {showPass
                  ? <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  : <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                }
              </svg>
            </button>
          </div>
        </div>

        <button
          id="login-submit"
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2"
          style={{opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer'}}
        >
          {loading ? (
            <>
              <span className="loading-ring" style={{width:'20px',height:'20px',borderWidth:'2px'}}/>
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
              </svg>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="divider-gold flex-1"/>
        <span className="text-xs font-semibold" style={{color:'var(--text-muted)'}}>OR</span>
        <div className="divider-gold flex-1"/>
      </div>

      {/* Register link */}
      <p className="text-center text-sm" style={{color:'var(--text-secondary)'}}>
        Don't have an account?{" "}
        <Link to="/register" className="font-bold transition-colors" style={{color:'var(--gold-primary)'}}>
          Create one free →
        </Link>
      </p>
    </div>
  </div>
</div>
)
}

export default Login