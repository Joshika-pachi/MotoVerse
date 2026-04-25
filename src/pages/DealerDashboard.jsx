import { useEffect, useState, useRef } from "react"
import { supabase } from "../services/supabaseClient"
import { getTestDrivesForDealer, updateTestDriveStatus } from "../services/testDriveService"

function DealerDashboard(){

const [cars,setCars] = useState([])
const [testDrives,setTestDrives] = useState([])
const [tdLoading,setTdLoading] = useState(false)
const [notification, setNotification] = useState(null)
const carIdsRef = useRef([])

// add form
const [brand,setBrand] = useState("")
const [model,setModel] = useState("")
const [year,setYear] = useState("")
const [price,setPrice] = useState("")
const [image,setImage] = useState("")
const [description,setDescription] = useState("")

// edit state
const [editingCar,setEditingCar] = useState(null)

useEffect(()=>{
loadCars()
},[])

//////////////////////////////////////////////////////
// LOAD
//////////////////////////////////////////////////////

async function loadCars(){
const { data } = await supabase.from("cars").select("*")
const loaded = data || []
setCars(loaded)

// Load test drives for these cars
if(loaded.length > 0){
  setTdLoading(true)
  const carIds = loaded.map(c => c.id)
  carIdsRef.current = carIds
  const { data: drives } = await getTestDrivesForDealer(carIds)
  setTestDrives(drives || [])
  setTdLoading(false)
}
}

// ─── Realtime subscription for new test drive requests ───
useEffect(() => {
  const channel = supabase
    .channel("dealer-testdrives")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "test_drives" },
      async (payload) => {
        // Only act if this car belongs to this dealer
        const carId = payload.new?.car_id
        if (!carId || !carIdsRef.current.includes(carId)) return

        // Refresh the drives list
        const { data: drives } = await getTestDrivesForDealer(carIdsRef.current)
        setTestDrives(drives || [])

        // Show in-app notification banner
        setNotification({
          id: payload.new.id,
          carId,
          at: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
        })

        // Auto-dismiss after 6 seconds
        setTimeout(() => setNotification(null), 6000)
      }
    )
    .subscribe()

  return () => { supabase.removeChannel(channel) }
}, [])

//////////////////////////////////////////////////////
// ADD
//////////////////////////////////////////////////////

async function handleAddCar(e){

e.preventDefault()

const { data, error } = await supabase
.from("cars")
.insert([{ brand, model, year, price, image, description }])
.select()

if(error){
alert(error.message)
}else{
const newCars = [...cars, data[0]]
setCars(newCars)

setBrand("")
setModel("")
setYear("")
setPrice("")
setImage("")
setDescription("")
}
}

//////////////////////////////////////////////////////
// DELETE
//////////////////////////////////////////////////////

async function deleteCar(id){

const { error } = await supabase
.from("cars")
.delete()
.eq("id", id)

if(!error){
setCars(prev => prev.filter(car => car.id !== id))
setTestDrives(prev => prev.filter(d => d.car_id !== id))
}
}

//////////////////////////////////////////////////////
// UPDATE
//////////////////////////////////////////////////////

async function updateCar(){

const { error } = await supabase
.from("cars")
.update({
brand: editingCar.brand,
model: editingCar.model,
price: editingCar.price,
year: editingCar.year,
image: editingCar.image,
description: editingCar.description
})
.eq("id", editingCar.id)

if(error){
alert(error.message)
}else{
setEditingCar(null)
loadCars()
}
}

//////////////////////////////////////////////////////
// TEST DRIVE ACTIONS
//////////////////////////////////////////////////////

async function handleTDStatus(id, status){
const { data } = await updateTestDriveStatus(id, status)
if(data){
  setTestDrives(prev => prev.map(d => d.id === id ? {...d, status} : d))
}
}

//////////////////////////////////////////////////////

const pendingCount = testDrives.filter(d => d.status === "pending").length

