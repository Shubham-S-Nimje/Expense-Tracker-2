import React, { useRef } from 'react'
import { useNavigate } from "react-router-dom";
import ProfilePage from '../pages/ProfilePage';

const LoginForm = () => {
  const enteredemail = useRef();
  const enteredpass = useRef();
  const navigate = useNavigate()
  const userlocalId = localStorage.getItem('localId')

  const OnSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(enteredemail.current.value);
    // console.log(enteredpass.current.value);

    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8YcdRz-mt4-Y3rPxSLQEVxw4DlXJ0wB4";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredemail.current.value,
        password: enteredpass.current.value,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        navigate("/home");
        localStorage.setItem('localId',data.localId)
        localStorage.setItem('idToken',data.idToken)
        localStorage.setItem('email',data.email)
        console.log("User has successfully signed in");
      })
      .catch((err) => {
        alert(err.message);
      });

  };

  return (
    <>
    {!userlocalId && <div className="flex items-center justify-center px-12 py-2">
      <form
        className="border-2 m-8 p-2 bg-gray-300 rounded-md"
        onSubmit={OnSubmitHandler}
      >
        <div className="text-left">
          <div>
            <label className="font-bold">Email address :</label>
            <input
              type="email"
              required
              ref={enteredemail}
              className="w-full rounded-md border-2 p-2"
              placeholder="Email address"
            />
          </div>
          <div>
            <label className="font-bold">Password :</label>
            <input
              type="password"
              required
              ref={enteredpass}
              className="w-full rounded-md border-2 p-2"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-sky-600 min-w-full text-white py-2 my-2 rounded-md"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>}
    {userlocalId && <ProfilePage/>}
    </>
  );
}

export default LoginForm
