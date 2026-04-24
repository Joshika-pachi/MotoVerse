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

<div className="min-h-screen bg-gray-100 p-10">

{/* HEADER */}
<div className="mb-10">
<h1 className="text-3xl font-bold">Dealer Panel</h1>
<p className="text-gray-500">Manage your listings</p>
</div>

{/* ADD FORM */}
<div className="bg-white p-6 rounded-xl shadow mb-10">

<h2 className="text-lg font-semibold mb-4">Add Car</h2>

<form onSubmit={handleAddCar} className="grid grid-cols-2 gap-4">

<input placeholder="Brand" value={brand} onChange={e=>setBrand(e.target.value)} className="border p-2 rounded"/>
<input placeholder="Model" value={model} onChange={e=>setModel(e.target.value)} className="border p-2 rounded"/>
<input placeholder="Year" value={year} onChange={e=>setYear(e.target.value)} className="border p-2 rounded"/>
<input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} className="border p-2 rounded"/>

<input placeholder="Image URL" value={image} onChange={e=>setImage(e.target.value)} className="border p-2 rounded col-span-2"/>

<textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} className="border p-2 rounded col-span-2"/>

<button className="bg-green-600 text-white py-2 rounded col-span-2 hover:bg-green-700">
Add Car
</button>

</form>
</div>

{/* EDIT PANEL */}
{editingCar && (
<div className="bg-yellow-50 border p-6 rounded-xl shadow mb-10">

<h2 className="font-semibold mb-3">Edit Car</h2>

<div className="grid grid-cols-2 gap-4">

<input value={editingCar.brand} onChange={e=>setEditingCar({...editingCar, brand:e.target.value})} className="border p-2"/>
<input value={editingCar.model} onChange={e=>setEditingCar({...editingCar, model:e.target.value})} className="border p-2"/>

<input value={editingCar.year} onChange={e=>setEditingCar({...editingCar, year:e.target.value})} className="border p-2"/>
<input value={editingCar.price} onChange={e=>setEditingCar({...editingCar, price:e.target.value})} className="border p-2"/>

<input value={editingCar.image} onChange={e=>setEditingCar({...editingCar, image:e.target.value})} className="border p-2 col-span-2"/>

<textarea value={editingCar.description} onChange={e=>setEditingCar({...editingCar, description:e.target.value})} className="border p-2 col-span-2"/>

<button onClick={updateCar} className="bg-blue-600 text-white py-2 rounded col-span-2">
Update Car
</button>

</div>
</div>
)}

{/* LISTINGS */}
<h2 className="text-xl font-semibold mb-4">My Listings</h2>

<div className="grid md:grid-cols-3 gap-6">

{cars.map(car=>(
<div key={car.id} className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">

<img src={car.image} className="w-full h-40 object-cover"/>

<div className="p-4">

<p className="font-semibold text-lg">{car.brand} {car.model}</p>
<p className="text-green-600 font-bold">${car.price}</p>

<div className="flex gap-2 mt-3">

<button
onClick={()=>setEditingCar(car)}
className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
>
Edit
</button>

<button
onClick={()=>deleteCar(car.id)}
className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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