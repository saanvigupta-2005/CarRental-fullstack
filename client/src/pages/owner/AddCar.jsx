import React, { useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import {useAppContext} from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddCar = () => {

  const {axios,currency} = useAppContext()
  
  const [image, setImage] = useState(null)
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 0,
    location: '',
    description: ''
  })

  const [isLoading, setisLoading] = useState(false)

  const onSubmitHandler = async(e) => {
    e.preventDefault()
    if(isLoading) return null 

    setisLoading(true)
    try{
      const formData = new FormData()
      formData.append('image',image)
      formData.append('carData',JSON.stringify(car))

      const {data} = await axios.post('/api/owner/add-car' , formData)
      if(data.success){
        toast.success(data.message)
        setImage(null)
        setCar({
          brand: '',
          model: '',
          year: 0,
          pricePerDay: 0,
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: 0,
          location: '',
          description: ''

        })
      }else{
        toast.error(data.message)
      }

    }catch(error){
      toast.error(error.message)

    }finally{
      setisLoading(false)
    }
  }

  return (
    <div className='px-4 py-10 md:px-10 flex-1'>
      <Title
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking, including pricing, availability and car specifications"
      />

      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'
      >
        <div className='flex items-center gap-2 w-full'>
          <label htmlFor='car-image'>
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=""
              className='h-14 rounded cursor-pointer'
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className='text-sm text-gray-500'>Upload a picture of your car</p>
        </div>
        {/* Car Brand & Model */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Brand</label>
            <input type="text" placeholder='e.g. BMW, Mercedes, Audi...' required
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            value={car.brand} onChange={e=> setCar({...car, brand : e.target.value})}/>
          </div>

          <div className='flex flex-col w-full'>
            <label>Model</label>
            <input type="text" placeholder='e.g. XS, E-Class, M4...' required
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            value={car.model} onChange={e=> setCar({...car, model : e.target.value})}/>
          </div>

        </div>
        {/* car year, price, category */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Year</label>
            <input type="number" placeholder='2025' required
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            value={car.year} onChange={e=> setCar({...car, year: e.target.value})}/>
          </div>

          <div className='flex flex-col w-full'>
            <label>Daily Price ({currency})</label>
            <input type="number" placeholder='100' required
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            value={car.pricePerDay} onChange={e=> setCar({...car, pricePerDay: e.target.value})}/>
          </div>

          <div className='flex flex-col w-full'>
            <label>Category</label>
            <select onChange={e=> setCar({...car, category: e.target.value})} value={car.category} 
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
              <option value="">Select a category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

          {/*car transmission, Fuel Type, Seating Capacity */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Transmission</label>
            <select onChange={e=> setCar({...car, transmission: e.target.value})} value={car.transmission} 
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
              <option value="">Select a transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>

          <div className='flex flex-col w-full'>
            <label>Fuel Type</label>
            <select onChange={e=> setCar({...car, fuel_type: e.target.value})} value={car.fuel_type} 
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
              <option value="">Select a fuel type</option>
              <option value="Gas">Gas</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className='flex flex-col w-full'>
            <label>Seating Capacity</label>
            <input type="number" placeholder='4' required
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            value={car.seating_capacity} onChange={e=> setCar({...car, seating_capacity: e.target.value})}/>
          </div>
        </div>
          {/*Car Location*/}
        <div className='flex flex-col w-full'>
          <label>Location</label>
          <select
            onChange={e => setCar({ ...car, location: e.target.value })}
            value={car.location}
            className='px-3 py-2 mt-1 border border-borderColor 
            rounded-md outline-none'>
            <option value="">Select a state / UT</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
            <option value="Delhi">Delhi</option>
            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
            <option value="Ladakh">Ladakh</option>
            <option value="Lakshadweep">Lakshadweep</option>
            <option value="Puducherry">Puducherry</option>
          </select>
        </div>


          {/*Car */}
        <div className='flex flex-col w-full'>
            <label>Description</label>
            <textarea rows={5} placeholder='e.g. A luxurious SUV with a spacious interior and a powerful engine.' required
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            value={car.description} onChange={e=> setCar({...car, description: e.target.value})}></textarea>
          </div>
        <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-blue-500 
        text-white rounded-md font-medium w-max cursor-pointer'>
          <img src={assets.tick_icon} alt=""/>
          {isLoading ? 'Listing...' : 'List Your Car'}
        </button>
        
      </form>
    </div>
  )
}

export default AddCar
