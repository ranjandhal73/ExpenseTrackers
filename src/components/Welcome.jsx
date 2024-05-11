import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../store/AuthContext'
import toast from 'react-hot-toast'


function Welcome() {
    const {logout} = useContext(AuthContext)
    const navigate = useNavigate()
    const logoutHandler = () =>{
        logout();
        toast.success("Logged out successfully")
        navigate('/login')
    }
  return (
    <div>
        <div>Welcome To Expense Tracker</div>
        <button onClick={logoutHandler}>
            Logout
        </button>
    </div>
  )
}

export default Welcome