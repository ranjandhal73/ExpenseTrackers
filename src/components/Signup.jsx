import React, {useRef,useContext, useState} from 'react'
import toast from 'react-hot-toast'
import { AuthContext } from '../store/AuthContext'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const emailInputRef =  useRef('')
    const passwordInputRef =  useRef('')
    const confirmPasswordInputRef =  useRef('')
    const [islLoggedIn,setIsLoggedIn] = useState(true)

    const {login, token} = useContext(AuthContext);

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

        const userPassword = {password, confirmPassword};
        let url = islLoggedIn  
        ?'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDPSN5Cd0Nn9gvlbzhJLyZeiowu41n-JYI' 
        :'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDPSN5Cd0Nn9gvlbzhJLyZeiowu41n-JYI'
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
            console.log(data.idToken);
            login(data.idToken)
            if(data.idToken){
                navigate('/')
            }
           
        } catch (error) {
            toast.error(error.message)
        }
        
            emailInputRef.current.value = '';
            passwordInputRef.current.value = '';
            confirmPasswordInputRef.current.value = '';
    }

    const switchAuthHandler = () =>{
        setIsLoggedIn((prev)=>!prev)
    }

  return (
    <>
    {!token && (
        <div className='flex flex-col items-center gap-2 my-[11rem]' >
                <form onSubmit={formHandler} className='flex flex-col items-center gap-4 shadow-lg px-6 py-4 bg-gray-600 rounded'>
                    <h1 className='font-semibold text-lg text-white italic'>{islLoggedIn ? 'Login' : 'SignUp'}</h1>
                    <label className='block'>
                        <input 
                            className='border-2 border-gray-200 hover:border-green-700'
                            type="email" 
                            required
                            ref={emailInputRef}
                            placeholder='Email'
                        />
                    </label>

                    <label className='block'>
                        <input 
                            className='border-2 border-gray-200 hover:border-green-700'
                            type="password" 
                            required
                            ref={passwordInputRef}
                            placeholder='password'
                        />
                    </label>

                    {!islLoggedIn && (
                        <label className='block'>
                        <input 
                            className='border-2 border-gray-200 hover:border-green-700'
                            type="password" 
                            required
                            ref={confirmPasswordInputRef}
                            placeholder='Confirm Password'
                        />
                    </label>
                    )}
                    <button className='bg-green-700 text-white px-6 py-1 rounded-md text-lg hover:bg-green-900' 
                    type='submit'>{islLoggedIn ? 'Login' : 'SignUp'}</button>

                </form>
            <button 
            onClick={switchAuthHandler}
            className='text-white px-6 py-2 rounded-md text-lg text-center shadow-2xl shadow-gray-600 bg-gray-600' 
            >{islLoggedIn ? `Don't have an account? SignUp` : 'Have an account? Login'}</button>
    
        </div>
    )}
    </>
  )
}

export default Signup