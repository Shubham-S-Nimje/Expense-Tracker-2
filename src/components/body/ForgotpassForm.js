import React from 'react'
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";


const ForgotpassForm = () => {
  
    const enteredemail = useRef();
    const navigate = useNavigate()


    const ForgotPassHandler =(event)=> {
        event.preventDefault();

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA8YcdRz-mt4-Y3rPxSLQEVxw4DlXJ0wB4", {
              method: "POST",
              body: JSON.stringify({
                requestType: "PASSWORD_RESET",
                email: enteredemail.current.value,
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
                navigate("/Expense-Tracker-2");
                console.log("Passward changed link sent successfully");
              })
              .catch((err) => {
                alert(err.message);
              });
      }
  return (
    <div>
      <form
        className="border-2 m-8 p-2 bg-gray-300 rounded-md"
        onSubmit={ForgotPassHandler}
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
        </div>
        <div>
          <button
            type="submit"
            className="bg-sky-600 min-w-full text-white py-2 my-2 rounded-md"
          >
            Submit
          </button>
          </div>

      </form>
    </div>
  )
}

export default ForgotpassForm
