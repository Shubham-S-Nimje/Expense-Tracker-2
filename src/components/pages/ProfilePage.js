import React from 'react'
import ProfileForm from './ProfileForm'
import Body from '../body/Body'
import ContextData from '../store/Contextdata'
import { useContext } from 'react'

const ProfilePage = () => {
  const {userlocalId} = useContext(ContextData)


  return (
    <>
    {userlocalId && <div className="min-h-screen py-2">
      <div className="justify-start">
        <h1 className="font-bold text-3xl px-2">Contact Details</h1>
      </div>
      <div className="text-end justify-end">
        <button className="bg-red-600 p-2 m-2 rounded-md text-white">
          Cancel
        </button>
      </div>
      <ProfileForm />
    </div>}
    {!userlocalId && <Body/>}
    </>
  );
}

export default ProfilePage
