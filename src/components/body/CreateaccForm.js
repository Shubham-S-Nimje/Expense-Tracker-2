import React, { useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const CreateaccForm = () => {
  const enteredusername = useRef();
  const enteredemail = useRef();
  const enteredpass = useRef();
  const enteredconfirmpass = useRef();
  const [ShowPass, SetShowpass] = useState("password");
  const history = useHistory();

  const OnSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(enteredemail.current.value);
    // console.log(enteredconfirmpass.current.value);
    // console.log(enteredpass.current.value);
    const obj = {
      username: enteredusername.current.value,
      email: enteredemail.current.value,
      password: enteredpass.current.value,
      // returnSecureToken: true,
    };

    if (enteredpass.current.value === enteredconfirmpass.current.value) {
      const url = "http://localhost:4000/auth/add-user";

      fetch(url, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = data.error;
              throw new Error(errorMessage);
              // console.log(data.error)
            });
          }
        })
        .then((data) => {
          // console.log(data);
          history.push("/Expense-Tracker-2/auth");
          console.log("User has successfully signed up");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Please check your password");
    }
  };

  const ShowpasswordHandler = () => {
    if (ShowPass === "password") {
      SetShowpass("text");
    } else {
      SetShowpass("password");
    }
  };
  return (
    <div className="flex items-center justify-center px-12 py-2">
      <form
        className="border-2 m-8 p-2 bg-gray-300 rounded-md"
        onSubmit={OnSubmitHandler}
      >
        <div className="text-left">
          <div>
            <label className="font-bold">Username :</label>
            <input
              type="text"
              autoComplete="text"
              required
              ref={enteredusername}
              className="w-full rounded-md border-2 p-2"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="font-bold">Email address :</label>
            <input
              type="email"
              autoComplete="email"
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
              autoComplete="current-password"
              required
              ref={enteredpass}
              className="w-full rounded-md border-2 p-2"
              placeholder="Password"
            />
          </div>
          <div>
            <label className="font-bold">Confirm Password :</label>
            <input
              type={ShowPass}
              autoComplete="current-password"
              required
              ref={enteredconfirmpass}
              className="w-full rounded-md border-2 p-2"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="text-left">
          <input type="checkbox" className="m-1" onClick={ShowpasswordHandler} />
          Show Password
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 my-2 rounded-md min-w-full"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateaccForm;
