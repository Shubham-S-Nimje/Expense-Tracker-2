import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../body/LoginForm copy'
import ExpencesForm from './ExpencesForm'
import ContextData from '../store/Contextdata'

const HomePage = () => {
  const {userlocalId} = useContext(ContextData)

  return (
    <>
    {userlocalId && <div className='min-h-screen'>
      <h1>Welcome to Expense Tracker!..</h1>
      <div className='flex justify-center text-end px-2 bg-pink-100'>
      <h2>Your profile is incomplete</h2>
      <Link to='/profile'>
      <span className='text-sky-600 p-2 m-2 rounded-md'>Complete Now</span>
      </Link>
      </div>
      <div>
        <ExpencesForm/>
      </div>
    </div>}
    {!userlocalId && <LoginForm/>}
    </>
  )
}

export default HomePage
