import React, { useRef } from 'react'

const ProfileForm = () => {
    const enteredfname = useRef();
    const enteredpurl = useRef();

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const updatedfname = enteredfname.current.value;
        const updatedpurl = enteredpurl.current.value;
    }
  return (
    <div>
      <form className="p-2" onSubmit={onSubmitHandler}>
        <div className='flex'>
        <div>
          <label>Full Name :</label>
          <input className="border-2 rounded-md mx-2" ref={enteredfname}/>
        </div>
        <div>
          <label>Profile Photo URL :</label>
          <input className="border-2 rounded-md mx-2" ref={enteredpurl}/>
        </div>
        </div>
        <button className="bg-sky-600 p-2 m-2 rounded-md text-white"
        >
          Update
        </button>
      </form>
      
    </div>
  );
}

export default ProfileForm
