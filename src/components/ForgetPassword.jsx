import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const forgetPasswordHandler = async () => {
    if (email) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDPSN5Cd0Nn9gvlbzhJLyZeiowu41n-JYI",
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
    <div className="flex flex-col items-center my-[15rem] gap-3">
      <h1 className="font-bold italic text-xl">Forget Password</h1>
      <input
        className="border-2 px-3"
        type="text"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={forgetPasswordHandler}
        className="bg-green-700 text-white px-6 py-1 rounded"
      >
        Submit
      </button>
    </div>
  );
}

export default ForgetPassword;
