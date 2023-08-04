import React, { useCallback, useEffect, useRef, useState } from "react";
import LoginForm from "./LoginForm";
import PassChangeForm from "./PassChangeForm";
import EmailVariForm from "./EmailVariForm";

const ProfileForm = (props) => {
  const enteredfname = useRef();
  const enteredpurl = useRef();

  const userlocalId = localStorage.getItem("localId");
  const useridToken = localStorage.getItem("idToken");
  const [username, Setusername] = useState("");
  const [userurl, Setuserurle] = useState("");

  const onSubmitHandler = useCallback(
    async (event) => {
      event.preventDefault();
      const updatedfname = enteredfname.current.value;
      const updatedpurl = enteredpurl.current.value;

      const users = {
        idToken: useridToken,
        displayName: updatedfname,
        photoUrl: updatedpurl,
        returnSecureToken: true,
      };

      try {
        const response = await fetch(
          `https://expense-tracker-f48d6-default-rtdb.firebaseio.com/users/${userlocalId}.json`,
          {
            method: "put",
            body: JSON.stringify(users),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const data = await response.json();
        alert("Profile Updated");
        console.log("Data Added =", data);
      } catch (error) {
        alert(error.message);
      }
    },
    [useridToken]
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://expense-tracker-f48d6-default-rtdb.firebaseio.com/users/${userlocalId}.json`
        );
        const data = await response.json();
        // console.log(data)
        // alert('Profile Updated')
        // data && Setusername(data.displayName)
        // data && Setuserurle(data.photoUrl)
        // localStorage.setItem('photoUrl',data.photoUrl)
      } catch {
        alert("error");
      }
    }
    fetchData();
  }, [userlocalId]);

  return (
    <div>
      {userlocalId && (
        <div>
          <EmailVariForm idToken={useridToken} />

          <form
            className="bg-blue-600 mx-2 rounded-lg p-2 m-2 text-white"
            onSubmit={onSubmitHandler}
          >
            <div className="flex flex-col md:flex-row lg:w-fit">
              <div className="flex justify-between lg:justify-start items-center flex-row md:w-1/2 mb-4 md:mb-0 md:pr-2">
                <label className="text-sm font-bold">Full Name :</label>
                <input
                  className="border-2 rounded-md px-2 lg:mx-2 py-1"
                  ref={enteredfname}
                  placeholder={username}
                />
              </div>
              <div className="flex justify-between lg:justify-start items-center flex-row md:w-1/2 mb-4 md:mb-0 md:pl-2">
                <label className="text-sm font-bold">Profile Photo URL :</label>
                <input
                  className="border-2 rounded-md px-2 lg:mx-2 py-1"
                  ref={enteredpurl}
                  placeholder={userurl}
                />
              </div>
              <div className="md:w-auto mx-auto md:mt-0">
                <button className="bg-red-600 p-2 rounded-md">Update</button>
              </div>
            </div>
          </form>

          <PassChangeForm idToken={useridToken} />
        </div>
      )}
      {!userlocalId && <LoginForm />}
    </div>
  );
};

export default ProfileForm;
