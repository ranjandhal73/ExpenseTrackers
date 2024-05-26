import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from './store/AuthContext.jsx'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Signup from './components/Signup.jsx'
import { Toaster } from 'react-hot-toast'
import ForgetPassword from './components/ForgetPassword.jsx'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseContextProvider from './store/ExpenseContext.jsx'
import UserProfileContextProvider from './store/UserProfileContext.jsx'
import { Provider } from 'react-redux';
import {store} from './store/store.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path="" element={<Signup />}/>
      <Route path='' element={<ExpenseForm />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      {/* <AuthContextProvider>
        <UserProfileContextProvider> */}
          {/* <ExpenseContextProvider > */}
            <RouterProvider router={router}/>
            <Toaster />
          {/* </ExpenseContextProvider> */}
        {/* </UserProfileContextProvider>
      </AuthContextProvider> */}
    </Provider>
  </React.StrictMode>,
)
