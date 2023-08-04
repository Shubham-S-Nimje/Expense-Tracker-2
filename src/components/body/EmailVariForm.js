import React from "react";

const EmailVariForm = (props) => {
  const useremail = localStorage.getItem("email");

  const VarifyEmailHandler = (event) => {
    event.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA8YcdRz-mt4-Y3rPxSLQEVxw4DlXJ0wB4",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: props.idToken,
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
        alert("Check your mail for Varification link");
        console.log("User Email successfully send for varification");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className="bg-blue-600 rounded-lg flex flex-col lg:flex-row mx-2 items-center text-center  text-white">
      <div className="m-2">
        <label className="text-sm font-bold">Email :</label>
        <input
          className="border-2 rounded-md mx-2 px-2 py-1"
          defaultValue={useremail}
          placeholder={useremail}
        />
      </div>
      <div>
        <button
          className="bg-red-600 p-2 lg:p-2 my-2 rounded-md text-white"
          onClick={VarifyEmailHandler}
        >
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default EmailVariForm;
