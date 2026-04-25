import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"
import { getTestDrivesForDealer } from "../services/testDriveService"

function Sidebar(){

const [user, setUser] = useState(null)
const [role, setRole] = useState(null)
const [collapsed, setCollapsed] = useState(false)
const [pendingTD, setPendingTD] = useState(0)
const location = useLocation()

useEffect(()=>{
  getUser()
  supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user || null)
    getUser()
  })
},[])

async function getUser(){
  const { data } = await supabase.auth.getUser()
  if(data.user){
    setUser(data.user)
    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", data.user.id)
      .single()
    const userRole = userData ? userData.role : "customer"
    setRole(userRole)

    // Load pending test drive count for dealers
    if(userRole === "dealer"){
      const { data: cars } = await supabase.from("cars").select("id")
      if(cars && cars.length > 0){
        const { data: drives } = await getTestDrivesForDealer(cars.map(c => c.id))
        const pending = (drives || []).filter(d => d.status === "pending").length
        setPendingTD(pending)
      }
    }
  }
}

async function handleLogout(){
  await supabase.auth.signOut()
  window.location.reload()
}

const isActive = (path) => location.pathname === path

const navItems = [
  {
    to: "/",
    label: "Home",
    icon: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
  },
  {
    to: "/cars",
    label: "Browse Cars",
    icon: "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
  }
]

const dealerItems = [
  {
    to: "/dealer",
    label: "Dashboard",
    icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
    badge: pendingTD > 0 ? String(pendingTD) : undefined
  },
  {
    to: "/messages",
    label: "Inbox",
    icon: "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z",
    badge: "3"
  }
]

const adminItems = [
  {
    to: "/admin",
    label: "Admin Panel",
    icon: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
  }
]

const NavItem = ({ item }) => {
  const active = isActive(item.to)
  return (
    <Link
      to={item.to}
      className={`nav-link ${active ? 'active' : ''} flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm relative`}
      style={collapsed ? {justifyContent:'center', padding:'12px'} : {}}
    >
      {active && !collapsed && <span className="sidebar-active-dot"/>}
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" style={{position:'relative',zIndex:1}}>
        <path d={item.icon}/>
      </svg>
      {!collapsed && (
        <span style={{position:'relative',zIndex:1}}>{item.label}</span>
      )}
      {!collapsed && item.badge && (
        <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full" style={{background:'var(--gradient-gold)',color:'#080808',position:'relative',zIndex:1}}>
          {item.badge}
        </span>
      )}
    </Link>
  )
}

return(
  <div
    className="glass-sidebar h-screen flex flex-col justify-between transition-all duration-300"
    style={{width: collapsed ? '72px' : '260px', minWidth: collapsed ? '72px' : '260px'}}
  >

    {/* TOP */}
    <div className="overflow-hidden">

      {/* LOGO + COLLAPSE */}
      <div className="flex items-center justify-between p-5 border-b" style={{borderColor:'var(--border-subtle)'}}>
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 gold-gradient rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse-gold">
              <svg className="w-5 h-5" fill="#080808" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold gold-text leading-tight">MotoVerse</h1>
              <p className="text-xs" style={{color:'var(--text-muted)'}}>Premium Auto</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-9 h-9 gold-gradient rounded-xl flex items-center justify-center mx-auto animate-pulse-gold">
            <svg className="w-5 h-5" fill="#080808" viewBox="0 0 24 24">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
            </svg>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="btn-ghost w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ml-auto"
          style={collapsed ? {margin:'0 auto'} : {}}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{transform: collapsed ? 'rotate(180deg)' : 'none', transition:'transform 0.3s ease'}}>
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
      </div>

      {/* USER CARD */}
      {!collapsed && (
        <div className="m-4 p-4 rounded-2xl border" style={{background:'rgba(212,175,55,0.04)', borderColor:'var(--border-gold)'}}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="#080808" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate" style={{color:'var(--text-primary)'}}>{user?.email || 'Guest'}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{background:'var(--gold-primary)'}}/>
                <span className="text-xs font-bold capitalize" style={{color:'var(--gold-primary)'}}>{role || 'customer'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NAV SECTION */}
      <nav className="px-3 space-y-1 mt-2">
        {!collapsed && (
          <p className="text-xs font-bold uppercase tracking-widest px-4 mb-3" style={{color:'var(--text-muted)', letterSpacing:'0.12em'}}>
            Navigation
          </p>
        )}
        {navItems.map(item => <NavItem key={item.to} item={item}/>)}

        {/* DEALER SECTION */}
        {role === "dealer" && (
          <>
            {!collapsed && (
              <div className="divider-gold my-4"/>
            )}
            {!collapsed && (
              <p className="text-xs font-bold uppercase tracking-widest px-4 mb-3 mt-5" style={{color:'var(--text-muted)', letterSpacing:'0.12em'}}>
                Dealer
              </p>
            )}
            {dealerItems.map(item => <NavItem key={item.to} item={item}/>)}
          </>
        )}

        {/* ADMIN SECTION */}
        {user?.email === "admin@gmail.com" && (
          <>
            {!collapsed && <div className="divider-gold my-4"/>}
            {!collapsed && (
              <p className="text-xs font-bold uppercase tracking-widest px-4 mb-3 mt-5" style={{color:'var(--text-muted)', letterSpacing:'0.12em'}}>
                Admin
              </p>
            )}
            {adminItems.map(item => <NavItem key={item.to} item={item}/>)}
          </>
        )}
      </nav>
    </div>

    {/* BOTTOM — LOGOUT */}
    <div className="p-4 border-t" style={{borderColor:'var(--border-subtle)'}}>
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-250"
        style={{
          color: 'var(--text-secondary)',
          background: 'rgba(255,80,80,0.04)',
          border: '1px solid rgba(255,80,80,0.1)',
          justifyContent: collapsed ? 'center' : 'flex-start'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255,80,80,0.12)'
          e.currentTarget.style.borderColor = 'rgba(255,80,80,0.3)'
          e.currentTarget.style.color = '#ff5050'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,80,80,0.04)'
          e.currentTarget.style.borderColor = 'rgba(255,80,80,0.1)'
          e.currentTarget.style.color = 'var(--text-secondary)'
        }}
      >
        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
        </svg>
        {!collapsed && <span>Sign Out</span>}
      </button>
    </div>

  </div>
)

}

export default Sidebar