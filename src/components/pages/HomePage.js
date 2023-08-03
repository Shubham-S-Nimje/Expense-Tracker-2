import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExpencesForm from "./ExpencesForm";
import { useDispatch, useSelector } from "react-redux";
import { ThememodeActions } from "../../store/index.js";
import Body from "../body/Body";
import { Fragment } from "react";
import axios from "axios";

const HomePage = () => {
  const userlocalId = localStorage.getItem("localId");
  const [islogin, Setislogin] = useState(false);
  const dispatch = useDispatch();
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
        "http://localhost:4000/activate-premium",
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
            "http://localhost:4000/payment-success",
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

  return (
    <Fragment>
      <div className="justify-between flex">
        <div className={`text-end ${isDark ? "bg-black" : ""}`}>
          {islogin && (
            <button
              className="bg-red-600 text-white rounded-md m-2 p-2"
              onClick={ActivatePremium}
            >
              Buy Premium
            </button>
          )}
        </div>
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

      {islogin ? (
        <div className="min-h-screen">
          <h1
            className={`text-xl font-bold py-2 bg-blue-600 text-white m-2 rounded-md border-2 border-white`}
          >
            Welcome to Expense Tracker!..
          </h1>
          <div className="flex justify-center text-end p-2 m-2 border-2 border-black rounded-md bg-pink-100">
            <h2>Your profile is incomplete</h2>
            <Link
             to="/Expense-Tracker-2/profile">
              <span className="text-sky-600 p-2 m-2 rounded-md">
                Complete Now
              </span>
            </Link>
          </div>
          <div className="bg-blue-600 rounded-md m-2 p-2 border-2 border-white">
            <ExpencesForm />
          </div>
        </div>
      ) : (
        <Body />
      )}
    </Fragment>
  );
};

export default HomePage;
