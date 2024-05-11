import React, {useRef} from 'react'

function Signup() {
    const emailInputRef =  useRef('')
    const passwordInputRef =  useRef('')
    const confirmPasswordInputRef =  useRef('')

    const formHandler = async (e) => {
        e.preventDefault();
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        const confirmPassword = confirmPasswordInputRef.current.value
    
        // if( password !== confirmPassword){
        //     alert("Password Doesn't match")
        //     return null;
        // }

        const userPassword = {password, confirmPassword}
        
        try {
            const response = await fetch ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDPSN5Cd0Nn9gvlbzhJLyZeiowu41n-JYI',{
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
                console.log(err);
                throw new Error(err.error.message)
            }
            emailInputRef.current.value = '';
            passwordInputRef.current.value = '';
            confirmPasswordInputRef.current.value = '';
            const data = await response.json();
            console.log('User has successfully signed up:', data);
            alert('User has successfully signed up!');
           
        } catch (error) {
            alert(error.message)
        }
  
    }

  return (
    <div>
        <form onSubmit={formHandler}>
            <label>
                Email:
                <input 
                    type="email" 
                    required
                    ref={emailInputRef}
                />
            </label>

            <label>
                Password:
                <input 
                    type="password" 
                    required
                    ref={passwordInputRef}
                />
            </label>

            <label>
                Confirm Password:
                <input 
                    type="password" 
                    required
                    ref={confirmPasswordInputRef}
                />
            </label>
            <button type='submit'>Sumbit</button>
        </form>
    </div>
  )
}

export default Signup