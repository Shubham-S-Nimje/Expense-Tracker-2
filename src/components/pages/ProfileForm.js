import React, { useCallback, useEffect, useRef, useState } from 'react'
import LoginForm from '../body/LoginForm copy';

const ProfileForm = () => {
    const enteredfname = useRef();
    const enteredpurl = useRef();
    const enteredpass = useRef();
    const enteredconfirmpass = useRef();

    const userlocalId = localStorage.getItem('localId')
    const useridToken = localStorage.getItem('idToken')
    const useremail = localStorage.getItem('email')
    const [username , Setusername] = useState()
    const [userurl , Setuserurle] = useState()

    const onSubmitHandler = useCallback(async (event) => {
        event.preventDefault();
        const updatedfname = enteredfname.current.value;
        const updatedpurl = enteredpurl.current.value;

        const users = {
            idToken: useridToken,
            displayName: updatedfname,
            photoUrl:updatedpurl,
            returnSecureToken: true,
        };

        try {
            const response = await fetch(`https://expense-tracker-f48d6-default-rtdb.firebaseio.com/users/${userlocalId}.json`, {
              method: 'PUT',
              body: JSON.stringify(users),
              headers: {
                'Content-type': 'application/json'
              }
            });
            const data = await response.json();
            console.log('Data Added =',data);
            }
            catch (error) {
              alert(error.message);
            }
        },[useridToken])

        useEffect(()=>{
            async function fetchData() {
            try{
                const response = await fetch(`https://expense-tracker-f48d6-default-rtdb.firebaseio.com/users/${userlocalId}.json`)
                const data = await response.json();
                console.log(data)
                Setusername(data.displayName)
                Setuserurle(data.photoUrl)
                    }
                    catch{
                        alert('error')
                    }
        }
        fetchData();
    },[userlocalId])

    const VarifyEmailHandler=(event)=>{
        event.preventDefault();

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA8YcdRz-mt4-Y3rPxSLQEVxw4DlXJ0wB4', {
      method: "POST",
      body: JSON.stringify({
        requestType: 'VERIFY_EMAIL',
        idToken: useridToken,
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

    const onPassChangeHandler = (event) => {
      event.preventDefault();
      const updatedpass = enteredpass.current.value;
      const updatedconfirmpass = enteredconfirmpass.current.value;

      if (updatedpass === updatedconfirmpass) {
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA8YcdRz-mt4-Y3rPxSLQEVxw4DlXJ0wB4", {
          method: "POST",
          body: JSON.stringify({
            idToken: useridToken,
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
    <div>
      {userlocalId && (
         <div>
         <label>Email :</label>
         <input
           className="border-2 rounded-md mx-2 px-2"
           placeholder={useremail}
         />
         <button 
         className='bg-sky-600 p-2 m-2 rounded-md text-white'
         onClick={VarifyEmailHandler}>Varify Email</button>
       

        <form className="p-2 border-2 m-2" onSubmit={onSubmitHandler}>
          <div className="flex">
            <div className='align-middle m-2 p-2 '>
              <label>Full Name :</label>
              <input
                className="border-2 rounded-md mx-2 px-2"
                ref={enteredfname}
                placeholder={username}
              />
            </div>
            <div className='align-middle m-2 p-2 '>
              <label>Profile Photo URL :</label>
              <input
                className="border-2 rounded-md mx-2 px-2"
                ref={enteredpurl}
                placeholder={userurl}
              />
            </div>
            <div className='m-2 align-middle'>
          <button className="bg-sky-600 p-2 mx-2 rounded-md text-white">
            Update
          </button>
          </div>
          </div>
        </form>

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
        </div>
      )}
      {!userlocalId && <LoginForm />}
    </div>
  );
}

export default ProfileForm
