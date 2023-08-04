import React, { useEffect, useState } from "react";
import DisplayExpenses from "./DisplayExpenses";
import { useRef } from "react";
import { useContext } from "react";
import ContextData from "../store/Contextdata";
import { CSVLink } from "react-csv";

const ExpencesForm = (props) => {
  const { expenses, expensedata } = useContext(ContextData);
  const userlocalId = localStorage.getItem("localId");

  const [expence, Setexpence] = useState([]);
  const [filteredexpence, Setfilteredexpence] = useState([]);
  const [downloadUrl, SetdownloadUrl] = useState("");
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

  const SubmitExpenses = async (event) => {
    event.preventDefault();

    const expensemoney = enteredmoney.current.value;
    const expensedescription = entereddesc.current.value;
    const expensecategory = enteredcategory.current.value;

    if (expensemoney >= 10000) {
      alert("Activate Premium Button");
      SetActivePremium(true);
    } else {
      try {
        const data = {
          expensemoney: expensemoney,
          expensedescription: expensedescription,
          expensecategory: expensecategory,
          returnSecureToken: true,
        };

        const response = await fetch(`http://localhost:4000/add-expences`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: userlocalId,
          },
        });

        if (!response.ok) {
          throw new Error("Unable to add expense");
        }

        console.log("Expense added successfully");
        setenterexpense(false);
      } catch (error) {
        alert(error.message);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/fetch-expences`, {
          method: "POST",
          body: JSON.stringify({ userid: userlocalId }),
          headers: {
            "Content-Type": "application/json",
            Authorization: userlocalId,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching expenses");
        }

        const data = await response.json();
        Setexpence(data.expense);
        Setfilteredexpence(data.expense);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchData();
  }, [userlocalId]);

  const ActivePremiumCancelhandler = () => {
    SetActivePremium(false);
  };

  const filterHandler = (e) => {
    const cuurentFilter = e.target.value;
    // console.log(cuurentFilter);

    const daily = new Date().getDay();
    // const weekly = new Date().getWeek();
    const monthly = new Date().getMonth() + 1; // Adding 1 to get the correct month number
    const yearly = new Date().getFullYear();

    console.log("current", daily, monthly, yearly);

    if (cuurentFilter === "all") {
      Setfilteredexpence(expence);
      // console.log("all");
    } else if (cuurentFilter === "daily") {
      const dailyExpense = expence.filter((expense) => {
        const createdAtDate = new Date(expense.createdAt);
        return createdAtDate.getDay() === daily;
      });
      // console.log("daily", dailyExpense);
      Setfilteredexpence(dailyExpense);
    }
    // else if (e.target.value === "weekly") {
    //   const weeklyExpense = expence.filter((expense) => {
    //     const createdAtDate = new Date(expense.createdAt);
    //     const currentDate = new Date();
    //     const firstDayOfWeek = new Date(
    //       currentDate.setDate(currentDate.getDate() - currentDate.getDay())
    //     );
    //     const lastDayOfWeek = new Date(
    //       currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6)
    //     );
    //     return (
    //       createdAtDate >= firstDayOfWeek && createdAtDate <= lastDayOfWeek
    //     );
    //   });
    //   console.log("weekly", weeklyExpense);
    //   Setfilteredexpence(weeklyExpense);
    // }
    else if (cuurentFilter === "monthly") {
      console.log(cuurentFilter);
      const monthlyExpense = expence.filter((expense) => {
        const createdAtDate = new Date(expense.createdAt);
        return createdAtDate.getMonth() + 1 === monthly;
      });
      // console.log("monthly", monthlyExpense);
      Setfilteredexpence(monthlyExpense);
    } else if (cuurentFilter === "yearly") {
      const yearlyExpense = expence.filter((expense) => {
        const createdAtDate = new Date(expense.createdAt);
        return createdAtDate.getFullYear() === yearly;
      });
      // console.log("yearly", yearlyExpense);
      Setfilteredexpence(yearlyExpense);
    } else {
      console.log("Filter Not Found!..");
    }
  };

  const downloadExpense = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/user/download-expenses`,
        {
          method: "POST",
          body: JSON.stringify({ userid: userlocalId }),
          headers: {
            "Content-Type": "application/json",
            Authorization: userlocalId,
          },
        }
      );

      if (!response.ok) {
        // console.log(response.statusText)
        throw new Error(response.statusText);
      }

      const data = await response.blob();
      // console.log(data);
      const url = URL.createObjectURL(data);
      // console.log(url);
      SetdownloadUrl(url);
    } catch (error) {
      alert(error.message);
    }
    // console.log('download clicked')
  };

  // console.log(expence)
  return (
    <div>
      {!enterexpense ? (
        <button
          className="min-w-full bg-white font-bold lg:text-2xl my-2 p-2 rounded-md sm:text-sm"
          onClick={Onaddexpenseclickhandler}
        >
          Add Expense
        </button>
      ) : (
        <>
          {!ActivePremium ? (
            <form
              onSubmit={SubmitExpenses}
              className="border-2 m-4 p-8 bg-blue-100 rounded-md"
            >
              <div className="flex justify-between p-4 rounded-md bg-blue-600">
                <h2 className="text-sm items-center text-center sm:text-sm lg:text-3xl text-white align-middle font-bold">
                  Enter Expense Details:
                </h2>
                <button
                  className="text-sm items-center text-center sm:text-sm lg:text-3xl bg-red-600 text-white p-1 lg:p-2 rounded-md"
                  onClick={Oncloseexpenseclickhandler}
                >
                  Close
                </button>
              </div>
              <div className="justify-start text-left mt-2">
                <div>
                  <label className="font-bold lg:text-3xl">Money spent:</label>
                  <input
                    type="number"
                    required
                    className="w-full rounded-md border-2 p-2 my-2"
                    placeholder="Enter amount Ex.99"
                    ref={enteredmoney}
                  />
                </div>
                <div>
                  <label className="font-bold lg:text-3xl">Description:</label>
                  <textarea
                    type="text"
                    required
                    className="w-full rounded-md border-2 p-2 my-2"
                    placeholder="Enter description"
                    ref={entereddesc}
                  />
                </div>
                <div>
                  <label className="font-bold lg:text-3xl">
                    Select category:
                  </label>
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
          ) : (
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
            </div>
          )}
        </>
      )}

      {!downloadUrl && (
        <button
          className="bg-white sm:text-sm font-bold lg:text-2xl p-1 rounded-md"
          onClick={downloadExpense}
        >
          Download Expenses
        </button>
      )}
      {downloadUrl && (
        <>
          <a
            href={downloadUrl}
            className="bg-white sm:text-sm font-bold lg:text-2xl p-1 rounded-md"
            download="expenses.csv"
          >
            Click Again to Download
          </a>
          <button
            className="bg-red-600 text-white mx-2 sm:text-sm font-bold lg:text-2xl p-1 rounded-md"
            onClick={() => {
              SetdownloadUrl("");
            }}
          >
            Cancel
          </button>
        </>
      )}

      {props.isPremium && (
        <div className="sm:text-sm font-bold lg:text-2xl rounded-md flex justify-between m-4">
          {/* <CSVLink
            className="bg-white sm:text-sm font-bold lg:text-2xl p-1 rounded-md"
            data={Object.values(expence)}
            filename="data.csv"
          >
            Download Expenses
          </CSVLink> */}

          <select
            className="bg-white sm:text-sm font-bold lg:text-2xl p-1 rounded-md"
            onChange={filterHandler}
          >
            <option value="all">All</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      )}

      <DisplayExpenses expence={filteredexpence} />
    </div>
  );
};

export default ExpencesForm;
