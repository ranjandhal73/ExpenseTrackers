// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserProfileContext } from "../store/UserProfileContext";
// import { AuthContext } from "../store/AuthContext";

// function UpdateProfile({setIsShowing}) {
//   // const [isShowing, setIsShowing] = useState(true);
//   const [profileUpdated, setProfileUpdated] = useState(true);
//   const [name, setName] = useState("");
//   const [profile, setProfile] = useState("");
//   const navigate = useNavigate();

//   const apiKey = import.meta.env.VITE_EXPENSE_TRACKER_API_KEY;
//   const {token} = useContext(AuthContext);
//   const {addUser} = useContext(UserProfileContext)


//   const updateHandler = async () => {
//     if (token) {
//       try {
//         const response = await fetch(
//           `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`,
//           {
//             method: "POST",
//             body: JSON.stringify({
//               idToken: token,
//               displayName: name,
//               photoUrl: profile,
//               deleteAttribute: [],
//               returnSecureToken: true,
//             }),
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         if (!response.ok) {
//           const err = await response.json();
//           console.log(err);
//         }
//         const data = await response.json();
//         // console.log(data);
//         const usersFrofileData = {
//           name: data.displayName,
//           email: data.email,
//           emailVerified: data.emailVerified,
//           photoUrl: data.photoUrl,
//         }
//         addUser(data)
//         setProfileUpdated(usersFrofileData);
//       } catch (error) {}
//     }
//   };

//   const getUserData = async () => {
//     try {
//       const response = await fetch(
//         `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
//         {
//           method: "POST",
//           body: JSON.stringify({
//             idToken: token,
//           }),
//           headers: {
//             "Content-type": "application/json",
//           },
//         }
//       );
//       if (!response.ok) {
//         const err = await response.json();
//         console.log(err);
//       }
//       const data = await response.json();
//       console.log(data);
//       const user = data.users[0];
//       const loadedUser = {
//         name: user.displayName,
//         email: user.email,
//         photoUrl: user.photoUrl,
//       };
//       setProfileUpdated(loadedUser)
//     } catch (error) {}
//   };

//   // useEffect(()=>{
//   //   getUserData();
//   // },[])

//   const showingHandler = () =>{
//     setProfileUpdated(false)
//     // navigate(-1)
//   }
//   return (
//     <>
//     <div className="flex items-center">
//       <div className="text-lg mx-[5rem]">
//         <h1>Name: {profileUpdated.name}</h1>
//         <div className="flex gap-5">
//          <p>Email: {profileUpdated.email}</p>
//          <div>{profileUpdated.emailVerified? <p className=" text-sky-400">Verified</p> :<button className="bg-sky-500 text-white text-lg px-4 rounded">Verify</button>}</div>
//         </div>
//         <p>Profile: {profileUpdated.photoUrl}</p>
//       </div>
// {/* 
//         {profileUpdated && (
          
//         )} */}
//   </div>
//     </>
//   );
// }

// export default UpdateProfile;

// /*
 
// */


// /*
// <div className="flex flex-col gap-3 bg-gray-500 py-3 px-6 ml-[20rem] mr-[20rem]">
//         <div className="flex justify-around">
//           <h1 className="text-xl font-bold">Contact Details</h1>
//           <button
//             onClick={showingHandler}
//             className="text-red-700 px-4 py-1 border border-red-700"
//           >
//             Cancel
//           </button>
//         </div>

//         <div className="flex justify-around py-3">
//           <label className="flex items-center gap-1">
//             <i>
//               <FaGithub />
//             </i>
//             <p>Full Name:</p>
//             <input
//               className="border-2 h-6"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </label>

//           <label className="flex items-center gap-1">
//             <i>
//               <CgProfile />
//             </i>
//             <p>Profile Photo URL:</p>
//             <input
//               className="border-2 h-6"
//               type="text"
//               value={profile}
//               onChange={(e) => setProfile(e.target.value)}
//             />
//           </label>
//         </div>
//           <div className="flex flex-col items-center ">
//             <button onClick={updateHandler} className="text-white bg-green-700 px-6 py-2 rounded">
//               Update
//             </button>
//           </div>
//       </div>
// */