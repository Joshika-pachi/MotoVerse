import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"
import Slider from "rc-slider"
import CarCard from "../components/CarCard"

function BrowseCars(){

const [cars,setCars] = useState([])
const [filtered,setFiltered] = useState([])
const [search,setSearch] = useState("")
const [price,setPrice] = useState(100000)
const [year,setYear] = useState("")
const [brand,setBrand] = useState("")
const [sortBy,setSortBy] = useState("price-low")
const [sidebarOpen, setSidebarOpen] = useState(false)
const [loading, setLoading] = useState(true)

useEffect(()=>{ loadCars() },[])
useEffect(()=>{ applyFilters() },[search,price,year,brand,sortBy,cars])

async function loadCars(){
  setLoading(true)
  const { data } = await supabase.from("cars").select("*")
  setCars(data || [])
  setFiltered(data || [])
  setLoading(false)
}

function applyFilters(){
  let result = [...cars]
  if(search) result = result.filter(car =>
    car.brand.toLowerCase().includes(search.toLowerCase()) ||
    car.model.toLowerCase().includes(search.toLowerCase())
  )
  result = result.filter(car => car.price <= price)
  if(year) result = result.filter(car => car.year.toString() === year)
  if(brand) result = result.filter(car => car.brand.toLowerCase() === brand.toLowerCase())
  switch(sortBy){
    case "price-low": result.sort((a,b)=>a.price-b.price); break
    case "price-high": result.sort((a,b)=>b.price-a.price); break
    case "year-new": result.sort((a,b)=>b.year-a.year); break
    case "year-old": result.sort((a,b)=>a.year-b.year); break
    case "brand-az": result.sort((a,b)=>a.brand.localeCompare(b.brand)); break
    case "brand-za": result.sort((a,b)=>b.brand.localeCompare(a.brand)); break
    default: break
  }
  setFiltered(result)
}

function resetFilters(){
  setSearch(""); setPrice(100000); setYear(""); setBrand(""); setSortBy("price-low")
}

const activeFilters = [search, year, brand].filter(Boolean).length + (price < 100000 ? 1 : 0)

return(
  /* Outer flex row — sidebar + content side by side */
  <div className="flex" style={{minHeight:'calc(100vh - 61px)'}}>

    {/* ===== FILTER SIDEBAR — pushes content, always in DOM ===== */}
    <div
      style={{
        width: sidebarOpen ? '300px' : '0px',
        minWidth: sidebarOpen ? '300px' : '0px',
        overflow: 'hidden',
        transition: 'width 0.35s cubic-bezier(0.25,0.46,0.45,0.94), min-width 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
        background: 'rgba(10,10,10,0.98)',
        borderRight: sidebarOpen ? '1px solid var(--border-subtle)' : 'none',
        flexShrink: 0,
        position: 'sticky',
        top: '61px',        /* height of navbar */
        alignSelf: 'flex-start',
        height: 'calc(100vh - 61px)',
        backdropFilter: 'blur(20px)'
      }}
    >
      {/* Inner wrapper — fixed width so content doesn't squish */}
      <div style={{width:'300px', height:'100%', display:'flex', flexDirection:'column'}}>

        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b flex-shrink-0" style={{borderColor:'var(--border-subtle)'}}>
          <div>
            <h2 className="text-base font-bold" style={{color:'var(--text-primary)'}}>Filter Vehicles</h2>
            {activeFilters > 0 && (
              <p className="text-xs mt-0.5" style={{color:'var(--gold-primary)'}}>
                {activeFilters} filter{activeFilters>1?'s':''} active
              </p>
            )}
          </div>
          <button
            onClick={()=>setSidebarOpen(false)}
            className="btn-ghost w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {/* Scrollable filters */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">

          {/* Search */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={{color:'var(--text-muted)'}}>
              Search
            </label>
            <div className="relative">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" fill="var(--text-muted)" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input
                type="text"
                placeholder="Brand or model..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="input-luxury w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
              />
            </div>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={{color:'var(--text-muted)'}}>
              Brand
            </label>
            <select
              value={brand}
              onChange={(e)=>setBrand(e.target.value)}
              className="input-luxury w-full px-4 py-2.5 rounded-xl text-sm"
            >
              <option value="">All Brands</option>
              {['Toyota','Honda','BMW','Mercedes','Audi','Tesla','Ford','Porsche'].map(b=>(
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={{color:'var(--text-muted)'}}>
              Year
            </label>
            <select
              value={year}
              onChange={(e)=>setYear(e.target.value)}
              className="input-luxury w-full px-4 py-2.5 rounded-xl text-sm"
            >
              <option value="">All Years</option>
              {['2024','2023','2022','2021','2020','2019'].map(y=>(
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={{color:'var(--text-muted)'}}>
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e)=>setSortBy(e.target.value)}
              className="input-luxury w-full px-4 py-2.5 rounded-xl text-sm"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest First</option>
              <option value="year-old">Year: Oldest First</option>
              <option value="brand-az">Brand: A → Z</option>
              <option value="brand-za">Brand: Z → A</option>
            </select>
          </div>

          {/* Price slider */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={{color:'var(--text-muted)'}}>
              Max Price
            </label>
            <div className="text-center mb-4 py-3 rounded-xl" style={{background:'rgba(212,175,55,0.06)',border:'1px solid var(--border-gold)'}}>
              <span className="text-xl font-black gold-text">${price.toLocaleString()}</span>
            </div>
            <Slider
              min={0}
              max={100000}
              value={price}
              onChange={(val)=>setPrice(val)}
              trackStyle={{ backgroundColor: "var(--gold-primary)", height: 6 }}
              handleStyle={{
                borderColor: "var(--gold-primary)",
                height: 20, width: 20,
                backgroundColor: "var(--gold-primary)",
                boxShadow: "0 0 12px rgba(212,175,55,0.4)",
                marginTop: -7
              }}
              railStyle={{ backgroundColor: "rgba(255,255,255,0.06)", height: 6 }}
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs" style={{color:'var(--text-muted)'}}>$0</span>
              <span className="text-xs" style={{color:'var(--text-muted)'}}>$100k</span>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t flex-shrink-0 space-y-2" style={{borderColor:'var(--border-subtle)'}}>
          <button
            onClick={resetFilters}
            className="btn-ghost w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
            Reset Filters
          </button>
          <button
            className="btn-primary w-full py-2.5 rounded-xl text-sm font-semibold"
            onClick={()=>setSidebarOpen(false)}
          >
            Show {filtered.length} Results
          </button>
        </div>
      </div>
    </div>

    {/* ===== MAIN CONTENT ===== */}
    <div className="flex-1 min-w-0">

      {/* Sticky sub-header */}
      <div className="sticky top-[61px] z-20 glass border-b" style={{borderColor:'var(--border-subtle)'}}>
        <div className="px-6 py-3.5 flex items-center gap-4">

          {/* Filter toggle */}
          <button
            id="filter-toggle"
            onClick={()=>setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-250 flex-shrink-0"
            style={{
              background: sidebarOpen ? 'var(--gradient-gold)' : 'rgba(212,175,55,0.08)',
              color: sidebarOpen ? '#080808' : 'var(--gold-primary)',
              border: '1px solid var(--border-gold)',
              cursor: 'pointer'
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
            </svg>
            {sidebarOpen ? 'Hide Filters' : 'Filters'}
            {activeFilters > 0 && (
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{background:'#080808',color:'var(--gold-primary)'}}>
                {activeFilters}
              </span>
            )}
          </button>

          {/* Title + count */}
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold truncate" style={{color:'var(--text-primary)'}}>Browse Collection</h1>
            <p className="text-xs" style={{color:'var(--text-muted)'}}>
              {loading ? 'Loading...' : `${filtered.length} of ${cars.length} vehicles`}
            </p>
          </div>

          {/* Quick sort */}
          <select
            value={sortBy}
            onChange={(e)=>setSortBy(e.target.value)}
            className="input-luxury text-sm px-3 py-2 rounded-xl hidden md:block flex-shrink-0"
            style={{minWidth:'170px'}}
          >
            <option value="price-low">Price ↑</option>
            <option value="price-high">Price ↓</option>
            <option value="year-new">Newest First</option>
            <option value="brand-az">Brand A→Z</option>
          </select>
        </div>
      </div>

      {/* Grid area */}
      <div className="p-6">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_,i)=>(
              <div key={i} className="rounded-3xl overflow-hidden" style={{background:'var(--bg-card)'}}>
                <div className="shimmer h-52"/>
                <div className="p-5 space-y-3">
                  <div className="shimmer h-5 rounded-lg w-3/4"/>
                  <div className="shimmer h-4 rounded-lg w-1/2"/>
                  <div className="shimmer h-10 rounded-xl mt-2"/>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center mb-6 opacity-40">
              <svg className="w-10 h-10" fill="#080808" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{color:'var(--text-primary)'}}>No vehicles found</h3>
            <p className="mb-6" style={{color:'var(--text-secondary)'}}>Try adjusting your filters.</p>
            <button onClick={resetFilters} className="btn-primary px-8 py-3 rounded-xl font-semibold">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((car,i) => (
              <div key={car.id} className="animate-fade-up" style={{animationDelay:`${i*0.04}s`}}>
                <CarCard car={car}/>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
)
}

export default BrowseCars