import React, { useRef } from 'react'

const LoginForm = () => {
    const enteredemail = useRef();
    const enteredpass = useRef();

    const OnSubmitHandler = (event) =>{
        event.preventDefault();
            console.log(enteredemail.current.value)
            console.log(enteredpass.current.value)

            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8YcdRz-mt4-Y3rPxSLQEVxw4DlXJ0wB4'
            fetch(
              url,
          {
            method: 'POST',
            body: JSON.stringify({
              email: enteredemail.current.value,
              password: enteredpass.current.value,
              returnSecureToken: true
            }),
            headers: {
              "Content-Type": 'application/json'
            }
          }).then((res) => {
            if(res.ok) {
              return res.json();
            }
            else{
              return res.json().then((data) => {
                let errorMessage = 'Authentication failed';
                throw new Error(errorMessage);
              });
            }
          }).then((data) => {
            console.log(data);
            console.log('User has successfully signed in')
          }).catch(err => {
            alert(err.message);
          });
    }
  return (
      <div className="border-2 rounded-md">
          <form className="" onSubmit={OnSubmitHandler}>
            <div className="">
              <div>
                <label className="">Email address</label>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  ref={enteredemail}
                  className=""
                  placeholder="Email address"
                />
              </div>
              <div>
                <label className="">Password</label>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  ref={enteredpass}
                  className=""
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button type="submit" className="">
                Sign in
              </button>
            </div>
          </form>
        </div>
  )
}

export default LoginForm
