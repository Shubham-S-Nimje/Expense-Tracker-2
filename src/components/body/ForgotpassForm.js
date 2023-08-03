import React from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";

const ForgotpassForm = () => {
  const userlocalId = localStorage.getItem("localId");
  const enteredemail = useRef();
  const history = useHistory();

  const ForgotPassHandler = (event) => {
    event.preventDefault();

    fetch("http://localhost:4000/forgotpassword", {
      method: "POST",
      body: JSON.stringify({
        // requestType: "PASSWORD_RESET",
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
            console.log(data)
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // console.log(data);
        history.push("/Expense-Tracker-2");
        console.log("Passward changed link sent successfully");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
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
  );
};

export default ForgotpassForm;
