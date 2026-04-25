import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"
import { getAllTestDrives } from "../services/testDriveService"

function AdminDashboard(){

const [users,setUsers] = useState([])
const [cars,setCars] = useState([])
const [testDrives,setTestDrives] = useState([])
const [tdLoading,setTdLoading] = useState(false)

useEffect(()=>{
loadData()
},[])

//////////////////////////////////////////////////////
// LOAD DATA
//////////////////////////////////////////////////////

async function loadData(){

const { data: userData } = await supabase.from("users").select("*")
const { data: carData } = await supabase.from("cars").select("*")

// ADMIN FIRST
const sortedUsers = (userData || []).sort((a,b)=>{
if(a.role === "admin") return -1
if(b.role === "admin") return 1
return 0
})

setUsers(sortedUsers)
setCars(carData || [])

// Load test drives
setTdLoading(true)
const { data: driveData } = await getAllTestDrives()
setTestDrives(driveData || [])
setTdLoading(false)
}

//////////////////////////////////////////////////////
// DELETE CAR (FINAL PERFECT VERSION)
//////////////////////////////////////////////////////

async function deleteCar(id){

const { error } = await supabase
.from("cars")
.delete()
.eq("id", id)

if(error){
alert(error.message)
}else{

alert("Deleted successfully")

// 🔥 INSTANT UI UPDATE
setCars(prev => prev.filter(car => car.id !== id))

}

}

//////////////////////////////////////////////////////
// DELETE USER
//////////////////////////////////////////////////////



async function deleteUser(id){

const user = users.find(u => u.id === id)

if(user?.role === "admin"){
alert("Admin cannot be deleted")
return
}

await supabase.from("users").delete().eq("id", id)

// update UI instantly
setUsers(prev => prev.filter(u => u.id !== id))
}

//////////////////////////////////////////////////////
// CHANGE ROLE
//////////////////////////////////////////////////////

async function changeUserRole(id, role){

const user = users.find(u => u.id === id)

if(user?.role === "admin"){
alert("Admin cannot be changed")
return
}

await supabase.from("users").update({ role }).eq("id", id)

// update UI instantly
setUsers(prev =>
prev.map(u => u.id === id ? {...u, role} : u)
)

}

//////////////////////////////////////////////////////
// CHANGE MY ROLE
//////////////////////////////////////////////////////

async function changeMyRole(role){

const { data } = await supabase.auth.getUser()

await supabase
.from("users")
.update({ role })
.eq("id", data.user.id)

window.location.reload()
}

//////////////////////////////////////////////////////

return(

<div className="min-h-screen bg-[#0D0D0D] p-10">

{/* TOP BAR */}
<div className="flex justify-between items-center mb-10">

<h1 className="text-3xl font-bold text-[#FFD700]">
Admin Panel
</h1>

<div className="flex items-center gap-3">

<p className="text-sm text-[#A0A0A0]">
Role: <span className="text-[#FFD700] font-semibold">Admin</span>
</p>

<select
onChange={(e)=>changeMyRole(e.target.value)}
className="bg-[#1A1A1A] border border-[#2A2A2A] px-3 py-1 rounded text-[#FFFFFF] focus:outline-none focus:border-[#FFD700]"
>
<option value="admin">Admin</option>
<option value="dealer">Dealer</option>
<option value="customer">Customer</option>
</select>

</div>

</div>

{/* STATS */}
<div className="grid grid-cols-3 gap-6 mb-10">

<div className="bg-[#1A1A1A] p-6 rounded-xl shadow-lg border border-[#2A2A2A]">
<p className="text-[#A0A0A0]">Total Users</p>
<p className="text-2xl font-bold text-[#FFD700]">{users.length}</p>
</div>

<div className="bg-[#1A1A1A] p-6 rounded-xl shadow-lg border border-[#2A2A2A]">
<p className="text-[#A0A0A0]">Total Cars</p>
<p className="text-2xl font-bold text-[#FFD700]">{cars.length}</p>
</div>

<div className="bg-[#1A1A1A] p-6 rounded-xl shadow-lg border border-[#2A2A2A]">
<p className="text-[#A0A0A0]">Dealers</p>
<p className="text-2xl font-bold text-[#FFD700]">
{users.filter(u=>u.role==="dealer").length}
</p>
</div>

</div>

{/* USERS */}
<h2 className="text-xl font-semibold mb-4 text-[#FFFFFF]">Manage Users</h2>

<div className="bg-[#1A1A1A] rounded-xl shadow-lg border border-[#2A2A2A]">

<div className="grid grid-cols-4 bg-[#1F1F1F] p-3 font-medium text-[#A0A0A0] border-b border-[#2A2A2A]">
<p>Email</p>
<p>Role</p>
<p>Change Role</p>
<p>Action</p>
</div>

{users.map(user=>(
<div key={user.id} className="grid grid-cols-4 p-3 border-t border-[#2A2A2A] items-center">

<p className="text-[#FFFFFF] truncate pr-2" title={user.email}>{user.email}</p>

<p className={`capitalize ${user.role==="admin" ? "text-[#FFD700] font-bold" : "text-[#A0A0A0]"}`}>
{user.role}
</p>



<div className="flex gap-2">

{user.role !== "admin" && (
  <>
    <button
      onClick={() => changeUserRole(user.id, "customer")}
      disabled={user.role === "customer"}
      className={`px-2 py-1 rounded text-sm transition ${
        user.role === "customer"
          ? "bg-[#FFD700] text-[#0D0D0D] font-semibold"
          : "bg-[#2A2A2A] text-[#FFFFFF] hover:bg-[#FFD700] hover:text-[#0D0D0D]"
      }`}
    >
      Customer
    </button>

    <button
      onClick={() => changeUserRole(user.id, "dealer")}
      disabled={user.role === "dealer"}
      className={`px-2 py-1 rounded text-sm transition ${
        user.role === "dealer"
          ? "bg-[#FFD700] text-[#0D0D0D] font-semibold"
          : "bg-[#2A2A2A] text-[#FFFFFF] hover:bg-[#FFD700] hover:text-[#0D0D0D]"
      }`}
    >
      Dealer
    </button>
  </>
)}

</div>

<div>
{user.role !== "admin" && (
<button
onClick={()=>deleteUser(user.id)}
className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
>
Delete
</button>
)}
</div>

</div>
))}

</div>

{/* CARS */}
<h2 className="text-xl font-semibold mb-4 text-[#FFFFFF]">Manage Cars</h2>

<div className="grid md:grid-cols-3 gap-6">

{cars.map(car=>(
<div key={car.id} className="bg-[#1A1A1A] rounded-xl shadow-lg overflow-hidden border border-[#2A2A2A]">

<img src={car.image} className="w-full h-40 object-cover"/>

<div className="p-4">

<div className="flex justify-between items-start mb-1">
  <p className="font-semibold text-[#FFFFFF]">
    {car.brand} {car.model}
  </p>
</div>

<p className="text-[#FFD700] font-bold">
${car.price}
</p>

<button
onClick={()=>deleteCar(car.id)}
className="bg-red-600 text-white px-3 py-1 rounded mt-3 hover:bg-red-700 transition"
>
Delete
</button>

</div>

</div>
))}

</div>

{/* TEST DRIVES */}
<h2 className="text-xl font-semibold mb-4 mt-10 text-[#FFFFFF]">Test Drive Requests</h2>

{tdLoading ? (
  <div className="flex justify-center py-8"><div className="loading-ring"/></div>
) : testDrives.length === 0 ? (
  <div className="bg-[#1A1A1A] rounded-xl p-8 text-center border border-[#2A2A2A]">
    <p className="text-[#A0A0A0]">No test drive requests yet.</p>
  </div>
) : (
  <div className="bg-[#1A1A1A] rounded-xl shadow-lg border border-[#2A2A2A] overflow-hidden">
    <div className="grid grid-cols-4 bg-[#1F1F1F] p-3 font-medium text-[#A0A0A0] border-b border-[#2A2A2A] text-sm">
      <p>Vehicle</p>
      <p>Customer</p>
      <p>Date &amp; Time</p>
      <p>Status</p>
    </div>
    {testDrives.map(drive => {
      const statusStyle = {
        pending:   { color:'#D4AF37', bg:'rgba(212,175,55,0.12)',  label:'Pending' },
        confirmed: { color:'#22c55e', bg:'rgba(34,197,94,0.12)',   label:'Confirmed' },
        cancelled: { color:'#6b7280', bg:'rgba(107,114,128,0.1)', label:'Cancelled' },
      }
      const s = statusStyle[drive.status] || statusStyle.pending
      return (
        <div key={drive.id} className="grid grid-cols-4 p-3 border-t border-[#2A2A2A] items-center gap-2">
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
          <span className="text-xs font-bold px-3 py-1 rounded-full inline-block" style={{background:s.bg, color:s.color}}>
            {s.label}
          </span>
        </div>
      )
    })}
  </div>
)}

</div>
)
}

export default AdminDashboard