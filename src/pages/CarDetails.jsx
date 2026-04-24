import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../services/supabaseClient"

function CarDetails(){

const { id } = useParams()
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

<div className="p-10 max-w-4xl mx-auto">

<img src={car.image} className="w-full h-80 object-cover rounded"/>

<h1 className="text-3xl font-bold mt-4">
{car.brand} {car.model}
</h1>

<p className="text-gray-500">Year: {car.year}</p>

<p className="text-green-600 text-xl font-bold mt-2">
${car.price}
</p>

<p className="mt-4">
{car.description}
</p>

</div>
)
}

export default CarDetails