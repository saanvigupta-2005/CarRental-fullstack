import React from 'react'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-hot-toast'

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext()
  const [state, setState] = React.useState("login") // "login" or "signup"
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const endpoint = state === "signup" ? "register" : "login"
      const payload = state === "signup" ? { name, email, password } : { email, password }

      const { data } = await axios.post(`/api/user/${endpoint}`, payload)

      if (data.success) {
        navigate('/')
        setToken(data.token)
        localStorage.setItem('token', data.token)
        setShowLogin(false)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div
      onClick={() => setShowLogin(false)}
      className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center 
      justify-center text-sm text-gray-600 bg-black/50'
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-lg shadow-xl text-sm text-gray-500 border 
        border-gray-200 p-8 py-12 w-80 sm:w-[352px]'
      >
        <p className='text-2xl font-medium text-center mb-6'>
          {state === "login" ? (
            <>
              <span className='text-blue-500'>User</span> Login
            </>
          ) : (
            <>
              <span className='text-blue-500'>User</span> Sign Up
            </>
          )}
        </p>

        {state === "signup" && (
          <div className='mt-4'>
            <label className='block'>Name</label>
            <input
              type='text'
              placeholder='Your name'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border border-gray-200 rounded w-full p-2 mt-1 outline-blue-500'
            />
          </div>
        )}

        <div className='mt-4'>
          <label className='block'>Email</label>
          <input
            type='email'
            placeholder='type here'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border border-gray-200 rounded w-full p-2 mt-1 outline-blue-500'
          />
        </div>

        <div className='mt-4'>
          <label className='block'>Password</label>
          <input
            type='password'
            placeholder='type here'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border border-gray-200 rounded w-full p-2 mt-1 outline-blue-500'
          />
        </div>

        <p className='mt-4 text-sm'>
          {state === "login" ? (
            <>
              Create an account?{' '}
              <button
                type='button'
                onClick={() => setState("signup")}
                className='text-blue-500'
              >
                Click here
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type='button'
                onClick={() => setState("login")}
                className='text-blue-500'
              >
                Login
              </button>
            </>
          )}
        </p>

        <button
          type='submit'
          className='w-full py-2 rounded-md mt-4 text-white transition-all bg-blue-500 hover:bg-blue-600'
        >
          {state === "login" ? 'Login' : 'Create Account'}
        </button>
      </form>
    </div>
  )
}

export default Login
