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

function App(){

const [user,setUser] = useState(null)
const [role,setRole] = useState(null)
const [loading,setLoading] = useState(true)

useEffect(()=>{
loadUser()

// 🔥 LISTEN FOR AUTH CHANGE
const { data: listener } = supabase.auth.onAuthStateChange(()=>{
loadUser()
})

return ()=> listener.subscription.unsubscribe()

},[])

async function loadUser(){

const { data } = await supabase.auth.getUser()

if(data.user){

setUser(data.user)

// 🔥 ALWAYS FETCH ROLE
const { data: userData } = await supabase
.from("users")
.select("role")
.eq("id", data.user.id)
.single()

setRole(userData?.role)

}else{
setUser(null)
setRole(null)
}

setLoading(false)
}

// 🔒 PROTECTED ROUTE
function ProtectedRoute({ children }){

if(loading) return <p>Loading...</p>

if(!user){
return <Navigate to="/login" />
}

return children
}

// 🎯 CORRECT ORDER (IMPORTANT)
function LayoutWrapper({ children }){

if(role === "admin"){
return <AdminLayout>{children}</AdminLayout>
}

if(role === "dealer"){
return <DealerLayout>{children}</DealerLayout>
}

return <CustomerLayout>{children}</CustomerLayout>
}

return(

<Routes>

{/* PUBLIC */}
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>

<Route path="/" element={
<ProtectedRoute>
{
role === "admin" ? (
<AdminLayout>
<AdminDashboard/>
</AdminLayout>
) : role === "dealer" ? (
<DealerLayout>
<DealerDashboard/>
</DealerLayout>
) : (
<CustomerLayout>
<Home/>
</CustomerLayout>
)
}
</ProtectedRoute>
}/>

<Route path="/cars" element={
<ProtectedRoute>
<LayoutWrapper>
<BrowseCars/>
</LayoutWrapper>
</ProtectedRoute>
}/>

<Route path="/car/:id" element={
<ProtectedRoute>
<LayoutWrapper>
<CarDetails/>
</LayoutWrapper>
</ProtectedRoute>
}/>

<Route path="/messages" element={
<ProtectedRoute>
<LayoutWrapper>
<Messages/>
</LayoutWrapper>
</ProtectedRoute>
}/>

{/* 🔥 ROLE-SPECIFIC DASHBOARDS */}
<Route path="/dealer" element={
<ProtectedRoute>
<DealerLayout>
<DealerDashboard/>
</DealerLayout>
</ProtectedRoute>
}/>

<Route path="/admin" element={
<ProtectedRoute>
<AdminLayout>
<AdminDashboard/>
</AdminLayout>
</ProtectedRoute>
}/>

{/* DEFAULT */}
<Route path="*" element={<Navigate to="/" />} />

</Routes>
)
}

export default App