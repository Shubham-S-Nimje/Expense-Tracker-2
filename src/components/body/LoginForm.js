import React, { useRef } from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/index.js'
import { useSelector } from 'react-redux';

const LoginForm = () => {
  const enteredemail = useRef();
  const enteredpass = useRef();
  const history = useHistory()
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.isAuthenticated)

  const OnSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(enteredemail.current.value);
    // console.log(enteredpass.current.value);

    const url =
      "http://localhost:4000/login-user";
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
        data && localStorage.setItem('localId',data.localId)
        data && localStorage.setItem('idToken',data.idToken)
        data && localStorage.setItem('email',data.email)
        history.push("/Expense-Tracker-2/profile");
        dispatch(authActions.login())
        console.log("User has successfully signed in");
      })
      .catch((err) => {
        alert(err.message);
      });

  };

  return (
    <>
    {!isAuth && <div className="flex items-center justify-center px-12 py-2">
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
    </>
  );
}

export default LoginForm
