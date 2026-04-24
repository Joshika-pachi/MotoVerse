import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"

function AdminDashboard(){

const [users,setUsers] = useState([])
const [cars,setCars] = useState([])

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

<div className="min-h-screen bg-gray-100 p-10">

{/* TOP BAR */}
<div className="flex justify-between items-center mb-10">

<h1 className="text-3xl font-bold">
Admin Panel
</h1>

<div className="flex items-center gap-3">

<p className="text-sm text-gray-500">
Role: <span className="text-red-600 font-semibold">Admin</span>
</p>

<select
onChange={(e)=>changeMyRole(e.target.value)}
className="border px-3 py-1 rounded"
>
<option value="admin">Admin</option>
<option value="dealer">Dealer</option>
<option value="customer">Customer</option>
</select>

</div>

</div>

{/* STATS */}
<div className="grid grid-cols-3 gap-6 mb-10">

<div className="bg-white p-6 rounded-xl shadow">
<p>Total Users</p>
<p className="text-2xl font-bold">{users.length}</p>
</div>

<div className="bg-white p-6 rounded-xl shadow">
<p>Total Cars</p>
<p className="text-2xl font-bold">{cars.length}</p>
</div>

<div className="bg-white p-6 rounded-xl shadow">
<p>Dealers</p>
<p className="text-2xl font-bold">
{users.filter(u=>u.role==="dealer").length}
</p>
</div>

</div>

{/* USERS */}
<h2 className="text-xl font-semibold mb-4">Manage Users</h2>

<div className="bg-white rounded-xl shadow mb-10">

<div className="grid grid-cols-4 bg-gray-100 p-3 font-medium">
<p>Email</p>
<p>Role</p>
<p>Change Role</p>
<p>Action</p>
</div>

{users.map(user=>(
<div key={user.id} className="grid grid-cols-4 p-3 border-t items-center">

<p>{user.email}</p>

<p className={`capitalize ${user.role==="admin" ? "text-red-600 font-bold" : ""}`}>
{user.role}
</p>

<div className="flex gap-2">

{user.role !== "admin" && (
<>
<button
onClick={()=>changeUserRole(user.id,"customer")}
className="bg-gray-200 px-2 py-1 rounded text-sm"
>
Customer
</button>

<button
onClick={()=>changeUserRole(user.id,"dealer")}
className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
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
className="bg-red-500 text-white px-3 py-1 rounded"
>
Delete
</button>
)}
</div>

</div>
))}

</div>

{/* CARS */}
<h2 className="text-xl font-semibold mb-4">Manage Cars</h2>

<div className="grid md:grid-cols-3 gap-6">

{cars.map(car=>(
<div key={car.id} className="bg-white rounded-xl shadow overflow-hidden">

<img src={car.image} className="w-full h-40 object-cover"/>

<div className="p-4">

<p className="font-semibold">
{car.brand} {car.model}
</p>

<p className="text-green-600 font-bold">
${car.price}
</p>

<button
onClick={()=>deleteCar(car.id)}
className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
>
Delete
</button>

</div>

</div>
))}

</div>

</div>
)
}

export default AdminDashboard