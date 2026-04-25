import { Link } from "react-router-dom"

function CarCard({ car }){

const formatPrice = (price) => {
  if(price >= 1000) return `$${(price/1000).toFixed(0)}k`
  return `$${price.toLocaleString()}`
}

return(
  <div className="car-card group">

    {/* IMAGE */}
    <div className="relative overflow-hidden" style={{height:'220px'}}>
      <img
        src={car.image}
        alt={`${car.brand} ${car.model}`}
        className="car-img w-full h-full object-cover"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0.2) 50%, transparent 100%)'}}/>

      {/* Top badges */}
      <div className="absolute top-4 left-4">
        <span className="price-tag">{formatPrice(car.price)}</span>
      </div>
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold" style={{background:'rgba(10,10,10,0.7)',border:'1px solid rgba(255,255,255,0.1)',color:'var(--text-primary)',backdropFilter:'blur(8px)'}}>
        {car.year}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background:'rgba(0,0,0,0.3)'}}>
        <Link
          to={`/car/${car.id}`}
          className="btn-primary px-6 py-2.5 rounded-xl text-sm font-bold transform scale-95 group-hover:scale-100 transition-transform duration-300 inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
          Quick View
        </Link>
      </div>
    </div>

    {/* CONTENT */}
    <div className="p-6">
      {/* Title & Rating */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-lg font-bold leading-tight transition-colors duration-300 group-hover:text-gold-light" style={{color:'var(--text-primary)'}}>
          {car.brand} <span style={{color:'var(--text-secondary)',fontWeight:500}}>{car.model}</span>
        </h3>
        <div className="flex items-center gap-0.5 flex-shrink-0 mt-0.5">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3 h-3" fill="var(--gold-primary)" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
        </div>
      </div>

      {/* Spec chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        <span className="spec-chip">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          Premium
        </span>
        <span className="spec-chip">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          Certified
        </span>
        <span className="spec-chip">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5-5H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          </svg>
          {car.year}
        </span>
      </div>

      {/* Divider */}
      <div className="divider-gold mb-5"/>

      {/* Action */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium mb-0.5" style={{color:'var(--text-muted)'}}>Starting from</p>
          <p className="text-xl font-black" style={{color:'var(--gold-light)'}}>${car.price?.toLocaleString()}</p>
        </div>
        <Link
          to={`/car/${car.id}`}
          className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold inline-flex items-center gap-1.5"
        >
          Details
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
          </svg>
        </Link>
      </div>
    </div>
  </div>
)
}

export default CarCard