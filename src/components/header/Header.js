import React, { useContext } from 'react'
import ContextData from '../store/Contextdata'

const Header = () => {
  const {userlogedin, Setuserlogedin} = useContext(ContextData)

  const OnClickHandler =()=> {
    localStorage.setItem('localId','')
        localStorage.setItem('idToken','')
        localStorage.setItem('email','')
        Setuserlogedin(false)
  }

  // useEffect(()=> {
  //   {userlogedin && Setuserlogedin(userlogedin)}
  //   {!userlogedin && Setuserlogedin('')}
  // },[OnClickHandler])

  return (
    <div className='flex bg-sky-600 text-white font-bold text-3xl p-2 justify-end'>
            {userlogedin && <button 
            onClick={OnClickHandler}><a href='/'>Logout</a></button>}
            {!userlogedin && <a href='/'>Login</a>}
    </div>
  )
}

export default Header
