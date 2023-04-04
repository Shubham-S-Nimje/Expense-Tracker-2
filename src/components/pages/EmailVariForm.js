import React from 'react'

const EmailVariForm = (props) => {
    const useremail = localStorage.getItem('email')

    const VarifyEmailHandler=(event)=>{
        event.preventDefault();

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA8YcdRz-mt4-Y3rPxSLQEVxw4DlXJ0wB4', {
      method: "POST",
      body: JSON.stringify({
        requestType: 'VERIFY_EMAIL',
        idToken: props.idToken,
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
        console.log("User Email successfully send for varification");
      })
      .catch((err) => {
        alert(err.message);
      });
    }
  return (
    <div>
      <label>Email :</label>
         <input
           className="border-2 rounded-md mx-2 px-2"
           placeholder={useremail}
         />
         <button 
         className='bg-sky-600 p-2 m-2 rounded-md text-white'
         onClick={VarifyEmailHandler}>Varify Email</button>
    </div>
  )
}

export default EmailVariForm
