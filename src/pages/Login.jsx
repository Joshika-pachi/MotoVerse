import { useState } from "react"
import { supabase } from "../services/supabaseClient"
import { Link, useNavigate } from "react-router-dom"

function Login(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [loading,setLoading]=useState(false)

const navigate = useNavigate()

async function handleLogin(e){

e.preventDefault()
setLoading(true)

const { data, error } = await supabase.auth.signInWithPassword({
email,
password
})

if(error){
alert(error.message)
setLoading(false)
return
}

// 🔥 GET ROLE
const { data: userData } = await supabase
.from("users")
.select("role")
.eq("id", data.user.id)
.single()

const role = userData?.role

// 🔥 ROLE BASED REDIRECT
if(role === "admin"){
navigate("/admin")
}
else if(role === "dealer"){
navigate("/dealer")
}
else{
navigate("/")
}

setLoading(false)
}

return(

<div className="min-h-screen grid md:grid-cols-2">

{/* 🔥 LEFT IMAGE */}
<div className="hidden md:block">
<img
src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
className="w-full h-full object-cover"
/>
</div>

{/* 🔥 RIGHT FORM */}
<div className="flex items-center justify-center bg-gray-100">

<div className="bg-white p-10 rounded-2xl shadow-xl w-96">

<h2 className="text-3xl font-bold mb-2 text-center">
MotoVerse 🚗
</h2>

<p className="text-center text-gray-500 mb-6">
Login to continue
</p>

<form onSubmit={handleLogin} className="space-y-4">

<input
type="email"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500"
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500"
/>

<button
disabled={loading}
className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
>
{loading ? "Logging in..." : "Login"}
</button>

</form>

<p className="text-center text-sm mt-5 text-gray-500">
New user?{" "}
<Link to="/register" className="text-indigo-600 hover:underline">
Register
</Link>
</p>

</div>

</div>

</div>
)
}

export default Login