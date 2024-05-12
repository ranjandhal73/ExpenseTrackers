import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from './store/AuthContext.jsx'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Signup from './components/Signup.jsx'
import Welcome from './components/Welcome.jsx'
import { Toaster } from 'react-hot-toast'
import UpdateProfile from './components/UpdateProfile.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path="" element={<Signup />}/>
      <Route path='/updateProfile' element={<UpdateProfile />} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router}/>
      <Toaster />
    </AuthContextProvider>
  </React.StrictMode>,
)
