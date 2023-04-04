import React, { useState } from 'react'
import DisplayExpenses from './DisplayExpenses'
import { useRef } from 'react'
import { useContext } from 'react'
import ContextData from '../store/Contextdata'

const ExpencesForm = (props) => {
    const {expensedata} = useContext(ContextData)
    const enteredmoney = useRef();
    const entereddesc = useRef();
    const enteredcategory = useRef();
    const [expenseitems, Setexpenseitems] = useState([])

    const SubmitExpenses = (event) => {
    event.preventDefault();

    const expensemoney = enteredmoney.current.value
    const expensedescription = entereddesc.current.value
    const expensecategory = enteredcategory.current.value
    
    // const expenseitem = [{
    //     money:expensemoney,
    //     description:expensedescription,
    //     category:expensecategory,
    // }]

    expensedata(expensemoney, expensedescription, expensecategory)

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
  
  <DisplayExpenses expenseitems={expenseitems}/>
  

</div>
  )
}

export default ExpencesForm
