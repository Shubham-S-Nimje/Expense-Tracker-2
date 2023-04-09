import React, { useState } from 'react'
import CreateaccForm from './CreateaccForm';
import LoginForm from './LoginForm';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/index.js'
import { useSelector } from 'react-redux';

const Body = () => {
    const [signin , SetSignin] = useState(true)
    const [signup , SetSignup] = useState(false)
    const isAuth = useSelector(state => state.auth.isAuthenticated)

    const dispatch = useDispatch()

    const HaveAccountHandler = () =>{
        SetSignin(true)
        SetSignup(false)
    }

    const DontHaveAccountHandler = () =>{
        SetSignin(false)
        SetSignup(true)
    }

    const hidefooterHandler = (event) => {
      event.preventDefault();
  
      dispatch(authActions.logout());
    }

    const showfooterHandler = (event) => {
      event.preventDefault();
  
      dispatch(authActions.login());
    }
  return (
    <div className="min-h-full py-12 min-h-screen">
      {signin && (
        <div>
          <label className="underline m-6 text-center text-3xl font-bold text-gray-900">
            Sign In
          </label>
          <LoginForm />
          <button
            className="bg-red-600 text-white p-2 m-2 rounded-md"
            onClick={DontHaveAccountHandler}
          >
            Dont't have account Login?
          </button>
        </div>
      )}

      {signup && (
        <div>
          <label className="underline m-6 text-center text-3xl font-bold text-gray-900">
            Sign Up
          </label>
          <CreateaccForm />
          <button
            className="bg-red-600 text-white p-2 m-2 rounded-md"
            onClick={HaveAccountHandler}
          >
            Already have account Login?
          </button>
        </div>
      )}
      {!isAuth && <button
      className="bg-red-600 text-white p-2 m-2 rounded-md"
      onClick={showfooterHandler}
      >Show Footer</button>}
      {isAuth && <button
      className="bg-red-600 text-white p-2 m-2 rounded-md"
      onClick={hidefooterHandler}
      >Hide Footer</button>}
    </div>
  );
}

export default Body
