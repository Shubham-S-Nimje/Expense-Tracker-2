import React, { useContext } from 'react'
import ContextData from '../store/Contextdata'
import { useSelector } from 'react-redux';
import { authActions } from '../../store/index.js';
import { useDispatch } from 'react-redux';

const Header = () => {
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()

  const OnClickHandler =()=> {
    localStorage.setItem('localId','')
        localStorage.setItem('idToken','')
        localStorage.setItem('email','')
        dispatch(authActions.logout());
  }

  // useEffect(()=> {
  //   {userlogedin && Setuserlogedin(userlogedin)}
  //   {!userlogedin && Setuserlogedin('')}
  // },[OnClickHandler])

  return (
    <div className='flex bg-sky-600 text-white font-bold text-3xl p-2 justify-between'>
      <a href='/home'>Expense Tracker</a>
            {isAuth && <button 
            onClick={OnClickHandler}><a href='/'>Logout</a></button>}
            {!isAuth && <a href='/'>Login</a>}
    </div>
  )
}

export default Header
