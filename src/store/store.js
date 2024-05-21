import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import expenseReducre from '../features/expenseSlice'
import themeReducer from '../features/themeSlice'

export const store = configureStore({
    reducer: { 
        auth: authReducer,
        expenses: expenseReducre,
        theme: themeReducer,
    }
})
