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
    <div>
        {signin &&
        <div>
            <label>Sign in</label>
      <LoginForm/>
      <button onClick={DontHaveAccountHandler}>Dont't have account Login?</button>
      </div>
        }

        {signup &&
        <div>
            <label>Sign up</label>
      <CreateaccForm/>
      <button onClick={HaveAccountHandler}>Already have account Login?</button>
      </div>
        }
    </div>
  );
}

export default Body
