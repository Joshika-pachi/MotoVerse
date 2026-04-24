import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"
import { useNavigate } from "react-router-dom"
import Slider from "rc-slider"

function BrowseCars(){

const [cars,setCars] = useState([])
const [filtered,setFiltered] = useState([])

const [search,setSearch] = useState("")
const [price,setPrice] = useState(100000)

const navigate = useNavigate()

useEffect(()=>{
loadCars()
},[])

useEffect(()=>{
applyFilters()
},[search,price,cars])

// LOAD
async function loadCars(){

const { data } = await supabase.from("cars").select("*")

setCars(data || [])
setFiltered(data || [])
}

// FILTER
function applyFilters(){

let result = [...cars]

// search
if(search){
result = result.filter(car =>
car.brand.toLowerCase().includes(search.toLowerCase()) ||
car.model.toLowerCase().includes(search.toLowerCase())
)
}

// price slider
result = result.filter(car => car.price <= price)

setFiltered(result)
}

return(

<div className="p-10 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">

{/* 🔥 FILTER CARD */}
<div className="bg-white/70 backdrop-blur-lg p-6 rounded-3xl shadow-xl mb-10">

<h2 className="text-xl font-semibold mb-4">
🔍 Filter Cars
</h2>

<div className="flex flex-col gap-5">

{/* SEARCH */}
<input
type="text"
placeholder="Search brand or model..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="border p-3 rounded-xl"
/>

{/* PRICE SLIDER */}
<div>
<p className="text-sm text-gray-600 mb-2">
Max Price: <span className="font-semibold text-indigo-600">${price}</span>
</p>

<Slider
min={0}
max={100000}
value={price}
onChange={(val)=>setPrice(val)}
trackStyle={{ backgroundColor: "#4f46e5", height: 6 }}
handleStyle={{
borderColor: "#4f46e5",
height: 20,
width: 20
}}
railStyle={{ backgroundColor: "#ddd", height: 6 }}
/>

</div>

{/* RESET */}
<button
onClick={()=>{
setSearch("")
setPrice(100000)
}}
className="bg-gray-200 py-2 rounded-xl hover:bg-gray-300 transition"
>
Reset Filters
</button>

</div>

</div>

{/* 🔥 CAR GRID */}
<div className="grid md:grid-cols-3 gap-8">

{filtered.map(car=>(
<div
key={car.id}
className="bg-white rounded-2xl shadow hover:shadow-2xl hover:-translate-y-1 transition duration-300"
>

<img
src={car.image}
className="w-full h-48 object-cover rounded-t-2xl"
/>

<div className="p-5">

<h2 className="font-semibold text-lg">
{car.brand} {car.model}
</h2>

<p className="text-green-600 font-bold text-lg">
${car.price}
</p>

<button
onClick={()=>navigate(`/car/${car.id}`)}
className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
>
View Details
</button>

</div>

</div>
))}

</div>

{/* EMPTY */}
{filtered.length === 0 && (
<p className="text-center mt-10 text-gray-500">
No cars found 😢
</p>
)}

</div>
)
}

export default BrowseCars