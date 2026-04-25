import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"
import { getMyTestDrives, cancelMyTestDrive } from "../services/testDriveService"

function Profile(){

  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Edit mode
  const [editing, setEditing] = useState(false)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")

  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState("")

  // Test drives
  const [testDrives, setTestDrives] = useState([])
  const [tdLoading, setTdLoading] = useState(false)

  useEffect(()=>{
    setMounted(true)
    loadProfile()
  },[])

  async function loadProfile(){
    const { data } = await supabase.auth.getUser()
    if(data.user){
      setUser(data.user)

      const { data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single()

      setProfile(userData)
      setFullName(userData?.full_name || "")
      setPhone(userData?.phone || "")

      // Load test drives
      setTdLoading(true)
      const { data: drives } = await getMyTestDrives(data.user.id)
      setTestDrives(drives || [])
      setTdLoading(false)
    }
    setLoading(false)
  }

  async function handleSave(){
    if(!user) return
    setSaving(true)
    setSaveMsg("")

    const { error } = await supabase
      .from("users")
      .update({ full_name: fullName, phone: phone })
      .eq("id", user.id)

    if(error){
      setSaveMsg("Failed to save. Make sure the new columns exist in your users table.")
    } else {
      setProfile(prev => ({ ...prev, full_name: fullName, phone: phone }))
      setSaveMsg("Profile updated successfully!")
      setEditing(false)
    }
    setSaving(false)

    // Clear message after 3 seconds
    setTimeout(() => setSaveMsg(""), 3000)
  }

  async function handleSignOut(){
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  async function handleCancelDrive(id){
    const { error } = await cancelMyTestDrive(id)
    if(!error){
      setTestDrives(prev => prev.map(d => d.id === id ? {...d, status:'cancelled'} : d))
    }
  }

  function formatDateTime(dateStr){
    if(!dateStr) return "N/A"
    return new Date(dateStr).toLocaleString("en-US", {
      year: "numeric", month: "short", day: "numeric",
      hour: "numeric", minute: "2-digit", hour12: true
    })
  }

  // Format date nicely
  function formatDate(dateStr){
    if(!dateStr) return "N/A"
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric"
    })
  }

  if(loading){
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="loading-ring"/>
      </div>
    )
  }

  const initials = fullName
    ? fullName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email ? user.email.slice(0, 2).toUpperCase() : "?"
  const role = profile?.role || "customer"
  const createdAt = user?.created_at || profile?.created_at

  const roleConfig = {
    admin:    { color: "#FFD700", bg: "rgba(212,175,55,0.15)", icon: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" },
    dealer:   { color: "#D4AF37", bg: "rgba(212,175,55,0.12)", icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" },
    customer: { color: "#B8960C", bg: "rgba(212,175,55,0.10)", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" }
  }

  const rc = roleConfig[role] || roleConfig.customer

  return(
    <div className="min-h-screen py-12 px-6" style={{background:'var(--bg-primary)'}}>

      {/* Ambient orbs */}
      <div className="hero-orb" style={{width:'400px',height:'400px',top:'10%',right:'-100px',background:'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)'}}/>
      <div className="hero-orb delay-300" style={{width:'300px',height:'300px',bottom:'10%',left:'-80px',background:'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)'}}/>

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Header */}
        <div className={`text-center mb-12 ${mounted ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="section-eyebrow justify-center mb-4">Account</div>
          <h1 className="font-display text-4xl md:text-5xl font-black" style={{color:'var(--text-primary)'}}>
            Your <span className="gold-text">Profile</span>
          </h1>
        </div>

        {/* Save Message Toast */}
        {saveMsg && (
          <div className="mb-6 px-5 py-3 rounded-xl text-sm font-semibold text-center animate-fade-up"
            style={{
              background: saveMsg.includes("Failed") ? 'rgba(220,38,38,0.1)' : 'rgba(34,197,94,0.1)',
              border: `1px solid ${saveMsg.includes("Failed") ? 'rgba(220,38,38,0.3)' : 'rgba(34,197,94,0.3)'}`,
              color: saveMsg.includes("Failed") ? '#EF4444' : '#22c55e'
            }}
          >
            {saveMsg}
          </div>
        )}

        {/* Profile Card */}
        <div className={`glass-card rounded-3xl p-10 gold-border mb-8 ${mounted ? 'animate-fade-up delay-100' : 'opacity-0'}`}
          style={{boxShadow:'0 40px 80px rgba(0,0,0,0.4), var(--glow-gold-sm)'}}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-28 h-28 gold-gradient rounded-3xl flex items-center justify-center animate-pulse-gold"
                style={{boxShadow:'var(--glow-gold)'}}
              >
                <span className="text-3xl font-black" style={{color:'#080808'}}>{initials}</span>
              </div>
              {/* Role badge on avatar */}
              <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{background: rc.bg, color: rc.color, border: `1px solid ${rc.color}30`}}
              >
                {role}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-1" style={{color:'var(--text-primary)'}}>
                {fullName || user?.email}
              </h2>
              {fullName && (
                <p className="text-sm mb-1" style={{color:'var(--text-secondary)'}}>{user?.email}</p>
              )}
              <p className="text-sm mb-4" style={{color:'var(--text-secondary)'}}>
                Member since {formatDate(createdAt)}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="spec-chip">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={rc.icon}/>
                  </svg>
                  {role.charAt(0).toUpperCase() + role.slice(1)} Account
                </span>
                <span className="spec-chip">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Verified
                </span>
              </div>
            </div>

            {/* Edit Toggle Button */}
            <button
              onClick={()=>{ setEditing(!editing); setSaveMsg("") }}
              className="btn-ghost flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                {editing
                  ? <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  : <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                }
              </svg>
              {editing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Edit Form — shown when editing */}
        {editing && (
          <div className={`glass-card rounded-3xl p-8 gold-border mb-8 animate-fade-up`}
            style={{boxShadow:'0 20px 60px rgba(0,0,0,0.3), var(--glow-gold-sm)'}}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5" fill="#080808" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{color:'var(--text-primary)'}}>Edit Profile</h3>
                <p className="text-xs" style={{color:'var(--text-muted)'}}>Update your personal information</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Full Name */}
              <div className="form-group">
                <label>Full Name</label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" fill="var(--text-muted)" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                  <input
                    id="profile-fullname"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e)=>setFullName(e.target.value)}
                    className="input-luxury w-full pl-12 pr-4 py-3.5 rounded-xl"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="form-group">
                <label>Phone Number</label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" fill="var(--text-muted)" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <input
                    id="profile-phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                    className="input-luxury w-full pl-12 pr-4 py-3.5 rounded-xl"
                  />
                </div>
              </div>



              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2"
                style={{opacity: saving ? 0.7 : 1, cursor: saving ? 'not-allowed' : 'pointer'}}
              >
                {saving ? (
                  <>
                    <span className="loading-ring" style={{width:'20px',height:'20px',borderWidth:'2px'}}/>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Details Grid */}
        <div className={`grid md:grid-cols-2 gap-6 mb-8 ${mounted ? 'animate-fade-up delay-200' : 'opacity-0'}`}>

          {/* Full Name Card */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:'rgba(212,175,55,0.1)', border:'1px solid var(--border-gold)'}}>
                <svg className="w-5 h-5" fill="var(--gold-primary)" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{color:'var(--text-muted)'}}>Full Name</p>
            </div>
            <p className="text-base font-semibold" style={{color: fullName ? 'var(--text-primary)' : 'var(--text-muted)'}}>
              {fullName || "Not set — click Edit Profile"}
            </p>
          </div>

          {/* Email Card */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:'rgba(212,175,55,0.1)', border:'1px solid var(--border-gold)'}}>
                <svg className="w-5 h-5" fill="var(--gold-primary)" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{color:'var(--text-muted)'}}>Email</p>
            </div>
            <p className="text-base font-semibold" style={{color:'var(--text-primary)'}}>{user?.email}</p>
          </div>

          {/* Phone Card */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:'rgba(212,175,55,0.1)', border:'1px solid var(--border-gold)'}}>
                <svg className="w-5 h-5" fill="var(--gold-primary)" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{color:'var(--text-muted)'}}>Phone</p>
            </div>
            <p className="text-base font-semibold" style={{color: phone ? 'var(--text-primary)' : 'var(--text-muted)'}}>
              {phone || "Not set — click Edit Profile"}
            </p>
          </div>



          {/* Role Card */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:'rgba(212,175,55,0.1)', border:'1px solid var(--border-gold)'}}>
                <svg className="w-5 h-5" fill="var(--gold-primary)" viewBox="0 0 24 24">
                  <path d={rc.icon}/>
                </svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{color:'var(--text-muted)'}}>Role</p>
            </div>
            <p className="text-base font-semibold capitalize" style={{color: rc.color}}>{role}</p>
          </div>

          {/* Member Since Card */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:'rgba(212,175,55,0.1)', border:'1px solid var(--border-gold)'}}>
                <svg className="w-5 h-5" fill="var(--gold-primary)" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                </svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{color:'var(--text-muted)'}}>Member Since</p>
            </div>
            <p className="text-base font-semibold" style={{color:'var(--text-primary)'}}>{formatDate(createdAt)}</p>
          </div>

          {/* User ID Card */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:'rgba(212,175,55,0.1)', border:'1px solid var(--border-gold)'}}>
                <svg className="w-5 h-5" fill="var(--gold-primary)" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{color:'var(--text-muted)'}}>User ID</p>
            </div>
            <p className="text-sm font-mono" style={{color:'var(--text-secondary)', wordBreak:'break-all'}}>
              {user?.id}
            </p>
          </div>

        </div>

        {/* ===== MY TEST DRIVES ===== */}
        <div className={`mb-8 ${mounted ? 'animate-fade-up delay-300' : 'opacity-0'}`}>
          <div className="section-eyebrow mb-5">My Test Drives</div>

          {tdLoading ? (
            <div className="flex justify-center py-8">
              <div className="loading-ring"/>
            </div>
          ) : testDrives.length === 0 ? (
            <div className="glass-card rounded-2xl p-8 text-center">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{background:'rgba(212,175,55,0.08)', border:'1px solid var(--border-gold)'}}>
                <svg className="w-6 h-6" fill="var(--gold-primary)" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
                </svg>
              </div>
              <p className="text-sm font-medium mb-1" style={{color:'var(--text-secondary)'}}>No test drives yet</p>
              <p className="text-xs" style={{color:'var(--text-muted)'}}>Browse cars and schedule your first test drive.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {testDrives.map(drive => {
                const statusMap = {
                  pending:   { color:'#D4AF37', bg:'rgba(212,175,55,0.1)',  border:'rgba(212,175,55,0.3)',  label:'Pending' },
                  confirmed: { color:'#22c55e', bg:'rgba(34,197,94,0.1)',   border:'rgba(34,197,94,0.3)',   label:'Confirmed' },
                  cancelled: { color:'#6b7280', bg:'rgba(107,114,128,0.1)', border:'rgba(107,114,128,0.25)', label:'Cancelled' },
                }
                const s = statusMap[drive.status] || statusMap.pending
                return (
                  <div key={drive.id} className="glass-card rounded-2xl p-5 flex items-center gap-5">
                    {/* Car image */}
                    {drive.cars?.image && (
                      <div className="w-20 h-14 rounded-xl overflow-hidden flex-shrink-0" style={{border:'1px solid var(--border-subtle)'}}>
                        <img src={drive.cars.image} alt="car" className="w-full h-full object-cover"/>
                      </div>
                    )}
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate" style={{color:'var(--text-primary)'}}>
                        {drive.cars?.brand} {drive.cars?.model}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <svg className="w-3.5 h-3.5" fill="var(--text-muted)" viewBox="0 0 24 24">
                          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                        </svg>
                        <span className="text-xs" style={{color:'var(--text-muted)'}}>{formatDateTime(drive.date)}</span>
                      </div>
                    </div>
                    {/* Status + cancel */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{background:s.bg, border:`1px solid ${s.border}`, color:s.color}}>
                        {s.label}
                      </span>
                      {drive.status === 'pending' && (
                        <button
                          onClick={()=>handleCancelDrive(drive.id)}
                          className="text-xs px-3 py-1.5 rounded-full transition-all duration-200"
                          style={{background:'rgba(220,38,38,0.08)', border:'1px solid rgba(220,38,38,0.2)', color:'#EF4444'}}
                          onMouseEnter={e=>{ e.currentTarget.style.background='rgba(220,38,38,0.18)'; e.currentTarget.style.borderColor='rgba(220,38,38,0.4)' }}
                          onMouseLeave={e=>{ e.currentTarget.style.background='rgba(220,38,38,0.08)'; e.currentTarget.style.borderColor='rgba(220,38,38,0.2)' }}
                        >Cancel</button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Sign Out */}
        <div className={`text-center ${mounted ? 'animate-fade-up delay-300' : 'opacity-0'}`}>
          <button
            onClick={handleSignOut}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold transition-all duration-300"
            style={{
              background:'rgba(220,38,38,0.1)',
              border:'1px solid rgba(220,38,38,0.25)',
              color:'#EF4444',
              cursor:'pointer'
            }}
            onMouseEnter={e=>{
              e.currentTarget.style.background='rgba(220,38,38,0.2)'
              e.currentTarget.style.borderColor='rgba(220,38,38,0.5)'
              e.currentTarget.style.boxShadow='0 0 30px rgba(220,38,38,0.2)'
              e.currentTarget.style.transform='translateY(-2px)'
            }}
            onMouseLeave={e=>{
              e.currentTarget.style.background='rgba(220,38,38,0.1)'
              e.currentTarget.style.borderColor='rgba(220,38,38,0.25)'
              e.currentTarget.style.boxShadow='none'
              e.currentTarget.style.transform='translateY(0)'
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
            Sign Out
          </button>
        </div>

      </div>
    </div>
  )
}

export default Profile