return(

<div className="min-h-screen bg-[#0D0D0D] p-10">

{/* ─── REALTIME NOTIFICATION BANNER ─── */}
{notification && (
  <div
    className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl cursor-pointer animate-fade-up"
    style={{
      background: 'rgba(15,15,15,0.95)',
      border: '1px solid rgba(212,175,55,0.6)',
      boxShadow: '0 0 30px rgba(212,175,55,0.25)',
      backdropFilter: 'blur(16px)',
      maxWidth: '340px'
    }}
    onClick={() => setNotification(null)}
  >
    <div className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center flex-shrink-0">
      <svg className="w-5 h-5" fill="#080808" viewBox="0 0 24 24">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
      </svg>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-bold" style={{color:'#FFD700'}}>New Test Drive Request!</p>
      <p className="text-xs mt-0.5" style={{color:'#A0A0A0'}}>A customer just requested a test drive · {notification.at}</p>
    </div>
    <button
      onClick={e => { e.stopPropagation(); setNotification(null) }}
      className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full"
      style={{color:'#6b7280'}}
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </button>
  </div>
)}

{/* HEADER */}
<div className="mb-10">
<h1 className="text-3xl font-bold text-[#FFD700]">Dealer Panel</h1>
<p className="text-[#A0A0A0]">Manage your listings</p>
</div>

{/* ===== TEST DRIVE REQUESTS ===== */}
<div className="mb-10">
  <div className="flex items-center gap-3 mb-4">
    <h2 className="text-xl font-semibold text-[#FFFFFF]">Test Drive Requests</h2>
    {pendingCount > 0 && (
      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
        style={{background:'rgba(212,175,55,0.2)', color:'#FFD700', border:'1px solid rgba(212,175,55,0.4)'}}
      >{pendingCount} pending</span>
    )}
  </div>

  {tdLoading ? (
    <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A] flex justify-center">
      <div className="loading-ring"/>
    </div>
  ) : testDrives.length === 0 ? (
    <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A] text-center">
      <p className="text-[#A0A0A0] text-sm">No test drive requests yet.</p>
    </div>
  ) : (
    <div className="bg-[#1A1A1A] rounded-xl shadow-lg border border-[#2A2A2A] overflow-hidden">
      <div className="grid grid-cols-5 bg-[#1F1F1F] px-4 py-3 text-sm font-semibold text-[#A0A0A0] border-b border-[#2A2A2A]">
        <p>Vehicle</p>
        <p>Customer</p>
        <p>Date &amp; Time</p>
        <p>Status</p>
        <p>Actions</p>
      </div>
      {testDrives.map(drive => {
        const statusStyle = {
          pending:   { color:'#D4AF37', bg:'rgba(212,175,55,0.12)', label:'Pending' },
          confirmed: { color:'#22c55e', bg:'rgba(34,197,94,0.12)',  label:'Confirmed' },
          cancelled: { color:'#6b7280', bg:'rgba(107,114,128,0.1)', label:'Cancelled' },
        }
        const s = statusStyle[drive.status] || statusStyle.pending
        return (
          <div key={drive.id} className="grid grid-cols-5 px-4 py-3 border-t border-[#2A2A2A] items-center gap-2">
            <p className="text-[#FFFFFF] text-sm font-medium">
              {drive.cars?.brand} {drive.cars?.model}
            </p>
            <div>
              <p className="text-[#FFFFFF] text-sm">{drive.users?.full_name || "—"}</p>
              <p className="text-[#A0A0A0] text-xs truncate">{drive.users?.email || (drive.user_id ? drive.user_id.slice(0,8)+"…" : "Guest")}</p>
            </div>
            <p className="text-[#A0A0A0] text-sm">
              {drive.date ? new Date(drive.date).toLocaleString("en-US",{month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit',hour12:true}) : "—"}
            </p>
            <span className="text-xs font-bold px-3 py-1 rounded-full inline-block" style={{background:s.bg,color:s.color}}>
              {s.label}
            </span>
            <div className="flex gap-2">
              {drive.status === 'pending' && (
                <>
                  <button
                    onClick={()=>handleTDStatus(drive.id,'confirmed')}
                    className="text-xs px-3 py-1 rounded font-semibold"
                    style={{background:'rgba(34,197,94,0.15)',color:'#22c55e',border:'1px solid rgba(34,197,94,0.3)'}}
                  >Confirm</button>
                  <button
                    onClick={()=>handleTDStatus(drive.id,'cancelled')}
                    className="text-xs px-3 py-1 rounded font-semibold"
                    style={{background:'rgba(220,38,38,0.12)',color:'#EF4444',border:'1px solid rgba(220,38,38,0.25)'}}
                  >Cancel</button>
                </>
              )}
              {drive.status === 'confirmed' && (
                <button
                  onClick={()=>handleTDStatus(drive.id,'cancelled')}
                  className="text-xs px-3 py-1 rounded font-semibold"
                  style={{background:'rgba(220,38,38,0.12)',color:'#EF4444',border:'1px solid rgba(220,38,38,0.25)'}}
                >Cancel</button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )}
</div>

{/* ADD FORM */}
<div className="bg-[#1A1A1A] p-6 rounded-xl shadow-lg mb-10 border border-[#2A2A2A]">

<h2 className="text-lg font-semibold mb-4 text-[#FFD700]">Add Car</h2>

<form onSubmit={handleAddCar} className="grid grid-cols-2 gap-4">

<input placeholder="Brand" value={brand} onChange={e=>setBrand(e.target.value)} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] placeholder-[#A0A0A0] focus:outline-none focus:border-[#FFD700]"/>
<input placeholder="Model" value={model} onChange={e=>setModel(e.target.value)} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] placeholder-[#A0A0A0] focus:outline-none focus:border-[#FFD700]"/>
<input placeholder="Year" value={year} onChange={e=>setYear(e.target.value)} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] placeholder-[#A0A0A0] focus:outline-none focus:border-[#FFD700]"/>
<input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] placeholder-[#A0A0A0] focus:outline-none focus:border-[#FFD700]"/>

<input placeholder="Image URL" value={image} onChange={e=>setImage(e.target.value)} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] placeholder-[#A0A0A0] focus:outline-none focus:border-[#FFD700] col-span-2"/>

<textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] placeholder-[#A0A0A0] focus:outline-none focus:border-[#FFD700] col-span-2"/>

<button className="bg-[#FFD700] text-[#0D0D0D] py-2 rounded col-span-2 hover:bg-[#FFD700] hover:shadow-lg hover:shadow-[rgba(255,215,0,0.3)] transition font-semibold">Add Car</button>

</form>
</div>

{/* EDIT PANEL */}
{editingCar && (
<div className="bg-[#1A1A1A] border border-[#FFD700] p-6 rounded-xl shadow-lg mb-10">

<h2 className="font-semibold mb-3 text-[#FFD700]">Edit Car</h2>

<div className="grid grid-cols-2 gap-4">

<input value={editingCar.brand} onChange={e=>setEditingCar({...editingCar, brand:e.target.value})} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] focus:outline-none focus:border-[#FFD700]"/>
<input value={editingCar.model} onChange={e=>setEditingCar({...editingCar, model:e.target.value})} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] focus:outline-none focus:border-[#FFD700]"/>

<input value={editingCar.year} onChange={e=>setEditingCar({...editingCar, year:e.target.value})} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] focus:outline-none focus:border-[#FFD700]"/>
<input value={editingCar.price} onChange={e=>setEditingCar({...editingCar, price:e.target.value})} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] focus:outline-none focus:border-[#FFD700]"/>

<input value={editingCar.image} onChange={e=>setEditingCar({...editingCar, image:e.target.value})} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] focus:outline-none focus:border-[#FFD700] col-span-2"/>

<textarea value={editingCar.description} onChange={e=>setEditingCar({...editingCar, description:e.target.value})} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] focus:outline-none focus:border-[#FFD700] col-span-2"/>

<button onClick={updateCar} className="bg-[#FFD700] text-[#0D0D0D] py-2 rounded col-span-2 hover:bg-[#FFD700] hover:shadow-lg hover:shadow-[rgba(255,215,0,0.3)] transition font-semibold">Update Car</button>

</div>
</div>
)}



{/* LISTINGS */}
<h2 className="text-xl font-semibold mb-4 text-[#FFFFFF]">My Listings</h2>

<div className="grid md:grid-cols-3 gap-6">

{cars.map(car=>(
<div key={car.id} className="bg-[#1A1A1A] rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[rgba(255,215,0,0.2)] overflow-hidden border border-[#2A2A2A]">

<img src={car.image} className="w-full h-40 object-cover"/>

<div className="p-4">

<p className="font-semibold text-lg text-[#FFFFFF]">{car.brand} {car.model}</p>

<p className="text-[#FFD700] font-bold">${car.price}</p>

<div className="flex gap-2 mt-3">

<button
onClick={()=>setEditingCar(car)}
className="bg-[#FFD700] text-[#0D0D0D] px-3 py-1 rounded hover:bg-[#FFD700] hover:shadow-lg hover:shadow-[rgba(255,215,0,0.3)] transition font-semibold"
>
Edit
</button>

<button
onClick={()=>deleteCar(car.id)}
className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
>
Delete
</button>

</div>

</div>
</div>
))}

</div>

</div>
)
}

export default DealerDashboard