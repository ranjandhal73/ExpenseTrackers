import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from './store/AuthContext.jsx'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Signup from './components/Signup.jsx'
import Welcome from './components/Welcome.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path="/login" element={<Signup />}/>
      <Route path='/home' element={<Welcome />} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router}/>
    </AuthContextProvider>
  </React.StrictMode>,
)
