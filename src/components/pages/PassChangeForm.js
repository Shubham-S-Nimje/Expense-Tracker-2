import React from 'react'
import { useRef } from 'react';

const PassChangeForm = (props) => {
  
  const enteredpass = useRef();
  const enteredconfirmpass = useRef();

  const onPassChangeHandler = (event) => {
    event.preventDefault();
    const updatedpass = enteredpass.current.value;
    const updatedconfirmpass = enteredconfirmpass.current.value;

    if (updatedpass === updatedconfirmpass) {
      fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA8YcdRz-mt4-Y3rPxSLQEVxw4DlXJ0wB4", {
        method: "POST",
        body: JSON.stringify({
          idToken: props.idToken,
          password: updatedpass,
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
          console.log("Passward changed successfully");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("Please check your password");
    }
  }
  return (
    <form className="p-2 border-2 m-2" onSubmit={onPassChangeHandler}>
          <div className="flex">
            <div className='align-middle m-2 p-2 '>
              <label>New Passward :</label>
              <input
                className="border-2 rounded-md mx-2 px-2"
                ref={enteredpass}
              />
            </div>
            <div className='align-middle m-2 p-2 '>
              <label>Confirm New Passward :</label>
              <input
                className="border-2 rounded-md mx-2 px-2"
                ref={enteredconfirmpass}
              />
            </div>
            <div className='m-2 align-middle'>
          <button className="bg-sky-600 p-2 mx-2 rounded-md text-white">
            Change Passward
          </button>
          </div>
          </div>
        </form>
  )
}

export default PassChangeForm
