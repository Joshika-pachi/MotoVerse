import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"

function CarDetails(){

const { id } = useParams()
const navigate = useNavigate()
const [car,setCar] = useState(null)
const [saved, setSaved] = useState(false)


useEffect(()=>{ loadCar() },[])

async function loadCar(){
  const { data } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .single()
  setCar(data)
}



if(!car){
  return (
    <div className="min-h-screen flex items-center justify-center" style={{background:'var(--bg-primary)'}}>
      <div className="flex flex-col items-center gap-4">
        <div className="loading-ring" style={{width:'48px',height:'48px'}}/>
        <p className="text-sm font-medium" style={{color:'var(--text-secondary)'}}>Loading vehicle details...</p>
      </div>
    </div>
  )
}

const specs = [
  { label: 'Fuel Type', value: 'Premium Petrol', sub: 'High-octane', icon: 'M11 19h2v-2h-2v2zm0-6h2v-4h-2v4zm0-10h2V1h-2v2zm10 13h-2v2c1.1 0 2-.9 2-2zM5 1H3v2h2V1zm14 0h-2v2h2V1zM3 19c0 1.1.9 2 2 2v-2H3zm0-8h2v-2H3v2zm4 12h2v-2H7v2zm4-16h2V3h-2v2zm4 0h2v2h-2V3zm4 4h2v2h-2V7zm0 8h2v2h-2v-2zm-4 8h2v-2h-2v2zm-4 0h2v-2h-2v2z' },
  { label: 'Transmission', value: 'Automatic', sub: '8-speed', icon: 'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z' },
  { label: 'Condition', value: car.condition || 'Brand New', sub: car.condition === 'Used' ? 'Pre-owned' : 'Factory sealed', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  { label: 'Seats', value: '5 Seats', sub: 'Full leather', icon: 'M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z' },
]

const features = ['Leather Seats', 'Panoramic Sunroof', 'Premium Audio', 'Advanced Safety', 'GPS Navigation', 'Climate Control', 'Keyless Entry', 'Wireless Charging']

const perf = [
  { label: 'Acceleration', value: '3.2s', sub: '0–60 mph' },
  { label: 'Horsepower', value: '450', sub: 'HP' },
  { label: 'City / Highway', value: '28/35', sub: 'MPG' },
  { label: 'Top Speed', value: '185', sub: 'mph' },
]

return(
<div className="min-h-screen" style={{background:'var(--bg-primary)'}}>

  {/* ===== BACK NAV ===== */}
  <div className="sticky top-0 z-20 glass border-b" style={{borderColor:'var(--border-subtle)'}}>
    <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
      <button
        onClick={()=>navigate(-1)}
        className="btn-ghost flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Back to Collection
      </button>
      <div className="flex items-center gap-2">
        <span className="badge-gold">{car.year}</span>
        <span className="text-sm font-semibold" style={{color:'var(--text-secondary)'}}>{car.brand} {car.model}</span>
      </div>
    </div>
  </div>

  <div className="max-w-screen-xl mx-auto px-6 py-10">

    {/* ===== HERO SECTION ===== */}
    <div className="grid md:grid-cols-2 gap-10 mb-10">

      {/* IMAGE */}
      <div className="relative rounded-3xl overflow-hidden animate-fade-in" style={{height:'420px',boxShadow:'0 40px 80px rgba(0,0,0,0.6)'}}>
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover"
          style={{transition:'transform 0.7s ease'}}
          onMouseEnter={e=>e.target.style.transform='scale(1.05)'}
          onMouseLeave={e=>e.target.style.transform='scale(1)'}
        />
        <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 60%)'}}/>

        {/* Floating badges */}
        <div className="absolute top-5 left-5">
          <span className="price-tag text-base px-4 py-1.5">${car.price?.toLocaleString()}</span>
        </div>
        <div className="absolute top-5 right-5 px-4 py-1.5 rounded-full text-sm font-bold" style={{background:'rgba(8,8,8,0.7)',border:'1px solid rgba(255,255,255,0.1)',color:'var(--text-primary)',backdropFilter:'blur(8px)'}}>
          {car.year}
        </div>

        {/* Bottom info strip */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex gap-1">
            {[...Array(5)].map((_,i)=>(
              <svg key={i} className="w-4 h-4" fill="var(--gold-primary)" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
            <span className="text-sm ml-1" style={{color:'var(--text-secondary)'}}>4.9 (128 reviews)</span>
          </div>
        </div>
      </div>

      {/* DETAILS PANEL */}
      <div className="flex flex-col gap-6 animate-fade-up">

        {/* Title block */}
        <div>
          <div className="section-eyebrow mb-3">{car.brand}</div>
          <h1 className="font-display text-5xl font-black leading-tight mb-3" style={{color:'var(--text-primary)'}}>
            {car.model}
          </h1>
          <p className="text-base leading-relaxed" style={{color:'var(--text-secondary)'}}>
            {car.description || "A masterpiece of engineering — crafted for those who demand only the finest in performance, comfort, and design."}
          </p>
        </div>

        {/* Quick spec chips */}
        <div className="flex flex-wrap gap-2">
          <span className="spec-chip">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            Certified
          </span>
          <span className="spec-chip">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            Low Mileage
          </span>
          <span className="spec-chip">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
            Warranty
          </span>
          <span className="spec-chip">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Premium
          </span>
        </div>

        {/* Price block */}
        <div className="glass-card rounded-2xl p-5 gold-border">
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{color:'var(--text-muted)'}}>Vehicle Price</p>
          <div className="flex items-end gap-2">
            <span className="font-display text-4xl font-black gold-text">${car.price?.toLocaleString()}</span>
            <span className="text-sm mb-1 font-medium" style={{color:'var(--text-secondary)'}}>USD</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full" style={{background:'#22c55e'}}/>
            <span className="text-xs font-medium" style={{color:'#22c55e'}}>Available • Ready for viewing</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3">

          <button
            onClick={()=>navigate(`/messages?car=${car.id}`)}
            className="btn-ghost flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
            style={{border:'1px solid var(--border-gold)', color:'var(--gold-primary)'}}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
            Contact Dealer
          </button>
          <button
            onClick={()=>setSaved(!saved)}
            className={`flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${saved ? 'btn-primary' : 'btn-ghost'}`}
          >
            <svg className="w-4 h-4" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            {saved ? 'Saved' : 'Save'}
          </button>
          <button className="btn-ghost flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
            </svg>
            Share
          </button>
        </div>
      </div>
    </div>

    {/* ===== SPECS GRID ===== */}
    <div className="mb-10">
      <div className="section-eyebrow mb-6">Specifications</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {specs.map((s,i)=>(
          <div key={i} className="glass-card rounded-2xl p-5 group">
            <div className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5" fill="#080808" viewBox="0 0 24 24">
                <path d={s.icon}/>
              </svg>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{color:'var(--text-muted)'}}>{s.label}</p>
            <p className="text-base font-bold" style={{color:'var(--text-primary)'}}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{color:'var(--text-secondary)'}}>{s.sub}</p>
          </div>
        ))}
      </div>
    </div>

    {/* ===== PERFORMANCE + FEATURES ===== */}
    <div className="grid md:grid-cols-2 gap-8 mb-10">

      {/* PERFORMANCE */}
      <div className="glass-card rounded-3xl p-8">
        <div className="section-eyebrow mb-6">Performance</div>
        <div className="grid grid-cols-2 gap-4">
          {perf.map((p,i)=>(
            <div key={i} className="text-center p-5 rounded-2xl" style={{background:'rgba(212,175,55,0.04)',border:'1px solid var(--border-gold)'}}>
              <div className="font-display text-3xl font-black gold-text mb-1">{p.value}</div>
              <div className="text-xs font-bold" style={{color:'var(--text-primary)'}}>{p.sub}</div>
              <div className="text-xs mt-0.5" style={{color:'var(--text-muted)'}}>{p.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className="glass-card rounded-3xl p-8">
        <div className="section-eyebrow mb-6">Premium Features</div>
        <div className="grid grid-cols-2 gap-2">
          {features.map((f,i)=>(
            <div key={i} className="feature-item">
              <div className="w-6 h-6 gold-gradient rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3" fill="#080808" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <span className="text-sm font-medium" style={{color:'var(--text-secondary)'}}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ===== BOTTOM CTA ===== */}
    <div className="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 gold-border" style={{boxShadow:'var(--glow-gold-sm)'}}>
      <div>
        <h3 className="font-display text-2xl font-bold mb-1" style={{color:'var(--text-primary)'}}>Ready to make it yours?</h3>
        <p style={{color:'var(--text-secondary)'}}>Schedule a test drive or contact the dealer now.</p>
      </div>
      <div className="flex gap-3">

        <button
          onClick={()=>navigate(`/messages?car=${car.id}`)}
          className="btn-ghost px-8 py-4 rounded-2xl font-semibold text-sm flex items-center gap-2"
          style={{border:'1px solid var(--border-gold)', color:'var(--gold-primary)'}}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
          Contact Dealer
        </button>
        <button
          onClick={()=>navigate('/cars')}
          className="btn-ghost px-8 py-4 rounded-2xl font-semibold text-sm"
        >
          Browse More
        </button>
      </div>
    </div>

  </div>



</div>
)
}

export default CarDetails