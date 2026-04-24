import { useEffect, useState, useRef } from "react"
import { supabase } from "../services/supabaseClient"
import { useNavigate, useLocation } from "react-router-dom"

function Messages(){

const [messages,setMessages]=useState([])
const [text,setText]=useState("")
const [user,setUser]=useState(null)
const [role,setRole]=useState(null)

const navigate = useNavigate()
const location = useLocation()
const chatEndRef = useRef(null)

const params = new URLSearchParams(location.search)
const carId = params.get("car")

useEffect(()=>{
init()
},[])

useEffect(()=>{
scrollToBottom()
},[messages])

function scrollToBottom(){
chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
}

//////////////////////////////////////////////////////
// INIT
//////////////////////////////////////////////////////

async function init(){

const { data } = await supabase.auth.getUser()

if(!data.user){
navigate("/login", { state: { from: `/messages?car=${carId}` } })
return
}

setUser(data.user)

// get role
const { data: userData } = await supabase
.from("users")
.select("role")
.eq("id", data.user.id)
.single()

setRole(userData?.role)

loadMessages(data.user)

}

//////////////////////////////////////////////////////
// LOAD MESSAGES
//////////////////////////////////////////////////////

async function loadMessages(){

let query = supabase.from("messages").select("*")

if(carId){
query = query.eq("car_id", carId)
}

const { data } = await query.order("created_at", { ascending: true })

setMessages(data || [])
}

//////////////////////////////////////////////////////
// SEND MESSAGE
//////////////////////////////////////////////////////

async function sendMessage(e){

e.preventDefault()

if(!text.trim()) return

await supabase.from("messages").insert([
{
message: text,
sender_id: user.id,
car_id: carId
}
])

setText("")
loadMessages()

}

//////////////////////////////////////////////////////

return(

<div className="min-h-screen bg-gray-100 flex flex-col">

{/* 🔥 HEADER */}
<div className="bg-white shadow px-6 py-4 flex justify-between items-center">

<h1 className="text-lg font-semibold">
{role === "dealer" ? "📩 Dealer Inbox" : "💬 Chat with Dealer"}
</h1>

{carId && (
<p className="text-sm text-gray-500">
Car ID: {carId}
</p>
)}

</div>

{/* 🔥 CHAT AREA */}
<div className="flex-1 overflow-y-auto p-6 space-y-3">

{messages.map(msg => {

const isMe = msg.sender_id === user?.id

return(
<div
key={msg.id}
className={`flex ${isMe ? "justify-end" : "justify-start"}`}
>

<div
className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow
${isMe
? "bg-blue-600 text-white rounded-br-none"
: "bg-white text-gray-800 rounded-bl-none border"
}`}
>
{msg.message}
</div>

</div>
)
})}

<div ref={chatEndRef}></div>

</div>

{/* 🔥 INPUT BAR */}
<form
onSubmit={sendMessage}
className="bg-white p-4 flex gap-3 border-t"
>

<input
value={text}
onChange={(e)=>setText(e.target.value)}
placeholder="Type your message..."
className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

<button
className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
>
Send
</button>

</form>

</div>

)
}

export default Messages