import { createContext, useState } from "react";

export const ExpenseContext = createContext({
    expense: [],
    addExpense: (expense) => {},
    removeExpense: (id) => {},
})

const ExpenseContextProvider = ({children}) =>{
    const [expense, setExpense] = useState([])

    const addExpenseHandler = (expense) =>{
        setExpense((prevExpense) => [{expense}, ...prevExpense])
    }

    const removeExpenseHandler = (id) =>{
        setExpense((prevExpense) => prevExpense.filter(expense => expense.id !== id))
    }

    const contextValue = {
        expense: expense,
        addExpense: addExpenseHandler,
        removeExpense: removeExpenseHandler
    }


    return <ExpenseContext.Provider value={contextValue}>
        {children}
    </ExpenseContext.Provider>
}
export default ExpenseContextProvider;