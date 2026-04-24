import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"

function DealerLayout({ children }) {

const navigate = useNavigate()
const [role, setRole] = useState("dealer")

useEffect(()=>{
loadRole()
},[])

async function loadRole(){
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

async function changeRole(newRole){

const { data } = await supabase.auth.getUser()

await supabase
.from("users")
.update({ role: newRole })
.eq("id", data.user.id)

window.location.reload()
}

return (

<div className="min-h-screen bg-gray-100">

{/* 🔥 TOP BAR */}
<div className="flex justify-between items-center bg-white px-10 py-4 shadow">

<h1 className="text-xl font-bold text-indigo-600">
MotoVerse
</h1>

<div className="flex items-center gap-6">

{/* ROLE */}
<p className="text-sm text-gray-500">
Role:
<span className="ml-1 font-semibold text-indigo-600 capitalize">
{role}
</span>
</p>

{/* MESSAGES BUTTON (IMPROVED) */}
<button
onClick={()=>navigate("/messages")}
className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-lg shadow-md hover:scale-105 transition duration-300"
>
💬 Messages
</button>

{/* ROLE SWITCH */}
<select
value={role}
onChange={(e)=>changeRole(e.target.value)}
className="border px-3 py-1 rounded-md"
>
<option value="customer">Customer</option>
<option value="dealer">Dealer</option>
<option value="admin">Admin</option>
</select>

</div>

</div>

{/* MAIN */}
<div className="p-10">
{children}
</div>

</div>

)
}

export default DealerLayout