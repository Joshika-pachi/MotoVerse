import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"

function CarDetails(){

const { id } = useParams()
const navigate = useNavigate()
const [car,setCar] = useState(null)

useEffect(()=>{
loadCar()
},[])

async function loadCar(){

const { data } = await supabase
.from("cars")
.select("*")
.eq("id", id)
.single()

setCar(data)
}

if(!car){
return <p className="p-10">Loading...</p>
}

return(

<div className="min-h-screen bg-gray-100 p-10">

<div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

{/* 🔥 TOP SECTION */}
<div className="grid md:grid-cols-2 gap-8 p-8">

{/* IMAGE */}
<div className="relative">
<img
src={car.image}
className="w-full h-80 object-cover rounded-xl"
/>

{/* PRICE BADGE */}
<div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-1 rounded-lg shadow">
${car.price}
</div>
</div>

{/* DETAILS */}
<div>

<h1 className="text-4xl font-bold mb-3">
{car.brand} {car.model}
</h1>

<p className="text-gray-500 mb-4">
Year: {car.year}
</p>

<p className="text-gray-600 leading-relaxed mb-6">
{car.description}
</p>

{/* BUTTONS */}
<div className="flex gap-4">

<button
onClick={()=>navigate(`/messages?car=${car.id}`)}
className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
>
💬 Contact Dealer
</button>

<button
className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300 transition"
>
❤️ Save
</button>

</div>

</div>

</div>

{/* 🔥 EXTRA INFO SECTION */}
<div className="border-t p-8 grid md:grid-cols-3 gap-6">

<div className="bg-gray-50 p-4 rounded-xl">
<p className="text-sm text-gray-500">Fuel Type</p>
<p className="font-semibold">Petrol</p>
</div>

<div className="bg-gray-50 p-4 rounded-xl">
<p className="text-sm text-gray-500">Transmission</p>
<p className="font-semibold">Automatic</p>
</div>

<div className="bg-gray-50 p-4 rounded-xl">
<p className="text-sm text-gray-500">Condition</p>
<p className="font-semibold">New</p>
</div>

</div>

</div>

</div>
)
}

export default CarDetails