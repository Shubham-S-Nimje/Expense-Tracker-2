import React, { useState } from 'react'
import CreateaccForm from './CreateaccForm';
import LoginForm from './LoginForm copy';

const Body = () => {
    const [signin , SetSignin] = useState(true)
    const [signup , SetSignup] = useState(false)

    const HaveAccountHandler = () =>{
        SetSignin(true)
        SetSignup(false)
    }

    const DontHaveAccountHandler = () =>{
        SetSignin(false)
        SetSignup(true)
    }
  return (
    <div className='min-h-full py-12'>
        {signin &&
        <div>
            <label className='underline m-6 text-center text-3xl font-bold text-gray-900'>Sign In</label>
      <LoginForm/>
      <button className='bg-red-600 text-white p-2 m-2 rounded-md' onClick={DontHaveAccountHandler}>Dont't have account Login?</button>
      </div>
        }

        {signup &&
        <div>
            <label className='underline m-6 text-center text-3xl font-bold text-gray-900'>Sign Up</label>
      <CreateaccForm/>
      <button className='bg-red-600 text-white p-2 m-2 rounded-md' onClick={HaveAccountHandler}>Already have account Login?</button>
      </div>
        }
    </div>
  );
}

export default Body
