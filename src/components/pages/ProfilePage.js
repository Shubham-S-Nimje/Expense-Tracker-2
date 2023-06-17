import React from "react";
import ProfileForm from "./ProfileForm";
import Body from "../body/Body";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ProfilePage = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();
  const userimage = localStorage.getItem("photoUrl");
  const oncancelhandler = () => {
    history.push("/Expense-Tracker-2");
  };

  return (
    <>
      {isAuth && (
        <div className="min-h-screen py-2">
          <div className="md:flex md:justify-between text-center">
            <div className="md:w-1/3 text-right">
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
              {!userimage && <div className="flex justify-center items-center m-4">No image uploaded</div>}
            </div>
            <div className="md:w-2/3">
              <h1 className="bg-sky-600 m-2 rounded-lg font-bold lg:text-3xl p-2">
                Contact Details
              </h1>
              <ProfileForm />
            </div>
            <div className="md:w-1/3 text-right">
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
      {!isAuth && <Body />}
    </>
  );
};

export default ProfilePage;
