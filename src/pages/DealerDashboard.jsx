import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"

function DealerDashboard(){

const [cars,setCars] = useState([])

// add form
const [brand,setBrand] = useState("")
const [model,setModel] = useState("")
const [year,setYear] = useState("")
const [price,setPrice] = useState("")
const [image,setImage] = useState("")
const [description,setDescription] = useState("")

// edit state
const [editingCar,setEditingCar] = useState(null)

useEffect(()=>{
loadCars()
},[])

//////////////////////////////////////////////////////
// LOAD
//////////////////////////////////////////////////////

async function loadCars(){
const { data } = await supabase.from("cars").select("*")
setCars(data || [])
}



//////////////////////////////////////////////////////
// ADD
//////////////////////////////////////////////////////

async function handleAddCar(e){

e.preventDefault()

const { data, error } = await supabase
.from("cars")
.insert([{ brand, model, year, price, image, description }])
.select()

if(error){
alert(error.message)
}else{
setCars(prev => [...prev, data[0]])

setBrand("")
setModel("")
setYear("")
setPrice("")
setImage("")
setDescription("")
}
}

//////////////////////////////////////////////////////
// DELETE
//////////////////////////////////////////////////////

async function deleteCar(id){

const { error } = await supabase
.from("cars")
.delete()
.eq("id", id)

if(!error){
setCars(prev => prev.filter(car => car.id !== id))
}
}

//////////////////////////////////////////////////////
// UPDATE
//////////////////////////////////////////////////////

async function updateCar(){

const { error } = await supabase
.from("cars")
.update({
brand: editingCar.brand,
model: editingCar.model,
price: editingCar.price,
year: editingCar.year,
image: editingCar.image,
description: editingCar.description
})
.eq("id", editingCar.id)

if(error){
alert(error.message)
}else{
setEditingCar(null)
loadCars()
}
}

//////////////////////////////////////////////////////

return(

<div className="min-h-screen bg-[#0D0D0D] p-10">

{/* HEADER */}
<div className="mb-10">
<h1 className="text-3xl font-bold text-[#FFD700]">Dealer Panel</h1>
<p className="text-[#A0A0A0]">Manage your listings</p>
</div>

{/* ADD FORM */}
<div className="bg-[#1A1A1A] p-6 rounded-xl shadow-lg mb-10 border border-[#2A2A2A]">

<h2 className="text-lg font-semibold mb-4 text-[#FFD700]">Add Car</h2>

<form onSubmit={handleAddCar} className="grid grid-cols-2 gap-4">

<input placeholder="Brand" value={brand} onChange={e=>setBrand(e.target.value)} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] placeholder-[#A0A0A0] focus:outline-none focus:border-[#FFD700]"/>
<input placeholder="Model" value={model} onChange={e=>setModel(e.target.value)} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] placeholder-[#A0A0A0] focus:outline-none focus:border-[#FFD700]"/>
<input placeholder="Year" value={year} onChange={e=>setYear(e.target.value)} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] placeholder-[#A0A0A0] focus:outline-none focus:border-[#FFD700]"/>
<input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] placeholder-[#A0A0A0] focus:outline-none focus:border-[#FFD700]"/>

<input placeholder="Image URL" value={image} onChange={e=>setImage(e.target.value)} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] placeholder-[#A0A0A0] focus:outline-none focus:border-[#FFD700] col-span-2"/>

<textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] placeholder-[#A0A0A0] focus:outline-none focus:border-[#FFD700] col-span-2"/>

<button className="bg-[#FFD700] text-[#0D0D0D] py-2 rounded col-span-2 hover:bg-[#FFD700] hover:shadow-lg hover:shadow-[rgba(255,215,0,0.3)] transition font-semibold">Add Car</button>

</form>
</div>

{/* EDIT PANEL */}
{editingCar && (
<div className="bg-[#1A1A1A] border border-[#FFD700] p-6 rounded-xl shadow-lg mb-10">

<h2 className="font-semibold mb-3 text-[#FFD700]">Edit Car</h2>

<div className="grid grid-cols-2 gap-4">

<input value={editingCar.brand} onChange={e=>setEditingCar({...editingCar, brand:e.target.value})} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] focus:outline-none focus:border-[#FFD700]"/>
<input value={editingCar.model} onChange={e=>setEditingCar({...editingCar, model:e.target.value})} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] focus:outline-none focus:border-[#FFD700]"/>

<input value={editingCar.year} onChange={e=>setEditingCar({...editingCar, year:e.target.value})} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] focus:outline-none focus:border-[#FFD700]"/>
<input value={editingCar.price} onChange={e=>setEditingCar({...editingCar, price:e.target.value})} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] focus:outline-none focus:border-[#FFD700]"/>

<input value={editingCar.image} onChange={e=>setEditingCar({...editingCar, image:e.target.value})} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] focus:outline-none focus:border-[#FFD700] col-span-2"/>

<textarea value={editingCar.description} onChange={e=>setEditingCar({...editingCar, description:e.target.value})} className="bg-[#1F1F1F] border border-[#2A2A2A] p-2 rounded text-[#FFFFFF] focus:outline-none focus:border-[#FFD700] col-span-2"/>

<button onClick={updateCar} className="bg-[#FFD700] text-[#0D0D0D] py-2 rounded col-span-2 hover:bg-[#FFD700] hover:shadow-lg hover:shadow-[rgba(255,215,0,0.3)] transition font-semibold">Update Car</button>

</div>
</div>
)}



{/* LISTINGS */}
<h2 className="text-xl font-semibold mb-4 text-[#FFFFFF]">My Listings</h2>

<div className="grid md:grid-cols-3 gap-6">

{cars.map(car=>(
<div key={car.id} className="bg-[#1A1A1A] rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[rgba(255,215,0,0.2)] overflow-hidden border border-[#2A2A2A]">

<img src={car.image} className="w-full h-40 object-cover"/>

<div className="p-4">

<p className="font-semibold text-lg text-[#FFFFFF]">{car.brand} {car.model}</p>

<p className="text-[#FFD700] font-bold">${car.price}</p>

<div className="flex gap-2 mt-3">

<button
onClick={()=>setEditingCar(car)}
className="bg-[#FFD700] text-[#0D0D0D] px-3 py-1 rounded hover:bg-[#FFD700] hover:shadow-lg hover:shadow-[rgba(255,215,0,0.3)] transition font-semibold"
>
Edit
</button>

<button
onClick={()=>deleteCar(car.id)}
className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
>
Delete
</button>

</div>

</div>
</div>
))}

</div>

</div>
)
}

export default DealerDashboard