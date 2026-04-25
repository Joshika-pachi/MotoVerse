import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"

function DealerLayout(){
const navigate = useNavigate()
const location = useLocation()
const [user, setUser] = useState(null)
const [role, setRole] = useState("dealer")
const [roleMenuOpen, setRoleMenuOpen] = useState(false)

useEffect(()=>{ loadUser() },[])

useEffect(()=>{
  function handleClick(e){ if(!e.target.closest('#dealer-role-switcher')) setRoleMenuOpen(false) }
  document.addEventListener('mousedown', handleClick)
  return () => document.removeEventListener('mousedown', handleClick)
},[])

async function loadUser(){
  const { data } = await supabase.auth.getUser()
  if(data.user){
    setUser(data.user)
    const { data: userData } = await supabase.from("users").select("role").eq("id", data.user.id).single()
    setRole(userData?.role || "dealer")
  }
}

async function handleRoleChange(newRole){
  if(!user) return
  setRoleMenuOpen(false)
  const { error } = await supabase.from("users").update({ role: newRole }).eq("id", user.id)
  if(error){ alert("Role update failed"); return }
  if(newRole === "admin") window.location.href = "/admin"
  else if(newRole === "customer") window.location.href = "/"
  else window.location.href = "/dealer"
}

async function handleLogout(){
  await supabase.auth.signOut()
  window.location.href = "/login"
}

const roleIcons = {
  customer: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z",
  dealer: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
  admin: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
}

const isActive = (path) => location.pathname === path

return(
  <div className="flex flex-col min-h-screen" style={{background:'var(--bg-primary)'}}>

    {/* NAVBAR */}
    <nav className="glass border-b sticky top-0 z-50" style={{borderColor:'var(--border-subtle)'}}>
      <div className="max-w-screen-xl mx-auto px-6 py-3.5 flex items-center justify-between gap-6">

        {/* LOGO */}
        <button onClick={()=>navigate("/dealer")} style={{background:'none',border:'none',cursor:'pointer'}} className="flex items-center gap-3">
          <div className="w-9 h-9 gold-gradient rounded-xl flex items-center justify-center animate-pulse-gold">
            <svg className="w-5 h-5" fill="#080808" viewBox="0 0 24 24">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
          </div>
          <div className="hidden sm:block">
            <span className="text-base font-bold gold-text">MotoVerse</span>
            <span className="text-xs ml-2 badge-gold">Dealer</span>
          </div>
        </button>

        {/* NAV */}
        <div className="flex items-center gap-1">
          {[
            { path:'/dealer', label:'Dashboard', icon:'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
            { path:'/dealer/messages', label:'Messages', icon:'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z' },
          ].map(link=>(
            <button key={link.path} onClick={()=>navigate(link.path)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
              style={{
                background: isActive(link.path) ? 'var(--gradient-gold)' : 'transparent',
                color: isActive(link.path) ? '#080808' : 'var(--text-secondary)',
                border:'none', cursor:'pointer', transition:'all 0.25s ease'
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={link.icon}/></svg>
              {link.label}
            </button>
          ))}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* Role switcher */}
          <div id="dealer-role-switcher" className="relative">
            <button
              onClick={()=>setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
              style={{background:'rgba(212,175,55,0.08)',border:'1px solid var(--border-gold)',color:'var(--gold-light)',cursor:'pointer'}}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={roleIcons[role]||roleIcons.dealer}/></svg>
              <span className="capitalize">{role}</span>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" style={{transform:roleMenuOpen?'rotate(180deg)':'none',transition:'transform 0.2s'}}>
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </button>
            {roleMenuOpen && (
              <div className="absolute right-0 top-full mt-2 rounded-2xl overflow-hidden z-50" style={{background:'rgba(12,12,12,0.97)',border:'1px solid var(--border-gold)',boxShadow:'0 20px 60px rgba(0,0,0,0.6)',backdropFilter:'blur(20px)',minWidth:'160px'}}>
                <div className="p-2">
                  <p className="text-xs font-bold uppercase tracking-widest px-3 py-2" style={{color:'var(--text-muted)'}}>Switch Role</p>
                  {['customer','dealer','admin'].map(r=>(
                    <button key={r} onClick={()=>handleRoleChange(r)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-left"
                      style={{background:role===r?'rgba(212,175,55,0.12)':'transparent',color:role===r?'var(--gold-light)':'var(--text-secondary)',border:'none',cursor:'pointer',transition:'all 0.2s'}}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={roleIcons[r]}/></svg>
                      <span className="capitalize">{r}</span>
                      {role===r && <svg className="w-3.5 h-3.5 ml-auto" fill="var(--gold-primary)" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Logout */}
          <button onClick={handleLogout} className="btn-ghost flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
            Sign Out
          </button>
        </div>
      </div>
    </nav>

    <div className="flex-1"><Outlet/></div>
  </div>
)
}

export default DealerLayout