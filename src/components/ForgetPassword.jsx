import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../assets/backgroundImage.jpeg'
import { useSelector } from "react-redux";



function ForgetPassword() {
  const apiKey = import.meta.env.VITE_EXPENSE_TRACKER_API_KEY;
  const [email, setEmail] = useState("");
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();
  const forgetPasswordHandler = async () => {
    if (email) {
      try {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
          {
            method: "POST",
            body: JSON.stringify({
              requestType: "PASSWORD_RESET",
              email: email,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error.message);
        }
        const data = await response.json();
        toast.success("A reset link has been sent to your registered Email");
        setEmail('')
        navigate('/')

      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <div style={{backgroundImage:`url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh'}} className='overflow-y-hidden absolute top-0 left-0 w-full'>
    <div className="flex flex-col items-center my-[15rem] gap-3">
      <h1 className="font-bold italic text-xl text-white">Forget Password</h1>
      <input
        className={`border-2 px-3 py-1 w-[20rem] ${darkMode ? 'bg-gray-900 text-white' : ''}`}
        type="text"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex gap-6">
        <button
          onClick={forgetPasswordHandler}
          className="bg-green-700 text-white px-6 py-1 rounded"
        >
          Submit
        </button>
        <button onClick={()=>navigate(-1)} className="bg-blue-700 px-6 py-1 rounded">Back To Login</button>
      </div>
    </div>
    </div>
  );
}

export default ForgetPassword;
