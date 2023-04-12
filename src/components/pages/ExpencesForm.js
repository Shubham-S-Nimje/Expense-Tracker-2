import React, { useEffect, useState } from "react";
import DisplayExpenses from "./DisplayExpenses";
import { useRef } from "react";
import { useContext } from "react";
import ContextData from "../store/Contextdata";
import { CSVLink } from "react-csv";

const ExpencesForm = () => {
const { expenses, expensedata } = useContext(ContextData);
const userlocalId = localStorage.getItem('localId')

const [expence, Setexpence] = useState([]);
const [enterexpense, setenterexpense] = useState(false);
const [ActivePremium, SetActivePremium] = useState(false);

const Onaddexpenseclickhandler = () => {
  setenterexpense(true);
};
const Oncloseexpenseclickhandler = () => {
  setenterexpense(false);
};

const enteredmoney = useRef();
const entereddesc = useRef();
const enteredcategory = useRef();

const SubmitExpenses = (event) => {
  event.preventDefault();

  const expensemoney = enteredmoney.current.value;
  const expensedescription = entereddesc.current.value;
  const expensecategory = enteredcategory.current.value;

  if(expensemoney >= 10000){
    alert('Activate Premium Button')
    SetActivePremium(true)
  }
  else
  {expensedata(expensemoney, expensedescription, expensecategory);
  const data = {
    expensemoney: expensemoney,
    expensedescription: expensedescription,
    expensecategory: expensecategory,
    returnSecureToken: true,
  };

  fetch(
    `https://expense-tracker-f48d6-default-rtdb.firebaseio.com/users/${userlocalId}/expences.json`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          let errorMessage = "Authentication failed";
          throw new Error(errorMessage);
        });
      }
    })
    .then((data) => {
      console.log(data);
      console.log("expense added successfully");
    })
    .catch((err) => {
      alert(err.message);
    });
};
}
useEffect(() => {
  async function fetchData() {
    try {
      const response = await fetch(
        `https://expense-tracker-f48d6-default-rtdb.firebaseio.com/users/${userlocalId}/expences.json`
      );
      const data = await response.json();
      console.log(data);
      Setexpence(data);
    } catch {
      alert("error");
    }
  }
  fetchData();
}, [expenses]);

const ActivePremiumCancelhandler = () => {
  SetActivePremium(false)
}

// console.log(expenseitems)
return (
  <div>
    {!enterexpense && (
      <button
        className="m-4 bg-white font-bold text-2xl p-2 rounded-md"
        onClick={Onaddexpenseclickhandler}
      >
        Add Expense
      </button>
    )}

    {enterexpense && !ActivePremium && (
      <form onSubmit={SubmitExpenses}
      className="border-2 m-4 p-8 bg-blue-100 rounded-md ">
        <div className="flex justify-between p-4 rounded-md bg-blue-600">
            <h2 className="text-white align-middle text-3xl font-bold">
              Enter Expense Details :
            </h2>
            <button
              className="bg-red-600 text-white p-2 rounded-md"
              onClick={Oncloseexpenseclickhandler}
            >
              Close
            </button>
          </div>
        <div className="justify-start text-left mt-2">
          <div>
            <label className="font-bold text-3xl">Money spent :</label>
            <input
              type="number"
              required
              className="w-full rounded-md border-2 p-2 my-2"
              placeholder="Enter amount Ex.99"
              ref={enteredmoney}
            />
          </div>
          <div>
            <label className="font-bold text-3xl">Description :</label>
            <textarea
              type="text"
              required
              className="w-full rounded-md border-2 p-2 my-2"
              placeholder="Enter description"
              ref={entereddesc}
            />
          </div>
          <div>
            <label className="font-bold text-3xl">Select category :</label>
            <select
              required
              className="w-full rounded-md border-2 p-2 my-2"
              ref={enteredcategory}
            >
              <option value="Rent">Rent</option>
              <option value="Food">Food</option>
              <option value="Bill">Bill</option>
              <option value="Emi">Emi</option>
            </select>
          </div>
          <div>
            <button
              className="bg-blue-600 text-white p-2 m-2 rounded-md"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    )}

    {ActivePremium && 
    <div>
    <button
    className="bg-green-600 text-white p-2 m-2 rounded-md"
    type="submit"
  >
    Activate Premium
  </button>
  <button
    className="bg-red-600 text-white p-2 m-2 rounded-md"
    type="submit"
    onClick={ActivePremiumCancelhandler}
  >
    Cancel
  </button>
  </div>}

<CSVLink 
        className="m-4 bg-white font-bold text-2xl p-2 rounded-md"
        data={expenses}>Download Expenses</CSVLink>
    <DisplayExpenses expence={expence} />
    
  </div>
);
};

export default ExpencesForm;
