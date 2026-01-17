import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import {motion} from 'motion/react'

const Cars = () => {
  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const appContext = useAppContext() || {}
  const cars = appContext.cars || []
  const axios = appContext.axios

  const [input, setInput] = useState('')
  const [filteredCars, setFilteredCars] = useState([])

  const isSearchData = pickupLocation && pickupDate && returnDate

  // fetch available cars from backend
  const searchCarAvailability = async () => {
    if (!axios) return

    try {
      const { data } = await axios.post('/api/bookings/check-availability', {
        location: pickupLocation,
        pickupDate,
        returnDate
      })

      if (data?.success) {
        setFilteredCars(data.availableCars || [])

        if (!data.availableCars || data.availableCars.length === 0) {
          toast('No cars available')
        }
      }
    } catch (error) {
      toast.error('Failed to fetch cars')
    }
  }

  // filter function including location
  const applyFilter = () => {
    const source = isSearchData ? filteredCars : cars

    if (!input.trim()) {
      setFilteredCars(source)
      return
    }

    const filtered = source.filter((car) =>
      car.brand.toLowerCase().includes(input.toLowerCase()) ||
      car.model.toLowerCase().includes(input.toLowerCase()) ||
      car.category.toLowerCase().includes(input.toLowerCase()) ||
      car.transmission.toLowerCase().includes(input.toLowerCase()) ||
      (car.location && car.location.toLowerCase().includes(input.toLowerCase())) ||
      car.seating_capacity.toString().includes(input) ||
      car.fuel_type.toLowerCase().includes(input.toLowerCase())
    )

    setFilteredCars(filtered)
  }

  // initial load
  useEffect(() => {
    if (isSearchData && axios) {
      searchCarAvailability()
    } else {
      setFilteredCars(cars)
    }
  }, [cars, pickupLocation, pickupDate, returnDate, axios])

  // apply filter whenever search input changes
  useEffect(() => {
    applyFilter()
  }, [input])

  return (
    <div>
      {/* HEADER */}
      <motion.div 
      initial={{y: 30, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{duration: 0.6, ease: 'easeOut'}}
      className='flex flex-col items-center py-20 bg-blue-50 max-md:px-4'>
        <Title
          title='Available Cars'
          subtitle='Browse our selection of premium vehicles available for your next adventure'
        />

        {/* SEARCH BAR */}
        <motion.div 
        initial={{y: 20, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.3, delay:0.5}}
        className='flex items-center bg-white px-4 mt-6 w-full max-w-md h-12 rounded-full shadow border'>
          <img src={assets.search_icon} alt="" className='w-4 h-4 mr-2' />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type='text'
            placeholder='Search by brand, model, category or location'
            className='w-full h-full outline-none text-gray-600 bg-transparent'
          />
        </motion.div>
      </motion.div>

      {/* CARS */}
      <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5, delay:0.6}} 
      className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>
          Showing {filteredCars.length} cars
        </p>

        <motion.div 
        initial={{y: 20, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.4 }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {Array.isArray(filteredCars) && filteredCars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </motion.div>

      </motion.div>
    </div>
  )
}

export default Cars
