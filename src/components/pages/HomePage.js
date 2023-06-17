import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExpencesForm from "./ExpencesForm";
import { useDispatch, useSelector } from 'react-redux';
import { ThememodeActions } from '../../store/index.js';
import Body from "../body/Body";

const HomePage = () => {
  const userlocalId = localStorage.getItem('localId');
  const [islogin, Setislogin] = useState(false);
  const dispatch = useDispatch();
  const isDark = useSelector(state => state.theme.isDarkmode);

  useEffect(() => {
    userlocalId ? Setislogin(true) : Setislogin(false);
  }, [userlocalId]);

  const DarkthemeActivated = (event) => {
    event.preventDefault();
    dispatch(ThememodeActions.Darkmode());
  }

  const LightthemeActivated = (event) => {
    event.preventDefault();
    dispatch(ThememodeActions.Lightmode());
  }

  return (
    <>
      <div className={`text-end ${isDark ? 'bg-black' : ''}`}>
        {!isDark && (
          <button
            className="bg-black text-white rounded-md m-2 p-2"
            onClick={DarkthemeActivated}
          >
            Activate Darkmode
          </button>
        )}
        {isDark && (
          <button
            className="bg-white border-black border-2 rounded-md m-2 p-2"
            onClick={LightthemeActivated}
          >
            Activate Lightmode
          </button>
        )}
      </div>

      {islogin ? (
        <div className="min-h-screen">
          <h1 className={`text-xl font-bold py-2 ${isDark ? 'bg-white' : 'bg-blue-600'} m-2 rounded-md`}>
            Welcome to Expense Tracker!..
          </h1>
          <div className="flex justify-center text-end p-2 m-2 border-2 border-black rounded-md bg-pink-100">
            <h2>Your profile is incomplete</h2>
            <Link to="/Expense-Tracker-2/profile">
              <span className="text-sky-600 p-2 m-2 rounded-md">
                Complete Now
              </span>
            </Link>
          </div>
          <div className="bg-blue-600 rounded-md m-2 p-2">
            <ExpencesForm />
          </div>
        </div>
      ) : (
        <Body />
      )}
    </>
  );
};

export default HomePage;
