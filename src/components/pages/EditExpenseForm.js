import React, { useContext } from 'react'
import { useRef } from 'react'
import ContextData from '../store/Contextdata';

const EditExpenseForm = (props) => {
    const { userlocalId } = useContext(ContextData);
// console.log(props.editedid);
    const editedenteredmoney = useRef();
    const editedentereddesc = useRef();
    const editedenteredcat = useRef();

    const SubmitExpenses = (event) => {
        event.preventDefault();
        // console.log(editedenteredmoney.current.value)

        const data = {
            expensemoney: editedenteredmoney.current.value,
            expensedescription: editedentereddesc.current.value,
            expensecategory: editedenteredcat.current.value,
            returnSecureToken: true,
          }

    fetch(`https://expense-tracker-f48d6-default-rtdb.firebaseio.com/users/${userlocalId}/expences/${props.editedid}.json`, {
      method: "PUT",
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
        console.log("expense edited successfully");
      })
      .catch((err) => {
        alert(err.message);
      });
    
    }
  return (
    <div>
      <form onSubmit={SubmitExpenses}>
      <div className="flex">
          <div>
            <label className="font-bold text-3xl">Money spent :</label>
            <input
              type="number"
              required
              className="w-full rounded-md border-2 p-2 my-2"
              placeholder="Enter amount Ex.99"
              defaultValue={props.editedmoney}
              ref={editedenteredmoney}
            />
          </div>
          <div>
            <label className="font-bold text-3xl">Description :</label>
            <textarea
              type="text"
              required
              className="w-full rounded-md border-2 p-2 my-2"
              placeholder="Enter description"
              defaultValue={props.editeddesc}
              ref={editedentereddesc}
            />
          </div>
          <div>
            <label className="font-bold text-3xl">Select category :</label>
            <select
              required
              className="w-full rounded-md border-2 p-2 my-2"
              defaultValue={props.editedcat}
              ref={editedenteredcat}
            >
                <option value="Rent">Rent</option>
                <option value="Food">Food</option>
                <option value="Bill">Bill</option>
                <option value="Emi">Emi</option>
            </select>
          </div>
          
        </div>
        <div>
            <button
            className='bg-blue-600 text-white p-2 m-2 rounded-md'
            type='submit'
            >Submit</button>
          </div>
    </form>
    </div>
  )
}

export default EditExpenseForm
