import React, {useContext, useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../store/AuthContext'
import { UserProfileContext } from "../store/UserProfileContext";
import toast from 'react-hot-toast'
import { FaGithub } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";


function Welcome() {
    const {logout} = useContext(AuthContext)
    const [isShowing, setIsShowing] = useState(false);
    const [name, setName] = useState("");
    const [profile, setProfile] = useState("");
    const [profileUpdated, setProfileUpdated] = useState();
    const [userProfileUpdated, setUserProfileUpdated] = useState(false);
    const navigate = useNavigate()

    const apiKey = import.meta.env.VITE_EXPENSE_TRACKER_API_KEY;
    const {token} = useContext(AuthContext);
    const {addUser} = useContext(UserProfileContext)

    const updateHandler = async () => {
      if (token) {
        try {
          const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`,
            {
              method: "POST",
              body: JSON.stringify({
                idToken: token,
                displayName: name,
                photoUrl: profile,
                deleteAttribute: [],
                returnSecureToken: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            const err = await response.json();
            console.log(err);
          }
          const data = await response.json();
          // console.log(data);
          const usersFrofileData = {
            name: data.displayName,
            email: data.email,
            emailVerified: data.emailVerified,
            photoUrl: data.photoUrl,
          }
          addUser(data)
          setUserProfileUpdated(true)
          setProfileUpdated(usersFrofileData);
        } catch (error) {}
      }
    };

    const getUserData = async () => {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
          {
            method: "POST",
            body: JSON.stringify({
              idToken: token,
            }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        if (!response.ok) {
          const err = await response.json();
          console.log(err);
        }
        const data = await response.json();
        const user = data.users[0];
        const loadedUser = {
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoUrl,
        };
        setUserProfileUpdated(true)
        setProfileUpdated(loadedUser)
      } catch (error) {}
    };

     useEffect(()=>{
    getUserData();
  },[])

  const emailVerification = async ()=> {
    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,{
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
        headers: {
          "Content-type": "application/json",
        }
      })
      if (!response.ok) {
        const err = await response.json();
        console.log(err);
      }
      const data = await response.json();
      console.log(data);
      
    } catch (error) {
      
    }
  }

    const logoutHandler = () => {
      logout();
      toast.success('Logged out successfully')
      navigate('/')
    }
  return (
    <>
      <div className='flex items-center justify-between px-6 py-2 border-b-2 shadow-md'>
          <div>Welcome To Expense Tracker</div>
          <button className='text-red-800 border border-red-700 px-6 py-1' onClick={logoutHandler}>Logout</button>
          {!userProfileUpdated ? (
               <div className='flex'>
               <p>Your profile is Incomplete.</p>
               <button onClick={()=>setIsShowing(true)} className='text-blue-700'>Complete now</button>
             </div>
          ) : (
            <div>
            <p>Congratulation ! Your Profile has been Updated!😊</p>
          </div>
          )}      
      </div>
{/* ------------------------------------------------------------------- */}
      
      <div className='flex justify-between mx-[5rem] my-[1.5rem]'>
        {profileUpdated && (
          <div className='flex items-center'>
          <div className="text-lg">
          <h1>Name: {profileUpdated.name} </h1>
          <div className="flex gap-5">
          <p>Email: {profileUpdated.email}</p>
          <div>{profileUpdated.emailVerified? <p className=" text-sky-400">Verified</p> :<button onClick={emailVerification} className="bg-sky-500 text-white text-lg px-4 rounded">Verify</button>}</div>
          </div >
          <p>Profile: {profileUpdated.photoUrl}</p>
          </div>
        </div>
        )} 
    
      {isShowing && (
          <div className="flex flex-col gap-5 py-5 px-2 bg-gray-700 shadow-md">
          <div className="flex items-center justify-around">
            <h1 className="text-xl font-bold">Contact Details</h1>
            <button onClick={()=>setIsShowing(false)}
              className="text-red-700 px-4 py-1 border border-red-700"
            >
              Cancel
            </button>
          </div>
          <div className="flex gap-5 items-center justify-center">
            <label className="flex items-center gap-1">
              <i>
                <FaGithub />
              </i>
              <p>Full Name:</p>
              <input
                className="border-2 h-6"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="flex items-center gap-1">
              <i>
                <CgProfile />
              </i>
              <p>Profile Photo URL:</p>
              <input
                className="border-2 h-6"
                type="text"
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
              />
            </label>
          </div>
          <div className="flex flex-col items-center">
          <button onClick={updateHandler} className="text-white bg-green-700 px-10 py-1">
            Update
          </button>
          </div>
        </div>
      )}
      </div>
    </>
  )
}

export default Welcome