import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { assets, dummyCarData } from '../assets/assets';
import Loader from '../components/Loader';
import {useAppContext} from '../context/AppContext'
import toast from 'react-hot-toast';
import {motion} from 'motion/react'

const CarDetails = () => {
  const { id } = useParams();
  const {cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate,} = useAppContext()

  const navigate = useNavigate();
  const [car, setcar] = useState(null);
  const currency = import.meta.env.VITE_CURRENCY;

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const {data} = await axios.post('/api/bookings/create',{
        car: id,
        pickupDate,
        returnDate
      })
      if(data.success){
        toast.success(data.message)
        navigate('/my-bookings')
      }else{
        toast.error(data.message)}
    }catch(error){
      toast.error(error.message)

    }

  }

  useEffect(() => {
    setcar(cars.find(car => car._id === id));
  }, [cars,id]);

  return car ? (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
      <button
        onClick={() => navigate(-1)}
        className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'
      >
        <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-65' />
        Back to all cars
      </button>

      
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
        {/* LEFT CONTENT */}
        <motion.div 
        initial={{y: 30, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.6}}
        className='lg:col-span-2'>
          <motion.img
            initial={{scale: 0.98 ,opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            transition={{duration: 0.5}}
            src={car.image}
            alt=""
            className='w-full h-auto md:max-h-[400px] object-cover rounded-xl mb-6 shadow-md'
          />

          <motion.div className='space-y-2 mb-6'
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.5, delay:0.2}}>
            <h1 className='text-3xl font-bold'>
              {car.brand} {car.model}
            </h1>
            <p className='text-gray-500 text-lg'>
              {car.category} · {car.year}
            </p>
          </motion.div>

          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8'>
            {[
              { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
              { icon: assets.fuel_icon, text: car.fuel_type },
              { icon: assets.car_icon, text: car.transmission },
              { icon: assets.location_icon, text: car.location },
            ].map(({ icon, text }, index) => (
              <motion.div
                initial={{y: 10, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.4}}
                key={index}
                className='flex flex-col items-center bg-blue-50 p-4 rounded-lg 
                shadow-sm hover:bg-blue-100 transition'
              >
                <img src={icon} alt="" className='h-5 mb-2' />
                <span>{text}</span>
              </motion.div>
            ))}
          </div>

          {/* Description */}
          <div className='mb-8'>
            <h1 className='text-xl font-medium mb-3'>Description</h1>
            <p className='text-gray-500'>{car.description}</p>
          </div>

          {/* Features */}
          <div>
            <h1 className='text-xl font-medium mb-3'>Features</h1>
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
              {[
                '360 Camera',
                'Bluetooth',
                'GPS',
                'Rear View Mirror',
                'Heated Seats',
              ].map(item => (
                <li key={item} className='flex items-center text-gray-500'>
                  <img src={assets.check_icon} alt="" className='h-4 mr-2' />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* RIGHT SIDE (empty form for now) */}
        <motion.form 
        initial={{y: 30, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.6,delay:0.3}}
        onSubmit={handleSubmit} className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'>
          <p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>
            {currency}{car.pricePerDay}<span className='text-base text-gray-400 font-normal'>per day</span></p>

          <hr className='border-borderColor my-6' />
          <div>
            <label htmlFor="pickup-date">Pickup Date</label>
            <input value={pickupDate} onChange={(e)=>setPickupDate(e.target.value)}
            type="date" className='border border-borderColor px-3 py-2 rounded-lg
              w-full mt-2 outline-none focus:border-blue-600 transition-all' required id="pickup-date" 
              min={new Date().toISOString().split('T')[0]} />
          </div>

          <div>
            <label htmlFor="return-date">Return Date</label>
            <input value={returnDate} onChange={(e)=>setReturnDate(e.target.value)}
            type="date" className='border border-borderColor px-3 py-2 rounded-lg
              w-full mt-2 outline-none focus:border-blue-600 transition-all' required id="return-date" 
              min={new Date().toISOString().split('T')[0]} />
          </div>

          <button className='w-full bg-blue-600 hover:bg-primary-dull transition-all py-3 
          font-medium text-white rounded-xl cursor-pointer'>Book Now</button>

          <p className='text-center text-sm'>No credit card required to reserve</p>

        </motion.form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CarDetails;
