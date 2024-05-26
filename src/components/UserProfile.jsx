import { createPortal } from "react-dom";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setUser } from '../features/usersProfile';
import { MdVerified } from "react-icons/md";

function UserProfile({ onClose }) {
    const modalToShow = document.getElementById('modal');
    const user = useSelector((state) => state.userDetails.users);
    const darkMode = useSelector((state) => state.theme.darkMode);
    const token = useSelector(state => state.auth.token);
    const apiKey = import.meta.env.VITE_EXPENSE_TRACKER_API_KEY;
    const dispatch = useDispatch();
    console.log(user);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || localStorage.getItem('photoURL'));

    const emailVerification = async () => {
        if (token) {
          try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`, {
              method: "POST",
              body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: token,
              }),
              headers: {
                "Content-type": "application/json",
              }
            });
            if (!response.ok) {
              const err = await response.json();
              throw new Error(err);
            }
            const data = await response.json();
            console.log(data);
            toast.success('A verification email has been sent to your registered email');
          } catch (error) {
            toast.error(error.message);
          }
        }
      };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            setPhotoUrl(result);
            dispatch(setUser({ ...user, photoUrl: result }));
            localStorage.setItem('photoURL', result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (photoUrl) {
            localStorage.setItem('photoURL', photoUrl);
        }
    }, [photoUrl]);

    return createPortal(
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 `}>
            <div className={`bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-4 relative ${darkMode? ' bg-sky-900 text-gray-100': ''}`}>
                <h2 className="text-lg font-bold text-center border-b-2 pb-2">Your Profile</h2>
                <button onClick={onClose} className="text-red-500 font-bold absolute top-2 right-2">X</button>
                <div className="mt-4">
                    <div className="text-sm md:text-lg">
                        <div className="relative flex justify-center items-center mb-4">
                            <p className="">Profile:</p>
                            <img src={photoUrl || 'https://via.placeholder.com/150'} alt="Profile" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover" />
                            {user && user.emailVerified && (
                                <MdVerified className={`absolute bottom-0 text-4xl text-blue-700 ${darkMode? 'text-white' : ''} `}/>
                            )}
                        </div>
                        <h1 className="mb-2">Name: {user.name}</h1>
                        <div className="flex md:flex-row gap-2 md:gap-5 mb-2">
                            <p>Email: {user.email}</p>
                            <div>
                                {user.emailVerified ? 
                                    <p className={`text-sky-400 ${darkMode ? 'text-white' : ''}`}>Verified</p> : 
                                    <button onClick={emailVerification} className="bg-sky-500 text-white text-xs md:text-lg px-2 md:px-4 rounded">Verify</button>
                                }
                            </div>
                        </div>
                        <div className="mb-2">
                            <input type="file" onChange={handlePhotoUpload} className="border p-2 rounded w-full"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        modalToShow
    );
}

export default UserProfile;
