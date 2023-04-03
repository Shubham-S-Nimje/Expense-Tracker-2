import React from 'react'
import ContectData from './Contextdata';
const userdata = [];
const Contextprovider = (props) => {
  return (
    <ContectData.Provider value={userdata}>
      {props.children}
    </ContectData.Provider>
  )
}

export default Contextprovider
