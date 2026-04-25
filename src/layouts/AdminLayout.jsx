import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"

function AdminLayout(){

const navigate = useNavigate()

const [user,setUser] = useState(null)
const [role,setRole] = useState("admin")

//////////////////////////////////////////////////
// LOAD USER
//////////////////////////////////////////////////

useEffect(()=>{
loadUser()
},[])

async function loadUser(){

const { data } = await supabase.auth.getUser()

if(data.user){
setUser(data.user)

const { data: userData } = await supabase
.from("users")
.select("role")
.eq("id", data.user.id)
.single()

setRole(userData?.role)
}
}

//////////////////////////////////////////////////
// ROLE CHANGE
//////////////////////////////////////////////////

async function handleRoleChange(e){

const newRole = e.target.value

if(!user) return

const { error } = await supabase
.from("users")
.update({ role: newRole })
.eq("id", user.id)

if(error){
alert("Role update failed")
return
}

// 🔥 REDIRECT (IMPORTANT)
if(newRole === "dealer"){
window.location.href = "/dealer"
}
else if(newRole === "customer"){
window.location.href = "/"
}
else{
window.location.href = "/admin"
}

}

//////////////////////////////////////////////////

return(
<div className="min-h-screen bg-[#0D0D0D]">

{/* NAVBAR */}
<div className="glass flex justify-between px-8 py-4 rounded-b-2xl mx-4 mt-2">

<div className="flex items-center gap-3">
  <div className="w-10 h-10 gold-gradient rounded-full flex items-center justify-center">
    <svg className="w-6 h-6 text-[#0D0D0D]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  </div>
  <h1
  onClick={()=>navigate("/admin")}
  className="gold-text-gradient text-2xl font-bold cursor-pointer hover:scale-105 transition"
  >
  MotoVerse Admin
  </h1>
</div>

<div className="flex items-center gap-6">

{/* ROLE SWITCH */}
<div className="flex items-center gap-2">
  <svg className="w-5 h-5 text-[#A0A0A0]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
  </svg>
  <select
  value={role}
  onChange={handleRoleChange}
  className="glass-light bg-transparent border border-[#2A2A2A] px-3 py-2 rounded-lg text-[#FFFFFF] focus:outline-none focus:border-[#FFD700] cursor-pointer"
  >
  <option value="customer">Customer</option>
  <option value="dealer">Dealer</option>
  <option value="admin">Admin</option>
  </select>
</div>

</div>

</div>

{/* CONTENT */}
<div className="p-10">
<Outlet/>
</div>

</div>
)
}

export default AdminLayout