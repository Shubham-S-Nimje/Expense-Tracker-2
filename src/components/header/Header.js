import React from 'react'
import LoginForm from '../body/LoginForm copy'

const Header = () => {
  const userlocalId = localStorage.getItem('localId')

  const OnClickHandler =()=> {
    localStorage.setItem('localId','')
        localStorage.setItem('idToken','')
        localStorage.setItem('email','')
  }

  return (
    <div className='flex bg-sky-600 text-white font-bold text-3xl p-2 justify-end'>
            {userlocalId && <button 
            onClick={OnClickHandler}>Logout</button>}
            {!userlocalId && <LoginForm/>}
    </div>
  )
}

export default Header
