import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../body/LoginForm";
import ExpencesForm from "./ExpencesForm";

const HomePage = () => {
  const userlocalId = localStorage.getItem('localId')

  return (
    <>
      {userlocalId && (
        <div className="min-h-screen">
          <h1 className="textxl font-bold py-2">
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
