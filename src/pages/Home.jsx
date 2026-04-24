import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"
import { Link } from "react-router-dom"

function Home(){

const [role,setRole] = useState("customer")

useEffect(()=>{
loadUser()
},[])

async function loadUser(){

const { data } = await supabase.auth.getUser()

if(data.user){
const { data: userData } = await supabase
.from("users")
.select("role")
.eq("id", data.user.id)
.single()

if(userData){
setRole(userData.role)
}
}

}

async function handleRoleChange(e){

const newRole = e.target.value
setRole(newRole)

const { data } = await supabase.auth.getUser()

await supabase
.from("users")
.update({ role: newRole })
.eq("id", data.user.id)

}

return(

<div className="min-h-screen bg-gray-50">

<div className="max-w-7xl mx-auto px-8">

{/* 🔥 HEADER */}
<div className="flex justify-between items-center py-6">

<div className="flex items-center gap-2">
<div className="w-8 h-8 bg-indigo-600 rounded-lg"></div>
<h1 className="text-lg font-semibold">
MotoVerse
</h1>
</div>

<div className="flex items-center gap-4">

<p className="text-sm text-gray-500">
Logged in as <span className="text-indigo-600 font-medium capitalize">{role}</span>
</p>

<select
value={role}
onChange={handleRoleChange}
className="border border-gray-200 px-3 py-1 rounded-md text-sm"
>
<option value="customer">Customer</option>
<option value="dealer">Dealer</option>
<option value="admin">Admin</option>
</select>

</div>

</div>

{/* 🔥 HERO */}
<div className="grid md:grid-cols-2 gap-12 items-center py-16">

<div>

<h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
Drive Your <span className="text-indigo-600">Dream Car</span>
</h1>

<p className="mt-5 text-gray-600 max-w-md">
Explore cars, connect with dealers, and book test drives — all in one seamless experience.
</p>

<div className="mt-8 flex gap-4">

<Link
to="/cars"
className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:shadow-lg hover:-translate-y-1 transition"
>
Explore Cars
</Link>

{role === "dealer" && (
<Link
to="/dealer"
className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition"
>
Dashboard
</Link>
)}

{role === "admin" && (
<Link
to="/admin"
className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition"
>
Admin
</Link>
)}

</div>

</div>

{/* IMAGE */}
<div className="relative">

<img
src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
className="rounded-2xl shadow-xl"
/>

<div className="absolute -z-10 top-10 left-10 w-64 h-64 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>

</div>

</div>

{/* 🔥 WHY SECTION (FIXED CLEAN GRID) */}
<div className="py-20">

<h2 className="text-3xl font-bold text-center mb-12">
Why MotoVerse?
</h2>

<div className="grid md:grid-cols-3 gap-8">

<div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">

<div className="w-12 h-12 flex items-center justify-center bg-indigo-100 rounded-lg mb-4 text-xl">
🚗
</div>

<h3 className="text-lg font-semibold">
Smart Browsing
</h3>

<p className="text-gray-500 mt-2 text-sm">
Explore cars with clear details and smooth navigation.
</p>

</div>

<div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">

<div className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-lg mb-4 text-xl">
⚡
</div>

<h3 className="text-lg font-semibold">
Quick Booking
</h3>

<p className="text-gray-500 mt-2 text-sm">
Book test drives instantly without delays.
</p>

</div>

<div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">

<div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg mb-4 text-xl">
💬
</div>

<h3 className="text-lg font-semibold">
Direct Connect
</h3>

<p className="text-gray-500 mt-2 text-sm">
Communicate directly with dealers easily.
</p>

</div>

</div>

</div>

{/* 🔥 CTA */}
<div className="bg-indigo-600 text-white text-center py-20 rounded-3xl mb-16">

<h2 className="text-3xl font-bold">
Start Your Journey Today
</h2>

<p className="mt-3 text-indigo-100">
Find your perfect car in minutes.
</p>

<Link
to="/cars"
className="inline-block mt-6 bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:scale-105 transition"
>
Explore Cars →
</Link>

</div>

</div>

</div>
)
}

export default Home