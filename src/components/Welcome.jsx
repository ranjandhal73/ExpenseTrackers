import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { FaGithub, FaRegUserCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { toggleDarkMode } from '../features/themeSlice';
import { addUserHandler } from '../features/apiCall';
import { setUser } from '../features/usersProfile';
import { RxCross1 } from "react-icons/rx";
import UserProfile from './UserProfile';

function Welcome() {
  const [isShowing, setIsShowing] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_EXPENSE_TRACKER_API_KEY;
  const token = useSelector(state => state.auth.token);
  const darkMode = useSelector(state => state.theme.darkMode);
  const user = useSelector(state => state.userDetails.users);
  const dispatch = useDispatch();

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
        const usersProfileData = {
          name: data.displayName,
          email: data.email,
          photoUrl: data.photoUrl,
          userId: data.localId,
        };
        addUserHandler(data.localId, usersProfileData);
        dispatch(setUser(usersProfileData));
        setIsShowing(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getUserData = async () => {
    if (token) {
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
          emailVerified: user.emailVerified,
          userId: user.localId,
        };
        addUserHandler(user.localId, loadedUser);
        dispatch(setUser(loadedUser));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, [token]);

  const logoutHandler = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  const toggleDarkModeHandler = () => {
    dispatch(toggleDarkMode());
  };

  const handleUserProfileCheck = () => {
    if (user && user.name) {
      setShowUserProfile(true);
    }
  };

  return (
    <>
      <nav className={`flex items-center justify-between px-8 md:px-12 py-3 border-b-2 shadow-md sticky top-0 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-300'} z-50`}>
        {/* <div className="text-sm md:text-lg font-bold">Welcome To Expense Tracker!</div> */}
        <div className='flex flex-col items-center'>
            <FaRegUserCircle className={`text-2xl cursor-pointer ${!(user && user.name) ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleUserProfileCheck} />
            <button className="text-blue-700 text-xs md:text-base">
              {user && user.name ? 
                <span className="text-green-700 cursor-not-allowed animate-bounce">Completed</span> : 
                <span onClick={() => setIsShowing(true)} className="cursor-pointer animate-bounce">Complete Now</span>
              }
            </button>
          </div>
        <button className="text-red-800 border border-red-700 px-4 md:px-6 py-1 rounded-md hover:bg-red-700 hover:text-white transition duration-200" onClick={logoutHandler}>Logout</button>
          <div>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              checked={darkMode}
              onChange={toggleDarkModeHandler}
            />
          </div>
      </nav>

      <div className='flex flex-col md:flex-row justify-between mx-4 md:mx-[5rem] my-[1.5rem] gap-4'>
        {isShowing && (
          <div className='fixed inset-0 flex items-center justify-center z-50 text-white bg-black bg-opacity-70'>
            <div className="flex flex-col gap-5 py-5 px-4 md:px-8 bg-gray-700 shadow-md rounded-md w-11/12 md:w-1/2">
              <div className="flex items-center justify-between">
                <h1 className="text-lg md:text-xl font-bold">Contact Details</h1>
                <button onClick={() => setIsShowing(false)} className="text-red-800 px-4 py-1 border border-red-700 rounded-md bg-gray-200 font-bold hover:bg-red-700 hover:text-white transition duration-200">
                  <RxCross1 />
                </button>
              </div>
              <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
                <label className="flex items-center gap-1 w-full">
                  <i><FaGithub /></i>
                  <p className="w-1/3 md:w-auto">Full Name:</p>
                  <input
                    className="border-2 h-8 md:h-6 text-black flex-grow rounded-md px-2"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label className="flex items-center gap-1 w-full">
                  <i><CgProfile /></i>
                  <p className="w-1/3 md:w-auto">Profile Photo URL:</p>
                  <input
                    className="border-2 h-8 md:h-6 text-black flex-grow rounded-md px-2"
                    type="file"
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex flex-col items-center">
                <button onClick={updateHandler} className="text-white bg-green-700 px-10 py-2 md:py-1 rounded-md hover:bg-green-800 transition duration-200">
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
        {showUserProfile && <UserProfile onClose={() => setShowUserProfile(false)} />}
      </div>
    </>
  );
}

export default Welcome;
