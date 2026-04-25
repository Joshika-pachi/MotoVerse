import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"

function CustomerLayout(){

const navigate = useNavigate()
const location = useLocation()
const [user, setUser] = useState(null)
const [role, setRole] = useState("customer")
const [roleMenuOpen, setRoleMenuOpen] = useState(false)

useEffect(()=>{ loadUser() },[])

// Close role menu on outside click
useEffect(()=>{
  function handleClick(e){
    if(!e.target.closest('#role-switcher')) setRoleMenuOpen(false)
  }
  document.addEventListener('mousedown', handleClick)
  return () => document.removeEventListener('mousedown', handleClick)
},[])

async function loadUser(){
  const { data } = await supabase.auth.getUser()
  if(data.user){
    setUser(data.user)
    const { data: userData } = await supabase
      .from("users").select("role").eq("id", data.user.id).single()
    setRole(userData?.role || "customer")
  }
}

async function handleRoleChange(newRole){
  if(!user) return
  setRoleMenuOpen(false)
  const { error } = await supabase.from("users").update({ role: newRole }).eq("id", user.id)
  if(error){ alert("Role update failed"); return }
  if(newRole === "dealer") window.location.href = "/dealer"
  else if(newRole === "admin") window.location.href = "/admin"
  else window.location.href = "/"
}

const isActive = (path) => location.pathname === path

const roleIcons = {
  customer: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z",
  dealer: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
  admin: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
}

const roles = ['customer', 'dealer', 'admin']

return(
  <div className="flex flex-col min-h-screen" style={{background:'var(--bg-primary)'}}>

    {/* ===== NAVBAR ===== */}
    <nav className="glass border-b sticky top-0 z-50" style={{borderColor:'var(--border-subtle)'}}>
      <div className="max-w-screen-xl mx-auto px-6 py-3.5 flex items-center justify-between gap-6">

        {/* LOGO */}
        <button
          onClick={()=>navigate("/")}
          className="flex items-center gap-3 flex-shrink-0"
          style={{background:'none',border:'none',cursor:'pointer'}}
        >
          <div className="w-9 h-9 gold-gradient rounded-xl flex items-center justify-center animate-pulse-gold">
            <svg className="w-5 h-5" fill="#080808" viewBox="0 0 24 24">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
            </svg>
          </div>
          <span className="text-xl font-bold gold-text hidden sm:block">MotoVerse</span>
        </button>

        {/* NAV LINKS + RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {[
            { path: '/', label: 'Home', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
            { path: '/cars', label: 'Browse', icon: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z' },
            { path: '/profile', label: 'Profile', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z' },
          ].map(link => (
            <button
              key={link.path}
              onClick={()=>navigate(link.path)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-250"
              style={{
                background: isActive(link.path) ? 'var(--gradient-gold)' : 'transparent',
                color: isActive(link.path) ? '#080808' : 'var(--text-secondary)',
                border: 'none', cursor: 'pointer'
              }}
              onMouseEnter={e => { if(!isActive(link.path)) { e.currentTarget.style.color='var(--gold-light)'; e.currentTarget.style.background='rgba(212,175,55,0.08)' }}}
              onMouseLeave={e => { if(!isActive(link.path)) { e.currentTarget.style.color='var(--text-secondary)'; e.currentTarget.style.background='transparent' }}}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d={link.icon}/>
              </svg>
              {link.label}
            </button>
          ))}

          {/* Divider */}
          <div style={{width:'1px',height:'24px',background:'var(--border-subtle)',margin:'0 4px'}}/>

          {/* ROLE SWITCHER — custom dropdown */}
          <div id="role-switcher" className="relative">
            <button
              onClick={()=>setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-250"
              style={{
                background: 'rgba(212,175,55,0.08)',
                border: '1px solid var(--border-gold)',
                color: 'var(--gold-light)',
                cursor: 'pointer'
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d={roleIcons[role] || roleIcons.customer}/>
              </svg>
              <span className="capitalize">{role}</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-200"
                fill="currentColor"
                viewBox="0 0 24 24"
                style={{transform: roleMenuOpen ? 'rotate(180deg)' : 'rotate(0)'}}
              >
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </button>

            {/* Dropdown menu */}
            {roleMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2 rounded-2xl overflow-hidden z-50"
                style={{
                  background:'rgba(12,12,12,0.97)',
                  border:'1px solid var(--border-gold)',
                  boxShadow:'0 20px 60px rgba(0,0,0,0.6), var(--glow-gold-sm)',
                  backdropFilter:'blur(20px)',
                  minWidth:'160px'
                }}
              >
                <div className="p-2">
                  <p className="text-xs font-bold uppercase tracking-widest px-3 py-2 mb-1" style={{color:'var(--text-muted)'}}>
                    Switch Role
                  </p>
                  {roles.map(r => (
                    <button
                      key={r}
                      onClick={()=>handleRoleChange(r)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-left"
                      style={{
                        background: role === r ? 'rgba(212,175,55,0.12)' : 'transparent',
                        color: role === r ? 'var(--gold-light)' : 'var(--text-secondary)',
                        border: 'none', cursor: 'pointer'
                      }}
                      onMouseEnter={e=>{ if(role!==r){ e.currentTarget.style.background='rgba(212,175,55,0.06)'; e.currentTarget.style.color='var(--text-primary)' }}}
                      onMouseLeave={e=>{ if(role!==r){ e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--text-secondary)' }}}
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d={roleIcons[r]}/>
                      </svg>
                      <span className="capitalize">{r}</span>
                      {role === r && (
                        <svg className="w-3.5 h-3.5 ml-auto" fill="var(--gold-primary)" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>

    {/* ===== CONTENT — no padding so BrowseCars can control its own layout ===== */}
    <div className="flex-1">
      <Outlet/>
    </div>

  </div>
)
}

export default CustomerLayout