import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expenses: [],
}


const expenseSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        addexpense: (state, action) =>{
            state.expenses.push(action.payload);
        },
        setExpenses: (state,action) =>{
            state.expenses = [...action.payload]
        },
        removeExpense: (state,action) => {
            state.expenses = state.expenses.filter((expense) => expense.id !== action.payload.id)
        },
        updateExpense: (state,action) =>{
            state.expenses = state.expenses.map((expense) => expense.id === action.payload.id ? action.payload : expense)
        }
    }
})
export const {addexpense, removeExpense, updateExpense, setExpenses} = expenseSlice.actions;
export default expenseSlice.reducer;