import React, {useRef,useContext, useState} from 'react'
import toast from 'react-hot-toast'
// import { AuthContext } from '../store/AuthContext'
import { useNavigate } from 'react-router-dom'
import backgroundImage from '../assets/backgroundImage.jpeg'
import { useSelector, useDispatch } from 'react-redux'
import {login} from '../features/authSlice'


function Signup() {
    const emailInputRef =  useRef('')
    const passwordInputRef =  useRef('')
    const confirmPasswordInputRef =  useRef('')
    const [islLoggedIn,setIsLoggedIn] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // const {login, token} = useContext(AuthContext);
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const themeMode = useSelector(state => state.theme.darkMode);
    const apiKey = import.meta.env.VITE_EXPENSE_TRACKER_API_KEY;
    const navigate = useNavigate()

    const formHandler = async (e) => {
        e.preventDefault();
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        const confirmPassword = confirmPasswordInputRef.current.value
    
        // if( password !== confirmPassword){
        //     alert("Password Doesn't match")
        //     return null;
        // }
        setIsLoading(true);
        let url = islLoggedIn  
        ?`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`

        :`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
        try {
            const response = await fetch (url,{
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(!response.ok){
                const err = await response.json();
                throw new Error(err.error.message)
            }
            
            const data = await response.json();
            toast.success('User has successfully signed up!');
            dispatch(login(data.idToken))
            if(data.idToken){
                navigate('/')
            }
            setIsLoading(false);
           
        } catch (error) {
            toast.error(error.message)
            setIsLoading(false);
        }
        
            emailInputRef.current.value = null;
            passwordInputRef.current.value = null;
            confirmPasswordInputRef.current.value = null;

    }

    const switchAuthHandler = () =>{
        setIsLoggedIn((prev)=>!prev)
    }

  return (
    <>
    {!token && (
    <div style={{backgroundImage:`url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh'}} className='overflow-y-hidden absolute top-0 left-0 w-full'>
        <div className='flex flex-col items-center gap-2 my-[11rem] w-full' >
                <form onSubmit={formHandler} className='flex flex-col items-center gap-4 px-6 py-4 bg-gray-700 rounded  md:w-[25%] shadow-md shadow-white'>
                    <h1 className='font-semibold text-lg text-white italic'>{islLoggedIn ? 'Login' : 'SignUp'}</h1>
                    <label className='block w-full'>
                        <input 
                            className={`border-2 border-gray-200 hover:border-green-700 w-full h-9 text-xl px-3 ${themeMode ?'bg-gray-900 text-white' : 'bg-white text-black'}`}
                            type="email" 
                            required
                            ref={emailInputRef}
                            placeholder='Email'
                        />
                    </label>

                    <label className='block w-full'>
                        <input 
                            className={`border-2 border-gray-200 hover:border-green-700 w-full h-9 text-xl px-3 ${themeMode ?'bg-gray-900 text-white' : 'bg-white text-black'}`}
                            type="password" 
                            required
                            ref={passwordInputRef}
                            placeholder='password'
                        />
                    </label>

                    <div className='w-full'>
                    {!islLoggedIn && (
                        <label className='block full'>
                        <input 
                             className={`border-2 border-gray-200 hover:border-green-700 w-full h-9 text-xl px-3 ${themeMode ?'bg-gray-900 text-white' : 'bg-white text-black'}`}
                            type="password" 
                            required
                            ref={confirmPasswordInputRef}
                            placeholder='Confirm Password'
                        />
                    </label>
                    )}
                    </div>
                    <button className='bg-green-700 text-white px-6 py-1 rounded-md text-lg hover:bg-green-900' 
                    type='submit'>{islLoggedIn ? isLoading ? 'Submitting...': 'Login' : 'SignUp'}</button>
                    
                    {islLoggedIn? (<button onClick={()=>navigate('/forget-password')} className='text-blue-700'>Forget Password </button>) : ('')}
                </form>
            <button 
            onClick={switchAuthHandler}
            className='text-white px-6 py-2 rounded-md text-lg text-center shadow-2xl shadow-gray-600 bg-gray-600 md:w-[25%] my-4' 
            >{islLoggedIn ? <p>Don't have an account? <span className='text-blue-400'>SignUp</span></p> : <p>Have an account? <span className='text-green-400 font-bold'>Login</span></p>}</button>
    
        </div>
    </div>
    )}
    </>
  )
}

export default Signup