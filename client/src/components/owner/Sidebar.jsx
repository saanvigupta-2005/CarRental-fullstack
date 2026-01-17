import React, { useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-hot-toast'

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext()
  const location = useLocation()
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const updateImage = async () => {
    if (!image) return toast.error("Please select an image first")

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('image', image)

      const { data } = await axios.post('/api/owner/update-image', formData)

      if (data.success) {
        fetchUser()
        toast.success(data.message) // <-- This will now work
        setImage(null)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-60 w-full border-r border-borderColor text-sm">

      {/* Profile Image */}
      <div className="group relative">
        <label htmlFor="image">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://images.unsplash.com/photo-1603415526960-f7e0328d5b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
            }
            alt="Profile"
            className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto"
          />

          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="absolute hidden inset-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="Edit" />
          </div>
        </label>
      </div>

      {/* Save Button */}
      {image && (
        <button
          onClick={updateImage}
          disabled={loading}
          className="absolute top-0 right-0 flex items-center p-2 gap-1 bg-blue-500/10 text-blue-500 cursor-pointer rounded"
        >
          Save
          <img src={assets.check_icon} width={13} alt="" />
        </button>
      )}

      <p className="mt-2 text-base max-md:hidden">{user?.name}</p>

      {/* Menu */}
      <div className="w-full">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
              link.path === location.pathname
                ? 'bg-blue-500/10 text-primary'
                : 'text-gray-600'
            }`}
          >
            <img src={link.path === location.pathname ? link.coloredIcon : link.icon} alt="" />
            <span className="max-md:hidden">{link.name}</span>
            {link.path === location.pathname && (
              <div className="bg-blue-500 w-1.5 h-8 rounded-l absolute right-0"></div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
