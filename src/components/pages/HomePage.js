import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../body/LoginForm";
import ExpencesForm from "./ExpencesForm";
import { useDispatch } from 'react-redux';
import { ThememodeActions } from '../../store/index.js'
import { useSelector } from 'react-redux';

const HomePage = () => {
  const userlocalId = localStorage.getItem('localId');
  const dispatch = useDispatch();
  const isDark = useSelector(state => state.theme.isDarkmode);

  const DarkthemeActivated = (event) => {
    event.preventDefault();
    console.log(isDark)
    dispatch(ThememodeActions.Darkmode())
  }

  const LightthemeActivated = (event) => {
    event.preventDefault();
    console.log(isDark)
    dispatch(ThememodeActions.Lightmode())
  }

  return (
    <>
    <div className={`text-end ${isDark && 'bg-black'}`}>
    {!isDark && <button className="bg-black text-white rounded-md m-2 p-2"
      onClick={DarkthemeActivated}
      >Activate Darkmode</button>}
      {isDark && <button
      className="bg-white border-black border-2 rounded-md m-2 p-2"
      onClick={LightthemeActivated}
      >Activate Lightmode</button>}
    </div>

      {userlocalId && (
        <div className="min-h-screen">
          <h1 className={`textxl font-bold py-2 ${!isDark && 'bg-blue-600'} ${isDark && 'bg-white'} m-2 rounded-md`}>
            Welcome to Expense Tracker!..
          </h1>
          <div className="flex justify-center text-end p-2 m-2 border-2 border-black rounded-md bg-pink-100">
            <h2>Your profile is incomplete</h2>
            <Link to="/profile">
              <span className="text-sky-600 p-2 m-2 rounded-md">
                Complete Now
              </span>
            </Link>
          </div>
        <div className="bg-blue-600 rounded-md m-2 p-2">
          <ExpencesForm />
        </div>
        </div>
      )}
      {!userlocalId && <LoginForm />}
    </>
  );
};

export default HomePage;
