import React from 'react'
import ContextData from './Contextdata';
import { useState } from 'react';
import { useEffect } from 'react';

const Contextprovider = (props) => {
  const [expenses, Setexpense] = useState([])
  const userlocalId = localStorage.getItem('localId')
  const [userlogedin, Setuserlogedin] = useState()

  useEffect(()=> {
    {userlocalId && Setuserlogedin(true)}
    {!userlocalId && Setuserlogedin(false)}
  },[userlocalId])

  
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
    <ContextData.Provider value={{expenses,expensedata,userlocalId,userlogedin,Setuserlogedin}}>
      {props.children}
    </ContextData.Provider>
  )
}

export default Contextprovider
