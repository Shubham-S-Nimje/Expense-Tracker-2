import React from 'react'
import { useSelector } from 'react-redux';
import { authActions } from '../../store/index.js';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()

  const OnClickHandler =()=> {
    localStorage.setItem('localId','')
        localStorage.setItem('idToken','')
        localStorage.setItem('email','')
        localStorage.setItem('photoUrl','')
        window.location.reload();
        dispatch(authActions.logout());
  }

  // useEffect(()=> {
  //   {userlogedin && Setuserlogedin(userlogedin)}
  //   {!userlogedin && Setuserlogedin('')}
  // },[OnClickHandler])

  return (
    <div className='flex bg-sky-600 text-white font-bold sm:text-sm lg:text-3xl p-2 justify-between'>
      <a href='/Expense-Tracker-2'>Expense Tracker</a>
            {isAuth && <button 
            onClick={OnClickHandler}>Logout</button>}
            {/* {!isAuth && <a to='/Expense-Tracker-2'>Login</a>} */}
    </div>
  )
}

export default Header
