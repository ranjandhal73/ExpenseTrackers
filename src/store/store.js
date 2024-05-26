import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import expenseReducre from '../features/expenseSlice'
import themeReducer from '../features/themeSlice'
import userReducer from '../features/usersProfile'

export const store = configureStore({
    reducer: { 
        auth: authReducer,
        expenses: expenseReducre,
        theme: themeReducer,
        userDetails: userReducer,
    }
})
