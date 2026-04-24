import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"

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

return(

<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">

<div className="max-w-7xl mx-auto px-10">

{/* 🔥 TOP BAR */}
<div className="flex justify-between items-center py-6">

<h1 className="text-2xl font-bold flex items-center gap-2">

{/* 🚀 CLEAN LOGO */}
<span className="text-3xl">🚗</span>
<span className="text-gray-900">MotoVerse</span>

</h1>

<p className="text-sm text-gray-500">
Logged in as:
<span className="text-indigo-600 font-semibold ml-1 capitalize">
{role}
</span>
</p>

</div>

{/* 🔥 HERO */}
<div className="grid md:grid-cols-2 gap-16 items-center py-20">

<div>

<h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
Drive Your <span className="text-indigo-600">Dream Car</span>
</h1>

<p className="mt-6 text-gray-600 text-lg max-w-lg">
Discover premium cars, connect with trusted dealers, and book your ride — all in one place.
</p>

<Link
to="/cars"
className="inline-block mt-8 bg-indigo-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition"
>
Explore Cars →
</Link>

</div>

{/* IMAGE */}
<div className="relative">

<img
src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
className="rounded-3xl shadow-2xl"
/>

<div className="absolute -z-10 top-10 left-10 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-30"></div>

</div>

</div>

{/* 🔥 WHY SECTION */}
<div className="py-20">

<h2 className="text-4xl font-bold text-center mb-16">
Why MotoVerse?
</h2>

<div className="grid md:grid-cols-3 gap-10">

{/* CARD 1 */}
<div className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl transition">

<h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
🚗 Smart Search
</h3>

<p className="text-gray-500">
Find cars with detailed filters and clean listings.
</p>

</div>

{/* CARD 2 */}
<div className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl transition">

<h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
⚡ Fast Booking
</h3>

<p className="text-gray-500">
Schedule test drives instantly without delays.
</p>

</div>

{/* CARD 3 */}
<div className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl transition">

<h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
💬 Direct Chat
</h3>

<p className="text-gray-500">
Chat directly with dealers for quick decisions.
</p>

</div>

</div>

</div>

{/* 🔥 CTA */}
<div className="text-center py-20">

<h2 className="text-4xl font-bold">
Start Your Journey Today
</h2>

<p className="text-gray-500 mt-4">
Find your perfect car in minutes.
</p>

<Link
to="/cars"
className="inline-block mt-8 bg-indigo-600 text-white px-10 py-4 rounded-2xl text-lg shadow-lg hover:scale-105 transition"
>
Get Started →
</Link>

</div>

</div>

</div>
)
}

export default Home