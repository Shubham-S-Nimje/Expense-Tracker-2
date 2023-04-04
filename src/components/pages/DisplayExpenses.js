import React from 'react'
import { useContext } from 'react'
import ContextData from '../store/Contextdata'

const DisplayExpenses = (props) => {
    const {expenses} = useContext(ContextData)
    // const data = props.expenseitems
console.log(expenses)

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
          {expenses.map((pro) => {
            return (
              <tr>
                <td>{pro.expensecategory}</td>
                <td>{pro.expensedescription} </td>
                <td>Rs. {pro.expensemoney}/- </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayExpenses
