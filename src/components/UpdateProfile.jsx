import React, {useState, useContext, useEffect} from 'react'
import { FaGithub } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from '../store/AuthContext';


function UpdateProfile() {
  const [isShowing, setIsShowing] = useState(true);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [name, setName] = useState('')
  const [profile, setProfile] = useState('');
  const {token} = useContext(AuthContext);
  console.log(token);
  const updateHandler = async () =>{
    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBY-VIO9nNHjVOKopsMCLbv3MfaZ4clHRI',{
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
          displayName: name,
          photoUrl: profile,
          deleteAttribute: null,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(!response.ok){
        const err = await response.json();
        console.log(err);
      }
      const data = await response.json();
      console.log(data);
      setProfileUpdated(data)
    } catch (error) {
      
    }
  }
  // useEffect(async ()=>{
  //   try {
  //     const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBY-VIO9nNHjVOKopsMCLbv3MfaZ4clHRI',{
  //       method: 'POST',
  //       body: JSON.stringify({
  //         idToken: token,
  //       }),
  //       headers: {
  //         'Content-type': 'application/json'
  //       }
  //     })
  //     if(!response.ok){
  //       const err = await response.json();
  //       console.log(err);
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
      
  //   }
  // },[])
  return (
    <>
    {isShowing && !profileUpdated && (
      <div className='flex flex-col gap-5 ml-[50rem] mr-[5rem] mt-[2rem] shadow-md'>
      <div className='flex items-center justify-between'>
      <h1 className='text-xl font-bold'>Contact Details</h1>
      <button onClick={()=>setIsShowing(false)} className='text-red-700 px-4 py-1 border border-red-700'>Cancel</button>
      </div>
      <div className='flex gap-5'>
        <label className='flex items-center gap-1'>
          <i><FaGithub /></i>
          <p>Full Name:</p>
          <input 
            className='border-2 h-6'
            type="text" 
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </label>

        <label className='flex items-center gap-1'>
          <i><CgProfile /></i>
          <p>Profile Photo URL:</p>
          <input 
            className='border-2 h-6'
            type="text" 
            value={profile}
            onChange={(e)=>setProfile(e.target.value)}
          />
        </label>
      </div>
      <button onClick={updateHandler} className='text-white bg-green-700'>Update</button>
    </div>
    )}
    </>
  )
}

export default UpdateProfile