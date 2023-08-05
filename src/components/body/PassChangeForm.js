import React from "react";
import { useRef } from "react";

const PassChangeForm = (props) => {
  const enteredpass = useRef();
  const enteredconfirmpass = useRef();

  const onPassChangeHandler = (event) => {
    event.preventDefault();
    const updatedpass = enteredpass.current.value;
    const updatedconfirmpass = enteredconfirmpass.current.value;

    if (updatedpass === updatedconfirmpass) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA8YcdRz-mt4-Y3rPxSLQEVxw4DlXJ0wB4",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: props.idToken,
            password: updatedpass,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
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
          // console.log(data);
          console.log("Passward changed successfully");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("Please check your password");
    }
  };
  return (
    <form className="bg-blue-600 mx-2 rounded-lg p-2 m-2 text-white">
      <div className="flex flex-col lg:flex-row lg:w-fit">
        <div className="flex justify-center lg:justify-start items-center flex-row lg:w-1/2 m-2">
          <label className="text-sm font-bold">New Password :</label>
          <input
            className="border-2 rounded-md px-2 mx-2 py-1"
            ref={enteredpass}
          />
        </div>
        <div className="flex justify-center lg:justify-start items-center flex-row lg:w-1/2 m-2">
          <label className="text-sm font-bold">Confirm New Password :</label>
          <input
            className="border-2 rounded-md px-2 mx-2 py-1"
            ref={enteredconfirmpass}
          />
        </div>
        <div className="md:w-auto mx-auto md:mt-0">
          <button className="bg-red-600 p-2 rounded-md">
            Change Password
          </button>
        </div>
      </div>
    </form>
  );
};

export default PassChangeForm;
