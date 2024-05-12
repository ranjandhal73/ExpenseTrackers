import React, {useContext, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../store/AuthContext'
import toast from 'react-hot-toast'


function Welcome() {
    const {logout} = useContext(AuthContext)
    const [isShowing, setIsShowing] = useState(true);
    const navigate = useNavigate()

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
          {isShowing && (
            <div className='flex'>
            <p>Your profile is Incomplete.</p>
            <Link to='/updateProfile'><p 
           onClick={()=>setIsShowing(true)} className='text-blue-700'>Complete now</p></Link>
          </div>
          )}
      </div>
    </>
  )
}

export default Welcome