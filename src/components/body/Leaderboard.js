import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";

const Leaderboard = (props) => {
  const userlocalId = localStorage.getItem("localId");
  const [expenseData, SetexpenseData] = useState();
  const [expenseDownloadhistory, SetexpenseDownloadhistory] = useState([]);

  // console.log(userlocalId)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:4000/expense/fetch-totalexpensesbyuser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: userlocalId,
            },
          }
        );

        const data = await response.json();
        SetexpenseData(data);
        // console.log(expenseData);
      } catch {
        alert("error");
      }

      try {
        const response = await fetch(
          `http://localhost:4000/expense/fetch-downloadedexpensesdata`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: userlocalId,
            },
          }
        );

        const data = await response.json();
        // SetexpenseData(data);
        // console.log(data.fetchDownloadedExpenses);
        SetexpenseDownloadhistory(data.fetchDownloadedExpenses);
      } catch {
        alert("error");
      }
    }
    fetchData();
  }, []);

  // console.log(expenseDownloadhistory)

  return (
    <Fragment>
      <div className="bg-blue-100 m-4 rounded-md p-4 border-2 border-black">
        <h3 className={`text-xl font-bold mb-4`}>
          Expenses Downloaded History!..
        </h3>
        <table className="table-fixed w-full">
          <thead className="bg-white border-black border-2 rounded-md">
            <tr className="mx-1 flex justify-between text-xs items-center text-center sm:text-sm lg:text-2xl">
              <th className="w-1/12">Id</th>
              <th className="w-1/3">userId</th>
              <th className="w-1/3">Created At</th>
              <th className="w-1/3">Updated At</th>
              <th className="w-1/3">Download</th>
            </tr>
          </thead>
          <tbody className="table-fixed w-full justify-center text-center">
            {expenseDownloadhistory &&
              Object.keys(expenseDownloadhistory).map((data, index) => {
                // console.log(expenseDownloadhistory[data])
                return (
                  <>
                    <tr
                      key={index}
                      className="flex my-2 justify-between text-xs items-center text-center sm:text-lg lg:text-2xl"
                    >
                      <td className="w-1/12">
                        {expenseDownloadhistory[data].id}
                      </td>
                      <td className="w-1/3">
                        {expenseDownloadhistory[data].userId}
                      </td>
                      <td className="w-1/3">
                        {new Date(
                          expenseDownloadhistory[data].createdAt
                        ).toLocaleString()}
                      </td>
                      <td className="w-1/3">
                        {new Date(
                          expenseDownloadhistory[data].updatedAt
                        ).toLocaleString()}
                      </td>
                      <td className="w-1/3">
                        <a
                          href={expenseDownloadhistory[data].url}
                          className="bg-blue-600 px-2 py-1 text-white rounded-md w-20"
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                    <hr className="border-1 border-gray-600 mx-4" />
                  </>
                );
              })}
          </tbody>
        </table>
      </div>

      <hr className="m-3" />

      <div className="bg-blue-100 m-4 rounded-md p-4 border-2 border-black">
        <h3 className={`text-xl font-bold mb-4`}>All Users Expenses Data!..</h3>
        <table className="table-fixed w-full">
          <thead className="bg-white border-black border-2 rounded-md">
            <tr className="mx-1 flex justify-between text-xs items-center text-center sm:text-sm lg:text-2xl">
              <th className="w-1/3">Premium user</th>
              <th className="w-1/3">Username</th>
              <th className="w-1/3">Total Expenses</th>
            </tr>
          </thead>
          <tbody className="table-fixed w-full justify-center text-center">
            {expenseData &&
              Object.keys(expenseData).map((data, index) => {
                // console.log(expenseData[data])
                return (
                  <>
                    <tr
                      key={index}
                      className="flex gap-1 justify-between text-xs items-center text-center sm:text-lg lg:text-2xl"
                    >
                      <td className="w-1/3">{index + 1}</td>
                      <td className="w-1/3">{expenseData[data].username} </td>
                      <td className="w-1/3">
                        ₹{" "}
                        {parseFloat(
                          expenseData[data].totalExpensemoney
                        ).toFixed(2)}
                      </td>
                    </tr>
                    <hr className="border-1 border-gray-600 mx-4" />
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Leaderboard;
