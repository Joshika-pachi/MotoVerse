import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"

function DealerDashboard(){

const [cars,setCars] = useState([])

const [brand,setBrand] = useState("")
const [model,setModel] = useState("")
const [year,setYear] = useState("")
const [price,setPrice] = useState("")
const [image,setImage] = useState("")
const [description,setDescription] = useState("")

useEffect(()=>{
loadCars()
},[])

//////////////////////////////////////////////////////
// LOAD CARS
//////////////////////////////////////////////////////

async function loadCars(){

const { data } = await supabase
.from("cars")
.select("*")

setCars(data || [])
}

//////////////////////////////////////////////////////
// ADD CAR
//////////////////////////////////////////////////////

async function handleAddCar(e){

e.preventDefault()

const { data, error } = await supabase
.from("cars")
.insert([
{ brand, model, year, price, image, description }
])
.select()

if(error){
alert(error.message)
}else{

// add instantly to UI
setCars(prev => [...prev, data[0]])

// clear form
setBrand("")
setModel("")
setYear("")
setPrice("")
setImage("")
setDescription("")

alert("Car added successfully")
}

}

//////////////////////////////////////////////////////
// DELETE CAR
//////////////////////////////////////////////////////

async function deleteCar(id){

const { error } = await supabase
.from("cars")
.delete()
.eq("id", id)

if(error){
alert(error.message)
}else{

// instant UI update
setCars(prev => prev.filter(car => car.id !== id))

}
}

//////////////////////////////////////////////////////

return(

<div className="min-h-screen bg-gray-100 p-10">

{/* HEADER (NO MESSAGES BUTTON HERE) */}
<div className="mb-10">
<h1 className="text-3xl font-bold">
Dealer Panel
</h1>
<p className="text-gray-500 text-sm">
Manage your car listings easily
</p>
</div>

{/* ADD CAR FORM */}
<div className="bg-white p-6 rounded-xl shadow mb-10">

<h2 className="text-xl font-semibold mb-4">
Add New Car
</h2>

<form onSubmit={handleAddCar} className="grid grid-cols-2 gap-4">

<input
placeholder="Brand"
value={brand}
onChange={(e)=>setBrand(e.target.value)}
className="border p-2 rounded"
/>

<input
placeholder="Model"
value={model}
onChange={(e)=>setModel(e.target.value)}
className="border p-2 rounded"
/>

<input
placeholder="Year"
value={year}
onChange={(e)=>setYear(e.target.value)}
className="border p-2 rounded"
/>

<input
placeholder="Price"
value={price}
onChange={(e)=>setPrice(e.target.value)}
className="border p-2 rounded"
/>

<input
placeholder="Image URL"
value={image}
onChange={(e)=>setImage(e.target.value)}
className="border p-2 rounded col-span-2"
/>

<textarea
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
className="border p-2 rounded col-span-2"
/>

<button className="bg-green-600 text-white py-2 rounded col-span-2 hover:bg-green-700 transition">
Add Car
</button>

</form>

</div>

{/* MY CARS */}
<h2 className="text-xl font-semibold mb-4">
My Listings
</h2>

<div className="grid md:grid-cols-3 gap-6">

{cars.map(car=>(
<div key={car.id} className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition">

<img
src={car.image}
className="w-full h-40 object-cover"
/>

<div className="p-4">

<p className="font-semibold text-lg">
{car.brand} {car.model}
</p>

<p className="text-green-600 font-bold">
${car.price}
</p>

<button
onClick={()=>deleteCar(car.id)}
className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
>
Delete
</button>

</div>

</div>
))}

</div>

</div>
)
}

export default DealerDashboard