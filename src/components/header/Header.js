import React from "react";
import { useSelector } from "react-redux";
import { authActions } from "../../store/index.js";
import { useDispatch } from "react-redux";
import logo from "../../logo.svg";

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const OnClickHandler = () => {
    localStorage.setItem("localId", "");
    localStorage.setItem("idToken", "");
    localStorage.setItem("email", "");
    localStorage.setItem("photoUrl", "");
    window.location.reload();
    dispatch(authActions.logout());
  };

  // useEffect(()=> {
  //   {userlogedin && Setuserlogedin(userlogedin)}
  //   {!userlogedin && Setuserlogedin('')}
  // },[OnClickHandler])

  return (
    <div className="flex bg-sky-600 max-w-screen text-white items-center mx-auto p-4 justify-between">
      <a href="/Expense-Tracker-2" className="flex items-center">
        <img src={logo} className="h-8 mr-3" alt="Logo" />
        <span className="text-2xl font-semibold">ExpenseTracker</span>
      </a>
      <div className="text-xl font-semibold">
        {isAuth && <button onClick={OnClickHandler}>Logout</button>}
      </div>
    </div>
  );
};

export default Header;
