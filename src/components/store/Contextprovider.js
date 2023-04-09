import React from 'react'
import ContextData from './Contextdata';
import { useState } from 'react';

const Contextprovider = (props) => {
  const [expenses, Setexpense] = useState([])
  
  const expensedata = (newexpensemoney, newexpensedescription, newexpensecategory) => {
    Setexpense((newexpensedata) => {
      return[...newexpensedata,
      { expensemoney:newexpensemoney,
        expensedescription:newexpensedescription,
        expensecategory:newexpensecategory}]
    })
  }
console.log(expenses)
  
  return (
    <ContextData.Provider value={{expenses,expensedata}}>
      {props.children}
    </ContextData.Provider>
  )
}

export default Contextprovider
