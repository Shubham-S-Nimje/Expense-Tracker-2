import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import ContextData from '../store/Contextdata'

const DisplayExpenses = () => {
    const {expenses} = useContext(ContextData)
    const [expence, Setexpence] = useState([])
    const userlocalId = localStorage.getItem('localId')

    // const data = props.expenseitems
console.log(expenses)

useEffect(()=>{
    async function fetchData() {
    try{
        const response = await fetch(`https://expense-tracker-f48d6-default-rtdb.firebaseio.com/users/${userlocalId}/expences.json`)
        const data = await response.json();
        console.log(data)
        Setexpence(data)
            }
            catch{
                alert('error')
            }
}
fetchData();
},[DisplayExpenses])
console.log(expence);

  return (
    <div className="bg-blue-100 m-8 rounded-md p-2">
      <table className="table-fixed w-full">
        <thead className='bg-white'>
          <tr>
            <th>Category :</th>
            <th>Description :</th>
            <th>Money :</th>
          </tr>
        </thead>
        <tbody className='table-fixed w-full justify-center text-center'>
          {/* <h1>{data.money}</h1>
      <h1>{data.description}</h1>
      <h1>{data.category}</h1> */}
          {expence && Object.keys(expence).map((data, index) => {
            return (
              <tr key={index}>
                <td>{expence[data].expensecategory}</td>
                <td>{expence[data].expensedescription} </td>
                <td>Rs. {expence[data].expensemoney}/- </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayExpenses
