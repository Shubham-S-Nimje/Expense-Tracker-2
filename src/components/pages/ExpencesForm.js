import React, { useState } from 'react'
import DisplayExpenses from './DisplayExpenses'
import { useRef } from 'react'
import { useContext } from 'react'
import ContextData from '../store/Contextdata'

const ExpencesForm = () => {
    const userlocalId = localStorage.getItem('localId')

    const {expensedata} = useContext(ContextData)
    const enteredmoney = useRef();
    const entereddesc = useRef();
    const enteredcategory = useRef();

    const SubmitExpenses = (event) => {
    event.preventDefault();

    const expensemoney = enteredmoney.current.value
    const expensedescription = entereddesc.current.value
    const expensecategory = enteredcategory.current.value

    expensedata(expensemoney, expensedescription, expensecategory)
    const data = {
        expensemoney: expensemoney,
        expensedescription: expensedescription,
        expensecategory: expensecategory,
        returnSecureToken: true,
      }

    fetch(`https://expense-tracker-f48d6-default-rtdb.firebaseio.com/users/${userlocalId}/expences.json`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
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

    }
    // console.log(expenseitems)
  return (
    <div>
    <form onSubmit={SubmitExpenses}>
      <div className="border-2 m-8 p-2 bg-blue-100 rounded-md justify-start text-left">
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
                <option value="rent">Rent</option>
                <option value="rent">Food</option>
                <option value="rent">Bill</option>
                <option value="rent">Emi</option>
            </select>
          </div>
          <div>
            <button
            className='bg-blue-600 text-white p-2 m-2 rounded-md'
            type='submit'
            >Submit</button>
          </div>
        </div>
    </form>
  
  <DisplayExpenses />

</div>
  )
}

export default ExpencesForm
