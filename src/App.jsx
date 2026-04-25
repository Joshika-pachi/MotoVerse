import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "./services/supabaseClient"

import CustomerLayout from "./layouts/CustomerLayout"
import DealerLayout from "./layouts/DealerLayout"
import AdminLayout from "./layouts/AdminLayout"

import Home from "./pages/Home"
import BrowseCars from "./pages/BrowseCars"
import CarDetails from "./pages/CarDetails"
import DealerDashboard from "./pages/DealerDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import Messages from "./pages/Messages"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"

function App(){

const [user,setUser] = useState(null)
const [role,setRole] = useState(null)
const [loading,setLoading] = useState(true)

useEffect(()=>{
loadUser()
},[])

async function loadUser(){
const { data } = await supabase.auth.getUser()

if(data.user){
setUser(data.user)

// Fetch role from users table
const { data: userData } = await supabase
  .from("users")
  .select("role")
  .eq("id", data.user.id)
  .single()

setRole(userData?.role || "customer")
}

setLoading(false)
}

// Helper to get the home path for the current role
function getRoleHome(){
if(role === "admin") return "/admin"
if(role === "dealer") return "/dealer"
return "/"
}

//////////////////////////////////////////////////

if(loading){
return <div className="p-10 bg-[#0D0D0D] text-[#FFFFFF]">Loading...</div>
}

//////////////////////////////////////////////////

if(!user){
return (
<Routes>
<Route path="*" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
</Routes>
)
}

//////////////////////////////////////////////////

return(

<Routes>

{/* CUSTOMER */}
<Route path="/" element={<CustomerLayout/>}>
<Route index element={
  role === "customer" ? <Home/> : <Navigate to={getRoleHome()} replace />
}/>
<Route path="cars" element={<BrowseCars/>}/>
<Route path="car/:id" element={<CarDetails/>}/>
<Route path="messages" element={<Messages/>}/>
<Route path="profile" element={<Profile/>}/>
</Route>

{/* DEALER */}
<Route path="/dealer" element={<DealerLayout/>}>
<Route index element={<DealerDashboard/>}/>
<Route path="messages" element={<Messages/>}/>
</Route>

{/* ADMIN */}
<Route path="/admin" element={<AdminLayout/>}>
<Route index element={<AdminDashboard/>}/>
</Route>

{/* FALLBACK — redirect to role-appropriate dashboard */}
<Route path="*" element={<Navigate to={getRoleHome()} replace />} />

</Routes>
)
}

export default App