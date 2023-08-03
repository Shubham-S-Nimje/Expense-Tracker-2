import React, { useEffect } from "react";
import { useCallback } from "react";
import EditExpenseForm from "./EditExpenseForm";
import { useState } from "react";

const DisplayExpenses = (props) => {
  const userlocalId = localStorage.getItem("localId");
  const [editedmoney, Seteditedmoney] = useState();
  const [editeddesc, Setediteddesc] = useState();
  const [editedcat, Seteditedcat] = useState();
  const [editedid, Seteditedid] = useState();
  const oldexpenses = props.expence;
  const [updatedexpence, Setupdatedexpence] = useState([]);

  const [editbutonclicked, Seteditbutonclicked] = useState(false);

  // const [expence, Setexpence] = useState([])

  // const data = props.expenseitems
  // console.log(defaultValue)

  const OnDeleteHandler = async (event) => {
    const expenseid = await event.target.value;
    // console.log(updatedexpence[event.target.value].userid);

    const expenseuserid = updatedexpence[expenseid].id;
    // console.log(expenseuserid);
    fetch(`http://localhost:4000/delete-expences/${expenseuserid}`, {
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
        console.log("Expense deleted successfully");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const editItem = (d1, d2, d3, id) => {
    Seteditedcat(d1);
    Setediteddesc(d2);
    Seteditedmoney(d3);
    Seteditedid(id);
  };

  const OncloseHandler = (e) => {
    Seteditbutonclicked(false);
  };

  useEffect(() => {
    oldexpenses && Setupdatedexpence(oldexpenses);
  }, [editItem, OnDeleteHandler]);

  // useEffect(()=>{
  //     async function fetchData() {
  //     try{
  //         const response = await fetch(`https://expense-tracker-f48d6-default-rtdb.firebaseio.com/users/${userlocalId}/expences.json`)
  //         const data = await response.json();
  //         console.log(data)
  //         Setexpence(data)
  //             }
  //             catch{
  //                 alert('error')
  //             }
  // }
  // fetchData();
  // },[OnDeleteHandler])
  // console.log(updatedexpence);

  return (
    <div className="bg-blue-100 m-4 rounded-md p-4">
      {editbutonclicked ? (
        <div>
          <div className="flex justify-between p-2">
            <h2 className="text-3xl font-bold">Edit Expense details</h2>
            <button
              className="bg-red-600 text-white p-2 m-2 rounded-md"
              onClick={OncloseHandler}
            >
              Cancel
            </button>
          </div>
          <EditExpenseForm
            OncloseHandler={OncloseHandler}
            editedmoney={editedmoney}
            editeddesc={editeddesc}
            editedcat={editedcat}
            editedid={editedid}
          />
        </div>
      ) : (
        <table className="table-fixed w-full">
          <thead className="bg-white border-black border-2 rounded-md">
            <tr className="mx-1 flex justify-between text-xs items-center text-center sm:text-sm lg:text-2xl">
              <th>Category</th>
              <th>Description</th>
              <th>Money</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="table-fixed w-full justify-center text-center">
            {props.expence &&
              Object.keys(props.expence).map((data, index) => {
                return (
                  <tr
                    key={index}
                    className="flex gap-1 justify-between text-xs items-center text-center sm:text-sm lg:text-2xl"
                  >
                    <td>{props.expence[data].expensecategory}</td>
                    <td>{props.expence[data].expensedescription} </td>
                    <td>Rs. {props.expence[data].expensemoney}/- </td>
                    <td>
                      <button
                        className="bg-green-600 text-white p-1 lg:p-2 my-2 rounded-md"
                        onClick={(event) => {
                          event.preventDefault();
                          Seteditbutonclicked(true);
                          editItem(
                            props.expence[data].expensecategory,
                            props.expence[data].expensedescription,
                            props.expence[data].expensemoney,
                            data
                          );
                        }}
                        value={[data]}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-red-600 text-white rounded-md p-1 lg:p-2 my-1"
                        value={[data]}
                        onClick={OnDeleteHandler}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DisplayExpenses;
