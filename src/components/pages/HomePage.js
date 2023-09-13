import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExpencesForm from "../body/ExpencesForm";
import { useDispatch, useSelector } from "react-redux";
import { ThememodeActions } from "../../store/index.js";
import Body from "../body/Body";
import { Fragment } from "react";
import axios from "axios";
import ProfilePage from "../body/ProfilePage";
import { useHistory } from "react-router-dom";
import Leaderboard from "../body/Leaderboard";

const HomePage = () => {
  const userlocalId = localStorage.getItem("localId");
  const [totalExpensemoney, SettotalExpensemoney] = useState(0);
  const [islogin, Setislogin] = useState(false);
  const [showProfile, SetshowProfile] = useState(false);
  const [isPremium, SetisPremium] = useState(false);
  const [Displaylb, SetDisplaylb] = useState(false);
  const [userData, SetuserData] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const isDark = useSelector((state) => state.theme.isDarkmode);

  useEffect(() => {
    userlocalId ? Setislogin(true) : Setislogin(false);
  }, [userlocalId]);

  const DarkthemeActivated = (event) => {
    event.preventDefault();
    dispatch(ThememodeActions.Darkmode());
  };

  const LightthemeActivated = (event) => {
    event.preventDefault();
    dispatch(ThememodeActions.Lightmode());
  };

  const LeaderboardHandler = () => {
    // console.log(Displaylb);
    SetDisplaylb(!Displaylb);
  };

  const OpenprofileHandler = (event) => {
    SetshowProfile(true);
    history.push("/Expense-Tracker-2");
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const ActivatePremium = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const result = await axios.post(
        "http://localhost:4000/payment/activate-premium",
        {},
        {
          headers: {
            Authorization: userlocalId,
          },
        }
      );

      if (!result) {
        alert("Server error. Are you online?");
        return;
      }

      // console.log(result)

      const { amount, id: order_id, currency } = result.data.order;

      const options = {
        key: "rzp_test_TKu81YK42qGvTH",
        amount: amount.toString(),
        currency: currency,
        name: "ExpenseTracker",
        description: "Test Transaction",
        // image: { logo },
        order_id: order_id,
        handler: async function (response) {
          const data = {
            userid: userlocalId,
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post(
            "http://localhost:4000/payment/payment-success",
            data,
            {
              headers: {
                Authorization: userlocalId,
              },
            }
          );

          alert(result.data.msg);
        },
        prefill: {
          name: "Soumya Dey",
          email: "SoumyaDey@example.com",
          contact: "1234567890",
        },
        notes: {
          address: "Soumya Dey Corporate Office",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:4000/auth/fetch-user`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: userlocalId,
          },
        });
        const data = await response.json();
        // console.log(data)
        SettotalExpensemoney(data.user.totalExpensemoney);
        SetuserData(data.user);
        if (data.user.ispremiumuser === true) {
          // console.log(data.user.ispremiumuser)
          SetisPremium(true);
        }
      } catch {
        alert("error");
      }
    }
    fetchData();
  }, [userlocalId]);

  // console.log(userData.totalExpensemoney)

  return (
    <Fragment>
      <div className="justify-between flex">
        <div className={`text-center ${isDark ? "bg-black" : ""}`}>
          {islogin && !isPremium && (
            <button
              className="bg-red-600 text-white rounded-md m-2 p-2"
              onClick={ActivatePremium}
            >
              Buy Premium
            </button>
          )}
          {isPremium && (
            <div className="bg-green-600 text-white rounded-md m-2 p-2">
              Premium User
            </div>
          )}
        </div>
        {isPremium && (
          <button
            className="bg-red-600 text-white rounded-md m-2 p-2"
            onClick={LeaderboardHandler}
          >
            {Displaylb ? "Close Leader Board" : "Open Leader Board"}
          </button>
        )}
        <div className={`text-end ${isDark ? "bg-black" : ""}`}>
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
      </div>

      {!showProfile && islogin ? (
        <div className="min-h-full">
          <h3
            className={`text-xl font-bold py-2 bg-blue-600 text-white m-2 rounded-md border-2 border-white`}
          >
            Welcome to Expense Tracker!..
          </h3>
          <div className="flex justify-center text-end p-2 m-2 border-2 border-black rounded-md bg-pink-100">
            <h2>Your profile is incomplete</h2>
            <Link to="/Expense-Tracker-2/profile">
              <button
                className="text-red-600 mx-2 rounded-md font-bold"
                onClick={OpenprofileHandler}
              >
                Complete Now
              </button>
            </Link>
            {/* <Link
            to="/Expense-Tracker-2/profile">
            <span className="text-sky-600 p-2 m-2 rounded-md">
              Complete Now
            </span>
          </Link> */}
          </div>
          {!Displaylb && (
            <div className="bg-blue-600 rounded-md m-2 p-2 border-2 border-white">
              <ExpencesForm
                isPremium={isPremium}
                userData={userData}
                totalExpensemoney={totalExpensemoney}
                SettotalExpensemoney={SettotalExpensemoney}
              />
            </div>
          )}
        </div>
      ) : (
        <Body />
      )}
      {showProfile && <ProfilePage />}
      {Displaylb && <Leaderboard />}
    </Fragment>
  );
};

export default HomePage;
