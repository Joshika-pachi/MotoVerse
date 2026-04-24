import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "./services/supabaseClient"

import CustomerLayout from "./layouts/CustomerLayout"
import DealerLayout from "./layouts/DealerLayout"
import AdminLayout from "./layouts/AdminLayout"

import Home from "./pages/Home"
import BrowseCars from "./pages/BrowseCars"
import DealerDashboard from "./pages/DealerDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import Messages from "./pages/Messages"   // ✅ ADD THIS
import Login from "./pages/Login"
import Register from "./pages/Register"

function App(){

const [user,setUser] = useState(null)
const [role,setRole] = useState(null)

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

return(

<Routes>

{/* NOT LOGGED IN */}
{!user && (
<>
<Route path="*" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
</>
)}

{/* CUSTOMER */}
{user && role === "customer" && (
<>
<Route path="/" element={
<CustomerLayout>
<Home/>
</CustomerLayout>
}/>

<Route path="/cars" element={
<CustomerLayout>
<BrowseCars/>
</CustomerLayout>
}/>

<Route path="/messages" element={
<CustomerLayout>
<Messages/>
</CustomerLayout>
}/>
</>
)}

{/* DEALER */}
{user && role === "dealer" && (
<>
<Route path="/" element={
<DealerLayout>
<DealerDashboard/>
</DealerLayout>
}/>

<Route path="/messages" element={
<DealerLayout>
<Messages/>
</DealerLayout>
}/>
</>
)}

{/* ADMIN */}
{user && role === "admin" && (
<>
<Route path="/" element={
<AdminLayout>
<AdminDashboard/>
</AdminLayout>
}/>

<Route path="/messages" element={
<AdminLayout>
<Messages/>
</AdminLayout>
}/>
</>
)}

</Routes>
)
}

export default App