import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Leaderboard = (props) => {
  const userlocalId = localStorage.getItem("localId");
  const [expenseData, SetexpenseData] = useState();

// console.log(userlocalId)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:4000/fetch-totalexpencesbyuser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: userlocalId,
            },
          }
        );

        const data = await response.json();
        SetexpenseData(data)
        // console.log(expenseData);
      } catch {
        alert("error");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-blue-100 m-4 rounded-md p-4">
      <table className="table-fixed w-full">
        <thead className="bg-white border-black border-2 rounded-md">
          <tr className="mx-1 flex justify-between text-xs items-center text-center sm:text-sm lg:text-2xl">
            <th>Id:</th>
            <th>Username</th>
            <th>Total Expenses</th>
          </tr>
        </thead>
        <tbody className="table-fixed w-full justify-center text-center">
          {expenseData &&
            Object.keys(expenseData).map((data, index) => {
              // console.log(expenseData[data])
              return (
                <tr
                  key={index}
                  className="flex gap-1 justify-between text-xs items-center text-center sm:text-lg lg:text-2xl"
                >
                  <td>{expenseData[data].userId}</td>
                  <td>{expenseData[data].username} </td>
                  <td>Rs. {expenseData[data].totalExpensemoney}/- </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
