import React from "react";
import ProfileForm from "./ProfileForm";
import Body from "../body/Body";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ProfilePage = (props) => {
  // const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const isAuth = props.userlocalId;
  const userlocalId = localStorage.getItem("localId");
  const history = useHistory();
  const userimage = localStorage.getItem("photoUrl");
  const oncancelhandler = () => {
    history.push("/Expense-Tracker-2");
  };

  return (
    <>
      {userlocalId && (
        <div className="min-h-screen py-2  text-xs sm:text-lg lg:text-2xl">
          <div className="lg:flex md:justify-between text-center min-w-min">
            <div className="lg:w-1/3 text-right">
              {userimage && (
                <div className="flex justify-center items-center m-4">
                  <img
                    className="w-full"
                    src={`${userimage}`}
                    width={100}
                    height={100}
                    alt="User Profile"
                  />
                </div>
              )}
              {!userimage && (
                <div className="flex justify-center items-center m-4">
                  No image uploaded
                </div>
              )}
            </div>
            <div className="lg:w-2/3  text-white">
              <h1 className="bg-blue-600 m-2 rounded-lg font-bold lg:text-3xl p-2">
                Contact Details
              </h1>
              <ProfileForm userData={props.userData}/>
            </div>
            <div className="lg:w-1/3 text-right">
              <button
                onClick={oncancelhandler}
                className="bg-red-600 p-1 lg:p-2 m-2 rounded-md text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {!userlocalId && <Body />}
    </>
  );
};

export default ProfilePage;
