import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import {motion} from 'motion/react'

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState('')
  const { pickupDate, setPickupDate, returnDate, setReturnDate } = useAppContext()
  const navigate = useNavigate() 

  const handleSearch = (e) => {
    e.preventDefault()

    if (!pickupLocation) {
      toast.error('Please select pickup location')
      return
    }

    if (!pickupDate || !returnDate) {
      toast.error('Please select pickup & return dates')
      return
    }

    if (new Date(returnDate) < new Date(pickupDate)) {
      toast.error('Return date cannot be before pickup date')
      return
    }
    toast.success(`Showing cars in ${pickupLocation}`)
    navigate('/cars?pickupLocation='+ pickupLocation.trim().toLowerCase() +'&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
  }

  return (
    <motion.div 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{duration: 0.8}}
    
    className='w-full'>
      <div className='bg-gray-100'>
        <div className='h-screen flex flex-col items-center justify-center gap-14 text-center'>

          <motion.h1 initial={{y: 50, opacity: 0}} 
              animate={{y: 0, opacity: 1}}
              transition={{duration: 0.8, delay:0.2 }}
          className='text-4xl md:text-5xl font-semibold'>
            Luxury Car on Rent
          </motion.h1>

          <motion.form
            initial={{scale: 0.95,y: 50, opacity: 0}} 
            animate={{scale:1,y: 0, opacity: 1}}
            transition={{duration: 0.6, delay: 0.4 }}
            onSubmit={handleSearch}
            className='flex flex-col md:flex-row items-start md:items-center
            justify-between p-6 rounded-lg md:rounded-full w-full max-w-md md:max-w-4xl
            bg-white shadow-lg'
          >
            <div className='flex flex-col md:flex-row items-start md:items-center gap-10 md:ml-8 w-full'>

              <div className='flex flex-col items-start gap-2'>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className='outline-none bg-transparent'>
                  <option value="">Pickup Location</option>
                  {cityList.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <p className='text-sm text-gray-500'>
                  {pickupLocation || 'Please select location'}
                </p>
              </div>

              <div className='flex flex-col items-start gap-2'>
                <label>Pickup Date</label>
                <input
                  type='date'
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className='outline-none text-sm text-gray-500'
                />
              </div>

              <div className='flex flex-col items-start gap-2'>
                <label>Return Date</label>
                <input
                  type='date'
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className='outline-none text-sm text-gray-500'
                />
              </div>
            </div>

            <motion.button
              whileHover={{scale:1.05}}
              whileTap={{scale:0.95}}
              type='submit'
              className='flex items-center gap-1 px-9 py-3 max-mt-4 bg-blue-600
              hover:bg-blue-700 text-white rounded-full cursor-pointer'>
              <img src={assets.search_icon} className='brightness-200' />
              Search
            </motion.button>
          </motion.form>

          <motion.img
            initial={{y: 100, opacity: 0}} 
            animate={{y: 0, opacity: 1}}
            transition={{duration: 0.8, delay: 0.6 }}
            src={assets.main_car}
            alt='car'
            className='w-full max-w-2xl md:max-w-3xl'
          />
        </div>
      </div>
    </motion.div>
  )
}

export default Hero
