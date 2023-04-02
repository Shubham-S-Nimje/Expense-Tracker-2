import React, { useRef } from 'react'

const CreateaccForm = () => {
    const enteredemail = useRef();
    const enteredpass = useRef();
    const enteredconfirmpass = useRef();

    const OnSubmitHandler = (event) =>{
        event.preventDefault();
            console.log(enteredemail.current.value)
            console.log(enteredconfirmpass.current.value)
            console.log(enteredpass.current.value)
            
            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8YcdRz-mt4-Y3rPxSLQEVxw4DlXJ0wB4'
          
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
            console.log('User has successfully signed up')
          }).catch(err => {
            alert(err.message);
          });
        
    }
  return (
      <div className="">
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
              <div>
                <label className="">Confirm Password</label>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  ref={enteredconfirmpass}
                  className=""
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button type="submit" className="">
                Sign up
              </button>
            </div>
          </form>
        </div>
  )
}

export default CreateaccForm
