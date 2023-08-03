import React, { useState } from "react";
import CreateaccForm from "./CreateaccForm";
import LoginForm from "./LoginForm";
import { Fragment } from "react";
import ForgotpassForm from "./ForgotpassForm";

const Body = () => {
  const userlocalId = localStorage.getItem("localId");
  const [signin, SetSignin] = useState(true);
  const [signup, SetSignup] = useState(false);
  const [forgotpass, Setforgotpass] = useState(false);

  const HaveAccountHandler = () => {
    SetSignin(true);
    SetSignup(false);
    Setforgotpass(false);
  };

  const DontHaveAccountHandler = () => {
    SetSignin(false);
    SetSignup(true);
    Setforgotpass(false);
  };

  const ForogotpassHandler = () => {
    SetSignin(false);
    SetSignup(false);
    Setforgotpass(true);
  };

  return (
    <Fragment>
      {!userlocalId && signin && (
        <div className="py-12 min-h-screen">
          <label className="underline m-6 text-center text-3xl font-bold text-gray-900">
            Sign In
          </label>
          <LoginForm />
          <button
            className="bg-red-600 text-white p-2 m-2 rounded-md"
            onClick={DontHaveAccountHandler}
          >
            Dont't have account Login?
          </button>
          <button
            className="bg-red-600 text-white p-2 m-2 rounded-md"
            onClick={ForogotpassHandler}
          >
            Forgot Password?
          </button>
        </div>
      )}

      {!userlocalId && signup && (
        <div className="py-12 min-h-screen">
          <label className="underline m-6 text-center text-3xl font-bold text-gray-900">
            Sign Up
          </label>
          <CreateaccForm />
          <button
            className="bg-red-600 text-white p-2 m-2 rounded-md"
            onClick={HaveAccountHandler}
          >
            Already have account Login?
          </button>
          <button
            className="bg-red-600 text-white p-2 m-2 rounded-md"
            onClick={ForogotpassHandler}
          >
            Forgot Password?
          </button>
        </div>
      )}

      {!userlocalId && forgotpass && (
        <div className="py-12 min-h-screen">
          <label className="underline m-6 text-center text-3xl font-bold text-gray-900">
            Forgot password
          </label>
          <ForgotpassForm />
          <button
            className="bg-red-600 text-white p-2 m-2 rounded-md"
            onClick={HaveAccountHandler}
          >
            Already have account Login?
          </button>
          <button
            className="bg-red-600 text-white p-2 m-2 rounded-md"
            onClick={DontHaveAccountHandler}
          >
            Dont't have account Login?
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default Body;
