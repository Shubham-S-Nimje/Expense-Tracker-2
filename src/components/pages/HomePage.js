import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='min-h-screen'>
      <h1>Welcome to Expense Tracker!..</h1>
      <div className='flex justify-center text-end px-2 bg-pink-100'>
      <h2>Your profile is incomplete</h2>
      <Link to='/profile'>
      <span className='text-sky-600 p-2 m-2 rounded-md'>Complete Now</span>
      </Link>
      </div>
    </div>
  )
}

export default HomePage
