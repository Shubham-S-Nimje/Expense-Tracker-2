import React, { useEffect, useState } from "react";
import DisplayExpenses from "./DisplayExpenses";
import { useRef } from "react";
import { useContext } from "react";
import ContextData from "../store/Contextdata";
import { CSVLink } from "react-csv";
import { Fragment } from "react";

const ExpencesForm = (props) => {
  const { expenses, expensedata } = useContext(ContextData);

  const userlocalId = localStorage.getItem("localId");

  const [expence, Setexpence] = useState([]);
  // console.log(totalExpensemoney);

  const [filteredexpence, Setfilteredexpence] = useState(expence);

  const [downloadUrl, SetdownloadUrl] = useState("");
  const [enterexpense, setenterexpense] = useState(false);
  const enteredmoney = useRef();
  const entereddesc = useRef();
  const enteredcategory = useRef();

  useEffect(() => {
    Setfilteredexpence(expence);
  }, [expence]);

  const Onaddexpenseclickhandler = () => {
    setenterexpense(true);
  };
  const Oncloseexpenseclickhandler = () => {
    setenterexpense(false);
  };

  const SubmitExpenses = async (event) => {
    event.preventDefault();

    const expensemoney = enteredmoney.current.value;
    const expensedescription = entereddesc.current.value;
    const expensecategory = enteredcategory.current.value;

    try {
      const data = {
        expensemoney: expensemoney,
        expensedescription: expensedescription,
        expensecategory: expensecategory,
        returnSecureToken: true,
      };

      const response = await fetch(
        `http://localhost:4000/expense/add-expense`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: userlocalId,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to add expense");
      } else {
        const responseData = await response.json();
        const newExpense = responseData.data;
        props.SettotalExpensemoney(
          responseData.totalExpensemoney.totalExpensemoney
        );
        // props.userData = responseData.totalExpensemoney.totalExpensemoney
        // const newExpense = { data };

        Setexpence([...expence, newExpense]);

        // console.log(expence);

        console.log("Expense added successfully");
        setenterexpense(false);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleExpenseDelete = (deletedExpenseid) => {
    // console.log(deletedExpenseid);
    const expenseuserid = deletedExpenseid;
    fetch(`http://localhost:4000/expense/delete-expense/${expenseuserid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: userlocalId,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Unable to delete expense";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data.message);
        const updatedExpences = expence.filter(
          (expense) => expense._id !== expenseuserid
        );
        Setexpence(updatedExpences);
        props.SettotalExpensemoney(data.totalExpensemoney);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const filterHandler = (e) => {
    const cuurentFilter = e.target.value;
    // console.log(cuurentFilter);

    const daily = new Date().getDay();
    // const weekly = new Date().getWeek();
    const monthly = new Date().getMonth() + 1;
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
        `http://localhost:4000/expense/download-expenses`,
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
        console.log(response);
        throw new Error(response.statusText);
      }

      const data = await response.json();
      // console.log(data.fileUrl);
      // const url = URL.createObjectURL(data);
      // console.log(url);
      SetdownloadUrl(data.fileUrl);
    } catch (error) {
      alert(error.message);
    }
    // console.log('download clicked')
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:4000/expense/fetch-expenses`,
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
          throw new Error("Error fetching expenses");
        }
        const data = await response.json();
        Setexpence(data.expense);
        // Setfilteredexpence(data.expense);
      } catch (error) {
        alert(error.message);
      }
    }
    fetchData();
  }, []);

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
        <Fragment>
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
              <div className="justify-center text-center">
                <button
                  className="bg-blue-600 text-white p-2 m-2 rounded-md"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Fragment>
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

          {!downloadUrl && (
            <button
              className="bg-white sm:text-sm font-bold lg:text-2xl p-1 rounded-md"
              onClick={downloadExpense}
            >
              Download Expenses
            </button>
          )}
          {downloadUrl && (
            <div>
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
            </div>
          )}

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

      <DisplayExpenses
        expence={filteredexpence}
        onExpenseDelete={handleExpenseDelete}
      />
      <div className="text-end mx-4">
        <button
          className="bg-white text-xs sm:text-sm font-bold lg:text-2xl px-2 py-1 rounded-md"
          onClick={downloadExpense}
        >
          Total Expenses ={" "}
          {props.userData && (
            <span className="text-red-600">
              ₹ {parseFloat(props.totalExpensemoney).toFixed(2)}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ExpencesForm;
