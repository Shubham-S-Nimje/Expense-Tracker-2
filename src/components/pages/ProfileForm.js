import React, { useCallback, useEffect, useRef, useState } from 'react'
import LoginForm from '../body/LoginForm copy';

const ProfileForm = () => {
    const enteredfname = useRef();
    const enteredpurl = useRef();
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
        })

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
    },[])

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

  return (
    <div>
      {userlocalId && (
        <form className="p-2" onSubmit={onSubmitHandler}>
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
          <div className="flex">
            <div>
              <label>Full Name :</label>
              <input
                className="border-2 rounded-md mx-2 px-2"
                ref={enteredfname}
                placeholder={username}
              />
            </div>
            <div>
              <label>Profile Photo URL :</label>
              <input
                className="border-2 rounded-md mx-2 px-2"
                ref={enteredpurl}
                placeholder={userurl}
              />
            </div>
          </div>
          <button className="bg-sky-600 p-2 m-2 rounded-md text-white">
            Update
          </button>
        </form>
      )}
      {!userlocalId && <LoginForm />}
    </div>
  );
}

export default ProfileForm
