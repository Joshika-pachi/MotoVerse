import { useState } from "react"
import { supabase } from "../services/supabaseClient"
import { useNavigate, Link } from "react-router-dom"

function Register(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [confirmPass, setConfirmPass]=useState("")
const [role, setRole]=useState("customer")
const [showPass, setShowPass]=useState(false)
const [loading, setLoading]=useState(false)
const navigate = useNavigate()

async function handleRegister(e){
  e.preventDefault()
  if(password !== confirmPass){ alert("Passwords don't match"); return }
  setLoading(true)
  const { data, error } = await supabase.auth.signUp({ email, password })
  if(error){ alert(error.message); setLoading(false); return }
  const user = data.user
  if(user){
    await supabase.from("users").insert([{ id: user.id, email: user.email, role }])
  }
  alert("Registered successfully!")
  setLoading(false)
  navigate("/login")
}

const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3
const strengthLabel = ['', 'Weak', 'Good', 'Strong'][strength]
const strengthColor = ['', '#ef4444', '#f59e0b', 'var(--gold-primary)'][strength]

return(
<div className="min-h-screen grid md:grid-cols-2 bg-dark">

  {/* ===== LEFT — FORM ===== */}
  <div className="auth-container flex items-center justify-center p-8" style={{background:'var(--bg-primary)'}}>

    <div className="w-full max-w-md animate-fade-up">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-9 h-9 gold-gradient rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5" fill="#080808" viewBox="0 0 24 24">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
          </svg>
        </div>
        <span className="text-xl font-bold gold-text">MotoVerse</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="section-eyebrow mb-3">New Account</div>
        <h1 className="font-display text-4xl font-black mb-2" style={{color:'var(--text-primary)'}}>Create Account</h1>
        <p style={{color:'var(--text-secondary)'}}>Join thousands of premium car enthusiasts.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleRegister} className="space-y-5">

        <div className="form-group">
          <label>Email Address</label>
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" fill="var(--text-muted)" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <input
              id="register-email"
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
              id="register-password"
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
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
            </button>
          </div>
          {/* Strength indicator */}
          {password.length > 0 && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1,2,3].map(i=>(
                  <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                    style={{background: i <= strength ? strengthColor : 'var(--border-subtle)'}}
                  />
                ))}
              </div>
              <p className="text-xs font-semibold" style={{color:strengthColor}}>{strengthLabel} password</p>
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" fill="var(--text-muted)" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
            <input
              id="register-confirm"
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              onChange={(e)=>setConfirmPass(e.target.value)}
              className="input-luxury w-full pl-12 pr-4 py-3.5 rounded-xl"
              style={{borderColor: confirmPass && confirmPass !== password ? '#ef4444' : ''}}
            />
            {confirmPass && confirmPass === password && (
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4" fill="var(--gold-primary)" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Register As</label>
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" fill="var(--text-muted)" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            <select
              id="register-role"
              value={role}
              onChange={(e)=>setRole(e.target.value)}
              className="input-luxury w-full pl-12 pr-4 py-3.5 rounded-xl appearance-none cursor-pointer"
            >
              <option value="customer">Customer</option>
              <option value="dealer">Dealer</option>
            </select>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" fill="var(--text-muted)" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>
        </div>

        <button
          id="register-submit"
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2"
          style={{opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer'}}
        >
          {loading ? (
            <>
              <span className="loading-ring" style={{width:'20px',height:'20px',borderWidth:'2px'}}/>
              Creating account...
            </>
          ) : (
            <>
              Create Account
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
        <span className="text-xs font-semibold" style={{color:'var(--text-muted)'}}>ALREADY A MEMBER?</span>
        <div className="divider-gold flex-1"/>
      </div>

      <Link
        to="/login"
        className="btn-outline w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2"
      >
        <span>Sign In Instead</span>
      </Link>
    </div>
  </div>

  {/* ===== RIGHT — VISUAL PANEL ===== */}
  <div className="relative hidden md:flex flex-col justify-center overflow-hidden" style={{background:'#050505'}}>
    <img
      src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=80"
      alt="Premium Car Interior"
      className="absolute inset-0 w-full h-full object-cover"
      style={{opacity:0.3}}
    />
    <div className="absolute inset-0" style={{background:'linear-gradient(135deg, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.85) 100%)'}}/>
    <div className="absolute inset-0 pointer-events-none" style={{
      backgroundImage:'linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)',
      backgroundSize:'60px 60px'
    }}/>
    <div className="absolute" style={{width:'350px',height:'350px',top:'20%',right:'-80px',borderRadius:'50%',background:'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)',filter:'blur(40px)'}}/>

    <div className="relative z-10 p-12">
      <div className="section-eyebrow mb-6">Join The Elite</div>
      <h2 className="font-display text-5xl font-black leading-tight mb-6" style={{color:'var(--text-primary)'}}>
        Premium Cars,<br/>
        <span className="gold-text">Premium Life</span>
      </h2>
      <p className="text-lg leading-relaxed mb-10" style={{color:'var(--text-secondary)'}}>
        Create your free account and get instant access to our curated collection of luxury vehicles.
      </p>

      {/* Benefits */}
      <div className="space-y-4">
        {[
          { icon: '🚗', text: 'Browse 2,400+ premium vehicles' },
          { icon: '🔔', text: 'Get alerts for new arrivals' },
          { icon: '💬', text: 'Chat directly with dealers' },
          { icon: '⭐', text: 'Save your favorite cars' },
        ].map((b,i)=>(
          <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-4">
            <span className="text-2xl">{b.icon}</span>
            <span className="text-sm font-medium" style={{color:'var(--text-secondary)'}}>{b.text}</span>
          </div>
        ))}
      </div>
    </div>
  </div>

</div>
)
}

export default Register