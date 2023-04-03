import React, { useCallback, useEffect, useRef, useState } from 'react'
import LoginForm from '../body/LoginForm copy';

const ProfileForm = () => {
    const enteredfname = useRef();
    const enteredpurl = useRef();
    const userlocalId = localStorage.getItem('localId')
    const useridToken = localStorage.getItem('idToken')
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

  return (
    <div>
      {userlocalId && (
        <form className="p-2" onSubmit={onSubmitHandler}>
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
