import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Header = () => {
  const [userlogedin, Setuserlogedin] = useState()
  const userlocalId = localStorage.getItem('localId')
  

  const OnClickHandler =()=> {
    localStorage.setItem('localId','')
        localStorage.setItem('idToken','')
        localStorage.setItem('email','')
        Setuserlogedin(false)
  }

  useEffect(()=> {
    {userlocalId && Setuserlogedin(true)}
    {!userlocalId && Setuserlogedin(false)}
  },[OnClickHandler])

  return (
    <div className='flex bg-sky-600 text-white font-bold text-3xl p-2 justify-end'>
            {userlocalId && <button 
            onClick={OnClickHandler}>Logout</button>}
            {!userlocalId && <a href='/'>Login</a>}
    </div>
  )
}

export default Header
