import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"

function CustomerLayout({ children }){

const navigate = useNavigate()
const [user,setUser] = useState(null)
const [role,setRole] = useState("customer")

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

// 🔥 CHANGE ROLE
async function handleRoleChange(newRole){

await supabase
.from("users")
.update({ role: newRole })
.eq("id", user.id)

window.location.reload()
}

return(

<div>

{/* 🔥 NAVBAR */}
<div className="flex justify-between items-center px-10 py-4 bg-white shadow">

<h1
onClick={()=>navigate("/")}
className="text-xl font-bold text-indigo-600 cursor-pointer"
>
MotoVerse
</h1>

<div className="flex items-center gap-6">

<button onClick={()=>navigate("/")} className="text-gray-600 hover:text-black">
Home
</button>

<button onClick={()=>navigate("/cars")} className="text-gray-600 hover:text-black">
Browse
</button>

{/* 🔥 ROLE SWITCH */}
<div className="flex items-center gap-2">

<span className="text-sm text-gray-500">
Role:
</span>

<select
value={role}
onChange={(e)=>handleRoleChange(e.target.value)}
className="border px-2 py-1 rounded"
>
<option value="customer">Customer</option>
<option value="dealer">Dealer</option>
<option value="admin">Admin</option>
</select>

</div>

</div>

</div>

{/* PAGE */}
<div>
{children}
</div>

</div>
)
}

export default CustomerLayout