import React, { useEffect } from "react";
import { useCallback } from "react";
import EditExpenseForm from "./EditExpenseForm";
import { useState } from "react";
import { Fragment } from "react";

const DisplayExpenses = (props) => {
  const userlocalId = localStorage.getItem("localId");
  const [editedmoney, Seteditedmoney] = useState();
  const [editeddesc, Setediteddesc] = useState();
  const [editedcat, Seteditedcat] = useState();
  const [editedid, Seteditedid] = useState();
  const [editbutonclicked, Seteditbutonclicked] = useState(false);
  const [currentPage, SetcurrentPage] = useState(1);
  const [lastPage, SetlastPage] = useState();
  const [expensePerpage, SetexpensePerpage] = useState(5);

  const paginationEnd = currentPage * expensePerpage;
  const paginationStart = paginationEnd - expensePerpage;

  const currentExpensePerpage = props.expence.slice(
    paginationStart,
    paginationEnd
  );

  const onStartclickhandler = () => {
    SetcurrentPage(1);
  };

  const onBackclickhandler = () => {
    SetcurrentPage(currentPage - 1);
  };

  const onNextclickhandler = () => {
    {
      paginationEnd < props.expence.length
        ? SetcurrentPage(currentPage + 1)
        : SetcurrentPage(currentPage);
    }
  };

  const onEndclickhandler = () => {
    const lastPage = Math.ceil(props.expence.length / expensePerpage);
    if (currentPage < lastPage) {
      SetcurrentPage(lastPage);
    }
  };

  const rowPerpageHandler = (e) => {
    // console.log(e.target.value)
    SetcurrentPage(1);
    SetexpensePerpage(e.target.value);
  };

  const OnDeleteHandler = async (event) => {
    const expenseid = await event.target.value;
    // console.log(props.expence,expenseid);

    const expenseuserid = props.expence[expenseid]._id;
    // console.log(expenseuserid);
    props.onExpenseDelete(expenseuserid)

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

  // console.log(currentPage);

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
            <tr className="mx-1 flex justify-between text-xs items-center text-center md:text-lg lg:text-2xl">
              <th className="w-1/4">Category</th>
              <th className="w-1/4">Description</th>
              <th className="w-1/4">Money</th>
              <th className="w-1/4">Edit</th>
              <th className="w-1/4">Delete</th>
            </tr>
          </thead>
          <tbody className="table-fixed w-full justify-center text-center text-xs">
            {currentExpensePerpage &&
              Object.keys(currentExpensePerpage).map((data, index) => {
                if (index < paginationEnd) {
                  return (
                    <Fragment key={index}>
                      <tr
                        className="flex gap-1 justify-between text-xs items-center text-center md:text-lg lg:text-2xl"
                      >
                        <td className="w-1/4">
                          {currentExpensePerpage[data].expensecategory}
                        </td>
                        <td className="w-1/4">
                          {currentExpensePerpage[data].expensedescription}{" "}
                        </td>
                        <td className="w-1/4">
                          ₹{" "}
                          {parseFloat(
                            currentExpensePerpage[data].expensemoney
                          ).toFixed(2)}
                        </td>
                        <td className="w-1/4">
                          <button
                            className="bg-green-600 text-white px-2 py-1 my-2 w-fit rounded-md"
                            onClick={(event) => {
                              event.preventDefault();
                              Seteditbutonclicked(true);
                              editItem(
                                currentExpensePerpage[data].expensecategory,
                                currentExpensePerpage[data].expensedescription,
                                currentExpensePerpage[data].expensemoney,
                                data
                              );
                            }}
                            value={[data]}
                          >
                            Edit
                          </button>
                        </td>
                        <td className="w-1/4">
                          <button
                            className="bg-red-600 text-white rounded-md px-2 py-1 my-1 w-fit"
                            value={[data]}
                            onClick={OnDeleteHandler}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                      <hr className="border-1 border-gray-600 mx-4" />
                    </Fragment>
                  );
                }
              })}
          </tbody>
        </table>
      )}
      <div className="justify-between md:flex mt-4 text-xs md:text-lg lg:text-2x">
        <p className="my-2 font-bold">{`${paginationStart} - ${paginationEnd} of ${props.expence.length}`}</p>
        <div className="my-2 ">
          <span className="font-bold">Rows per page: </span>
          <select
            className="bg-blue-600 text-white font-bold mx-1 px-2 py-1 rounded-md"
            onChange={rowPerpageHandler}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className="my-2 ">
          {currentPage > 1 && (
            <button
              className="bg-blue-600 text-white font-bold mx-1 px-2 py-1 rounded-md"
              onClick={onStartclickhandler}
            >
              Start
            </button>
          )}
          {currentPage > 1 && (
            <button
              className="bg-blue-600 text-white font-bold mx-1 px-2 py-1 rounded-md"
              onClick={onBackclickhandler}
            >
              Back
            </button>
          )}
          {paginationEnd <= props.expence.length && (
            <button
              className="bg-blue-600 text-white font-bold mx-1 px-2 py-1 rounded-md"
              onClick={onNextclickhandler}
            >
              Next
            </button>
          )}
          {paginationEnd <= props.expence.length && (
            <button
              className="bg-blue-600 text-white font-bold mx-1 px-2 py-1 rounded-md"
              onClick={onEndclickhandler}
            >
              End
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayExpenses;
